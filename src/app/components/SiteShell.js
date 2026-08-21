'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import CoinHUD from './CoinHUD';

const DailyRewardOverlay = dynamic(() => import('./DailyRewardOverlay'), { ssr: false });

const GAME_PATHS = ['/'];

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const [showDailyRewards, setShowDailyRewards] = useState(false);

  if (GAME_PATHS.includes(pathname)) return children;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SiteHeader onOpenDailyReward={() => setShowDailyRewards(true)} />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</main>
      <SiteFooter />
      <DailyRewardOverlay forceOpen={showDailyRewards} onClose={() => setShowDailyRewards(false)} />
    </div>
  );
}

function SiteHeader({ onOpenDailyReward }) {
  const pathname = usePathname();
  const { user, loginWithGoogle } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/guides', label: 'How to Play' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/chronicles', label: 'Map' },
    { href: '/flag-guesser', label: 'Flag Guesser' },
    { href: '/community', label: 'Community' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      <header style={{
        background: '#0d0d0d',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'sticky', top: 0, zIndex: 200,
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          padding: '0 clamp(1rem, 3vw, 2rem)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '56px',
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff', flexShrink: 0 }}>
            <img src="/logo.png" alt="LostStreet" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ fontWeight: 800, fontSize: '1.1rem', fontFamily: '"Outfit", sans-serif' }}>LostStreet</span>
          </Link>

          {/* Desktop nav */}
          <nav className="site-nav-desktop" aria-label="Main Navigation" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 2vw, 1.8rem)' }}>
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} style={{
                  color: active ? '#fff' : '#aaa',
                  textDecoration: 'none',
                  fontSize: '0.92rem',
                  fontWeight: active ? 600 : 400,
                  fontFamily: '"Outfit", sans-serif',
                  paddingBottom: '4px',
                  borderBottom: active ? '2px solid #e8c84a' : '2px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#aaa'; }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Coin HUD, Desktop sign-in + mobile hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CoinHUD onOpenDailyReward={onOpenDailyReward} />

            {/* Sign In (desktop) */}
            <div className="site-nav-desktop">
              {(!user || user.isAnonymous) ? (
                <button onClick={loginWithGoogle} style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.45)',
                  color: '#fff',
                  padding: '6px 16px',
                  borderRadius: '6px',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  fontFamily: '"Outfit", sans-serif',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'; }}
                >
                  Sign In
                </button>
              ) : (
                <Link href="/" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem' }}>Play →</Link>
              )}
            </div>

            {/* Hamburger (mobile) */}
            <button
              className="site-nav-mobile-toggle"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                width: '44px', height: '44px',
                borderRadius: '8px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 198,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
            }}
          />
          {/* Drawer panel */}
          <nav style={{
            position: 'fixed', top: '56px', left: 0, right: 0, zIndex: 199,
            background: '#0d0d0d',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            padding: '1.2rem clamp(1rem, 4vw, 2rem)',
            display: 'flex', flexDirection: 'column', gap: '0.2rem',
            maxHeight: 'calc(100dvh - 56px)',
            overflowY: 'auto',
            animation: 'slideDown 0.22s ease forwards',
          }}>
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: active ? '#fff' : '#bbb',
                    textDecoration: 'none',
                    fontSize: '1.05rem',
                    fontWeight: active ? 700 : 400,
                    fontFamily: '"Outfit", sans-serif',
                    padding: '0.85rem 0.5rem',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    borderLeft: active ? '3px solid #e8c84a' : '3px solid transparent',
                    paddingLeft: '0.8rem',
                    transition: 'color 0.15s, border-color 0.15s',
                    touchAction: 'manipulation',
                  }}
                >
                  {label}
                </Link>
              );
            })}

            <div style={{ marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {(!user || user.isAnonymous) ? (
                <button onClick={() => { setMenuOpen(false); loginWithGoogle(); }} style={{
                  width: '100%',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.4)',
                  color: '#fff',
                  padding: '12px 16px',
                  minHeight: '46px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 500,
                  fontFamily: '"Outfit", sans-serif',
                  cursor: 'pointer',
                  touchAction: 'manipulation',
                }}>
                  Sign In with Google
                </button>
              ) : (
                <Link href="/" onClick={() => setMenuOpen(false)} style={{
                  display: 'block', textAlign: 'center',
                  color: '#e8c84a', textDecoration: 'none',
                  fontSize: '1rem', fontWeight: 600, padding: '12px',
                  minHeight: '44px',
                }}>▶ Play Now</Link>
              )}
            </div>
          </nav>
        </>
      )}
    </>
  );
}

function SiteFooter() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/guides', label: 'Guides' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/chronicles', label: 'Chronicles' },
    { href: '/flag-guesser', label: 'Flag Guesser' },
    { href: '/community', label: 'Community' },
    { href: '/about', label: 'About' },
    { href: '/privacy', label: 'Privacy' },
  ];

  return (
    <footer style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.08)', color: '#888' }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)',
        display: 'flex', flexDirection: 'column', gap: '2rem',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxWidth: '260px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff' }}>
              <img src="/logo.png" alt="LostStreet" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
              <span style={{ fontWeight: 800, fontSize: '1.1rem', fontFamily: '"Outfit", sans-serif' }}>LostStreet</span>
            </Link>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              Free geography guessing game with 780,000+ street view locations. No subscription needed.
            </p>
          </div>

          <nav aria-label="Footer Navigation" style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(0.8rem, 2vw, 1.5rem)' }}>
            {links.map(({ href, label }) => (
              <Link key={href} href={href} style={{
                color: '#888', textDecoration: 'none', fontSize: '0.875rem',
                padding: '6px 4px', minHeight: '36px', display: 'inline-flex', alignItems: 'center',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#888'}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: '1.2rem',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem',
          fontSize: '0.8rem',
        }}>
          <span>© {new Date().getFullYear()} LostStreet. All rights reserved.</span>
          <span>Not affiliated with Google or GeoGuessr.</span>
        </div>
      </div>
    </footer>
  );
}
