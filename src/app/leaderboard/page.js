'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LeaderboardPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('elo');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/leaderboard?sort=${sortBy}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setPlayers(data.players || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sortBy]);

  const getRankStyle = (index) => {
    if (index === 0) return { background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#000' };
    if (index === 1) return { background: 'linear-gradient(135deg, #d1d5db, #9ca3af)', color: '#000' };
    if (index === 2) return { background: 'linear-gradient(135deg, #d97706, #b45309)', color: '#fff' };
    return { background: 'rgba(255,255,255,0.08)', color: '#f3f4f6' };
  };

  const getRankEmoji = (index) => {
    if (index === 0) return '👑';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a1a 100%)',
      color: '#f3f4f6',
      fontFamily: "'Outfit', sans-serif",
    }}>
      {/* Header */}
      <header style={{
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10,10,10,0.8)',
      }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#f3f4f6', fontSize: '1.5rem', fontWeight: 800 }}>
          LostStreet
        </Link>
        <Link href="/" style={{
          textDecoration: 'none',
          color: '#fff',
          background: 'linear-gradient(135deg, #10b981, #3b82f6)',
          padding: '10px 24px',
          borderRadius: '50px',
          fontWeight: 600,
          fontSize: '0.95rem',
        }}>
          ▶ Play Now
        </Link>
      </header>

      {/* Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          🏆 Leaderboard
        </h1>
        <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Top players on LostStreet
        </p>

        {/* Sort Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
        }}>
          <button
            onClick={() => setSortBy('elo')}
            style={{
              padding: '10px 24px',
              borderRadius: '50px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              background: sortBy === 'elo' ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.08)',
              color: '#fff',
              transition: 'all 0.2s',
            }}
          >
            🎯 By ELO Rating
          </button>
          <button
            onClick={() => setSortBy('xp')}
            style={{
              padding: '10px 24px',
              borderRadius: '50px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              background: sortBy === 'xp' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'rgba(255,255,255,0.08)',
              color: '#fff',
              transition: 'all 0.2s',
            }}
          >
            ⭐ By Total XP
          </button>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem 0', fontSize: '1.2rem', color: '#9ca3af' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(255,255,255,0.1)',
              borderTop: '3px solid #10b981',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem',
            }} />
            Loading leaderboard...
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {error && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 0',
            color: '#f87171',
            fontSize: '1.1rem',
          }}>
            <p>❌ Failed to load leaderboard</p>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>
          </div>
        )}

        {/* Podium — Top 3 */}
        {!loading && !error && players.length >= 3 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: '1rem',
            marginBottom: '2.5rem',
            padding: '0 1rem',
          }}>
            {/* 2nd place */}
            <PodiumCard player={players[1]} rank={2} height="140px" />
            {/* 1st place */}
            <PodiumCard player={players[0]} rank={1} height="180px" />
            {/* 3rd place */}
            <PodiumCard player={players[2]} rank={3} height="110px" />
          </div>
        )}

        {/* Full List */}
        {!loading && !error && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {players.slice(3).map((player, i) => {
              const rank = i + 4;
              return (
                <div key={player.uid} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.5rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  transition: 'background 0.2s',
                }}>
                  <span style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: '#9ca3af',
                    flexShrink: 0,
                  }}>
                    {rank}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {player.displayName}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {player.duels_wins}W / {player.duels_losses}L · 🔥 {player.dailyChallengeStreak}d streak
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: sortBy === 'elo' ? '#10b981' : '#3b82f6' }}>
                      {sortBy === 'elo' ? player.elo : player.totalXp.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {sortBy === 'elo' ? 'ELO' : 'XP'}
                    </div>
                  </div>
                </div>
              );
            })}

            {players.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280', fontSize: '1.1rem' }}>
                No players yet. Be the first to play!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        color: '#6b7280',
        fontSize: '0.85rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        marginTop: '2rem',
      }}>
        <p>© {new Date().getFullYear()} LostStreet. A free geography guessing game.</p>
        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
          <Link href="/about" style={{ color: '#6b7280', textDecoration: 'none' }}>About</Link>
        </div>
      </footer>
    </div>
  );
}

function PodiumCard({ player, rank, height }) {
  const colors = {
    1: { bg: 'linear-gradient(135deg, #fbbf24, #f59e0b)', glow: 'rgba(251,191,36,0.3)', emoji: '👑' },
    2: { bg: 'linear-gradient(135deg, #e5e7eb, #9ca3af)', glow: 'rgba(156,163,175,0.2)', emoji: '🥈' },
    3: { bg: 'linear-gradient(135deg, #d97706, #92400e)', glow: 'rgba(217,119,6,0.2)', emoji: '🥉' },
  };
  const c = colors[rank];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      flex: rank === 1 ? '1.2' : '1',
    }}>
      <span style={{ fontSize: rank === 1 ? '2rem' : '1.5rem' }}>{c.emoji}</span>
      <div style={{
        fontWeight: 700,
        fontSize: rank === 1 ? '1rem' : '0.9rem',
        textAlign: 'center',
        maxWidth: '120px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {player.displayName}
      </div>
      <div style={{
        width: '100%',
        height,
        background: c.bg,
        borderRadius: '12px 12px 0 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 0 30px ${c.glow}`,
        gap: '0.25rem',
      }}>
        <span style={{ fontSize: rank === 1 ? '1.8rem' : '1.4rem', fontWeight: 800, color: rank === 2 ? '#000' : '#fff' }}>
          {player.elo}
        </span>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: rank === 2 ? '#374151' : 'rgba(255,255,255,0.8)' }}>
          ELO
        </span>
      </div>
    </div>
  );
}
