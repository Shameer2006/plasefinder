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

// Trigger background welcome email
export const triggerWelcomeEmail = (user, displayName) => {
  if (!user?.email || user.isAnonymous || typeof window === 'undefined') return;
  fetch('/api/send-welcome-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: displayName || user.displayName || 'Explorer',
    }),
  })
    .then(async (res) => {
      const result = await res.json();
      if (result?.success && db && user?.uid) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          welcomeEmailSent: true,
          welcomeEmailSentAt: new Date().toISOString()
        }, { merge: true });
      }
    })
    .catch((err) => {
      console.warn('Welcome email trigger non-critical error:', err);
    });
};

export const getOrCreateUserProfile = async (user) => {
  if (!db || !user || user.isAnonymous) return null;

  const userRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    // Send welcome email if user hasn't received one yet
    if (data && !data.welcomeEmailSent && user.email) {
      triggerWelcomeEmail(user, data.username || data.displayName);
    }
    return data;
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
      welcomeEmailSent: false,
      createdAt: new Date().toISOString()
    };
    await setDoc(userRef, newProfile);
    triggerWelcomeEmail(user, newProfile.displayName);
    return newProfile;
  }
};

// Username uniqueness check
export const isUsernameTaken = async (username) => {
  if (!username) return true;
  if (!db) return false;
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username.toLowerCase()), limit(1));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (e) {
    console.error('Failed to check username taken:', e);
    return false;
  }
};

// Update username
export const updateUsername = async (uid, username) => {
  if (!username) return false;
  if (db && uid) {
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, { username: username.toLowerCase() }, { merge: true });
    } catch (e) {
      console.warn('Firestore username write notice (saving locally):', e?.message || e);
    }
  }
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('placefinder_username', username);
    }
  } catch (e) {}
  return true;
};

// Update country code
export const updateCountryCode = async (uid, countryCode) => {
  if (db && uid) {
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, { countryCode }, { merge: true });
    } catch (e) {
      console.warn('Firestore country code write notice (saving locally):', e?.message || e);
    }
  }
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('placefinder_country', countryCode);
    }
  } catch (e) {}
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
  
  // Fetch current longestStreak to potentially update it
  let longestStreak = newStreak;
  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      longestStreak = Math.max(newStreak, data.longestStreak || 0);
    }
  } catch (e) { /* ignore, we'll just use newStreak */ }

  await setDoc(userRef, {
    dailyChallengeStreak: newStreak,
    lastDailyChallengeDate: dateString,
    longestStreak,
  }, { merge: true });
};

// Update best score (personal best) for social reward
export const updateBestScore = async (uid, newScore) => {
  if (!db || !uid) return false;
  const userRef = doc(db, 'users', uid);
  try {
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) return false;
    const current = docSnap.data().bestScore || 0;
    if (newScore > current) {
      await setDoc(userRef, { bestScore: newScore }, { merge: true });
      return true; // was a new personal best
    }
  } catch (e) {
    console.error('Failed to update best score:', e);
  }
  return false;
};

export const updateEndlessStats = async (uid, newScore, newStreak) => {
  if (!db || !uid) return { isNewBestScore: false, isNewBestStreak: false };
  const userRef = doc(db, 'users', uid);
  try {
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) return { isNewBestScore: false, isNewBestStreak: false };
    const current = docSnap.data();
    const bestEndlessScore = current.bestEndlessScore || 0;
    const bestEndlessStreak = current.bestEndlessStreak || 0;
    
    let updates = {};
    let isNewBestScore = false;
    let isNewBestStreak = false;
    
    if (newScore > bestEndlessScore) {
      updates.bestEndlessScore = newScore;
      isNewBestScore = true;
    }
    if (newStreak > bestEndlessStreak) {
      updates.bestEndlessStreak = newStreak;
      isNewBestStreak = true;
    }
    
    if (Object.keys(updates).length > 0) {
      await setDoc(userRef, updates, { merge: true });
    }
    return { isNewBestScore, isNewBestStreak };
  } catch (e) {
    console.error('Failed to update endless stats:', e);
  }
  return { isNewBestScore: false, isNewBestStreak: false };
};
export const calculateLevel = (xp) => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const addXp = async (uid, xpEarned) => {
  if (xpEarned <= 0) return null;

  let currentXp = 0;

  // Read local XP fallback first
  if (typeof window !== 'undefined') {
    const localXp = parseInt(localStorage.getItem('placefinder_total_xp') || '0', 10);
    if (!isNaN(localXp) && localXp > 0) {
      currentXp = localXp;
    }
  }

  // Read Firestore XP if available
  if (db && uid) {
    try {
      const userRef = doc(db, 'users', uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const firestoreXp = docSnap.data().totalXp || 0;
        if (firestoreXp > currentXp) {
          currentXp = firestoreXp;
        }
      }
    } catch (e) {
      console.warn('Notice: Could not read Firestore XP in addXp:', e?.message || e);
    }
  }

  const newXp = currentXp + xpEarned;
  const currentLevel = calculateLevel(currentXp);
  const newLevel = calculateLevel(newXp);
  const levelUp = newLevel > currentLevel;

  // Persist locally
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('placefinder_total_xp', newXp.toString());
    } catch (e) {}
  }

  // Persist to Firestore if available
  if (db && uid) {
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, { totalXp: newXp }, { merge: true });
      await saveXpSnapshot(uid, newXp, 1000);
    } catch (e) {
      console.warn('Notice: Could not save Firestore XP in addXp:', e?.message || e);
    }
  }

  return {
    oldXp: currentXp,
    newXp,
    levelUp,
    newLevel,
    oldLevel: currentLevel
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
