import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { verifyAuthAndGetUser } from '@/lib/map/authHelper';
import { FieldValue } from 'firebase-admin/firestore';

const HEART_COOLDOWN = 500;
let recentHearts = {};

// Sweep — entries are only ever used inside the HEART_COOLDOWN window
setInterval(() => {
  const cutoff = Date.now() - 60000;
  for (const [id, ts] of Object.entries(recentHearts)) {
    if (ts < cutoff) delete recentHearts[id];
  }
}, 60000).unref();

export async function POST(request) {
  try {
    const { user, uid } = await verifyAuthAndGetUser(request);
    const body = await request.json();
    const { mapId } = body;

    if (!mapId || typeof mapId !== 'string') {
      return NextResponse.json({ message: 'Missing or invalid mapId' }, { status: 400 });
    }

    if (recentHearts[uid] && Date.now() - recentHearts[uid] < HEART_COOLDOWN) {
      return NextResponse.json({ message: 'yourTooFastForUs' }, { status: 429 });
    }

    const mapRef = adminDb.collection('maps').doc(mapId);
    const userRef = adminDb.collection('users').doc(uid);

    const mapDoc = await mapRef.get();
    if (!mapDoc.exists) {
      return NextResponse.json({ message: 'Map not found' }, { status: 404 });
    }

    // Default to empty array if no hearted_maps array exists
    const heartedMaps = user.hearted_maps || [];
    const hasHearted = heartedMaps.includes(mapId);

    if (hasHearted) {
      // Remove heart
      await userRef.update({
        hearted_maps: FieldValue.arrayRemove(mapId)
      });
      await mapRef.update({
        hearts: FieldValue.increment(-1)
      });
    } else {
      // Add heart
      await userRef.update({
        hearted_maps: FieldValue.arrayUnion(mapId)
      });
      await mapRef.update({
        hearts: FieldValue.increment(1)
      });
    }

    // Save in recentHearts
    recentHearts[uid] = Date.now();

    // Fetch updated map to get correct heart count
    const updatedMapDoc = await mapRef.get();
    const currentHearts = updatedMapDoc.data().hearts;

    return NextResponse.json({
      success: true,
      hearted: !hasHearted,
      hearts: Math.max(0, currentHearts) // ensure we don't return negative just in case
    });

  } catch (error) {
    console.error('Map heart error:', error);
    if (error.message === 'Missing or invalid Authorization header' || error.message === 'User not found') {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
