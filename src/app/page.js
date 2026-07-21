'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useGameStore } from '@/lib/store';
import { updateDailyChallengeStreak } from '@/lib/userProfile';
import { getCountFromServer, collection, doc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import dynamic from 'next/dynamic';
import PartyLobby from './components/PartyLobby';
import Spinner from './components/Spinner';
import { useToast } from './components/Toast';
import { sounds } from '@/lib/sounds';
import ProfileModal from './components/ProfileModal';
import OnboardingModal from './components/OnboardingModal';

const Game = dynamic(() => import('./components/Game'), { ssr: false, loading: () => <Spinner text="Loading game..." /> });
const FlagGame = dynamic(() => import('./components/FlagGame'), { ssr: false, loading: () => <Spinner text="Loading game..." /> });
const MultiplayerGame = dynamic(() => import('./components/MultiplayerGame'), { ssr: false });

export default function Home() {
  const { user, userProfile, loading, loginWithGoogle, logout } = useAuth();
  const { gameState, setGameState, setDifficulty, soundEnabled, setSoundEnabled, initSounds, units, setUnits, mapType, setMapType, emotesEnabled, setEmotesEnabled } = useGameStore();
  const [isQueuing, setIsQueuing] = useState(false);
  const [queueSub, setQueueSub] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showObjectives, setShowObjectives] = useState(false);
  const [showMatchmaking, setShowMatchmaking] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [joinError, setJoinError] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [streak, setStreak] = useState(0);
  const [playedToday, setPlayedToday] = useState(false);
  const [onlineCount, setOnlineCount] = useState('...');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [matchFoundData, setMatchFoundData] = useState(null);
  const toast = useToast();

  // Browser history integration (#8)
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && (
          ['MENU', 'LOADING', 'EXPLORING', 'RESULT', 'FLAG_GAME'].includes(hash) ||
          hash.startsWith('MULTIPLAYER_') ||
          hash.startsWith('PARTY_LOBBY_')
      )) {
        setGameState(hash);
      } else if (!hash) {
        setGameState('MENU');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setGameState]);

  useEffect(() => {
    if (gameState !== 'MENU') {
      window.history.pushState({ gameState }, '', `#${gameState}`);
    } else {
      window.history.pushState({ gameState: 'MENU' }, '', window.location.pathname);
    }
  }, [gameState]);

  useEffect(() => {
    let currentCount = Math.floor(Math.random() * (4000 - 3500 + 1)) + 3500;
    setOnlineCount(currentCount);
    let timeoutId;

    const fluctuateCount = () => {
      const change = Math.floor(Math.random() * 31) - 15;
      currentCount = currentCount + change;
      if (currentCount < 3500) currentCount = 3500;
      if (currentCount > 4000) currentCount = 4000;
      setOnlineCount(currentCount);
      const nextDelay = Math.floor(Math.random() * 5500) + 1500;
      timeoutId = setTimeout(fluctuateCount, nextDelay);
    };

    const initialDelay = Math.floor(Math.random() * 5500) + 1500;
    timeoutId = setTimeout(fluctuateCount, initialDelay);
    initSounds();

    return () => clearTimeout(timeoutId);
  }, [initSounds]);

  useEffect(() => {
    if (!userProfile) {
      setStreak(0);
      setPlayedToday(false);
      return;
    }

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

  if (loading) return <Spinner text="Loading LostStreet..." />;

  if (matchFoundData) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(10, 10, 26, 0.95)', backdropFilter: 'blur(15px)' }}>
        <style>{`
          @keyframes clash-left {
            0% { transform: translateX(-100vw) rotate(-10deg); opacity: 0; }
            100% { transform: translateX(0) rotate(0deg); opacity: 1; }
          }
          @keyframes clash-right {
            0% { transform: translateX(100vw) rotate(10deg); opacity: 0; }
            100% { transform: translateX(0) rotate(0deg); opacity: 1; }
          }
          @keyframes vs-pop {
            0% { transform: scale(0.1) rotate(-20deg); opacity: 0; }
            50% { transform: scale(1.5) rotate(10deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
        `}</style>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', margin: '0 auto', maxWidth: '800px' }}>
          <div style={{ animation: 'clash-left 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards', textAlign: 'center' }}>
            <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid var(--primary-color)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }} />
            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'white' }}>{user.displayName}</h3>
          </div>
          <div style={{ animation: 'vs-pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 0.3s', opacity: 0, fontSize: '4rem', fontWeight: '900', fontStyle: 'italic', background: 'linear-gradient(to bottom, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            VS
          </div>
          <div style={{ animation: 'clash-right 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards', textAlign: 'center' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239, 68, 68, 0.2)', boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)' }}>
              <span style={{ fontSize: '4rem' }}>?</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'white' }}>Opponent</h3>
          </div>
        </div>
        <h2 style={{ animation: 'fade-in 0.5s ease forwards 1s', opacity: 0, marginTop: '3rem', color: '#ccc', fontSize: '1.2rem', letterSpacing: '2px' }}>PREPARING MATCH...</h2>
      </div>
    );
  }

  if (gameState.startsWith('MULTIPLAYER_')) {
    const gameId = gameState.replace('MULTIPLAYER_', '');
    return <div className="game-area"><MultiplayerGame gameId={gameId} /></div>;
  }
  
  if (gameState.startsWith('PARTY_LOBBY_')) {
    const gameId = gameState.replace('PARTY_LOBBY_', '');
    return <div className="game-area"><PartyLobby gameId={gameId} /></div>;
  }

  if (gameState === 'FLAG_GAME') {
    return <div className="game-area"><FlagGame onReturnToMenu={() => setGameState('MENU')} /></div>;
  }

  if (gameState !== 'MENU') {
    return <div className="game-area"><Game /></div>;
  }

  const handleStart = (mode) => {
    setDifficulty(mode);
    setGameState('LOADING');
  };

  const startMatchmaking = async (type = 'unranked') => {
    if (!userProfile) {
      toast.error("Please login first to play multiplayer!");
      return;
    }
    
    const { joinRankedQueue, leaveRankedQueue, joinUnrankedQueue, leaveUnrankedQueue } = await import('@/lib/matchmaking');
    setIsQueuing(true);
    toast.info(`Searching for an opponent... (${type})`);
    
    const joinQueue = type === 'ranked' ? joinRankedQueue : joinUnrankedQueue;
    const leaveQueue = type === 'ranked' ? leaveRankedQueue : leaveUnrankedQueue;

    const result = await joinQueue(userProfile, (gameId) => {
      setIsQueuing(false);
      sounds.playMatchFound();
      toast.success("Match found!");
      setMatchFoundData({ gameId, type });
      setTimeout(() => {
        setMatchFoundData(null);
        setGameState(`MULTIPLAYER_${gameId}`);
      }, 2500); // Wait 2.5 seconds to show the VS screen
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
    toast.info("Matchmaking cancelled.");
  };

  const handleCreateParty = async () => {
    if (!userProfile) {
      toast.error("Please login first to create a party!");
      return;
    }
    const { createParty } = await import('@/lib/matchmaking');
    try {
      const gameId = await createParty(userProfile);
      if (gameId) {
        setGameState(`PARTY_LOBBY_${gameId}`);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to create party.");
    }
  };

  const handleJoinPartySubmit = async (e) => {
    e.preventDefault();
    if (!userProfile) {
      toast.error("Please login first to join a party!");
      return;
    }
    if (joinCode.length !== 6) {
      setJoinError('Code must be 6 characters');
      return;
    }
    
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
      toast.error("You must sign in to play the Daily Challenge!");
      return;
    }
    if (playedToday) {
      toast.warning("You already played the daily challenge today! Come back tomorrow.");
      return;
    }
    
    const today = new Date().toDateString();
    const newStreak = streak + 1;
    
    setStreak(newStreak);
    setPlayedToday(true);
    await updateDailyChallengeStreak(userProfile.uid, newStreak, today);
    
    handleStart('HARD');
  };

  return (
    <main id="main-content" style={{
      height: '100dvh',
      width: '100vw',
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      overflow: 'hidden',
      color: 'white'
    }}>
      <div className="left-gradient-overlay" style={{
        position: 'absolute',
        top: 0, left: 0, bottom: 0,
        zIndex: 1
      }}></div>

      <section className="container-padding" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.5rem' }}>
        
        <div className="top-right-controls">
          <button 
            className="btn" 
            style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => window.location.href = '/chronicles'}
            aria-label="View country chronicles"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
            <span>Maps</span>
          </button>
          
          {(!user || user.isAnonymous) ? (
            <button className="btn" style={{ background: '#2f7a44', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '6px' }} onClick={loginWithGoogle} aria-label="Sign in with Google">
              <span style={{ fontWeight: 'bold' }}>G</span> Login
            </button>
          ) : (
            <button
              onClick={() => setShowProfile(true)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              aria-label="Open profile"
            >
              <img 
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                alt="Profile"
                style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', border: '2px solid rgba(255,255,255,0.2)', objectFit: 'cover' }}
                className="menu-item-hover"
              />
            </button>
          )}
        </div>

        <div className="left-menu-container">
          {showSettings ? (
            <SettingsMenu onBack={() => setShowSettings(false)} units={units} setUnits={setUnits} mapType={mapType} setMapType={setMapType} emotesEnabled={emotesEnabled} setEmotesEnabled={setEmotesEnabled} soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
          ) : showDifficulty ? (
            <DifficultyMenu onBack={() => setShowDifficulty(false)} onSelect={handleStart} />
          ) : showMatchmaking ? (
            <MatchmakingMenu onBack={() => setShowMatchmaking(false)} onSelect={(type) => { setShowMatchmaking(false); startMatchmaking(type); }} />
          ) : (
            <>
              {showOnboarding && (
                <OnboardingTooltip onDismiss={() => setShowOnboarding(false)} />
              )}
              <MainMenu 
                onQuickPlay={() => handleStart('MEDIUM')}
                onSingleplayer={() => setShowDifficulty(true)} 
                onFindMatchClick={() => setShowMatchmaking(true)} 
                isQueuing={isQueuing} 
                cancelMatchmaking={cancelMatchmaking} 
                onDailyChallenge={handleDailyChallenge}
                streak={streak}
                playedToday={playedToday}
                onCreateParty={handleCreateParty}
                onJoinParty={() => setShowJoinModal(true)}
                onLeaderboard={() => window.location.href = '/leaderboard'}
                onAbout={() => window.location.href = '/about'}
              />
            </>
          )}
        </div>

        <div className="bottom-controls">
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <IconButton 
              icon={<img src="/settings.png" alt="Settings" style={{ width: '24px', height: '24px' }} />} 
              color="#7f1d1d" 
              onClick={() => setShowSettings(true)} 
            />
          </div>

          {!showSettings && !showProfile && !showDifficulty && !showMatchmaking && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem 1.5rem', fontSize: '0.9rem', color: '#ffffff', fontWeight: '600', alignItems: 'center', justifyContent: 'center' }}>
               <button onClick={() => window.location.href = '/privacy'} style={{ cursor: 'inherit', textShadow: '1px 1px 3px rgba(0,0,0,0.8)', background: 'none', border: 'none', color: 'inherit', font: 'inherit' }} className="menu-item-hover">Privacy Policy</button>
               <button onClick={() => setShowObjectives(true)} style={{ cursor: 'inherit', textShadow: '1px 1px 3px rgba(0,0,0,0.8)', background: 'none', border: 'none', color: 'inherit', font: 'inherit' }} className="menu-item-hover">Objectives</button>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }}></div>
             <span style={{ fontWeight: 'bold', fontSize: '1.3rem', textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>{onlineCount} online</span>
          </div>
        </div>
      </section>

      {showJoinModal && (
        <FocusTrapModal onClose={() => setShowJoinModal(false)}>
          <div className="glass-panel modal-content" role="dialog" aria-modal="true" aria-label="Join Party">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Join Party</h2>
            <form onSubmit={handleJoinPartySubmit}>
              <input 
                type="text" 
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="Enter 6-digit code"
                maxLength={6}
                aria-label="Party code"
                style={{ width: '100%', padding: '10px', fontSize: '1.2rem', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '4px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', marginBottom: '1rem' }}
              />
              {joinError && <div role="alert" style={{ color: '#f87171', marginBottom: '1rem', textAlign: 'center' }}>{joinError}</div>}
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.1)' }} onClick={() => setShowJoinModal(false)}>Cancel</button>
                <button type="submit" className="btn" style={{ flex: 1 }} disabled={isJoining}>{isJoining ? 'Joining...' : 'Join'}</button>
              </div>
            </form>
          </div>
        </FocusTrapModal>
      )}

      {showObjectives && (
        <FocusTrapModal onClose={() => setShowObjectives(false)}>
          <div className="glass-panel modal-content" role="dialog" aria-modal="true" aria-label="Objectives of the Game" style={{ maxWidth: '600px', width: '90%', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: 'bold', borderBottom: '2px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem' }}>Objectives of the Game</h2>
            <div style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#e5e7eb' }}>
              <p>The main objective is to guess your location as accurately as possible.</p>
              <p>Drop a pin on the map where you think you are! The closer you are to the actual location, the more points you get.</p>
              <p>Compete in multiplayer mode, create parties with friends, or challenge yourself daily to climb the ranks!</p>
            </div>
            <button className="btn" style={{ width: '100%', background: 'rgba(255,255,255,0.1)' }} onClick={() => setShowObjectives(false)}>Close</button>
          </div>
        </FocusTrapModal>
      )}

      {userProfile && !userProfile.onboardingComplete && (
        <OnboardingModal 
          user={user} 
          onComplete={(updates) => {
            // Profile is refreshed automatically if listening, or we can force reload.
            // But AuthContext updates the profile object when we write to Firestore in onboarding.
            // Wait, we exposed setUserProfile in AuthContext. Let's just use it? No, page doesn't have setUserProfile.
            // It will update on next snapshot fetch or we can do nothing since AuthContext handles it.
            window.location.reload(); // Simple solution to force full refresh of stats
          }}
        />
      )}

      {showProfile && (
        <ProfileModal 
          userProfile={userProfile} 
          user={user}
          onClose={() => setShowProfile(false)}
          onProfileUpdate={(updates) => {
             // Let auth context handle it or reload if needed, but since it's an overlay it should be fine.
             // Usually auth context handles snapshot updates.
          }}
        />
      )}

    </main>
  );
}

function FocusTrapModal({ onClose, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const timer = setTimeout(() => {
      const focusable = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) focusable[0].focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} ref={modalRef} tabIndex={-1}>
      {children}
    </div>
  );
}

const OnboardingTooltip = ({ onDismiss }) => (
  <div className="onboarding-tooltip" style={{ marginBottom: '1rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
      <div>
        <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Welcome to LostStreet!</p>
        <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: 1.5 }}>
          Pick a game mode below. In <strong>Singleplayer</strong>, guess locations from street views. 
          In <strong>Multiplayer</strong>, compete against other players. You can also create a <strong>Party</strong> to play with friends!
        </p>
      </div>
      <button 
        onClick={onDismiss} 
        style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '1.2rem', padding: '4px', flexShrink: 0 }}
        aria-label="Dismiss tutorial"
      >
        ✕
      </button>
    </div>
  </div>
);

