'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/AuthContext';
import { collection, query, orderBy, limit, getDocs, getCountFromServer, where } from 'firebase/firestore';

export default function LeaderboardPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('elo');
  const { userProfile } = useAuth();

  const [myRank, setMyRank] = useState(null);
  const [myScore, setMyScore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!db) {
          throw new Error('Database connection is not initialized.');
        }

        const firestoreField = sortBy === 'xp' ? 'totalXp' : 'elo';
        const q = query(
          collection(db, 'users'),
          orderBy(firestoreField, 'desc'),
          limit(50)
        );

        const snapshot = await getDocs(q);
        const list = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          list.push({
            uid: doc.id,
            displayName: data.displayName || 'Anonymous',
            elo: data.elo || 1000,
            totalXp: data.totalXp || 0,
            duels_wins: data.duels_wins || 0,
            duels_losses: data.duels_losses || 0,
            dailyChallengeStreak: data.dailyChallengeStreak || 0,
            countryCode: data.countryCode || null
          });
        });
        setPlayers(list);

        if (userProfile && userProfile.uid) {
          const userScore = userProfile[firestoreField] || (sortBy === 'elo' ? 1000 : 0);
          setMyScore(userScore);

          const loadedIndex = list.findIndex(p => p.uid === userProfile.uid);
          if (loadedIndex !== -1) {
            setMyRank(loadedIndex + 1);
          } else {
            const countQ = query(
              collection(db, 'users'),
              where(firestoreField, '>', userScore)
            );
            const countSnapshot = await getCountFromServer(countQ);
            setMyRank(countSnapshot.data().count + 1);
          }
        } else {
          setMyRank(null);
          setMyScore(null);
        }
      } catch (e) {
        console.error('Leaderboard error:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sortBy, userProfile]);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: '#fafafa',
      color: '#111827',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
      overflowX: 'hidden'
    }}>

      {/* ── BREADCRUMB / SUB-NAV BAR ─────────────────────────────────────── */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '0.85rem clamp(1rem, 3vw, 2.5rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link href="/" style={{
            background: '#f3f4f6',
            border: '1px solid #e5e7eb',
            color: '#1f2937',
            padding: '7px 14px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '700',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            transition: 'all 0.2s ease',
            touchAction: 'manipulation'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Game</span>
          </Link>

          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: '#6b7280' }}>
            <Link href="/" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
            <span>/</span>
            <span style={{ color: '#059669', fontWeight: 700 }}>Global Leaderboard</span>
          </nav>
        </div>

        <div style={{
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          color: '#059669',
          padding: '5px 14px',
          borderRadius: '20px',
          fontSize: '0.82rem',
          fontWeight: 800,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6"></circle>
            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
          </svg>
          <span>Official Top 50 Rankings</span>
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER ───────────────────────────────────────── */}
      <main style={{
        maxWidth: '920px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1rem, 3vw, 2rem) 4rem',
      }}>

        {/* Header Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{
            display: 'inline-block',
            padding: '5px 14px',
            borderRadius: '20px',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#059669',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.85rem'
          }}>
            Competitive Hall of Fame
          </span>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            color: '#111827',
            letterSpacing: '-0.03em',
            margin: '0 0 0.75rem 0'
          }}>
            Global Player Leaderboard
          </h1>
          <p style={{
            color: '#4b5563',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Compare live ELO ratings and overall player XP. Duel in 1v1 matchmaking, win rounds, and protect your daily challenge streak to claim a spot on the podium.
          </p>
        </div>

        {/* ── SORT TABS ──────────────────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '2.25rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setSortBy('elo')}
            style={{
              padding: '10px 24px',
              minHeight: '44px',
              borderRadius: '50px',
              border: sortBy === 'elo' ? 'none' : '1px solid #e5e7eb',
              fontWeight: 800,
              fontSize: '0.94rem',
              cursor: 'pointer',
              fontFamily: '"Outfit", sans-serif',
              background: sortBy === 'elo' ? 'linear-gradient(135deg, #059669, #10b981)' : '#ffffff',
              color: sortBy === 'elo' ? '#ffffff' : '#4b5563',
              boxShadow: sortBy === 'elo' ? '0 4px 14px rgba(5,150,105,0.3)' : '0 1px 3px rgba(0,0,0,0.04)',
              transition: 'all 0.2s',
              touchAction: 'manipulation',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="22" y1="12" x2="18" y2="12"></line>
              <line x1="6" y1="12" x2="2" y2="12"></line>
              <line x1="12" y1="6" x2="12" y2="2"></line>
              <line x1="12" y1="22" x2="12" y2="18"></line>
            </svg>
            <span>Rank by ELO Duel Rating</span>
          </button>

          <button
            onClick={() => setSortBy('xp')}
            style={{
              padding: '10px 24px',
              minHeight: '44px',
              borderRadius: '50px',
              border: sortBy === 'xp' ? 'none' : '1px solid #e5e7eb',
              fontWeight: 800,
              fontSize: '0.94rem',
              cursor: 'pointer',
              fontFamily: '"Outfit", sans-serif',
              background: sortBy === 'xp' ? 'linear-gradient(135deg, #2563eb, #3b82f6)' : '#ffffff',
              color: sortBy === 'xp' ? '#ffffff' : '#4b5563',
              boxShadow: sortBy === 'xp' ? '0 4px 14px rgba(37,99,235,0.3)' : '0 1px 3px rgba(0,0,0,0.04)',
              transition: 'all 0.2s',
              touchAction: 'manipulation',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>Rank by Total Player XP</span>
          </button>
        </div>

        {/* ── LOADING STATE ──────────────────────────────────────────────── */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '5rem 0',
            fontSize: '1.05rem',
            color: '#6b7280',
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
          }}>
            <div style={{
              width: '38px',
              height: '38px',
              border: '3px solid #e5e7eb',
              borderTop: '3px solid #059669',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 1.25rem',
            }} />
            <span style={{ fontWeight: 600 }}>Loading global rankings...</span>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* ── ERROR STATE ────────────────────────────────────────────────── */}
        {error && (
          <div style={{
            textAlign: 'center',
            padding: '3.5rem 2rem',
            background: '#ffffff',
            border: '1px solid #fee2e2',
            borderRadius: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#fef2f2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontWeight: 900
            }}>
              !
            </div>
            <h3 style={{ color: '#111827', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
              Failed to load leaderboard
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.92rem', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* ── YOUR RANK CARD (LOGGED IN USER) ────────────────────────────── */}
        {!loading && !error && myRank && userProfile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            padding: '1.25rem clamp(1rem, 3vw, 2rem)',
            background: sortBy === 'elo' ? '#f0fdf4' : '#eff6ff',
            border: sortBy === 'elo' ? '1.5px solid #86efac' : '1.5px solid #93c5fd',
            borderRadius: '18px',
            marginBottom: '2.5rem',
            boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: sortBy === 'elo' ? '#dcfce7' : '#dbeafe',
              color: sortBy === 'elo' ? '#059669' : '#1d4ed8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              fontWeight: 900,
              flexShrink: 0
            }}>
              #{myRank}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '0.78rem',
                color: sortBy === 'elo' ? '#059669' : '#1d4ed8',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.15rem'
              }}>
                Your Current Standing
              </div>
              <div style={{
                fontWeight: 800,
                fontSize: '1.15rem',
                color: '#111827',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {userProfile.displayName || 'You'}
              </div>
            </div>

            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{
                fontWeight: 900,
                fontSize: '1.45rem',
                color: sortBy === 'elo' ? '#059669' : '#2563eb'
              }}>
                {myScore ? myScore.toLocaleString() : '0'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase' }}>
                {sortBy === 'elo' ? 'ELO Rating' : 'Total XP'}
              </div>
            </div>
          </div>
        )}

        {/* ── TOP 3 PODIUM SECTION ───────────────────────────────────────── */}
        {!loading && !error && players.length >= 3 && (
          <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '24px',
            padding: 'clamp(1.5rem, 4vw, 2.5rem) 1rem 0',
            marginBottom: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#d97706'
              }}>
                Championship Tier
              </span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#111827', margin: '0.25rem 0 0' }}>
                Top 3 Contenders
              </h2>
            </div>

            <div className="podium-container" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              gap: 'clamp(0.5rem, 2vw, 1.5rem)',
              maxWidth: '620px',
              margin: '0 auto',
            }}>
              {/* Rank 2: Silver */}
              <PodiumCard player={players[1]} rank={2} height="135px" sortBy={sortBy} />
              {/* Rank 1: Gold */}
              <PodiumCard player={players[0]} rank={1} height="180px" sortBy={sortBy} />
              {/* Rank 3: Bronze */}
              <PodiumCard player={players[2]} rank={3} height="110px" sortBy={sortBy} />
            </div>
          </div>
        )}

        {/* ── RANKS 4-50 PLAYER LIST ─────────────────────────────────────── */}
        {!loading && !error && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {(players.length >= 3 ? players.slice(3) : players).map((player, i) => {
              const rank = players.length >= 3 ? i + 4 : i + 1;
              const isCurrentUser = userProfile && userProfile.uid === player.uid;

              return (
                <div
                  key={player.uid}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.95rem 1.25rem',
                    background: isCurrentUser ? '#f0fdf4' : '#ffffff',
                    border: isCurrentUser ? '1.5px solid #86efac' : '1px solid #e5e7eb',
                    borderRadius: '14px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {/* Rank Badge */}
                  <span style={{
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px',
                    background: '#f3f4f6',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    color: '#374151',
                    flexShrink: 0,
                  }}>
                    #{rank}
                  </span>

                  {/* Player Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: 800,
                      fontSize: '1rem',
                      color: '#111827',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span>{player.displayName}</span>
                      {isCurrentUser && (
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          padding: '1px 6px',
                          borderRadius: '6px',
                          background: '#ecfdf5',
                          color: '#059669',
                          border: '1px solid #a7f3d0'
                        }}>
                          YOU
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span>{player.duels_wins}W / {player.duels_losses}L</span>
                      <span>•</span>
                      <span>{player.dailyChallengeStreak}d streak</span>
                    </div>
                  </div>

                  {/* Score */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{
                      fontWeight: 900,
                      fontSize: '1.18rem',
                      color: sortBy === 'elo' ? '#059669' : '#2563eb'
                    }}>
                      {sortBy === 'elo' ? player.elo : player.totalXp.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase' }}>
                      {sortBy === 'elo' ? 'ELO' : 'XP'}
                    </div>
                  </div>
                </div>
              );
            })}

            {players.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '18px',
                color: '#6b7280',
                fontSize: '1rem'
              }}>
                No ranked players recorded yet. Be the first to duel and claim the top spot!
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}

