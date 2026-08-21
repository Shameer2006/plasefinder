import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { sounds } from './sounds';

export const useGameStore = create(
  persist(
    (set, get) => ({
      gameState: 'MENU',
      gameMode: 'CLASSIC',
      difficulty: 'EASY',
      score: 0,
      currentRound: 1,
      maxRounds: 5,
      currentLocation: null,
      options: [],
      userGuess: null,
      usedHint: false,
      googleSearchUsed: false,
      circleSearchesUsed: 0,
      circleSearchActive: false,
      circleSearchHints: [],
      isRareRound: false,
      rareMultiplier: 1,
      isDailyChallenge: false,
      currentStreak: 0,
      bestStreak: 0,
      currentEndlessStreak: 0,
      bestEndlessStreakThisSession: 0,
      soundEnabled: true,
      soundVolume: 0.5,
      units: 'metric',
      mapType: 'normal',
      emotesEnabled: true,
      gameHistory: [],
      // Coin Economy & Daily Streak State
      coins: 50, // 50 Starter Coins
      loginStreak: 0,
      lastClaimDate: null,
      showDailyRewardOverlay: false,
      fiftyFiftyUsed: false,

      setGameState: (state) => set({ gameState: state }),
      setGameMode: (mode) => set({ gameMode: mode }),
      setDifficulty: (diff) => set({ difficulty: diff }),
      addScore: (score) => set((state) => ({ score: state.score + score })),
      nextRound: () => set((state) => ({ currentRound: state.currentRound + 1, usedHint: false, fiftyFiftyUsed: false, googleSearchUsed: false, circleSearchesUsed: 0, circleSearchActive: false, circleSearchHints: [], isRareRound: false, rareMultiplier: 1 })),
      setMaxRounds: (rounds) => set({ maxRounds: rounds }),
      resetGame: () => set({ gameState: 'MENU', gameMode: 'CLASSIC', score: 0, currentRound: 1, maxRounds: 5, userGuess: null, usedHint: false, fiftyFiftyUsed: false, googleSearchUsed: false, circleSearchesUsed: 0, circleSearchActive: false, circleSearchHints: [], isRareRound: false, rareMultiplier: 1, isDailyChallenge: false, currentStreak: 0, currentEndlessStreak: 0, bestEndlessStreakThisSession: 0 }),
      setRareRound: (isRare, multiplier = 1) => set({ isRareRound: isRare, rareMultiplier: multiplier }),
      setIsDailyChallenge: (val) => set({ isDailyChallenge: val }),
      setCurrentStreak: (val) => set((state) => ({
        currentStreak: val,
        bestStreak: Math.max(state.bestStreak || 0, val)
      })),
      setCurrentEndlessStreak: (val) => set((state) => {
        const newBest = Math.max(state.bestEndlessStreakThisSession, val);
        return { currentEndlessStreak: val, bestEndlessStreakThisSession: newBest };
      }),
      setCurrentLocation: (loc) => set({ currentLocation: loc }),
      setOptions: (options) => set({ options }),
      setUserGuess: (guess) => set({ userGuess: guess }),
      setUsedHint: (used) => set({ usedHint: used }),
      setFiftyFiftyUsed: (used) => set({ fiftyFiftyUsed: used }),
      setGoogleSearchUsed: (used) => set({ googleSearchUsed: used }),
      setCircleSearchActive: (active) => set({ circleSearchActive: active }),
      incrementCircleSearch: () => set((s) => ({ circleSearchesUsed: s.circleSearchesUsed + 1 })),
      addCircleSearchHint: (hint) => set((s) => ({ circleSearchHints: [...s.circleSearchHints, hint] })),

      // Coin & Streak Actions
      setCoins: (coins) => set({ coins: Math.max(0, parseInt(coins, 10) || 0) }),
      addCoins: (amount) => set((state) => ({ coins: Math.max(0, state.coins + (parseInt(amount, 10) || 0)) })),
      deductCoins: (amount) => set((state) => ({ coins: Math.max(0, state.coins - (parseInt(amount, 10) || 0)) })),
      setLoginStreak: (streak) => set({ loginStreak: Math.max(0, parseInt(streak, 10) || 0) }),
      setLastClaimDate: (dateStr) => set({ lastClaimDate: dateStr }),
      setShowDailyRewardOverlay: (show) => set({ showDailyRewardOverlay: !!show }),

      setSoundEnabled: (enabled) => {
        sounds.setEnabled(enabled);
        set({ soundEnabled: enabled });
      },
      setSoundVolume: (volume) => {
        sounds.setVolume(volume);
        set({ soundVolume: volume });
      },
      setUnits: (units) => set({ units }),
      setMapType: (mapType) => set({ mapType }),
      setEmotesEnabled: (emotesEnabled) => set({ emotesEnabled }),
      initSounds: () => {
        const state = get();
        sounds.setEnabled(state.soundEnabled);
        sounds.setVolume(state.soundVolume);
      },
      addGameResult: (result) => set((state) => ({
        gameHistory: [result, ...state.gameHistory].slice(0, 50)
      })),
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') return window.localStorage;
        return undefined; // handles SSR gracefully
      }),
      partialize: (state) => ({
        soundEnabled: state.soundEnabled,
        soundVolume: state.soundVolume,
        units: state.units,
        mapType: state.mapType,
        emotesEnabled: state.emotesEnabled,
        gameHistory: state.gameHistory,
        coins: state.coins,
        loginStreak: state.loginStreak,
        lastClaimDate: state.lastClaimDate
      })
    }
  )
);
