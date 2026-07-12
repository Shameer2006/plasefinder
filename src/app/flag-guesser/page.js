import Link from 'next/link';

export const metadata = {
  title: 'Flag Guesser - Free Online Multiplayer Flag Guessing Game',
  description: 'Play Flag Guesser online for free. Test your knowledge of world flags in singleplayer or challenge your friends in multiplayer party mode on LostStreet.',
  alternates: {
    canonical: 'https://www.loststreet.online/flag-guesser',
  },
  openGraph: {
    title: 'Flag Guesser - Multiplayer Flag Game',
    description: 'Can you guess the country by its flag? Play the free Flag Guesser mode on LostStreet.',
    url: 'https://www.loststreet.online/flag-guesser',
    siteName: 'LostStreet',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GameApplication",
  "name": "Flag Guesser by LostStreet",
  "url": "https://www.loststreet.online/flag-guesser",
  "description": "A free online multiplayer flag guessing game. Test your knowledge of world flags or play against friends in party mode.",
  "genre": "Educational Game",
  "playMode": ["SinglePlayer", "MultiPlayer"],
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

export default function FlagGuesserPage() {
  return (
    <div style={{
      minHeight: '100dvh',
      width: '100vw',
      backgroundColor: '#050816',
      backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #050816 100%)',
      color: 'white',
      overflowY: 'auto'
    }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Navbar */}
      <nav style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(5, 8, 22, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'white' }}>
          <img src="/logo.png" alt="LostStreet Logo" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>LostStreet</span>
        </Link>
        <Link href="/" style={{ background: '#38bdf8', color: '#050816', padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem' }}>
          Play Free
        </Link>
      </nav>

      {/* Hero Section */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '1.5rem', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          The Ultimate Flag Guesser
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#9ca3af', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
          Test your geography knowledge in the free online Flag Guesser game. Identify flags from all 196 countries in singleplayer or challenge your friends in real-time multiplayer!
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ background: '#38bdf8', color: '#050816', padding: '15px 40px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.3rem', textDecoration: 'none', boxShadow: '0 10px 25px rgba(56, 189, 248, 0.4)', transition: 'transform 0.2s' }}>
            Play Solo
          </Link>
          <Link href="/" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '15px 40px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.3rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', transition: 'background 0.2s' }}>
            Create Multiplayer Party
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center' }}>Why play Flag Guesser on LostStreet?</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>196 Countries</h3>
            <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>Includes every fully recognized independent nation in the world. How many can you identify correctly?</p>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Real-time Multiplayer</h3>
            <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>Create a custom party room, share the 6-digit code with friends, and race against the clock to guess flags together.</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>100% Free Forever</h3>
            <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>No premium subscriptions, no daily limits, and no paywalls. Just pure geography fun.</p>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', color: '#d1d5db', lineHeight: '1.8' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem' }}>How to play Flag Guesser</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Flag Guesser is a popular geography quiz game where players are shown the national flag of a random country and must correctly identify which country it belongs to. The game tests your knowledge of vexillology (the study of flags) and world geography.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          On LostStreet, we have integrated a high-performance Flag Guesser mode directly into our multiplayer party system. When you create a party lobby, the host can select "Flag Guesser" from the game mode settings, adjust the round time limit (from 30 seconds up to 5 minutes), and start the match.
        </p>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginTop: '2rem', marginBottom: '1rem' }}>Tips for guessing flags</h3>
        <ul style={{ paddingLeft: '20px', marginBottom: '2rem' }}>
          <li><strong>Colors matter:</strong> African nations frequently use Pan-African colors (Red, Yellow, Green), while Arab nations often use Pan-Arab colors (Red, Black, White, Green).</li>
          <li><strong>Look for crosses:</strong> The Nordic cross is a staple of Scandinavian countries (Sweden, Norway, Denmark, Finland, Iceland).</li>
          <li><strong>Spot the stars:</strong> Many countries feature stars, but their layout is unique (e.g., the Southern Cross for Australia and New Zealand, or the 50 stars for the USA).</li>
        </ul>
      </section>
      
      <footer style={{ textAlign: 'center', padding: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', marginTop: '40px' }}>
        <p>&copy; {new Date().getFullYear()} LostStreet. All rights reserved.</p>
      </footer>
    </div>
  );
}
