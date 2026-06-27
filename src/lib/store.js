import { create } from 'zustand';

export const useGameStore = create((set) => ({
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
  resetGame: () => set({ gameState: 'MENU', score: 0, currentRound: 1, userGuess: null }),
  setCurrentLocation: (loc) => set({ currentLocation: loc }),
  setOptions: (options) => set({ options }),
  setUserGuess: (guess) => set({ userGuess: guess }),
}));
