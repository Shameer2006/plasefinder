'use client';
import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import continentMapping from '../../../public/continentMapping.json';
import countryCoordinates from '../../../public/countryCoordinates.json';
import Spinner from './Spinner';
import { sounds } from '@/lib/sounds';

const FlagPinMap = dynamic(() => import('./FlagPinMap'), {
  ssr: false,
  loading: () => (
    <div style={{
      position: 'absolute',
      inset: 0,
      width: '100vw',
      height: '100vh',
      background: '#0a0f1d',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      color: '#9ca3af',
      zIndex: 1
    }}>
      <div className="spinner" style={{ width: '36px', height: '36px' }}></div>
      <span style={{ fontSize: '1rem', fontWeight: 600 }}>Loading World Map...</span>
    </div>
  )
});

const countryCodes = Object.keys(continentMapping);

// Distance calculation using Haversine formula (km)
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Distance scoring formula (exponential decay up to 5,000 pts)
function calculateScore(distanceKm) {
  if (distanceKm <= 25) return 5000;
  const earned = Math.round(5000 * Math.exp(-distanceKm / 2000));
  return Math.max(0, Math.min(5000, earned));
}

export default function FlagGame({ onReturnToMenu, initialDifficulty = 'EASY' }) {
  const [difficulty, setDifficulty] = useState(initialDifficulty || 'EASY');
  const [showDiffModal, setShowDiffModal] = useState(!initialDifficulty);
  const [round, setRound] = useState(1);
  const [maxRounds, setMaxRounds] = useState(5);
  const [score, setScore] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [distanceKm, setDistanceKm] = useState(null);
  const [usedFlags, setUsedFlags] = useState([]);
  const [target, setTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [roundState, setRoundState] = useState('LOADING'); // 'LOADING', 'PLAYING', 'RESULT', 'FINISHED'
  const [userGuess, setUserGuess] = useState(null);
  const [userPin, setUserPin] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  const getCountryName = (code) => {
    return regionNames.of(code) || code;
  };

  // Determine current round mode based on difficulty
  // EASY: 100% Multiple Choice
  // MEDIUM: Alternating (Odd rounds: 4 choices, Even rounds: Map Pinning)
  // HARD: 100% Map Pinning
  const isMapRound = difficulty === 'HARD' || (difficulty === 'MEDIUM' && round % 2 === 0);
  const isChoiceRound = !isMapRound;

  const startNextRound = useCallback((currentRound = round, currentUsed = usedFlags) => {
    setRoundState('LOADING');
    setUserGuess(null);
    setUserPin(null);
    setDistanceKm(null);
    setRoundScore(0);

    // Pick target country
    let targetCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
    while (currentUsed.includes(targetCode) && currentUsed.length < countryCodes.length) {
      targetCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
    }
    const updatedUsed = [...currentUsed, targetCode];
    setUsedFlags(updatedUsed);

    const countryName = getCountryName(targetCode);
    const coords = countryCoordinates[targetCode.toUpperCase()] || { lat: 20, lng: 0 };
    const newTarget = {
      iso: targetCode.toLowerCase(),
      code: targetCode.toUpperCase(),
      name: countryName,
      lat: coords.lat,
      lng: coords.lng
    };

    // Pick 3 wrong options for choice rounds
    const wrongCodes = [];
    while (wrongCodes.length < 3) {
      const code = countryCodes[Math.floor(Math.random() * countryCodes.length)];
      if (code !== targetCode && !wrongCodes.includes(code)) {
        wrongCodes.push(code);
      }
    }

    const newOptions = [
      newTarget,
      ...wrongCodes.map(code => ({
        iso: code.toLowerCase(),
        code: code.toUpperCase(),
        name: getCountryName(code)
      }))
    ];

    // Shuffle options
    newOptions.sort(() => Math.random() - 0.5);

    setTarget(newTarget);
    setOptions(newOptions);
    setRound(currentRound);
    setRoundState('PLAYING');
  }, [round, usedFlags]);

  // Start round on initial mount or difficulty change
  useEffect(() => {
    startNextRound(1, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  // Handle choice submission
  const handleChoiceGuess = (option) => {
    if (roundState !== 'PLAYING') return;

    setUserGuess(option);
    const isCorrect = option.iso === target.iso;
    const earned = isCorrect ? 5000 : 0;

    setRoundScore(earned);
    if (isCorrect) {
      setScore(prev => prev + 5000);
      try { sounds.playCorrect(); } catch (e) {}
    } else {
      try { sounds.playWrong(); } catch (e) {}
    }
    setRoundState('RESULT');
  };

  // Handle map pinning submission
  const handleMapGuess = () => {
    if (roundState !== 'PLAYING' || !userPin || !target) return;

    const dist = calculateDistanceKm(target.lat, target.lng, userPin.lat, userPin.lng);
    const earned = calculateScore(dist);

    setDistanceKm(dist);
    setRoundScore(earned);
    setUserGuess(userPin);
    setScore(prev => prev + earned);

    if (earned >= 3500) {
      try { sounds.playCorrect(); } catch (e) {}
    } else {
      try { sounds.playScoreReveal(); } catch (e) {}
    }

    setRoundState('RESULT');
  };

  const handleNext = () => {
    if (round < maxRounds) {
      startNextRound(round + 1, usedFlags);
    } else {
      setRoundState('FINISHED');
    }
  };

  const handleRestart = (newDiff = difficulty) => {
    setDifficulty(newDiff);
    setShowDiffModal(false);
    setRound(1);
    setScore(0);
    setUsedFlags([]);
    startNextRound(1, []);
  };

  if (roundState === 'LOADING') {
    return <Spinner text="Loading Flag..." />;
  }

  // Difficulty badge styling
  const diffBadgeColor = {
    EASY: '#10b981',
    MEDIUM: '#f59e0b',
    HARD: '#ef4444'
  }[difficulty] || '#10b981';

  // ── GAME OVER / FINISHED VIEW ───────────────────────────────────────
  if (roundState === 'FINISHED') {
    const maxPossible = maxRounds * 5000;
    const percentage = Math.round((score / maxPossible) * 100);
    let ratingTitle = "Great Job!";
    let ratingDesc = "Keep practicing to master all world flags!";
    if (percentage >= 90) {
      ratingTitle = "🏆 Geography Legend!";
      ratingDesc = "Phenomenal world knowledge and pinpoint accuracy!";
    } else if (percentage >= 75) {
      ratingTitle = "🌟 Flag Master!";
      ratingDesc = "Exceptional geographic knowledge across all continents!";
    } else if (percentage >= 50) {
      ratingTitle = "👍 Solid Explorer!";
      ratingDesc = "Good effort! A few more rounds will make you unstoppable.";
    }

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        background: 'radial-gradient(circle at 50% 30%, rgba(30, 41, 59, 0.8) 0%, rgba(10, 15, 30, 0.95) 100%)'
      }}>
        <div className="glass-panel" style={{
          padding: isMobile ? '2rem 1.5rem' : '3.5rem 3rem',
          maxWidth: '680px',
          width: '100%',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.6)'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '4px 14px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            background: `${diffBadgeColor}22`,
            color: diffBadgeColor,
            border: `1px solid ${diffBadgeColor}55`,
            marginBottom: '1rem'
          }}>
            {difficulty} MODE
          </div>

          <h2 className="gradient-text glow-text" style={{ fontSize: isMobile ? '2.2rem' : '3rem', marginBottom: '0.5rem' }}>
            {ratingTitle}
          </h2>
          <p style={{ color: '#9ca3af', fontSize: isMobile ? '0.95rem' : '1.1rem', marginBottom: '2rem' }}>
            {ratingDesc}
          </p>

          <div style={{
            margin: '1.5rem 0 2.5rem',
            background: 'rgba(0,0,0,0.4)',
            padding: isMobile ? '1.5rem' : '2rem',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <div style={{ fontSize: '0.95rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>
              Final Score
            </div>
            <div style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900, color: 'var(--primary-color)' }}>
              {score.toLocaleString()}
              <span style={{ fontSize: '1.2rem', color: '#6b7280', fontWeight: 600 }}> / {maxPossible.toLocaleString()}</span>
            </div>
            <div style={{ fontSize: '1rem', color: '#34d399', fontWeight: 700, marginTop: '0.4rem' }}>
              {percentage}% Accuracy
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary"
              style={{ fontSize: '1.05rem', padding: '14px 24px', background: 'rgba(255,255,255,0.08)' }}
              onClick={onReturnToMenu}
            >
              Return to Menu
            </button>
            <button
              className="btn btn-secondary"
              style={{ fontSize: '1.05rem', padding: '14px 24px', background: 'rgba(255,255,255,0.15)' }}
              onClick={() => setShowDiffModal(true)}
            >
              Change Mode
            </button>
            <button
              className="btn"
              style={{
                fontSize: '1.05rem',
                padding: '14px 28px',
                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)'
              }}
              onClick={() => handleRestart(difficulty)}
            >
              Play Again
            </button>
          </div>
        </div>

        {/* Change Difficulty Modal */}
        {showDiffModal && (
          <DifficultySelectModal
            currentDifficulty={difficulty}
            onSelect={(diff) => handleRestart(diff)}
            onClose={() => setShowDiffModal(false)}
          />
        )}
      </div>
    );
  }

  // ── TOP HUD (Shared Across Map & Choice Rounds) ────────────────────
  const TopHUD = (
    <div style={{
      position: 'fixed',
      top: 14,
      left: isMobile ? 12 : 24,
      right: isMobile ? 12 : 24,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.8rem',
      maxWidth: '1200px',
      margin: '0 auto',
      pointerEvents: 'none'
    }}>
      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', pointerEvents: 'auto' }}>
        <div className="glass-panel" style={{ padding: '0.45rem 0.9rem', fontWeight: 'bold', fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
          Round: {round} / {maxRounds}
        </div>
        <div className="glass-panel" style={{ padding: '0.45rem 0.9rem', fontWeight: 'bold', fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
          Score: <span style={{ color: 'var(--primary-color)' }}>{score.toLocaleString()}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', pointerEvents: 'auto' }}>
        {/* Difficulty Badge (Clickable to switch mode) */}
        <button
          onClick={() => setShowDiffModal(true)}
          style={{
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: `1px solid ${diffBadgeColor}88`,
            borderRadius: '20px',
            padding: '0.4rem 0.9rem',
            color: diffBadgeColor,
            fontWeight: 800,
            fontSize: isMobile ? '0.75rem' : '0.85rem',
            letterSpacing: '1px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          title="Click to switch difficulty"
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: diffBadgeColor }}></span>
          {difficulty}
          <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>▼</span>
        </button>

        <button
          className="btn btn-secondary"
          style={{
            padding: '0.45rem 0.9rem',
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            backgroundColor: '#ef4444',
            borderColor: '#ef4444',
            color: 'white'
          }}
          onClick={onReturnToMenu}
        >
          Quit
        </button>
      </div>
    </div>
  );

  // ── SCENARIO A: MAP PINNING ROUND (Full-screen map + Bottom-right Flag Widget)
  if (isMapRound) {
    let accuracyRating = null;
    if (distanceKm !== null) {
      if (distanceKm <= 250) {
        accuracyRating = { text: '🎯 Direct Hit!', color: '#10b981' };
      } else if (distanceKm <= 750) {
        accuracyRating = { text: '🌟 Very Close!', color: '#34d399' };
      } else if (distanceKm <= 2000) {
        accuracyRating = { text: '👍 Regional Proximity', color: '#f59e0b' };
      } else {
        accuracyRating = { text: '🧭 Off Target', color: '#ef4444' };
      }
    }

    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        {TopHUD}

        {/* 1. Full-Screen World Map as the Main Stage */}
        <FlagPinMap
          userPin={userPin}
          onPinSelect={setUserPin}
          targetLocation={target}
          isResultMode={roundState === 'RESULT'}
          isFullScreen={true}
        />

        {/* 2. Floating Target Flag Widget (Docked at Bottom-Right in place of the map) */}
        <div style={{
          position: 'fixed',
          bottom: isMobile ? '16px' : '24px',
          right: isMobile ? '16px' : '24px',
          zIndex: 40,
          background: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '20px',
          padding: isMobile ? '10px' : '14px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.65)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          maxWidth: isMobile ? '220px' : '320px',
          transition: 'transform 0.2s ease'
        }}>
          {/* Header Label */}
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
              <line x1="4" y1="22" x2="4" y2="15"></line>
            </svg>
            Target Flag
          </div>

          {/* Flag Image */}
          <div style={{
            background: 'white',
            padding: '5px',
            borderRadius: '10px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}>
            <img
              src={`https://flagcdn.com/w320/${target?.iso}.png`}
              alt="Target Flag"
              style={{
                display: 'block',
                maxWidth: '100%',
                maxHeight: isMobile ? '95px' : '140px',
                borderRadius: '4px'
              }}
            />
          </div>

          {/* Make Guess Action Button (Shown while in playing state) */}
          {roundState === 'PLAYING' && (
            <button
              className="btn"
              onClick={handleMapGuess}
              disabled={!userPin}
              style={{
                width: '100%',
                padding: isMobile ? '10px 14px' : '12px 18px',
                fontSize: isMobile ? '0.9rem' : '1.05rem',
                fontWeight: 800,
                borderRadius: '14px',
                letterSpacing: '0.5px',
                background: userPin
                  ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                  : 'rgba(255, 255, 255, 0.08)',
                color: userPin ? 'white' : '#6b7280',
                border: userPin ? 'none' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: userPin ? '0 4px 20px rgba(59, 130, 246, 0.5)' : 'none',
                cursor: userPin ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease'
              }}
            >
              {userPin ? 'MAKE GUESS' : 'Drop a pin on map'}
            </button>
          )}
        </div>

        {/* 3. Post-Guess Floating Result Banner (Centered at bottom) */}
        {roundState === 'RESULT' && distanceKm !== null && (
          <div style={{
            position: 'fixed',
            bottom: isMobile ? '16px' : '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 60,
            width: '90%',
            maxWidth: '680px',
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            padding: isMobile ? '1rem' : '1.2rem 2rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75)',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            animation: 'fade-in 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img
                src={`https://flagcdn.com/w80/${target?.iso}.png`}
                alt="Flag"
                style={{ width: '48px', height: 'auto', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}
              />
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>
                  {target?.name}
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.85rem' }}>
                  <span style={{ color: accuracyRating?.color, fontWeight: 700 }}>
                    {accuracyRating?.text}
                  </span>
                  <span style={{ color: '#9ca3af' }}>•</span>
                  <span style={{ color: '#60a5fa', fontWeight: 600 }}>
                    {distanceKm.toLocaleString()} km
                  </span>
                  <span style={{ color: '#9ca3af' }}>•</span>
                  <span style={{ color: 'var(--primary-color)', fontWeight: 800 }}>
                    +{roundScore.toLocaleString()} pts
                  </span>
                </div>
              </div>
            </div>

            <button
              className="btn"
              style={{
                padding: isMobile ? '10px 20px' : '12px 28px',
                fontSize: isMobile ? '0.95rem' : '1.1rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
                flexShrink: 0
              }}
              onClick={handleNext}
            >
              {round < maxRounds ? 'Next Round →' : 'See Final Score 🏁'}
            </button>
          </div>
        )}

        {/* Change Difficulty Modal */}
        {showDiffModal && (
          <DifficultySelectModal
            currentDifficulty={difficulty}
            onSelect={(diff) => handleRestart(diff)}
            onClose={() => setShowDiffModal(false)}
          />
        )}
      </div>
    );
  }

  // ── SCENARIO B: MULTIPLE CHOICE ROUND (Easy Mode & Medium Mode Odd Rounds)
  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      minHeight: '100dvh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '5.5rem 1rem 2.5rem' : '5rem 1.5rem 2.5rem',
      background: 'radial-gradient(circle at 50% 20%, rgba(20, 28, 45, 0.95) 0%, rgba(10, 15, 26, 0.98) 100%)'
    }}>
      {TopHUD}

      {/* Main Choice Card */}
      <div className="glass-panel" style={{
        padding: isMobile ? '1.8rem 1.2rem' : '2.5rem 3rem',
        width: '100%',
        maxWidth: '740px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.55)',
        animation: 'fade-in 0.3s ease'
      }}>
        {/* Round Mode Pill Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '0.8rem',
          padding: '4px 14px',
          borderRadius: '20px',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid #10b98144',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#34d399',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          Multiple Choice Round
        </div>

        <h2 style={{
          fontSize: isMobile ? '1.3rem' : '1.8rem',
          marginBottom: '1.4rem',
          textAlign: 'center',
          lineHeight: 1.3,
          fontWeight: 800
        }}>
          Which country does this flag belong to?
        </h2>

        {/* Flag Card */}
        <div style={{
          marginBottom: isMobile ? '1.5rem' : '2.2rem',
          background: 'white',
          padding: '8px',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.45)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img
            src={`https://flagcdn.com/w320/${target?.iso}.png`}
            alt="Flag"
            style={{
              display: 'block',
              maxWidth: '100%',
              height: 'auto',
              maxHeight: isMobile ? '140px' : '210px',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* 4 Choices Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '0.75rem' : '1rem',
          width: '100%'
        }}>
          {options.map((option, idx) => {
            let btnStyle = {
              padding: isMobile ? '0.9rem 1rem' : '1.2rem',
              fontSize: isMobile ? '1rem' : '1.15rem',
              minHeight: isMobile ? '52px' : '62px',
              fontWeight: 600,
              borderRadius: '12px',
              transition: 'all 0.2s ease',
              border: '1px solid rgba(255,255,255,0.15)'
            };

            if (roundState === 'RESULT') {
              if (option.iso === target.iso) {
                btnStyle.background = '#10b981';
                btnStyle.borderColor = '#10b981';
                btnStyle.color = 'white';
                btnStyle.boxShadow = '0 0 20px rgba(16, 185, 129, 0.5)';
              } else if (userGuess && userGuess.iso === option.iso) {
                btnStyle.background = '#ef4444';
                btnStyle.borderColor = '#ef4444';
                btnStyle.color = 'white';
              } else {
                btnStyle.opacity = 0.4;
              }
            }

            return (
              <button
                key={idx}
                className="btn btn-secondary"
                style={btnStyle}
                onClick={() => handleChoiceGuess(option)}
                disabled={roundState !== 'PLAYING'}
              >
                {option.name}
              </button>
            );
          })}
        </div>

        {/* Round Result Next Button */}
        {roundState === 'RESULT' && (
          <div style={{ marginTop: '2rem', animation: 'fade-in 0.3s ease', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button
              className="btn"
              style={{
                padding: isMobile ? '0.9rem 2rem' : '1rem 3.5rem',
                fontSize: isMobile ? '1.1rem' : '1.25rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)'
              }}
              onClick={handleNext}
            >
              {round < maxRounds ? 'Next Round →' : 'See Final Score 🏁'}
            </button>
          </div>
        )}
      </div>

      {/* Change Difficulty Modal */}
      {showDiffModal && (
        <DifficultySelectModal
          currentDifficulty={difficulty}
          onSelect={(diff) => handleRestart(diff)}
          onClose={() => setShowDiffModal(false)}
        />
      )}
    </div>
  );
}

// Reusable Difficulty Selector Modal for Flag Guesser
function DifficultySelectModal({ currentDifficulty, onSelect, onClose }) {
  const modes = [
    {
      id: 'EASY',
      name: 'Easy',
      color: '#10b981',
      badge: 'Multiple Choice',
      desc: 'Pick from 4 options every round. Perfect for beginners and flag enthusiasts.'
    },
    {
      id: 'MEDIUM',
      name: 'Medium',
      color: '#f59e0b',
      badge: 'Mixed Gameplay',
      desc: 'Alternates between 4 multiple-choice options and locating the country on the full-screen world map.'
    },
    {
      id: 'HARD',
      name: 'Hard',
      color: '#ef4444',
      badge: 'Pure Map Pinning',
      desc: 'No multiple choice hints! Full-screen world map where you drop a pin to locate the flag.'
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '560px',
        width: '100%',
        padding: '2rem',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Select Difficulty</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              fontSize: '1.4rem',
              cursor: 'pointer',
              padding: '4px 8px'
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {modes.map((m) => {
            const isSelected = currentDifficulty === m.id;
            return (
              <button
                key={m.id}
                onClick={() => onSelect(m.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '1.2rem',
                  borderRadius: '16px',
                  background: isSelected ? `${m.color}18` : 'rgba(255, 255, 255, 0.04)',
                  border: isSelected ? `2px solid ${m.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  color: 'white',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: m.color }}>
                    {m.name}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '12px',
                    background: `${m.color}25`,
                    color: m.color,
                    letterSpacing: '0.5px'
                  }}>
                    {m.badge}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0, lineHeight: 1.4 }}>
                  {m.desc}
                </p>
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            className="btn btn-secondary"
            style={{ padding: '0.6rem 2rem', fontSize: '0.95rem' }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
