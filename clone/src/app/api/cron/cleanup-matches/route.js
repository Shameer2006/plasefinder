import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET(request) {
  try {
    // Optional: Protect the endpoint with a secret key
    // You can set CRON_SECRET in your .env / Vercel dashboard and pass it via ?secret=YOUR_SECRET
    const urlSecret = new URL(request.url).searchParams.get('secret');
    const CRON_SECRET = process.env.CRON_SECRET;
    
    if (CRON_SECRET && urlSecret !== CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Calculate the cutoff time (24 hours ago)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    let totalDeleted = 0;

    // 1. Clean up old 'matches'
    const matchesRef = adminDb.collection('matches');
    const matchesQuery = matchesRef.where('createdAt', '<', twentyFourHoursAgo);
    const matchesSnapshot = await matchesQuery.get();

    if (!matchesSnapshot.empty) {
      let batch = adminDb.batch();
      for (let i = 0; i < matchesSnapshot.docs.length; i++) {
        batch.delete(matchesSnapshot.docs[i].ref);
        totalDeleted++;
        if ((i + 1) % 500 === 0) {
          await batch.commit();
          batch = adminDb.batch();
        }
      }
      if (matchesSnapshot.docs.length % 500 !== 0) {
        await batch.commit();
      }
    }

    // 2. Clean up old 'queue' entries (in case people got stuck waiting)
    const queueRef = adminDb.collection('queue');
    const queueQuery = queueRef.where('createdAt', '<', twentyFourHoursAgo);
    const queueSnapshot = await queueQuery.get();

    if (!queueSnapshot.empty) {
      let batch = adminDb.batch();
      for (let i = 0; i < queueSnapshot.docs.length; i++) {
        batch.delete(queueSnapshot.docs[i].ref);
        totalDeleted++;
        if ((i + 1) % 500 === 0) {
          await batch.commit();
          batch = adminDb.batch();
        }
      }
      if (queueSnapshot.docs.length % 500 !== 0) {
        await batch.commit();
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully deleted ${totalDeleted} old documents.` 
    });
  } catch (error) {
    console.error('Error cleaning up matches:', error);
    return NextResponse.json({ error: 'Failed to clean up old data.' }, { status: 500 });
  }
}
