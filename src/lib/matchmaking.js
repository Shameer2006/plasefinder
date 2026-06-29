import { collection, doc, setDoc, getDocs, query, where, orderBy, limit, runTransaction, onSnapshot, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// Add a player to the queue or match them with someone waiting
export const joinQueue = async (userProfile, onMatchFound) => {
  if (!db || !userProfile) return null;

  const queueRef = collection(db, 'queue');
  
  // Try to find someone waiting
  const q = query(queueRef, where('status', '==', 'waiting'), orderBy('createdAt'), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Found someone! Try to match with them using a transaction
    const matchDoc = querySnapshot.docs[0];
    const matchRef = doc(db, 'queue', matchDoc.id);
    const gameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(matchRef);
        if (!sfDoc.exists() || sfDoc.data().status !== 'waiting') {
          throw "Document changed state or doesn't exist.";
        }

        // Create the game session document
        const gameRef = doc(db, 'matches', gameId);
        transaction.set(gameRef, {
          players: {
            [sfDoc.data().uid]: { displayName: sfDoc.data().displayName, elo: sfDoc.data().elo, score: 0, ready: false },
            [userProfile.uid]: { displayName: userProfile.displayName, elo: userProfile.elo, score: 0, ready: false }
          },
          status: 'waiting_for_players',
          round: 1,
          createdAt: serverTimestamp()
        });

        // Update the queue doc so the other player knows
        transaction.update(matchRef, {
          status: 'matched',
          gameId: gameId,
          player2: userProfile.uid
        });
      });

      // Transaction succeeded, match found!
      onMatchFound(gameId);
      return null; // We didn't create a queue listener
    } catch (e) {
      console.error("Transaction failed, trying again...", e);
      // Fall through to create our own queue document if transaction failed
    }
  }

  // Nobody waiting (or transaction failed), create our own queue document
  const myQueueRef = doc(queueRef, userProfile.uid);
  await setDoc(myQueueRef, {
    uid: userProfile.uid,
    displayName: userProfile.displayName,
    elo: userProfile.elo,
    status: 'waiting',
    createdAt: serverTimestamp()
  });

  // Listen for someone to match with us
  const unsubscribe = onSnapshot(myQueueRef, (snapshot) => {
    const data = snapshot.data();
    if (data && data.status === 'matched' && data.gameId) {
      onMatchFound(data.gameId);
      deleteDoc(myQueueRef); // Cleanup
    }
  });

  return { unsubscribe, queueId: myQueueRef.id };
};

export const leaveQueue = async (uid) => {
  if (!db || !uid) return;
  const myQueueRef = doc(db, 'queue', uid);
  await deleteDoc(myQueueRef);
};

// --- Party Lobby Functions ---

const generateGameCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const createParty = async (userProfile) => {
  if (!db || !userProfile) return null;
  const gameId = `party_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const code = generateGameCode();
  
  const gameRef = doc(db, 'matches', gameId);
  await setDoc(gameRef, {
    code: code,
    status: 'waiting_for_players',
    round: 1,
    createdAt: serverTimestamp(),
    players: {
      [userProfile.uid]: { 
        displayName: userProfile.displayName, 
        elo: userProfile.elo, 
        score: 0, 
        ready: false,
        host: true 
      }
    },
    options: {
      rounds: 5
    }
  });

  return gameId;
};

export const joinParty = async (userProfile, code) => {
  if (!db || !userProfile || !code) return null;
  
  // Find the match by code
  const matchesRef = collection(db, 'matches');
  const q = query(matchesRef, where('code', '==', code.toUpperCase()), where('status', '==', 'waiting_for_players'), limit(1));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    throw new Error('Party not found or already started.');
  }

  const matchDoc = querySnapshot.docs[0];
  const gameId = matchDoc.id;
  
  // Add user to the match
  await runTransaction(db, async (transaction) => {
    const sfDoc = await transaction.get(matchDoc.ref);
    if (!sfDoc.exists() || sfDoc.data().status !== 'waiting_for_players') {
      throw new Error('Party is no longer available.');
    }
    
    // Check if game is full (optional, say max 20 players)
    if (Object.keys(sfDoc.data().players).length >= 20) {
      throw new Error('Party is full.');
    }

    transaction.update(matchDoc.ref, {
      [`players.${userProfile.uid}`]: { 
        displayName: userProfile.displayName, 
        elo: userProfile.elo, 
        score: 0, 
        ready: false,
        host: false
      }
    });
  });

  return gameId;
};

