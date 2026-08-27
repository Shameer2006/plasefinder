import Link from 'next/link';

export const metadata = {
  title: "About LostStreet — The #1 Free Street View Guesser Game",
  description: "Learn about LostStreet, the premier free street view guesser game and GeoGuessr alternative. Discover how 780k+ Street View locations, 1v1 duels, and geography meta clues power the game.",
  alternates: { canonical: "https://www.loststreet.online/about" },
  keywords: [
    "loststreet", "street view guesser", "about loststreet", "free street view guesser", "street view guesser game", "lost street online",
    "geoguessr alternative free", "geography guessing game", "how to play street view guesser", "street view clues bollards license plates"
  ],
  openGraph: {
    title: "About LostStreet — Free Street View Guesser Game",
    description: "LostStreet is a free 360° street view guesser game with 1v1 duels, daily challenges, party mode, and 780,000+ locations.",
    url: "https://www.loststreet.online/about",
  },
};

const faqItems = [
  {
    q: "What is LostStreet?",
    a: "LostStreet is a 100% free street view guesser game and geography quiz. Players are dropped into random 360-degree Google Street View panoramas across 780,000+ locations and must pinpoint their location on an interactive world map."
  },
  {
    q: "Is LostStreet completely free to play?",
    a: "Yes, LostStreet is 100% free to play with no subscriptions, no paywalls, and no round limits. Enjoy unlimited singleplayer street view guessing, 1v1 duels, and daily challenges at zero cost."
  },
  {
    q: "Is LostStreet a free GeoGuessr alternative?",
    a: "Yes, LostStreet is recognized as the best free GeoGuessr alternative. It offers real-time multiplayer duels with ELO ratings, private 6-digit party rooms, daily streak challenges, and flag quizzes — completely free."
  },
  {
    q: "What visual clues can I use in street view guessing?",
    a: "Pro street view guessers inspect road bollard designs, utility pole structures, license plate colors (e.g. yellow in the UK/Netherlands), driving side traffic, country-specific chevrons, language scripts, and sun compass position."
  },
  {
    q: "Can I play LostStreet street view guesser on mobile?",
    a: "Yes, LostStreet is fully optimized for all modern mobile and tablet browsers. You can play directly in Safari, Chrome, or Firefox with no app download needed."
  },
  {
    q: "How does multiplayer work in LostStreet?",
    a: "LostStreet features real-time 1v1 ELO-ranked matchmaking where you duel another player on identical street views, as well as private party lobbies for up to 20 players."
  },
  {
    q: "Do I need an account to play LostStreet?",
    a: "No account is required for singleplayer map guessing. Signing in with Google unlocks your personal profile, multiplayer duels, global leaderboard ranking, and daily challenge streak tracking."
  },
];

