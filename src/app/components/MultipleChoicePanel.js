'use client';
import { useGameStore } from '@/lib/store';

export default function MultipleChoicePanel() {
  const { options, setUserGuess, setGameState, currentLocation } = useGameStore();

  const handleGuess = (guess) => {
    setUserGuess(guess);
    setGameState('RESULT');
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '600px',
      zIndex: 10
    }}>
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Where are we? (State)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
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
                minHeight: '80px',
                wordBreak: 'break-word'
              }}
              onClick={() => handleGuess(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
