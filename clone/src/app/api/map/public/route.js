import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { verifyAuthAndGetUser } from '@/lib/map/authHelper';
import msToTime from '@/lib/map/msToTime';
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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ message: 'Missing slug' }, { status: 400 });
    }

    let user = null;
    let uid = null;
    try {
      const authResult = await verifyAuthAndGetUser(request);
      user = authResult.user;
      uid = authResult.uid;
    } catch (e) {
      // Allow anonymous access
    }

    // 1. Check if official country map
    const officialMaps = getOfficialCountryMaps();
    const cntryMap = Object.values(officialMaps).find(m => m.slug === slug);
    if (cntryMap) {
      return NextResponse.json({
        mapData: {
          ...cntryMap,
          description_short: cntryMap.shortDescription,
          description_long: cntryMap.longDescription,
          created_by: "WorldGuessr",
          in_review: false,
          rejected: false
        }
      });
    }

    // 2. Check Firestore
    const mapsSnapshot = await adminDb.collection('maps').where('slug', '==', slug).limit(1).get();
    if (mapsSnapshot.empty) {
      return NextResponse.json({ message: 'Map not found' }, { status: 404 });
    }

    const mapDoc = mapsSnapshot.docs[0];
    const mapData = mapDoc.data();
    mapData.id = mapDoc.id;

    const isCreatorOrStaff = (uid && mapData.created_by === uid) || user?.staff;

    if (!mapData.accepted && !isCreatorOrStaff) {
      return NextResponse.json({ message: 'Map not accepted or no permission to view' }, { status: 404 });
    }

    // Limit the locations data sent to client to save bandwidth
    if (mapData.data && mapData.data.length > 5) {
      mapData.data = mapData.data.slice(0, 5);
    }

    // Handle timestamps
    let createdAtMs = Date.now();
    if (mapData.created_at?.toMillis) {
      createdAtMs = mapData.created_at.toMillis();
    } else if (mapData.created_at instanceof Date) {
      createdAtMs = mapData.created_at.getTime();
    } else if (typeof mapData.created_at === 'number') {
      createdAtMs = mapData.created_at;
    } else if (typeof mapData.created_at === 'string') {
      createdAtMs = new Date(mapData.created_at).getTime();
    }

    const hearted = user?.hearted_maps ? user.hearted_maps.includes(mapData.id) : false;

    const responseData = {
      ...mapData,
      created_by: mapData.map_creator_name || 'Unknown',
      created_at: msToTime(Date.now() - createdAtMs),
      locationcnt: mapData.locationsCnt,
      hearted
    };

    return NextResponse.json({ mapData: responseData });

  } catch (error) {
    console.error('Public data error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
