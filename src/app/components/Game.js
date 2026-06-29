'use client';
import { useEffect } from 'react';
import { useGameStore } from '@/lib/store';
import PanoramaViewer from './PanoramaViewer';
import MultipleChoicePanel from './MultipleChoicePanel';
import ResultScreen from './ResultScreen';
import { fetchRandomLocation } from '@/lib/locationManager';
import dynamic from 'next/dynamic';

const GuessingMap = dynamic(() => import('./GuessingMap'), { ssr: false });

export default function Game() {
  const { 
    gameState, setGameState, 
    difficulty, 
    currentRound, maxRounds, 
    score, 
    setCurrentLocation, setOptions, setUserGuess 
  } = useGameStore();

  useEffect(() => {
    if (gameState === 'LOADING') {
      const initRound = async () => {
        try {
          const { location, options } = await fetchRandomLocation();
          setCurrentLocation(location);
          setOptions(options); // Only used in EASY mode
          setUserGuess(null);
          setGameState('EXPLORING');
        } catch (error) {
          console.error("Error loading location:", error);
          // Handle error, maybe go back to MENU
          setGameState('MENU');
        }
      };
      initRound();
    }
  }, [gameState, setGameState, setCurrentLocation, setOptions, setUserGuess]);

  if (gameState === 'LOADING') {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5rem' }}>Preparing Round {currentRound}...</div>;
  }

  if (gameState === 'RESULT') {
    return <ResultScreen />;
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* HUD overlay */}
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, display: 'flex', gap: '1rem' }}>
        <div className="glass-panel" style={{ padding: '0.5rem 1rem', fontWeight: 'bold' }}>
          Round: {currentRound} / {maxRounds}
        </div>
        <div className="glass-panel" style={{ padding: '0.5rem 1rem', fontWeight: 'bold' }}>
          Score: {score}
        </div>
        <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={() => setGameState('MENU')}>Quit</button>
      </div>

      <PanoramaViewer />

      {difficulty === 'EASY' || (difficulty === 'MEDIUM' && currentRound % 2 !== 0) ? (
        <MultipleChoicePanel />
      ) : (
        <GuessingMap />
      )}
    </div>
  );
}
