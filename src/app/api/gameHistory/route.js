import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');
    
    if (!uid) {
      return NextResponse.json({ error: 'Missing UID' }, { status: 400 });
    }

    if (!adminDb) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
    }

    // Since we don't have a gameResults collection created historically in the same way 
    // as the reference, we'll try to fetch whatever we can or return an empty list initially.
    const snapshot = await adminDb.collection('gameResults')
      .where('uid', '==', uid)
      .orderBy('date', 'desc')
      .limit(20)
      .get();
      
    const history = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching game history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
