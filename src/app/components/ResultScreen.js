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
  
  const [showMapOnly, setShowMapOnly] = useState(true);
  const [levelUpData, setLevelUpData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollectingXp, setIsCollectingXp] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

    const timer = setTimeout(() => setShowMapOnly(false), 3000);
    return () => clearTimeout(timer);
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
    setIsCollectingXp(true);
    const totalScore = score + roundScore;
    const xpEarned = Math.floor(totalScore / 10); // Example XP calculation
    
    // Fake a small delay for the animation
    await new Promise(r => setTimeout(r, 2000));
    
    if (user) {
      const xpResult = await addXp(user.uid, xpEarned);
      if (xpResult && xpResult.levelUp) {
        setIsCollectingXp(false);
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

  if (isCollectingXp) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(10, 10, 26, 0.95)', backdropFilter: 'blur(15px)' }}>
        <style>{`
          @keyframes count-up {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes xp-particle {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
          }
        `}</style>
        
        {/* Floating Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            fontSize: '2rem',
            animation: 'xp-particle 1.5s ease-out forwards',
            '--tx': \`\${(Math.random() - 0.5) * 400}px\`,
            '--ty': \`\${(Math.random() - 0.5) * 400}px\`,
            animationDelay: \`\${Math.random() * 0.5}s\`
          }}>✨</div>
        ))}

        <div style={{ animation: 'count-up 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards', textAlign: 'center', zIndex: 10 }}>
          <h2 className="gradient-text glow-text" style={{ fontSize: isMobile ? '2rem' : '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, #fbbf24, #f59e0b)' }}>
            Collecting XP...
          </h2>
          <div style={{ fontSize: isMobile ? '3rem' : '4.5rem', fontWeight: 'bold', color: 'white', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
            +{Math.floor((score + roundScore) / 10)} <span style={{ fontSize: '0.6em', color: '#fbbf24' }}>XP</span>
          </div>
        </div>
      </div>
    );
  }

  if (showMapOnly) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
        <ResultsMap 
          location={currentLocation} 
          players={[{ uid: 'you', displayName: 'You', lastGuess: userGuess }]} 
          height="100%"
        />
        <div style={{ position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.8)', padding: '1rem 2rem', borderRadius: '50px', zIndex: 1000 }}>
          <h2 style={{ color: 'white', margin: 0 }}>Reviewing Map...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Map for all modes */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, filter: 'brightness(0.4)' }}>
        <ResultsMap 
          location={currentLocation} 
          players={[{ uid: 'you', displayName: 'You', lastGuess: userGuess }]} 
          height="100%"
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', padding: isMobile ? '1rem' : '2rem' }}>
        <div className="glass-panel" style={{ padding: isMobile ? '1.5rem' : '4rem', maxWidth: '700px', width: '100%', textAlign: 'center', background: 'rgba(26, 26, 46, 0.85)', backdropFilter: 'blur(10px)' }}>
          <h2 className="gradient-text glow-text" style={{ fontSize: isMobile ? '2rem' : '3rem', marginBottom: isMobile ? '1rem' : '1.5rem' }}>Round {currentRound} Result</h2>
          
          <div style={{ margin: isMobile ? '1.5rem 0' : '2.5rem 0', fontSize: isMobile ? '1.1rem' : '1.4rem', background: 'rgba(0,0,0,0.4)', padding: isMobile ? '1.2rem' : '2rem', borderRadius: '16px' }}>
            {isChoiceMode ? (
              <>
                <p style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  Your guess: 
                  <strong style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {userGuess ? <><img src={`https://flagcdn.com/w40/${userGuess.iso}.png`} width="24" alt={userGuess.country} /> {userGuess.country}</> : 'None'}
                  </strong>
                </p>
                <p style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  Correct answer: 
                  <strong style={{ color: userGuess?.country === currentLocation.country ? 'var(--success-color)' : 'var(--error-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={`https://flagcdn.com/w40/${currentLocation.iso}.png`} width="24" alt={currentLocation.country} /> {currentLocation.country}
                  </strong>
                </p>
              </>
            ) : (
              <>
                <p style={{ marginBottom: '1rem' }}>Distance from location: <strong style={{ color: 'var(--primary-color)' }}>{distanceKm} km</strong></p>
                <p style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>Actual Location: <img src={`https://flagcdn.com/w40/${currentLocation.iso}.png`} width="24" alt={currentLocation.country} /> {currentLocation.country}, {currentLocation.state || 'Unknown State'}</p>
              </>
            )}
          </div>

          <div style={{ animation: 'pulse-glow 2s infinite', display: 'inline-block', padding: isMobile ? '0.6rem 1.5rem' : '1rem 2rem', borderRadius: '50px', background: 'rgba(59, 130, 246, 0.1)', marginBottom: isMobile ? '1.2rem' : '2rem' }}>
            <h3 style={{ fontSize: isMobile ? '2rem' : '3rem', color: 'var(--primary-color)', margin: 0 }}>+{roundScore} Points</h3>
          </div>
          
          <p style={{ marginBottom: isMobile ? '1.5rem' : '2.5rem', opacity: 0.8, fontSize: isMobile ? '1.05rem' : '1.2rem' }}>Total Score: <strong>{score}</strong></p>

          {currentRound < maxRounds ? (
            <button className="btn" style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', padding: isMobile ? '12px 24px' : '16px 32px' }} onClick={handleNext}>
              Next Round
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}>
              <button 
                className="btn" 
                style={{ 
                  fontSize: isMobile ? '1.1rem' : '1.2rem', 
                  padding: isMobile ? '12px 20px' : '16px 24px', 
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  color: '#000',
                  fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px'
                }} 
                onClick={async () => {
                  const shareUrl = `https://www.loststreet.online/share/${score}`;
                  const shareText = `🌍 LostStreet — ${isChoiceMode ? 'Easy/Medium' : 'Hard'} Mode\nScore: ${score.toLocaleString()} pts\nPlay free → ${shareUrl}`;
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: 'My LostStreet Score',
                        text: shareText,
                      });
                    } catch (e) {
                      console.error('Error sharing:', e);
                    }
                  } else {
                    navigator.clipboard.writeText(shareText);
                    alert('Score copied to clipboard!');
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                Share Result
              </button>
              
              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn secondary-btn" style={{ fontSize: isMobile ? '1rem' : '1.2rem', padding: isMobile ? '12px 20px' : '16px 24px', background: 'rgba(255,255,255,0.1)' }} onClick={handleFinish}>
                  Finish & Collect XP
                </button>
                <button className="btn" style={{ fontSize: isMobile ? '1rem' : '1.2rem', padding: isMobile ? '12px 20px' : '16px 24px', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }} onClick={handleContinueGame}>
                  Continue to Round {maxRounds + 5}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
