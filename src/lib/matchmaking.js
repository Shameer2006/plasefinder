import { collection, doc, setDoc, getDocs, query, where, orderBy, limit, runTransaction, onSnapshot, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// --- Ranked Duel Queue ---
export const joinRankedQueue = async (userProfile, onMatchFound) => {
  if (!db || !userProfile) return null;

  const queueRef = collection(db, 'queue_ranked');
  const userElo = userProfile.elo || 1000;
  let eloRange = 100;

  // Try to find someone within ELO range
  const findMatch = async () => {
    const q = query(queueRef, where('status', '==', 'waiting'));
    const snapshot = await getDocs(q);
    
    for (const matchDoc of snapshot.docs) {
      const data = matchDoc.data();
      if (data.uid === userProfile.uid) continue;
      if (Math.abs(data.elo - userElo) <= eloRange) {
        return matchDoc;
      }
    }
    return null;
  };

  const matchDoc = await findMatch();

  if (matchDoc) {
    const matchRef = doc(db, 'queue_ranked', matchDoc.id);
    const matchData = matchDoc.data();
    const gameId = `ranked_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(matchRef);
        if (!sfDoc.exists() || sfDoc.data().status !== 'waiting') {
          throw "Document changed state";
        }

        const gameRef = doc(db, 'matches', gameId);
        transaction.set(gameRef, {
          gameType: 'ranked_duel',
          players: {
            [matchData.uid]: {
              displayName: matchData.username || matchData.displayName,
              elo: matchData.elo,
              countryCode: matchData.countryCode || '',
              score: 0,
              ready: false
            },
            [userProfile.uid]: {
              displayName: userProfile.username || userProfile.displayName,
              elo: userProfile.elo,
              countryCode: userProfile.countryCode || '',
              score: 0,
              ready: false
            }
          },
          health: {
            [matchData.uid]: 5000,
            [userProfile.uid]: 5000
          },
          status: 'waiting_for_players',
          round: 1,
          roundStartTime: null,
          createdAt: serverTimestamp(),
          options: {
            rounds: 5,
            timeLimit: 60,
            difficulty: 'HARD'
          }
        });

        transaction.update(matchRef, {
          status: 'matched',
          gameId: gameId,
          player2: userProfile.uid
        });
      });

      onMatchFound(gameId);
      return null;
    } catch (e) {
      console.error("Ranked transaction failed:", e);
    }
  }

  // No match found, create queue entry
  const myQueueRef = doc(queueRef, userProfile.uid);
  await setDoc(myQueueRef, {
    uid: userProfile.uid,
    displayName: userProfile.username || userProfile.displayName,
    elo: userProfile.elo || 1000,
    countryCode: userProfile.countryCode || '',
    status: 'waiting',
    createdAt: serverTimestamp()
  });

  let isMatched = false;

  // Widen ELO range every 5 seconds
  const rangeWidener = setInterval(async () => {
    if (isMatched) { clearInterval(rangeWidener); return; }
    eloRange = Math.min(eloRange + 100, 500);
  }, 5000);

  // Bot fallback after 20 seconds
  const botTimer = setTimeout(async () => {
    if (isMatched) return;
    isMatched = true;
    clearInterval(rangeWidener);
    if (unsubscribe) unsubscribe();
    await deleteDoc(myQueueRef);

    const gameId = `ranked_bot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const botNames = ['MapMaster 🤖', 'GlobalGuesser 🤖', 'StreetExplorer 🤖', 'GeoPro 🤖', 'LostFinder 🤖'];
    const selectedBotName = botNames[Math.floor(Math.random() * botNames.length)];
    const botElo = Math.max(400, userElo + Math.round((Math.random() - 0.5) * 100));

    const gameRef = doc(db, 'matches', gameId);
    await setDoc(gameRef, {
      gameType: 'ranked_duel',
      players: {
        [userProfile.uid]: {
          displayName: userProfile.username || userProfile.displayName,
          elo: userProfile.elo,
          countryCode: userProfile.countryCode || '',
          score: 0,
          ready: false
        },
        'bot_opponent': {
          displayName: selectedBotName,
          elo: botElo,
          countryCode: '',
          score: 0,
          ready: false,
          isBot: true
        }
      },
      health: {
        [userProfile.uid]: 5000,
        'bot_opponent': 5000
      },
      status: 'waiting_for_players',
      round: 1,
      roundStartTime: null,
      createdAt: serverTimestamp(),
      options: {
        rounds: 5,
        timeLimit: 60,
        difficulty: 'HARD'
      }
    });

    onMatchFound(gameId);
  }, 20000);

  const unsubscribe = onSnapshot(myQueueRef, (snapshot) => {
    const data = snapshot.data();
    if (data && data.status === 'matched' && data.gameId) {
      isMatched = true;
      clearTimeout(botTimer);
      clearInterval(rangeWidener);
      onMatchFound(data.gameId);
      deleteDoc(myQueueRef);
    }
  });

  return {
    unsubscribe: () => {
      clearTimeout(botTimer);
      clearInterval(rangeWidener);
      if (unsubscribe) unsubscribe();
    },
    queueId: myQueueRef.id,
    getEloRange: () => eloRange
  };
};

