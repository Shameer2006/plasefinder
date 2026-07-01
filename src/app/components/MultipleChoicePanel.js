'use client';
import { useState } from 'react';
import { useGameStore } from '@/lib/store';

export default function MultipleChoicePanel() {
  const { options, setUserGuess, setGameState } = useGameStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGuess = (option) => {
    setUserGuess(option);
    setGameState('RESULT');
  };

  // On desktop: show options directly (no toggle needed)
  // On mobile: show "Guess" button; when tapped, expand a full-screen overlay
  // The overlay sits OVER the iframe with pointer-events, blocking it entirely

  return (
    <>
      {/* Desktop: always-visible bottom panel */}
      <div className="mc-desktop-panel">
        <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(20,20,20,0.85)' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.4rem' }}>Where are we?</h3>
          <div className="options-grid">
            {options.map((option, idx) => (
              <button
                key={idx}
                className="btn btn-secondary"
                style={{
                  flex: 1,
                  padding: '1.2rem',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  minHeight: '60px'
                }}
                onClick={() => handleGuess(option)}
              >
                <img src={`https://flagcdn.com/w40/${option.iso}.png`} width="30" alt={option.country} />
                <span>{option.country}</span>
              </button>
            ))}
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
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(20,20,20,0.95)', width: '90%', maxWidth: '500px', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginBottom: '1.5rem' }}>
              <h3 style={{ textAlign: 'center', fontSize: '1.4rem', margin: 0 }}>Where are we?</h3>
              <button
                type="button"
                style={{
                  position: 'absolute',
                  right: 0,
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
              {options.map((option, idx) => (
                <button
                  key={idx}
                  className="btn btn-secondary"
                  style={{
                    padding: '1.2rem',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    minHeight: '60px',
                    touchAction: 'manipulation'
                  }}
                  onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); handleGuess(option); }}
                  onClick={() => handleGuess(option)}
                >
                  <img src={`https://flagcdn.com/w40/${option.iso}.png`} width="30" alt={option.country} />
                  <span>{option.country}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
