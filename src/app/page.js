'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useGameStore } from '@/lib/store';
import { updateDailyChallengeStreak } from '@/lib/userProfile';
import { getCountFromServer, collection, doc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Game from './components/Game';
import FlagGame from './components/FlagGame';
import dynamic from 'next/dynamic';
import PartyLobby from './components/PartyLobby';

const MultiplayerGame = dynamic(() => import('./components/MultiplayerGame'), { ssr: false });

export default function Home() {
  const { user, userProfile, loading, loginWithGoogle, logout } = useAuth();
  const { gameState, setGameState, setDifficulty } = useGameStore();
  const [isQueuing, setIsQueuing] = useState(false);
  const [queueSub, setQueueSub] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [joinError, setJoinError] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [streak, setStreak] = useState(0);
  const [playedToday, setPlayedToday] = useState(false);
  const [onlineCount, setOnlineCount] = useState('...');

  useEffect(() => {
    // Simulated online count between 3500 and 4000
    let currentCount = Math.floor(Math.random() * (4000 - 3500 + 1)) + 3500;
    setOnlineCount(currentCount);
    let timeoutId;

    const fluctuateCount = () => {
      // Random change between -15 and +15
      const change = Math.floor(Math.random() * 31) - 15;
      currentCount = currentCount + change;
      
      // Keep it within bounds
      if (currentCount < 3500) currentCount = 3500;
      if (currentCount > 4000) currentCount = 4000;
      
      setOnlineCount(currentCount);

      // Schedule next update between 1.5s and 7s
      const nextDelay = Math.floor(Math.random() * 5500) + 1500;
      timeoutId = setTimeout(fluctuateCount, nextDelay);
    };

    // Start the fluctuation
    const initialDelay = Math.floor(Math.random() * 5500) + 1500;
    timeoutId = setTimeout(fluctuateCount, initialDelay);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!userProfile) {
      setStreak(0);
      setPlayedToday(false);
      return;
    }

    // Initialize Streak from userProfile
    const lastPlayed = userProfile.lastDailyChallengeDate;
    const currentStreak = userProfile.dailyChallengeStreak || 0;
    const today = new Date().toDateString();

    if (lastPlayed) {
      const lastDate = new Date(lastPlayed);
      const todayDate = new Date(today);
      const diffTime = Math.abs(todayDate - lastDate);
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (diffDays === 0) {
        setPlayedToday(true);
        setStreak(currentStreak);
      } else if (diffDays === 1) {
        setStreak(currentStreak);
      } else {
        setStreak(0);
        if (currentStreak > 0) {
          updateDailyChallengeStreak(userProfile.uid, 0, lastPlayed);
        }
      }
    } else {
      setStreak(currentStreak);
    }
  }, [userProfile]);


  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '2rem' }}>Loading...</div>;

  if (gameState.startsWith('MULTIPLAYER_')) {
    const gameId = gameState.replace('MULTIPLAYER_', '');
    return <MultiplayerGame gameId={gameId} />;
  }
  
  if (gameState.startsWith('PARTY_LOBBY_')) {
    const gameId = gameState.replace('PARTY_LOBBY_', '');
    return <PartyLobby gameId={gameId} />;
  }

  if (gameState === 'FLAG_GAME') {
    return <FlagGame onReturnToMenu={() => setGameState('MENU')} />;
  }

  if (gameState !== 'MENU') {
    return <Game />;
  }

  const handleStart = (mode) => {
    setDifficulty(mode);
    setGameState('LOADING');
  };

  const startMatchmaking = async () => {
    if (!userProfile) return alert("Please login first to play multiplayer!");
    
    const { joinQueue, leaveQueue } = await import('@/lib/matchmaking');
    setIsQueuing(true);
    
    const result = await joinQueue(userProfile, (gameId) => {
      setIsQueuing(false);
      setGameState(`MULTIPLAYER_${gameId}`);
    });

    if (result && result.unsubscribe) {
      setQueueSub(() => () => {
        result.unsubscribe();
        leaveQueue(userProfile.uid);
      });
    }
  };

  const cancelMatchmaking = () => {
    if (queueSub) {
      queueSub();
      setQueueSub(null);
    }
    setIsQueuing(false);
  };

  const handleCreateParty = async () => {
    if (!userProfile) return alert("Please login first to create a party!");
    const { createParty } = await import('@/lib/matchmaking');
    try {
      const gameId = await createParty(userProfile);
      if (gameId) {
        setGameState(`PARTY_LOBBY_${gameId}`);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to create party.");
    }
  };

  const handleJoinPartySubmit = async (e) => {
    e.preventDefault();
    if (!userProfile) return alert("Please login first to join a party!");
    if (joinCode.length !== 6) return setJoinError('Code must be 6 characters');
    
    setIsJoining(true);
    setJoinError('');
    const { joinParty } = await import('@/lib/matchmaking');
    try {
      const gameId = await joinParty(userProfile, joinCode);
      if (gameId) {
        setShowJoinModal(false);
        setGameState(`PARTY_LOBBY_${gameId}`);
      }
    } catch (e) {
      console.error(e);
      setJoinError(e.message || 'Failed to join party.');
    } finally {
      setIsJoining(false);
    }
  };

  const handleDailyChallenge = async () => {
    if (!userProfile) {
      alert("You must sign in to play the Daily Challenge!");
      return;
    }
    if (playedToday) {
      alert("You already played the daily challenge today! Come back tomorrow.");
      return;
    }
    
    const today = new Date().toDateString();
    const newStreak = streak + 1;
    
    // Update state & Firestore
    setStreak(newStreak);
    setPlayedToday(true);
    await updateDailyChallengeStreak(userProfile.uid, newStreak, today);
    
    handleStart('HARD'); // Start game
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundImage: 'url(/bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden',
      color: 'white'
    }}>
      {/* Left Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, bottom: 0,
        width: '60%',
        background: 'linear-gradient(to right, rgba(80, 10, 10, 0.95) 0%, rgba(80, 10, 10, 0.8) 40%, transparent 100%)',
        zIndex: 1
      }}></div>

      {/* Main Content Container (z-index 2) */}
      <div style={{ position: 'relative', zIndex: 2, padding: '3rem', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        {/* Top Right Controls */}
        <div style={{ position: 'absolute', top: '2rem', right: '2rem', display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
          <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
            <span>Maps</span>
          </button>
          
          {(!user || user.isAnonymous) ? (
            <button className="btn" style={{ background: '#2f7a44', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '6px' }} onClick={loginWithGoogle}>
              <span style={{ fontWeight: 'bold' }}>G</span> Login
            </button>
          ) : (
            <img 
              src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
              alt="Profile"
              onClick={() => setShowProfile(true)}
              style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', border: '2px solid rgba(255,255,255,0.2)', objectFit: 'cover' }}
              className="menu-item-hover"
            />
          )}
        </div>

        {/* Left Menu Area */}
        <div style={{ marginTop: '2rem', maxWidth: '400px' }}>
          {showSettings ? (
            <SettingsMenu onBack={() => setShowSettings(false)} />
          ) : showProfile ? (
            <ProfileMenu onBack={() => setShowProfile(false)} userProfile={userProfile} logout={logout} />
          ) : showDifficulty ? (
            <DifficultyMenu onBack={() => setShowDifficulty(false)} onSelect={handleStart} />
          ) : (
            <MainMenu 
              onSingleplayer={() => setShowDifficulty(true)} 
              onFindMatch={startMatchmaking} 
              isQueuing={isQueuing} 
              cancelMatchmaking={cancelMatchmaking} 
              onDailyChallenge={handleDailyChallenge}
              streak={streak}
              playedToday={playedToday}
              onFlagGuesser={() => setGameState('FLAG_GAME')}
              onCreateParty={handleCreateParty}
              onJoinParty={() => setShowJoinModal(true)}
            />
          )}
        </div>

        {/* Bottom Area */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
          {/* Left icons */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <IconButton 
              icon={<img src="/settings.png" alt="Settings" style={{ width: '24px', height: '24px' }} />} 
              color="#7f1d1d" 
              onClick={() => setShowSettings(true)} 
            />
          </div>

          {/* Right online count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }}></div>
             <span style={{ fontWeight: 'bold', fontSize: '1.3rem', textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>{onlineCount} online</span>
          </div>
        </div>
      </div>

      {/* Join Party Modal */}
      {showJoinModal && (
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', zIndex: 50 }}>
          <div className="glass-panel" style={{ padding: '2rem', width: '90%', maxWidth: '400px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Join Party</h2>
            <form onSubmit={handleJoinPartySubmit}>
              <input 
                type="text" 
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="Enter 6-digit code"
                maxLength={6}
                style={{ width: '100%', padding: '10px', fontSize: '1.2rem', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '4px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', marginBottom: '1rem' }}
              />
              {joinError && <div style={{ color: '#f87171', marginBottom: '1rem', textAlign: 'center' }}>{joinError}</div>}
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.1)' }} onClick={() => setShowJoinModal(false)}>Cancel</button>
                <button type="submit" className="btn" style={{ flex: 1 }} disabled={isJoining}>{isJoining ? 'Joining...' : 'Join'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

const MainMenu = ({ onSingleplayer, onFindMatch, isQueuing, cancelMatchmaking, onDailyChallenge, streak, playedToday, onFlagGuesser, onCreateParty, onJoinParty }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>LostStreet</h1>
    <div style={{ height: '2px', background: 'white', width: '100%', marginBottom: '0.5rem' }}></div>
    
    <MenuItem text="Singleplayer" onClick={onSingleplayer} />
    {isQueuing ? (
      <MenuItem text="Cancel Matchmaking..." onClick={cancelMatchmaking} />
    ) : (
      <MenuItem text="Find a Match" onClick={onFindMatch} />
    )}
    
    <div style={{ height: '2px', background: 'white', width: '100%', margin: '0.5rem 0' }}></div>
    
    <MenuItem text="Create Party" onClick={onCreateParty} />
    <MenuItem text="Join Party" onClick={onJoinParty} />
    <MenuItem text="Flag Guesser" onClick={onFlagGuesser} />

    
    <div style={{ height: '2px', background: 'white', width: '100%', margin: '0.5rem 0' }}></div>
    
    <div onClick={onDailyChallenge} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: playedToday ? 'not-allowed' : 'pointer', fontSize: '1.2rem', fontWeight: '600', opacity: playedToday ? 0.6 : 1 }} className={playedToday ? "" : "menu-item-hover"}>
      Daily Challenge 
      <span style={{ background: '#fb923c', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold', marginLeft: '0.5rem', display: 'flex', alignItems: 'center', boxShadow: '0 0 12px rgba(251, 146, 60, 0.8)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '2px' }}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
        {streak} day{streak !== 1 ? 's' : ''}
      </span>
    </div>
  </div>
);

const SettingsMenu = ({ onBack }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>Settings</h1>
    <div style={{ height: '2px', background: 'white', width: '100%', marginBottom: '0.5rem' }}></div>
    
    <div style={{ color: '#fca5a5', fontSize: '1.2rem', cursor: 'pointer', fontWeight: '600', marginBottom: '1rem' }} onClick={onBack}>
      Back
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '180px' }}>Units:</span>
        <select style={{ padding: '4px', borderRadius: '4px', color: 'black', width: '150px' }}>
          <option>Metric (km)</option>
          <option>Imperial (mi)</option>
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '180px' }}>Map Type:</span>
        <select style={{ padding: '4px', borderRadius: '4px', color: 'black', width: '150px' }}>
          <option>Normal</option>
          <option>Satellite</option>
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '180px' }}>Language:</span>
        <select style={{ padding: '4px', borderRadius: '4px', color: 'black', width: '150px' }}>
          <option>English</option>
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '180px' }}>Show RAM Usage</span>
        <input type="checkbox" style={{ transform: 'scale(1.2)' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '300px' }}>Multiplayer emote reactions</span>
        <input type="checkbox" defaultChecked style={{ transform: 'scale(1.2)' }} />
      </div>
    </div>
  </div>
);