const MainMenu = ({ onQuickPlay, onSingleplayer, onFindMatchClick, isQueuing, cancelMatchmaking, onDailyChallenge, streak, playedToday, onCreateParty, onJoinParty, onLeaderboard, onAbout }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.25rem, 1vh, 0.55rem)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img src="/logo.png" alt="LostStreet Logo" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
      <h1 className="responsive-title" style={{ fontWeight: 'bold', margin: 0, fontFamily: '"Outfit", sans-serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}>LostStreet</h1>
    </div>
    <p style={{ fontSize: 'clamp(0.78rem, 1.5vw, 0.95rem)', color: '#d1d5db', margin: 0, lineHeight: 1.3 }}>Guess the location. Compete with friends. 100% Free.</p>
    
    <button className="cta-glow-btn" onClick={onQuickPlay} aria-label="Quick Play - start a game instantly">
      ▶ Quick Play
    </button>
    
    <div style={{ height: '1px', background: 'rgba(255,255,255,0.4)', width: '100%' }}></div>
    
    <MenuItem text="Singleplayer" onClick={onSingleplayer} />
    {isQueuing ? (
      <MenuItem text="Cancel Matchmaking..." onClick={cancelMatchmaking} />
    ) : (
      <MenuItem text="Find a Match" onClick={onFindMatchClick} />
    )}
    
    <div style={{ height: '1px', background: 'rgba(255,255,255,0.4)', width: '100%' }}></div>
    
    <MenuItem text="Create Party" onClick={onCreateParty} />
    <MenuItem text="Join Party" onClick={onJoinParty} />
    
    <Link href="/flag-guesser" style={{ textDecoration: 'none', color: 'inherit' }}>
      <button style={{ fontWeight: 'bold', cursor: 'inherit', background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: '2px 0', textAlign: 'left', width: '100%', fontSize: 'clamp(1rem, 2.2vw, 1.2rem)' }} className="menu-item-hover">
        Flag Guesser
      </button>
    </Link>
    
    <div style={{ height: '1px', background: 'rgba(255,255,255,0.4)', width: '100%' }}></div>
    
    <MenuItem text="Leaderboard" onClick={onLeaderboard} />
    <MenuItem text="About" onClick={onAbout} />

    <div style={{ height: '1px', background: 'rgba(255,255,255,0.4)', width: '100%' }}></div>
    
    <button onClick={onDailyChallenge} disabled={playedToday} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: playedToday ? 'not-allowed' : 'inherit', fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', fontWeight: 'bold', opacity: playedToday ? 0.6 : 1, background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: 0 }} className={playedToday ? "" : "menu-item-hover"} aria-label={`Daily Challenge. ${streak} day streak${playedToday ? '. Already played today.' : ''}`}>
      Daily Challenge 
      <span style={{ background: '#fb923c', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', marginLeft: '0.3rem', display: 'flex', alignItems: 'center', boxShadow: '0 0 10px rgba(251, 146, 60, 0.7)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '2px' }}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
        {streak} day{streak !== 1 ? 's' : ''}
      </span>
    </button>

    <div style={{ marginTop: 'clamp(0.3rem, 1vh, 0.8rem)' }}>
      <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#9ca3af', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Featured History
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <Link href="/chronicles/in" style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.08)', borderRadius: '20px', fontSize: '0.95rem', color: 'white', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }} className="menu-item-hover">India</Link>
        <Link href="/chronicles/bn" style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.08)', borderRadius: '20px', fontSize: '0.95rem', color: 'white', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }} className="menu-item-hover">Brunei</Link>
        <Link href="/chronicles/de" style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.08)', borderRadius: '20px', fontSize: '0.95rem', color: 'white', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }} className="menu-item-hover">Germany</Link>
        <Link href="/chronicles/ng" style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.08)', borderRadius: '20px', fontSize: '0.95rem', color: 'white', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }} className="menu-item-hover">Nigeria</Link>
      </div>
    </div>
  </div>
);

