import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { verifyAuthAndGetUser } from '@/lib/map/authHelper';

export async function POST(request) {
  try {
    const { user } = await verifyAuthAndGetUser(request);
    const body = await request.json();
    const { mapId, action, rejectReason, resubmittable } = body;

    if (!mapId || !action || typeof mapId !== 'string' || typeof action !== 'string') {
      return NextResponse.json({ message: 'Missing or invalid fields' }, { status: 400 });
    }

    if (rejectReason && rejectReason.length > 50) {
      return NextResponse.json({ message: 'Reject reason must be 50 characters or less' }, { status: 400 });
    }

    // Check if user is a staff member
    if (!user.staff) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const mapRef = adminDb.collection('maps').doc(mapId);
    const mapDoc = await mapRef.get();

    if (!mapDoc.exists) {
      return NextResponse.json({ message: 'Map not found' }, { status: 404 });
    }

    const mapData = mapDoc.data();
    if (!mapData.in_review) {
      return NextResponse.json({ message: 'Map is not in review' }, { status: 400 });
    }

    if (action === 'approve') {
      await mapRef.update({
        accepted: true,
        in_review: false,
        lastUpdated: new Date()
      });
      return NextResponse.json({ message: 'Map approved successfully' });
      
    } else if (action === 'reject') {
      if (!rejectReason || typeof resubmittable !== 'boolean') {
        return NextResponse.json({ message: 'Reject reason and resubmittable status are required' }, { status: 400 });
      }

      await mapRef.update({
        in_review: false,
        accepted: false,
        reject_reason: rejectReason,
        resubmittable: resubmittable,
        lastUpdated: new Date()
      });
      return NextResponse.json({ message: 'Map rejected successfully with reason: ' + rejectReason });
      
    } else {
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Moderate map error:', error);
    if (error.message === 'Missing or invalid Authorization header' || error.message === 'User not found') {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
