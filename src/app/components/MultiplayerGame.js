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

  const difficulty = matchData.options?.difficulty || 'Medium';
  const isMultipleChoice = difficulty === 'Easy' || (difficulty === 'Medium' && matchData.round % 2 === 1);

  const isRoundOver = Object.values(matchData.players).every(p => p.ready);

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
          const opNewElo = opScore > myScore ? opponentData.elo + 25 : opponentData.elo - 25;
          
          await updateDoc(doc(db, 'users', userProfile.uid), { elo: Math.max(0, myNewElo) });
          await updateDoc(doc(db, 'users', opponentId), { elo: Math.max(0, opNewElo) });
        }
      } else {
        import('@/lib/locationManager').then(({ fetchRandomLocation }) => {
          fetchRandomLocation(matchData.options || {}).then(({ location, options }) => {
            const updates = {
              location: location,
              locationOptions: options,
              status: 'playing',
              round: matchData.round + 1,
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
          <button className="btn" onClick={() => setGameState('MENU')}>Return to Menu</button>
        </div>
        <PartyChat gameId={gameId} matchData={matchData} />
      </div>
    );
  }

  const [showMapOnly, setShowMapOnly] = useState(false);

  useEffect(() => {
    if (isRoundOver && !isMultipleChoice) {
      setShowMapOnly(true);
      const timer = setTimeout(() => setShowMapOnly(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isRoundOver, isMultipleChoice]);

  if (isRoundOver) {
    if (showMapOnly) {
      return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
          <ResultsMap location={matchData.location} players={Object.values(matchData.players)} />
          <div style={{ position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.8)', padding: '1rem 2rem', borderRadius: '50px', zIndex: 1000 }}>
            <h2 style={{ color: 'white', margin: 0 }}>Reviewing Map...</h2>
          </div>
        </div>
      );
    }

    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {/* Background Map */}
        {!isMultipleChoice && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, filter: 'brightness(0.4)' }}>
            <ResultsMap location={matchData.location} players={Object.values(matchData.players)} />
          </div>
        )}
        
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
      <div style={{ flex: 1, position: 'relative' }}>
        <PanoramaViewer />
      </div>

      <div className="hud-center" style={{ 
        background: 'rgba(0,0,0,0.8)',
        padding: '10px 20px',
        borderRadius: '20px',
        zIndex: 10,
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '800', opacity: 0.5 }}>R{matchData.round}/{matchData.options?.rounds || 5}</div>
        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', maxWidth: '60vw' }}>
          {sortedPlayers.slice(0, 3).map((player) => (
            <div key={player.uid} style={{ textAlign: 'center', minWidth: '80px' }}>
              <div style={{ fontSize: '0.8rem', color: '#ccc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {player.uid === userProfile.uid ? 'You' : player.displayName}
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: player.uid === userProfile.uid ? 'var(--primary-color)' : 'white' }}>
                {player.score}
              </div>
            </div>
          ))}
          {sortedPlayers.length > 3 && (
            <div style={{ textAlign: 'center', minWidth: '40px', display: 'flex', alignItems: 'center', color: '#ccc' }}>
              +{sortedPlayers.length - 3}
            </div>
          )}
        </div>
      </div>

      {!myData.ready ? (
        isMultipleChoice ? (
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '90%',
            maxWidth: '500px',
            zIndex: 10
          }}>
            {matchData.locationOptions?.map((opt, i) => (
              <button
                key={i}
                className="btn"
                style={{
                  padding: '15px',
                  fontSize: '1.2rem',
                  background: 'rgba(0,0,0,0.8)',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  width: '100%',
                  backdropFilter: 'blur(5px)'
                }}
                onClick={() => handleChoiceGuess(opt.iso, opt.country)}
              >
                {opt.country}
              </button>
            ))}
          </div>
        ) : (
          <GuessingMap onGuess={handleMapGuess} country={matchData.options?.country} />
        )
      ) : (
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.8)', padding: '15px 30px', borderRadius: '12px', zIndex: 10 }}>
          <h3 style={{ color: 'var(--primary-color)', margin: 0, padding: 0 }}>Waiting for others...</h3>
          <div style={{ fontSize: '0.9rem', color: '#ccc', marginTop: '5px' }}>
            {Object.values(matchData.players).filter(p => p.ready).length} / {Object.keys(matchData.players).length} guessed
          </div>
        </div>
      )}
      
      <PartyChat gameId={gameId} matchData={matchData} />
    </div>
  );
}