export default function AboutPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a1a 100%)',
      color: '#f3f4f6',
      fontFamily: "'Outfit', sans-serif",
    }}>
      {/* Header */}
      <header className="responsive-header">
        <Link href="/" style={{ textDecoration: 'none', color: '#f3f4f6', fontSize: '1.5rem', fontWeight: 800 }}>
          LostStreet
        </Link>
        <Link href="/" style={{
          textDecoration: 'none',
          color: '#fff',
          background: 'linear-gradient(135deg, #10b981, #3b82f6)',
          padding: '10px 24px',
          borderRadius: '50px',
          fontWeight: 600,
          fontSize: '0.95rem',
          transition: 'transform 0.2s, box-shadow 0.2s',
          whiteSpace: 'nowrap'
        }}>
          ▶ Play Now — It&apos;s Free
        </Link>
      </header>

      {/* Hero */}
      <section style={{
        padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 3vw, 2rem) 2rem',
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #10b981, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.2,
        }}>
          About LostStreet
        </h1>
        
        {/* GEO Summary for LLMs */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          borderLeft: '4px solid #10b981',
          padding: '1.5rem',
          borderRadius: '0 12px 12px 0',
          marginBottom: '2rem',
          textAlign: 'left',
        }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#10b981' }}>Quick Summary</h2>
          <p style={{ margin: 0, color: '#f3f4f6', lineHeight: 1.6, fontSize: '0.95rem' }}>
            <strong>LostStreet</strong> is a 100% free alternative to GeoGuessr built with Next.js. 
            It features over <strong>780,000 hand-picked Google Street View locations</strong> globally. 
            Unlike other platforms, it requires <strong>no subscription</strong> and offers unlimited daily plays, 
            real-time ELO-based multiplayer duels, and private party modes for up to 20 players.
          </p>
        </div>

        <p style={{
          fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
          lineHeight: 1.8,
          color: '#9ca3af',
          maxWidth: '700px',
          margin: '0 auto',
        }}>
          LostStreet is a free geography guessing game available at{' '}
          <a href="https://www.loststreet.online" style={{ color: '#10b981', textDecoration: 'none' }}>loststreet.online</a>.
          It is often described as a free alternative to GeoGuessr. Players are shown a
          Google Street View panorama and must guess the location by placing a pin on a
          world map. The closer the guess, the higher the score.
        </p>
      </section>

      {/* Features */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
          Key Features
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}>
          {[
            { icon: '🆓', title: '100% Free', desc: 'No subscription, no limits. Play unlimited rounds forever.' },
            { icon: '🎮', title: 'Three Difficulty Levels', desc: 'Easy (multiple choice), Medium (mixed), Hard (pin on map).' },
            { icon: '⚔️', title: 'Real-time Multiplayer', desc: '1v1 duels with ELO matchmaking and live scoring.' },
            { icon: '🎉', title: 'Party Mode', desc: 'Create or join private games with a 6-digit code.' },
            { icon: '📅', title: 'Daily Challenge', desc: 'One challenge per day with streak tracking and bonuses.' },
            { icon: '📱', title: 'Mobile Friendly', desc: 'Plays perfectly on phones and tablets — no app needed.' },
            { icon: '🔐', title: 'Google Sign-In', desc: 'Save progress, unlock multiplayer, and track your stats.' },
          ].map((feat) => (
            <div key={feat.title} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '1.5rem',
              transition: 'transform 0.2s, border-color 0.2s',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{feat.icon}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{feat.title}</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6 }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Game Modes */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
          Game Modes
        </h2>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          padding: 'clamp(1.2rem, 3vw, 2rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}>
          {[
            { mode: 'Easy Mode', desc: 'Multiple choice questions about the location. Great for beginners learning world geography.' },
            { mode: 'Medium Mode', desc: 'A mix of multiple choice and map pinning. The sweet spot between casual and competitive.' },
            { mode: 'Hard Mode', desc: 'Drop your pin directly on the world map. Full GeoGuessr-style experience for geography experts.' },
            { mode: 'Multiplayer Duels', desc: 'Real-time 1v1 matches with ELO-based matchmaking. Compete for ranking supremacy.' },
            { mode: 'Party Mode', desc: 'Create or join a private room with a 6-digit code. Play with friends in groups of up to 20.' },
            { mode: 'Daily Challenge', desc: 'One special round per day. Build your streak and earn bonus XP for consecutive plays.' },
          ].map((item) => (
            <div key={item.mode} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <span style={{ color: '#10b981', fontWeight: 700, fontSize: '1rem', minWidth: 'fit-content' }}>▸ {item.mode}</span>
              <span style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
          LostStreet vs GeoGuessr
        </h2>
        <div className="table-wrapper">
          <table style={{ borderCollapse: 'collapse', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>Feature</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 700, color: '#10b981' }}>LostStreet</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>GeoGuessr</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Free to play', '✅ Unlimited', '❌ 1 free game/day'],
                ['Multiplayer', '✅ Real-time duels', '✅ Available'],
                ['Party mode', '✅ Up to 20 players', '✅ Available'],
                ['Daily challenge', '✅ With streaks', '✅ Available'],
                ['Account required', '❌ Optional', '✅ Required'],
                ['Subscription', '❌ None', '💰 $2.99/mo'],
                ['Mobile support', '✅ Browser-based', '✅ App + browser'],
                ['Difficulty levels', '✅ 3 levels', '⚠️ Single mode'],
              ].map(([feature, ls, gg], i) => (
                <tr key={feature} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 600 }}>{feature}</td>
                  <td style={{ padding: '0.85rem 1.5rem' }}>{ls}</td>
                  <td style={{ padding: '0.85rem 1.5rem', color: '#9ca3af' }}>{gg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section style={{
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem) 4rem',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqItems.map((item) => (
            <details key={item.q} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}>
              <summary style={{
                padding: '1rem 1.25rem',
                minHeight: '48px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem',
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
              }}>
                {item.q}
                <span style={{ fontSize: '1.2rem', color: '#10b981', flexShrink: 0, marginLeft: '1rem' }}>+</span>
              </summary>
              <div style={{
                padding: '0 1.5rem 1.25rem',
                color: '#9ca3af',
                lineHeight: 1.7,
                fontSize: '0.95rem',
              }}>
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(59,130,246,0.1) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>
          Ready to Explore the World?
        </h2>
        <p style={{ color: '#9ca3af', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Start playing LostStreet now — no sign-up required.
        </p>
        <Link href="/" style={{
          textDecoration: 'none',
          color: '#fff',
          background: 'linear-gradient(135deg, #10b981, #3b82f6)',
          padding: '16px 40px',
          borderRadius: '50px',
          fontWeight: 700,
          fontSize: '1.15rem',
          display: 'inline-block',
          boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
        }}>
          ▶ Play LostStreet Free
        </Link>
      </section>

      {/* Explore Guides & Country Pages */}
      <section style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
          Explore Our Guides
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {[
            { title: '10 Hardest Countries to Guess', slug: '/guides/hardest-countries-to-guess' },
            { title: 'Street View Clues Cheat Sheet', slug: '/guides/geography-clues-guide' },
            { title: 'How to Guess Locations from Street View', slug: '/guides/how-to-guess-locations-from-street-view' },
            { title: 'World Flag Identification Guide', slug: '/guides/flag-identification-guide' },
            { title: 'Africa Street View Guide', slug: '/guides/africa-street-view-guide' },
            { title: 'Free Country Flag Quiz', slug: '/flag-guesser' },
          ].map((guide) => (
            <Link key={guide.slug} href={guide.slug} style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px', padding: '1rem 1.25rem', textDecoration: 'none',
              color: '#10b981', fontWeight: 600, fontSize: '0.95rem', display: 'block',
              transition: 'background 0.2s',
            }}>
              → {guide.title}
            </Link>
          ))}
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#9ca3af' }}>
          Popular Country Guides
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[
            ['in', 'India'], ['bn', 'Brunei'], ['de', 'Germany'], ['ng', 'Nigeria'],
            ['gh', 'Ghana'], ['al', 'Albania'], ['bh', 'Bahrain'], ['om', 'Oman'],
            ['nz', 'New Zealand'], ['pa', 'Panama'], ['ee', 'Estonia'], ['na', 'Namibia']
          ].map(([code, name]) => (
            <Link key={code} href={`/chronicles/${code}`} style={{
              padding: '5px 14px', background: 'rgba(255,255,255,0.04)',
              borderRadius: '50px', fontSize: '0.85rem', color: '#d1d5db',
              textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)',
            }}>
              {name}
            </Link>
          ))}
        </div>
      </section>
      {/* Editorial Standards, Mission & E-E-A-T Transparency */}
      <section style={{
        padding: '3rem 2rem',
        maxWidth: '900px',
        margin: '0 auto',
        borderTop: '1px solid rgba(255,255,255,0.08)'
      }}>
        <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.85rem)', fontWeight: 800, marginBottom: '1.25rem', color: '#f3f4f6' }}>
          Our Mission &amp; Editorial Standards
        </h2>
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: 'clamp(1.25rem, 3vw, 2rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          color: '#cbd5e1',
          lineHeight: 1.7,
          fontSize: '0.96rem',
        }}>
          <p>
            <strong>LostStreet</strong> was founded with a singular purpose: to make world geography engaging, accessible, and 100% free for everyone. Whether you are an educator introducing students to global topography or an enthusiastic map sleuth honing your street-view deduction skills, our platform pairs real-world interactive exploration with structured educational masterclasses.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginTop: '0.5rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.25rem', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#10b981', margin: '0 0 0.5rem 0' }}>✓ Verified Research</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#9ca3af' }}>
                Every guide, country profile, and clue breakdown is thoroughly researched and verified against official transportation standards, national highway administrations, and geopolitical databases.
              </p>
            </div>
            <div style={{ background: 'rgba(59, 130, 246, 0.06)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '1.25rem', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#60a5fa', margin: '0 0 0.5rem 0' }}>✓ Continuous Updates</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#9ca3af' }}>
                Street view coverage, camera generations, and regional road signage evolve constantly. Our editorial team regularly reviews and updates our guides to reflect the latest global coverage.
              </p>
            </div>
          </div>
          <p style={{ margin: 0 }}>
            Have questions, feedback, or a regional clue correction? We welcome community contributions and peer review. Reach out directly through our <Link href="/contact" style={{ color: '#10b981', fontWeight: 600, textDecoration: 'none' }}>Contact Page</Link>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: '0.85rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(10, 10, 10, 0.95)'
      }}>
        <p style={{ margin: '0 0 1rem 0' }}>© {new Date().getFullYear()} LostStreet. An independent educational geography game and world exploration platform.</p>
        <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.85rem' }}>
          <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
          <Link href="/guides" style={{ color: '#9ca3af', textDecoration: 'none' }}>Guides</Link>
          <Link href="/chronicles" style={{ color: '#9ca3af', textDecoration: 'none' }}>Chronicles</Link>
          <Link href="/flag-guesser" style={{ color: '#9ca3af', textDecoration: 'none' }}>Flag Guesser</Link>
          <Link href="/leaderboard" style={{ color: '#9ca3af', textDecoration: 'none' }}>Leaderboard</Link>
          <Link href="/community" style={{ color: '#9ca3af', textDecoration: 'none' }}>Community</Link>
          <Link href="/about" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 600 }}>About</Link>
          <Link href="/contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contact</Link>
          <Link href="/privacy" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: '#9ca3af', textDecoration: 'none' }}>Terms of Service</Link>
          <Link href="/cookies" style={{ color: '#9ca3af', textDecoration: 'none' }}>Cookie Policy</Link>
          <Link href="/disclaimer" style={{ color: '#9ca3af', textDecoration: 'none' }}>Disclaimer</Link>
        </div>
      </footer>
    </div>
    </>
  );
}
