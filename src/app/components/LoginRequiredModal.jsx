'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/AuthContext';

/**
 * LoginRequiredModal
 * Full-screen overlay prompting the user to sign in,
 * styled to match the light theme of the main educational/home sections.
 */

const FEATURE_META = {
  leaderboard: {
    icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7c0 6 6 10 6 10s6-4 6-10V2z" /></svg>,
    accent: '#f59e0b', // Amber
    title: 'View Your Rank',
    subtitle: 'Sign in to see your leaderboard standing, compare ELO ratings, and track your progress.',
    perks: [
      { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-4" /></svg>, text: 'See your global ELO rank' },
      { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>, text: 'Compete for a podium spot' },
      { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>, text: 'Track your daily challenge streak' },
    ],
  },
  find_match: {
    icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" /><line x1="13" x2="19" y1="19" y2="13" /><line x1="16" x2="20" y1="16" y2="20" /><line x1="19" x2="21" y1="21" y2="19" /><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" /><line x1="5" x2="9" y1="14" y2="18" /><line x1="7" x2="4" y1="17" y2="20" /><line x1="3" x2="5" y1="19" y2="21" /></svg>,
    accent: '#3b82f6', // Blue
    title: 'Find a Match',
    subtitle: 'Sign in to enter the matchmaking queue and battle real players in ranked or casual duels.',
    perks: [
      { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>, text: 'Real-time 1v1 duels worldwide' },
      { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>, text: 'Earn & protect your ELO rating' },
      { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>, text: 'Play vs bots if no opponent found' },
    ],
  },
  create_party: {
    icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" x2="10" y1="12" y2="12" /><line x1="8" x2="8" y1="10" y2="14" /><line x1="15" x2="15.01" y1="13" y2="13" /><line x1="18" x2="18.01" y1="11" y2="11" /><rect width="20" height="12" x="2" y="6" rx="2" /></svg>,
    accent: '#8b5cf6', // Purple
    title: 'Create a Party Room',
    subtitle: 'Sign in to create a private party room, invite friends, and play together.',
    perks: [
      { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>, text: 'Private room with invite code' },
      { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, text: 'Play with up to 4 friends' },
      { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" x2="9" y1="3" y2="18" /><line x1="15" x2="15" y1="6" y2="21" /></svg>, text: 'Customize game settings' },
    ],
  },
  join_party: {
    icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 4h3a2 2 0 0 1 2 2v14" /><path d="M2 20h3" /><path d="M13 20h9" /><path d="M10 12v.01" /><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z" /></svg>,
    accent: '#10b981', // Green
    title: 'Join a Party Room',
    subtitle: 'Sign in to enter your friend\'s room code and jump straight into the action.',
    perks: [
      { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>, text: 'Join with a 6-character code' },
      { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>, text: 'Jump into an active match' },
      { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>, text: 'Reconnect to games in progress' },
    ],
  },
};

export default function LoginRequiredModal({ isOpen, onClose, feature = 'find_match' }) {
  const { loginWithGoogle } = useAuth();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const meta = FEATURE_META[feature] || FEATURE_META.find_match;

  useEffect(() => {
    if (isOpen) {
      setLeaving(false);
      setVisible(false);
      const t = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Block body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setLeaving(true);
    setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 280);
  }, [onClose]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await loginWithGoogle();
      handleClose();
    } catch (e) {
      console.warn('Login failed:', e);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose]);

  if (!isOpen && !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Sign in required to ${meta.title}`}
      className="login-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: leaving ? 'rgba(0,0,0,0)' : 'rgba(17, 24, 39, 0.4)',
        backdropFilter: visible && !leaving ? 'blur(8px)' : 'blur(0px)',
        WebkitBackdropFilter: visible && !leaving ? 'blur(8px)' : 'blur(0px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="login-modal-card"
        style={{
          width: '100%',
          maxWidth: '520px',
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '24px',
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: '#111827',
          fontFamily: '"Outfit", sans-serif',
          position: 'relative',
          overflow: 'hidden',
          transform: visible && !leaving ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)',
          opacity: visible && !leaving ? 1 : 0,
          transition: 'transform 0.28s cubic-bezier(0.16,1,0.3,1), opacity 0.28s ease',
        }}
      >

        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#f3f4f6',
            border: 'none',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.2s ease',
            zIndex: 10,
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#111827'; e.currentTarget.style.background = '#e5e7eb'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.background = '#f3f4f6'; }}
        >
          ✕
        </button>

        {/* Header content */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          {/* Pill badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: `${meta.accent}15`,
            border: `1px solid ${meta.accent}35`,
            borderRadius: '20px',
            padding: '5px 14px',
            fontSize: '0.82rem',
            fontWeight: 800,
            color: meta.accent,
            marginBottom: '14px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            <span>Sign in required</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: 900,
            margin: '0 0 12px 0',
            color: '#111827',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}>
            <span style={{ fontSize: '2.4rem' }}>{meta.icon}</span>
            {meta.title}
          </h2>

          <p style={{
            fontSize: '1rem',
            color: '#4b5563',
            margin: 0,
            lineHeight: 1.6,
          }}>
            {meta.subtitle}
          </p>
        </div>

        {/* Perks Grid */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '2.5rem',
        }}>
          {meta.perks.map((perk, i) => (
            <div
              key={i}
              style={{
                background: '#fafafa',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{
                fontSize: '1.4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                {perk.icon}
              </div>
              <div style={{
                fontWeight: 600,
                fontSize: '1.05rem',
                color: '#374151',
              }}>
                {perk.text}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            style={{
              width: '100%',
              background: isLoggingIn ? '#e5e7eb' : '#059669', // Theme green
              border: 'none',
              borderRadius: '16px',
              padding: '16px 24px',
              color: isLoggingIn ? '#6b7280' : '#ffffff',
              fontSize: '1.1rem',
              fontWeight: 800,
              fontFamily: '"Outfit", sans-serif',
              cursor: isLoggingIn ? 'not-allowed' : 'pointer',
              boxShadow: isLoggingIn ? 'none' : '0 4px 12px rgba(5, 150, 105, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
              marginBottom: '16px',
            }}
            onMouseEnter={e => {
              if (!isLoggingIn) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.4)';
                e.currentTarget.style.background = '#047857';
              }
            }}
            onMouseLeave={e => {
              if (!isLoggingIn) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
                e.currentTarget.style.background = '#059669';
              }
            }}
          >
            {isLoggingIn ? (
              <>
                <div style={{
                  width: '20px', height: '20px',
                  border: '3px solid rgba(107,114,128,0.3)',
                  borderTopColor: '#6b7280',
                  borderRadius: '50%',
                  animation: 'lrm-spin 0.8s linear infinite',
                }} />
                Signing in...
              </>
            ) : (
              <>
                {/* Google G icon */}
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.5 6.7 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.5-.4-3.5z" fill="#ffffff" />
                  <path d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.5 7.3 29.5 4.5 24 4.5 16.2 4.5 9.5 9 6.3 14.7z" fill="rgba(255,255,255,0.8)" />
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              padding: '8px',
              fontFamily: '"Outfit", sans-serif',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#374151'}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
          >
            Not right now
          </button>
        </div>

      </div>

      <style>{`
        @keyframes lrm-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
