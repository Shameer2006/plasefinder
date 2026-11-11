'use client';
import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import continentMapping from '../../../public/continentMapping.json';
import countryCoordinates from '../../../public/countryCoordinates.json';
import Spinner from './Spinner';
import AntiqueCompassBackground from './AntiqueCompassBackground';
import { sounds } from '@/lib/sounds';

const FlagPinMap = dynamic(() => import('./FlagPinMap'), {
  ssr: false,
  loading: () => (
    <div style={{
      position: 'absolute',
      inset: 0,
      width: '100vw',
      height: '100vh',
      background: '#f6efe2',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      color: '#3c2514',
      zIndex: 1
    }}>
      <div className="spinner" style={{ width: '36px', height: '36px' }}></div>
      <span style={{ fontSize: '1rem', fontWeight: 700 }}>Loading World Map...</span>
    </div>
  )
});

const countryCodes = Object.keys(continentMapping);
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
const getCountryName = (code) => regionNames.of(code) || code;

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

function CartographicTableOverlay({ isDesktop }) {
  if (!isDesktop) return null;
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: '14px',
        zIndex: 1,
        pointerEvents: 'none',
        border: '1px solid rgba(110, 78, 46, 0.2)',
        borderRadius: '18px',
        boxShadow: 'inset 0 0 0 4px rgba(246, 239, 226, 0.3), inset 0 0 0 5px rgba(110, 78, 46, 0.12)',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          bottom: '22px',
          right: '26px',
          width: '130px',
          height: '130px',
          opacity: 0.11,
          color: '#4a301a',
        }}
      >
        <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="100,10 112,86 100,100 88,86" fill="currentColor" />
        <polygon points="100,190 112,114 100,100 88,114" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="10,100 86,88 100,100 86,112" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="190,100 114,88 100,100 114,112" fill="currentColor" />
        <text x="100" y="26" textAnchor="middle" fontSize="11" fontWeight="bold" fill="currentColor" fontFamily="serif">N</text>
      </svg>

      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '24px',
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.16em',
          color: 'rgba(92, 61, 30, 0.42)',
          fontFamily: 'monospace',
          textTransform: 'uppercase',
        }}
      >
        LOSTSTREET · VEXILLOLOGY ARCHIVE · 196 SOVEREIGN FLAGS
      </div>
    </div>
  );
}

