import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useGameStore = create(
  persist(
    (set) => ({
      gameState: 'MENU', // MENU, LOADING, EXPLORING, RESULT
      difficulty: 'EASY', // EASY (multiple choice), HARD (map)
      score: 0,
      currentRound: 1,
      maxRounds: 5,
      currentLocation: null,
      options: [], // For multiple choice
      userGuess: null, // String for EASY, { lat, lng } for HARD
      
      setGameState: (state) => set({ gameState: state }),
      setDifficulty: (diff) => set({ difficulty: diff }),
      setScore: (score) => set((state) => ({ score: state.score + score })),
      nextRound: () => set((state) => ({ currentRound: state.currentRound + 1 })),
      setMaxRounds: (rounds) => set({ maxRounds: rounds }),
      resetGame: () => set({ gameState: 'MENU', score: 0, currentRound: 1, maxRounds: 5, userGuess: null }),
      setCurrentLocation: (loc) => set({ currentLocation: loc }),
      setOptions: (options) => set({ options }),
      setUserGuess: (guess) => set({ userGuess: guess }),
    }),
    {
      name: 'game-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
