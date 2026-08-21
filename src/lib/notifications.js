/**
 * Notification data and state management for LostStreet.
 * Includes local storage persistence for read/unread state.
 */

export const INITIAL_NOTIFICATIONS = [];

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
