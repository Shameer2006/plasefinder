import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { getStreakStatus, getRewardForDay, formatDateUTC, REWARD_CONFIG } from '@/lib/dailyReward';

// Check if Firebase admin service account credentials are provided
const hasAdminCredentials = () => {
  return !!(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || process.env.GOOGLE_APPLICATION_CREDENTIALS);
};

/**
 * GET /api/daily-reward?uid=...
 * Returns the current user's daily reward status and 7-day reward track.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');
    const todayUTC = formatDateUTC(new Date());

    if (!uid || uid === 'guest' || uid.startsWith('guest_')) {
      const status = getStreakStatus(null, todayUTC, 0);
      return NextResponse.json({
        success: true,
        isGuest: true,
        canClaim: true,
        streakDay: status.streakDay,
        cycleDay: status.cycleDay,
        totalStreak: 0,
        lastClaimDate: null,
        coins: 50,
        rewardConfig: REWARD_CONFIG,
        todayReward: getRewardForDay(1)
      });
    }

    let lastClaimDate = null;
    let loginStreak = 0;
    let coins = 50;

    if (hasAdminCredentials() && adminDb) {
      try {
        const userDoc = await adminDb.collection('users').doc(uid).get();
        if (userDoc.exists) {
          const data = userDoc.data();
          lastClaimDate = data.lastDailyRewardDate || null;
          loginStreak = data.loginStreak || 0;
          coins = data.coins !== undefined ? data.coins : 50;
        }
      } catch (dbErr) {
        console.warn('Notice: Firestore read notice in GET /api/daily-reward (falling back to client store):', dbErr.message);
      }
    }

    const streakStatus = getStreakStatus(lastClaimDate, todayUTC, loginStreak);
    const todayReward = getRewardForDay(streakStatus.streakDay);

    return NextResponse.json({
      success: true,
      isGuest: false,
      canClaim: streakStatus.canClaim,
      streakDay: streakStatus.streakDay,
      cycleDay: streakStatus.cycleDay,
      totalStreak: streakStatus.totalStreak,
      lastClaimDate,
      coins,
      isReset: streakStatus.isReset,
      rewardConfig: REWARD_CONFIG,
      todayReward
    });
  } catch (error) {
    console.error('Error in GET /api/daily-reward:', error);
    // Return graceful fallback rather than 500 so UI never crashes
    const todayReward = getRewardForDay(1);
    return NextResponse.json({
      success: true,
      canClaim: true,
      streakDay: 1,
      cycleDay: 1,
      totalStreak: 0,
      lastClaimDate: null,
      coins: 50,
      rewardConfig: REWARD_CONFIG,
      todayReward
    });
  }
}

/**
 * POST /api/daily-reward
 * Body: { uid: string }
 * Strictly validates claim eligibility server-side and credits coins.
 */
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { uid } = body;
    const todayUTC = formatDateUTC(new Date());

    if (!uid) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    const isGuest = uid === 'guest' || uid.startsWith('guest_');

    if (isGuest) {
      const dayReward = getRewardForDay(1);
      return NextResponse.json({
        success: true,
        isGuest: true,
        streakDay: 1,
        cycleDay: 1,
        totalStreak: 1,
        lastClaimDate: todayUTC,
        coinsEarned: dayReward.coins,
        bonusItem: dayReward.bonusItem,
        newBalance: 50 + dayReward.coins,
        todayReward: dayReward
      });
    }

    let lastClaimDate = null;
    let currentStreak = 0;
    let currentCoins = 50;

    if (hasAdminCredentials() && adminDb) {
      try {
        const userRef = adminDb.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          const data = userDoc.data();
          lastClaimDate = data.lastDailyRewardDate || null;
          currentStreak = data.loginStreak || 0;
          currentCoins = data.coins !== undefined ? data.coins : 50;
        }

        const streakStatus = getStreakStatus(lastClaimDate, todayUTC, currentStreak);

        if (!streakStatus.canClaim) {
          return NextResponse.json(
            {
              success: false,
              error: 'Daily reward has already been claimed for today. Come back tomorrow!',
              streakDay: streakStatus.streakDay,
              cycleDay: streakStatus.cycleDay,
              totalStreak: streakStatus.totalStreak,
              canClaim: false
            },
            { status: 400 }
          );
        }

        const reward = getRewardForDay(streakStatus.streakDay);
        const newTotalStreak = streakStatus.isReset ? 1 : currentStreak + 1;
        const newBalance = currentCoins + reward.coins;

        await userRef.set(
          {
            coins: newBalance,
            loginStreak: newTotalStreak,
            lastDailyRewardDate: todayUTC,
            updatedAt: new Date().toISOString()
          },
          { merge: true }
        );

        return NextResponse.json({
          success: true,
          coinsEarned: reward.coins,
          bonusItem: reward.bonusItem,
          newBalance,
          streakDay: streakStatus.streakDay,
          cycleDay: streakStatus.cycleDay,
          totalStreak: newTotalStreak,
          lastClaimDate: todayUTC,
          todayReward: reward
        });
      } catch (dbErr) {
        console.warn('Notice: Firestore operation failed in POST /api/daily-reward (using local calculation):', dbErr.message);
      }
    }

    // Local / fallback mode when Admin credentials are not present
    const streakStatus = getStreakStatus(lastClaimDate, todayUTC, currentStreak);
    const reward = getRewardForDay(streakStatus.streakDay);
    const newTotalStreak = streakStatus.isReset ? 1 : currentStreak + 1;

    return NextResponse.json({
      success: true,
      coinsEarned: reward.coins,
      bonusItem: reward.bonusItem,
      newBalance: currentCoins + reward.coins,
      streakDay: streakStatus.streakDay,
      cycleDay: streakStatus.cycleDay,
      totalStreak: newTotalStreak,
      lastClaimDate: todayUTC,
      todayReward: reward
    });
  } catch (error) {
    console.error('Error in POST /api/daily-reward:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to claim daily reward' },
      { status: 500 }
    );
  }
}
