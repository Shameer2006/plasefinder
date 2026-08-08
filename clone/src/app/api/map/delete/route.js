import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { verifyAuthAndGetUser } from '@/lib/map/authHelper';

export async function DELETE(request) {
  try {
    const { user, uid } = await verifyAuthAndGetUser(request);
    const body = await request.json();
    const { mapId } = body;

    if (!mapId || typeof mapId !== 'string') {
      return NextResponse.json({ message: 'Missing or invalid mapId' }, { status: 400 });
    }

    const mapRef = adminDb.collection('maps').doc(mapId);
    const mapDoc = await mapRef.get();

    if (!mapDoc.exists) {
      return NextResponse.json({ message: 'Map not found' }, { status: 404 });
    }

    const mapData = mapDoc.data();

    // Check ownership or staff
    if (mapData.created_by !== uid && !user.staff) {
      return NextResponse.json({ message: 'You do not have permission to delete this map' }, { status: 403 });
    }

    await mapRef.delete();

    return NextResponse.json({ message: 'Map deleted successfully' });

  } catch (error) {
    console.error('Map delete error:', error);
    if (error.message === 'Missing or invalid Authorization header' || error.message === 'User not found') {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
