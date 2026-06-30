'use client';
import { useGameStore } from '@/lib/store';
import { useEffect, useState } from 'react';

// Haversine distance calculation for Hard Mode
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; 
  return d;
}



import { addXp } from '@/lib/userProfile';
import { useAuth } from '@/lib/AuthContext';
import LevelUpOverlay from './LevelUpOverlay';
import dynamic from 'next/dynamic';

const ResultsMap = dynamic(() => import('./ResultsMap'), { ssr: false });

export default function ResultScreen() {
  const { user } = useAuth();
  const { 
    currentLocation, userGuess, difficulty, 
    score, setScore, 
    currentRound, maxRounds, setMaxRounds,
    nextRound, setGameState, resetGame 
  } = useGameStore();
  
  const [roundScore, setRoundScore] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);
  const isChoiceMode = difficulty === 'EASY' || (difficulty === 'MEDIUM' && currentRound % 2 !== 0);
  
  const [showMapOnly, setShowMapOnly] = useState(!isChoiceMode);
  const [levelUpData, setLevelUpData] = useState(null);

  useEffect(() => {
    let earned = 0;
    if (isChoiceMode) {
      if (userGuess?.country === currentLocation.country) earned = 5000;
    } else {
      if (userGuess && userGuess.lat && userGuess.lng) {
        const dist = getDistanceFromLatLonInKm(currentLocation.lat, currentLocation.lng, userGuess.lat, userGuess.lng);
        setDistanceKm(Math.round(dist));
        earned = Math.round(5000 * Math.exp(-dist / 2000));
        if (earned < 0) earned = 0;
      }
    }
    setRoundScore(earned);
    setScore(earned);

    if (!isChoiceMode) {
      const timer = setTimeout(() => setShowMapOnly(false), 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    if (currentRound < maxRounds) {
      nextRound();
      setGameState('LOADING');
    }
  };

  const handleContinueGame = () => {
    setMaxRounds(maxRounds + 5);
    nextRound();
    setGameState('LOADING');
  };

  const handleFinish = async () => {
    const totalScore = score + roundScore;
    const xpEarned = Math.floor(totalScore / 10); // Example XP calculation
    
    if (user) {
      const xpResult = await addXp(user.uid, xpEarned);
      if (xpResult && xpResult.levelUp) {
        setLevelUpData(xpResult);
        return; // Don't reset game yet, show overlay first
      }
    }
    
    resetGame();
    setGameState('MENU');
  };

  const handleCloseLevelUp = () => {
    resetGame();
    setGameState('MENU');
  };

  if (levelUpData) {
    return <LevelUpOverlay data={levelUpData} onClose={handleCloseLevelUp} />;
  }

  if (showMapOnly && !isChoiceMode) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
        <ResultsMap 
          location={currentLocation} 
          players={[{ uid: 'you', displayName: 'You', lastGuess: userGuess }]} 
        />
        <div style={{ position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.8)', padding: '1rem 2rem', borderRadius: '50px', zIndex: 1000 }}>
          <h2 style={{ color: 'white', margin: 0 }}>Reviewing Map...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Map for non-choice mode */}
      {!isChoiceMode && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, filter: 'brightness(0.4)' }}>
          <ResultsMap 
            location={currentLocation} 
            players={[{ uid: 'you', displayName: 'You', lastGuess: userGuess }]} 
          />
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
        <div className="glass-panel" style={{ padding: '4rem', maxWidth: '700px', width: '100%', textAlign: 'center', background: 'rgba(26, 26, 46, 0.85)', backdropFilter: 'blur(10px)' }}>
          <h2 className="gradient-text glow-text" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Round {currentRound} Result</h2>
          
          <div style={{ margin: '2.5rem 0', fontSize: '1.4rem', background: 'rgba(0,0,0,0.4)', padding: '2rem', borderRadius: '16px' }}>
            {isChoiceMode ? (
              <>
                <p style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  Your guess: 
                  <strong style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {userGuess ? <><img src={`https://flagcdn.com/w40/${userGuess.iso}.png`} width="24" alt={userGuess.country} /> {userGuess.country}</> : 'None'}
                  </strong>
                </p>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  Correct answer: 
                  <strong style={{ color: userGuess?.country === currentLocation.country ? 'var(--success-color)' : 'var(--error-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={`https://flagcdn.com/w40/${currentLocation.iso}.png`} width="24" alt={currentLocation.country} /> {currentLocation.country}
                  </strong>
                </p>
              </>
            ) : (
              <>
                <p style={{ marginBottom: '1rem' }}>Distance from location: <strong style={{ color: 'var(--primary-color)' }}>{distanceKm} km</strong></p>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>Actual Location: <img src={`https://flagcdn.com/w40/${currentLocation.iso}.png`} width="24" alt={currentLocation.country} /> {currentLocation.country}, {currentLocation.state || 'Unknown State'}</p>
              </>
            )}
          </div>

          <div style={{ animation: 'pulse-glow 2s infinite', display: 'inline-block', padding: '1rem 2rem', borderRadius: '50px', background: 'rgba(59, 130, 246, 0.1)', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '3rem', color: 'var(--primary-color)', margin: 0 }}>+{roundScore} Points</h3>
          </div>
          
          <p style={{ marginBottom: '2.5rem', opacity: 0.8, fontSize: '1.2rem' }}>Total Score: <strong>{score}</strong></p>

          {currentRound < maxRounds ? (
            <button className="btn" style={{ fontSize: '1.3rem', padding: '16px 32px' }} onClick={handleNext}>
              Next Round
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn secondary-btn" style={{ fontSize: '1.2rem', padding: '16px 24px', background: 'rgba(255,255,255,0.1)' }} onClick={handleFinish}>
                Finish & Collect XP
              </button>
              <button className="btn" style={{ fontSize: '1.2rem', padding: '16px 24px', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }} onClick={handleContinueGame}>
                Continue to Round {maxRounds + 5}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
