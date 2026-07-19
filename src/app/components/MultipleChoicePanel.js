'use client';
import { useState } from 'react';
import { useGameStore } from '@/lib/store';
import { sounds } from '@/lib/sounds';
import { generateContextualHint } from '@/lib/hintUtils';

export default function MultipleChoicePanel() {
  const { currentLocation, options, setUserGuess, setGameState, usedHint, setUsedHint } = useGameStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

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

  const handleUseHint = () => {
    setUsedHint(true);
  };

  // On desktop: show options directly (no toggle needed)
  // On mobile: show "Guess" button; when tapped, expand a full-screen overlay
  // The overlay sits OVER the iframe with pointer-events, blocking it entirely

  return (
    <>
      {/* Desktop: always-visible bottom panel */}
      <div className="mc-desktop-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        
        {/* Hint Banner (Desktop) */}
        {usedHint && (
          <div className="glass-panel" style={{ padding: '1rem 2rem', background: 'rgba(59, 130, 246, 0.85)', color: 'white', maxWidth: '600px', textAlign: 'center', fontSize: '1.1rem', borderRadius: '16px', border: '1px solid #60a5fa' }}>
            <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#bfdbfe' }}>💡 Hint</strong>
            {generateContextualHint(currentLocation)}
          </div>
        )}

        <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(20,20,20,0.85)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginBottom: '1.5rem' }}>
            <h3 style={{ textAlign: 'center', fontSize: '1.4rem', margin: 0 }}>Where are we?</h3>
            
            {!usedHint && (
              <button 
                className="btn btn-secondary" 
                style={{ position: 'absolute', right: 0, padding: '0.4rem 1rem', fontSize: '0.9rem', color: '#fbbf24', borderColor: '#fbbf24' }} 
                onClick={handleUseHint}
              >
                Use Hint
              </button>
            )}
          </div>

          <div className="options-grid">
            {options.map((option, idx) => {
              const isSelected = selectedOption !== null;
              const isCorrect = option.iso === currentLocation.iso;
              const isCurrentGuess = selectedOption?.iso === option.iso;
              
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

      {/* Mobile: Guess button that opens a full-screen overlay */}
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
              {!usedHint ? (
                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', color: '#fbbf24', borderColor: '#fbbf24' }} 
                  onClick={handleUseHint}
                >
                  Use Hint
                </button>
              ) : (
                <div style={{ width: '80px' }}></div>
              )}

              <h3 style={{ textAlign: 'center', fontSize: '1.4rem', margin: 0 }}>Where are we?</h3>
              
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.5rem',
                  padding: '0 10px',
                  touchAction: 'manipulation'
                }}
                onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); setIsExpanded(false); }}
                onClick={() => setIsExpanded(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {options.map((option, idx) => {
                const isSelected = selectedOption !== null;
                const isCorrect = option.iso === currentLocation.iso;
                const isCurrentGuess = selectedOption?.iso === option.iso;
                
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
