import { doc, getDoc, setDoc, deleteDoc, getDocs, collection, query, where, limit } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Creates a two-way friend connection between user A and user B.
 */
export async function addFriendConnection(currentUser, friendUser) {
  if (!db || !currentUser?.uid || !friendUser?.uid) return false;
  if (currentUser.uid === friendUser.uid) return false;

  try {
    const now = new Date().toISOString();

    // 1. Add friend to current user's friends collection
    const userFriendRef = doc(db, 'users', currentUser.uid, 'friends', friendUser.uid);
    await setDoc(userFriendRef, {
      uid: friendUser.uid,
      displayName: friendUser.displayName || friendUser.username || 'Explorer',
      username: friendUser.username || friendUser.displayName || 'Explorer',
      countryCode: friendUser.countryCode || 'un',
      elo: friendUser.elo || 1000,
      totalXp: friendUser.totalXp || 0,
      addedAt: now,
      status: 'active'
    }, { merge: true });

    // 2. Add current user to friend's friends collection
    const friendUserRef = doc(db, 'users', friendUser.uid, 'friends', currentUser.uid);
    await setDoc(friendUserRef, {
      uid: currentUser.uid,
      displayName: currentUser.displayName || currentUser.username || 'Explorer',
      username: currentUser.username || currentUser.displayName || 'Explorer',
      countryCode: currentUser.countryCode || 'un',
      elo: currentUser.elo || 1000,
      totalXp: currentUser.totalXp || 0,
      addedAt: now,
      status: 'active'
    }, { merge: true });

    return true;
  } catch (error) {
    console.error('Error connecting friends in Firestore:', error);
    return false;
  }
}

/**
 * Connect with an inviter via their UID (from ?friend=UID link).
 */
export async function connectViaInviteUid(currentUser, inviterUid) {
  if (!db || !currentUser?.uid || !inviterUid) return null;
  if (currentUser.uid === inviterUid) return null;

  try {
    // Fetch inviter's profile
    const inviterDocRef = doc(db, 'users', inviterUid);
    const inviterSnap = await getDoc(inviterDocRef);

    if (!inviterSnap.exists()) {
      return null;
    }

    const inviterData = { uid: inviterUid, ...inviterSnap.data() };
    const success = await addFriendConnection(currentUser, inviterData);
    if (success) {
      return inviterData;
    }
    return null;
  } catch (error) {
    console.error('Error connecting via invite UID:', error);
    return null;
  }
}

/**
 * Fetch list of all friends for a given user UID.
 */
export async function getFriendsList(uid) {
  if (!db || !uid) return [];

  try {
    const friendsRef = collection(db, 'users', uid, 'friends');
    const snapshot = await getDocs(friendsRef);
    const friends = [];

    snapshot.forEach(docSnap => {
      friends.push({ id: docSnap.id, ...docSnap.data() });
    });

    // Sort by most recently added or by ELO
    friends.sort((a, b) => (b.elo || 0) - (a.elo || 0));
    return friends;
  } catch (error) {
    console.error('Error fetching friends list:', error);
    return [];
  }
}

/**
 * Remove a friend from the user's friend list.
 */
export async function removeFriend(uid, friendUid) {
  if (!db || !uid || !friendUid) return false;

  try {
    const userFriendRef = doc(db, 'users', uid, 'friends', friendUid);
    await deleteDoc(userFriendRef);

    const friendUserRef = doc(db, 'users', friendUid, 'friends', uid);
    await deleteDoc(friendUserRef);

    return true;
  } catch (error) {
    console.error('Error removing friend:', error);
    return false;
  }
}

/**
 * Search user by username or display name.
 */
export async function searchUserByUsername(searchQuery) {
  if (!db || !searchQuery) return [];
  const cleanQuery = searchQuery.trim().toLowerCase();

  try {
    const usersRef = collection(db, 'users');
    // Search exact username match or start match
    const q = query(
      usersRef,
      where('username', '>=', cleanQuery),
      where('username', '<=', cleanQuery + '\uf8ff'),
      limit(5)
    );

    const snapshot = await getDocs(q);
    const results = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      results.push({
        uid: docSnap.id,
        displayName: data.displayName || data.username || 'Explorer',
        username: data.username || data.displayName || 'Explorer',
        countryCode: data.countryCode || 'un',
        elo: data.elo || 1000,
        totalXp: data.totalXp || 0
      });
    });

    return results;
  } catch (error) {
    console.error('Error searching user by username:', error);
    return [];
  }
}
