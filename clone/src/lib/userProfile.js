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
      createdAt: new Date().toISOString()
    };
    await setDoc(userRef, newProfile);
    return newProfile;
  }
};
