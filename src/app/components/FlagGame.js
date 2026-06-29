'use client';
import { useState, useEffect } from 'react';
import continentMapping from '../../../public/continentMapping.json'; // relative to src/app/components

const MAX_ROUNDS = 5;
const countryCodes = Object.keys(continentMapping);

export default function FlagGame({ onReturnToMenu }) {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [roundState, setRoundState] = useState('LOADING'); // 'LOADING', 'PLAYING', 'RESULT', 'FINISHED'
  const [userGuess, setUserGuess] = useState(null);

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  const getCountryName = (code) => {
    return regionNames.of(code) || code;
  };

  const startNextRound = (currentRound = round) => {
    setRoundState('LOADING');
    
    // Pick target
    const targetCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
    
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
    if (round < MAX_ROUNDS) {
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
          <button className="btn" style={{ fontSize: '1.3rem', padding: '16px 32px' }} onClick={onReturnToMenu}>
            Return to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
      
      {/* HUD overlay */}
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, display: 'flex', gap: '1rem' }}>
        <div className="glass-panel" style={{ padding: '0.5rem 1rem', fontWeight: 'bold' }}>
          Round: {round} / {MAX_ROUNDS}
        </div>
        <div className="glass-panel" style={{ padding: '0.5rem 1rem', fontWeight: 'bold' }}>
          Score: {score}
        </div>
        <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={onReturnToMenu}>Quit</button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', width: '90%', maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Which country does this flag belong to?</h2>
        
        {/* Flag Display */}
        <div style={{ 
          marginBottom: '3rem', 
          background: 'white', 
          padding: '10px', 
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}>
          <img 
            src={`https://flagcdn.com/w320/${target?.iso}.png`} 
            alt="Flag" 
            style={{ display: 'block', maxWidth: '100%', height: 'auto', maxHeight: '300px', borderRadius: '4px' }} 
          />
        </div>

        {/* Options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%' }}>
          {options.map((option, idx) => {
            let btnClass = "btn btn-secondary";
            let style = { padding: '1.2rem', fontSize: '1.2rem' };
            
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
          <div style={{ marginTop: '2.5rem', animation: 'fade-in 0.3s ease' }}>
            <button className="btn" style={{ padding: '1rem 3rem', fontSize: '1.3rem' }} onClick={handleNext}>
              {round < MAX_ROUNDS ? 'Next Round' : 'See Final Score'}
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