const ProfileMenu = ({ onBack, userProfile, logout }) => {
  if (!userProfile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>Account Profile</h1>
        <div style={{ height: '2px', background: 'white', width: '100%', marginBottom: '0.5rem' }}></div>
        <div style={{ color: '#fca5a5', fontSize: '1.2rem', cursor: 'pointer', fontWeight: '600', marginBottom: '1rem' }} onClick={onBack}>
          Back
        </div>
        <div style={{ fontSize: '1.2rem', textAlign: 'center', marginTop: '2rem', background: 'rgba(0,0,0,0.5)', padding: '2rem', borderRadius: '12px' }}>
          You must be logged in to view your profile!
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>{userProfile.displayName}'s Profile</h1>
      <div style={{ height: '2px', background: 'white', width: '100%', marginBottom: '0.5rem' }}></div>
      
      <div style={{ color: '#fca5a5', fontSize: '1.2rem', cursor: 'pointer', fontWeight: '600', marginBottom: '1rem' }} onClick={onBack}>
        Back
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '1rem',
        background: 'rgba(0,0,0,0.4)',
        padding: '1.5rem',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <ProfileStat 
          label={<><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg> ELO Rating</>} 
          value={userProfile.elo} 
        />
        <ProfileStat 
          label={<><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Total XP</>} 
          value={userProfile.totalXp} 
        />
        <ProfileStat 
          label={<><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}><path d="M14.5 4h5v5"></path><polyline points="19.5 4 12 11.5 8 7.5 2 13.5"></polyline></svg> Duels Won</>} 
          value={userProfile.duels_wins} 
        />
        <ProfileStat 
          label={<><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Duels Lost</>} 
          value={userProfile.duels_losses} 
        />
        <ProfileStat 
          label={<><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg> Daily Streak</>} 
          value={userProfile.dailyChallengeStreak || 0} 
        />
        <ProfileStat 
          label={<><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Joined</>} 
          value={new Date(userProfile.createdAt).toLocaleDateString()} 
        />
      </div>

      <button className="btn" style={{ background: '#b91c1c', marginTop: '1rem', padding: '12px', borderRadius: '8px', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} onClick={logout}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        Log Out
      </button>
    </div>
  );
};

