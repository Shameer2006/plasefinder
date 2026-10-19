'use client';

import Link from 'next/link';
import { PageShell } from '@/app/components/SiteShell';

const SOCIAL = [
  {
    name: 'Instagram',
    handle: '@loststreet.online',
    url: 'https://www.instagram.com/loststreet.co',
    description: 'Daily geography challenges, beautiful street view screenshots, player highlights, and behind-the-scenes updates.',
    color: '#e1306c',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>,
    cta: 'Follow On Instagram',
    isExternal: true,
  },
  {
    name: 'Player Support & Feedback',
    handle: 'Community Desk',
    url: '/contact',
    description: 'Have ideas for new game modes, found a bug in a Street View panorama, or want to submit feedback? Talk to our team.',
    color: '#059669',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
    cta: 'Send Feedback',
    isExternal: false,
  },
];

export default function CommunityClient() {
  return (
    <PageShell breadcrumb="Community" badgeText="Join the Discussion" badgeColor="green">
      <noscript>
        <section style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <h1>LostStreet Community - Geography Gamers Network</h1>
          <p>Join the global LostStreet geography guessing community. Connect with other street view detectives on Instagram to share tips, discuss meta clues, and organize private multiplayer duels.</p>
          <p>Please enable JavaScript to view the full community page.</p>
        </section>
      </noscript>

      {/* ── HERO (Transparent, seamless with vintage background) ──────────── */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1rem, 3vw, 2rem) clamp(1.5rem, 3vw, 2.5rem)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Globe Icon */}
          <div style={{
            width: '64px',
            height: '64px',
            background: '#ffffff',
            border: '1px solid rgba(190, 160, 120, 0.45)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: '#059669',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 900,
            margin: '0 0 1rem',
            lineHeight: 1.15,
            color: '#111827',
            letterSpacing: '-0.02em',
            fontFamily: '"Outfit", sans-serif',
          }}>
            Join the LostStreet <span style={{ color: '#059669' }}>Community</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.18rem)',
            color: '#4b5563',
            lineHeight: 1.7,
            margin: 0,
            maxWidth: '640px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Connect with geography enthusiasts worldwide. Share your best rounds, learn new meta clues, and help shape the future of LostStreet.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2rem) 4rem' }}>

        {/* ── SOCIAL & COMMUNITY CARDS ─────────────────────────────────── */}
        <section style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <h2 style={{
            fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
            fontWeight: 800,
            marginBottom: '0.4rem',
            color: '#111827',
            fontFamily: '"Outfit", sans-serif',
          }}>
            Find Us Online
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '1.75rem', fontSize: '0.97rem' }}>
            Pick your platform and join the conversation.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {SOCIAL.map((s) => (
              <SocialCard key={s.name} s={s} />
            ))}
          </div>
        </section>

        {/* ── STATS BAR ─────────────────────────────────────────────── */}
        <section style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '20px',
          padding: '1.75rem 2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          gap: '1.5rem',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        }}>
          {[['780K+', 'Street View Locations'], ['190', 'Countries Covered'], ['3,800+', 'Players Online Daily'], ['100%', 'Free Forever']].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 900, color: '#059669', fontFamily: '"Outfit", sans-serif' }}>{v}</div>
              <div style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: '0.2rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{l}</div>
            </div>
          ))}
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section style={{
          background: '#ffffff',
          border: '1px solid #a7f3d0',
          borderRadius: '24px',
          padding: 'clamp(2.5rem, 5vw, 3.5rem)',
          textAlign: 'center',
          boxShadow: '0 8px 30px rgba(5,150,105,0.06)',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
            fontWeight: 800,
            marginBottom: '0.75rem',
            color: '#111827',
            fontFamily: '"Outfit", sans-serif',
          }}>
            Ready to Play?
          </h2>
          <p style={{ color: '#4b5563', marginBottom: '2rem', fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto 2rem' }}>
            Jump into a fast 5-round world drop or challenge friends in a party match, then come share your score!
          </p>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #059669, #10b981)',
            color: 'white',
            padding: '14px 36px',
            minHeight: '52px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: '1.05rem',
            boxShadow: '0 6px 20px rgba(5,150,105,0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            touchAction: 'manipulation',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Play LostStreet Free
          </Link>
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
        borderRadius: '20px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ color: s.color }}>{s.icon}</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#111827' }}>{s.name}</div>
          <div style={{ color: s.color, fontSize: '0.9rem', fontWeight: 600 }}>{s.handle}</div>
        </div>
      </div>
      <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.6, margin: 0, flex: 1 }}>{s.description}</p>
      {s.isExternal ? (
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
            padding: '12px 24px',
            minHeight: '46px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.95rem',
            touchAction: 'manipulation',
            boxShadow: `0 4px 14px ${s.color}40`,
          }}
        >
          {s.cta} →
        </a>
      ) : (
        <Link
          href={s.url}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: s.color,
            color: 'white',
            padding: '12px 24px',
            minHeight: '46px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.95rem',
            touchAction: 'manipulation',
            boxShadow: `0 4px 14px ${s.color}40`,
          }}
        >
          {s.cta} →
        </Link>
      )}
    </div>
  );
}
