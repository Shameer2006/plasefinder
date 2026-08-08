import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');
    
    if (!uid) {
      return NextResponse.json({ games: [], error: 'Missing UID' }, { status: 400 });
    }

    // Check if Firebase service account credentials are provided
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      return NextResponse.json({ games: [] });
    }

    if (!adminDb) {
      return NextResponse.json({ games: [] });
    }

    const snapshot = await adminDb.collection('gameResults')
      .where('uid', '==', uid)
      .orderBy('date', 'desc')
      .limit(20)
      .get();
      
    const history = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ games: history });
  } catch (error) {
    console.warn('Notice: Could not load game history (Firebase credentials missing or uninitialized):', error.message);
    return NextResponse.json({ games: [] });
  }
}

