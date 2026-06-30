import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export const getOrCreateUserProfile = async (user) => {
  if (!db || !user || user.isAnonymous) return null;

  const userRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    const newProfile = {
      uid: user.uid,
      displayName: user.displayName || 'Explorer',
      email: user.email,
      elo: 1000,
      totalXp: 0,
      duels_wins: 0,
      duels_losses: 0,
      dailyChallengeStreak: 0,
      lastDailyChallengeDate: null,
      createdAt: new Date().toISOString()
    };
    await setDoc(userRef, newProfile);
    return newProfile;
  }
};

export const updateDailyChallengeStreak = async (uid, newStreak, dateString) => {
  if (!db || !uid) return;
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, {
    dailyChallengeStreak: newStreak,
    lastDailyChallengeDate: dateString
  }, { merge: true });
};

export const calculateLevel = (xp) => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const addXp = async (uid, xpEarned) => {
  if (!db || !uid || xpEarned <= 0) return null;
  const userRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userRef);
  
  if (!docSnap.exists()) return null;
  
  const currentData = docSnap.data();
  const currentXp = currentData.totalXp || 0;
  const newXp = currentXp + xpEarned;
  
  const currentLevel = calculateLevel(currentXp);
  const newLevel = calculateLevel(newXp);
  
  await setDoc(userRef, { totalXp: newXp }, { merge: true });
  
  return {
    oldXp: currentXp,
    newXp,
    levelUp: newLevel > currentLevel,
    newLevel
  };
};
