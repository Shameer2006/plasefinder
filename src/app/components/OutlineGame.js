'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import CountrySilhouette from './CountrySilhouette';
import CoinIcon from './CoinIcon';
import AntiqueCompassBackground from './AntiqueCompassBackground';
import { sounds } from '@/lib/sounds';
import { useGameStore } from '@/lib/store';

const TOTAL_ROUNDS = 5;
const ROUND_TIME_SECONDS = 15;

function FlagThumbnail({ code, width = 22, height = 15 }) {
  if (!code || code.length !== 2) return null;
  return (
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      alt={`${code} flag`}
      width={width}
      height={height}
      style={{
        display: 'inline-block',
        objectFit: 'cover',
        borderRadius: '3px',
        border: '1px solid rgba(27, 18, 12, 0.18)',
        flexShrink: 0,
      }}
    />
  );
}

/**
 * Subtle engraved outer chart border & compass rose watermark on the parchment table
 * so large widescreen viewports feel like an authentic cartographer's workspace.
 */
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
      {/* Subtle Compass Rose Watermark in bottom-right corner */}
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

      {/* Bottom-left coordinate watermark */}
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
        LOSTSTREET · CARTOGRAPHIC ARCHIVE · 166 SOVEREIGN OUTLINES
      </div>
    </div>
  );
}

