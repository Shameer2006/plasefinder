'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useGameStore } from '@/lib/store';
import { updateDailyChallengeStreak } from '@/lib/userProfile';
import { getCountFromServer, collection, doc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import dynamic from 'next/dynamic';
import Spinner from './components/Spinner';
import { useToast } from './components/Toast';
import { sounds } from '@/lib/sounds';
import HeroPanorama from './components/HeroPanorama';
import CoinHUD from './components/CoinHUD';
import { getUnreadCount } from '@/lib/notifications';
import { prefetchLocations } from '@/lib/locationManager';

const Game = dynamic(() => import('./components/Game'), { ssr: false, loading: () => <Spinner text="Loading game..." /> });
const FlagGame = dynamic(() => import('./components/FlagGame'), { ssr: false, loading: () => <Spinner text="Loading game..." /> });
const MultiplayerGame = dynamic(() => import('./components/MultiplayerGame'), { ssr: false });
const PartyLobby = dynamic(() => import('./components/PartyLobby'), { ssr: false });
const ProfileModal = dynamic(() => import('./components/ProfileModal'), { ssr: false });
const OnboardingModal = dynamic(() => import('./components/OnboardingModal'), { ssr: false });
const DailyRewardOverlay = dynamic(() => import('./components/DailyRewardOverlay'), { ssr: false });
const NotificationsPanel = dynamic(() => import('./components/NotificationsPanel'), { ssr: false });

export default function Home() {
  const { user, userProfile, setUserProfile, loading, loginWithGoogle, logout } = useAuth();
  const { 
    gameState, setGameState, setDifficulty, setGameMode, setIsDailyChallenge, 
    soundEnabled, setSoundEnabled, initSounds, units, setUnits, mapType, setMapType, 
    emotesEnabled, setEmotesEnabled, showDailyRewardOverlay, setShowDailyRewardOverlay 
  } = useGameStore();
  const [isQueuing, setIsQueuing] = useState(false);
  const [queueSub, setQueueSub] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showObjectives, setShowObjectives] = useState(false);
  const [showMatchmaking, setShowMatchmaking] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [joinCode, setJoinCode] = useState('');
  const [joinError, setJoinError] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [partyStartedModal, setPartyStartedModal] = useState(null);

  useEffect(() => {
    setUnreadNotifications(getUnreadCount());
  }, [showNotifications]);
  const [streak, setStreak] = useState(0);
  const [playedToday, setPlayedToday] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [matchFoundData, setMatchFoundData] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingMode, setPendingMode] = useState('CLASSIC');
  const toast = useToast();

  // Always reset to MENU on fresh page load/launch, and handle popstate history
  useEffect(() => {
    // Reset to MENU on initial mount so reopening website never freezes on old game state
    setGameState('MENU');
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && (
        ['MENU', 'LOADING', 'EXPLORING', 'RESULT', 'FLAG_GAME'].includes(hash) ||
        hash.startsWith('MULTIPLAYER_') ||
        hash.startsWith('PARTY_LOBBY_')
      )) {
        setGameState(hash);
      } else {
        setGameState('MENU');
      }
    };
    window.addEventListener('popstate', handlePopState);

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => prefetchLocations());
    } else {
      setTimeout(() => prefetchLocations(), 500);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [setGameState]);

  useEffect(() => {
    if (gameState !== 'MENU') {
      window.history.pushState({ gameState }, '', `#${gameState}`);
    } else if (typeof window !== 'undefined' && window.location.hash) {
      window.history.pushState({ gameState: 'MENU' }, '', window.location.pathname);
    }
  }, [gameState]);

  // Handle party invite links (?party=CODE or #party=CODE)
  const handledPartyCodeRef = useRef(null);
  useEffect(() => {
    if (typeof window === 'undefined' || !userProfile || loading) return;

    const urlParams = new URLSearchParams(window.location.search);
    let partyCode = urlParams.get('party');
    if (!partyCode && window.location.hash.startsWith('#party=')) {
      partyCode = window.location.hash.replace('#party=', '');
    }

    if (partyCode && handledPartyCodeRef.current !== partyCode.trim().toUpperCase()) {
      const cleanCode = partyCode.trim().toUpperCase();
      handledPartyCodeRef.current = cleanCode;
      
      const joinFromInviteLink = async () => {
        try {
          toast.info(`Joining party ${cleanCode}...`);
          const { joinParty } = await import('@/lib/matchmaking');
          const result = await joinParty(userProfile, cleanCode);
          const gameId = typeof result === 'object' ? result.gameId : result;
          const status = typeof result === 'object' ? result.status : 'waiting_for_players';
          
          if (gameId) {
            window.history.replaceState({}, '', window.location.pathname);
            if (status === 'playing') {
              setGameState(`MULTIPLAYER_${gameId}`);
              toast.success("Rejoined Active Match!");
            } else {
              setGameState(`PARTY_LOBBY_${gameId}`);
              toast.success("Joined Party Lobby!");
            }
          }
        } catch (err) {
          console.error("Invite join error:", err);
          window.history.replaceState({}, '', window.location.pathname);
          if (err.code === 'PARTY_ALREADY_STARTED') {
            setPartyStartedModal(err.partyDetails || { code: cleanCode, round: 1, totalRounds: 5 });
          } else {
            toast.error(err.message || "Failed to join party from link.");
          }
        }
      };

      joinFromInviteLink();
    }
  }, [userProfile, loading, setGameState, toast]);

  // Handle Friend invite links (?friend=UID or ?invite=UID)
  const handledFriendInviteRef = useRef(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    let friendUid = urlParams.get('friend') || urlParams.get('invite');
    if (!friendUid && (window.location.hash.startsWith('#friend=') || window.location.hash.startsWith('#invite='))) {
      friendUid = window.location.hash.split('=')[1];
    }

    if (!friendUid) return;

    if (userProfile && userProfile.uid && userProfile.uid !== friendUid) {
      if (handledFriendInviteRef.current !== friendUid) {
        handledFriendInviteRef.current = friendUid;

        const processFriendInvite = async () => {
          try {
            const { connectViaInviteUid } = await import('@/lib/friends');
            const inviter = await connectViaInviteUid(userProfile, friendUid);
            window.history.replaceState({}, '', window.location.pathname);
            if (inviter) {
              toast.success(`Connected with ${inviter.displayName || inviter.username || 'friend'} as in-game friends!`);
            }
          } catch (err) {
            console.error("Friend connect error:", err);
            window.history.replaceState({}, '', window.location.pathname);
          }
        };

        processFriendInvite();
      }
    }
  }, [userProfile, toast]);
  useEffect(() => {
    if (userProfile && gameState === 'MENU') {
      const hasShownToast = sessionStorage.getItem('friendScoreToastShown');
      if (!hasShownToast && Math.random() < 0.4) {
        setTimeout(() => {
          const names = ['Alex99', 'Globetrotter', 'MapMaster', 'ExplorerJane'];
          const randomName = names[Math.floor(Math.random() * names.length)];
          const randomScore = Math.floor(Math.random() * 5000) + 18000;
          toast.info(`⚡ ${randomName} just scored ${randomScore.toLocaleString()} pts — can you beat it?`);
          sessionStorage.setItem('friendScoreToastShown', 'true');
        }, 1500);
      }
    }
  }, [userProfile, gameState]);

  useEffect(() => {
    initSounds();
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

  if (loading && !userProfile) return <Spinner text="Loading LostStreet..." />;

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', margin: '0 auto', maxWidth: '800px', flexWrap: 'wrap', justifyContent: 'center' }} className="vs-match-screen">
          <div style={{ animation: 'clash-left 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards', textAlign: 'center' }}>
            <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} className="vs-avatar" style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid var(--primary-color)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }} />
            <h3 style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', marginTop: '1rem', color: 'white' }}>{user.displayName}</h3>
          </div>
          <div style={{ animation: 'vs-pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 0.3s', opacity: 0, fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900', fontStyle: 'italic', background: 'linear-gradient(to bottom, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            VS
          </div>
          <div style={{ animation: 'clash-right 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards', textAlign: 'center' }}>
            <div className="vs-avatar" style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239, 68, 68, 0.2)', boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)' }}>
              <span style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>?</span>
            </div>
            <h3 style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', marginTop: '1rem', color: 'white' }}>Opponent</h3>
          </div>
        </div>
        <h2 style={{ animation: 'fade-in 0.5s ease forwards 1s', opacity: 0, marginTop: '3rem', color: '#ccc', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', letterSpacing: '2px' }}>PREPARING MATCH...</h2>
      </div>
    );
  }

  if (gameState.startsWith('MULTIPLAYER_')) {
    const gameId = gameState.replace('MULTIPLAYER_', '');
    return <div className="game-area"><MultiplayerGame gameId={gameId} /></div>;
  }

  if (gameState.startsWith('PARTY_LOBBY_')) {
    const gameId = gameState.replace('PARTY_LOBBY_', '');
    return <div className="party-lobby-area"><PartyLobby gameId={gameId} /></div>;
  }

  if (gameState === 'FLAG_GAME') {
    return <div className="game-area"><FlagGame onReturnToMenu={() => setGameState('MENU')} /></div>;
  }

  if (gameState !== 'MENU') {
    return <div className="game-area"><Game /></div>;
  }

  const handleStart = (mode) => {
    setGameMode('CLASSIC');
    setDifficulty(mode);
    setGameState('LOADING');
  };

  const handleEndlessMode = (mode) => {
    setGameMode('ENDLESS');
    useGameStore.getState().setCurrentEndlessStreak(0);
    useGameStore.getState().setMaxRounds(Infinity);
    setDifficulty(mode);
    setGameState('LOADING');
  };

  const handleStoryMode = () => {
    toast.info("📖 Story Mode is coming soon! Stay tuned.");
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
    const cleanCode = joinCode.trim().toUpperCase();
    if (cleanCode.length !== 6) {
      setJoinError('Code must be 6 characters');
      return;
    }

    setIsJoining(true);
    setJoinError('');
    const { joinParty } = await import('@/lib/matchmaking');
    try {
      const result = await joinParty(userProfile, cleanCode);
      const gameId = typeof result === 'object' ? result.gameId : result;
      const status = typeof result === 'object' ? result.status : 'waiting_for_players';
      if (gameId) {
        setShowJoinModal(false);
        if (status === 'playing') {
          setGameState(`MULTIPLAYER_${gameId}`);
          toast.success("Rejoined Active Match!");
        } else {
          setGameState(`PARTY_LOBBY_${gameId}`);
          toast.success("Joined Party Lobby!");
        }
      }
    } catch (e) {
      console.error(e);
      if (e.code === 'PARTY_ALREADY_STARTED') {
        setShowJoinModal(false);
        setPartyStartedModal(e.partyDetails || { code: cleanCode, round: 1, totalRounds: 5 });
      } else {
        setJoinError(e.message || 'Failed to join party.');
      }
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

    setIsDailyChallenge(true);
    handleStart('HARD');
  };

  return (
    <main id="main-content" className="home-page" style={{
      minHeight: '100dvh',
      width: '100vw',
      overflowX: 'hidden',
      position: 'relative',
      color: 'white',
      backgroundColor: '#0a0d1a'
    }}>
      {/* Live 360° Panorama Background Viewer */}
      <HeroPanorama />

      {/* ── Homepage Header Bar ── */}
      <header className="home-header" style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px clamp(1rem, 3vw, 2rem)',
        background: 'rgba(12, 16, 28, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        pointerEvents: 'auto',
      }}>
        {/* Logo & Tagline */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'white', flexShrink: 0 }}>
          <img src="/logo-3d-square.png" alt="LostStreet" style={{ width: '34px', height: '34px', objectFit: 'contain', flexShrink: 0, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', fontFamily: '"Outfit", sans-serif', letterSpacing: '0.01em', lineHeight: 1.1, whiteSpace: 'nowrap' }}>LostStreet</div>
            <div className="home-header-tagline" style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 600, whiteSpace: 'nowrap' }}>Explore. Guess. Discover.</div>
          </div>
        </Link>

        {/* Center Nav Links (Desktop Only) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="home-header-nav">
          <button onClick={() => window.location.href = '/guides'} style={{ background: 'none', border: 'none', color: '#e5e7eb', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontFamily: '"Outfit", sans-serif' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            Guides
          </button>
          <button onClick={() => window.location.href = '/flag-guesser'} style={{ background: 'none', border: 'none', color: '#e5e7eb', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontFamily: '"Outfit", sans-serif' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
            Flag Guesser
          </button>
          <button onClick={() => window.location.href = '/community'} style={{ background: 'none', border: 'none', color: '#e5e7eb', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontFamily: '"Outfit", sans-serif' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            Community
          </button>
        </div>

        {/* Right Status Pill, Coin HUD, Notification Bell, Settings Button, User Avatar & Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CoinHUD onOpenDailyReward={() => setShowDailyRewardOverlay(true)} />

          {/* Notification Bell with unread counter */}
          <button
            onClick={() => setShowNotifications(prev => !prev)}
            aria-label="Toggle Notifications"
            title="Notifications & Updates"
            style={{
              background: showNotifications ? 'rgba(239, 68, 68, 0.18)' : 'rgba(18, 24, 38, 0.85)',
              border: showNotifications ? '1px solid rgba(239, 68, 68, 0.45)' : '1px solid rgba(255, 255, 255, 0.15)',
              color: 'white',
              padding: '6px 10px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '34px',
              position: 'relative',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '1rem' }}>🔔</span>
            {unreadNotifications > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#ef4444',
                color: '#fff',
                borderRadius: '10px',
                fontSize: '0.6rem',
                fontWeight: 900,
                padding: '1px 4px',
                border: '2px solid #0a0d1a',
                boxShadow: '0 0 8px rgba(239, 68, 68, 0.7)',
                fontFamily: '"Outfit", sans-serif',
              }}>
                {unreadNotifications}
              </span>
            )}
          </button>

          {/* Settings — icon-only on mobile, icon+text on desktop */}
          <button
            onClick={() => setShowSettings(true)}
            className="home-header-settings-btn"
            style={{
              background: 'rgba(18, 24, 38, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'white',
              padding: '6px 10px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontFamily: '"Outfit", sans-serif',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease',
              flexShrink: 0,
              minHeight: '34px',
            }}
            aria-label="Settings"
            title="Open Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <span className="home-header-settings-text">Settings</span>
          </button>

          {/* Login / Avatar — hidden on mobile, accessible via hamburger */}
          <div className="home-header-auth">
            {(!user || user.isAnonymous) ? (
              <button style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: 'white', padding: '6px 14px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', fontFamily: '"Outfit", sans-serif', boxShadow: '0 4px 12px rgba(16,185,129,0.3)', whiteSpace: 'nowrap' }} onClick={loginWithGoogle}>Login</button>
            ) : (
              <button onClick={() => setShowProfile(true)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} aria-label="Open profile">
                {user.photoURL ? (
                  <img src={user.photoURL} referrerPolicy="no-referrer" alt="Profile" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', display: 'block', border: '2px solid rgba(255,255,255,0.3)' }} />
                ) : (
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e05a2b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', color: 'white', border: '2px solid rgba(255,255,255,0.3)' }}>
                    {(userProfile?.username || user.displayName || 'U')[0].toUpperCase()}
                  </div>
                )}
              </button>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            title="Menu"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: mobileMenuOpen ? 'rgba(99,102,241,0.25)' : 'rgba(18, 24, 38, 0.85)',
              border: mobileMenuOpen ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.15)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown-menu">
            {/* Auth row at top */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', gap: '10px' }}>
              {(!user || user.isAnonymous) ? (
                <button
                  onClick={() => { setMobileMenuOpen(false); loginWithGoogle(); }}
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', fontFamily: '"Outfit", sans-serif', flex: 1 }}
                >
                  🚀 Sign in with Google
                </button>
              ) : (
                <button onClick={() => { setMobileMenuOpen(false); setShowProfile(true); }} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: '"Outfit", sans-serif', display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                  {user.photoURL
                    ? <img src={user.photoURL} referrerPolicy="no-referrer" alt="" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                    : <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e05a2b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem', color: 'white' }}>{(userProfile?.username || user.displayName || 'U')[0].toUpperCase()}</div>
                  }
                  {userProfile?.username || user.displayName || 'Profile'}
                </button>
              )}
              <button
                onClick={() => { setMobileMenuOpen(false); setShowSettings(true); }}
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', fontFamily: '"Outfit", sans-serif', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Settings
              </button>
            </div>
            <button onClick={() => { setMobileMenuOpen(false); window.location.href = '/guides'; }} style={{ background: 'none', border: 'none', color: '#e5e7eb', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', cursor: 'pointer', fontFamily: '"Outfit", sans-serif', textAlign: 'left' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              Guides & Strategy
            </button>
            <button onClick={() => { setMobileMenuOpen(false); window.location.href = '/flag-guesser'; }} style={{ background: 'none', border: 'none', color: '#e5e7eb', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', cursor: 'pointer', fontFamily: '"Outfit", sans-serif', textAlign: 'left' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
              Flag Guesser
            </button>
            <button onClick={() => { setMobileMenuOpen(false); window.location.href = '/community'; }} style={{ background: 'none', border: 'none', color: '#e5e7eb', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', cursor: 'pointer', fontFamily: '"Outfit", sans-serif', textAlign: 'left' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Community
            </button>
            <button onClick={() => { setMobileMenuOpen(false); window.location.href = '/leaderboard'; }} style={{ background: 'none', border: 'none', color: '#e5e7eb', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', cursor: 'pointer', fontFamily: '"Outfit", sans-serif', textAlign: 'left' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>
              Leaderboard
            </button>
            <button onClick={() => { setMobileMenuOpen(false); window.location.href = '/about'; }} style={{ background: 'none', border: 'none', color: '#e5e7eb', fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', cursor: 'pointer', fontFamily: '"Outfit", sans-serif', textAlign: 'left' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              About LostStreet
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <section className="container-padding home-content" style={{ position: 'relative', zIndex: 2, minHeight: 'calc(100dvh - 56px)', paddingTop: '74px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none' }}>

        <div className="home-main-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flex: 1, pointerEvents: 'none' }}>

          {/* Left Column Menu */}
          <div className="left-menu-container" style={{ zIndex: 5, pointerEvents: 'auto' }}>
            {showSettings ? (
              <SettingsMenu onBack={() => setShowSettings(false)} units={units} setUnits={setUnits} mapType={mapType} setMapType={setMapType} emotesEnabled={emotesEnabled} setEmotesEnabled={setEmotesEnabled} soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
            ) : showDifficulty ? (
              <DifficultyMenu onBack={() => setShowDifficulty(false)} onSelect={(diff) => {
                setShowDifficulty(false);
                if (pendingMode === 'ENDLESS') {
                  handleEndlessMode(diff);
                } else {
                  handleStart(diff);
                }
              }} />
            ) : showMatchmaking ? (
              <MatchmakingMenu onBack={() => setShowMatchmaking(false)} onSelect={(type) => { setShowMatchmaking(false); startMatchmaking(type); }} />
            ) : (
              <>
                {showOnboarding && (
                  <OnboardingTooltip onDismiss={() => setShowOnboarding(false)} />
                )}
                <MainMenu
                  onQuickPlay={() => handleStart('EASY')}
                  onSingleplayer={() => { setPendingMode('CLASSIC'); setShowDifficulty(true); }}
                  onEndlessMode={() => { setPendingMode('ENDLESS'); setShowDifficulty(true); }}
                  onStoryMode={handleStoryMode}
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
                  onFlagGuesser={() => setGameState('FLAG_GAME')}
                />
              </>
            )}
          </div>

          {/* Right Column: Notifications & Updates Panel OR Mini Map Widget */}
          {!showSettings && !showProfile && !showDifficulty && !showMatchmaking && (
            <aside style={{ maxWidth: '680px', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', zIndex: 5, pointerEvents: 'auto' }} className="desktop-only">
              {showNotifications ? (
                <NotificationsPanel
                  onClose={() => setShowNotifications(false)}
                  onOpenDailyRewards={() => setShowDailyRewardOverlay(true)}
                  onNavigate={(url) => window.location.href = url}
                />
              ) : (
                <div style={{ maxWidth: '340px', width: '100%', display: 'flex', flexDirection: 'column', gap: '14px', marginLeft: 'auto' }}>
                  {/* Mini Map Preview Widget */}
                  <div style={{
                    width: '100%',
                    height: '95px',
                    borderRadius: '16px',
                    background: 'rgba(18, 24, 38, 0.85)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <svg width="240" height="85" viewBox="0 0 200 100" fill="none" opacity="0.4">
                      <path d="M30 40 Q40 20 60 30 T90 40 T120 20 T150 50 T180 40" stroke="white" strokeWidth="1.5" strokeDasharray="3,3" />
                      <circle cx="120" cy="35" r="4" fill="#ef4444" />
                      <circle cx="120" cy="35" r="8" fill="#ef4444" opacity="0.3" />
                    </svg>
                    <div style={{ position: 'absolute', bottom: '6px', fontSize: '0.65rem', color: '#9ca3af', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>World View</div>
                  </div>

                  {/* Forest Green Highway Signboard */}
                  <div className="highway-signboard">
                    <div className="highway-signboard-inner">
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: '#86efac' }}>WELCOME TO</span>
                      <h1 style={{ fontSize: '2rem', fontWeight: 900, fontFamily: '"Outfit", sans-serif', color: '#fef08a', margin: 0, lineHeight: 1.1, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>LOSTSTREET</h1>
                      <div style={{ width: '60px', height: '2px', background: 'rgba(254, 240, 138, 0.4)', margin: '2px 0' }} />
                      <p style={{ fontSize: '0.88rem', color: '#e5e7eb', lineHeight: 1.4, margin: 0 }}>
                        Travel the world from your couch! Spot funny clues, pin your best guess, and see how well you know the planet.
                      </p>
                      <button className="highway-quickplay-btn" onClick={() => handleStart('EASY')} aria-label="Quick Play - start a game instantly">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        QUICK PLAY
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </aside>
          )}
        </div>


      </section>

      {partyStartedModal && (
        <FocusTrapModal onClose={() => setPartyStartedModal(null)}>
          <div
            className="glass-panel modal-content"
            role="dialog"
            aria-modal="true"
            aria-label="Party Already Started"
            style={{
              maxWidth: '520px',
              width: '92%',
              padding: '2rem',
              textAlign: 'center',
              borderRadius: '24px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              background: 'linear-gradient(180deg, rgba(26, 31, 46, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
            }}
          >
            {/* Animated Icon Badge */}
            <div style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 1.25rem',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(239, 68, 68, 0.2))',
              border: '1px solid rgba(245, 158, 11, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fbbf24',
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.25)'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#fbbf24',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fbbf24', boxShadow: '0 0 8px #fbbf24' }} />
              Match In Progress
            </div>

            <h2 style={{
              fontSize: '1.6rem',
              fontWeight: 900,
              margin: '0 0 0.5rem 0',
              letterSpacing: '-0.02em',
              color: '#ffffff'
            }}>
              Party Has Started!
            </h2>

            <p style={{
              fontSize: '0.9rem',
              color: '#9ca3af',
              margin: '0 0 1.5rem 0',
              lineHeight: 1.5
            }}>
              The host has already launched this match. New players cannot join mid-game, but you can wait for the next room or ask the host to invite you when finished!
            </p>

            {/* Room summary stats card */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '1rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              marginBottom: '1.5rem'
            }}>
              <div style={{ padding: '4px' }}>
                <div style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>Room Code</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fef08a', fontFamily: 'monospace', marginTop: '2px' }}>{partyStartedModal.code || '------'}</div>
              </div>
              <div style={{ padding: '4px', borderLeft: '1px solid rgba(255,255,255,0.08)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>Progress</div>
                <div style={{ fontSize: '1rem', fontWeight: 900, color: '#38bdf8', marginTop: '2px' }}>Round {partyStartedModal.round || 1}/{partyStartedModal.totalRounds || 5}</div>
              </div>
              <div style={{ padding: '4px' }}>
                <div style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>Host</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{partyStartedModal.hostName || 'Host'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="btn"
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#e5e7eb',
                  fontWeight: 700,
                  borderRadius: '12px',
                  padding: '12px'
                }}
                onClick={() => setPartyStartedModal(null)}
              >
                Return to Menu
              </button>
              <button
                type="button"
                className="btn"
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  fontWeight: 800,
                  borderRadius: '12px',
                  padding: '12px',
                  boxShadow: '0 4px 15px rgba(245, 158, 11, 0.35)'
                }}
                onClick={() => {
                  if (partyStartedModal?.code) {
                    setJoinCode(partyStartedModal.code);
                    setPartyStartedModal(null);
                    setShowJoinModal(true);
                  } else {
                    setPartyStartedModal(null);
                  }
                }}
              >
                Check Again
              </button>
            </div>
          </div>
        </FocusTrapModal>
      )}

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
          onLogout={logout}
          onProfileUpdate={(updates) => {
            setUserProfile(prev => ({ ...(prev || {}), ...updates }));
          }}
        />
      )}

      {/* Daily Reward Modal Overlay */}
      <DailyRewardOverlay
        forceOpen={showDailyRewardOverlay}
        onClose={() => setShowDailyRewardOverlay(false)}
      />

      {/* Mobile Notifications Modal Overlay */}
      {showNotifications && (
        <div className="mobile-only" style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9990,
          background: 'rgba(6, 9, 18, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}>
          <NotificationsPanel
            onClose={() => setShowNotifications(false)}
            onOpenDailyRewards={() => { setShowNotifications(false); setShowDailyRewardOverlay(true); }}
            onNavigate={(url) => { setShowNotifications(false); window.location.href = url; }}
          />
        </div>
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

const HeroMenuButton = ({ title, subtitle, iconClass, svgIcon, onClick, badge, badgeStyle, extraRight, disabled }) => (
  <button onClick={onClick} disabled={disabled} className={`hero-menu-btn ${iconClass}`} style={{ opacity: disabled ? 0.65 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}>
    <div className="hero-menu-btn-content">
      <div className="hero-menu-icon-wrap">
        {svgIcon}
      </div>
      <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.95rem', fontWeight: '900', letterSpacing: '0.04em' }}>{title}</span>
          {badge && (
            <span style={{
              background: '#ffffff',
              color: '#111827',
              fontSize: '0.6rem',
              padding: '1px 6px',
              borderRadius: '4px',
              fontWeight: '900',
              letterSpacing: '0.5px',
              ...badgeStyle
            }}>
              {badge}
            </span>
          )}
        </div>
        {subtitle && <span style={{ fontSize: '0.75rem', opacity: 0.88, fontWeight: '500' }}>{subtitle}</span>}
      </div>
    </div>
    {extraRight || (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}><polyline points="9 18 15 12 9 6"></polyline></svg>
    )}
  </button>
);

const MainMenu = ({ onQuickPlay, onSingleplayer, onEndlessMode, onStoryMode, onFindMatchClick, isQueuing, cancelMatchmaking, onDailyChallenge, streak, playedToday, onCreateParty, onJoinParty, onLeaderboard, onAbout, onFlagGuesser }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '340px', width: '100%' }}>
    <HeroMenuButton
      title="SINGLEPLAYER"
      subtitle="Play solo and explore"
      iconClass="icon-red"
      onClick={onSingleplayer}
      svgIcon={
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      }
    />

    <HeroMenuButton
      title="FLAG GUESSER"
      subtitle="Guess the flag, earn points"
      iconClass="icon-orange"
      onClick={onFlagGuesser}
      svgIcon={
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
          <line x1="4" y1="22" x2="4" y2="15"></line>
        </svg>
      }
    />

    <HeroMenuButton
      title="ENDLESS MODE"
      subtitle="How far can you go?"
      iconClass="icon-rose"
      onClick={onEndlessMode}
      svgIcon={
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
      }
    />

    <HeroMenuButton
      title="STORY MODE"
      subtitle="Follow stories & challenges"
      iconClass="icon-gold"
      onClick={onStoryMode}
      badge="COMING SOON"
      badgeStyle={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#111827', fontSize: '0.58rem', padding: '1.5px 6px', borderRadius: '4px', fontWeight: '900', letterSpacing: '0.5px', boxShadow: '0 2px 6px rgba(245, 158, 11, 0.3)' }}
      extraRight={
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(251, 191, 36, 0.15)', border: '1px solid rgba(251, 191, 36, 0.35)', color: '#fbbf24' }} title="Locked - Coming Soon">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </span>
      }
      svgIcon={
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      }
    />

    <HeroMenuButton
      title={isQueuing ? "CANCEL SEARCH..." : "FIND A MATCH"}
      subtitle="Play with random players"
      iconClass="icon-green"
      onClick={isQueuing ? cancelMatchmaking : onFindMatchClick}
      svgIcon={
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      }
    />

    <HeroMenuButton
      title="CREATE PARTY"
      subtitle="Create your own party"
      iconClass="icon-blue"
      onClick={onCreateParty}
      svgIcon={
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      }
    />

    <HeroMenuButton
      title="JOIN PARTY"
      subtitle="Join your friends"
      iconClass="icon-purple"
      onClick={onJoinParty}
      svgIcon={
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <line x1="20" y1="8" x2="20" y2="14"></line>
          <line x1="23" y1="11" x2="17" y2="11"></line>
        </svg>
      }
    />

    <HeroMenuButton
      title="LEADERBOARD"
      subtitle="See top players"
      iconClass="icon-teal"
      onClick={onLeaderboard}
      svgIcon={
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
          <path d="M4 22h16"></path>
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>
        </svg>
      }
    />

    <HeroMenuButton
      title="ABOUT"
      subtitle="About LostStreet"
      iconClass="icon-orange"
      onClick={onAbout}
      svgIcon={
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      }
    />

    <HeroMenuButton
      title="DAILY CHALLENGE"
      subtitle={playedToday ? "Played today" : (streak > 0 ? `Don't lose your ${streak} day streak!` : "New challenge every day")}
      iconClass="icon-rose"
      onClick={onDailyChallenge}
      disabled={playedToday}
      svgIcon={
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      }
      extraRight={
        <span style={{ background: '#f97316', color: 'white', padding: '3px 8px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 8px rgba(249, 115, 22, 0.4)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          12:45:30
        </span>
      }
    />

    <div style={{ marginTop: '8px', padding: '0 4px' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: '800', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Masterclass Guides &amp; Tips
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {[
          ['/guides/25-pro-street-view-geoguessr-secrets', '25 Pro Secrets'],
          ['/guides/street-view-camera-generations-guide', 'Camera Gens'],
          ['/guides/latin-america-street-view-guide', 'Latin America'],
          ['/flag-guesser', 'Flag Guesser'],
          ['/guides', 'All Guides →']
        ].map(([href, label]) => (
          <Link key={href} href={href} style={{ padding: '4px 10px', background: 'rgba(18, 24, 38, 0.85)', borderRadius: '10px', fontSize: '0.78rem', color: '#e5e7eb', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)', fontWeight: '600' }}>
            {label}
          </Link>
        ))}
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
          <span className="settings-row-label" style={{ width: '180px', flexShrink: 0 }}>Units:</span>
          <select value={units} onChange={(e) => setUnits(e.target.value)} style={{ padding: '4px', borderRadius: '4px', color: 'black', width: '150px' }}>
            <option value="metric">Metric (km)</option>
            <option value="imperial">Imperial (mi)</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="settings-row-label" style={{ width: '180px', flexShrink: 0 }}>Map Type:</span>
          <select value={mapType} onChange={(e) => setMapType(e.target.value)} style={{ padding: '4px', borderRadius: '4px', color: 'black', width: '150px' }}>
            <option value="normal">Normal</option>
            <option value="satellite">Satellite</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="settings-row-label" style={{ width: '180px', flexShrink: 0 }}>Sound Effects:</span>
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
            style={{ transform: 'scale(1.2)' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
          <span className="settings-row-label" style={{ width: '300px', flexShrink: 0 }}>Multiplayer emote reactions</span>
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
          label={<><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg> ELO Rating</>}
          value={userProfile.elo}
        />
        <ProfileStat
          label={<><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Total XP</>}
          value={userProfile.totalXp}
        />
        <ProfileStat
          label={<><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><path d="M14.5 4h5v5"></path><polyline points="19.5 4 12 11.5 8 7.5 2 13.5"></polyline></svg> Duels Won</>}
          value={userProfile.duels_wins}
        />
        <ProfileStat
          label={<><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Duels Lost</>}
          value={userProfile.duels_losses}
        />
        <ProfileStat
          label={<><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg> Daily Streak</>}
          value={userProfile.dailyChallengeStreak || 0}
        />
        <ProfileStat
          label={<><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Joined</>}
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

const MenuItem = ({ text, onClick, badge }) => (
  <button onClick={onClick} className="signpost-btn">
    {text}
    {badge && <span style={{ marginLeft: '10px', background: '#ef4444', color: 'white', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '6px', fontWeight: 'bold', letterSpacing: '1px', boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)' }}>{badge}</span>}
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
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.3rem, 1vh, 0.6rem)' }}>

    <h1 className="responsive-title" style={{ fontWeight: 800, marginBottom: '0.1rem' }}>Select Difficulty</h1>

    <button className="signpost-back-btn" onClick={onBack}>← Back</button>

    <div className="diff-signpost-menu">
      <button className="diff-sign diff-sign-easy" onClick={() => onSelect('EASY')}>
        <span className="diff-sign-name">Easy</span>
        <span className="diff-sign-sub">Multiple Choice — pick from 4 options</span>
      </button>
      <button className="diff-sign diff-sign-medium" onClick={() => onSelect('MEDIUM')}>
        <span className="diff-sign-name">Medium</span>
        <span className="diff-sign-sub">Mixed — choice + map pinning</span>
      </button>
      <button className="diff-sign diff-sign-hard" onClick={() => onSelect('HARD')}>
        <span className="diff-sign-name">Hard</span>
        <span className="diff-sign-sub">Map Pinning — drop a pin to guess</span>
      </button>
    </div>
  </div>
);

const MatchmakingMenu = ({ onBack, onSelect }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.3rem, 1vh, 0.6rem)' }}>

    <h1 className="responsive-title" style={{ fontWeight: 800, marginBottom: '0.1rem' }}>Find a Match</h1>

    <button className="signpost-back-btn" onClick={onBack}>← Back</button>

    <div className="diff-signpost-menu">
      <button className="diff-sign diff-sign-easy" onClick={() => onSelect('unranked')}>
        <span className="diff-sign-name">Unranked</span>
        <span className="diff-sign-sub">Casual match — no ELO changes</span>
      </button>
      <button className="diff-sign diff-sign-hard" onClick={() => onSelect('ranked')}>
        <span className="diff-sign-name">Ranked Duel</span>
        <span className="diff-sign-sub">Compete for ELO &amp; climb the leaderboard</span>
      </button>
    </div>
  </div>
);
