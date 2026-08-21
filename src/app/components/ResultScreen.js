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

// ── SVG Icons (Zero Emojis) ──────────────────────────────────────────
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
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
);

const CheckSvg = ({ size = 16, color = '#34d399' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

const CrossSvg = ({ size = 16, color = '#f87171' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

const SwordsSvg = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/><path d="M9.5 6.5L21 18v3h-3L6.5 9.5"/><path d="M11 5l-6 6"/><path d="M8 8L4 4"/><path d="M5 3L3 5"/></svg>
);

const ArrowRightSvg = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

const COUNTDOWN_SECONDS = 5;

export default function ResultScreen() {
  const { user, userProfile, setUserProfile } = useAuth();
  const { 
    currentLocation, userGuess, difficulty, 
    score, addScore,
    currentRound, maxRounds, setMaxRounds,
    nextRound, setGameState, resetGame, addGameResult,
    isRareRound, isDailyChallenge,
    gameMode, currentStreak, setCurrentStreak, setCurrentEndlessStreak
  } = useGameStore();

  const [roundScore, setRoundScore] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);
  const [showMapOnly, setShowMapOnly] = useState(true);
  const [levelUpData, setLevelUpData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollectingXp, setIsCollectingXp] = useState(false);
  const [showScoreBounce, setShowScoreBounce] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [isNewBestScore, setIsNewBestScore] = useState(false);
  const [isShowingBestScore, setIsShowingBestScore] = useState(false);
  const [isShowingStreak, setIsShowingStreak] = useState(false);
  const [showEndlessWrongGuess, setShowEndlessWrongGuess] = useState(false);

  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [countdownPaused, setCountdownPaused] = useState(false);
  const countdownRef = useRef(null);

  const isFinalRound = currentRound >= maxRounds;
  const isChoiceMode = difficulty === 'EASY' || (difficulty === 'MEDIUM' && currentRound % 2 !== 0);
  const isGuessCorrect = isChoiceMode 
    ? (userGuess?.country === currentLocation?.country)
    : (distanceKm <= 500);

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
      if (userGuess?.country === currentLocation?.country) {
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
    
    if (useGameStore.getState().usedHint) {
      earned = Math.floor(earned / 2);
    }

    const mult = useGameStore.getState().rareMultiplier || 1;
    earned = Math.round(earned * mult);

    setRoundScore(earned);
    addScore(earned);

    // Single Player Streak Logic (Easy, Medium, Hard)
    let isStreakAwarded = false;
    if (difficulty === 'HARD') {
      isStreakAwarded = earned >= 4500;
    } else {
      isStreakAwarded = isChoiceMode 
        ? (userGuess?.country === currentLocation?.country)
        : (dist <= 500);
    }

    if (isStreakAwarded) {
      setCurrentStreak((useGameStore.getState().currentStreak || 0) + 1);
    } else {
      setCurrentStreak(0);
    }

    if (gameMode === 'ENDLESS') {
      if (isCorrect) {
        setCurrentEndlessStreak(useGameStore.getState().currentEndlessStreak + 1);
      } else {
        setShowEndlessWrongGuess(true);
        setCurrentEndlessStreak(0);
      }
    }

    if (earned >= 4000) {
      setShowParticles(true);
    }

    const timer = setTimeout(() => setShowMapOnly(false), 3000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showMapOnly || isFinalRound || countdownPaused || showEndlessWrongGuess) return;

    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          handleNext();
          return 0;
        }
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
        <style>{`@keyframes best-score-pop { 0% { transform: scale(0.5); opacity: 0; } 60% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }`}</style>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', animation: 'xp-particle 2s ease-out forwards', '--tx': ((Math.random() - 0.5) * 600) + 'px', '--ty': ((Math.random() - 0.5) * 600) + 'px', animationDelay: (Math.random() * 0.2) + 's' }}><SparkleSvg size={24} /></div>
        ))}
        <div style={{ animation: 'best-score-pop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards', textAlign: 'center', zIndex: 10 }}>
          <TrophySvg size={80} color="#fbbf24" />
          <h2 className="gradient-text glow-text" style={{ fontSize: isMobile ? '2.2rem' : '3.8rem', margin: '1rem 0', background: 'linear-gradient(to right, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>
            NEW PERSONAL BEST!
          </h2>
          <div style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: 900, color: 'white', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
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
        <style>{`@keyframes best-score-pop { 0% { transform: scale(0.5); opacity: 0; } 60% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }`}</style>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', animation: 'xp-particle 2s ease-out forwards', '--tx': ((Math.random() - 0.5) * 500) + 'px', '--ty': ((Math.random() - 0.5) * 500) + 'px', animationDelay: (Math.random() * 0.2) + 's' }}><FireSvg size={24} color="#f97316" /></div>
        ))}
        <div style={{ animation: 'best-score-pop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards', textAlign: 'center', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <FireSvg size={80} color="#f97316" />
          <h2 className="gradient-text glow-text" style={{ fontSize: isMobile ? '2.2rem' : '3.8rem', margin: 0, background: 'linear-gradient(to right, #f97316, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>
            {streak} DAY STREAK!
          </h2>
          {isNewRecord && (
            <div style={{ fontSize: isMobile ? '1.3rem' : '1.8rem', fontWeight: 900, color: '#fbbf24', textShadow: '0 5px 15px rgba(0,0,0,0.5)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrophySvg size={24} color="#fbbf24" />
              NEW RECORD!
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
        <style>{`@keyframes count-up { 0% { transform: scale(0.5); opacity: 0; } 50% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } } @keyframes xp-particle { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; } }`}</style>
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', animation: 'xp-particle 1.5s ease-out forwards', '--tx': ((Math.random() - 0.5) * 400) + 'px', '--ty': ((Math.random() - 0.5) * 400) + 'px', animationDelay: (Math.random() * 0.5) + 's' }}><SparkleSvg size={20} /></div>
        ))}
        <div style={{ animation: 'count-up 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards', textAlign: 'center', zIndex: 10 }}>
          <h2 className="gradient-text glow-text" style={{ fontSize: isMobile ? '2rem' : '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>
            Collecting XP...
          </h2>
          <div style={{ fontSize: isMobile ? '2.8rem' : '4.2rem', fontWeight: 900, color: 'white', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
            +<AnimatedCounter target={xpEarned} duration={1500} /> <span style={{ fontSize: '0.6em', color: '#fbbf24' }}>XP</span>
          </div>
        </div>
      </div>
    );
  }

  if (showMapOnly) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
        <ResultsMap location={currentLocation} players={[{ uid: 'you', displayName: 'You', lastGuess: userGuess }]} height="100%" />
        <div style={{
          position: 'absolute', top: '1.5rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(12, 16, 28, 0.85)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)', padding: '0.6rem 1.4rem',
          borderRadius: '50px', zIndex: 1000, boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
        }}>
          <h3 style={{ color: 'white', margin: 0, fontSize: '0.95rem', fontWeight: 800, letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8', display: 'inline-block', boxShadow: '0 0 10px #38bdf8' }}></span>
            Reviewing Location on Map...
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowY: 'auto', fontFamily: '"Outfit", system-ui, -apple-system, sans-serif' }}>
      <style>{`
        @keyframes score-bounce { 0% { transform: scale(1); } 40% { transform: scale(1.15); } 70% { transform: scale(0.97); } 100% { transform: scale(1); } }
        @keyframes particle-burst { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; } }
        @keyframes countdown-shrink { from { width: 100%; } to { width: 0%; } }
        @keyframes resultPopIn { 0% { opacity: 0; transform: scale(0.94) translateY(16px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>

      <div style={{ position: 'absolute', inset: 0, zIndex: 0, filter: 'brightness(0.35)', minHeight: '100%' }}>
        <ResultsMap location={currentLocation} players={[{ uid: 'you', displayName: 'You', lastGuess: userGuess }]} height="100%" />
      </div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', padding: isMobile ? '0.75rem' : '1.5rem', boxSizing: 'border-box' }}>
        <div 
          style={{
            padding: isMobile ? '1.25rem 1rem' : '1.75rem 1.5rem',
            maxWidth: '520px',
            width: '100%',
            textAlign: 'center',
            background: 'rgba(12, 18, 32, 0.94)',
            backdropFilter: 'blur(28px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '0.85rem' : '1.1rem',
            maxHeight: '94dvh',
            overflowY: 'auto',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
            animation: 'resultPopIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            boxSizing: 'border-box'
          }}
          onClick={() => { if (!isFinalRound) setCountdownPaused(true); }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ padding: '4px 10px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em' }}>
                {gameMode === 'ENDLESS' ? `ENDLESS ROUND ${currentRound}` : `ROUND ${currentRound} OF ${maxRounds}`}
              </span>
              {isRareRound && (
                <span style={{ padding: '4px 10px', borderRadius: '8px', background: 'rgba(251, 191, 36, 0.15)', border: '1px solid rgba(251, 191, 36, 0.3)', color: '#fbbf24', fontSize: '0.75rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <StarSvg size={12} /> 2X BONUS
                </span>
              )}
            </div>
            <h2 style={{ fontSize: isMobile ? '1.5rem' : '1.9rem', margin: 0, fontWeight: 900, color: 'white', letterSpacing: '-0.01em' }}>Round {currentRound} Result</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: isChoiceMode ? (isMobile ? '1fr' : '1fr 1fr') : '1fr', gap: '8px', textAlign: 'left' }}>
            {isChoiceMode ? (
              <>
                <div style={{ padding: '10px 12px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '14px', border: isGuessCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                    {userGuess?.iso ? <img src={`https://flagcdn.com/w40/${userGuess.iso.toLowerCase()}.png`} width="24" height="16" alt="" style={{ borderRadius: '3px', objectFit: 'cover', flexShrink: 0 }} /> : <div style={{ width: '24px', height: '16px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />}
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '0.68rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Your Guess</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userGuess?.country || 'No Guess'}</div>
                    </div>
                  </div>
                  <div style={{ flexShrink: 0 }}>{isGuessCorrect ? <CheckSvg size={18} color="#34d399" /> : <CrossSvg size={18} color="#f87171" />}</div>
                </div>
                <div style={{ padding: '10px 12px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '14px', border: '1px solid rgba(16, 185, 129, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                    {currentLocation?.iso ? <img src={`https://flagcdn.com/w40/${currentLocation.iso.toLowerCase()}.png`} width="24" height="16" alt="" style={{ borderRadius: '3px', objectFit: 'cover', flexShrink: 0 }} /> : <div style={{ width: '24px', height: '16px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />}
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '0.68rem', color: '#6ee7b7', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Correct Answer</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentLocation?.country || 'Unknown'}</div>
                    </div>
                  </div>
                  <div style={{ flexShrink: 0 }}><CheckSvg size={18} color="#34d399" /></div>
                </div>
              </>
            ) : (
              <div style={{ padding: '12px 14px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {currentLocation?.iso && <img src={`https://flagcdn.com/w40/${currentLocation.iso.toLowerCase()}.png`} width="26" height="18" alt="" style={{ borderRadius: '3px', objectFit: 'cover' }} />}
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 700 }}>LOCATION</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'white' }}>{currentLocation?.country}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 700 }}>DISTANCE</div>
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: '#38bdf8' }}>{distanceKm.toLocaleString()} km</div>
                </div>
              </div>
            )}
          </div>

          <div style={{ padding: isMobile ? '0.85rem' : '1.1rem', borderRadius: '18px', background: roundScore > 0 ? (isRareRound ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(217, 119, 6, 0.25) 100%)' : 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.25) 100%)') : 'rgba(255, 255, 255, 0.04)', border: roundScore > 0 ? (isRareRound ? '1px solid rgba(251, 191, 36, 0.4)' : '1px solid rgba(16, 185, 129, 0.35)') : '1px solid rgba(255, 255, 255, 0.08)', position: 'relative', animation: showScoreBounce ? 'score-bounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none' }}>
            {showParticles && Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', animation: 'particle-burst 0.8s ease-out forwards', '--tx': (Math.cos(i * Math.PI / 4) * 60) + 'px', '--ty': (Math.sin(i * Math.PI / 4) * 60) + 'px', animationDelay: (i * 0.03) + 's' }}><SparkleSvg size={12} /></div>
            ))}
            <div style={{ fontSize: isMobile ? '1.8rem' : '2.3rem', fontWeight: 900, color: roundScore > 0 ? (isRareRound ? '#fbbf24' : '#34d399') : '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              +{<AnimatedCounter target={roundScore} duration={800} onStart={onScoreCountStart} />} Points
              {isRareRound && <span style={{ fontSize: '0.55em', color: '#fbbf24', fontWeight: 800, padding: '2px 6px', borderRadius: '6px', background: 'rgba(251, 191, 36, 0.2)' }}>2×</span>}
            </div>
            {useGameStore.getState().usedHint && (
              <div style={{ margin: '4px 0 0 0', color: '#fbbf24', fontSize: '0.78rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}><LightbulbSvg size={13} /> Hint Used (-50% Points)</div>
            )}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', fontSize: '0.9rem', color: '#d1d5db', fontWeight: 700 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><TrophySvg size={16} color="#fbbf24" /> Total Score: <strong style={{ color: 'white' }}>{score.toLocaleString()}</strong></span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#f97316' }}>
              <FireSvg size={16} color="#f97316" /> Streak: <strong style={{ color: 'white' }}>{gameMode === 'ENDLESS' ? (useGameStore.getState().currentEndlessStreak || 0) : (useGameStore.getState().currentStreak || 0)}</strong>
            </span>
          </div>

          {showEndlessWrongGuess ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', marginTop: '0.2rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', borderRadius: '12px', color: '#fca5a5', fontWeight: 800, fontSize: '0.85rem' }}>Wrong Guess! Streak Reset.</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => { setShowEndlessWrongGuess(false); handleNext(); }} style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: '0.92rem' }}>Continue Playing</button>
                <button onClick={handleFinish} style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.92rem' }}>Quit & Collect XP</button>
              </div>
            </div>
          ) : currentRound < maxRounds ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <button onClick={handleNext} style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white', border: 'none', borderRadius: '14px', padding: isMobile ? '12px 20px' : '14px 24px', fontWeight: 900, fontSize: isMobile ? '1rem' : '1.1rem', cursor: 'pointer', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)', transition: 'all 0.2s ease' }}>
                <span>{countdownPaused ? 'Next Round' : `Next Round (${countdown}s)`}</span>
                <ArrowRightSvg size={18} />
                {!countdownPaused && <div style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', background: 'rgba(255,255,255,0.6)', animation: `countdown-shrink ${COUNTDOWN_SECONDS}s linear forwards`, borderRadius: '0 0 14px 14px' }} />}
              </button>
              {countdownPaused && <button style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.78rem', cursor: 'pointer', padding: '4px', fontWeight: 600 }} onClick={(e) => { e.stopPropagation(); setCountdownPaused(false); setCountdown(COUNTDOWN_SECONDS); }}>Resume auto-advance</button>}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%' }}>
              <button onClick={handleFinish} style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', border: 'none', borderRadius: '14px', padding: '13px 20px', fontWeight: 900, fontSize: '1rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)' }}>
                <TrophySvg size={18} color="#fff" /> Finish & Collect XP
              </button>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ flex: 1, background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#0f172a', border: 'none', borderRadius: '12px', padding: '10px 14px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }} onClick={async () => { const shareUrl = `https://www.loststreet.online/share/${score}`; const shareText = `LostStreet — ${isChoiceMode ? 'Easy/Medium' : 'Hard'} Mode\nScore: ${score.toLocaleString()} pts\nPlay free → ${shareUrl}`; if (navigator.share) { try { await navigator.share({ title: 'My LostStreet Score', text: shareText }); } catch (e) {} } else { navigator.clipboard.writeText(shareText); } }}>
                  <ShareSvg /> Share Result
                </button>
                <button style={{ flex: 1, background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', color: '#fff', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '12px', padding: '10px 14px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }} onClick={async () => { const shareUrl = `https://www.loststreet.online/share/${score}?ref=challenge`; const challengeText = `I scored ${score.toLocaleString()} points on LostStreet! Think you can beat me?\n\nPlay free — no sign-up required:\n${shareUrl}`; if (navigator.share) { try { await navigator.share({ title: 'Can you beat my score?', text: challengeText, url: shareUrl }); } catch (e) {} } else { try { await navigator.clipboard.writeText(challengeText); } catch (e) {} } }}>
                  <SwordsSvg size={16} /> Challenge Friend
                </button>
              </div>
              <button style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', color: 'white', borderRadius: '12px', padding: '10px 16px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }} onClick={handleContinueGame}>+5 More Rounds</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
