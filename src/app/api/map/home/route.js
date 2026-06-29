import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { verifyAuthAndGetUser } from '@/lib/map/authHelper';
import sendableMap from '@/lib/map/sendableMap';
import shuffle from '@/lib/map/shuffle';
import fs from 'fs';
import path from 'path';

let cachedCountryMaps = null;

function getOfficialCountryMaps() {
  if (!cachedCountryMaps) {
    const filePath = path.join(process.cwd(), 'public', 'officialCountryMaps.json');
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      cachedCountryMaps = JSON.parse(raw);
    } catch (e) {
      console.warn("Could not load officialCountryMaps.json:", e);
      cachedCountryMaps = {};
    }
  }
  return cachedCountryMaps;
}

let mapCache = {
  popular: { data: [], timeStamp: 0, persist: 9600000 },
  recent: { data: [], timeStamp: 0, persist: 4800000 },
  spotlight: { data: [], timeStamp: 0, persist: 48000000 }
};

export async function POST(request) {
  try {
    let user = null;
    let uid = null;

    try {
      const authResult = await verifyAuthAndGetUser(request);
      user = authResult.user;
      uid = authResult.uid;
    } catch (e) {
      // Allow anonymous access
    }

    const hearted_maps = user?.hearted_maps || [];
    let response = {};

    // 1. Owned maps
    if (user && uid) {
      const myMapsSnapshot = await adminDb.collection('maps')
        .where('created_by', '==', uid)
        .get();
      
      let myMaps = [];
      myMapsSnapshot.forEach(doc => {
        myMaps.push(sendableMap({ id: doc.id, ...doc.data() }, user, hearted_maps.includes(doc.id), user.staff, true));
      });
      // Sort oldest to newest
      myMaps.sort((a, b) => a.created_at - b.created_at);
      if (myMaps.length > 0) response.myMaps = myMaps;

      // 2. Liked maps
      if (hearted_maps.length > 0) {
        // Firestore 'in' queries are limited to 30 items
        // We'll chunk them if needed, but for simplicity we take first 30
        const chunk = hearted_maps.slice(0, 30);
        const likedMapsSnapshot = await adminDb.collection('maps')
          .where('__name__', 'in', chunk)
          .get();
        
        let likedMaps = [];
        likedMapsSnapshot.forEach(doc => {
          const mapData = doc.data();
          likedMaps.push(sendableMap({ id: doc.id, ...mapData }, { username: mapData.map_creator_name || 'Unknown' }, true, user.staff, mapData.created_by === uid));
        });
        likedMaps.sort((a, b) => b.created_at - a.created_at);
        if (likedMaps.length > 0) response.likedMaps = likedMaps;
      }
    }

    // 3. Official Country Maps
    const officialMaps = getOfficialCountryMaps();
    response.countryMaps = Object.values(officialMaps).map(map => ({
      ...map,
      created_by_name: 'WorldGuessr',
      official: true,
      countryMap: map.countryCode,
      description_short: map.shortDescription,
    })).sort((b, a) => (a.maxDist || 0) - (b.maxDist || 0));

    // 4. Discovery maps (spotlight, popular, recent)
    const discovery = ["spotlight", "popular", "recent"];
    for (const method of discovery) {
      if (mapCache[method].data.length > 0 && Date.now() - mapCache[method].timeStamp < mapCache[method].persist) {
        // From cache
        response[method] = mapCache[method].data.map(map => ({
          ...map,
          hearted: hearted_maps.includes(map.id)
        }));
        if (method === "spotlight") {
          response[method] = shuffle(response[method]);
        }
      } else {
        // Fetch from DB
        let mapsSnapshot;
        if (method === "recent") {
          mapsSnapshot = await adminDb.collection('maps').where('accepted', '==', true).orderBy('lastUpdated', 'desc').limit(100).get();
        } else if (method === "popular") {
          mapsSnapshot = await adminDb.collection('maps').where('accepted', '==', true).orderBy('hearts', 'desc').limit(100).get();
        } else if (method === "spotlight") {
          mapsSnapshot = await adminDb.collection('maps').where('accepted', '==', true).where('spotlight', '==', true).limit(100).get();
        }

        let sendableMaps = [];
        mapsSnapshot.forEach(doc => {
          const mapData = doc.data();
          sendableMaps.push(sendableMap(
            { id: doc.id, ...mapData },
            { username: mapData.map_creator_name || 'Unknown' },
            hearted_maps.includes(doc.id)
          ));
        });

        if (method === "spotlight") {
          response[method] = shuffle([...sendableMaps]);
        } else {
          response[method] = sendableMaps;
        }

        // Store to cache without user-specific data
        mapCache[method].data = sendableMaps.map(m => ({ ...m, hearted: false }));
        mapCache[method].timeStamp = Date.now();
      }
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Map home error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Allow GET for anonymous access cacheable by CDN (similar to source)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('anon') === 'true') {
    return POST(request);
  }
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
