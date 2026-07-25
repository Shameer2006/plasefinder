'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useGameStore } from '@/lib/store';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import PanoramaViewer from './PanoramaViewer';
import dynamic from 'next/dynamic';

const GuessingMap = dynamic(() => import('./GuessingMap'), { ssr: false });
import ResultScreen from './ResultScreen';

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
  const [hasGuessed, setHasGuessed] = useState(false);
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
      import('@/lib/locationManager').then(({ getRandomLocation }) => {
        const loc = getRandomLocation('HARD');
        updateDoc(doc(db, 'matches', gameId), {
          location: loc,
          status: 'playing',
          round: 1
        });
      });
    }
  }, [matchData, userProfile, gameId]);

  if (!matchData || !userProfile) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '2rem' }}>Loading Match...</div>;
  }

  const myData = matchData.players[userProfile.uid];
  const opponentId = Object.keys(matchData.players).find(id => id !== userProfile.uid);
  const opponentData = matchData.players[opponentId];
  
  const handleMapGuess = async (lat, lng) => {
    if (hasGuessed || matchData.status !== 'playing') return;
    
    const loc = matchData.location;
    const distance = calculateDistance(lat, lng, loc.lat, loc.lng);
    const points = Math.max(0, Math.round(5000 * Math.exp(-distance / 2000)));

    setHasGuessed(true);
    setLastGuessDistance(Math.round(distance));
    setRoundPoints(points);

    // Record guess in Firestore
    await updateDoc(doc(db, 'matches', gameId), {
      [`players.${userProfile.uid}.score`]: myData.score + points,
      [`players.${userProfile.uid}.ready`]: true
    });
  };

  const isRoundOver = matchData.players[userProfile.uid].ready && matchData.players[opponentId].ready;

  const startNextRound = async () => {
    if (!userProfile) return;
    const playerIds = Object.keys(matchData.players);
    const isHost = playerIds[0] === userProfile.uid;

    if (isHost) {
      if (matchData.round >= 5) {
        // Game Over! Update ELOs in user profiles
        await updateDoc(doc(db, 'matches', gameId), { status: 'finished' });
        
        // Simple ELO update (winner +25, loser -25)
        const myScore = matchData.players[userProfile.uid].score;
        const opScore = matchData.players[opponentId].score;
        
        const myNewElo = myScore >= opScore ? myData.elo + 25 : myData.elo - 25;
        const opNewElo = opScore > myScore ? opponentData.elo + 25 : opponentData.elo - 25;
        
        await updateDoc(doc(db, 'users', userProfile.uid), { elo: Math.max(0, myNewElo) });
        await updateDoc(doc(db, 'users', opponentId), { elo: Math.max(0, opNewElo) });

      } else {
        import('@/lib/locationManager').then(({ getRandomLocation }) => {
          const loc = getRandomLocation('HARD');
          updateDoc(doc(db, 'matches', gameId), {
            location: loc,
            status: 'playing',
            round: matchData.round + 1,
            [`players.${userProfile.uid}.ready`]: false,
            [`players.${opponentId}.ready`]: false
          });
        });
      }
    }
    setHasGuessed(false);
  };

  if (matchData.status === 'finished') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
        <div className="glass-panel" style={{ padding: '3rem', maxWidth: '600px', width: '100%', textAlign: 'center' }}>
          <h2 className="gradient-text glow-text" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Match Finished!</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', margin: '2rem 0' }}>
            <div>
              <h3>You</h3>
              <p style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>{myData.score}</p>
            </div>
            <div>
              <h3>{opponentData.displayName}</h3>
              <p style={{ fontSize: '2rem', color: 'var(--error-color)' }}>{opponentData.score}</p>
            </div>
          </div>
          <button className="btn" onClick={() => setGameState('MENU')}>Return to Menu</button>
        </div>
      </div>
    );
  }

  if (isRoundOver) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
        <div className="glass-panel" style={{ padding: '3rem', maxWidth: '600px', width: '100%', textAlign: 'center' }}>
          <h2 className="gradient-text glow-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Round {matchData.round} Result</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', margin: '2rem 0' }}>
            <div>
              <h3>You</h3>
              <p style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>+{roundPoints}</p>
              <p>({myData.score} Total)</p>
            </div>
            <div>
              <h3>{opponentData.displayName}</h3>
              <p style={{ fontSize: '2rem', color: 'var(--error-color)' }}>({opponentData.score} Total)</p>
            </div>
          </div>
          <p style={{ marginBottom: '2rem' }}>Distance: {lastGuessDistance} km</p>
          <button className="btn" onClick={startNextRound}>
            {matchData.round < 5 ? 'Next Round' : 'Finish Game'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', position: 'relative' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <PanoramaViewer />
      </div>

      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.8)',
        padding: '10px 20px',
        borderRadius: '20px',
        display: 'flex',
        gap: '2rem',
        zIndex: 10,
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: '#ccc' }}>You ({myData.elo})</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{myData.score}</div>
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: '800', opacity: 0.5 }}>R{matchData.round}/5</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: '#ccc' }}>{opponentData.displayName} ({opponentData.elo})</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--error-color)' }}>{opponentData.score}</div>
        </div>
      </div>

      {hasGuessed ? (
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.8)', padding: '15px 30px', borderRadius: '12px', zIndex: 10 }}>
          <h3 style={{ color: 'var(--primary-color)' }}>Waiting for opponent...</h3>
        </div>
      ) : (
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '400px', height: '300px', zIndex: 10, borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <GuessingMap onGuess={handleMapGuess} />
        </div>
      )}
    </div>
  );
}
