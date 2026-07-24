'use client';
import { useGameStore } from '@/lib/store';
import { useEffect, useState, useRef } from 'react';

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; 
  return d;
}

import { addXp } from '@/lib/userProfile';
import { saveGameResult } from '@/lib/db';
import { useAuth } from '@/lib/AuthContext';
import LevelUpOverlay from './LevelUpOverlay';
import dynamic from 'next/dynamic';

const ResultsMap = dynamic(() => import('./ResultsMap'), { ssr: false });

function AnimatedCounter({ target, duration = 1500, onComplete }) {
  const [value, setValue] = useState(0);
  const startTime = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    startTime.current = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setValue(target);
        onComplete?.();
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, onComplete]);

  return <span>{value.toLocaleString()}</span>;
}

export default function ResultScreen() {
  const { user } = useAuth();
  const { 
    currentLocation, userGuess, difficulty, 
    score, addScore, difficulty: gameDifficulty,
    currentRound, maxRounds, setMaxRounds,
    nextRound, setGameState, resetGame, addGameResult 
  } = useGameStore();
  
  const [roundScore, setRoundScore] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);
  const [showMapOnly, setShowMapOnly] = useState(true);
  const [levelUpData, setLevelUpData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollectingXp, setIsCollectingXp] = useState(false);
  const [xpCountComplete, setXpCountComplete] = useState(false);

  const isChoiceMode = difficulty === 'EASY' || (difficulty === 'MEDIUM' && currentRound % 2 !== 0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let earned = 0;
    if (isChoiceMode) {
      if (userGuess?.country === currentLocation.country) earned = 5000;
    } else {
      if (userGuess && userGuess.lat && userGuess.lng) {
        const dist = getDistanceFromLatLonInKm(currentLocation.lat, currentLocation.lng, userGuess.lat, userGuess.lng);
        setDistanceKm(Math.round(dist));
        earned = Math.round(5000 * Math.exp(-dist / 2000));
        if (earned < 0) earned = 0;
      }
    }
    
    // Apply Hint Penalty
    if (useGameStore.getState().usedHint) {
      earned = Math.floor(earned / 2);
    }

    setRoundScore(earned);
    addScore(earned);

    const timer = setTimeout(() => setShowMapOnly(false), 3000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    if (currentRound < maxRounds) {
      nextRound();
      setGameState('LOADING');
    }
  };

  const handleContinueGame = () => {
    setMaxRounds(maxRounds + 5);
    nextRound();
    setGameState('LOADING');
  };

  const handleFinish = async () => {
    setIsCollectingXp(true);
    const totalScore = score + roundScore;
    const xpEarned = Math.floor(totalScore / 10);
    
    // Save game result (#11)
    saveGameResult(totalScore, difficulty, maxRounds);
    addGameResult({
      score: totalScore,
      difficulty,
      rounds: maxRounds,
      date: new Date().toISOString(),
      country: currentLocation?.country || 'Unknown'
    });
    
    // Wait for XP counter animation to finish
    await new Promise(r => setTimeout(r, 2200));
    
    if (user) {
      const xpResult = await addXp(user.uid, xpEarned);
      if (xpResult && xpResult.levelUp) {
        setIsCollectingXp(false);
        setLevelUpData(xpResult);
        return;
      }
    }
    
    resetGame();
    setGameState('MENU');
  };

  const handleCloseLevelUp = () => {
    resetGame();
    setGameState('MENU');
  };

  if (levelUpData) {
    return <LevelUpOverlay data={levelUpData} onClose={handleCloseLevelUp} />;
  }

  if (isCollectingXp) {
    const totalScore = score + roundScore;
    const xpEarned = Math.floor(totalScore / 10);
    
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(10, 10, 26, 0.95)', backdropFilter: 'blur(15px)' }}>
        <style>{`
          @keyframes count-up {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes xp-particle {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
          }
        `}</style>
        
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            fontSize: '2rem',
            animation: 'xp-particle 1.5s ease-out forwards',
            '--tx': ((Math.random() - 0.5) * 400) + 'px',
            '--ty': ((Math.random() - 0.5) * 400) + 'px',
            animationDelay: (Math.random() * 0.5) + 's'
          }}>&#10024;</div>
        ))}

        <div style={{ animation: 'count-up 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards', textAlign: 'center', zIndex: 10 }}>
          <h2 className="gradient-text glow-text" style={{ fontSize: isMobile ? '2rem' : '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Collecting XP...
          </h2>
          <div style={{ fontSize: isMobile ? '3rem' : '4.5rem', fontWeight: 'bold', color: 'white', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
            +<AnimatedCounter target={xpEarned} duration={1500} onComplete={() => setXpCountComplete(true)} /> <span style={{ fontSize: '0.6em', color: '#fbbf24' }}>XP</span>
          </div>
        </div>
      </div>
    );
  }

  if (showMapOnly) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
        <ResultsMap 
          location={currentLocation} 
          players={[{ uid: 'you', displayName: 'You', lastGuess: userGuess }]} 
          height="100%"
        />
        <div style={{ position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.8)', padding: '1rem 2rem', borderRadius: '50px', zIndex: 1000 }}>
          <h2 style={{ color: 'white', margin: 0 }}>Reviewing Map...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowY: 'auto' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, filter: 'brightness(0.4)', minHeight: '100%' }}>
        <ResultsMap 
          location={currentLocation} 
          players={[{ uid: 'you', displayName: 'You', lastGuess: userGuess }]} 
          height="100%"
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100dvh', padding: '0.5rem', overflow: 'hidden' }}>
        <div className="glass-panel" style={{ padding: isMobile ? '0.8rem' : '1.2rem', maxWidth: '600px', width: '100%', textAlign: 'center', background: 'rgba(26, 26, 46, 0.92)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '98dvh', overflowY: 'auto' }}>
          <h2 className="gradient-text glow-text" style={{ fontSize: 'clamp(1.2rem, 4vw, 2rem)', margin: 0 }}>Round {currentRound} Result</h2>
          
          <div style={{ fontSize: 'clamp(0.85rem, 2vw, 1.1rem)', background: 'rgba(0,0,0,0.4)', padding: '0.8rem', borderRadius: '12px' }}>
            {isChoiceMode ? (
              <>
                <p style={{ margin: '0 0 0.5rem 0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  Your guess: 
                  <strong style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {userGuess ? <><img src={`https://flagcdn.com/w40/${userGuess.iso}.png`} width="20" alt={userGuess.country} /> {userGuess.country}</> : 'None'}
                  </strong>
                </p>
                <p style={{ margin: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  Correct answer: 
                  <strong style={{ color: userGuess?.country === currentLocation.country ? 'var(--success-color)' : 'var(--error-color)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <img src={`https://flagcdn.com/w40/${currentLocation.iso}.png`} width="20" alt={currentLocation.country} /> {currentLocation.country}
                  </strong>
                </p>
              </>
            ) : (
              <>
                <p style={{ margin: '0 0 0.5rem 0' }}>Distance: <strong style={{ color: 'var(--primary-color)' }}>{distanceKm} km</strong></p>
                <p style={{ margin: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>Location: <img src={`https://flagcdn.com/w40/${currentLocation.iso}.png`} width="20" alt={currentLocation.country} /> {currentLocation.country}</p>
              </>
            )}
          </div>

          <div style={{ display: 'inline-block', padding: '0.5rem 1.2rem', borderRadius: '50px', background: 'rgba(59, 130, 246, 0.1)' }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 5vw, 2.2rem)', color: 'var(--primary-color)', margin: 0 }}>+{roundScore} Points</h3>
            {useGameStore.getState().usedHint && (
              <p style={{ margin: '0.2rem 0 0 0', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 'bold' }}>💡 Hint Used (-50%)</p>
            )}
          </div>
          
          <p style={{ margin: 0, opacity: 0.8, fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Total Score: <strong>{score}</strong></p>

          {currentRound < maxRounds ? (
            <button className="btn" style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', padding: '10px 24px' }} onClick={handleNext}>
              Next Round
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%' }}>
              <button 
                className="btn" 
                style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', padding: '10px 16px', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#000', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} 
                onClick={async () => {
                  const shareUrl = `https://www.loststreet.online/share/${score}`;
                  const shareText = `🌍 LostStreet — ${isChoiceMode ? 'Easy/Medium' : 'Hard'} Mode\nScore: ${score.toLocaleString()} pts\nPlay free → ${shareUrl}`;
                  if (navigator.share) {
                    try { await navigator.share({ title: 'My LostStreet Score', text: shareText }); } catch (e) {}
                  } else {
                    navigator.clipboard.writeText(shareText);
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                Share Result
              </button>
              <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', padding: '10px 16px', background: 'rgba(255,255,255,0.1)', flex: 1 }} onClick={handleFinish}>
                  Finish & Collect XP
                </button>
                <button className="btn" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', padding: '10px 16px', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', flex: 1 }} onClick={handleContinueGame}>
                  +5 More Rounds
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
