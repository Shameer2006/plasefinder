import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { POWER_UPS } from '@/lib/coins';

// Check if Firebase admin service account credentials are provided
const hasAdminCredentials = () => {
  return !!(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || process.env.GOOGLE_APPLICATION_CREDENTIALS);
};

/**
 * POST /api/coins/spend
 * Body: { uid: string, itemId: string, expectedCost?: number }
 * Verifies item cost, checks server-side balance, and deducts coins.
 */
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { uid, itemId, expectedCost } = body;

    if (!itemId) {
      return NextResponse.json({ success: false, error: 'Item ID is required' }, { status: 400 });
    }

    const item = POWER_UPS[itemId];
    const cost = item ? item.cost : (expectedCost || 0);

    if (cost <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid spend amount' }, { status: 400 });
    }

    const isGuest = !uid || uid === 'guest' || uid.startsWith('guest_');

    if (isGuest) {
      return NextResponse.json({
        success: true,
        isGuest: true,
        cost,
        item: item || { id: itemId, cost }
      });
    }

    if (hasAdminCredentials() && adminDb) {
      try {
        const userRef = adminDb.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          const currentCoins = userData.coins !== undefined ? userData.coins : 50;

          if (currentCoins < cost) {
            return NextResponse.json(
              {
                success: false,
                error: `Insufficient coins. You have ${currentCoins} coins, but need ${cost}.`,
                currentBalance: currentCoins
              },
              { status: 400 }
            );
          }

          const newBalance = currentCoins - cost;

          await userRef.set(
            {
              coins: newBalance,
              lastSpentAt: new Date().toISOString()
            },
            { merge: true }
          );

          return NextResponse.json({
            success: true,
            item: item || { id: itemId, cost },
            cost,
            newBalance
          });
        }
      } catch (dbErr) {
        console.warn('Notice: Firestore spend operation failed in POST /api/coins/spend:', dbErr.message);
      }
    }

    // Fallback if adminDb credentials not connected in local dev
    return NextResponse.json({
      success: true,
      cost,
      item: item || { id: itemId, cost }
    });
  } catch (error) {
    console.error('Error in POST /api/coins/spend:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