export const leaveRankedQueue = async (uid) => {
  if (!db || !uid) return;
  const myQueueRef = doc(db, 'queue_ranked', uid);
  await deleteDoc(myQueueRef);
};


// --- Unranked Queue ---
export const joinUnrankedQueue = async (userProfile, onMatchFound) => {
  if (!db || !userProfile) return null;

  const queueRef = collection(db, 'queue_unranked');

  // Try to find someone waiting
  const q = query(queueRef, where('status', '==', 'waiting'), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const matchDoc = querySnapshot.docs[0];
    if (matchDoc.data().uid !== userProfile.uid) {
      const matchRef = doc(db, 'queue_unranked', matchDoc.id);
      const matchData = matchDoc.data();
      const gameId = `unranked_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      try {
        await runTransaction(db, async (transaction) => {
          const sfDoc = await transaction.get(matchRef);
          if (!sfDoc.exists() || sfDoc.data().status !== 'waiting') {
            throw "Document changed state";
          }

          const gameRef = doc(db, 'matches', gameId);
          transaction.set(gameRef, {
            gameType: 'unranked_multiplayer',
            players: {
              [matchData.uid]: {
                displayName: matchData.username || matchData.displayName,
                elo: matchData.elo,
                countryCode: matchData.countryCode || '',
                score: 0,
                ready: false
              },
              [userProfile.uid]: {
                displayName: userProfile.username || userProfile.displayName,
                elo: userProfile.elo,
                countryCode: userProfile.countryCode || '',
                score: 0,
                ready: false
              }
            },
            status: 'waiting_for_players',
            round: 1,
            roundStartTime: null,
            createdAt: serverTimestamp(),
            options: {
              rounds: 5,
              timeLimit: 30,
              difficulty: 'HARD'
            }
          });

          transaction.update(matchRef, {
            status: 'matched',
            gameId: gameId,
            player2: userProfile.uid
          });
        });

        onMatchFound(gameId);
        return null;
      } catch (e) {
        console.error("Unranked transaction failed:", e);
      }
    }
  }

  // No match found, create queue entry
  const myQueueRef = doc(queueRef, userProfile.uid);
  await setDoc(myQueueRef, {
    uid: userProfile.uid,
    displayName: userProfile.username || userProfile.displayName,
    elo: userProfile.elo || 1000,
    countryCode: userProfile.countryCode || '',
    status: 'waiting',
    createdAt: serverTimestamp()
  });

  let isMatched = false;

  // Bot fallback after 10 seconds
  const botTimer = setTimeout(async () => {
    if (isMatched) return;
    isMatched = true;
    if (unsubscribe) unsubscribe();
    await deleteDoc(myQueueRef);

    const gameId = `unranked_bot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const botNames = ['MapMaster 🤖', 'GlobalGuesser 🤖', 'StreetExplorer 🤖', 'GeoPro 🤖', 'LostFinder 🤖'];
    const selectedBotName = botNames[Math.floor(Math.random() * botNames.length)];
    const botElo = Math.max(400, (userProfile.elo || 1000) + Math.round((Math.random() - 0.5) * 120));

    const gameRef = doc(db, 'matches', gameId);
    await setDoc(gameRef, {
      gameType: 'unranked_multiplayer',
      players: {
        [userProfile.uid]: {
          displayName: userProfile.username || userProfile.displayName,
          elo: userProfile.elo,
          countryCode: userProfile.countryCode || '',
          score: 0,
          ready: false
        },
        'bot_opponent': {
          displayName: selectedBotName,
          elo: botElo,
          countryCode: '',
          score: 0,
          ready: false,
          isBot: true
        }
      },
      status: 'waiting_for_players',
      round: 1,
      roundStartTime: null,
      createdAt: serverTimestamp(),
      options: {
        rounds: 5,
        timeLimit: 30,
        difficulty: 'HARD'
      }
    });

    onMatchFound(gameId);
  }, 10000);

  const unsubscribe = onSnapshot(myQueueRef, (snapshot) => {
    const data = snapshot.data();
    if (data && data.status === 'matched' && data.gameId) {
      isMatched = true;
      clearTimeout(botTimer);
      onMatchFound(data.gameId);
      deleteDoc(myQueueRef);
    }
  });

  return {
    unsubscribe: () => {
      clearTimeout(botTimer);
      if (unsubscribe) unsubscribe();
    },
    queueId: myQueueRef.id
  };
};

