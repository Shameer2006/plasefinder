'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useGameStore } from '@/lib/store';

export default function PartyLobby({ gameId }) {
  const { userProfile } = useAuth();
  const { setGameState } = useGameStore();
  const [matchData, setMatchData] = useState(null);
  
  // Options state
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    fetch('/countries.json')
      .then(res => res.json())
      .then(data => {
        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        const list = data.map(code => ({
          code,
          name: regionNames.of(code) || code
        })).sort((a, b) => a.name.localeCompare(b.name));
        setCountries(list);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!db || !gameId) return;

    const unsub = onSnapshot(doc(db, 'matches', gameId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMatchData(data);

        if (data.status === 'playing') {
          setGameState(`MULTIPLAYER_${gameId}`);
        }
      } else {
        setGameState('MENU');
      }
    });

    return () => unsub();
  }, [gameId, setGameState]);

  if (!matchData || !userProfile) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        fontFamily: '"Outfit", sans-serif'
      }}>
        <div className="spinner" style={{ width: '48px', height: '48px', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: '#10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '1rem', color: '#9ca3af', fontWeight: 600, letterSpacing: '1px' }}>LOADING PARTY LOBBY...</p>
      </div>
    );
  }

  const isHost = matchData.players[userProfile.uid]?.host;
  const playersList = Object.entries(matchData.players).map(([uid, data]) => ({ uid, ...data }));
  
  const defaultOptions = { rounds: 5, difficulty: 'Medium', country: 'WORLDWIDE', mode: 'Street View', timeLimit: 60 };
  const options = { ...defaultOptions, ...(matchData.options || {}) };

  const filteredCountries = countries.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()));

  const updateOption = async (key, value) => {
    if (!isHost) return;
    await updateDoc(doc(db, 'matches', gameId), {
      [`options.${key}`]: value
    });
  };

  const handleStartGame = async () => {
    if (!isHost || isStarting) return;
    setIsStarting(true);
    
    try {
      const { fetchRandomLocation } = await import('@/lib/locationManager');
      const { location, options: locationOptions } = await fetchRandomLocation(options);
      await updateDoc(doc(db, 'matches', gameId), {
        location: location,
        locationOptions: locationOptions,
        status: 'playing',
        round: 1,
        roundStartTime: Date.now()
      });
    } catch (e) {
      console.error("Failed to start game:", e);
      setIsStarting(false);
    }
  };

  const handleLeave = () => {
    setGameState('MENU');
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(matchData.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyLinkToClipboard = () => {
    const url = `${window.location.origin}/?party=${matchData.code}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '1.5rem',
      background: 'radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 40%), #0b0f19',
      fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
      color: '#e5e7eb'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '960px',
        background: 'rgba(18, 24, 38, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '24px',
        padding: '2rem',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        
        {/* Header Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.2))',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#34d399'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h1 style={{
                fontSize: '1.8rem',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                margin: 0,
                background: 'linear-gradient(135deg, #ffffff 0%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                PARTY LOBBY
              </h1>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#34d399',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
                Active
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#9ca3af' }}>
              Gather your friends and start the match when ready
            </p>
          </div>

          {/* Game Code Display & Copy Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '14px',
              padding: '6px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>Code:</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fef08a', letterSpacing: '3px', fontFamily: 'monospace' }}>
                {matchData.code}
              </span>
            </div>

            <button
              onClick={copyCodeToClipboard}
              style={{
                background: copiedCode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                border: `1px solid ${copiedCode ? 'rgba(16, 185, 129, 0.5)' : 'rgba(255, 255, 255, 0.15)'}`,
                color: copiedCode ? '#34d399' : 'white',
                padding: '10px 14px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              title="Copy Code"
            >
              {copiedCode ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  Copy Code
                </>
              )}
            </button>

            <button
              onClick={copyLinkToClipboard}
              style={{
                background: copiedLink ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                border: `1px solid ${copiedLink ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.15)'}`,
                color: copiedLink ? '#60a5fa' : 'white',
                padding: '10px 14px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              title="Copy Invite Link"
            >
              {copiedLink ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Link Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                  Invite Link
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Content Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          
          {/* Left Column: Players Roster */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div style={{
              background: 'rgba(10, 15, 26, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '18px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              height: '100%',
              minHeight: '320px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  PLAYERS ({playersList.length})
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#9ca3af', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                  Ready
                </span>
              </div>

              {/* Player Cards List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '280px', paddingRight: '4px' }}>
                {playersList.map((player) => {
                  const isUser = player.uid === userProfile.uid;
                  return (
                    <div
                      key={player.uid}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        background: isUser ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${isUser ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                        borderRadius: '12px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #e05a2b, #3b82f6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.9rem',
                          color: 'white',
                          border: '2px solid rgba(255, 255, 255, 0.2)'
                        }}>
                          {(player.displayName || 'P')[0].toUpperCase()}
                        </div>
                        
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {player.displayName}
                            {isUser && (
                              <span style={{ fontSize: '0.65rem', background: '#3b82f6', color: 'white', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>YOU</span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span>⚡ {player.elo || 1000} ELO</span>
                          </div>
                        </div>
                      </div>

                      {player.host && (
                        <span style={{
                          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.3))',
                          border: '1px solid rgba(251, 191, 36, 0.4)',
                          color: '#fbbf24',
                          padding: '3px 8px',
                          borderRadius: '8px',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M2 4l3 12h14l3-12-6 7-4-5-4 5-6-7z"/></svg>
                          HOST
                        </span>
                      )}
                    </div>
                  );
                })}

                {/* Empty slots placeholders */}
                {playersList.length < 4 && Array.from({ length: 4 - playersList.length }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(255, 255, 255, 0.01)',
                      border: '1px dashed rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#6b7280',
                      fontSize: '0.8rem'
                    }}
                  >
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</div>
                    <span>Waiting for player...</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleLeave}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#fca5a5',
                  padding: '12px 20px',
                  borderRadius: '14px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Leave
              </button>

              {isHost ? (
                <button
                  onClick={handleStartGame}
                  disabled={isStarting}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    border: 'none',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '14px',
                    fontWeight: 900,
                    fontSize: '1rem',
                    cursor: isStarting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    opacity: isStarting ? 0.7 : 1
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  {isStarting ? 'Starting Game...' : 'Start Game'}
                </button>
              ) : (
                <div style={{
                  flex: 1,
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '14px',
                  color: '#9ca3af',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <span className="online-pulse-dot" />
                  Waiting for host to start...
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Game Settings Panel */}
          <div style={{
            background: 'rgba(10, 15, 26, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '18px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#fef08a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                MATCH SETTINGS
              </h3>
              {!isHost && (
                <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontStyle: 'italic' }}>
                  Read Only
                </span>
              )}
            </div>

            {/* Game Mode */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Game Mode
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[
                  { id: 'Street View', label: 'Street View', icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg> },
                  { id: 'Flag Guesser', label: 'Flag Guesser', icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg> }
                ].map(item => {
                  const active = options.mode === item.id;
                  return (
                    <button
                      key={item.id}
                      disabled={!isHost}
                      onClick={() => updateOption('mode', item.id)}
                      style={{
                        padding: '10px',
                        borderRadius: '10px',
                        background: active ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${active ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.08)'}`,
                        color: active ? '#60a5fa' : '#d1d5db',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: isHost ? 'pointer' : 'default',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Limit */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Time Limit Per Round
                </label>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8' }}>
                  {options.timeLimit}s ({Math.floor(options.timeLimit / 60)}m {options.timeLimit % 60 ? `${options.timeLimit % 60}s` : ''})
                </span>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {[30, 60, 120, 180, 300].map(sec => {
                  const active = options.timeLimit === sec;
                  return (
                    <button
                      key={sec}
                      disabled={!isHost}
                      onClick={() => updateOption('timeLimit', sec)}
                      style={{
                        flex: 1,
                        minWidth: '50px',
                        padding: '8px 4px',
                        borderRadius: '8px',
                        background: active ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${active ? 'rgba(56, 189, 248, 0.5)' : 'rgba(255, 255, 255, 0.08)'}`,
                        color: active ? '#38bdf8' : '#d1d5db',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: isHost ? 'pointer' : 'default',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {sec}s
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rounds Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Number of Rounds
                </label>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fbbf24', background: 'rgba(251, 191, 36, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>
                  {options.rounds} Rounds
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={options.rounds}
                disabled={!isHost}
                onChange={(e) => updateOption('rounds', parseInt(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: '#fbbf24',
                  cursor: isHost ? 'pointer' : 'default'
                }}
              />
            </div>

            {/* Difficulty */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Difficulty
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {[
                  { id: 'Easy', label: 'Easy', sub: 'Choices' },
                  { id: 'Medium', label: 'Medium', sub: 'Mixed' },
                  { id: 'Hard', label: 'Hard', sub: 'Map Drop' }
                ].map(diff => {
                  const active = options.difficulty === diff.id;
                  return (
                    <button
                      key={diff.id}
                      disabled={!isHost}
                      onClick={() => updateOption('difficulty', diff.id)}
                      style={{
                        padding: '8px 4px',
                        borderRadius: '8px',
                        background: active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${active ? 'rgba(16, 185, 129, 0.5)' : 'rgba(255, 255, 255, 0.08)'}`,
                        color: active ? '#34d399' : '#d1d5db',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: isHost ? 'pointer' : 'default',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>{diff.label}</span>
                      <span style={{ fontSize: '0.65rem', opacity: 0.7, fontWeight: 500 }}>{diff.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Map Location Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Map / Region
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  gap: '8px'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  <input
                    type="text"
                    value={showCountryDropdown ? countrySearch : (options.country === 'WORLDWIDE' ? 'Worldwide' : countries.find(c => c.code === options.country)?.name || options.country)}
                    onFocus={() => { if (isHost) { setShowCountryDropdown(true); setCountrySearch(''); } }}
                    onBlur={() => setTimeout(() => setShowCountryDropdown(false), 200)}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    disabled={!isHost}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      outline: 'none',
                      cursor: isHost ? 'text' : 'default'
                    }}
                    placeholder="Search region..."
                  />
                </div>

                {showCountryDropdown && isHost && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: '#131b2e',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: 50,
                    marginTop: '6px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
                  }}>
                    <div
                      style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.08)', fontWeight: 700, fontSize: '0.85rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px' }}
                      onMouseDown={() => { updateOption('country', 'WORLDWIDE'); setShowCountryDropdown(false); }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                      Worldwide (All Countries)
                    </div>
                    {filteredCountries.map(c => (
                      <div
                        key={c.code}
                        style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem', color: '#e5e7eb' }}
                        onMouseDown={() => { updateOption('country', c.code); setShowCountryDropdown(false); }}
                      >
                        {c.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
