/**
 * Pure logic module for LostStreet Daily Rewards and Login Streaks.
 * All functions are deterministic and pure with no side effects for easy unit testing.
 */

export const REWARD_CONFIG = [
  { day: 1, coins: 20, title: 'Day 1', bonusItem: null, icon: '🪙', description: '20 Coins' },
  { day: 2, coins: 30, title: 'Day 2', bonusItem: null, icon: '🪙', description: '30 Coins' },
  { day: 3, coins: 40, title: 'Day 3', bonusItem: null, icon: '🪙', description: '40 Coins' },
  { day: 4, coins: 60, title: 'Day 4', bonusItem: null, icon: '🪙', description: '60 Coins' },
  { day: 5, coins: 80, title: 'Day 5', bonusItem: null, icon: '🪙', description: '80 Coins' },
  { day: 6, coins: 100, title: 'Day 6', bonusItem: null, icon: '🪙', description: '100 Coins' },
  {
    day: 7,
    coins: 150,
    title: 'Day 7',
    bonusItem: {
      id: 'mystery_compass',
      name: 'Mystery Compass Clue Pack',
      icon: '🧭',
      description: '150 Coins + Explorer Compass & 50/50 Power Token'
    },
    icon: '👑',
    description: '150 Coins + Mystery Bonus'
  }
];

/**
 * Formats a Date object or timestamp into UTC 'YYYY-MM-DD'
 * @param {Date|string|number} dateInput
 * @returns {string} 'YYYY-MM-DD'
 */
export function formatDateUTC(dateInput = new Date()) {
  const d = typeof dateInput === 'string' || typeof dateInput === 'number'
    ? new Date(dateInput)
    : dateInput;
  
  if (isNaN(d.getTime())) {
    const now = new Date();
    return now.toISOString().slice(0, 10);
  }
  return d.toISOString().slice(0, 10);
}

/**
 * Calculates calendar day difference between two dates in UTC
 * @param {string|Date} dateStrA 'YYYY-MM-DD'
 * @param {string|Date} dateStrB 'YYYY-MM-DD'
 * @returns {number} day difference (dateB - dateA)
 */
export function getCalendarDayDiff(dateStrA, dateStrB) {
  if (!dateStrA || !dateStrB) return Infinity;

  const cleanA = typeof dateStrA === 'string' ? dateStrA.slice(0, 10) : formatDateUTC(dateStrA);
  const cleanB = typeof dateStrB === 'string' ? dateStrB.slice(0, 10) : formatDateUTC(dateStrB);

  const [y1, m1, d1] = cleanA.split('-').map(Number);
  const [y2, m2, d2] = cleanB.split('-').map(Number);

  const utc1 = Date.UTC(y1, m1 - 1, d1);
  const utc2 = Date.UTC(y2, m2 - 1, d2);

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  return Math.floor((utc2 - utc1) / MS_PER_DAY);
}

/**
 * Evaluates streak status based on last claim date and current date.
 * - Same day (diff == 0) => canClaim: false, current streakDay
 * - Yesterday (diff == 1) => canClaim: true, next streakDay = lastStreak + 1
 * - Gap > 1 day (diff > 1) => canClaim: true, reset to streakDay: 1
 * - Never claimed (lastClaimDate == null) => canClaim: true, streakDay: 1
 * 
 * @param {string|null} lastClaimDate 'YYYY-MM-DD' or ISO string
 * @param {string|Date} todayDate 'YYYY-MM-DD' or Date object
 * @param {number} currentStreak Current consecutive streak count (default 0)
 * @returns {{
 *   streakDay: number,         // 1 to 7 cycle day ready to claim or claimed
 *   totalStreak: number,       // Total continuous days logged in
 *   canClaim: boolean,         // Whether user can claim today's reward
 *   cycleDay: number,          // Day 1-7 in current reward track
 *   daysDiff: number,          // Difference in days
 *   isReset: boolean           // True if user missed a day and streak reset
 * }}
 */
export function getStreakStatus(lastClaimDate, todayDate = new Date(), currentStreak = 0) {
  const safeStreak = Math.max(0, parseInt(currentStreak, 10) || 0);
  const todayStr = formatDateUTC(todayDate);

  if (!lastClaimDate) {
    // First time claiming
    return {
      streakDay: 1,
      totalStreak: 0,
      canClaim: true,
      cycleDay: 1,
      daysDiff: Infinity,
      isReset: false
    };
  }

  const lastClaimStr = formatDateUTC(lastClaimDate);
  const diff = getCalendarDayDiff(lastClaimStr, todayStr);

  if (diff === 0) {
    // Already claimed today
    const cycleDay = safeStreak > 0 ? ((safeStreak - 1) % 7) + 1 : 1;
    return {
      streakDay: cycleDay,
      totalStreak: safeStreak,
      canClaim: false,
      cycleDay,
      daysDiff: 0,
      isReset: false
    };
  }

  if (diff === 1) {
    // Consecutive day login -> streak continues
    const newTotalStreak = safeStreak + 1;
    const cycleDay = ((newTotalStreak - 1) % 7) + 1;
    return {
      streakDay: cycleDay,
      totalStreak: safeStreak,
      canClaim: true,
      cycleDay,
      daysDiff: 1,
      isReset: false
    };
  }

  if (diff > 1) {
    // Missed at least one day -> reset to Day 1
    return {
      streakDay: 1,
      totalStreak: 0,
      canClaim: true,
      cycleDay: 1,
      daysDiff: diff,
      isReset: true
    };
  }

  // Fallback for negative diff (e.g. clock manipulation / UTC boundary)
  return {
    streakDay: 1,
    totalStreak: safeStreak,
    canClaim: false,
    cycleDay: safeStreak > 0 ? ((safeStreak - 1) % 7) + 1 : 1,
    daysDiff: diff,
    isReset: false
  };
}

/**
 * Returns reward info for a given day (1-7 or higher, automatically cycled with modulo 7)
 * @param {number} dayNumber 
 * @returns {typeof REWARD_CONFIG[0]}
 */
export function getRewardForDay(dayNumber) {
  const safeDay = Math.max(1, parseInt(dayNumber, 10) || 1);
  const index = (safeDay - 1) % 7;
  const config = REWARD_CONFIG[index];
  return {
    ...config,
    calculatedDay: safeDay,
    cycleDay: index + 1
  };
}
