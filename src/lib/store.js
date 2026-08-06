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
      soundEnabled: true,
      soundVolume: 0.5,
      units: 'metric',
      mapType: 'normal',
      emotesEnabled: true,
      gameHistory: [],

      setGameState: (state) => set({ gameState: state }),
      setGameMode: (mode) => set({ gameMode: mode }),
      setDifficulty: (diff) => set({ difficulty: diff }),
      addScore: (score) => set((state) => ({ score: state.score + score })),
      nextRound: () => set((state) => ({ currentRound: state.currentRound + 1, usedHint: false, googleSearchUsed: false, circleSearchesUsed: 0, circleSearchActive: false, circleSearchHints: [] })),
      setMaxRounds: (rounds) => set({ maxRounds: rounds }),
      resetGame: () => set({ gameState: 'MENU', gameMode: 'CLASSIC', score: 0, currentRound: 1, maxRounds: 5, userGuess: null, usedHint: false, googleSearchUsed: false, circleSearchesUsed: 0, circleSearchActive: false, circleSearchHints: [] }),
      setCurrentLocation: (loc) => set({ currentLocation: loc }),
      setOptions: (options) => set({ options }),
      setUserGuess: (guess) => set({ userGuess: guess }),
      setUsedHint: (used) => set({ usedHint: used }),
      setGoogleSearchUsed: (used) => set({ googleSearchUsed: used }),
      setCircleSearchActive: (active) => set({ circleSearchActive: active }),
      incrementCircleSearch: () => set((s) => ({ circleSearchesUsed: s.circleSearchesUsed + 1 })),
      addCircleSearchHint: (hint) => set((s) => ({ circleSearchHints: [...s.circleSearchHints, hint] })),

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
        gameHistory: state.gameHistory
      })
    }
  )
);
