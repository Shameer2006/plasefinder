import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { sounds } from './sounds';

export const useGameStore = create(
  persist(
    (set, get) => ({
      gameState: 'MENU',
      difficulty: 'EASY',
      score: 0,
      currentRound: 1,
      maxRounds: 5,
      currentLocation: null,
      options: [],
      userGuess: null,
      soundEnabled: true,
      soundVolume: 0.5,
      units: 'metric',
      mapType: 'normal',
      emotesEnabled: true,
      gameHistory: [],

      setGameState: (state) => set({ gameState: state }),
      setDifficulty: (diff) => set({ difficulty: diff }),
      addScore: (score) => set((state) => ({ score: state.score + score })),
      nextRound: () => set((state) => ({ currentRound: state.currentRound + 1 })),
      setMaxRounds: (rounds) => set({ maxRounds: rounds }),
      resetGame: () => set({ gameState: 'MENU', score: 0, currentRound: 1, maxRounds: 5, userGuess: null }),
      setCurrentLocation: (loc) => set({ currentLocation: loc }),
      setOptions: (options) => set({ options }),
      setUserGuess: (guess) => set({ userGuess: guess }),

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
    }
  )
);
