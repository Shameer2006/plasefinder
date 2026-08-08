import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { verifyAuthAndGetUser } from '@/lib/map/authHelper';
import sendableMap from '@/lib/map/sendableMap';

export async function POST(request) {
  try {
    let user = null;
    try {
      const authResult = await verifyAuthAndGetUser(request);
      user = authResult.user;
    } catch (e) {
      // Search works for anonymous users too, so we just ignore auth errors
    }

    const body = await request.json();
    let { query } = body;

    // Validate the search query
    if (!query || query.length < 3) {
      return NextResponse.json({ message: 'Search query must be at least 3 characters long' }, { status: 400 });
    }

    // sanitize query: keep alphanumerics + whitespace only
    query = query.replace(/[^a-zA-Z0-9\s]/g, '').trim();

    // In a real production app, we would use Algolia or Typesense for full-text search.
    // For this clone, we'll fetch up to 500 popular accepted maps and filter them in memory.
    const mapsSnapshot = await adminDb.collection('maps')
      .where('accepted', '==', true)
      .orderBy('hearts', 'desc')
      .limit(500)
      .get();

    const queryLower = query.toLowerCase();
    const tokens = queryLower.split(/\s+/).filter(Boolean);

    let maps = [];
    mapsSnapshot.forEach(doc => {
      const mapData = doc.data();
      const searchableText = `${mapData.name} ${mapData.description_short} ${mapData.map_creator_name}`.toLowerCase();

      // Check if all tokens match
      const isMatch = tokens.every(token => searchableText.includes(token));
      if (isMatch) {
        maps.push({ id: doc.id, ...mapData });
      }
    });

    // Re-rank results
    maps.sort((a, b) => {
      const aSparse = (a.locationsCnt ?? 0) < 20;
      const bSparse = (b.locationsCnt ?? 0) < 20;
      if (aSparse && !bSparse) return 1;
      if (!aSparse && bSparse) return -1;

      const aNameLower = (a.name || '').toLowerCase();
      const bNameLower = (b.name || '').toLowerCase();

      // 1. Exact match
      const aExact = aNameLower === queryLower;
      const bExact = bNameLower === queryLower;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      // 2. Starts with query
      const aStartsWith = aNameLower.startsWith(queryLower);
      const bStartsWith = bNameLower.startsWith(queryLower);
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;

      // 3. Contains query
      const aContains = aNameLower.includes(queryLower);
      const bContains = bNameLower.includes(queryLower);
      if (aContains && !bContains) return -1;
      if (!aContains && bContains) return 1;

      // 4. By hearts
      return (b.hearts || 0) - (a.hearts || 0);
    });

    // Limit to 50 results
    maps = maps.slice(0, 50);

    const hearted_maps = user?.hearted_maps || [];

    const sendableMaps = maps.map(map => {
      return sendableMap(
        map,
        { username: map.map_creator_name || 'Unknown' },
        hearted_maps.includes(map.id),
        user?.staff,
        map.created_by === user?.id
      );
    });

    return NextResponse.json(sendableMaps);

  } catch (error) {
    console.error('Error searching maps:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
