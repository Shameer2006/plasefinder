'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

const GAME_PATHS = ['/'];

export default function SiteShell({ children }) {
  const pathname = usePathname();
  if (GAME_PATHS.includes(pathname)) return children;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SiteHeader />
      <main style={{ flex: 1 }}>{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const pathname = usePathname();
  const { user, loginWithGoogle } = useAuth();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/guides', label: 'How to Play' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/chronicles', label: 'Map' },
    { href: '/community', label: 'Community' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header style={{
      background: '#111',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0 clamp(1rem, 3vw, 2rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '56px',
      }}>
        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 3vw, 2.5rem)' }}>
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} style={{
                color: active ? '#fff' : '#aaa',
                textDecoration: 'none',
                fontSize: '0.95rem',
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

        {/* Sign In */}
        {(!user || user.isAnonymous) ? (
          <button onClick={loginWithGoogle} style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.5)',
            color: '#fff',
            padding: '6px 18px',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontWeight: 500,
            fontFamily: '"Outfit", sans-serif',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'border-color 0.2s, background 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
          >
            Sign In
          </button>
        ) : (
          <Link href="/" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem' }}>Play →</Link>
        )}
      </div>
    </header>
  );
}

function SiteFooter() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/guides', label: 'Guides' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/chronicles', label: 'Chronicles' },
    { href: '/community', label: 'Community' },
    { href: '/about', label: 'About' },
    { href: '/privacy', label: 'Privacy' },
  ];

  return (
    <footer style={{ background: '#111', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#888' }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)',
        display: 'flex', flexDirection: 'column', gap: '2rem',
      }}>
        {/* Top row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxWidth: '260px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff' }}>
              <img src="/logo.png" alt="LostStreet" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
              <span style={{ fontWeight: 800, fontSize: '1.1rem', fontFamily: '"Outfit", sans-serif' }}>LostStreet</span>
            </Link>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              Free geography guessing game with 780,000+ street view locations. No subscription needed.
            </p>
          </div>

          {/* Links */}
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(0.8rem, 2vw, 2rem)' }}>
            {links.map(({ href, label }) => (
              <Link key={href} href={href} style={{
                color: '#888', textDecoration: 'none', fontSize: '0.875rem',
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

        {/* Bottom bar */}
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
