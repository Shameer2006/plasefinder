'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useGameStore } from '@/lib/store';
import PanoramaViewer from './PanoramaViewer';
import MultipleChoicePanel from './MultipleChoicePanel';
import ResultScreen from './ResultScreen';
import CircleToSearch from './CircleToSearch';
import { fetchRandomLocation } from '@/lib/locationManager';
import Spinner from './Spinner';
import dynamic from 'next/dynamic';
import EyeOpeningIntro from './EyeOpeningIntro';
import GamePhone from './GamePhone';

const GuessingMap = dynamic(() => import('./GuessingMap'), { ssr: false });

export default function Game() {
  const { 
    gameState, setGameState, resetGame,
    difficulty, gameMode,
    currentRound, maxRounds, 
    score, 
    setCurrentLocation, setOptions, setUserGuess,
    circleSearchActive
  } = useGameStore();
  const [error, setError] = useState(null);
  const [showIntro, setShowIntro] = useState(false);
  const staticImgRef = useRef(null);

  const isLoading = gameState === 'LOADING';

  useEffect(() => {
    if (!isLoading) return;
    setError(null);

    // 12 second safety timeout to prevent getting stuck infinitely on LOADING
    const safetyTimeout = setTimeout(() => {
      setError('Location loading timed out. Please check your connection and try again.');
    }, 12000);

    const initRound = async () => {
      try {
        const { location, options } = await fetchRandomLocation();
        clearTimeout(safetyTimeout);
        setCurrentLocation(location);
        setOptions(options);
        setUserGuess(null);
        setShowIntro(useGameStore.getState().gameMode === 'STORY');
        setGameState('EXPLORING');
      } catch (err) {
        clearTimeout(safetyTimeout);
        console.error("Error loading location:", err);
        setError(err.message || 'Failed to load location. Check your connection and try again.');
      }
    };
    initRound();

    return () => clearTimeout(safetyTimeout);
  }, [isLoading, setGameState, setCurrentLocation, setOptions, setUserGuess]);

  const handleStaticImageReady = useCallback((imgEl) => {
    staticImgRef.current = imgEl;
  }, []);

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
      {/* Eye-opening cinematic intro */}
      {showIntro && gameMode === 'STORY' && (
        <EyeOpeningIntro onComplete={() => setShowIntro(false)} />
      )}

      <div className="hud-container" style={{ zIndex: 10 }}>
        <div className="glass-panel" style={{ padding: '0.5rem 1rem', fontWeight: 'bold' }}>
          Round: {currentRound} / {maxRounds}
        </div>
        <div className="glass-panel" style={{ padding: '0.5rem 1rem', fontWeight: 'bold' }}>
          Score: {score}
        </div>
        <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', backgroundColor: '#ef4444', borderColor: '#ef4444', color: 'white' }} onClick={() => resetGame()}>Quit</button>
      </div>

      <PanoramaViewer onStaticImageReady={handleStaticImageReady} />

      {/* Circle to Search overlay — active when player triggers it from the phone */}
      {circleSearchActive && (
        <CircleToSearch staticImgRef={staticImgRef} />
      )}

      {difficulty === 'EASY' || (difficulty === 'MEDIUM' && currentRound % 2 !== 0) ? (
        <MultipleChoicePanel />
      ) : (
        <GuessingMap />
      )}

      {/* In-game phone (appears after intro) */}
      {!showIntro && gameMode === 'STORY' && <GamePhone />}
    </div>
  );
}
