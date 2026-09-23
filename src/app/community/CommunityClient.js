'use client';

import { PageShell } from '@/app/components/SiteShell';

const SOCIAL = [
  {
    name: 'Reddit',
    handle: 'r/LostStreet',
    url: 'https://www.reddit.com/r/Loststreet',
    description: 'Share your best rounds, ask geography tips, report bugs, and vote on new features. Our main hub for discussion.',
    color: '#ff4500',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>,
    cta: 'Join Subreddit',
  },
  {
    name: 'Instagram',
    handle: '@loststreet.online',
    url: 'https://www.instagram.com/loststreet.co',
    description: 'Daily geography challenges, beautiful street view screenshots, player highlights, and behind-the-scenes updates.',
    color: '#e1306c',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>,
    cta: 'Follow Us',
  },
];

export default function CommunityClient() {
  return (
    <PageShell breadcrumb="Community" badgeText="Join the Discussion" badgeColor="green">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1rem, 3vw, 2rem)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* Globe SVG instead of emoji */}
          <div style={{
            width: '60px',
            height: '60px',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            color: '#059669',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, margin: '0 0 0.75rem', lineHeight: 1.1, color: '#111827', letterSpacing: '-0.02em' }}>
            Join the LostStreet Community
          </h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
            Connect with geography enthusiasts worldwide. Share your best rounds, learn new clues, and help shape the future of LostStreet.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem)' }}>

        {/* ── SOCIAL CARDS ──────────────────────────────────────────── */}
        <section style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', fontWeight: 800, marginBottom: '0.4rem', color: '#111827' }}>Find Us Online</h2>
          <p style={{ color: '#6b7280', marginBottom: '1.75rem', fontSize: '0.97rem' }}>Pick your platform and join the conversation.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {SOCIAL.map((s) => (
              <SocialCard key={s.name} s={s} />
            ))}
          </div>
        </section>

        {/* ── STATS BAR ─────────────────────────────────────────────── */}
        <section style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '16px',
          padding: '1.5rem 2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          gap: '1.5rem',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          {[['780K+', 'Street View Locations'], ['190', 'Countries Covered'], ['3,800+', 'Players Online Daily'], ['100%', 'Free Forever']].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 900, color: '#059669' }}>{v}</div>
              <div style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: '0.15rem', fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section style={{
          background: '#ffffff',
          border: '1px solid #a7f3d0',
          borderRadius: '20px',
          padding: 'clamp(2rem, 5vw, 3rem)',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(5,150,105,0.06)',
        }}>
          <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', fontWeight: 800, marginBottom: '0.75rem', color: '#111827' }}>Ready to Play?</h2>
          <p style={{ color: '#4b5563', marginBottom: '1.5rem', fontSize: '0.97rem' }}>Jump into a game, then come share your score with the community.</p>
          <a href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #059669, #10b981)',
            color: 'white',
            padding: '12px 32px',
            minHeight: '48px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: '1rem',
            boxShadow: '0 4px 14px rgba(5,150,105,0.25)',
            touchAction: 'manipulation',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Play LostStreet Free
          </a>
        </section>
      </div>
    </PageShell>
  );
}

function SocialCard({ s }) {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ color: s.color }}>{s.icon}</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#111827' }}>{s.name}</div>
          <div style={{ color: s.color, fontSize: '0.88rem', fontWeight: 600 }}>{s.handle}</div>
        </div>
      </div>
      <p style={{ color: '#4b5563', fontSize: '0.93rem', lineHeight: 1.6, margin: 0, flex: 1 }}>{s.description}</p>
      <a
        href={s.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: s.color,
          color: 'white',
          padding: '10px 20px',
          minHeight: '44px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '0.9rem',
          opacity: s.url === '#' ? 0.5 : 1,
          pointerEvents: s.url === '#' ? 'none' : 'auto',
          touchAction: 'manipulation',
        }}
      >
        {s.cta} →
      </a>
    </div>
  );
}
