'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useGameStore } from '@/lib/store';
import { REWARD_CONFIG, getStreakStatus, getRewardForDay, formatDateUTC } from '@/lib/dailyReward';
import { updateUserDailyReward } from '@/lib/userProfile';
import { sounds } from '@/lib/sounds';

export default function DailyRewardOverlay({ forceOpen = false, onClose }) {
  const { userProfile, setUserProfile } = useAuth();
  const { 
    coins, 
    addCoins, 
    setCoins, 
    loginStreak, 
    setLoginStreak, 
    lastClaimDate, 
    setLastClaimDate,
    showDailyRewardOverlay, 
    setShowDailyRewardOverlay 
  } = useGameStore();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [claimedReward, setClaimedReward] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [particles, setParticles] = useState([]);

  // Determine current active streak & claim eligibility
  const todayUTC = useMemo(() => formatDateUTC(new Date()), []);
  const effectiveLastClaim = userProfile?.lastDailyRewardDate || lastClaimDate || null;
  const effectiveStreak = userProfile?.loginStreak !== undefined ? userProfile.loginStreak : loginStreak;

  const streakInfo = useMemo(() => {
    return getStreakStatus(effectiveLastClaim, todayUTC, effectiveStreak);
  }, [effectiveLastClaim, todayUTC, effectiveStreak]);

  // Initial check on mount: check eligibility only ONCE on initial page load
  useEffect(() => {
    // If dismissed in this session, do not auto-open
    try {
      if (sessionStorage.getItem('loststreet_daily_reward_dismissed') === 'true') {
        return;
      }
    } catch (e) {}

    let isMounted = true;

    async function checkStatus() {
      try {
        const uid = userProfile?.uid || 'guest';
        const res = await fetch(`/api/daily-reward?uid=${encodeURIComponent(uid)}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            if (data.canClaim) {
              setIsOpen(true);
            }
            if (typeof data.coins === 'number' && data.coins !== coins) {
              setCoins(data.coins);
            }
            if (typeof data.totalStreak === 'number' && data.totalStreak !== loginStreak) {
              setLoginStreak(data.totalStreak);
            }
          }
        }
      } catch (e) {
        // Quiet fallback
      }
    }

    checkStatus();
    return () => { isMounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Respond to explicit user open actions (e.g. clicking CoinHUD or Notifications item)
  useEffect(() => {
    if (forceOpen || showDailyRewardOverlay) {
      setIsOpen(true);
    }
  }, [forceOpen, showDailyRewardOverlay]);

  const handleClose = useCallback(() => {
    try {
      sessionStorage.setItem('loststreet_daily_reward_dismissed', 'true');
    } catch (e) {}
    setIsOpen(false);
    setShowDailyRewardOverlay(false);
    setShowCelebration(false);
    if (onClose) onClose();
  }, [onClose, setShowDailyRewardOverlay]);

  // Spawn coin burst particles
  const triggerBurst = () => {
    const newParticles = Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * 360 + (Math.random() * 20 - 10);
      const distance = 80 + Math.random() * 120;
      const rad = (angle * Math.PI) / 180;
      return {
        id: i,
        x: Math.cos(rad) * distance,
        y: Math.sin(rad) * distance - 30,
        scale: 0.6 + Math.random() * 0.7,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.1,
        icon: Math.random() > 0.3 ? '🪙' : '✨'
      };
    });
    setParticles(newParticles);
  };

  const handleClaim = async () => {
    if (claiming || !streakInfo.canClaim) return;
    setClaiming(true);

    try {
      const activeReward = getRewardForDay(streakInfo.streakDay);
      const uid = userProfile?.uid || 'guest';

      const res = await fetch('/api/daily-reward', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid })
      });

      const data = await res.json().catch(() => ({}));
      const coinsEarned = data.coinsEarned || activeReward.coins;
      const newStreak = data.totalStreak || (streakInfo.isReset ? 1 : effectiveStreak + 1);

      // Play sound
      try {
        if (sounds && sounds.playRareRound) {
          sounds.playRareRound();
        }
      } catch (e) {}

      // Update Zustand & User Profile
      addCoins(coinsEarned);
      setLoginStreak(newStreak);
      setLastClaimDate(todayUTC);

      if (userProfile && setUserProfile) {
        setUserProfile(prev => ({
          ...prev,
          coins: (prev?.coins || 0) + coinsEarned,
          loginStreak: newStreak,
          lastDailyRewardDate: todayUTC
        }));
      }

      await updateUserDailyReward(uid, newStreak, todayUTC, (coins || 0) + coinsEarned);

      setClaimedReward({
        coins: coinsEarned,
        bonusItem: data.bonusItem || activeReward.bonusItem,
        day: streakInfo.streakDay
      });

      setShowCelebration(true);
      triggerBurst();

      // Auto-dismiss after 2.4s of celebratory viewing
      setTimeout(() => {
        handleClose();
      }, 2400);

    } catch (err) {
      console.error('Error claiming reward:', err);
    } finally {
      setClaiming(false);
    }
  };

  if (!isOpen || loading) return null;

  const currentStreakDay = streakInfo.streakDay;

  return (
    <div
      className="daily-reward-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(6, 9, 18, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      <div
        className="daily-reward-modal"
        style={{
          width: '100%',
          maxWidth: '560px',
          background: 'linear-gradient(180deg, rgba(22, 27, 44, 0.95), rgba(12, 16, 28, 0.98))',
          border: '1px solid rgba(232, 200, 74, 0.25)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(232, 200, 74, 0.12)',
          padding: 'clamp(1.2rem, 4vw, 2rem)',
          color: '#fff',
          fontFamily: '"Outfit", sans-serif',
          position: 'relative',
          overflow: 'hidden',
          animation: 'scaleUp 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* Subtle decorative glow orb */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '260px',
          height: '140px',
          background: 'radial-gradient(ellipse, rgba(232, 200, 74, 0.28), transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }} />

        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close Daily Rewards"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
        >
          ✕
        </button>

        {/* Header Title & Streak Progress */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(232, 200, 74, 0.12)',
            border: '1px solid rgba(232, 200, 74, 0.3)',
            borderRadius: '20px',
            padding: '4px 14px',
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#fef08a',
            marginBottom: '8px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            <span>✨ Daily Explorer Rewards</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
            fontWeight: 800,
            margin: '0 0 6px 0',
            color: '#ffffff',
            letterSpacing: '-0.01em',
          }}>
            {streakInfo.canClaim ? "Claim Today's Reward!" : "Daily Reward Progress"}
          </h2>

          <p style={{
            fontSize: '0.9rem',
            color: '#9ca3af',
            margin: 0,
          }}>
            {effectiveStreak > 0 ? (
              <>Current Login Streak: <strong style={{ color: '#fbbf24' }}>🔥 {effectiveStreak} {effectiveStreak === 1 ? 'Day' : 'Days'}</strong></>
            ) : (
              'Login every day to unlock bigger coin rewards and Day 7 bonuses!'
            )}
          </p>
        </div>

        {/* 7-Tile Progression Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '1.5rem',
        }}>
          {REWARD_CONFIG.map((tile) => {
            const isClaimed = streakInfo.canClaim 
              ? tile.day < currentStreakDay 
              : tile.day <= currentStreakDay;

            const isCurrent = streakInfo.canClaim && tile.day === currentStreakDay;
            const isLocked = !isClaimed && !isCurrent;
            const isDay7 = tile.day === 7;

            if (isDay7) {
              return (
                <div
                  key={tile.day}
                  style={{
                    gridColumn: 'span 2',
                    minHeight: '110px',
                    background: isCurrent
                      ? 'linear-gradient(135deg, rgba(232, 200, 74, 0.25), rgba(35, 26, 12, 0.95))'
                      : isClaimed
                      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(12, 24, 20, 0.9))'
                      : 'linear-gradient(135deg, rgba(30, 27, 45, 0.6), rgba(15, 18, 30, 0.8))',
                    border: isCurrent
                      ? '2px solid #e8c84a'
                      : isClaimed
                      ? '1px solid rgba(16, 185, 129, 0.45)'
                      : '1px solid rgba(232, 200, 74, 0.2)',
                    borderRadius: '16px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    boxShadow: isCurrent ? '0 0 25px rgba(232, 200, 74, 0.35)' : 'none',
                    animation: isCurrent ? 'goldPulseGlow 2s infinite ease-in-out' : 'none',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Left Column: Day Label + VIP Badge */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      color: isCurrent ? '#fef08a' : isClaimed ? '#6ee7b7' : '#e2e8f0',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}>
                      Day 7
                    </span>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      color: '#fef08a',
                      background: 'rgba(232, 200, 74, 0.2)',
                      padding: '2px 6px',
                      borderRadius: '6px',
                      width: 'fit-content',
                      letterSpacing: '0.04em',
                    }}>
                      {isClaimed ? 'CLAIMED ✓' : 'VIP REWARD'}
                    </span>
                  </div>

                  {/* Center Crown Icon */}
                  <div style={{
                    fontSize: '2rem',
                    filter: isLocked ? 'drop-shadow(0 0 8px rgba(232,200,74,0.4))' : 'none',
                    animation: isCurrent ? 'hudPulse 2.5s infinite ease-in-out' : 'none',
                  }}>
                    👑
                  </div>

                  {/* Right Column: Coin Amount + Mystery Pack */}
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{
                      fontWeight: 900,
                      fontSize: '1.2rem',
                      color: isCurrent ? '#fef08a' : isClaimed ? '#a7f3d0' : '#fef08a',
                      letterSpacing: '-0.01em',
                    }}>
                      +150
                    </div>
                    <div style={{
                      fontSize: '0.72rem',
                      color: '#fef08a',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}>
                      + Mystery Pack
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={tile.day}
                style={{
                  gridColumn: 'span 1',
                  minHeight: '110px',
                  background: isCurrent
                    ? 'linear-gradient(145deg, rgba(232, 200, 74, 0.22), rgba(30, 24, 12, 0.95))'
                    : isClaimed
                    ? 'linear-gradient(145deg, rgba(16, 185, 129, 0.12), rgba(10, 20, 16, 0.9))'
                    : 'rgba(255, 255, 255, 0.03)',
                  border: isCurrent
                    ? '2px solid #e8c84a'
                    : isClaimed
                    ? '1px solid rgba(16, 185, 129, 0.4)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '10px 8px 12px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  boxShadow: isCurrent ? '0 0 20px rgba(232, 200, 74, 0.3)' : 'none',
                  animation: isCurrent ? 'goldPulseGlow 2s infinite ease-in-out' : 'none',
                  position: 'relative',
                }}
              >
                {/* Top Row: Day Label & Status Tag */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0 4px',
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: isCurrent ? '#fef08a' : isClaimed ? '#6ee7b7' : '#9ca3af',
                    letterSpacing: '0.02em',
                  }}>
                    Day {tile.day}
                  </span>

                  {isClaimed && (
                    <span style={{
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      color: '#34d399',
                      background: 'rgba(16, 185, 129, 0.2)',
                      padding: '1px 5px',
                      borderRadius: '4px',
                    }}>
                      ✓
                    </span>
                  )}
                </div>

                {/* Center Icon */}
                <div style={{
                  fontSize: '1.4rem',
                  margin: '4px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: isClaimed
                    ? 'rgba(16, 185, 129, 0.15)'
                    : isCurrent
                    ? 'rgba(232, 200, 74, 0.2)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isClaimed
                    ? '1px solid rgba(16, 185, 129, 0.3)'
                    : isCurrent
                    ? '1px solid rgba(232, 200, 74, 0.4)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                }}>
                  {isClaimed ? (
                    <span style={{ color: '#34d399', fontSize: '1.1rem', fontWeight: 900 }}>✓</span>
                  ) : isCurrent ? (
                    <span>🪙</span>
                  ) : (
                    <span style={{ opacity: 0.4, filter: 'grayscale(0.6)' }}>🪙</span>
                  )}
                </div>

                {/* Reward Value at Bottom */}
                <div style={{
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  color: isCurrent ? '#ffffff' : isClaimed ? '#a7f3d0' : '#9ca3af',
                }}>
                  +{tile.coins}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button & Status Bar */}
        <div style={{ textAlign: 'center' }}>
          {streakInfo.canClaim ? (
            <button
              onClick={handleClaim}
              disabled={claiming}
              className="daily-claim-btn"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #e8c84a, #d97706)',
                border: 'none',
                borderRadius: '16px',
                padding: '14px 24px',
                color: '#1a1000',
                fontSize: '1.05rem',
                fontWeight: 800,
                fontFamily: '"Outfit", sans-serif',
                cursor: claiming ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 24px rgba(232, 200, 74, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'transform 0.15s ease, filter 0.15s ease',
              }}
              onMouseEnter={e => { if (!claiming) e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { if (!claiming) e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {claiming ? (
                <span>Claiming Reward...</span>
              ) : (
                <>
                  <span>Claim Day {streakInfo.streakDay} Reward (+{getRewardForDay(streakInfo.streakDay).coins} Coins)</span>
                  <span>✨</span>
                </>
              )}
            </button>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              padding: '12px 16px',
              color: '#9ca3af',
              fontSize: '0.92rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}>
              <span>✅</span>
              <span>Today's reward already claimed! Next reward unlocks tomorrow at 00:00 UTC.</span>
            </div>
          )}
        </div>

        {/* Celebration Particle Burst */}
        {showCelebration && (
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
          }}>
            {particles.map(p => (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  fontSize: '20px',
                  transform: `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg) scale(${p.scale})`,
                  animation: `particleFade 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards ${p.delay}s`,
                }}
              >
                {p.icon}
              </div>
            ))}

            {claimedReward && (
              <div style={{
                background: 'rgba(15, 23, 42, 0.95)',
                border: '2px solid #e8c84a',
                borderRadius: '20px',
                padding: '18px 28px',
                textAlign: 'center',
                boxShadow: '0 0 40px rgba(232, 200, 74, 0.6)',
                animation: 'popIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '4px' }}>🎉</div>
                <div style={{ fontWeight: 800, fontSize: '1.3rem', color: '#fef08a' }}>
                  +{claimedReward.coins} Coins Claimed!
                </div>
                {claimedReward.bonusItem && (
                  <div style={{ fontSize: '0.9rem', color: '#6ee7b7', marginTop: '4px', fontWeight: 700 }}>
                    Unlocked: {claimedReward.bonusItem.name} {claimedReward.bonusItem.icon}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
