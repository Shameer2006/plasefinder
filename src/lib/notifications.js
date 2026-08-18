/**
 * Notification data and state management for LostStreet.
 * Includes local storage persistence for read/unread state.
 */

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'asia_streets_pack',
    title: 'New Map Pack: Asia Streets 🌏',
    description: '100+ new locations added across Asia. Explore now and earn bonus coins!',
    category: 'UPDATES',
    isNew: true,
    unread: true,
    timestamp: '2h ago',
    badges: [
      { text: 'UPDATE', type: 'update' },
      { text: '+100 🪙', type: 'coins' }
    ],
    imageType: 'asia',
    actionType: 'explore_asia',
    actionUrl: '/chronicles'
  },
  {
    id: 'global_challenge_league',
    title: 'Global Challenge League 🏆',
    description: 'Compete with players worldwide and climb the ranks to win exclusive rewards!',
    category: 'EVENTS',
    isNew: false,
    unread: true,
    timestamp: '1d ago',
    badges: [
      { text: 'EVENT', type: 'event' },
      { text: '⏱️ Starts in 3d 14h', type: 'timer' }
    ],
    imageType: 'trophy',
    actionType: 'open_leaderboard',
    actionUrl: '/leaderboard'
  },
  {
    id: 'daily_login_bonus',
    title: 'Daily Login Bonus',
    description: 'Come back tomorrow to earn more coins!',
    category: 'REWARDS',
    isNew: false,
    unread: false,
    timestamp: '2d ago',
    badges: [
      { text: 'REWARD', type: 'reward' },
      { text: '+50 🪙', type: 'coins' }
    ],
    imageType: 'coins',
    actionType: 'open_daily_rewards'
  },
  {
    id: 'performance_improvements',
    title: 'Performance Improvements',
    description: "We've improved game performance and fixed minor bugs.",
    category: 'SYSTEM',
    isNew: false,
    unread: false,
    timestamp: '3d ago',
    badges: [
      { text: 'SYSTEM', type: 'system' }
    ],
    imageType: 'shield',
    actionType: 'open_about',
    actionUrl: '/about'
  }
];

const STORAGE_KEY = 'loststreet_notifications_state';

/**
 * Loads notification items merged with user's read status from localStorage.
 */
export function getNotifications() {
  if (typeof window === 'undefined') return INITIAL_NOTIFICATIONS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_NOTIFICATIONS;
    const readState = JSON.parse(raw); // { [id]: { read: boolean } }

    return INITIAL_NOTIFICATIONS.map(item => ({
      ...item,
      unread: readState[item.id] !== undefined ? !readState[item.id].read : item.unread
    }));
  } catch (e) {
    return INITIAL_NOTIFICATIONS;
  }
}

/**
 * Marks a single notification as read in localStorage.
 */
export function markAsRead(id) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const readState = raw ? JSON.parse(raw) : {};
    readState[id] = { read: true, readAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readState));
  } catch (e) {}
}

/**
 * Marks all notifications as read in localStorage.
 */
export function markAllAsRead() {
  if (typeof window === 'undefined') return;
  try {
    const readState = {};
    INITIAL_NOTIFICATIONS.forEach(item => {
      readState[item.id] = { read: true, readAt: new Date().toISOString() };
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readState));
  } catch (e) {}
}

/**
 * Gets count of unread notifications.
 */
export function getUnreadCount() {
  const list = getNotifications();
  return list.filter(item => item.unread).length;
}
