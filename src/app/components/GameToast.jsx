'use client';
import { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react';

/* ─── Context ─────────────────────────────────────────────────────────────── */
const GameToastContext = createContext(null);

export function useGameToast() {
  return useContext(GameToastContext);
}

/* ─── Variant definitions ─────────────────────────────────────────────────── */
const VARIANTS = {
  rank: {
    bg: 'linear-gradient(135deg, rgba(20,14,50,0.97) 0%, rgba(30,24,60,0.97) 100%)',
    border: 'rgba(234,179,8,0.6)',
    glow: 'rgba(234,179,8,0.25)',
    accent: '#fbbf24',
    icon: '🏆',
    progressColor: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
    duration: 7000,
  },
  match: {
    bg: 'linear-gradient(135deg, rgba(6,30,20,0.97) 0%, rgba(10,40,28,0.97) 100%)',
    border: 'rgba(16,185,129,0.6)',
    glow: 'rgba(16,185,129,0.2)',
    accent: '#34d399',
    icon: '✅',
    progressColor: 'linear-gradient(90deg, #34d399, #10b981)',
    duration: 5000,
  },
  room: {
    bg: 'linear-gradient(135deg, rgba(20,10,50,0.97) 0%, rgba(30,15,65,0.97) 100%)',
    border: 'rgba(168,85,247,0.6)',
    glow: 'rgba(168,85,247,0.2)',
    accent: '#c084fc',
    icon: '🎮',
    progressColor: 'linear-gradient(90deg, #c084fc, #a855f7)',
    duration: 5000,
  },
  searching: {
    bg: 'linear-gradient(135deg, rgba(10,20,45,0.97) 0%, rgba(15,28,60,0.97) 100%)',
    border: 'rgba(59,130,246,0.6)',
    glow: 'rgba(59,130,246,0.2)',
    accent: '#60a5fa',
    icon: '🔍',
    progressColor: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
    duration: 6000,
  },
  warning: {
    bg: 'linear-gradient(135deg, rgba(40,24,4,0.97) 0%, rgba(55,32,5,0.97) 100%)',
    border: 'rgba(245,158,11,0.6)',
    glow: 'rgba(245,158,11,0.2)',
    accent: '#fbbf24',
    icon: '⚠️',
    progressColor: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
    duration: 5000,
  },
  error: {
    bg: 'linear-gradient(135deg, rgba(40,8,8,0.97) 0%, rgba(55,10,10,0.97) 100%)',
    border: 'rgba(239,68,68,0.6)',
    glow: 'rgba(239,68,68,0.2)',
    accent: '#f87171',
    icon: '✕',
    progressColor: 'linear-gradient(90deg, #f87171, #ef4444)',
    duration: 4000,
  },
  info: {
    bg: 'linear-gradient(135deg, rgba(10,18,40,0.97) 0%, rgba(14,24,52,0.97) 100%)',
    border: 'rgba(99,102,241,0.55)',
    glow: 'rgba(99,102,241,0.15)',
    accent: '#818cf8',
    icon: 'ℹ',
    progressColor: 'linear-gradient(90deg, #818cf8, #6366f1)',
    duration: 4500,
  },
  copied: {
    bg: 'linear-gradient(135deg, rgba(6,30,20,0.97) 0%, rgba(10,40,28,0.97) 100%)',
    border: 'rgba(52,211,153,0.55)',
    glow: 'rgba(52,211,153,0.18)',
    accent: '#6ee7b7',
    icon: '📋',
    progressColor: 'linear-gradient(90deg, #6ee7b7, #34d399)',
    duration: 3000,
  },
};

/* ─── Single Toast Item ───────────────────────────────────────────────────── */
function GameToastItem({ toast, onRemove }) {
  const v = VARIANTS[toast.variant] || VARIANTS.info;
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const progressRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // mount → animate in
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const dur = toast.duration ?? v.duration;
    timerRef.current = setTimeout(() => dismiss(), dur);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismiss = useCallback(() => {
    setLeaving(true);
    setTimeout(() => onRemove(toast.id), 350);
  }, [onRemove, toast.id]);

  return (
    <div
      onClick={dismiss}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 16px 20px 16px',
        borderRadius: '16px',
        background: v.bg,
        border: `1px solid ${v.border}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04), inset 0 0 20px ${v.glow}`,
        cursor: 'pointer',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        width: '320px',
        maxWidth: 'calc(100vw - 2.5rem)',
        fontFamily: '"Outfit", sans-serif',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        transform: visible && !leaving ? 'translateY(0) scale(1)' : leaving ? 'translateY(10px) scale(0.96)' : 'translateY(20px) scale(0.94)',
        opacity: visible && !leaving ? 1 : 0,
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Icon */}
      <div style={{
        fontSize: '1.35rem',
        lineHeight: 1,
        marginTop: '1px',
        filter: `drop-shadow(0 0 8px ${v.accent})`,
        flexShrink: 0,
      }}>
        {v.icon}
      </div>

      {/* Text content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {toast.title && (
          <div style={{
            fontWeight: 800,
            fontSize: '0.9rem',
            color: '#ffffff',
            letterSpacing: '-0.01em',
            marginBottom: toast.message ? '3px' : 0,
          }}>
            {toast.title}
          </div>
        )}
        {toast.message && (
          <div style={{
            fontSize: '0.82rem',
            color: '#9ca3af',
            lineHeight: 1.4,
          }}>
            {toast.message}
          </div>
        )}
      </div>

      {/* Dismiss X */}
      <div style={{
        color: '#4b5563',
        fontSize: '0.8rem',
        fontWeight: 700,
        flexShrink: 0,
        marginTop: '1px',
      }}>✕</div>

      {/* Progress bar */}
      <div
        ref={progressRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '3px',
          borderRadius: '0 0 16px 16px',
          background: v.progressColor,
          animation: `gtProgressShrink ${toast.duration ?? v.duration}ms linear forwards`,
          width: '100%',
          transformOrigin: 'left',
        }}
      />

      <style>{`
        @keyframes gtProgressShrink {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── Provider ────────────────────────────────────────────────────────────── */
export function GameToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ variant = 'info', title, message, duration } = {}) => {
    const id = Date.now() + Math.random();
    setToasts(prev => {
      // max 3 visible at a time — drop oldest
      const next = [...prev, { id, variant, title, message, duration }];
      return next.slice(-3);
    });
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const api = {
    rank:      (title, message, opts) => addToast({ variant: 'rank',      title, message, ...opts }),
    match:     (title, message, opts) => addToast({ variant: 'match',     title, message, ...opts }),
    room:      (title, message, opts) => addToast({ variant: 'room',      title, message, ...opts }),
    searching: (title, message, opts) => addToast({ variant: 'searching', title, message, ...opts }),
    warning:   (title, message, opts) => addToast({ variant: 'warning',   title, message, ...opts }),
    error:     (title, message, opts) => addToast({ variant: 'error',     title, message, ...opts }),
    info:      (title, message, opts) => addToast({ variant: 'info',      title, message, ...opts }),
    copied:    (title, message, opts) => addToast({ variant: 'copied',    title, message, ...opts }),
    show:      (opts)                 => addToast(opts),
  };

  return (
    <GameToastContext.Provider value={api}>
      {children}

      {/* Bottom-left stack */}
      <div
        aria-live="polite"
        aria-atomic="false"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 99998,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          pointerEvents: 'none',
        }}
      >
        {toasts.map(t => (
          <div key={t.id} style={{ pointerEvents: 'auto' }}>
            <GameToastItem toast={t} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </GameToastContext.Provider>
  );
}
