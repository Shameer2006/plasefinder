import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const elo = parseInt(searchParams.get('elo'), 10);
    
    if (isNaN(elo)) {
      return NextResponse.json({ rank: 1, error: 'Invalid ELO' }, { status: 400 });
    }

    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      return NextResponse.json({ rank: 1 });
    }

    if (!adminDb) {
      return NextResponse.json({ rank: 1 });
    }

    const snapshot = await adminDb.collection('users')
      .where('elo', '>', elo)
      .count()
      .get();
      
    const rank = snapshot.data().count + 1;

    return NextResponse.json({ rank });
  } catch (error) {
    console.warn('Notice: Could not fetch global ELO rank (Firebase credentials missing or uninitialized):', error.message);
    return NextResponse.json({ rank: 1 });
  }
}