const SettingsMenu = ({ onBack, units, setUnits, mapType, setMapType, emotesEnabled, setEmotesEnabled, soundEnabled, setSoundEnabled }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h1 className="responsive-subtitle" style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>Settings</h1>
      <div style={{ height: '2px', background: 'white', width: '100%', marginBottom: '0.5rem' }}></div>
      
      <button style={{ color: '#fca5a5', fontSize: '1.2rem', cursor: 'pointer', fontWeight: '600', marginBottom: '1rem', background: 'none', border: 'none', font: 'inherit', padding: 0, textAlign: 'left' }} onClick={onBack}>
        Back
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ width: '180px' }}>Units:</span>
          <select value={units} onChange={(e) => setUnits(e.target.value)} style={{ padding: '4px', borderRadius: '4px', color: 'black', width: '150px' }}>
            <option value="metric">Metric (km)</option>
            <option value="imperial">Imperial (mi)</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ width: '180px' }}>Map Type:</span>
          <select value={mapType} onChange={(e) => setMapType(e.target.value)} style={{ padding: '4px', borderRadius: '4px', color: 'black', width: '150px' }}>
            <option value="normal">Normal</option>
            <option value="satellite">Satellite</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ width: '180px' }}>Sound Effects:</span>
          <input 
            type="checkbox" 
            checked={soundEnabled} 
            onChange={(e) => setSoundEnabled(e.target.checked)} 
            style={{ transform: 'scale(1.2)' }} 
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ width: '300px' }}>Multiplayer emote reactions</span>
          <input type="checkbox" checked={emotesEnabled} onChange={(e) => setEmotesEnabled(e.target.checked)} style={{ transform: 'scale(1.2)' }} />
        </div>
      </div>
    </div>
  );
};

