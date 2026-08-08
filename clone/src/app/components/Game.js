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
import { sounds } from '@/lib/sounds';
import { useAuth } from '@/lib/AuthContext';

const GuessingMap = dynamic(() => import('./GuessingMap'), { ssr: false });

export default function Game() {
  const { 
    gameState, setGameState, resetGame,
    difficulty, gameMode,
    currentRound, maxRounds, 
    score, 
    setCurrentLocation, setOptions, setUserGuess,
    circleSearchActive,
    isRareRound, setRareRound,
    currentEndlessStreak, bestEndlessStreakThisSession
  } = useGameStore();
  const { userProfile } = useAuth();
  const [error, setError] = useState(null);
  const [showIntro, setShowIntro] = useState(false);
  const [showRareFlash, setShowRareFlash] = useState(false);
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
        const currentMode = useGameStore.getState().gameMode;
        const roundNum = useGameStore.getState().currentRound;
        // Blur reveal / Eye-opening intro is reserved exclusively for STORY mode on Round 1
        setShowIntro(currentMode === 'STORY' && roundNum === 1);

        // Variable-value "rare" round — ~20% chance for a 2× bonus
        if (Math.random() < 0.2) {
          setRareRound(true, 2);
          setShowRareFlash(true);
          sounds.playRareRound();
          setTimeout(() => setShowRareFlash(false), 2500);
        } else {
          setRareRound(false, 1);
        }

        setGameState('EXPLORING');
      } catch (err) {
        clearTimeout(safetyTimeout);
        console.error("Error loading location:", err);
        setError(err.message || 'Failed to load location. Check your connection and try again.');
      }
    };
    initRound();

    return () => clearTimeout(safetyTimeout);
  }, [isLoading, setGameState, setCurrentLocation, setOptions, setUserGuess, setRareRound]);

  const handleStaticImageReady = useCallback((imgEl) => {
    staticImgRef.current = imgEl;
  }, []);

  if (gameState === 'LOADING') {
    return <Spinner text={`Preparing Round ${currentRound}...`} />;
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1.5rem', padding: '2rem' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
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

      {/* Rare round bonus flash */}
      {showRareFlash && (
        <>
          <style>{`
            @keyframes rare-flash-in {
              0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
              40% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
              100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
            @keyframes rare-flash-out {
              0% { opacity: 1; }
              100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
            @keyframes rare-glow-pulse {
              0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.4); }
              50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.7); }
            }
          `}</style>
          <div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            background: 'rgba(15, 15, 30, 0.92)',
            border: '2px solid rgba(251, 191, 36, 0.6)',
            borderRadius: '20px',
            padding: '1.5rem 2.5rem',
            display: 'flex', alignItems: 'center', gap: '14px',
            animation: 'rare-flash-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, rare-flash-out 0.5s ease forwards 2s, rare-glow-pulse 1s ease infinite',
            pointerEvents: 'none',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fbbf24', letterSpacing: '0.05em', fontFamily: '"Outfit", sans-serif' }}>BONUS ROUND</div>
              <div style={{ fontSize: '0.9rem', color: '#e5e7eb', fontWeight: 500 }}>2× Points this round!</div>
            </div>
          </div>
        </>
      )}

      <div className="hud-container" style={{ zIndex: 10, display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Round Panel */}
        <div className="glass-panel" style={{ padding: '0.5rem 1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
          Round: {currentRound} {gameMode !== 'ENDLESS' && `/ ${maxRounds}`}
          {isRareRound && (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          )}
        </div>

        {/* Endless Streak Panel (Separate Div with Fire SVG) */}
        {gameMode === 'ENDLESS' && (
          <div className="glass-panel" style={{ padding: '0.5rem 1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.4)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
            Streak: {currentEndlessStreak}
          </div>
        )}

        {/* Highest Streak Panel (Separate Div with Trophy SVG) */}
        {gameMode === 'ENDLESS' && (
          <div className="glass-panel" style={{ padding: '0.5rem 1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.4)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>
            Best: {Math.max(userProfile?.bestEndlessStreak || 0, bestEndlessStreakThisSession)}
          </div>
        )}

        {/* Score Panel */}
        <div className="glass-panel" style={{ padding: '0.5rem 1rem', fontWeight: 'bold' }}>
          Score: {score}
        </div>

        {/* Quit Button */}
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
