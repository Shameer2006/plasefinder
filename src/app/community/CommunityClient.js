'use client';

const SOCIAL = [
  {
    name: 'Reddit',
    handle: 'r/LostStreet',
    url: 'https://www.reddit.com/r/Loststreet',
    description: 'Share your best rounds, ask geography tips, report bugs, and vote on new features. Our main hub for discussion.',
    color: '#ff4500',
    bg: 'rgba(255,69,0,0.08)',
    border: 'rgba(255,69,0,0.25)',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>,
    cta: 'Join Subreddit',
  },
  {
    name: 'Instagram',
    handle: '@loststreet.online',
    url: 'https://www.instagram.com/loststreet.co',
    description: 'Daily geography challenges, beautiful street view screenshots, player highlights, and behind-the-scenes updates.',
    color: '#e1306c',
    bg: 'rgba(225,48,108,0.08)',
    border: 'rgba(225,48,108,0.25)',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>,
    cta: 'Follow Us',
  },
  /* {
    name: 'Discord',
    handle: 'LostStreet Server',
    url: '#',
    description: 'Real-time chat, find party members, get notified of tournaments, and talk directly with the dev team. Coming soon.',
    color: '#5865f2',
    bg: 'rgba(88,101,242,0.08)',
    border: 'rgba(88,101,242,0.25)',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>,
    cta: 'Coming Soon',
  },*/
];

const PLAN = [
  
];

export default function CommunityClient() {
  return (
    <div style={{ background: '#0a0a1a', minHeight: '100vh', color: 'white', fontFamily: '"Outfit", sans-serif' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(80,10,10,0.9) 0%, rgba(10,10,40,0.95) 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 3rem)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, margin: '0 0 1rem', lineHeight: 1.1 }}>
            Join the LostStreet Community
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#d1d5db', lineHeight: 1.7, margin: 0 }}>
            Connect with geography enthusiasts worldwide. Share your best rounds, learn new clues, compete in tournaments, and help shape the future of LostStreet.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem)' }}>

        {/* Social Cards */}
        <section style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 800, marginBottom: '0.5rem' }}>Find Us Online</h2>
          <p style={{ color: '#9ca3af', marginBottom: '2rem', fontSize: '1rem' }}>Pick your platform and join the conversation.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {SOCIAL.map((s) => (
              <SocialCard key={s.name} s={s} />
            ))}
          </div>
        </section>

        {/* Stats */}
        <section style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', padding: '1.5rem 2rem',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '1.5rem',
          marginBottom: 'clamp(3rem, 6vw, 5rem)', textAlign: 'center',
        }}>
          {[['780K+','Street View Locations'],['190','Countries Covered'],['3,800+','Players Online Daily'],['100%','Free Forever']].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 900, color: '#10b981' }}>{v}</div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.2rem' }}>{l}</div>
            </div>
          ))}
        </section>

        {/* Roadmap */}
       
        

        {/* CTA */}
        <section style={{
          marginTop: 'clamp(3rem, 6vw, 5rem)',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(59,130,246,0.12) 100%)',
          border: '1px solid rgba(16,185,129,0.25)', borderRadius: '20px',
          padding: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center',
        }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 800, marginBottom: '0.8rem' }}>Ready to Play?</h2>
          <p style={{ color: '#d1d5db', marginBottom: '1.5rem', fontSize: '1rem' }}>Jump into a game, then come share your score with the community.</p>
          <a href="/" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            color: 'white', padding: '12px 32px', minHeight: '48px', borderRadius: '10px',
            textDecoration: 'none', fontWeight: 800, fontSize: '1rem',
            touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
          }}>▶ Play LostStreet Free</a>
        </section>
      </div>
    </div>
  );
}

function SocialCard({ s }) {
  return (
    <div
      style={{
        background: s.bg, border: `1px solid ${s.border}`, borderRadius: '16px',
        padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 30px ${s.border}`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ color: s.color }}>{s.icon}</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{s.name}</div>
          <div style={{ color: s.color, fontSize: '0.9rem', fontWeight: 600 }}>{s.handle}</div>
        </div>
      </div>
      <p style={{ color: '#d1d5db', fontSize: '0.95rem', lineHeight: 1.6, margin: 0, flex: 1 }}>{s.description}</p>
      <a
        href={s.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: s.color, color: 'white',
          padding: '10px 20px', minHeight: '44px', borderRadius: '8px', textDecoration: 'none',
          fontWeight: 700, fontSize: '0.9rem', textAlign: 'center',
          opacity: s.url === '#' ? 0.5 : 1,
          pointerEvents: s.url === '#' ? 'none' : 'auto',
          touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
        }}
      >
        {s.cta} →
      </a>
    </div>
  );
}
