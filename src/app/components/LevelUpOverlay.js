'use client';
import { useState, useEffect, useRef } from 'react';
import { sounds } from '@/lib/sounds';

export default function LevelUpOverlay({ data, onClose }) {
  const [isMobile, setIsMobile] = useState(false);
  const touchStartY = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    sounds.playLevelUp();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartY.current !== null) {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > 60) onClose();
      touchStartY.current = null;
    }
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(10, 10, 26, 0.95)', backdropFilter: 'blur(15px)',
        padding: '1rem', boxSizing: 'border-box',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        @keyframes float-up {
          0%   { transform: translateY(100vh) scale(0.5) rotate(0deg);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-20vh) scale(1.5) rotate(360deg); opacity: 0; }
        }
        @keyframes pop-in {
          0%   { transform: scale(0.1); opacity: 0; }
          60%  { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }

        /* ── Card wrapper ── */
        .lu-card {
          animation: pop-in 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          z-index: 10;
          text-align: center;
          padding: 1rem;
          max-width: 100%;
          width: 100%;
          box-sizing: border-box;
        }

        /* ── Trophy circle ── */
        .lu-trophy {
          position: relative;
          width: 250px;
          height: 250px;
          margin: 0 auto 1.5rem;
        }
        .lu-trophy-emoji {
          font-size: 7rem;
          text-shadow: 0 5px 15px rgba(0,0,0,0.3);
          line-height: 1;
        }

        /* ── Title ── */
        .lu-title {
          font-size: 4.5rem;
          margin-bottom: 0.8rem;
          background: linear-gradient(to right, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Level badge ── */
        .lu-badge {
          background: rgba(0,0,0,0.5);
          padding: 1.5rem 3rem;
          border-radius: 24px;
          margin-bottom: 3rem;
          display: inline-block;
          border: 1px solid rgba(251,191,36,0.3);
        }
        .lu-badge p  { font-size: 2rem;   color: white; margin: 0; }
        .lu-badge strong { color: #fbbf24; font-size: 2.5rem; }

        /* ── Button ── */
        .lu-btn {
          font-size: 1.5rem;
          padding: 18px 48px;
          background: linear-gradient(135deg, #fbbf24, #d97706);
          color: #111;
          font-weight: bold;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(245,158,11,0.5);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .lu-btn:active {
          transform: scale(0.96);
          box-shadow: 0 5px 15px rgba(245,158,11,0.35);
        }

        /* ── Hint ── */
        .lu-hint { font-size: 0.8rem; color: #6b7280; margin-top: 1rem; }

        /* ── Tablet ≤ 768px ── */
        @media (max-width: 768px) {
          .lu-trophy          { width: 190px; height: 190px; margin-bottom: 1.2rem; }
          .lu-trophy-emoji    { font-size: 5.5rem; }
          .lu-title           { font-size: 3.2rem; }
          .lu-badge           { padding: 1rem 2rem; margin-bottom: 2rem; }
          .lu-badge p         { font-size: 1.4rem; }
          .lu-badge strong    { font-size: 1.9rem; }
          .lu-btn             { font-size: 1.2rem; padding: 14px 40px; }
        }

        /* ── Mobile ≤ 480px ── */
        @media (max-width: 480px) {
          .lu-trophy          { width: 140px; height: 140px; margin-bottom: 1rem; }
          .lu-trophy-emoji    { font-size: 4rem; }
          .lu-title           { font-size: 2.4rem; }
          .lu-badge           { padding: 0.75rem 1.4rem; margin-bottom: 1.5rem; border-radius: 16px; }
          .lu-badge p         { font-size: 1.1rem; }
          .lu-badge strong    { font-size: 1.45rem; }
          .lu-btn             { font-size: 1.05rem; padding: 13px 32px; }
          .lu-hint            { font-size: 0.72rem; }
        }

        /* ── Very small phones ≤ 360px ── */
        @media (max-width: 360px) {
          .lu-trophy          { width: 108px; height: 108px; }
          .lu-trophy-emoji    { font-size: 3.2rem; }
          .lu-title           { font-size: 2rem; }
          .lu-badge p         { font-size: 1rem; }
          .lu-badge strong    { font-size: 1.3rem; }
          .lu-btn             { font-size: 0.95rem; padding: 11px 28px; }
        }
      `}</style>

      {/* Confetti particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}vw`,
          animation: `float-up ${Math.random() * 3 + 2}s linear infinite`,
          animationDelay: `-${Math.random() * 5}s`,
          fontSize: `${Math.random() * 1.5 + 0.8}rem`,
          opacity: 0.6,
          zIndex: 1,
          pointerEvents: 'none',
        }}>
          &#10024;
        </div>
      ))}

      <div className="lu-card">
        {/* Trophy */}
        <div className="lu-trophy">
          <div style={{
            position: 'absolute', inset: -20,
            background: 'conic-gradient(from 0deg, transparent, rgba(251,191,36,0.4), transparent 40deg)',
            animation: 'spin-slow 10s linear infinite', borderRadius: '50%',
          }} />
          <div style={{
            position: 'relative', width: '100%', height: '100%',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 60px rgba(245,158,11,0.6), inset 0 0 30px rgba(255,255,255,0.6)',
            border: '6px solid #fef3c7',
          }}>
            <span className="lu-trophy-emoji">&#127942;</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="lu-title gradient-text glow-text">LEVEL UP!</h1>

        {/* Level badge */}
        <div className="lu-badge">
          <p>You reached Level <strong>{data?.newLevel || 2}</strong></p>
        </div>

        {/* CTA button */}
        <div>
          <button className="lu-btn btn" onClick={onClose}>Awesome!</button>
        </div>

        {/* Dismiss hint */}
        <p className="lu-hint">
          {isMobile ? 'Swipe or tap outside to dismiss' : 'Press Escape or click outside to dismiss'}
        </p>
      </div>
    </div>
  );
}