export default function FlagGame({ onReturnToMenu, initialDifficulty = 'EASY' }) {
  const [difficulty, setDifficulty] = useState(initialDifficulty || 'EASY');
  const [showDiffModal, setShowDiffModal] = useState(!initialDifficulty);
  const [round, setRound] = useState(1);
  const [maxRounds] = useState(5);
  const [score, setScore] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [distanceKm, setDistanceKm] = useState(null);
  const [usedFlags, setUsedFlags] = useState([]);
  const [target, setTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [roundState, setRoundState] = useState('LOADING'); // 'LOADING', 'PLAYING', 'RESULT', 'FINISHED'
  const [userGuess, setUserGuess] = useState(null);
  const [userPin, setUserPin] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(1200);

  useEffect(() => {
    const checkViewport = () => setViewportWidth(window.innerWidth);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const isMobile = viewportWidth <= 768;
  const isDesktop = viewportWidth >= 900;

  // Determine current round mode based on difficulty
  // EASY: 100% Multiple Choice
  // MEDIUM: Alternating (Odd rounds: 4 choices, Even rounds: Map Pinning)
  // HARD: 100% Map Pinning
  const isMapRound = difficulty === 'HARD' || (difficulty === 'MEDIUM' && round % 2 === 0);

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
    const rafId = requestAnimationFrame(() => startNextRound(1, []));
    return () => cancelAnimationFrame(rafId);
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
    EASY: '#059669',
    MEDIUM: '#d97706',
    HARD: '#dc2626'
  }[difficulty] || '#059669';

  const diffBadgeBg = {
    EASY: '#ecfdf5',
    MEDIUM: '#fef3c7',
    HARD: '#fef2f2'
  }[difficulty] || '#ecfdf5';

  const diffBadgeBorder = {
    EASY: '#a7f3d0',
    MEDIUM: '#fde68a',
    HARD: '#fecaca'
  }[difficulty] || '#a7f3d0';

  const hudPillStyle = {
    background: 'rgba(254, 250, 243, 0.94)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(160, 125, 85, 0.35)',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(60, 37, 20, 0.1)',
    padding: isMobile ? '0.4rem 0.78rem' : '0.45rem 0.95rem',
    fontWeight: 800,
    fontSize: isMobile ? '0.8rem' : '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#1b120c',
  };

  // ── GAME OVER / FINISHED VIEW ───────────────────────────────────────
  if (roundState === 'FINISHED') {
    const maxPossible = maxRounds * 5000;
    const percentage = Math.round((score / maxPossible) * 100);
    let ratingTitle = 'Great Job!';
    let ratingDesc = 'Keep practicing to master all world flags.';
    if (percentage >= 90) {
      ratingTitle = 'Geography Legend';
      ratingDesc = 'Phenomenal world knowledge and pinpoint accuracy.';
    } else if (percentage >= 75) {
      ratingTitle = 'Flag Master';
      ratingDesc = 'Exceptional geographic knowledge across all continents.';
    } else if (percentage >= 50) {
      ratingTitle = 'Solid Explorer';
      ratingDesc = 'Good effort! A few more rounds will sharpen your recall.';
    }

    return (
      <div
        className="google-anno-skip"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100dvh',
          padding: '2rem',
          background: '#f6efe2',
          fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
          boxSizing: 'border-box',
        }}
      >
        <AntiqueCompassBackground mode="fixed" enableParallax={true} />
        <CartographicTableOverlay isDesktop={isDesktop} />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            padding: isMobile ? '2rem 1.5rem' : '3rem 2.8rem',
            maxWidth: '640px',
            width: '100%',
            textAlign: 'center',
            background: 'rgba(254, 250, 243, 0.96)',
            border: '1.5px solid rgba(160, 125, 85, 0.38)',
            borderRadius: '24px',
            boxShadow: '0 22px 55px rgba(60, 37, 20, 0.16), 0 4px 12px rgba(60, 37, 20, 0.08)',
          }}
        >
          <div style={{
            display: 'inline-block',
            padding: '4px 14px',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            background: diffBadgeBg,
            color: diffBadgeColor,
            border: `1px solid ${diffBadgeBorder}`,
            marginBottom: '1rem'
          }}>
            {difficulty} MODE
          </div>

          <h2 style={{ fontSize: isMobile ? '2rem' : '2.6rem', fontWeight: 900, color: '#111827', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
            {ratingTitle}
          </h2>
          <p style={{ color: '#5c4632', fontSize: isMobile ? '0.95rem' : '1.05rem', margin: '0 0 1.8rem' }}>
            {ratingDesc}
          </p>

          <div style={{
            margin: '1.25rem 0 2rem',
            background: '#ffffff',
            padding: isMobile ? '1.4rem' : '1.8rem',
            borderRadius: '18px',
            border: '1px solid rgba(160, 125, 85, 0.28)'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#7c6146', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800, marginBottom: '0.35rem' }}>
              Final Score
            </div>
            <div style={{ fontSize: isMobile ? '2.4rem' : '3.2rem', fontWeight: 900, color: '#059669' }}>
              {score.toLocaleString()}
              <span style={{ fontSize: '1.15rem', color: '#7c6146', fontWeight: 600 }}> / {maxPossible.toLocaleString()}</span>
            </div>
            <div style={{ fontSize: '0.98rem', color: '#b45309', fontWeight: 800, marginTop: '0.35rem' }}>
              {percentage}% Accuracy
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              style={{
                fontSize: '0.96rem',
                fontWeight: 700,
                padding: '12px 22px',
                borderRadius: '12px',
                background: '#ffffff',
                color: '#3c2514',
                border: '1px solid rgba(160, 125, 85, 0.35)',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
              onClick={onReturnToMenu}
            >
              Return to Menu
            </button>
            <button
              type="button"
              style={{
                fontSize: '0.96rem',
                fontWeight: 700,
                padding: '12px 22px',
                borderRadius: '12px',
                background: '#fef3c7',
                color: '#92400e',
                border: '1px solid #fde68a',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
              onClick={() => setShowDiffModal(true)}
            >
              Change Mode
            </button>
            <button
              type="button"
              style={{
                fontSize: '0.98rem',
                fontWeight: 800,
                padding: '12px 26px',
                borderRadius: '12px',
                border: 'none',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                boxShadow: '0 6px 18px rgba(217, 119, 6, 0.35)',
                cursor: 'pointer',
                fontFamily: 'inherit',
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

  // ── TOP HUD (Matches Outline Guesser Vintage Parchment Theme) ─────────
  const TopHUD = (
    <div style={{
      position: 'fixed',
      top: isDesktop ? 24 : 14,
      left: isMobile ? 12 : 30,
      right: isMobile ? 12 : 30,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.8rem',
      maxWidth: '1220px',
      margin: '0 auto',
      pointerEvents: 'none'
    }}>
      <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center', pointerEvents: 'auto' }}>
        <div style={hudPillStyle}>
          <span style={{ color: '#7c6146', textTransform: 'uppercase', fontSize: '0.68rem', letterSpacing: '0.06em' }}>
            Round
          </span>
          <span style={{ color: '#111827' }}>{round} / {maxRounds}</span>
        </div>
        <div style={hudPillStyle}>
          <span style={{ color: '#7c6146', textTransform: 'uppercase', fontSize: '0.68rem', letterSpacing: '0.06em' }}>
            Score
          </span>
          <span style={{ color: '#059669' }}>{score.toLocaleString()}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center', pointerEvents: 'auto' }}>
        {/* Difficulty Badge (Clickable to switch mode) */}
        <button
          type="button"
          onClick={() => setShowDiffModal(true)}
          style={{
            background: 'rgba(254, 250, 243, 0.94)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: `1px solid ${diffBadgeBorder}`,
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(60, 37, 20, 0.1)',
            padding: isMobile ? '0.4rem 0.78rem' : '0.45rem 0.95rem',
            color: diffBadgeColor,
            fontWeight: 800,
            fontSize: isMobile ? '0.75rem' : '0.84rem',
            letterSpacing: '0.06em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'inherit',
          }}
          title="Click to switch difficulty"
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: diffBadgeColor }}></span>
          <span>{difficulty}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <button
          type="button"
          style={{
            padding: isMobile ? '0.4rem 0.85rem' : '0.45rem 1rem',
            fontSize: isMobile ? '0.78rem' : '0.86rem',
            fontWeight: 800,
            borderRadius: '10px',
            background: '#dc2626',
            color: '#ffffff',
            border: '1px solid #b91c1c',
            boxShadow: '0 3px 10px rgba(185, 28, 28, 0.25)',
            cursor: 'pointer',
            fontFamily: 'inherit',
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
        accuracyRating = { text: 'Direct Hit!', color: '#059669' };
      } else if (distanceKm <= 750) {
        accuracyRating = { text: 'Very Close!', color: '#10b981' };
      } else if (distanceKm <= 2000) {
        accuracyRating = { text: 'Regional Proximity', color: '#d97706' };
      } else {
        accuracyRating = { text: 'Off Target', color: '#dc2626' };
      }
    }

    return (
      <div className="google-anno-skip" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', fontFamily: '"Outfit", system-ui, -apple-system, sans-serif' }}>
        {TopHUD}

        {/* 1. Full-Screen World Map as the Main Stage */}
        <FlagPinMap
          userPin={userPin}
          onPinSelect={setUserPin}
          targetLocation={target}
          isResultMode={roundState === 'RESULT'}
          isFullScreen={true}
        />

        {/* 2. Floating Target Flag Widget (Vintage Parchment Theme) */}
        <div style={{
          position: 'fixed',
          bottom: isMobile ? '16px' : '24px',
          right: isMobile ? '16px' : '24px',
          zIndex: 40,
          background: 'rgba(254, 250, 243, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1.5px solid rgba(160, 125, 85, 0.4)',
          borderRadius: '20px',
          padding: isMobile ? '10px' : '14px',
          boxShadow: '0 16px 40px rgba(60, 37, 20, 0.22)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          maxWidth: isMobile ? '220px' : '320px',
          transition: 'transform 0.2s ease'
        }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#7c6146',
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

          <div style={{
            background: '#ffffff',
            padding: '6px',
            borderRadius: '10px',
            border: '1px solid rgba(160, 125, 85, 0.28)',
            boxShadow: '0 4px 14px rgba(60, 37, 20, 0.12)',
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

          {roundState === 'PLAYING' && (
            <button
              type="button"
              onClick={handleMapGuess}
              disabled={!userPin}
              style={{
                width: '100%',
                padding: isMobile ? '10px 14px' : '12px 18px',
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: 800,
                borderRadius: '12px',
                letterSpacing: '0.5px',
                background: userPin
                  ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                  : 'rgba(160, 125, 85, 0.14)',
                color: userPin ? '#ffffff' : '#7c6146',
                border: userPin ? 'none' : '1px solid rgba(160, 125, 85, 0.25)',
                boxShadow: userPin ? '0 4px 16px rgba(217, 119, 6, 0.35)' : 'none',
                cursor: userPin ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
              }}
            >
              {userPin ? 'MAKE GUESS' : 'Drop a pin on map'}
            </button>
          )}
        </div>

        {/* 3. Post-Guess Floating Result Banner */}
        {roundState === 'RESULT' && distanceKm !== null && (
          <div style={{
            position: 'fixed',
            bottom: isMobile ? '16px' : '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 60,
            width: '90%',
            maxWidth: '680px',
            background: 'rgba(254, 250, 243, 0.96)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1.5px solid rgba(160, 125, 85, 0.4)',
            borderRadius: '20px',
            padding: isMobile ? '1rem' : '1.15rem 1.8rem',
            boxShadow: '0 20px 50px rgba(60, 37, 20, 0.25)',
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
                style={{ width: '48px', height: 'auto', borderRadius: '4px', border: '1px solid rgba(27, 18, 12, 0.2)' }}
              />
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#111827' }}>
                  {target?.name}
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.85rem' }}>
                  <span style={{ color: accuracyRating?.color, fontWeight: 800 }}>
                    {accuracyRating?.text}
                  </span>
                  <span style={{ color: '#9ca3af' }}>·</span>
                  <span style={{ color: '#5c4632', fontWeight: 700 }}>
                    {distanceKm.toLocaleString()} km
                  </span>
                  <span style={{ color: '#9ca3af' }}>·</span>
                  <span style={{ color: '#059669', fontWeight: 800 }}>
                    +{roundScore.toLocaleString()} pts
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              style={{
                padding: isMobile ? '10px 20px' : '11px 24px',
                fontSize: isMobile ? '0.95rem' : '1rem',
                fontWeight: 800,
                border: 'none',
                borderRadius: '12px',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                boxShadow: '0 4px 16px rgba(217, 119, 6, 0.35)',
                flexShrink: 0,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'inherit',
              }}
              onClick={handleNext}
            >
              <span>{round < maxRounds ? 'Next Round' : 'View Final Score'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        )}

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

  // ── SCENARIO B: MULTIPLE CHOICE ROUND (Same Center Box Dimensions & Layout, Vintage Parchment Theme)
  return (
    <div
      className="google-anno-skip"
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100dvh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '5.5rem 1rem 2.5rem' : '5rem 1.5rem 2.5rem',
        background: '#f6efe2',
        fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
        color: '#1b120c',
        boxSizing: 'border-box',
      }}
    >
      <AntiqueCompassBackground mode="fixed" enableParallax={true} />
      <CartographicTableOverlay isDesktop={isDesktop} />

      <style>{`
        .flag-option-btn {
          transition: transform 0.14s ease, border-color 0.14s ease, background 0.14s ease, box-shadow 0.14s ease;
        }
        .flag-option-btn:hover:not(:disabled) {
          border-color: #d97706 !important;
          background: #fffbeb !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(180, 83, 9, 0.14) !important;
        }
      `}</style>

      {TopHUD}

      {/* Main Choice Card (Center box layout & proportions kept identical, vintage theme applied) */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: isMobile ? '1.8rem 1.2rem' : '2.5rem 3rem',
          width: '100%',
          maxWidth: '740px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'rgba(254, 250, 243, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1.5px solid rgba(160, 125, 85, 0.38)',
          borderRadius: '22px',
          boxShadow: '0 22px 55px rgba(60, 37, 20, 0.16), 0 4px 14px rgba(60, 37, 20, 0.08)',
          animation: 'fade-in 0.3s ease',
          boxSizing: 'border-box',
        }}
      >
        {/* Round Mode Pill Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '0.8rem',
            padding: '4px 14px',
            borderRadius: '20px',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            fontSize: '0.8rem',
            fontWeight: 800,
            color: '#059669',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>Multiple Choice Round</span>
        </div>

        <h2
          style={{
            fontSize: isMobile ? '1.3rem' : '1.8rem',
            marginTop: 0,
            marginBottom: '1.4rem',
            textAlign: 'center',
            lineHeight: 1.3,
            fontWeight: 900,
            color: '#111827',
            letterSpacing: '-0.02em',
          }}
        >
          Which country does this flag belong to?
        </h2>

        {/* Flag Card */}
        <div
          style={{
            marginBottom: isMobile ? '1.5rem' : '2.2rem',
            background: '#ffffff',
            padding: '8px',
            borderRadius: '14px',
            border: '1.5px solid rgba(160, 125, 85, 0.32)',
            boxShadow: '0 10px 28px rgba(60, 37, 20, 0.14)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            src={`https://flagcdn.com/w320/${target?.iso}.png`}
            alt="Flag"
            style={{
              display: 'block',
              maxWidth: '100%',
              height: 'auto',
              maxHeight: isMobile ? '140px' : '210px',
              borderRadius: '6px'
            }}
          />
        </div>

        {/* 4 Choices Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '0.75rem' : '1rem',
            width: '100%'
          }}
        >
          {options.map((option, idx) => {
            let btnStyle = {
              padding: isMobile ? '0.9rem 1rem' : '1.15rem',
              fontSize: isMobile ? '1rem' : '1.12rem',
              minHeight: isMobile ? '52px' : '60px',
              fontWeight: 700,
              borderRadius: '12px',
              border: '1.5px solid rgba(160, 125, 85, 0.32)',
              background: '#ffffff',
              color: '#1b120c',
              boxShadow: '0 2px 6px rgba(60, 37, 20, 0.05)',
              cursor: roundState === 'PLAYING' ? 'pointer' : 'default',
              fontFamily: 'inherit',
            };

            if (roundState === 'RESULT') {
              if (option.iso === target.iso) {
                btnStyle.background = '#059669';
                btnStyle.borderColor = '#047857';
                btnStyle.color = '#ffffff';
                btnStyle.boxShadow = '0 4px 16px rgba(5, 150, 105, 0.38)';
              } else if (userGuess && userGuess.iso === option.iso) {
                btnStyle.background = '#dc2626';
                btnStyle.borderColor = '#b91c1c';
                btnStyle.color = '#ffffff';
              } else {
                btnStyle.opacity = 0.48;
              }
            }

            return (
              <button
                key={idx}
                type="button"
                className={roundState === 'PLAYING' ? 'flag-option-btn' : undefined}
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
          <div style={{ marginTop: '1.8rem', animation: 'fade-in 0.3s ease', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button
              type="button"
              style={{
                padding: isMobile ? '0.9rem 2rem' : '0.95rem 3.2rem',
                fontSize: isMobile ? '1.05rem' : '1.15rem',
                fontWeight: 800,
                borderRadius: '12px',
                border: 'none',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                boxShadow: '0 6px 18px rgba(217, 119, 6, 0.35)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'inherit',
              }}
              onClick={handleNext}
            >
              <span>{round < maxRounds ? 'Next Round' : 'View Final Score'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
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

// Reusable Difficulty Selector Modal for Flag Guesser (Vintage Parchment Theme)
function DifficultySelectModal({ currentDifficulty, onSelect, onClose }) {
  const modes = [
    {
      id: 'EASY',
      name: 'Easy',
      color: '#059669',
      bg: '#ecfdf5',
      border: '#a7f3d0',
      badge: 'Multiple Choice',
      desc: 'Pick from 4 options every round. Perfect for beginners and flag enthusiasts.'
    },
    {
      id: 'MEDIUM',
      name: 'Medium',
      color: '#d97706',
      bg: '#fef3c7',
      border: '#fde68a',
      badge: 'Mixed Gameplay',
      desc: 'Alternates between 4 multiple-choice options and locating the country on the full-screen world map.'
    },
    {
      id: 'HARD',
      name: 'Hard',
      color: '#dc2626',
      bg: '#fef2f2',
      border: '#fecaca',
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
      background: 'rgba(27, 18, 12, 0.55)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        maxWidth: '540px',
        width: '100%',
        padding: '2rem',
        borderRadius: '22px',
        background: 'rgba(254, 250, 243, 0.98)',
        border: '1.5px solid rgba(160, 125, 85, 0.4)',
        boxShadow: '0 24px 60px rgba(27, 18, 12, 0.28)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#111827', margin: 0 }}>Select Difficulty</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close difficulty selector"
            style={{
              background: 'none',
              border: 'none',
              color: '#7c6146',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.4rem' }}>
          {modes.map((m) => {
            const isSelected = currentDifficulty === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelect(m.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '1.1rem 1.2rem',
                  borderRadius: '14px',
                  background: isSelected ? m.bg : '#ffffff',
                  border: isSelected ? `2px solid ${m.color}` : '1.5px solid rgba(160, 125, 85, 0.3)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  color: '#1b120c',
                  position: 'relative',
                  fontFamily: 'inherit',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '1.18rem', fontWeight: 800, color: m.color }}>
                    {m.name}
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '3px 9px',
                    borderRadius: '12px',
                    background: m.bg,
                    border: `1px solid ${m.border}`,
                    color: m.color,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                  }}>
                    {m.badge}
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#5c4632', margin: 0, lineHeight: 1.45 }}>
                  {m.desc}
                </p>
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            style={{
              padding: '0.6rem 2rem',
              fontSize: '0.92rem',
              fontWeight: 700,
              borderRadius: '10px',
              background: '#ffffff',
              color: '#3c2514',
              border: '1px solid rgba(160, 125, 85, 0.35)',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
