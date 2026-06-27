'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useGameStore } from '@/lib/store';
import Game from './components/Game';
import dynamic from 'next/dynamic';

const MultiplayerGame = dynamic(() => import('./components/MultiplayerGame'), { ssr: false });

export default function Home() {
  const { user, userProfile, loading, loginAnonymously, loginWithGoogle, logout } = useAuth();
  const { gameState, setGameState, difficulty, setDifficulty } = useGameStore();
  const [isQueuing, setIsQueuing] = useState(false);
  const [queueSub, setQueueSub] = useState(null);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '2rem' }}>Loading PlaceFinder...</div>;

  if (gameState.startsWith('MULTIPLAYER_')) {
    const gameId = gameState.replace('MULTIPLAYER_', '');
    return <MultiplayerGame gameId={gameId} />;
  }

  if (gameState !== 'MENU') {
    return <Game />;
  }

  const handleStart = (mode) => {
    setDifficulty(mode);
    setGameState('LOADING');
  };

  const startMatchmaking = async () => {
    if (!userProfile) return alert("Please login first to play ranked duels!");
    
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

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      {/* Header */}
      <header style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 10 }}>
        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '8px 16px', borderRadius: '8px', fontWeight: '800', letterSpacing: '2px', color: 'rgba(255,255,255,0.7)' }}>
          PF
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn" style={{ background: '#3b82f6' }}>Join Party</button>
            {(!user || user.isAnonymous) ? (
              <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={loginWithGoogle}>
                <span style={{ fontSize: '1.2rem' }}>G</span> Login
              </button>
            ) : (
              <button className="btn" style={{ background: 'rgba(255,255,255,0.1)' }} onClick={logout}>
                Logout {userProfile && `(${userProfile.displayName})`}
              </button>
            )}
          </div>
          
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '8px 16px', color: '#10b981', textAlign: 'center', minWidth: '140px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '1px', opacity: 0.9 }}>SEASON 12</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <span style={{ fontSize: '1.2rem' }}>✪</span> {userProfile ? userProfile.elo : 0} Points
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Centered */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
        
        <div className="glass-panel" style={{ padding: '3rem 2rem', maxWidth: '450px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Globe Icon */}
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', 
            background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', 
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.6), inset -10px -10px 20px rgba(0,0,0,0.3)',
            position: 'relative', marginBottom: '1.5rem', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', width: '40%', height: '50%', background: '#34d399', borderRadius: '40%', top: '10%', left: '10%', transform: 'rotate(20deg)' }}></div>
            <div style={{ position: 'absolute', width: '30%', height: '30%', background: '#34d399', borderRadius: '50%', bottom: '15%', right: '15%' }}></div>
          </div>

          <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '800' }}>Welcome to PlaceFinder!</h1>
          
          {isQueuing ? (
            <div style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <div style={{ fontSize: '1.2rem', animation: 'pulse-glow 1.5s infinite', color: 'var(--primary-color)' }}>
                Searching for opponent...
              </div>
              <button className="btn btn-secondary" onClick={cancelMatchmaking}>Cancel</button>
            </div>
          ) : (
            <>
              <p style={{ marginBottom: '2rem', fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', maxWidth: '300px' }}>
                You've been dropped somewhere on Earth.<br/>
                Look for clues and guess where you are!
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', marginBottom: '2rem' }}>
                
                {/* Ranked Duel Mode */}
                <div className="game-mode-card" style={{ position: 'relative', borderColor: '#3b82f6' }} onClick={startMatchmaking}>
                  <div style={{ position: 'absolute', top: '-10px', right: '15px', background: '#3b82f6', color: '#fff', fontSize: '0.65rem', fontWeight: '800', padding: '4px 8px', borderRadius: '10px', letterSpacing: '0.5px', boxShadow: '0 0 10px rgba(59,130,246,0.5)' }}>
                    MULTIPLAYER
                  </div>
                  <div style={{ fontSize: '2rem', background: 'rgba(59,130,246,0.1)', padding: '10px', borderRadius: '12px' }}>⚔️</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px', color: '#60a5fa' }}>Ranked Duel</div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>1v1 Matchmaking (Earn ELO)</div>
                  </div>
                </div>

                {/* Country Guesser Mode */}
                <div className="game-mode-card" style={{ position: 'relative' }} onClick={() => handleStart('EASY')}>
                  <div style={{ position: 'absolute', top: '-10px', right: '15px', background: '#34d399', color: '#000', fontSize: '0.65rem', fontWeight: '800', padding: '4px 8px', borderRadius: '10px', letterSpacing: '0.5px' }}>
                    BEST FOR BEGINNERS
                  </div>
                  <div style={{ fontSize: '2rem', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px' }}>🏳️</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>Country Guesser</div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Just choose the right country</div>
                  </div>
                </div>

                {/* Classic Mode */}
                <div className="game-mode-card" onClick={() => handleStart('HARD')}>
                  <div style={{ fontSize: '2rem', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px' }}>🗺️</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>Classic</div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Try to guess the exact location</div>
                  </div>
                </div>
                
              </div>

              <button style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.9rem' }}>
                Skip tutorial →
              </button>
            </>
          )}

        </div>
      </div>

    </div>
  );
}
