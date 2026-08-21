'use client';
import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '@/lib/store';
import { useAuth } from '@/lib/AuthContext';

export default function CoinHUD({ onOpenDailyReward }) {
  const { coins, loginStreak, setShowDailyRewardOverlay } = useGameStore();
  const { userProfile } = useAuth();
  
  const displayCoins = userProfile?.coins !== undefined ? userProfile.coins : coins;
  const streak = userProfile?.loginStreak !== undefined ? userProfile.loginStreak : loginStreak;

  const prevCoinsRef = useRef(displayCoins);
  const [delta, setDelta] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (prevCoinsRef.current !== displayCoins) {
      const diff = displayCoins - prevCoinsRef.current;
      if (diff !== 0) {
        setDelta(diff > 0 ? `+${diff}` : `${diff}`);
        setAnimate(true);
        const timer = setTimeout(() => {
          setDelta(null);
          setAnimate(false);
        }, 1600);
        prevCoinsRef.current = displayCoins;
        return () => clearTimeout(timer);
      }
    }
    prevCoinsRef.current = displayCoins;
  }, [displayCoins]);

  const handleClick = () => {
    if (onOpenDailyReward) {
      onOpenDailyReward();
    } else {
      setShowDailyRewardOverlay(true);
    }
  };

  return (
    <div className="coin-hud-wrapper" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <button
        onClick={handleClick}
        className={`coin-hud-pill ${animate ? 'coin-hud-pulse' : ''}`}
        aria-label={`Coins: ${displayCoins}. Daily streak: ${streak} days. Click to view daily rewards.`}
        title="View Daily Rewards & Coin Balance"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'linear-gradient(135deg, rgba(30, 24, 12, 0.85), rgba(18, 14, 8, 0.92))',
          border: '1px solid rgba(232, 200, 74, 0.35)',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4), 0 0 10px rgba(232, 200, 74, 0.15)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '20px',
          padding: '5px 12px 5px 8px',
          color: '#fff',
          fontFamily: '"Outfit", sans-serif',
          cursor: 'pointer',
          transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          userSelect: 'none',
          touchAction: 'manipulation',
          minHeight: '34px',
        }}
      >
        {/* Animated Gold Coin Icon */}
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #ffe680, #e8c84a 55%, #996f00)',
          boxShadow: '0 2px 6px rgba(232, 200, 74, 0.4), inset 0 1px 1px rgba(255,255,255,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 900,
          color: '#3d2600',
          border: '1px solid #ffe885',
          flexShrink: 0,
        }}>
          🪙
        </div>

        {/* Coin Amount */}
        <span style={{
          fontWeight: 800,
          fontSize: '0.95rem',
          letterSpacing: '0.02em',
          color: '#fef08a',
          textShadow: '0 1px 4px rgba(0,0,0,0.5)',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {displayCoins.toLocaleString()}
        </span>

        {/* Streak Flame Badge */}
        {streak > 0 && (
          <div className="coin-hud-streak" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(248, 113, 113, 0.35)',
            borderRadius: '10px',
            padding: '2px 6px',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#fca5a5',
            marginLeft: '2px',
          }}>
            <span>🔥</span>
            <span>{streak}d</span>
          </div>
        )}
      </button>

      {/* Floating Delta Animation Indicator (+20 / -15) */}
      {delta && (
        <div
          className="coin-delta-float"
          style={{
            position: 'absolute',
            top: '-18px',
            right: '10px',
            fontWeight: 800,
            fontSize: '0.85rem',
            fontFamily: '"Outfit", sans-serif',
            color: delta.startsWith('+') ? '#4ade80' : '#f87171',
            textShadow: '0 2px 6px rgba(0,0,0,0.8)',
            pointerEvents: 'none',
            animation: 'coinFloatUp 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            zIndex: 100,
          }}
        >
          {delta}
        </div>
      )}
    </div>
  );
}
