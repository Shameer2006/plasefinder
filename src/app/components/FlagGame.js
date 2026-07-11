'use client';
import { useState, useEffect } from 'react';
import continentMapping from '../../../public/continentMapping.json'; // relative to src/app/components

const countryCodes = Object.keys(continentMapping);

export default function FlagGame({ onReturnToMenu }) {
  const [round, setRound] = useState(1);
  const [maxRounds, setMaxRounds] = useState(5);
  const [score, setScore] = useState(0);
  const [usedFlags, setUsedFlags] = useState([]);
  const [target, setTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [roundState, setRoundState] = useState('LOADING'); // 'LOADING', 'PLAYING', 'RESULT', 'FINISHED'
  const [userGuess, setUserGuess] = useState(null);
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

  const startNextRound = (currentRound = round) => {
    setRoundState('LOADING');
    
    // Pick target
    let targetCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
    // Prevent repeating flags if possible
    while (usedFlags.includes(targetCode) && usedFlags.length < countryCodes.length) {
      targetCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
    }
    setUsedFlags(prev => [...prev, targetCode]);
    
    // Pick 3 wrong options
    const wrongCodes = [];
    while (wrongCodes.length < 3) {
      const code = countryCodes[Math.floor(Math.random() * countryCodes.length)];
      if (code !== targetCode && !wrongCodes.includes(code)) {
        wrongCodes.push(code);
      }
    }

    const newTarget = { iso: targetCode.toLowerCase(), name: getCountryName(targetCode) };
    const newOptions = [
      newTarget,
      ...wrongCodes.map(code => ({ iso: code.toLowerCase(), name: getCountryName(code) }))
    ];
    
    // Shuffle options
    newOptions.sort(() => Math.random() - 0.5);

    setTarget(newTarget);
    setOptions(newOptions);
    setUserGuess(null);
    setRound(currentRound);
    setRoundState('PLAYING');
  };

  useEffect(() => {
    startNextRound(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGuess = (option) => {
    if (roundState !== 'PLAYING') return;
    
    setUserGuess(option);
    if (option.iso === target.iso) {
      setScore(prev => prev + 5000);
    }
    setRoundState('RESULT');
  };

  const handleNext = () => {
    if (round < maxRounds) {
      startNextRound(round + 1);
    } else {
      setRoundState('FINISHED');
    }
  };

  if (roundState === 'LOADING') {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5rem' }}>Loading Flag...</div>;
  }

  if (roundState === 'FINISHED') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
        <div className="glass-panel" style={{ padding: '4rem', maxWidth: '700px', width: '100%', textAlign: 'center' }}>
          <h2 className="gradient-text glow-text" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Game Over!</h2>
          <div style={{ margin: '2.5rem 0', fontSize: '2rem', background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '16px' }}>
            Total Score: <strong style={{ color: 'var(--primary-color)' }}>{score}</strong>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn secondary-btn" style={{ fontSize: '1.2rem', padding: '16px 24px', background: 'rgba(255,255,255,0.1)' }} onClick={onReturnToMenu}>
              Return to Menu
            </button>
            <button className="btn" style={{ fontSize: '1.2rem', padding: '16px 24px', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }} onClick={() => {
              setMaxRounds(prev => prev + 5);
              startNextRound(round + 1);
            }}>
              Continue to Round {maxRounds + 5}
            </button>
          </div>
        </div>
      </div>
    );
  }

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
      padding: isMobile ? '5.5rem 1rem 2rem' : '2rem'
    }}>
      
      {/* HUD overlay */}
      <div style={{ 
        position: isMobile ? 'absolute' : 'absolute', 
        top: isMobile ? 12 : 20, 
        left: isMobile ? 12 : 20, 
        right: isMobile ? 12 : 'auto',
        zIndex: 10, 
        display: 'flex', 
        gap: isMobile ? '0.5rem' : '1rem',
        justifyContent: isMobile ? 'space-between' : 'flex-start'
      }}>
        <div className="glass-panel" style={{ padding: '0.4rem 0.8rem', fontWeight: 'bold', fontSize: isMobile ? '0.85rem' : '1rem' }}>
          Round: {round} / {maxRounds}
        </div>
        <div className="glass-panel" style={{ padding: '0.4rem 0.8rem', fontWeight: 'bold', fontSize: isMobile ? '0.85rem' : '1rem' }}>
          Score: {score}
        </div>
        <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: isMobile ? '0.8rem' : '0.9rem' }} onClick={onReturnToMenu}>Quit</button>
      </div>

      <div className="glass-panel" style={{ padding: isMobile ? '1.2rem' : '2rem', width: '90%', maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: isMobile ? '1.25rem' : '2rem', marginBottom: isMobile ? '1.2rem' : '2rem', textAlign: 'center', lineHeight: 1.3 }}>Which country does this flag belong to?</h2>
        
        {/* Flag Display */}
        <div style={{ 
          marginBottom: isMobile ? '1.5rem' : '3rem', 
          background: 'white', 
          padding: '8px', 
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}>
          <img 
            src={`https://flagcdn.com/w320/${target?.iso}.png`} 
            alt="Flag" 
            style={{ display: 'block', maxWidth: '100%', height: 'auto', maxHeight: isMobile ? '150px' : '300px', borderRadius: '4px' }} 
          />
        </div>

        {/* Options */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '0.6rem' : '1rem', width: '100%' }}>
          {options.map((option, idx) => {
            let btnClass = "btn btn-secondary";
            let style = { padding: isMobile ? '0.8rem 1rem' : '1.2rem', fontSize: isMobile ? '0.95rem' : '1.2rem', minHeight: isMobile ? '50px' : '60px' };
            
            if (roundState === 'RESULT') {
              if (option.iso === target.iso) {
                // Correct answer is always green
                style.background = 'var(--success-color)';
                style.borderColor = 'var(--success-color)';
                style.color = 'white';
              } else if (userGuess && userGuess.iso === option.iso) {
                // Wrong guess is red
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
                className={btnClass}
                style={style}
                onClick={() => handleGuess(option)}
                disabled={roundState !== 'PLAYING'}
              >
                {option.name}
              </button>
            );
          })}
        </div>

        {/* Result Action */}
        {roundState === 'RESULT' && (
          <div style={{ marginTop: isMobile ? '1.5rem' : '2.5rem', animation: 'fade-in 0.3s ease' }}>
            <button className="btn" style={{ padding: isMobile ? '0.8rem 2rem' : '1rem 3rem', fontSize: isMobile ? '1.1rem' : '1.3rem' }} onClick={handleNext}>
              {round < maxRounds ? 'Next Round' : 'See Final Score'}
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
