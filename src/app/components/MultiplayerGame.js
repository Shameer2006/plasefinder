'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useGameStore } from '@/lib/store';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import PanoramaViewer from './PanoramaViewer';
import dynamic from 'next/dynamic';

const GuessingMap = dynamic(() => import('./GuessingMap'), { ssr: false });
const ResultsMap = dynamic(() => import('./ResultsMap'), { ssr: false });
import ResultScreen from './ResultScreen';
import PartyChat from './PartyChat';

// Function to calculate distance between two coordinates in km
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; // Distance in km
}

export default function MultiplayerGame({ gameId }) {
  const { userProfile } = useAuth();
  const { setCurrentLocation, setGameState } = useGameStore();
  const [matchData, setMatchData] = useState(null);
  const [lastGuessDistance, setLastGuessDistance] = useState(0);
  const [roundPoints, setRoundPoints] = useState(0);
  const [showMapOnly, setShowMapOnly] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const difficulty = matchData?.options?.difficulty || 'Medium';
  const isMultipleChoice = difficulty === 'Easy' || (difficulty === 'Medium' && matchData?.round % 2 === 1);
  const isRoundOver = matchData?.players ? Object.values(matchData.players).every(p => p.ready) : false;

  useEffect(() => {
    if (isRoundOver) {
      setShowMapOnly(true);
      const timer = setTimeout(() => setShowMapOnly(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isRoundOver]);

  useEffect(() => {
    if (!db || !gameId) return;

    const unsub = onSnapshot(doc(db, 'matches', gameId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMatchData(data);
        
        // If a new location is set for the round, sync it to our store
        if (data.location && data.status === 'playing') {
          setCurrentLocation(data.location);
        }
      }
    });

    return () => unsub();
  }, [gameId, setCurrentLocation]);

  // Host (Player 1) logic: generate location if needed
  useEffect(() => {
    if (!matchData || !userProfile) return;
    
    // Check if we are player 1 (host)
    const playerIds = Object.keys(matchData.players);
    const isHost = playerIds[0] === userProfile.uid;

    if (isHost && matchData.status === 'waiting_for_players') {
      // Generate first location
      import('@/lib/locationManager').then(({ fetchRandomLocation }) => {
        fetchRandomLocation(matchData.options || {}).then(({ location, options }) => {
          updateDoc(doc(db, 'matches', gameId), {
            location: location,
            locationOptions: options,
            status: 'playing',
            round: 1
          });
        });
      });
    }
  }, [matchData, userProfile, gameId]);

  // Bot opponent simulation
  useEffect(() => {
    if (!matchData || matchData.status !== 'playing' || !db || !gameId) return;

    const botId = Object.keys(matchData.players).find(id => matchData.players[id].isBot);
    if (!botId) return;

    const botData = matchData.players[botId];
    if (botData.ready) return;

    // Simulate bot thinking and making a guess
    const delay = 4000 + Math.random() * 6000; // 4 to 10 seconds delay
    const timer = setTimeout(async () => {
      const difficulty = matchData.options?.difficulty || 'Medium';
      const isMultipleChoice = difficulty === 'Easy' || (difficulty === 'Medium' && matchData.round % 2 === 1);

      if (isMultipleChoice) {
        // 60% chance to be correct
        const isCorrect = Math.random() < 0.6;
        const points = isCorrect ? 5000 : 0;
        
        let chosenOption = matchData.locationOptions?.find(opt => opt.iso === matchData.location.iso);
        if (!isCorrect && matchData.locationOptions) {
          const wrongOpts = matchData.locationOptions.filter(opt => opt.iso !== matchData.location.iso);
          if (wrongOpts.length > 0) {
            chosenOption = wrongOpts[Math.floor(Math.random() * wrongOpts.length)];
          }
        }

        if (!chosenOption && matchData.locationOptions) {
          chosenOption = matchData.locationOptions[0];
        }

        await updateDoc(doc(db, 'matches', gameId), {
          [`players.${botId}.score`]: botData.score + points,
          [`players.${botId}.ready`]: true,
          [`players.${botId}.lastGuess`]: {
            lat: matchData.location.lat,
            lng: matchData.location.lng,
            choice: chosenOption ? chosenOption.country : 'Unknown',
            isCorrect
          }
        });
      } else {
        // Map guess: generate random offset near correct location
        // Offset decreases if bot ELO is higher
        const eloFactor = Math.max(0.1, 1 - (botData.elo - 800) / 1000); // lower ELO = larger offset
        const maxOffset = 5 + eloFactor * 25; // max degrees of latitude/longitude offset
        
        const offsetLat = (Math.random() - 0.5) * maxOffset;
        const offsetLng = (Math.random() - 0.5) * maxOffset;
        const botLat = matchData.location.lat + offsetLat;
        const botLng = matchData.location.lng + offsetLng;

        const distance = calculateDistance(botLat, botLng, matchData.location.lat, matchData.location.lng);
        const points = Math.max(0, Math.round(5000 * Math.exp(-distance / 2000)));

        await updateDoc(doc(db, 'matches', gameId), {
          [`players.${botId}.score`]: botData.score + points,
          [`players.${botId}.ready`]: true,
          [`players.${botId}.lastGuess`]: { lat: botLat, lng: botLng }
        });
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [matchData?.status, matchData?.round, matchData?.location, gameId]);

  // Round Timer Logic
  useEffect(() => {
    if (!matchData || matchData.status !== 'playing' || isRoundOver || !matchData.roundStartTime || !userProfile) {
      setTimeLeft(null);
      return;
    }
    
    const myData = matchData.players?.[userProfile.uid];
    
    const timeLimit = matchData.options?.timeLimit || 60;
    const interval = setInterval(() => {
      const elapsed = (Date.now() - matchData.roundStartTime) / 1000;
      const remaining = Math.max(0, Math.ceil(timeLimit - elapsed));
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        if (!myData?.ready) {
           updateDoc(doc(db, 'matches', gameId), {
             [`players.${userProfile.uid}.ready`]: true,
             [`players.${userProfile.uid}.score`]: myData?.score || 0,
             [`players.${userProfile.uid}.lastGuess`]: { choice: 'Timeout', isCorrect: false, lat: 0, lng: 0 }
           });
        }
        
        setTimeout(() => {
           let needsUpdate = false;
           const updates = {};
           Object.entries(matchData.players).forEach(([uid, pData]) => {
             if (!pData.ready) {
                updates[`players.${uid}.ready`] = true;
                updates[`players.${uid}.lastGuess`] = { choice: 'Timeout', isCorrect: false, lat: 0, lng: 0 };
                needsUpdate = true;
             }
           });
           if (needsUpdate && matchData.status === 'playing') {
             updateDoc(doc(db, 'matches', gameId), updates);
           }
        }, 2000);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [matchData?.status, matchData?.round, matchData?.roundStartTime, isRoundOver, matchData?.players, gameId, userProfile?.uid]);

  if (!matchData || !userProfile) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '2rem' }}>Loading Match...</div>;
  }

  const myData = matchData.players[userProfile.uid];
  const playerIds = Object.keys(matchData.players);
  const isHost = matchData.players[userProfile.uid]?.host || playerIds[0] === userProfile.uid;
  
  // Sort players by score for leaderboards
  const sortedPlayers = Object.entries(matchData.players)
    .map(([uid, data]) => ({ uid, ...data }))
    .sort((a, b) => b.score - a.score);

  const handleMapGuess = async (lat, lng) => {
    if (myData.ready || matchData.status !== 'playing') return;
    
    const loc = matchData.location;
    const distance = calculateDistance(lat, lng, loc.lat, loc.lng);
    const points = Math.max(0, Math.round(5000 * Math.exp(-distance / 2000)));

    setLastGuessDistance(Math.round(distance));
    setRoundPoints(points);

    // Record guess in Firestore
    await updateDoc(doc(db, 'matches', gameId), {
      [`players.${userProfile.uid}.score`]: myData.score + points,
      [`players.${userProfile.uid}.ready`]: true,
      [`players.${userProfile.uid}.lastGuess`]: { lat, lng }
    });
  };

  const handleChoiceGuess = async (iso, countryName) => {
    if (myData.ready || matchData.status !== 'playing') return;
    
    const isCorrect = iso === matchData.location.iso;
    const points = isCorrect ? 5000 : 0;
    
    setLastGuessDistance(isCorrect ? 0 : -1);
    setRoundPoints(points);

    await updateDoc(doc(db, 'matches', gameId), {
      [`players.${userProfile.uid}.score`]: myData.score + points,
      [`players.${userProfile.uid}.ready`]: true,
      // For multiple choice, we still need a lastGuess to not break the ResultsMap
      // We can just set it to the actual location if correct, or somewhere else if wrong
      // But it's easier to just pass the actual location coordinates for now
      // so the map pin at least renders somewhere (or skip rendering if not provided)
      [`players.${userProfile.uid}.lastGuess`]: { lat: matchData.location.lat, lng: matchData.location.lng, choice: countryName, isCorrect }
    });
  };

  // Variables moved to the top level

  const startNextRound = async () => {
    if (!userProfile) return;
    
    if (isHost) {
      const isParty = !!matchData.code;
      const maxRounds = matchData.options?.rounds || 5;

      if (matchData.round >= maxRounds) {
        // Game Over! Update ELOs in user profiles (Only if not a party, or simple logic)
        await updateDoc(doc(db, 'matches', gameId), { status: 'finished' });
        
        if (!isParty && playerIds.length === 2) {
          // Simple ELO update for 1v1 duel (winner +25, loser -25)
          const opponentId = playerIds.find(id => id !== userProfile.uid);
          const opponentData = matchData.players[opponentId];
          const myScore = matchData.players[userProfile.uid].score;
          const opScore = matchData.players[opponentId].score;
          
          const myNewElo = myScore >= opScore ? myData.elo + 25 : myData.elo - 25;
          await updateDoc(doc(db, 'users', userProfile.uid), { elo: Math.max(0, myNewElo) });
          
          if (!opponentData.isBot) {
            const opNewElo = opScore > myScore ? opponentData.elo + 25 : opponentData.elo - 25;
            await updateDoc(doc(db, 'users', opponentId), { elo: Math.max(0, opNewElo) });
          }
        }
      } else {
        import('@/lib/locationManager').then(({ fetchRandomLocation }) => {
          fetchRandomLocation(matchData.options || {}).then(({ location, options }) => {
            const updates = {
              location: location,
              locationOptions: options,
              status: 'playing',
              round: matchData.round + 1,
              roundStartTime: Date.now()
            };
            // Reset ready state for all players
            playerIds.forEach(id => {
              updates[`players.${id}.ready`] = false;
            });
            updateDoc(doc(db, 'matches', gameId), updates);
          });
        });
      }
    }
  };

  if (matchData.status === 'finished') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
        <div className="glass-panel modal-content" style={{ textAlign: 'center' }}>
          <h2 className="gradient-text glow-text responsive-title" style={{ marginBottom: '1.5rem' }}>Match Finished!</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '2rem 0', maxHeight: '300px', overflowY: 'auto' }}>
            {sortedPlayers.map((player, idx) => (
              <div key={player.uid} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>
                  <span style={{ marginRight: '10px', color: idx === 0 ? '#fbbf24' : '#ccc' }}>#{idx + 1}</span>
                  {player.displayName} {player.uid === userProfile.uid ? '(You)' : ''}
                </span>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: player.uid === userProfile.uid ? 'var(--primary-color)' : 'white' }}>{player.score}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn" 
              style={{ 
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                color: '#000',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }} 
              onClick={async () => {
                const myScore = matchData.players[userProfile.uid].score;
                const shareUrl = `https://www.loststreet.online/share/${myScore}`;
                const shareText = `🌍 LostStreet Multiplayer Match\nI scored ${myScore.toLocaleString()} pts!\nPlay free → ${shareUrl}`;
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: 'My LostStreet Multiplayer Score',
                      text: shareText,
                    });
                  } catch (e) {
                    console.error('Error sharing:', e);
                  }
                } else {
                  navigator.clipboard.writeText(shareText);
                  alert('Match result copied to clipboard!');
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              Share Result
            </button>
            <button className="btn" onClick={() => setGameState('MENU')}>Return to Menu</button>
          </div>
        </div>
        <PartyChat gameId={gameId} matchData={matchData} />
      </div>
    );
  }

  // Hook moved to the top level

  if (isRoundOver) {
    if (showMapOnly) {
      return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
          <ResultsMap location={matchData.location} players={Object.values(matchData.players)} height="100%" />
          <div style={{ position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.8)', padding: '1rem 2rem', borderRadius: '50px', zIndex: 1000 }}>
            <h2 style={{ color: 'white', margin: 0 }}>Reviewing Map...</h2>
          </div>
        </div>
      );
    }

    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {/* Background Map */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, filter: 'brightness(0.4)' }}>
          <ResultsMap location={matchData.location} players={Object.values(matchData.players)} height="100%" />
        </div>
        
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
          <div className="glass-panel modal-content" style={{ textAlign: 'center', background: 'rgba(26, 26, 46, 0.85)' }}>
            <h2 className="gradient-text glow-text responsive-title" style={{ marginBottom: '1rem' }}>Round {matchData.round} Result</h2>
            
            <div style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '12px' }}>
              <p style={{ fontSize: '1.2rem' }}>You earned <strong style={{ color: 'var(--primary-color)' }}>+{roundPoints}</strong> pts</p>
              {isMultipleChoice && (
                 <p style={{ color: '#ccc' }}>{lastGuessDistance === 0 ? 'Correct Choice!' : 'Wrong Choice!'}</p>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '1.5rem 0', maxHeight: '200px', overflowY: 'auto', textAlign: 'left' }}>
              {sortedPlayers.map((player, idx) => (
                <div key={player.uid} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '1.1rem' }}>
                    <span style={{ marginRight: '10px', color: '#ccc' }}>#{idx + 1}</span>
                    {player.displayName}
                  </span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{player.score}</span>
                </div>
              ))}
            </div>
            {isHost ? (
              <button className="btn" onClick={startNextRound} style={{ marginTop: '1rem', width: '100%' }}>
                {matchData.round < (matchData.options?.rounds || 5) ? 'Next Round' : 'Finish Game'}
              </button>
            ) : (
              <div style={{ padding: '10px', color: '#ccc', marginTop: '1rem' }}>Waiting for host to continue...</div>
            )}
          </div>
          <PartyChat gameId={gameId} matchData={matchData} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', position: 'relative' }}>
      {matchData.options?.mode === 'Flag Guesser' ? (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#111' }}>
          <img src={`https://flagcdn.com/w320/${matchData.location.iso}.png`} style={{ maxWidth: '80%', maxHeight: '60%', border: '4px solid white', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }} />
        </div>
      ) : (
        <div style={{ flex: 1, position: 'relative' }}>
          <PanoramaViewer />
        </div>
      )}

      <div className="hud-center" style={{ 
        background: 'rgba(0,0,0,0.8)',
        padding: isMobile ? '6px 12px' : '10px 20px',
        borderRadius: '20px',
        zIndex: 10,
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        maxWidth: isMobile ? '95vw' : 'auto'
      }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', width: '100%', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', fontWeight: '800', opacity: 0.5 }}>R{matchData.round}/{matchData.options?.rounds || 5}</div>
          {timeLeft !== null && (
            <div style={{ 
              fontSize: isMobile ? '1.1rem' : '1.5rem', 
              fontWeight: '900', 
              color: timeLeft <= 10 ? '#ef4444' : '#fbbf24',
              textShadow: '0 0 10px rgba(0,0,0,0.5)'
            }}>
              {timeLeft}s
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: isMobile ? '0.8rem' : '1.5rem', overflowX: 'auto', maxWidth: isMobile ? '55vw' : '60vw' }}>
          {sortedPlayers.slice(0, 3).map((player) => (
            <div key={player.uid} style={{ textAlign: 'center', minWidth: isMobile ? '60px' : '80px' }}>
              <div style={{ fontSize: isMobile ? '0.75rem' : '0.8rem', color: '#ccc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {player.uid === userProfile.uid ? 'You' : player.displayName}
              </div>
              <div style={{ fontSize: isMobile ? '1rem' : '1.2rem', fontWeight: 'bold', color: player.uid === userProfile.uid ? 'var(--primary-color)' : 'white' }}>
                {player.score}
              </div>
            </div>
          ))}
          {sortedPlayers.length > 3 && (
            <div style={{ textAlign: 'center', minWidth: '40px', display: 'flex', alignItems: 'center', color: '#ccc', fontSize: isMobile ? '0.8rem' : '1rem' }}>
              +{sortedPlayers.length - 3}
            </div>
          )}
        </div>
      </div>

      {isMultipleChoice ? (
        <div 
          className="mc-desktop-panel"
          style={{
            position: 'absolute',
            bottom: isMobile ? '15px' : '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '95%',
            maxWidth: isMobile ? '500px' : '800px',
            zIndex: 1000
          }}
        >
          <div className="glass-panel" style={{ padding: isMobile ? '10px' : '1.5rem', background: 'rgba(20,20,20,0.85)', borderRadius: '24px' }}>
            {myData.ready ? (
              <h3 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1.2rem', color: 'var(--primary-color)' }}>
                Waiting for other players...
              </h3>
            ) : (
              !isMobile && <h3 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1.2rem', color: '#ccc' }}>Where are we?</h3>
            )}
            <div style={{
              display: isMobile ? 'grid' : 'flex',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'none',
              gap: isMobile ? '6px' : '1rem',
              width: '100%'
            }}>
              {matchData.locationOptions?.map((opt, i) => {
                const isSelected = myData.ready;
                const isCorrect = opt.iso === matchData.location.iso;
                const isMyGuess = myData.lastGuess?.choice === opt.country;
                
                let btnStyle = {
                  flex: 1,
                  padding: isMobile ? '10px' : '1.2rem',
                  fontSize: isMobile ? '0.85rem' : '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  minHeight: isMobile ? '45px' : '60px',
                  background: 'rgba(30, 30, 30, 0.75)',
                  border: '2px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  color: 'white',
                  backdropFilter: 'blur(5px)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  cursor: isSelected ? 'default' : 'pointer'
                };

                if (isSelected) {
                  if (isCorrect) {
                    btnStyle.background = 'var(--success-color)';
                    btnStyle.borderColor = 'var(--success-color)';
                  } else if (isMyGuess) {
                    btnStyle.background = 'var(--error-color)';
                    btnStyle.borderColor = 'var(--error-color)';
                  } else {
                    btnStyle.opacity = 0.5;
                  }
                }

                return (
                  <button
                    key={i}
                    className="btn"
                    style={btnStyle}
                    onClick={() => handleChoiceGuess(opt.iso, opt.country)}
                    disabled={isSelected}
                  >
                    <img src={`https://flagcdn.com/w40/${opt.iso}.png`} width={isMobile ? "20" : "30"} alt={opt.country} />
                    <span>{opt.country}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        !myData.ready ? (
          <GuessingMap onGuess={handleMapGuess} country={matchData.options?.country} />
        ) : (
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.8)', padding: '15px 30px', borderRadius: '12px', zIndex: 10 }}>
            <h3 style={{ color: 'var(--primary-color)', margin: 0, padding: 0 }}>Waiting for others...</h3>
            <div style={{ fontSize: '0.9rem', color: '#ccc', marginTop: '5px' }}>
              {Object.values(matchData.players).filter(p => p.ready).length} / {Object.keys(matchData.players).length} guessed
            </div>
          </div>
        )
      )}
      
      <PartyChat gameId={gameId} matchData={matchData} />
    </div>
  );
}
