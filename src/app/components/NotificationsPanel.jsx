'use client';
import { useState, useEffect, useMemo } from 'react';
import { getNotifications, markAllAsRead, markAsRead } from '@/lib/notifications';
import { useToast } from './Toast';
import CoinIcon from './CoinIcon';

export default function NotificationsPanel({ onClose, onOpenDailyRewards, onNavigate }) {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('ALL');
  const [pushEnabled, setPushEnabled] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setNotifications(getNotifications());
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPushEnabled(Notification.permission === 'granted');
    }
  }, []);

  const handleMarkAllRead = (e) => {
    e.preventDefault();
    markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    toast?.success?.('All notifications marked as read');
  };

  const handleItemClick = (item) => {
    if (item.unread) {
      markAsRead(item.id);
      setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, unread: false } : n));
    }

    if (item.actionType === 'open_daily_rewards') {
      if (onOpenDailyRewards) onOpenDailyRewards();
    } else if (item.actionUrl) {
      if (onNavigate) {
        onNavigate(item.actionUrl);
      } else if (typeof window !== 'undefined') {
        window.location.href = item.actionUrl;
      }
    }
  };

  const handleEnablePush = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      toast?.info?.('Push notifications are not supported in this browser.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setPushEnabled(true);
        toast?.success?.('Push notifications enabled!');
      } else {
        toast?.warning?.('Push notification permission denied.');
      }
    } catch (err) {
      console.warn('Push notification error:', err);
    }
  };

  const filteredNotifications = useMemo(() => {
    if (activeTab === 'ALL') return notifications;
    return notifications.filter(n => n.category === activeTab);
  }, [notifications, activeTab]);

  const tabs = ['ALL', 'UPDATES', 'EVENTS', 'REWARDS', 'SYSTEM'];

  return (
    <div
      className="notifications-container"
      style={{
        width: '100%',
        maxWidth: '680px',
        background: 'linear-gradient(180deg, rgba(14, 18, 30, 0.95), rgba(9, 12, 22, 0.98))',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '24px',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.75), 0 0 30px rgba(16, 24, 40, 0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        color: '#ffffff',
        fontFamily: '"Outfit", sans-serif',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      {/* ── 1. Header Bar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 24px 14px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            fontSize: '1.25rem',
            filter: 'drop-shadow(0 0 8px rgba(248, 113, 113, 0.5))',
          }}>
            🔔
          </div>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            margin: 0,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#ffffff',
          }}>
            NOTIFICATIONS & UPDATES
          </h2>
        </div>

        {/* Action buttons (Mark all as read + Close) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={handleMarkAllRead}
            style={{
              background: 'none',
              border: 'none',
              color: '#38bdf8',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '4px 6px',
              fontFamily: '"Outfit", sans-serif',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#7dd3fc'}
            onMouseLeave={e => e.currentTarget.style.color = '#38bdf8'}
          >
            Mark all as read
          </button>

          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close Notifications"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af',
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'; }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── 2. Category Filter Tabs ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: 'clamp(12px, 3vw, 28px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '3px solid #e8c84a' : '3px solid transparent',
                color: isActive ? '#ffffff' : '#9ca3af',
                fontSize: '0.88rem',
                fontWeight: isActive ? 800 : 600,
                padding: '14px 4px 12px 4px',
                cursor: 'pointer',
                fontFamily: '"Outfit", sans-serif',
                letterSpacing: '0.04em',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#d1d5db'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#9ca3af'; }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* ── 3. Notification Cards List ── */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxHeight: '440px',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
      }}>
        {filteredNotifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#6b7280', fontSize: '0.95rem' }}>
            No notifications in this category.
          </div>
        ) : (
          filteredNotifications.map((item) => {
            const isFeatured = item.isNew;

            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  background: isFeatured
                    ? 'linear-gradient(135deg, rgba(38, 22, 66, 0.7), rgba(18, 16, 32, 0.85))'
                    : 'rgba(18, 24, 38, 0.65)',
                  border: isFeatured
                    ? '1px solid rgba(168, 85, 247, 0.45)'
                    : '1px solid rgba(255, 255, 255, 0.07)',
                  boxShadow: isFeatured
                    ? '0 4px 20px rgba(168, 85, 247, 0.15), inset 0 0 15px rgba(168, 85, 247, 0.08)'
                    : 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  userSelect: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = isFeatured ? 'rgba(168, 85, 247, 0.8)' : 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = isFeatured ? 'rgba(168, 85, 247, 0.45)' : 'rgba(255, 255, 255, 0.07)';
                }}
              >
                {/* NEW Badge on Featured item */}
                {isFeatured && (
                  <div style={{
                    position: 'absolute',
                    top: '-6px',
                    left: '14px',
                    background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 900,
                    padding: '2px 8px',
                    borderRadius: '8px',
                    letterSpacing: '0.06em',
                    boxShadow: '0 2px 8px rgba(168, 85, 247, 0.6)',
                  }}>
                    NEW
                  </div>
                )}

                {/* Left Thumbnail Illustration */}
                <div style={{ flexShrink: 0 }}>
                  <NotificationVisual type={item.imageType} />
                </div>

                {/* Center Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '4px',
                  }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: '0.98rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      letterSpacing: '-0.01em',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {item.title}
                    </h3>
                  </div>

                  <p style={{
                    margin: '0 0 8px 0',
                    fontSize: '0.82rem',
                    color: '#9ca3af',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {item.description}
                  </p>

                  {/* Badges row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {item.badges.map((b, idx) => (
                      <BadgeTag key={idx} badge={b} />
                    ))}
                  </div>
                </div>

                {/* Right Meta (Time, Red Dot, Chevron) */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 600 }}>
                    {item.timestamp}
                  </span>

                  {item.unread && (
                    <div style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#ef4444',
                      boxShadow: '0 0 8px #ef4444',
                      flexShrink: 0,
                    }} />
                  )}

                  <div style={{ color: '#4b5563', fontSize: '1.1rem', fontWeight: 800 }}>
                    ›
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── 4. Bottom Push Notifications Banner ── */}
      <div style={{
        padding: '14px 20px',
        background: 'rgba(8, 11, 20, 0.95)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#d1d5db', fontWeight: 500 }}>
          <span style={{ fontSize: '1rem' }}>🔔</span>
          <span>Turn on push notifications to never miss an update!</span>
        </div>

        <button
          onClick={handleEnablePush}
          disabled={pushEnabled}
          style={{
            background: pushEnabled ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            border: 'none',
            color: pushEnabled ? '#9ca3af' : '#1e1402',
            padding: '7px 18px',
            borderRadius: '10px',
            fontSize: '0.82rem',
            fontWeight: 800,
            cursor: pushEnabled ? 'default' : 'pointer',
            fontFamily: '"Outfit", sans-serif',
            letterSpacing: '0.04em',
            boxShadow: pushEnabled ? 'none' : '0 4px 12px rgba(245, 158, 11, 0.35)',
            flexShrink: 0,
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={e => { if (!pushEnabled) e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { if (!pushEnabled) e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          {pushEnabled ? 'ENABLED' : 'ENABLE'}
        </button>
      </div>
    </div>
  );
}

// ── Badge Tag Component ─────────────────────────────────────────────
function BadgeTag({ badge }) {
  if (badge.type === 'update') {
    return (
      <span style={{
        background: 'rgba(124, 58, 237, 0.25)',
        border: '1px solid rgba(168, 85, 247, 0.4)',
        color: '#c084fc',
        fontSize: '0.7rem',
        fontWeight: 800,
        padding: '2px 8px',
        borderRadius: '6px',
        letterSpacing: '0.04em',
      }}>
        {badge.text}
      </span>
    );
  }

  if (badge.type === 'event') {
    return (
      <span style={{
        background: 'rgba(37, 99, 235, 0.25)',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        color: '#60a5fa',
        fontSize: '0.7rem',
        fontWeight: 800,
        padding: '2px 8px',
        borderRadius: '6px',
        letterSpacing: '0.04em',
      }}>
        {badge.text}
      </span>
    );
  }

  if (badge.type === 'timer') {
    return (
      <span style={{
        background: 'rgba(8, 145, 178, 0.2)',
        border: '1px solid rgba(6, 182, 212, 0.35)',
        color: '#38bdf8',
        fontSize: '0.7rem',
        fontWeight: 700,
        padding: '2px 8px',
        borderRadius: '6px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        {badge.text}
      </span>
    );
  }

  if (badge.type === 'reward' || badge.type === 'reward_green') {
    return (
      <span style={{
        background: 'rgba(16, 185, 129, 0.2)',
        border: '1px solid rgba(52, 211, 153, 0.35)',
        color: '#34d399',
        fontSize: '0.7rem',
        fontWeight: 800,
        padding: '2px 8px',
        borderRadius: '6px',
        letterSpacing: '0.04em',
      }}>
        {badge.text}
      </span>
    );
  }

  if (badge.type === 'coins') {
    return (
      <span style={{
        background: 'rgba(234, 179, 8, 0.18)',
        border: '1px solid rgba(250, 204, 21, 0.35)',
        color: '#fde047',
        fontSize: '0.7rem',
        fontWeight: 800,
        padding: '2px 8px',
        borderRadius: '6px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
      }}>
        {badge.text}
      </span>
    );
  }

  if (badge.type === 'system') {
    return (
      <span style={{
        background: 'rgba(75, 85, 99, 0.25)',
        border: '1px solid rgba(107, 114, 128, 0.35)',
        color: '#9ca3af',
        fontSize: '0.7rem',
        fontWeight: 800,
        padding: '2px 8px',
        borderRadius: '6px',
        letterSpacing: '0.04em',
      }}>
        {badge.text}
      </span>
    );
  }

  return null;
}

// ── Stylized Artwork Visual Component ───────────────────────────────
function NotificationVisual({ type }) {
  const containerStyle = {
    width: '78px',
    height: '62px',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    border: '1px solid rgba(255, 255, 255, 0.12)',
  };

  if (type === 'asia') {
    return (
      <div style={{
        ...containerStyle,
        background: 'linear-gradient(180deg, #fdba74 0%, #f472b6 40%, #1e1b4b 100%)',
        boxShadow: '0 4px 14px rgba(244, 114, 182, 0.3)',
      }}>
        {/* Sun & Mount Fuji Silhouette */}
        <div style={{
          position: 'absolute',
          top: '6px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 0 10px #fff',
        }} />
        {/* Cherry blossom sky petals */}
        <div style={{ position: 'absolute', top: '4px', left: '6px', fontSize: '10px' }}>🌸</div>
        <div style={{ position: 'absolute', top: '16px', right: '8px', fontSize: '8px' }}>🌸</div>
        {/* Asian street lanterns & city skyline */}
        <svg width="78" height="42" viewBox="0 0 78 42" fill="none" style={{ position: 'absolute', bottom: 0 }}>
          <polygon points="0,42 12,24 24,42" fill="#0f172a" />
          <polygon points="20,42 39,16 58,42" fill="#1e1b4b" opacity="0.9" />
          <polygon points="52,42 66,26 78,42" fill="#0f172a" />
          <rect x="28" y="28" width="22" height="14" fill="#fbbf24" opacity="0.6" />
          <line x1="0" y1="41" x2="78" y2="41" stroke="#f59e0b" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  if (type === 'trophy') {
    return (
      <div style={{
        ...containerStyle,
        background: 'radial-gradient(circle at center, rgba(30, 27, 75, 0.9), rgba(10, 10, 20, 0.95))',
        border: '1px solid rgba(234, 179, 8, 0.3)',
      }}>
        <div style={{
          fontSize: '2rem',
          filter: 'drop-shadow(0 0 10px rgba(234, 179, 8, 0.8))',
          animation: 'hudPulse 3s infinite ease-in-out',
        }}>
          🏆
        </div>
      </div>
    );
  }

  if (type === 'coins') {
    return (
      <div style={{
        ...containerStyle,
        background: 'radial-gradient(circle at center, rgba(6, 78, 59, 0.7), rgba(4, 30, 25, 0.95))',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <CoinIcon size={32} />
      </div>
    );
  }

  if (type === 'shield') {
    return (
      <div style={{
        ...containerStyle,
        background: 'radial-gradient(circle at center, rgba(30, 58, 138, 0.8), rgba(15, 23, 42, 0.95))',
        border: '1px solid rgba(59, 130, 246, 0.35)',
      }}>
        <div style={{
          fontSize: '2rem',
          filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.9))',
        }}>
          🛡️
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...containerStyle, background: 'rgba(255, 255, 255, 0.05)' }}>
      <span style={{ fontSize: '1.5rem' }}>📌</span>
    </div>
  );
}
