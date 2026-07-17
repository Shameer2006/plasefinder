import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const elo = parseInt(searchParams.get('elo'), 10);
    
    if (isNaN(elo)) {
      return NextResponse.json({ error: 'Invalid ELO' }, { status: 400 });
    }

    if (!adminDb) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
    }

    const snapshot = await adminDb.collection('users')
      .where('elo', '>', elo)
      .count()
      .get();
      
    const rank = snapshot.data().count + 1;

    return NextResponse.json({ rank });
  } catch (error) {
    console.error('Error fetching ELO rank:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
