'use client';
import { useGameStore } from '@/lib/store';
import { useEffect, useState, useRef, useCallback } from 'react';
import { sounds } from '@/lib/sounds';

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

import { addXp, updateBestScore, updateEndlessStats } from '@/lib/userProfile';
import { saveGameResult } from '@/lib/db';
import { useAuth } from '@/lib/AuthContext';
import LevelUpOverlay from './LevelUpOverlay';
import dynamic from 'next/dynamic';

const ResultsMap = dynamic(() => import('./ResultsMap'), { ssr: false });

function AnimatedCounter({ target, duration = 1500, onComplete, onStart }) {
  const [value, setValue] = useState(0);
  const startTime = useRef(null);
  const rafRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    startTime.current = Date.now();
    if (!startedRef.current) {
      startedRef.current = true;
      onStart?.();
    }
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
  }, [target, duration, onComplete, onStart]);

  return <span>{value.toLocaleString()}</span>;
}

// SVG icons as components to replace emojis
const StarSvg = ({ size = 16, color = '#fbbf24' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

const LightbulbSvg = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>
);

const FireSvg = ({ size = 18, color = '#f97316' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
);

const TrophySvg = ({ size = 18, color = '#fbbf24' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
);

const SparkleSvg = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="#fbbf24" stroke="none"><path d="M12 2l2.09 6.26L20 9.27l-4.91 3.82L16.18 20 12 16.9 7.82 20l1.09-6.91L4 9.27l5.91-1.01L12 2z"/></svg>
);

const ShareSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
);

const COUNTDOWN_SECONDS = 5;

export default function ResultScreen() {
  const { user, userProfile, setUserProfile } = useAuth();
  const { 
    currentLocation, userGuess, difficulty, 
    score, addScore, difficulty: gameDifficulty,
    currentRound, maxRounds, setMaxRounds,
    nextRound, setGameState, resetGame, addGameResult,
    isRareRound, rareMultiplier, isDailyChallenge,
    gameMode, currentEndlessStreak, bestEndlessStreakThisSession, setCurrentEndlessStreak
  } = useGameStore();

  const [roundScore, setRoundScore] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);
  const [showMapOnly, setShowMapOnly] = useState(true);
  const [levelUpData, setLevelUpData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollectingXp, setIsCollectingXp] = useState(false);
  const [xpCountComplete, setXpCountComplete] = useState(false);
  const [scoreAnimDone, setScoreAnimDone] = useState(false);
  const [showScoreBounce, setShowScoreBounce] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [isNewBestScore, setIsNewBestScore] = useState(false);
  const [isShowingBestScore, setIsShowingBestScore] = useState(false);
  const [isShowingStreak, setIsShowingStreak] = useState(false);
  const [showEndlessWrongGuess, setShowEndlessWrongGuess] = useState(false);

  // Auto-advance countdown (mid-game rounds only)
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [countdownPaused, setCountdownPaused] = useState(false);
  const countdownRef = useRef(null);

  const isFinalRound = currentRound >= maxRounds;
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
    let isCorrect = false;
    let dist = 0;

    if (isChoiceMode) {
      if (userGuess?.country === currentLocation.country) {
        earned = 5000;
        isCorrect = true;
      }
    } else {
      if (userGuess && userGuess.lat && userGuess.lng) {
        dist = getDistanceFromLatLonInKm(currentLocation.lat, currentLocation.lng, userGuess.lat, userGuess.lng);
        setDistanceKm(Math.round(dist));
        earned = Math.round(5000 * Math.exp(-dist / 2000));
        if (earned < 0) earned = 0;
        if (dist <= 500) {
          isCorrect = true;
        }
      }
    }
    
    // Apply Hint Penalty
    if (useGameStore.getState().usedHint) {
      earned = Math.floor(earned / 2);
    }

    // Apply rare round bonus multiplier
    const mult = useGameStore.getState().rareMultiplier || 1;
    earned = Math.round(earned * mult);

    setRoundScore(earned);
    addScore(earned);

    if (gameMode === 'ENDLESS') {
      if (isCorrect) {
        setCurrentEndlessStreak(useGameStore.getState().currentEndlessStreak + 1);
      } else {
        setShowEndlessWrongGuess(true);
        setCurrentEndlessStreak(0);
      }
    }

    // Show particles for excellent guesses
    if (earned >= 4000) {
      setShowParticles(true);
    }

    const timer = setTimeout(() => setShowMapOnly(false), 3000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-advance countdown for non-final rounds
  useEffect(() => {
    if (showMapOnly || isFinalRound || countdownPaused || showEndlessWrongGuess) return;

    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          handleNext();
          return 0;
        }
        sounds.playTick();
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMapOnly, isFinalRound, countdownPaused, showEndlessWrongGuess]);

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
    
    // Save game result
    if (gameMode !== 'ENDLESS') {
      saveGameResult(totalScore, difficulty, maxRounds);
      addGameResult({
        score: totalScore,
        difficulty,
        rounds: maxRounds,
        date: new Date().toISOString(),
        country: currentLocation?.country || 'Unknown'
      });
    }
    
    // Wait for XP counter animation to finish
    await new Promise(r => setTimeout(r, 2200));
    
    let isLevelUp = false;
    let isBestScore = false;

    if (user?.uid) {
      if (gameMode === 'ENDLESS') {
        const stats = await updateEndlessStats(user.uid, totalScore, useGameStore.getState().bestEndlessStreakThisSession);
        isBestScore = stats.isNewBestScore;
      } else {
        isBestScore = await updateBestScore(user.uid, totalScore);
      }
      setIsNewBestScore(isBestScore);
    }

    // Add XP for both registered and guest users
    const xpResult = await addXp(user?.uid, xpEarned);
    if (xpResult) {
      if (setUserProfile) {
        setUserProfile(prev => ({ ...(prev || {}), totalXp: xpResult.newXp }));
      }
      if (xpResult.levelUp) {
        isLevelUp = true;
        setLevelUpData(xpResult);
        sounds.playLevelUp();
      }
    }
    
    setIsCollectingXp(false);

    if (isBestScore && !isLevelUp) {
      setIsShowingBestScore(true);
      sounds.playStreakUp();
      await new Promise(r => setTimeout(r, 3000));
      setIsShowingBestScore(false);
    }
    
    if (isDailyChallenge && !isLevelUp && userProfile?.dailyChallengeStreak > 0) {
      setIsShowingStreak(true);
      sounds.playStreakUp();
      await new Promise(r => setTimeout(r, 3000));
      setIsShowingStreak(false);
    }
    
    if (!isLevelUp) {
      resetGame();
      setGameState('MENU');
    }
  };

  const handleCloseLevelUp = async () => {
    if (isNewBestScore) {
      setLevelUpData(null);
      setIsShowingBestScore(true);
      sounds.playStreakUp();
      await new Promise(r => setTimeout(r, 3000));
      setIsShowingBestScore(false);
    }
    
    if (isDailyChallenge && userProfile?.dailyChallengeStreak > 0) {
      setLevelUpData(null);
      setIsShowingStreak(true);
      sounds.playStreakUp();
      await new Promise(r => setTimeout(r, 3000));
      setIsShowingStreak(false);
    }
    resetGame();
    setGameState('MENU');
  };

  const onScoreCountStart = useCallback(() => {
    sounds.playScoreReveal();
    setShowScoreBounce(true);
    setTimeout(() => setShowScoreBounce(false), 500);
  }, []);

  if (isShowingBestScore) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(10, 10, 26, 0.95)', backdropFilter: 'blur(15px)' }}>
        <style>{`
          @keyframes best-score-pop {
            0% { transform: scale(0.5); opacity: 0; }
            60% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
        
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            animation: 'xp-particle 2s ease-out forwards',
            '--tx': ((Math.random() - 0.5) * 600) + 'px',
            '--ty': ((Math.random() - 0.5) * 600) + 'px',
            animationDelay: (Math.random() * 0.2) + 's'
          }}><SparkleSvg size={24} /></div>
        ))}

        <div style={{ animation: 'best-score-pop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards', textAlign: 'center', zIndex: 10 }}>
          <TrophySvg size={80} color="#fbbf24" />
          <h2 className="gradient-text glow-text" style={{ fontSize: isMobile ? '2.5rem' : '4rem', margin: '1rem 0', background: 'linear-gradient(to right, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            NEW PERSONAL BEST!
          </h2>
          <div style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: 'bold', color: 'white', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
            {(score + roundScore).toLocaleString()} pts
          </div>
        </div>
      </div>
    );
  }

  if (isShowingStreak && userProfile) {
    const streak = userProfile.dailyChallengeStreak;
    const isNewRecord = streak > (userProfile.longestStreak || 0);
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(10, 10, 26, 0.95)', backdropFilter: 'blur(15px)' }}>
        <style>{`
          @keyframes best-score-pop {
            0% { transform: scale(0.5); opacity: 0; }
            60% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
        
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            animation: 'xp-particle 2s ease-out forwards',
            '--tx': ((Math.random() - 0.5) * 500) + 'px',
            '--ty': ((Math.random() - 0.5) * 500) + 'px',
            animationDelay: (Math.random() * 0.2) + 's'
          }}><FireSvg size={24} color="#f97316" /></div>
        ))}

        <div style={{ animation: 'best-score-pop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards', textAlign: 'center', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <FireSvg size={80} color="#f97316" />
          <h2 className="gradient-text glow-text" style={{ fontSize: isMobile ? '2.5rem' : '4rem', margin: 0, background: 'linear-gradient(to right, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {streak} DAY STREAK!
          </h2>
          {isNewRecord && (
            <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 'bold', color: '#fbbf24', textShadow: '0 5px 15px rgba(0,0,0,0.5)', marginTop: '0.5rem' }}>
              🏆 NEW RECORD!
            </div>
          )}
        </div>
      </div>
    );
  }

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
            animation: 'xp-particle 1.5s ease-out forwards',
            '--tx': ((Math.random() - 0.5) * 400) + 'px',
            '--ty': ((Math.random() - 0.5) * 400) + 'px',
            animationDelay: (Math.random() * 0.5) + 's'
          }}><SparkleSvg size={20} /></div>
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
      <style>{`
        @keyframes score-bounce {
          0% { transform: scale(1); }
          40% { transform: scale(1.18); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        @keyframes particle-burst {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        @keyframes countdown-shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

      <div style={{ position: 'absolute', inset: 0, zIndex: 0, filter: 'brightness(0.4)', minHeight: '100%' }}>
        <ResultsMap 
          location={currentLocation} 
          players={[{ uid: 'you', displayName: 'You', lastGuess: userGuess }]} 
          height="100%"
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100dvh', padding: '0.5rem', overflow: 'hidden' }}>
        <div 
          className="glass-panel" 
          style={{ padding: isMobile ? '0.8rem' : '1.2rem', maxWidth: '600px', width: '100%', textAlign: 'center', background: 'rgba(26, 26, 46, 0.92)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '98dvh', overflowY: 'auto' }}
          onClick={() => { if (!isFinalRound) setCountdownPaused(true); }}
        >
          <h2 className="gradient-text glow-text" style={{ fontSize: 'clamp(1.2rem, 4vw, 2rem)', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            Round {currentRound} Result
            {isRareRound && <StarSvg size={20} />}
          </h2>
          
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

          {/* Score reveal with animation */}
          <div style={{ 
            display: 'inline-block', padding: '0.5rem 1.2rem', borderRadius: '50px', 
            background: isRareRound ? 'rgba(251, 191, 36, 0.15)' : 'rgba(59, 130, 246, 0.1)',
            position: 'relative',
            animation: showScoreBounce ? 'score-bounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none',
            border: isRareRound ? '1px solid rgba(251, 191, 36, 0.3)' : 'none',
          }}>
            {/* Particle burst for excellent guesses */}
            {showParticles && Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{
                position: 'absolute', top: '50%', left: '50%',
                animation: 'particle-burst 0.8s ease-out forwards',
                '--tx': (Math.cos(i * Math.PI / 4) * 60) + 'px',
                '--ty': (Math.sin(i * Math.PI / 4) * 60) + 'px',
                animationDelay: (i * 0.03) + 's',
              }}><SparkleSvg size={12} /></div>
            ))}

            <h3 style={{ fontSize: 'clamp(1.4rem, 5vw, 2.2rem)', color: isRareRound ? '#fbbf24' : 'var(--primary-color)', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              +<AnimatedCounter target={roundScore} duration={800} onStart={onScoreCountStart} /> Points
              {isRareRound && <span style={{ fontSize: '0.6em', color: '#fbbf24', fontWeight: 700, marginLeft: '4px' }}>2×</span>}
            </h3>
            {useGameStore.getState().usedHint && (
              <p style={{ margin: '0.2rem 0 0 0', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <LightbulbSvg size={14} /> Hint Used (-50%)
              </p>
            )}
          </div>
          
          <p style={{ margin: 0, opacity: 0.8, fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
            Total Score: <strong>{score}</strong>
            {gameMode === 'ENDLESS' && <span style={{ marginLeft: '12px', color: '#f97316' }}>Streak: <strong>{useGameStore.getState().currentEndlessStreak}</strong></span>}
          </p>

          {showEndlessWrongGuess ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', marginTop: '0.5rem' }}>
              <div style={{ padding: '0.8rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', borderRadius: '12px', color: '#fca5a5', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                WRONG GUESS! STREAK RESET.
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', padding: '10px 16px', flex: 1, position: 'relative', overflow: 'hidden' }} onClick={() => { setShowEndlessWrongGuess(false); handleNext(); }}>
                  Continue Playing
                </button>
                <button className="btn" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', padding: '10px 16px', background: 'rgba(255,255,255,0.1)' }} onClick={handleFinish}>
                  Quit & Collect XP
                </button>
              </div>
            </div>
          ) : currentRound < maxRounds ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <button className="btn" style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', padding: '10px 24px', position: 'relative', overflow: 'hidden' }} onClick={handleNext}>
                {countdownPaused ? 'Next Round' : `Next Round (${countdown})`}
                {/* Countdown progress bar */}
                {!countdownPaused && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, height: '3px',
                    background: 'rgba(255,255,255,0.4)',
                    animation: `countdown-shrink ${COUNTDOWN_SECONDS}s linear forwards`,
                    borderRadius: '0 0 8px 8px',
                  }} />
                )}
              </button>
              {countdownPaused && (
                <button 
                  style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.8rem', cursor: 'pointer', padding: '4px' }}
                  onClick={(e) => { e.stopPropagation(); setCountdownPaused(false); setCountdown(COUNTDOWN_SECONDS); }}
                >
                  Resume auto-advance
                </button>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%' }}>
              {/* Share Result */}
              <button 
                className="btn" 
                style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', padding: '10px 16px', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#000', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} 
                onClick={async () => {
                  const shareUrl = `https://www.loststreet.online/share/${score}`;
                  const shareText = `LostStreet — ${isChoiceMode ? 'Easy/Medium' : 'Hard'} Mode\nScore: ${score.toLocaleString()} pts\nPlay free → ${shareUrl}`;
                  if (navigator.share) {
                    try { await navigator.share({ title: 'My LostStreet Score', text: shareText }); } catch (e) {}
                  } else {
                    navigator.clipboard.writeText(shareText);
                  }
                }}
              >
                <ShareSvg />
                Share Result
              </button>
              {/* Challenge a Friend — Viral Growth Loop */}
              <button 
                className="btn" 
                style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', padding: '10px 16px', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', color: '#fff', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', border: '1px solid rgba(139, 92, 246, 0.4)' }} 
                onClick={async () => {
                  const shareUrl = `https://www.loststreet.online/share/${score}?ref=challenge`;
                  const challengeText = `🎯 I scored ${score.toLocaleString()} points on LostStreet! Think you can beat me?\n\n🌍 Play free — no sign-up required:\n${shareUrl}`;
                  if (navigator.share) {
                    try { await navigator.share({ title: 'Can you beat my score?', text: challengeText, url: shareUrl }); } catch (e) {}
                  } else {
                    try {
                      await navigator.clipboard.writeText(challengeText);
                    } catch (e) {}
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                ⚡ Challenge a Friend
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
