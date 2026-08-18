/**
 * Coin economy management and power-up spend functions.
 * Integrates client-side optimistic checking with server-side validation.
 */

export const POWER_UPS = {
  hint: {
    id: 'hint',
    name: 'Country Clue',
    cost: 15,
    icon: '💡',
    description: 'Reveals contextual hints about the culture, terrain, or geography.'
  },
  fifty_fifty: {
    id: 'fifty_fifty',
    name: '50/50 Eliminator',
    cost: 20,
    icon: '✂️',
    description: 'Eliminates 2 incorrect country options in Multiple Choice mode.'
  },
  round_skip: {
    id: 'round_skip',
    name: 'Round Skip',
    cost: 25,
    icon: '⏭️',
    description: 'Skips an impossible panorama without breaking your streak or scoring 0.'
  }
};

/**
 * Checks if a user has sufficient balance for a power-up or custom coin amount.
 * @param {number} currentBalance 
 * @param {string|number} itemOrAmount itemId string or number of coins
 * @returns {boolean}
 */
export function canAfford(currentBalance, itemOrAmount) {
  const balance = Math.max(0, parseInt(currentBalance, 10) || 0);
  const cost = typeof itemOrAmount === 'number'
    ? itemOrAmount
    : (POWER_UPS[itemOrAmount]?.cost || 0);
  
  return balance >= cost && cost > 0;
}

/**
 * Executes a coin spend transaction.
 * Validates on client first for responsive UX, then confirms with server via /api/coins/spend.
 * 
 * @param {string} itemId 'hint' | 'fifty_fifty' | 'round_skip'
 * @param {string} uid User ID or guest identifier
 * @param {number} currentBalance Current local balance
 * @returns {Promise<{ success: boolean, newBalance: number, item?: object, error?: string }>}
 */
export async function spendCoins(itemId, uid, currentBalance = 0) {
  const item = POWER_UPS[itemId];
  if (!item) {
    return { success: false, newBalance: currentBalance, error: 'Invalid item' };
  }

  if (!canAfford(currentBalance, item.cost)) {
    return {
      success: false,
      newBalance: currentBalance,
      error: `Not enough coins! Need ${item.cost} coins (You have ${currentBalance}).`
    };
  }

  // Optimistic new balance
  const optimisticBalance = currentBalance - item.cost;

  try {
    const res = await fetch('/api/coins/spend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: uid || 'guest',
        itemId,
        expectedCost: item.cost
      })
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        success: false,
        newBalance: currentBalance,
        error: data.error || 'Server rejected coin spend transaction'
      };
    }

    const data = await res.json();
    return {
      success: true,
      newBalance: typeof data.newBalance === 'number' ? data.newBalance : optimisticBalance,
      item
    };
  } catch (err) {
    console.warn('Spend API network warning, applying local fallback:', err);
    // Offline / guest fallback
    return {
      success: true,
      newBalance: optimisticBalance,
      item
    };
  }
}
