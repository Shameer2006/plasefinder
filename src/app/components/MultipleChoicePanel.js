'use client';
import { useState, useMemo } from 'react';
import { useGameStore } from '@/lib/store';
import { useAuth } from '@/lib/AuthContext';
import { sounds } from '@/lib/sounds';
import { generateContextualHint } from '@/lib/hintUtils';
import { spendCoins, canAfford } from '@/lib/coins';

export default function MultipleChoicePanel() {
  const { 
    currentLocation, 
    options, 
    setUserGuess, 
    setGameState, 
    usedHint, 
    setUsedHint, 
    fiftyFiftyUsed, 
    setFiftyFiftyUsed, 
    circleSearchActive,
    coins,
    deductCoins
  } = useGameStore();
  const { userProfile, setUserProfile } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [eliminatedOptions, setEliminatedOptions] = useState([]);

  const currentBalance = userProfile?.coins !== undefined ? userProfile.coins : coins;

  // 50/50 Eliminator calculation
  const handleUse5050 = async () => {
    if (fiftyFiftyUsed || !currentLocation || options.length <= 2) return;
    if (!canAfford(currentBalance, 20)) {
      alert("Not enough coins for 50/50! Need 20 coins.");
      return;
    }

    const result = await spendCoins('fifty_fifty', userProfile?.uid, currentBalance);
    if (result.success) {
      deductCoins(20);
      if (userProfile && setUserProfile) {
        setUserProfile(prev => ({ ...prev, coins: Math.max(0, (prev?.coins || 0) - 20) }));
      }
      setFiftyFiftyUsed(true);

      // Find wrong options to eliminate
      const wrongIndices = options
        .map((opt, idx) => ({ opt, idx }))
        .filter(item => item.opt.iso !== currentLocation.iso)
        .map(item => item.idx);
      
      // Shuffle and pick 2 to eliminate
      const shuffled = wrongIndices.sort(() => 0.5 - Math.random());
      const toEliminate = shuffled.slice(0, 2);
      setEliminatedOptions(toEliminate);
    }
  };

  const handleUseHint = async () => {
    if (usedHint) return;
    if (!canAfford(currentBalance, 15)) {
      alert("Not enough coins for Hint! Need 15 coins.");
      return;
    }

    const result = await spendCoins('hint', userProfile?.uid, currentBalance);
    if (result.success) {
      deductCoins(15);
      if (userProfile && setUserProfile) {
        setUserProfile(prev => ({ ...prev, coins: Math.max(0, (prev?.coins || 0) - 15) }));
      }
      setUsedHint(true);
    }
  };

  const handleGuess = (option) => {
    setSelectedOption(option);
    setUserGuess(option);
    
    if (option.iso === currentLocation.iso) {
      sounds.playCorrect();
    } else {
      sounds.playWrong();
    }

    setTimeout(() => {
      setGameState('RESULT');
    }, 1500);
  };

  // On desktop: show options directly (no toggle needed)
  // On mobile: show "Guess" button; when tapped, expand a full-screen overlay
  // The overlay sits OVER the iframe with pointer-events, blocking it entirely

  return (
    <>
      {/* Desktop: always-visible bottom panel (hidden during circle search) */}
      <div className="mc-desktop-panel" style={circleSearchActive ? { display: 'none' } : undefined}>
        
        {/* Hint Banner (Desktop) */}
        {usedHint && (
          <div className="glass-panel" style={{ padding: '1rem 2rem', background: 'rgba(59, 130, 246, 0.85)', color: 'white', maxWidth: '600px', textAlign: 'center', fontSize: '1.1rem', borderRadius: '16px', border: '1px solid #60a5fa' }}>
            <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#bfdbfe' }}>💡 Hint</strong>
            {generateContextualHint(currentLocation)}
          </div>
        )}

        <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(20,20,20,0.85)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', marginBottom: '1.5rem' }}>
            {/* 50/50 Power Up */}
            {!fiftyFiftyUsed && options.length > 2 ? (
              <button 
                className="btn btn-secondary" 
                style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem', color: '#a78bfa', borderColor: '#a78bfa', display: 'flex', alignItems: 'center', gap: '4px' }} 
                onClick={handleUse5050}
                title="Eliminates 2 wrong answers for 20 coins"
              >
                <span>✂️ 50/50</span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(167, 139, 250, 0.2)', padding: '1px 5px', borderRadius: '8px' }}>20🪙</span>
              </button>
            ) : <div style={{ width: '80px' }} />}

            <h3 style={{ textAlign: 'center', fontSize: '1.4rem', margin: 0 }}>Where are we?</h3>
            
            {/* Hint Power Up */}
            {!usedHint ? (
              <button 
                className="btn btn-secondary" 
                style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem', color: '#fbbf24', borderColor: '#fbbf24', display: 'flex', alignItems: 'center', gap: '4px' }} 
                onClick={handleUseHint}
                title="Reveals contextual clue for 15 coins"
              >
                <span>💡 Hint</span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(251, 191, 36, 0.2)', padding: '1px 5px', borderRadius: '8px' }}>15🪙</span>
              </button>
            ) : <div style={{ width: '80px' }} />}
          </div>

          <div className="options-grid">
            {options.map((option, idx) => {
              const isSelected = selectedOption !== null;
              const isCorrect = option.iso === currentLocation.iso;
              const isCurrentGuess = selectedOption?.iso === option.iso;
              const isEliminated = eliminatedOptions.includes(idx);
              
              if (isEliminated) {
                return (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      padding: '1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '60px',
                      opacity: 0.2,
                      filter: 'grayscale(1)',
                      border: '1px dashed rgba(255,255,255,0.2)',
                      borderRadius: '12px',
                    }}
                  >
                    <span style={{ fontSize: '0.9rem', color: '#888' }}>— Eliminated —</span>
                  </div>
                );
              }

              const style = {
                flex: 1,
                padding: '1.2rem',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                minHeight: '60px',
                transition: 'all 0.2s ease',
              };

              if (isSelected) {
                if (isCorrect) {
                  style.background = 'var(--success-color)';
                  style.borderColor = 'var(--success-color)';
                  style.color = 'white';
                } else if (isCurrentGuess) {
                  style.background = 'var(--error-color)';
                  style.borderColor = 'var(--error-color)';
                  style.color = 'white';
                } else {
                  style.opacity = 0.5;
                }
              }

              return (
                <button
                  key={idx}
                  className="btn btn-secondary"
                  style={style}
                  onClick={() => handleGuess(option)}
                  disabled={isSelected}
                >
                  <img src={`https://flagcdn.com/w40/${option.iso}.png`} width="30" alt={option.country} />
                  <span>{option.country}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Guess button that opens a full-screen overlay (hidden during circle search) */}
      {!isExpanded && !circleSearchActive && (
        <div className="mc-mobile-trigger">
          <button
            type="button"
            className="btn mc-guess-btn"
            onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); setIsExpanded(true); }}
            onClick={() => setIsExpanded(true)}
          >
            Guess
          </button>
        </div>
      )}

      {/* Mobile: Full-screen overlay with options (blocks iframe completely) */}
      {isExpanded && (
        <div
          className="mc-mobile-overlay"
          onTouchStart={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(20,20,20,0.95)', width: '90%', maxWidth: '500px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Hint Banner (Mobile) */}
            {usedHint && (
              <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.2)', color: 'white', textAlign: 'center', fontSize: '1rem', borderRadius: '12px', border: '1px solid #3b82f6' }}>
                <strong style={{ display: 'block', marginBottom: '0.3rem', color: '#93c5fd' }}>💡 Hint</strong>
                {generateContextualHint(currentLocation)}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {!fiftyFiftyUsed && options.length > 2 && (
                  <button 
                    className="btn btn-secondary" 
                    style={{ padding: '0.35rem 0.55rem', fontSize: '0.8rem', color: '#a78bfa', borderColor: '#a78bfa' }} 
                    onClick={handleUse5050}
                  >
                    ✂️ 20🪙
                  </button>
                )}

                {!usedHint && (
                  <button 
                    className="btn btn-secondary" 
                    style={{ padding: '0.35rem 0.55rem', fontSize: '0.8rem', color: '#fbbf24', borderColor: '#fbbf24' }} 
                    onClick={handleUseHint}
                  >
                    💡 15🪙
                  </button>
                )}
              </div>

              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', margin: 0, whiteSpace: 'nowrap' }}>Where are we?</h3>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '1.5rem',
                    padding: '0 8px',
                    touchAction: 'manipulation'
                  }}
                  onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); setIsExpanded(false); }}
                  onClick={() => setIsExpanded(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {options.map((option, idx) => {
                const isSelected = selectedOption !== null;
                const isCorrect = option.iso === currentLocation.iso;
                const isCurrentGuess = selectedOption?.iso === option.iso;
                const isEliminated = eliminatedOptions.includes(idx);
                
                if (isEliminated) {
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: '0.8rem',
                        textAlign: 'center',
                        opacity: 0.2,
                        filter: 'grayscale(1)',
                        border: '1px dashed rgba(255,255,255,0.2)',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        color: '#888',
                      }}
                    >
                      — Eliminated —
                    </div>
                  );
                }

                const style = {
                  padding: '1.2rem',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  minHeight: '60px',
                  touchAction: 'manipulation',
                  transition: 'all 0.2s ease',
                };

                if (isSelected) {
                  if (isCorrect) {
                    style.background = 'var(--success-color)';
                    style.borderColor = 'var(--success-color)';
                    style.color = 'white';
                  } else if (isCurrentGuess) {
                    style.background = 'var(--error-color)';
                    style.borderColor = 'var(--error-color)';
                    style.color = 'white';
                  } else {
                    style.opacity = 0.5;
                  }
                }

                return (
                  <button
                    key={idx}
                    className="btn btn-secondary"
                    style={style}
                    onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); if (!isSelected) handleGuess(option); }}
                    onClick={() => { if (!isSelected) handleGuess(option); }}
                    disabled={isSelected}
                  >
                    <img src={`https://flagcdn.com/w40/${option.iso}.png`} width="30" alt={option.country} />
                    <span>{option.country}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
