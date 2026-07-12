import Link from 'next/link';

export const metadata = {
  title: "About LostStreet — Free GeoGuessr Alternative",
  description: "LostStreet is a free geography guessing game. Guess locations from Google Street View, play multiplayer duels, and compete in daily challenges. A free alternative to GeoGuessr.",
  openGraph: {
    title: "About LostStreet — Free GeoGuessr Alternative",
    description: "LostStreet is a free geography guessing game with multiplayer, daily challenges, and party mode.",
    url: "https://www.loststreet.online/about",
  },
};

const faqItems = [
  {
    q: "Is LostStreet free?",
    a: "Yes, LostStreet is 100% free to play with no subscription required. Play unlimited rounds, multiplayer duels, and daily challenges at no cost."
  },
  {
    q: "Is LostStreet a GeoGuessr alternative?",
    a: "Yes, LostStreet is a free alternative to GeoGuessr with real-time multiplayer duels, daily challenges, party mode, and multiple difficulty levels — all without paying a subscription."
  },
  {
    q: "Can I play LostStreet on mobile?",
    a: "Yes, LostStreet works on all modern mobile browsers including Chrome, Safari, and Firefox. No app download is needed — just visit loststreet.online."
  },
  {
    q: "How does multiplayer work in LostStreet?",
    a: "LostStreet features real-time 1v1 matchmaking with ELO ratings. You can also create or join private party games with a 6-digit room code to play with friends."
  },
  {
    q: "What difficulty levels does LostStreet have?",
    a: "LostStreet offers three difficulty levels: Easy (multiple choice), Medium (mix of multiple choice and map pinning), and Hard (drop a pin directly on the world map)."
  },
  {
    q: "Do I need an account to play?",
    a: "No, you can play singleplayer games without any account. However, signing in with Google unlocks multiplayer, daily challenges, streak tracking, and leaderboard rankings."
  },
  {
    q: "What is the Daily Challenge?",
    a: "The Daily Challenge is a once-per-day round that tracks your consecutive play streak. Sign in and play every day to build your streak and earn bonus XP."
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
        padding: '5rem 2rem 3rem',
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
          fontSize: '1.25rem',
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
        padding: '3rem 2rem',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
          Key Features
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}>
          {[
            { icon: '🆓', title: '100% Free', desc: 'No subscription, no limits. Play unlimited rounds forever.' },
            { icon: '🎮', title: 'Three Difficulty Levels', desc: 'Easy (multiple choice), Medium (mixed), Hard (pin on map).' },
            { icon: '⚔️', title: 'Real-time Multiplayer', desc: '1v1 duels with ELO matchmaking and live scoring.' },
            { icon: '🎉', title: 'Party Mode', desc: 'Create or join private games with a 6-digit code.' },
            { icon: '📅', title: 'Daily Challenge', desc: 'One challenge per day with streak tracking and bonuses.' },
            { icon: '🏁', title: 'Flag Guesser', desc: 'Test your flag knowledge in a fun mini-game.' },
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
        padding: '3rem 2rem',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
          Game Modes
        </h2>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>
          {[
            { mode: 'Easy Mode', desc: 'Multiple choice questions about the location. Great for beginners learning world geography.' },
            { mode: 'Medium Mode', desc: 'A mix of multiple choice and map pinning. The sweet spot between casual and competitive.' },
            { mode: 'Hard Mode', desc: 'Drop your pin directly on the world map. Full GeoGuessr-style experience for geography experts.' },
            { mode: 'Multiplayer Duels', desc: 'Real-time 1v1 matches with ELO-based matchmaking. Compete for ranking supremacy.' },
            { mode: 'Party Mode', desc: 'Create or join a private room with a 6-digit code. Play with friends in groups of up to 20.' },
            { mode: 'Daily Challenge', desc: 'One special round per day. Build your streak and earn bonus XP for consecutive plays.' },
            { mode: 'Flag Guesser', desc: 'A fun mini-game where you guess countries from their national flags.' },
          ].map((item) => (
            <div key={item.mode} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
              <span style={{ color: '#10b981', fontWeight: 700, fontSize: '1rem', minWidth: 'fit-content' }}>▸ {item.mode}</span>
              <span style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{
        padding: '3rem 2rem',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
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
        padding: '3rem 2rem 5rem',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
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
                padding: '1.25rem 1.5rem',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1.05rem',
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
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

      {/* Popular Searches */}
      <section style={{
        padding: '3rem 2rem',
        maxWidth: '900px',
        margin: '0 auto',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', color: '#9ca3af' }}>
          Popular Searches
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[
            "geoguessr alternative", "free geography guessing game", "street view guessing game", "guess the location game", 
            "guess the country game online", "panorama guessing game", "world geography game online", "guess where game", 
            "random street view game", "location guessing game free", "play geography game online free", "play street view game", 
            "online map guessing game", "play world map game", "geography quiz game online", "free online geography game", 
            "multiplayer geography game", "geography game no download", "game where you guess your location", 
            "game to guess country from street view", "spawn random location guess game", "AI hint geography game", 
            "blur mode guessing game", "guess the city from photo game", "street view geography quiz", 
            "explore random places online game", "virtual travel guessing game", "panoramic view country guesser", 
            "daily geography guessing game", "geography challenge game online", "geography learning game online", 
            "fun way to learn world map", "educational geography game free", "geography practice game", 
            "learn countries game online", "map skills game online", "geography trivia game free", 
            "geography game for mobile", "browser based geography game", "no download geography game", 
            "free to play map game", "lightweight geography web game", "loststreet game", "loststreet online"
          ].map(tag => (
            <span key={tag} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '0.25rem 0.75rem',
              borderRadius: '50px',
              fontSize: '0.75rem',
              color: '#6b7280'
            }}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        textAlign: 'center',
        color: '#6b7280',
        fontSize: '0.85rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <p>© {new Date().getFullYear()} LostStreet. A free geography guessing game and GeoGuessr alternative.</p>
        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
          <Link href="/leaderboard" style={{ color: '#6b7280', textDecoration: 'none' }}>Leaderboard</Link>
        </div>
      </footer>
    </div>
    </>
  );
}
