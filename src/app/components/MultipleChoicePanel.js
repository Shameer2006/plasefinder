'use client';
import { useGameStore } from '@/lib/store';

export default function MultipleChoicePanel() {
  const { options, setUserGuess, setGameState } = useGameStore();

  const handleGuess = (option) => {
    setUserGuess(option);
    setGameState('RESULT');
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '900px',
      zIndex: 10
    }}>
      <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(20,20,20,0.85)' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.4rem' }}>Where are we?</h3>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'space-between' }}>
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
  );
}