export const leaveUnrankedQueue = async (uid) => {
  if (!db || !uid) return;
  const myQueueRef = doc(db, 'queue_unranked', uid);
  await deleteDoc(myQueueRef);
};

// Legacy support — redirect to unranked
export const joinQueue = joinUnrankedQueue;
export const leaveQueue = leaveUnrankedQueue;


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
    gameType: 'party',
    status: 'waiting_for_players',
    round: 1,
    createdAt: serverTimestamp(),
    players: {
      [userProfile.uid]: { 
        displayName: userProfile.username || userProfile.displayName, 
        elo: userProfile.elo, 
        countryCode: userProfile.countryCode || '',
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
  
  const cleanCode = code.trim().toUpperCase();
  const matchesRef = collection(db, 'matches');
  const q = query(matchesRef, where('code', '==', cleanCode), limit(1));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    const err = new Error('Party room not found. Please check that the room code is correct.');
    err.code = 'NOT_FOUND';
    throw err;
  }

  const matchDoc = querySnapshot.docs[0];
  const gameId = matchDoc.id;
  const matchData = matchDoc.data();

  // Find host display name if available
  const hostPlayer = Object.values(matchData.players || {}).find(p => p.host);
  const hostName = hostPlayer?.displayName || 'Host';
  const isExistingPlayer = !!matchData.players?.[userProfile.uid];

  // If match has already started
  if (matchData.status === 'playing') {
    if (isExistingPlayer) {
      return { gameId, status: 'playing', isRejoin: true };
    }
    const err = new Error(`The party has already started! (Round ${matchData.round || 1} in progress)`);
    err.code = 'PARTY_ALREADY_STARTED';
    err.partyDetails = {
      code: cleanCode,
      gameId,
      hostName,
      round: matchData.round || 1,
      totalRounds: matchData.options?.rounds || 5,
      playerCount: Object.keys(matchData.players || {}).length,
      mode: matchData.options?.mode || 'Street View'
    };
    throw err;
  }

  if (matchData.status === 'finished') {
    const err = new Error('This party match has already ended. Please ask the host for a new room code.');
    err.code = 'PARTY_FINISHED';
    throw err;
  }

  if (matchData.status !== 'waiting_for_players') {
    const err = new Error('Party is no longer available.');
    err.code = 'NOT_AVAILABLE';
    throw err;
  }

  if (isExistingPlayer) {
    return { gameId, status: 'waiting_for_players', isRejoin: true };
  }

  await runTransaction(db, async (transaction) => {
    const sfDoc = await transaction.get(matchDoc.ref);
    if (!sfDoc.exists()) {
      const err = new Error('Party is no longer available.');
      err.code = 'NOT_AVAILABLE';
      throw err;
    }
    
    const currentData = sfDoc.data();
    if (currentData.status !== 'waiting_for_players') {
      const err = new Error(`The party has already started! (Round ${currentData.round || 1} in progress)`);
      err.code = 'PARTY_ALREADY_STARTED';
      err.partyDetails = {
        code: cleanCode,
        gameId,
        hostName,
        round: currentData.round || 1,
        totalRounds: currentData.options?.rounds || 5,
        playerCount: Object.keys(currentData.players || {}).length
      };
      throw err;
    }
    
    if (Object.keys(currentData.players || {}).length >= 20) {
      const err = new Error('Party lobby is full (maximum 20 players).');
      err.code = 'PARTY_FULL';
      throw err;
    }

    transaction.update(matchDoc.ref, {
      [`players.${userProfile.uid}`]: { 
        displayName: userProfile.username || userProfile.displayName || 'Player', 
        elo: userProfile.elo || 1000, 
        countryCode: userProfile.countryCode || '',
        score: 0, 
        ready: false,
        host: false
      }
    });
  });

  return { gameId, status: 'waiting_for_players', isRejoin: false };
};