const ProfileMenu = ({ onBack, userProfile, logout }) => {
  if (!userProfile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h1 className="responsive-subtitle" style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>Account Profile</h1>
        <div style={{ height: '2px', background: 'white', width: '100%', marginBottom: '0.5rem' }}></div>
        <button style={{ color: '#fca5a5', fontSize: '1.2rem', cursor: 'pointer', fontWeight: '600', marginBottom: '1rem', background: 'none', border: 'none', font: 'inherit', padding: 0, textAlign: 'left' }} onClick={onBack}>
          Back
        </button>
        <div style={{ fontSize: '1.2rem', textAlign: 'center', marginTop: '2rem', background: 'rgba(0,0,0,0.5)', padding: '2rem', borderRadius: '12px' }}>
          You must be logged in to view your profile!
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h1 className="responsive-subtitle" style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>{userProfile.displayName}'s Profile</h1>
      <div style={{ height: '2px', background: 'white', width: '100%', marginBottom: '0.5rem' }}></div>
      
      <button style={{ color: '#fca5a5', fontSize: '1.2rem', cursor: 'pointer', fontWeight: '600', marginBottom: '1rem', background: 'none', border: 'none', font: 'inherit', padding: 0, textAlign: 'left' }} onClick={onBack}>
        Back
      </button>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
        gap: '1rem',
        background: 'rgba(0,0,0,0.4)',
        padding: '1rem',
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
  <button onClick={onClick} style={{ fontWeight: 'bold', cursor: 'inherit', background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: '2px 0', textAlign: 'left', width: '100%', fontSize: 'clamp(1rem, 2.2vw, 1.2rem)' }} className="menu-item-hover">
    {text}
  </button>
);

const IconButton = ({ icon, color, onClick }) => (
  <button onClick={onClick} aria-label="Settings" style={{ 
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
    <h1 className="responsive-title" style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>Select Difficulty</h1>
    <div style={{ height: '2px', background: 'white', width: '100%', marginBottom: '0.5rem' }}></div>
    <button style={{ color: '#fca5a5', fontSize: '1.2rem', cursor: 'pointer', fontWeight: '600', marginBottom: '1rem', background: 'none', border: 'none', font: 'inherit', padding: 0, textAlign: 'left' }} onClick={onBack}>
      Back
    </button>
    
    <button className="difficulty-card" onClick={() => onSelect('EASY')} style={{ textAlign: 'left' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Easy (Multiple Choice)</div>
      <div style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.4 }}>Choose the correct country from 4 options. No map needed — pure geography knowledge.</div>
    </button>
    <button className="difficulty-card" onClick={() => onSelect('MEDIUM')} style={{ textAlign: 'left' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Medium (Mixed)</div>
      <div style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.4 }}>Alternates between multiple-choice and map pinning each round. A balanced challenge.</div>
    </button>
    <button className="difficulty-card" onClick={() => onSelect('HARD')} style={{ textAlign: 'left' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Hard (Map Pinning)</div>
      <div style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.4 }}>Drop a pin anywhere on the world map. Score depends on how close you are to the actual location.</div>
    </button>
  </div>
);

const MatchmakingMenu = ({ onBack, onSelect }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
    <h1 className="responsive-title" style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>Find a Match</h1>
    <div style={{ height: '2px', background: 'white', width: '100%', marginBottom: '0.5rem' }}></div>
    <button style={{ color: '#fca5a5', fontSize: '1.2rem', cursor: 'pointer', fontWeight: '600', marginBottom: '1rem', background: 'none', border: 'none', font: 'inherit', padding: 0, textAlign: 'left' }} onClick={onBack}>
      Back
    </button>
    
    <button className="difficulty-card" onClick={() => onSelect('unranked')} style={{ textAlign: 'left' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Unranked Match</div>
      <div style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.4 }}>Play a casual match against another player. No ELO changes.</div>
    </button>
    <button className="difficulty-card" onClick={() => onSelect('ranked')} style={{ textAlign: 'left' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Ranked Duel</div>
      <div style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.4 }}>Compete for ELO and climb the global leaderboard. Intense 1v1 action.</div>
    </button>
  </div>
);