function PodiumCard({ player, rank, height, sortBy }) {
  const meta = {
    1: {
      title: 'Champion',
      accentColor: '#b45309',
      badgeBg: '#fef3c7',
      badgeBorder: '#fde68a',
      pillarBg: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)',
      pillarBorder: '1px solid #fcd34d',
      pillarTextColor: '#78350f',
      labelColor: '#92400e',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6"></circle>
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
        </svg>
      )
    },
    2: {
      title: '2nd Place',
      accentColor: '#475569',
      badgeBg: '#f1f5f9',
      badgeBorder: '#cbd5e1',
      pillarBg: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
      pillarBorder: '1px solid #cbd5e1',
      pillarTextColor: '#1e293b',
      labelColor: '#475569',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      )
    },
    3: {
      title: '3rd Place',
      accentColor: '#c2410c',
      badgeBg: '#ffedd5',
      badgeBorder: '#fed7aa',
      pillarBg: 'linear-gradient(180deg, #ffedd5 0%, #fed7aa 100%)',
      pillarBorder: '1px solid #fdba74',
      pillarTextColor: '#7c2d12',
      labelColor: '#9a3412',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      )
    },
  };

  const c = meta[rank];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: rank === 1 ? '1.25' : '1',
      minWidth: '90px',
    }}>
      {/* Icon Badge */}
      <div style={{
        width: rank === 1 ? '40px' : '32px',
        height: rank === 1 ? '40px' : '32px',
        borderRadius: '50%',
        background: c.badgeBg,
        border: `1px solid ${c.badgeBorder}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0.4rem',
        boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
      }}>
        {c.icon}
      </div>

      {/* Player Name */}
      <div style={{
        fontWeight: 800,
        fontSize: rank === 1 ? '0.98rem' : '0.88rem',
        textAlign: 'center',
        maxWidth: '120px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: '#111827',
        marginBottom: '0.4rem'
      }}>
        {player.displayName}
      </div>

      {/* Pillar Box */}
      <div style={{
        width: '100%',
        height,
        background: c.pillarBg,
        border: c.pillarBorder,
        borderRadius: '14px 14px 0 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.02)',
        gap: '2px',
        padding: '0 4px',
        boxSizing: 'border-box'
      }}>
        <span style={{
          fontSize: rank === 1 ? '1.65rem' : '1.3rem',
          fontWeight: 900,
          color: c.pillarTextColor,
          lineHeight: 1
        }}>
          {sortBy === 'elo' ? player.elo : player.totalXp.toLocaleString()}
        </span>
        <span style={{
          fontSize: '0.72rem',
          fontWeight: 800,
          color: c.labelColor,
          textTransform: 'uppercase',
          letterSpacing: '0.04em'
        }}>
          {sortBy === 'elo' ? 'ELO' : 'XP'}
        </span>
      </div>
    </div>
  );
}
