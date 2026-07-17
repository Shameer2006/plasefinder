'use client';

import React, { useState, useEffect, useRef } from 'react';

const MAX_HEALTH = 5000;

function getHealthColor(percentage) {
  if (percentage > 60) return '#22C55E';
  if (percentage >= 30) return '#EAB308';
  return '#EF4444';
}

function getHealthGradient(color) {
  if (color === '#22C55E') return 'linear-gradient(90deg, #16a34a, #22C55E, #4ade80)';
  if (color === '#EAB308') return 'linear-gradient(90deg, #ca8a04, #EAB308, #facc15)';
  return 'linear-gradient(90deg, #dc2626, #EF4444, #f87171)';
}

function getHealthGlow(color) {
  return `0 0 12px ${color}66, 0 0 24px ${color}33`;
}

function PlayerHealthBar({ player, currentHealth, isMobile, side }) {
  const [shaking, setShaking] = useState(false);
  const [flashVisible, setFlashVisible] = useState(false);
  const prevHealthRef = useRef(currentHealth);

  const percentage = Math.max(0, Math.min(100, (currentHealth / MAX_HEALTH) * 100));
  const healthColor = getHealthColor(percentage);
  const healthGradient = getHealthGradient(healthColor);
  const healthGlow = getHealthGlow(healthColor);

  useEffect(() => {
    if (prevHealthRef.current > currentHealth) {
      setShaking(true);
      setFlashVisible(true);

      const shakeTimer = setTimeout(() => setShaking(false), 500);
      const flashTimer = setTimeout(() => setFlashVisible(false), 350);

      prevHealthRef.current = currentHealth;
      return () => {
        clearTimeout(shakeTimer);
        clearTimeout(flashTimer);
      };
    }
    prevHealthRef.current = currentHealth;
  }, [currentHealth]);

  const containerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: side === 'left' ? 'flex-start' : 'flex-end',
    gap: '8px',
    animation: shaking ? 'duelShake 0.5s ease' : 'none',
    position: 'relative',
    minWidth: 0,
  };

  if (isMobile) {
    containerStyle.alignItems = 'flex-start';
    containerStyle.width = '100%';
  }

  const playerInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexDirection: side === 'right' && !isMobile ? 'row-reverse' : 'row',
  };

  const flagStyle = {
    width: isMobile ? 24 : 28,
    height: isMobile ? 16 : 19,
    borderRadius: '3px',
    objectFit: 'cover',
    border: '1px solid rgba(255,255,255,0.2)',
    flexShrink: 0,
  };

  const nameStyle = {
    color: '#fff',
    fontSize: isMobile ? '14px' : '16px',
    fontWeight: 700,
    letterSpacing: '0.3px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: isMobile ? '140px' : '180px',
  };

  const eloBadgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    background: 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.1))',
    border: '1px solid rgba(251,191,36,0.3)',
    borderRadius: '12px',
    padding: '2px 10px',
    fontSize: isMobile ? '11px' : '12px',
    fontWeight: 600,
    color: '#fbbf24',
    marginTop: '-2px',
  };

  const healthTextStyle = {
    fontSize: isMobile ? '12px' : '13px',
    fontWeight: 600,
    color: healthColor,
    fontFamily: 'monospace',
    letterSpacing: '0.5px',
    textAlign: side === 'right' && !isMobile ? 'right' : 'left',
    width: '100%',
    transition: 'color 0.8s ease',
  };

  const barTrackStyle = {
    width: '100%',
    height: isMobile ? '14px' : '18px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid rgba(255,255,255,0.05)',
  };

  const barFillStyle = {
    height: '100%',
    width: `${percentage}%`,
    background: healthGradient,
    borderRadius: '10px',
    transition: 'all 0.8s ease',
    boxShadow: healthGlow,
    position: 'relative',
    float: side === 'right' && !isMobile ? 'right' : 'left',
  };

  const flashOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '10px',
    background: 'rgba(239, 68, 68, 0.4)',
    opacity: flashVisible ? 1 : 0,
    transition: 'opacity 0.35s ease',
    pointerEvents: 'none',
  };

  const shimmerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
    animation: percentage > 0 ? 'duelShimmer 2.5s ease-in-out infinite' : 'none',
    borderRadius: '10px',
    pointerEvents: 'none',
  };

  return (
    <div style={containerStyle}>
      <div style={playerInfoStyle}>
        {player?.countryCode && (
          <img
            src={`https://flagcdn.com/w40/${player.countryCode.toLowerCase()}.png`}
            alt={player.countryCode}
            style={flagStyle}
          />
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: side === 'right' && !isMobile ? 'flex-end' : 'flex-start' }}>
          <span style={nameStyle}>{player?.displayName || 'Unknown'}</span>
          {player?.elo !== undefined && (
            <span style={eloBadgeStyle}>
              <span style={{ fontSize: '10px' }}>⭐</span>
              {Math.round(player.elo)} ELO
            </span>
          )}
        </div>
      </div>

      <div style={healthTextStyle}>
        {Math.max(0, Math.round(currentHealth)).toLocaleString()} / {MAX_HEALTH.toLocaleString()}
      </div>

      <div style={barTrackStyle}>
        <div style={barFillStyle}>
          <div style={shimmerStyle} />
        </div>
        <div style={flashOverlayStyle} />
      </div>
    </div>
  );
}

export default function DuelHealthBar({ players, health, isMobile }) {
  if (!players || !health) return null;

  const playerIds = Object.keys(players);
  if (playerIds.length < 2) return null;

  const [p1Id, p2Id] = playerIds;
  const p1 = players[p1Id];
  const p2 = players[p2Id];
  const h1 = health[p1Id] ?? MAX_HEALTH;
  const h2 = health[p2Id] ?? MAX_HEALTH;

  const wrapperStyle = {
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: isMobile ? '14px 16px' : '20px 28px',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    gap: isMobile ? '16px' : '20px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const vsStyle = {
    color: 'rgba(255,255,255,0.35)',
    fontSize: isMobile ? '16px' : '20px',
    fontWeight: 800,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    flexShrink: 0,
    textShadow: '0 0 10px rgba(255,255,255,0.1)',
    padding: isMobile ? '0' : '0 4px',
    userSelect: 'none',
  };

  const dividerStyle = {
    width: isMobile ? '100%' : 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isMobile ? '10px' : '0',
  };

  const hrLineStyle = {
    display: isMobile ? 'block' : 'none',
    flex: 1,
    height: '1px',
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
  };

  return (
    <>
      <style>{`
        @keyframes duelShake {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-4px) rotate(-0.5deg); }
          20% { transform: translateX(4px) rotate(0.5deg); }
          30% { transform: translateX(-3px) rotate(-0.3deg); }
          40% { transform: translateX(3px) rotate(0.3deg); }
          50% { transform: translateX(-2px); }
          60% { transform: translateX(2px); }
          70% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
          90% { transform: translateX(0); }
        }

        @keyframes duelShimmer {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div style={wrapperStyle}>
        <PlayerHealthBar
          player={p1}
          currentHealth={h1}
          isMobile={isMobile}
          side="left"
        />

        <div style={dividerStyle}>
          <hr style={hrLineStyle} />
          <span style={vsStyle}>VS</span>
          <hr style={hrLineStyle} />
        </div>

        <PlayerHealthBar
          player={p2}
          currentHealth={h2}
          isMobile={isMobile}
          side="right"
        />
      </div>
    </>
  );
}
