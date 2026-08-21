import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

// Cache leaderboard data for 5 minutes to avoid excessive Firestore reads
let leaderboardCache = {
  elo: { data: null, timestamp: 0 },
  xp: { data: null, timestamp: 0 },
};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchLeaderboard(sortBy = 'elo', limit = 50) {
  const cacheKey = sortBy;
  const cached = leaderboardCache[cacheKey];

  if (cached.data && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const usersRef = adminDb.collection('users');
  const snapshot = await usersRef
    .orderBy(sortBy, 'desc')
    .limit(limit)
    .get();

  const players = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    players.push({
      uid: doc.id,
      displayName: data.displayName || 'Anonymous',
      elo: data.elo || 1000,
      totalXp: data.totalXp || 0,
      duels_wins: data.duels_wins || 0,
      duels_losses: data.duels_losses || 0,
      dailyChallengeStreak: data.dailyChallengeStreak || 0,
    });
  });

  leaderboardCache[cacheKey] = { data: players, timestamp: Date.now() };
  return players;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sort') === 'xp' ? 'totalXp' : 'elo';

    const players = await fetchLeaderboard(sortBy);

    return NextResponse.json(
      { players, sortBy, cachedAt: new Date().toISOString() },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