export default function OutlineGame({ onReturnToMenu }) {
  const { coins = 50, addCoins, deductCoins, soundEnabled, platformPaused } = useGameStore();

  const [outlinesData, setOutlinesData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Round State
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [target, setTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [roundState, setRoundState] = useState('LOADING'); // 'LOADING' | 'PLAYING' | 'RESULT' | 'FINISHED'
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME_SECONDS);
  const [usedCodes, setUsedCodes] = useState([]);
  const [roundHistory, setRoundHistory] = useState([]); // Array of boolean results per round

  // Lifelines
  const [revealedContinent, setRevealedContinent] = useState(false);
  const [revealedFlag, setRevealedFlag] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState([]);

  // Stats
  const [correctCount, setCorrectCount] = useState(0);

  // Viewport sizing state
  const [viewportWidth, setViewportWidth] = useState(1200);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportWidth <= 640;
  const isDesktop = viewportWidth >= 900;

  // Build round choices from loaded outline dictionary
  const startRoundFromData = useCallback((data, nextRoundNum, currentUsed = []) => {
    if (!data) return;
    const keys = Object.keys(data);
    if (keys.length < 4) return;

    let availableKeys = keys.filter((k) => !currentUsed.includes(k));
    if (availableKeys.length < 4) {
      availableKeys = keys;
      currentUsed = [];
    }

    const targetCode = availableKeys[Math.floor(Math.random() * availableKeys.length)];
    const targetCountry = data[targetCode];

    const sameContinent = keys.filter(
      (k) => k !== targetCode && data[k].continent === targetCountry.continent
    );
    const otherContinent = keys.filter(
      (k) => k !== targetCode && data[k].continent !== targetCountry.continent
    );

    const distractors = [];
    while (sameContinent.length > 0 && distractors.length < 2) {
      const idx = Math.floor(Math.random() * sameContinent.length);
      distractors.push(sameContinent.splice(idx, 1)[0]);
    }
    const remainingPool = [...sameContinent, ...otherContinent];
    while (distractors.length < 3 && remainingPool.length > 0) {
      const idx = Math.floor(Math.random() * remainingPool.length);
      const code = remainingPool.splice(idx, 1)[0];
      if (!distractors.includes(code)) distractors.push(code);
    }

    const allChoices = [targetCode, ...distractors]
      .map((code) => data[code])
      .sort(() => 0.5 - Math.random());

    setTarget(targetCountry);
    setOptions(allChoices);
    setSelectedOption(null);
    setRoundScore(0);
    setRevealedContinent(false);
    setRevealedFlag(false);
    setEliminatedOptions([]);
    setTimeLeft(ROUND_TIME_SECONDS);
    setUsedCodes([...currentUsed, targetCode]);
    setRound(nextRoundNum);
    setRoundState('PLAYING');
  }, []);

  const startRound = useCallback(
    (nextRoundNum, currentUsed = usedCodes) => {
      startRoundFromData(outlinesData, nextRoundNum, currentUsed);
    },
    [outlinesData, usedCodes, startRoundFromData]
  );

  // Load country outlines database and initialize round 1
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const res = await fetch('/country-outlines.json');
        if (!res.ok) throw new Error('Failed to load outlines');
        const data = await res.json();
        if (isMounted) {
          setOutlinesData(data);
          setLoading(false);
          startRoundFromData(data, 1, []);
        }
      } catch (err) {
        console.error('Error loading country outlines:', err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [startRoundFromData]);

  // Handle time running out
  const handleTimeOut = useCallback(() => {
    setRoundState('RESULT');
    setSelectedOption('TIMEOUT');
    setStreak(0);
    setRoundHistory((prev) => [...prev, false]);
    try {
      sounds.playTimeout();
    } catch {}
  }, []);

  // Round countdown timer (pauses automatically when platform/tab pauses the game)
  useEffect(() => {
    if (roundState !== 'PLAYING' || platformPaused) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        if (prev <= 4 && soundEnabled) {
          try {
            sounds.playTick();
          } catch {}
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [roundState, platformPaused, soundEnabled, handleTimeOut]);

  // Handle player selecting an option
  const handleSelectOption = useCallback(
    (code) => {
      if (roundState !== 'PLAYING' || !target) return;
      clearInterval(timerRef.current);
      setSelectedOption(code);
      setRoundState('RESULT');

      const isCorrect = code === target.code;
      setRoundHistory((prev) => [...prev, isCorrect]);

      if (isCorrect) {
        const timeBonus = timeLeft * 20;
        const streakBonus = streak * 50;
        const points = 1000 + timeBonus + streakBonus;
        setRoundScore(points);
        setScore((prev) => prev + points);
        setStreak((prev) => prev + 1);
        setCorrectCount((prev) => prev + 1);
        if (typeof addCoins === 'function') addCoins(5, 'outline_guess_correct');
        try {
          sounds.playCorrect();
        } catch {}
      } else {
        setRoundScore(0);
        setStreak(0);
        try {
          sounds.playWrong();
        } catch {}
      }
    },
    [roundState, target, timeLeft, streak, addCoins]
  );

  // Advance to next round or finish
  const handleNextRound = useCallback(() => {
    if (round >= TOTAL_ROUNDS) {
      setRoundState('FINISHED');
      try {
        if (correctCount >= 3) {
          sounds.playLevelUp();
        } else {
          sounds.playScoreReveal();
        }
      } catch {}
    } else {
      startRound(round + 1, usedCodes);
    }
  }, [round, correctCount, usedCodes, startRound]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (roundState === 'PLAYING') {
        const key = e.key;
        let index = -1;
        if (key === '1' || key.toLowerCase() === 'a') index = 0;
        if (key === '2' || key.toLowerCase() === 'b') index = 1;
        if (key === '3' || key.toLowerCase() === 'c') index = 2;
        if (key === '4' || key.toLowerCase() === 'd') index = 3;
        if (index >= 0 && index < options.length) {
          const opt = options[index];
          if (!eliminatedOptions.includes(opt.code)) handleSelectOption(opt.code);
        }
      } else if (roundState === 'RESULT') {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleNextRound();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [roundState, options, eliminatedOptions, handleSelectOption, handleNextRound]);

  // Lifelines Actions
  const useContinentHint = () => {
    if (revealedContinent || roundState !== 'PLAYING' || coins < 10) return;
    if (typeof deductCoins === 'function') deductCoins(10);
    setRevealedContinent(true);
    try {
      sounds.playPhoneOpen();
    } catch {}
  };

  const useFlagHint = () => {
    if (revealedFlag || roundState !== 'PLAYING' || coins < 15) return;
    if (typeof deductCoins === 'function') deductCoins(15);
    setRevealedFlag(true);
    try {
      sounds.playPhoneOpen();
    } catch {}
  };

  const useFiftyFifty = () => {
    if (eliminatedOptions.length > 0 || roundState !== 'PLAYING' || coins < 20) return;
    if (typeof deductCoins === 'function') deductCoins(20);
    const wrongOptions = options.filter((o) => o.code !== target.code);
    setEliminatedOptions(wrongOptions.slice(0, 2).map((o) => o.code));
    try {
      sounds.playClick();
    } catch {}
  };

  const handleRestart = () => {
    setRound(1);
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setRoundHistory([]);
    setUsedCodes([]);
    startRound(1, []);
  };

  const hudPillStyle = {
    background: 'rgba(254, 250, 243, 0.94)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(160, 125, 85, 0.35)',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(60, 37, 20, 0.1)',
    padding: isMobile ? '0.38rem 0.75rem' : '0.45rem 0.95rem',
    fontWeight: 800,
    fontSize: isMobile ? '0.78rem' : '0.88rem',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#1b120c',
  };

  // ── LOADING STATE (Instant Folio Shell Skeleton for fast LCP) ────────────────
  if (loading || !target) {
    return (
      <div
        className="google-anno-skip"
        style={{
          position: 'relative',
          width: '100%',
          height: '100dvh',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '4rem 0.75rem 0.85rem' : '4.25rem 2rem 1.5rem',
          background: '#f6efe2',
          color: '#1b120c',
          fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
          boxSizing: 'border-box',
        }}
      >
        <AntiqueCompassBackground mode="fixed" enableParallax={false} />
        <CartographicTableOverlay isDesktop={isDesktop} />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            padding: isMobile ? '1rem 0.9rem' : isDesktop ? '1.85rem 2.2rem' : '1.35rem 1.75rem',
            width: '100%',
            maxWidth: isDesktop ? '1060px' : '680px',
            display: 'grid',
            gridTemplateColumns: isDesktop ? '1.15fr 1fr' : '1fr',
            gap: isDesktop ? '2.1rem' : '0.85rem',
            alignItems: 'stretch',
            background: 'rgba(254, 250, 243, 0.95)',
            border: '1.5px solid rgba(160, 125, 85, 0.38)',
            borderRadius: isDesktop ? '26px' : '22px',
            boxShadow: '0 24px 60px rgba(60, 37, 20, 0.16), 0 6px 18px rgba(60, 37, 20, 0.08)',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: isDesktop ? 'clamp(340px, 52dvh, 450px)' : `${isMobile ? 145 : 195}px`,
              borderRadius: '16px',
              background: 'radial-gradient(circle at 50% 45%, #fcf9f2 0%, #ede0c8 100%)',
              border: '1.5px solid rgba(139, 98, 57, 0.35)',
              color: '#7c6146',
              fontWeight: 700,
              fontSize: '0.95rem',
            }}
          >
            Loading Atlas Outlines...
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.85rem' }}>
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '0.55rem',
                  padding: '4px 12px',
                  borderRadius: '30px',
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#059669',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Country Outline Quiz
              </div>
              <h2
                style={{
                  fontSize: isMobile ? '1.15rem' : isDesktop ? '1.65rem' : '1.35rem',
                  margin: '0 0 0.55rem',
                  textAlign: isDesktop ? 'left' : 'center',
                  lineHeight: 1.2,
                  fontWeight: 900,
                  color: '#111827',
                  letterSpacing: '-0.02em',
                }}
              >
                Which country does this outline belong to?
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr' : isMobile ? '1fr' : '1fr 1fr', gap: '0.6rem' }}>
              {['A', 'B', 'C', 'D'].map((letter) => (
                <div
                  key={letter}
                  style={{
                    padding: isDesktop ? '0.78rem 1.05rem' : '0.58rem 0.9rem',
                    minHeight: isDesktop ? '50px' : '44px',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(160, 125, 85, 0.25)',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '11px',
                    boxSizing: 'border-box',
                    opacity: 0.7,
                  }}
                >
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '26px', height: '26px', borderRadius: '7px', background: '#f4ebd9',
                    fontSize: '0.78rem', fontWeight: 800, color: '#5c4632',
                  }}>{letter}</span>
                  <span style={{ width: '48%', height: '12px', borderRadius: '6px', background: '#efe4d0' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── FINISHED STATE MODAL ────────────────────────────────────────────────────
  if (roundState === 'FINISHED') {
    const accuracy = Math.round((correctCount / TOTAL_ROUNDS) * 100);

    return (
      <div
        className="google-anno-skip"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '1.5rem 1rem' : '2rem',
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
            maxWidth: '520px',
            width: '100%',
            padding: isMobile ? '1.8rem 1.25rem' : '2.4rem 2.6rem',
            textAlign: 'center',
            background: 'rgba(254, 250, 243, 0.96)',
            border: '1.5px solid rgba(160, 125, 85, 0.38)',
            borderRadius: '22px',
            boxShadow: '0 22px 55px rgba(60, 37, 20, 0.16), 0 4px 12px rgba(60, 37, 20, 0.08)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 14px',
              borderRadius: '50%',
              background: correctCount >= 3 ? '#ecfdf5' : '#fef3c7',
              border: `1.5px solid ${correctCount >= 3 ? '#a7f3d0' : '#fde68a'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: correctCount >= 3 ? '#059669' : '#b45309',
            }}
          >
            {correctCount >= 3 ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            )}
          </div>

          <h2
            style={{
              fontSize: isMobile ? '1.55rem' : '1.9rem',
              fontWeight: 900,
              margin: '0 0 6px',
              color: '#111827',
              letterSpacing: '-0.02em',
            }}
          >
            Expedition Complete
          </h2>
          <p style={{ color: '#5c4632', fontSize: '0.96rem', margin: '0 0 1.5rem' }}>
            You identified <strong style={{ color: '#111827' }}>{correctCount}</strong> of{' '}
            <strong style={{ color: '#111827' }}>{TOTAL_ROUNDS}</strong> country outlines accurately.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '1.75rem',
            }}
          >
            <div
              style={{
                background: '#ffffff',
                border: '1px solid rgba(160, 125, 85, 0.28)',
                borderRadius: '14px',
                padding: '14px 10px',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#7c6146',
                  marginBottom: '4px',
                  fontWeight: 800,
                }}
              >
                Total Score
              </span>
              <span style={{ fontSize: '1.7rem', fontWeight: 900, color: '#059669' }}>
                {score.toLocaleString()}
              </span>
            </div>

            <div
              style={{
                background: '#ffffff',
                border: '1px solid rgba(160, 125, 85, 0.28)',
                borderRadius: '14px',
                padding: '14px 10px',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#7c6146',
                  marginBottom: '4px',
                  fontWeight: 800,
                }}
              >
                Accuracy
              </span>
              <span style={{ fontSize: '1.7rem', fontWeight: 900, color: '#b45309' }}>
                {accuracy}%
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              type="button"
              onClick={handleRestart}
              style={{
                width: '100%',
                padding: '13px',
                fontSize: '0.98rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#ffffff',
                border: 'none',
                boxShadow: '0 6px 18px rgba(217, 119, 6, 0.35)',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'inherit',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>Play Again</span>
            </button>

            {onReturnToMenu ? (
              <button
                type="button"
                onClick={onReturnToMenu}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  background: '#ffffff',
                  color: '#3c2514',
                  border: '1px solid rgba(160, 125, 85, 0.35)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Back to Main Menu
              </button>
            ) : (
              <Link
                href="/"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  background: '#ffffff',
                  color: '#3c2514',
                  border: '1px solid rgba(160, 125, 85, 0.35)',
                  textDecoration: 'none',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                }}
              >
                Back to Home
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── ACTIVE GAME STATE ───────────────────────────────────────────────────────
  const silhouetteStatus =
    roundState === 'RESULT'
      ? selectedOption === target.code
        ? 'CORRECT'
        : 'WRONG'
      : 'NORMAL';

  const timerPct = (timeLeft / ROUND_TIME_SECONDS) * 100;
  const timerColor = timeLeft <= 4 ? '#dc2626' : timeLeft <= 7 ? '#d97706' : '#059669';

  return (
    <div
      className="google-anno-skip"
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        minHeight: '100dvh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '4rem 0.75rem 0.85rem' : '4.25rem 2rem 1.5rem',
        background: '#f6efe2',
        fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
        color: '#1b120c',
        boxSizing: 'border-box',
      }}
    >
      <AntiqueCompassBackground mode="fixed" enableParallax={true} />
      <CartographicTableOverlay isDesktop={isDesktop} />

      <style>{`
        .outline-option-btn {
          transition: transform 0.14s ease, border-color 0.14s ease, background 0.14s ease, box-shadow 0.14s ease;
        }
        .outline-option-btn:hover:not(:disabled) {
          border-color: #d97706 !important;
          background: #fffbeb !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(180, 83, 9, 0.14) !important;
        }
        .outline-lifeline-btn {
          transition: transform 0.14s ease, box-shadow 0.14s ease, border-color 0.14s ease;
        }
        .outline-lifeline-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 3px 10px rgba(60, 37, 20, 0.12);
        }
      `}</style>

      {/* ── TOP HUD ────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          top: isDesktop ? 24 : 14,
          left: isMobile ? 12 : 30,
          right: isMobile ? 12 : 30,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          maxWidth: '1220px',
          margin: '0 auto',
          pointerEvents: 'none',
        }}
      >
        {/* Left: Round, Score, Streak */}
        <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center', pointerEvents: 'auto' }}>
          <div style={hudPillStyle}>
            <span style={{ color: '#7c6146', textTransform: 'uppercase', fontSize: '0.68rem', letterSpacing: '0.06em' }}>
              Round
            </span>
            <span style={{ color: '#111827' }}>
              {round} / {TOTAL_ROUNDS}
            </span>
          </div>

          <div style={hudPillStyle}>
            <span style={{ color: '#7c6146', textTransform: 'uppercase', fontSize: '0.68rem', letterSpacing: '0.06em' }}>
              Score
            </span>
            <span style={{ color: '#059669' }}>{score.toLocaleString()}</span>
          </div>

          {streak > 1 && (
            <div
              style={{
                ...hudPillStyle,
                background: '#fef3c7',
                border: '1px solid #f59e0b',
                color: '#b45309',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span>{streak}x Streak</span>
            </div>
          )}
        </div>

        {/* Right: Coins & Quit Button */}
        <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center', pointerEvents: 'auto' }}>
          <div style={{ ...hudPillStyle, color: '#b45309' }}>
            <CoinIcon size={15} />
            <span>{coins}</span>
          </div>

          {onReturnToMenu ? (
            <button
              type="button"
              onClick={onReturnToMenu}
              style={{
                padding: isMobile ? '0.38rem 0.85rem' : '0.45rem 1rem',
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
            >
              Quit
            </button>
          ) : (
            <Link
              href="/"
              style={{
                padding: isMobile ? '0.38rem 0.85rem' : '0.45rem 1rem',
                fontSize: isMobile ? '0.78rem' : '0.86rem',
                fontWeight: 800,
                borderRadius: '10px',
                background: '#dc2626',
                color: '#ffffff',
                border: '1px solid #b91c1c',
                boxShadow: '0 3px 10px rgba(185, 28, 28, 0.25)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Quit
            </Link>
          )}
        </div>
      </div>

      {/* ── MAIN EXPEDITION FOLIO (2-Col on Desktop, Balanced Centered Stack on Mobile) ── */}
      {(() => {
        const specimenPlateBlock = (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              minHeight: isDesktop ? 'clamp(340px, 52dvh, 450px)' : undefined,
              height: isDesktop ? '100%' : isMobile ? '168px' : '220px',
            }}
          >
            <CountrySilhouette
              path={target.d}
              viewBox={target.viewBox}
              countryName={target.name}
              status={silhouetteStatus}
              revealed={roundState === 'RESULT'}
              fluid={true}
              size={isMobile ? 168 : isDesktop ? 340 : 220}
              plateLabel={`PLATE 0${round}`}
              revealedContinent={revealedContinent ? target.continent : null}
              revealedFlagCode={revealedFlag ? target.code : null}
            />
          </div>
        );

        const headerBlock = (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isDesktop ? 'space-between' : 'center',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: isMobile ? '0.4rem' : '0.55rem',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '30px',
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#059669',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>Country Outline Quiz</span>
              </div>

              {/* 5-Round Tracker Dots */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }} aria-label={`Round ${round} of ${TOTAL_ROUNDS}`}>
                {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => {
                  const pastResult = roundHistory[i];
                  const isCurrent = i + 1 === round && roundState !== 'RESULT';
                  let bg = 'rgba(160, 125, 85, 0.22)';
                  let border = 'transparent';
                  if (pastResult === true) {
                    bg = '#059669';
                  } else if (pastResult === false) {
                    bg = '#dc2626';
                  } else if (isCurrent) {
                    bg = '#f59e0b';
                    border = 'rgba(180, 83, 9, 0.35)';
                  }
                  return (
                    <span
                      key={i}
                      style={{
                        width: isCurrent ? '18px' : '8px',
                        height: '8px',
                        borderRadius: '99px',
                        background: bg,
                        border: `1px solid ${border}`,
                        transition: 'all 0.25s ease',
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <h2
              style={{
                fontSize: isMobile ? '1.12rem' : isDesktop ? '1.65rem' : '1.35rem',
                margin: isMobile ? '0 0 0.4rem' : '0 0 0.55rem',
                textAlign: isDesktop ? 'left' : 'center',
                lineHeight: 1.2,
                fontWeight: 900,
                color: '#111827',
                letterSpacing: '-0.02em',
              }}
            >
              Which country does this outline belong to?
            </h2>

            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: '6px',
                  background: '#e7dcc8',
                  borderRadius: '99px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${timerPct}%`,
                    background: timerColor,
                    borderRadius: '99px',
                    transition: 'width 1s linear, background 0.4s ease',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: timeLeft <= 4 ? '#dc2626' : '#7c6146',
                  minWidth: '28px',
                  textAlign: 'right',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {timeLeft}s
              </span>
            </div>
          </div>
        );

        const lifelinesBlock = roundState === 'PLAYING' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isDesktop ? 'flex-start' : 'center',
              gap: isMobile ? '5px' : '8px',
              flexWrap: isMobile ? 'nowrap' : 'wrap',
              width: '100%',
            }}
          >
            {/* Continent Hint */}
            <button
              type="button"
              className="outline-lifeline-btn"
              onClick={useContinentHint}
              disabled={revealedContinent || coins < 10}
              title="Reveal country's continent for 10 coins"
              style={{
                padding: isMobile ? '5px 7px' : '6px 11px',
                fontSize: isMobile ? '0.7rem' : '0.78rem',
                fontWeight: 700,
                borderRadius: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isMobile ? '4px' : '6px',
                flex: isMobile ? '1 1 0' : undefined,
                color: revealedContinent ? '#9ca3af' : '#1e40af',
                border: revealedContinent ? '1px solid #e5e7eb' : '1px solid #bfdbfe',
                background: revealedContinent ? '#f9fafb' : '#ffffff',
                opacity: revealedContinent ? 0.5 : coins < 10 ? 0.55 : 1,
                cursor: revealedContinent || coins < 10 ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? '11' : '13'} height={isMobile ? '11' : '13'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
              <span>Continent</span>
              <span
                style={{
                  fontSize: isMobile ? '0.66rem' : '0.7rem',
                  background: '#fef3c7',
                  padding: '1px 5px',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontWeight: 800,
                  color: '#b45309',
                }}
              >
                10 <CoinIcon size={isMobile ? 10 : 11} />
              </span>
            </button>

            {/* Flag Clue */}
            <button
              type="button"
              className="outline-lifeline-btn"
              onClick={useFlagHint}
              disabled={revealedFlag || coins < 15}
              title="Reveal country's flag for 15 coins"
              style={{
                padding: isMobile ? '5px 7px' : '6px 11px',
                fontSize: isMobile ? '0.7rem' : '0.78rem',
                fontWeight: 700,
                borderRadius: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isMobile ? '4px' : '6px',
                flex: isMobile ? '1 1 0' : undefined,
                color: revealedFlag ? '#9ca3af' : '#92400e',
                border: revealedFlag ? '1px solid #e5e7eb' : '1px solid #fde68a',
                background: revealedFlag ? '#f9fafb' : '#ffffff',
                opacity: revealedFlag ? 0.5 : coins < 15 ? 0.55 : 1,
                cursor: revealedFlag || coins < 15 ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? '11' : '13'} height={isMobile ? '11' : '13'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              <span>Flag</span>
              <span
                style={{
                  fontSize: isMobile ? '0.66rem' : '0.7rem',
                  background: '#fef3c7',
                  padding: '1px 5px',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontWeight: 800,
                  color: '#b45309',
                }}
              >
                15 <CoinIcon size={isMobile ? 10 : 11} />
              </span>
            </button>

            {/* 50/50 Eliminator */}
            <button
              type="button"
              className="outline-lifeline-btn"
              onClick={useFiftyFifty}
              disabled={eliminatedOptions.length > 0 || coins < 20}
              title="Eliminates 2 wrong answers for 20 coins"
              style={{
                padding: isMobile ? '5px 7px' : '6px 11px',
                fontSize: isMobile ? '0.7rem' : '0.78rem',
                fontWeight: 700,
                borderRadius: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isMobile ? '4px' : '6px',
                flex: isMobile ? '1 1 0' : undefined,
                color: eliminatedOptions.length > 0 ? '#9ca3af' : '#0f766e',
                border: eliminatedOptions.length > 0 ? '1px solid #e5e7eb' : '1px solid #99f6e4',
                background: eliminatedOptions.length > 0 ? '#f9fafb' : '#ffffff',
                opacity: eliminatedOptions.length > 0 ? 0.5 : coins < 20 ? 0.55 : 1,
                cursor: eliminatedOptions.length > 0 || coins < 20 ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? '11' : '13'} height={isMobile ? '11' : '13'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <line x1="20" y1="4" x2="8.12" y2="15.88" />
                <line x1="14.47" y1="14.48" x2="20" y2="20" />
                <line x1="8.12" y1="8.12" x2="12" y2="12" />
              </svg>
              <span>50/50</span>
              <span
                style={{
                  fontSize: isMobile ? '0.66rem' : '0.7rem',
                  background: '#fef3c7',
                  padding: '1px 5px',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontWeight: 800,
                  color: '#b45309',
                }}
              >
                20 <CoinIcon size={isMobile ? 10 : 11} />
              </span>
            </button>
          </div>
        );

        const optionsBlock = (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? '1fr' : isMobile ? '1fr' : '1fr 1fr',
              gap: isDesktop ? '0.6rem' : isMobile ? '0.45rem' : '0.6rem',
              width: '100%',
            }}
          >
            {options.map((option, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              const isEliminated = eliminatedOptions.includes(option.code);
              const isTarget = option.code === target.code;
              const isUserChoice = selectedOption === option.code;

              if (isEliminated) {
                return (
                  <div
                    key={option.code}
                    style={{
                      padding: isDesktop ? '0.78rem 1.05rem' : '0.58rem 0.9rem',
                      minHeight: isDesktop ? '50px' : '44px',
                      borderRadius: '12px',
                      border: '1px dashed rgba(160, 125, 85, 0.3)',
                      background: 'rgba(240, 230, 215, 0.45)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.55,
                      boxSizing: 'border-box',
                    }}
                  >
                    <span style={{ fontSize: '0.82rem', color: '#7c6146', fontWeight: 600 }}>Eliminated</span>
                  </div>
                );
              }

              let btnStyle = {
                padding: isDesktop ? '0.78rem 1.05rem' : '0.58rem 0.9rem',
                fontSize: isDesktop ? '1.02rem' : isMobile ? '0.92rem' : '0.98rem',
                minHeight: isDesktop ? '50px' : '44px',
                fontWeight: 700,
                borderRadius: '12px',
                border: '1.5px solid rgba(160, 125, 85, 0.32)',
                background: '#ffffff',
                color: '#1b120c',
                boxShadow: '0 2px 6px rgba(60, 37, 20, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                width: '100%',
                boxSizing: 'border-box',
                textAlign: 'left',
                cursor: roundState === 'PLAYING' ? 'pointer' : 'default',
                fontFamily: 'inherit',
              };

              let keycapBg = '#f4ebd9';
              let keycapColor = '#5c4632';

              if (roundState === 'RESULT') {
                if (isTarget) {
                  btnStyle.background = '#059669';
                  btnStyle.borderColor = '#047857';
                  btnStyle.color = '#ffffff';
                  btnStyle.boxShadow = '0 4px 14px rgba(5, 150, 105, 0.35)';
                  keycapBg = 'rgba(255,255,255,0.22)';
                  keycapColor = '#ffffff';
                } else if (isUserChoice) {
                  btnStyle.background = '#dc2626';
                  btnStyle.borderColor = '#b91c1c';
                  btnStyle.color = '#ffffff';
                  keycapBg = 'rgba(255,255,255,0.22)';
                  keycapColor = '#ffffff';
                } else {
                  btnStyle.opacity = 0.48;
                }
              }

              return (
                <button
                  key={option.code}
                  type="button"
                  className={roundState === 'PLAYING' ? 'outline-option-btn' : undefined}
                  style={btnStyle}
                  onClick={() => handleSelectOption(option.code)}
                  disabled={roundState !== 'PLAYING'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '11px', overflow: 'hidden' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: isDesktop ? '27px' : '24px',
                        height: isDesktop ? '27px' : '24px',
                        borderRadius: '7px',
                        background: keycapBg,
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: keycapColor,
                        flexShrink: 0,
                      }}
                    >
                      {letter}
                    </span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {option.name}
                    </span>
                  </div>
                  {roundState === 'RESULT' && isTarget && <FlagThumbnail code={option.code} width={24} height={16} />}
                </button>
              );
            })}
          </div>
        );

        const footerBlock = roundState === 'RESULT' ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.65rem',
              background: selectedOption === target.code ? '#ecfdf5' : '#fef2f2',
              border: `1px solid ${selectedOption === target.code ? '#a7f3d0' : '#fecaca'}`,
              borderRadius: '14px',
              padding: '0.6rem 0.95rem',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: isMobile ? '100%' : 'auto' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: selectedOption === target.code ? '#059669' : '#dc2626',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {selectedOption === target.code ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#111827' }}>
                  {selectedOption === target.code
                    ? 'Correct Country'
                    : selectedOption === 'TIMEOUT'
                    ? "Time's Up"
                    : `It's ${target.name}`}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '1px' }}>
                  {selectedOption === target.code
                    ? `+${roundScore.toLocaleString()} pts earned (+5 coins)`
                    : `Located in ${target.continent}.`}
                </div>
              </div>
            </div>

            <button
              type="button"
              style={{
                padding: isMobile ? '0.62rem 1.4rem' : '0.65rem 1.4rem',
                fontSize: '0.9rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#ffffff',
                border: 'none',
                boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)',
                borderRadius: '10px',
                width: isMobile ? '100%' : 'auto',
                flexShrink: 0,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontFamily: 'inherit',
              }}
              onClick={handleNextRound}
            >
              <span>{round < TOTAL_ROUNDS ? 'Next Round' : 'View Final Score'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        ) : (
          !isMobile && (
            <p
              style={{
                margin: '0.2rem 0 0',
                fontSize: '0.73rem',
                color: '#7c6146',
                letterSpacing: '0.02em',
                textAlign: isDesktop ? 'left' : 'center',
                fontWeight: 600,
              }}
            >
              Press 1-4 or A-D to guess · Space or Enter to advance
            </p>
          )
        );

        return (
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              padding: isMobile ? '1rem 0.9rem' : isDesktop ? '1.85rem 2.2rem' : '1.35rem 1.75rem',
              width: '100%',
              maxWidth: isDesktop ? '1060px' : '640px',
              display: 'grid',
              gridTemplateColumns: isDesktop ? '1.15fr 1fr' : '1fr',
              gap: isDesktop ? '2.1rem' : '0.75rem',
              alignItems: 'stretch',
              background: 'rgba(254, 250, 243, 0.95)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1.5px solid rgba(160, 125, 85, 0.38)',
              borderRadius: isDesktop ? '26px' : '22px',
              boxShadow: '0 24px 60px rgba(60, 37, 20, 0.16), 0 6px 18px rgba(60, 37, 20, 0.08)',
              boxSizing: 'border-box',
            }}
          >
            {isDesktop ? (
              <>
                {specimenPlateBlock}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '0.85rem',
                  }}
                >
                  {headerBlock}
                  {lifelinesBlock}
                  {optionsBlock}
                  {footerBlock}
                </div>
              </>
            ) : (
              <>
                {headerBlock}
                {specimenPlateBlock}
                {lifelinesBlock}
                {optionsBlock}
                {footerBlock}
              </>
            )}
          </div>
        );
      })()}
    </div>
  );
}
