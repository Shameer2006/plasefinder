'use client';
import { useEffect, useState } from 'react';
import { useGameStore } from '@/lib/store';
import PanoramaViewer from './PanoramaViewer';
import MultipleChoicePanel from './MultipleChoicePanel';
import ResultScreen from './ResultScreen';
import { fetchRandomLocation } from '@/lib/locationManager';
import Spinner from './Spinner';
import dynamic from 'next/dynamic';

const GuessingMap = dynamic(() => import('./GuessingMap'), { ssr: false });

export default function Game() {
  const { 
    gameState, setGameState, resetGame,
    difficulty, 
    currentRound, maxRounds, 
    score, 
    setCurrentLocation, setOptions, setUserGuess 
  } = useGameStore();
  const [error, setError] = useState(null);

  const isLoading = gameState === 'LOADING';

  useEffect(() => {
    if (!isLoading) return;
    setError(null);
    const initRound = async () => {
      try {
        const { location, options } = await fetchRandomLocation();
        setCurrentLocation(location);
        setOptions(options);
        setUserGuess(null);
        setGameState('EXPLORING');
      } catch (err) {
        console.error("Error loading location:", err);
        setError(err.message || 'Failed to load location. Check your connection and try again.');
      }
    };
    initRound();
  }, [isLoading, setGameState, setCurrentLocation, setOptions, setUserGuess]);

  if (gameState === 'LOADING') {
    return <Spinner text={`Preparing Round ${currentRound}...`} />;
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1.5rem', padding: '2rem' }}>
        <div style={{ fontSize: '3rem' }}>⚠️</div>
        <p style={{ fontSize: '1.3rem', color: '#f87171', textAlign: 'center' }}>{error}</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn" onClick={() => { setGameState('LOADING'); setError(null); }}>Retry</button>
          <button className="btn" style={{ background: 'rgba(255,255,255,0.1)' }} onClick={() => { setGameState('MENU'); setError(null); }}>Back to Menu</button>
        </div>
      </div>
    );
  }

  if (gameState === 'RESULT') {
    return <ResultScreen />;
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div className="hud-container" style={{ zIndex: 10 }}>
        <div className="glass-panel" style={{ padding: '0.5rem 1rem', fontWeight: 'bold' }}>
          Round: {currentRound} / {maxRounds}
        </div>
        <div className="glass-panel" style={{ padding: '0.5rem 1rem', fontWeight: 'bold' }}>
          Score: {score}
        </div>
        <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', backgroundColor: '#ef4444', borderColor: '#ef4444', color: 'white' }} onClick={() => resetGame()}>Quit</button>
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
