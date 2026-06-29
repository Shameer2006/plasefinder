import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { verifyAuthAndGetUser } from '@/lib/map/authHelper';
import MAP_CONST from '@/lib/map/mapConstants';
import parseMapData from '@/lib/map/parseMapData';
import generateSlug from '@/lib/map/slugGenerator';
import { latLngToCartesian, calculateDistance } from '@/lib/map/geoUtils';

async function validateMap(name, data, description_short, description_long, edit = false, mapId = null) {
  if (!name || !data || !description_short) {
    return 'Missing name, data, or description_short';
  }

  name = name.trim();
  description_short = description_short.trim();
  description_long = description_long ? description_long.trim() : '';

  // validate name
  if (typeof name !== 'string' || name.length < MAP_CONST.MIN_NAME_LENGTH || name.length > MAP_CONST.MAX_NAME_LENGTH) {
    return `Name must be between ${MAP_CONST.MIN_NAME_LENGTH} and ${MAP_CONST.MAX_NAME_LENGTH} characters`;
  }

  // validate short description
  if (typeof description_short !== 'string' || description_short.length < MAP_CONST.MIN_SHORT_DESCRIPTION_LENGTH || description_short.length > MAP_CONST.MAX_SHORT_DESCRIPTION_LENGTH) {
    return `Short description must be between ${MAP_CONST.MIN_SHORT_DESCRIPTION_LENGTH} and ${MAP_CONST.MAX_SHORT_DESCRIPTION_LENGTH} characters`;
  }

  // validate long description
  if (typeof description_long !== 'string' || description_long.length > MAP_CONST.MAX_LONG_DESCRIPTION_LENGTH) {
    return `Long description must be under ${MAP_CONST.MAX_LONG_DESCRIPTION_LENGTH} characters`;
  }

  if (description_long.length > 0 && description_long.length < MAP_CONST.MIN_LONG_DESCRIPTION_LENGTH) {
    return `Long description must be at least ${MAP_CONST.MIN_LONG_DESCRIPTION_LENGTH} characters or left empty`;
  }

  if (description_long.length > 0 && description_short === description_long) {
    return 'Short and long descriptions must be different';
  }

  const slug = generateSlug(name);
  if (!slug) {
    return 'Name must contain at least one Latin letter or number';
  }

  // validate data
  const locationsData = parseMapData(data);
  if (!locationsData || locationsData.length < MAP_CONST.MIN_LOCATIONS) {
    return 'Need at least ' + MAP_CONST.MIN_LOCATIONS + ' valid locations (got ' + (locationsData?.length ?? 0) + ')';
  }
  if (locationsData.length > MAP_CONST.MAX_LOCATIONS) {
    return `Map cannot have more than ${MAP_CONST.MAX_LOCATIONS} locations`;
  }

  // Compute maxDist (geographic spread)
  const cartesianLocations = locationsData.map(loc => latLngToCartesian(loc.lat, loc.lng));
  cartesianLocations.sort((a, b) => a.x - b.x);
  const maxDist = calculateDistance(cartesianLocations[0], cartesianLocations[cartesianLocations.length - 1]);

  // Check slug uniqueness in Firestore
  const slugQuery = await adminDb.collection('maps').where('slug', '==', slug).limit(1).get();
  if (!slugQuery.empty) {
    const existingDoc = slugQuery.docs[0];
    if (edit ? existingDoc.id !== mapId : true) {
      return 'Name already taken';
    }
  }

  return { slug, locationsData, maxDist };
}

export async function POST(request) {
  try {
    const { user, uid } = await verifyAuthAndGetUser(request);
    const body = await request.json();
    const { action, name, data, description_short, description_long, mapId } = body;

    if (!action) {
      return NextResponse.json({ message: 'Missing action' }, { status: 400 });
    }

    // Check if user is banned
    if (user.banned) {
      return NextResponse.json({ message: 'Your account is suspended.' }, { status: 403 });
    }

    if (action === 'create') {
      const validation = await validateMap(name, data, description_short, description_long);
      if (typeof validation === 'string') {
        return NextResponse.json({ message: validation }, { status: 400 });
      }

      const mapDoc = {
        slug: validation.slug,
        name,
        created_by: uid,
        data: validation.locationsData,
        locationsCnt: validation.locationsData.length,
        description_short,
        description_long: description_long || '',
        maxDist: validation.maxDist,
        in_review: false,
        accepted: true,
        map_creator_name: user.username || 'Anonymous',
        hearts: 0,
        plays: 0,
        created_at: new Date(),
        lastUpdated: new Date()
      };

      const docRef = await adminDb.collection('maps').add(mapDoc);

      return NextResponse.json({
        message: 'Map created',
        map: { id: docRef.id, ...mapDoc }
      });

    } else if (action === 'edit') {
      if (!mapId) {
        return NextResponse.json({ message: 'Missing mapId' }, { status: 400 });
      }

      const mapRef = adminDb.collection('maps').doc(mapId);
      const mapDoc = await mapRef.get();
      if (!mapDoc.exists) {
        return NextResponse.json({ message: 'Map not found' }, { status: 404 });
      }

      const mapData = mapDoc.data();
      if (!user.staff && mapData.created_by !== uid) {
        return NextResponse.json({ message: 'You do not have permission to edit this map' }, { status: 403 });
      }

      const validation = await validateMap(name, data, description_short, description_long, true, mapId);
      if (typeof validation === 'string') {
        return NextResponse.json({ message: validation }, { status: 400 });
      }

      await mapRef.update({
        name,
        data: validation.locationsData,
        locationsCnt: validation.locationsData.length,
        description_short,
        description_long: description_long || '',
        maxDist: validation.maxDist,
        reject_reason: '',
        lastUpdated: new Date()
      });

      return NextResponse.json({ message: 'Map edited' });

    } else if (action === 'get') {
      if (!mapId) {
        return NextResponse.json({ message: 'Missing mapId' }, { status: 400 });
      }

      const mapRef = adminDb.collection('maps').doc(mapId);
      const mapDoc = await mapRef.get();

      if (!mapDoc.exists) {
        return NextResponse.json({ message: 'Map not found' }, { status: 404 });
      }

      const mapData = mapDoc.data();
      if (!user.staff && mapData.created_by !== uid) {
        return NextResponse.json({ message: 'Map not found' }, { status: 404 });
      }

      return NextResponse.json({ map: { id: mapDoc.id, ...mapData } });
    }

    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Map action error:', error);
    if (error.message === 'Missing or invalid Authorization header' || error.message === 'User not found') {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
