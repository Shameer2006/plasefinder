import { db, auth } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const saveGameResult = async (score, difficulty, rounds) => {
  if (!db || !auth.currentUser) return;
  
  try {
    const docRef = await addDoc(collection(db, 'gameResults'), {
      uid: auth.currentUser.uid,
      score,
      difficulty,
      rounds,
      timestamp: serverTimestamp()
    });
    console.log("Game result saved with ID: ", docRef.id);
  } catch (e) {
    console.error("Error saving game result: ", e);
  }
};