const ProfileStat = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
    <span style={{ fontSize: '0.9rem', color: '#9ca3af', display: 'flex', alignItems: 'center' }}>{label}</span>
    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</span>
  </div>
);

const MenuItem = ({ text, onClick }) => (
  <div onClick={onClick} style={{ fontSize: '1.3rem', fontWeight: '600', cursor: 'pointer' }} className="menu-item-hover">
    {text}
  </div>
);

const IconButton = ({ icon, color, onClick }) => (
  <button onClick={onClick} style={{ 
    width: '40px', height: '40px', 
    borderRadius: '8px', 
    background: color, 
    border: 'none', 
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    fontSize: '1.2rem', cursor: 'pointer', color: 'white'
  }} className="btn">
    {icon}
  </button>
);

const DifficultyMenu = ({ onBack, onSelect }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>Select Difficulty</h1>
    <div style={{ height: '2px', background: 'white', width: '100%', marginBottom: '0.5rem' }}></div>
    <div style={{ color: '#fca5a5', fontSize: '1.2rem', cursor: 'pointer', fontWeight: '600', marginBottom: '1rem' }} onClick={onBack}>
      Back
    </div>
    
    <MenuItem text="Easy (Multiple Choice)" onClick={() => onSelect('EASY')} />
    <MenuItem text="Medium (Mixed)" onClick={() => onSelect('MEDIUM')} />
    <MenuItem text="Hard (Map Pinning)" onClick={() => onSelect('HARD')} />
  </div>
);
