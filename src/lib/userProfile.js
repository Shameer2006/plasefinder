import { doc, getDoc, setDoc, getDocs, collection, query, where, orderBy, limit, addDoc } from 'firebase/firestore';
import { db } from './firebase';

// League tiers
export const LEAGUES = [
  { name: 'Drifter', minElo: 0, maxElo: 1999, color: '#9CA3AF', emoji: '🥾' },
  { name: 'Navigator', minElo: 2000, maxElo: 4999, color: '#60A5FA', emoji: '🧭' },
  { name: 'Cartographer', minElo: 5000, maxElo: 7999, color: '#FBBF24', emoji: '🗺️' },
  { name: 'Sovereign', minElo: 8000, maxElo: Infinity, color: '#A78BFA', emoji: '👑' },
];

export const getLeague = (elo) => {
  return LEAGUES.find(l => elo >= l.minElo && elo <= l.maxElo) || LEAGUES[0];
};

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
      username: '',
      countryCode: '',
      email: user.email,
      elo: 1000,
      totalXp: 0,
      gamesPlayed: 0,
      duels_wins: 0,
      duels_losses: 0,
      duels_tied: 0,
      ranked_wins: 0,
      ranked_losses: 0,
      dailyChallengeStreak: 0,
      lastDailyChallengeDate: null,
      onboardingComplete: false,
      createdAt: new Date().toISOString()
    };
    await setDoc(userRef, newProfile);
    return newProfile;
  }
};

// Username uniqueness check
export const isUsernameTaken = async (username) => {
  if (!db || !username) return true;
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username.toLowerCase()), limit(1));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

// Update username
export const updateUsername = async (uid, username) => {
  if (!db || !uid || !username) return false;
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, { username: username.toLowerCase() }, { merge: true });
  return true;
};

// Update country code
export const updateCountryCode = async (uid, countryCode) => {
  if (!db || !uid) return false;
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, { countryCode }, { merge: true });
  return true;
};

// Complete onboarding
export const completeOnboarding = async (uid, username, countryCode) => {
  if (!db || !uid) return false;
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, {
    username: username.toLowerCase(),
    countryCode,
    onboardingComplete: true
  }, { merge: true });
  return true;
};

// Increment games played
export const incrementGamesPlayed = async (uid) => {
  if (!db || !uid) return;
  const userRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) return;
  const current = docSnap.data().gamesPlayed || 0;
  await setDoc(userRef, { gamesPlayed: current + 1 }, { merge: true });
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

  // Save XP snapshot for graph
  await saveXpSnapshot(uid, newXp, currentData.elo || 1000);
  
  return {
    oldXp: currentXp,
    newXp,
    levelUp: newLevel > currentLevel,
    newLevel
  };
};

// Save an XP/ELO snapshot for the progression graphs
export const saveXpSnapshot = async (uid, xp, elo) => {
  if (!db || !uid) return;
  try {
    const snapshotsRef = collection(db, 'users', uid, 'xpSnapshots');
    await addDoc(snapshotsRef, {
      xp,
      elo,
      timestamp: new Date().toISOString()
    });
  } catch (e) {
    console.error('Failed to save XP snapshot:', e);
  }
};

// Get XP snapshots for graph
export const getXpSnapshots = async (uid, days = null) => {
  if (!db || !uid) return [];
  try {
    const snapshotsRef = collection(db, 'users', uid, 'xpSnapshots');
    let q;
    if (days) {
      const since = new Date();
      since.setDate(since.getDate() - days);
      q = query(snapshotsRef, where('timestamp', '>=', since.toISOString()), orderBy('timestamp', 'asc'));
    } else {
      q = query(snapshotsRef, orderBy('timestamp', 'asc'));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => d.data());
  } catch (e) {
    console.error('Failed to get XP snapshots:', e);
    return [];
  }
};

// ELO update after a ranked duel (K-factor = 25)
export const updateEloAfterDuel = async (winnerUid, loserUid, isDraw = false) => {
  if (!db || !winnerUid || !loserUid) return null;

  const winnerRef = doc(db, 'users', winnerUid);
  const loserRef = doc(db, 'users', loserUid);

  const [winnerSnap, loserSnap] = await Promise.all([getDoc(winnerRef), getDoc(loserRef)]);
  if (!winnerSnap.exists() || !loserSnap.exists()) return null;

  const winnerElo = winnerSnap.data().elo || 1000;
  const loserElo = loserSnap.data().elo || 1000;

  const K = 25;
  const expectedWinner = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
  const expectedLoser = 1 / (1 + Math.pow(10, (winnerElo - loserElo) / 400));

  let newWinnerElo, newLoserElo;
  if (isDraw) {
    newWinnerElo = Math.round(winnerElo + K * (0.5 - expectedWinner));
    newLoserElo = Math.round(loserElo + K * (0.5 - expectedLoser));
  } else {
    newWinnerElo = Math.round(winnerElo + K * (1 - expectedWinner));
    newLoserElo = Math.max(0, Math.round(loserElo + K * (0 - expectedLoser)));
  }

  // Update winner
  const winnerData = winnerSnap.data();
  await setDoc(winnerRef, {
    elo: newWinnerElo,
    ...(isDraw
      ? { duels_tied: (winnerData.duels_tied || 0) + 1 }
      : { ranked_wins: (winnerData.ranked_wins || 0) + 1, duels_wins: (winnerData.duels_wins || 0) + 1 })
  }, { merge: true });

  // Update loser (skip if bot)
  if (!loserUid.startsWith('bot_')) {
    const loserData = loserSnap.data();
    await setDoc(loserRef, {
      elo: newLoserElo,
      ...(isDraw
        ? { duels_tied: (loserData.duels_tied || 0) + 1 }
        : { ranked_losses: (loserData.ranked_losses || 0) + 1, duels_losses: (loserData.duels_losses || 0) + 1 })
    }, { merge: true });
  }

  // Save ELO snapshots
  await saveXpSnapshot(winnerUid, winnerData.totalXp || 0, newWinnerElo);
  if (!loserUid.startsWith('bot_')) {
    const loserData = loserSnap.data();
    await saveXpSnapshot(loserUid, loserData.totalXp || 0, newLoserElo);
  }

  return {
    winner: { oldElo: winnerElo, newElo: newWinnerElo, change: newWinnerElo - winnerElo },
    loser: { oldElo: loserElo, newElo: newLoserElo, change: newLoserElo - loserElo }
  };
};

// Get global ELO rank
export const getGlobalEloRank = async (elo) => {
  if (!db) return null;
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('elo', '>', elo));
    const snapshot = await getDocs(q);
    return snapshot.size + 1;
  } catch (e) {
    console.error('Failed to get ELO rank:', e);
    return null;
  }
};
