import Link from 'next/link';

export const metadata = {
  title: "Street View Guesser Guides & Geography Tips — LostStreet",
  description: "Master the street view guesser game with expert LostStreet guides. Learn Street View meta clues, bollard identification, utility poles, road markings, and 1v1 duel strategy.",
  alternates: { canonical: 'https://www.loststreet.online/guides' },
  keywords: [
    'street view guesser', 'loststreet guides', 'free street view guesser tips', 'street view clues guide',
    'how to guess location from street view', 'bollard identification street view', 'license plate geography quiz',
    'geoguessr alternative guide', 'street view game strategies'
  ],
  openGraph: {
    title: "Street View Guesser Guides & Tips — LostStreet",
    description: "Master street view guessing with expert guides on Google Street View clues, country identification, and 1v1 multiplayer duels on LostStreet.",
    url: "https://www.loststreet.online/guides",
    type: 'website',
  },
};

export default function GuidesPage() {
  const guides = [
    { title: "The Best Free GeoGuessr Alternatives in 2026", slug: "best-free-geoguessr-alternatives", desc: "Looking to play map guessing games without paying a subscription? Here are the best free options available.", date: "August 15, 2026" },
    { title: "How to Guess Locations from Google Street View", slug: "how-to-guess-locations-from-street-view", desc: "Master the art of geography guessing games with these pro tips on identifying bollards, license plates, and architecture.", date: "August 20, 2026" },
    { title: "The 10 Hardest Countries to Guess in Street View", slug: "hardest-countries-to-guess", desc: "These countries are notoriously difficult to identify. Learn what makes them hard and the specific clues to tell them apart.", date: "August 25, 2026" },
    { title: "How to Get Better at Geography Guessing Games", slug: "how-to-improve-at-geography-games", desc: "Practical tips and strategies to improve your score — from beginner fundamentals to advanced meta-knowledge.", date: "August 28, 2026" },
    { title: "The Ultimate Street View Clues Guide", slug: "geography-clues-guide", desc: "A comprehensive reference to every visual clue in Google Street View — bollards, poles, road markings, sun position, and more.", date: "September 1, 2026" },
    { title: "How to Identify African Countries in Street View", slug: "africa-street-view-guide", desc: "A complete guide to identifying African countries in geography games, covering West, East, Southern, and North Africa.", date: "September 5, 2026" },
    { title: "How to Identify Asian Countries in Street View", slug: "asia-street-view-guide", desc: "Learn the visual clues for East Asia, Southeast Asia, South Asia, and Central Asia in geography guessing games.", date: "September 8, 2026" },
    { title: "How to Identify European Countries in Street View", slug: "europe-street-view-guide", desc: "A complete guide to identifying European countries — Western, Eastern, Northern, and Southern Europe.", date: "September 10, 2026" },
    { title: "How to Identify Every Country by Its Flag", slug: "flag-identification-guide", desc: "World flags grouped by visual pattern. Learn tricolours, crosses, stars, crescents, and the most easily confused flag pairs.", date: "September 12, 2026" },
    { title: "How to Win at Multiplayer Geography Games", slug: "multiplayer-geography-tips", desc: "Advanced strategies for winning 1v1 duels — speed techniques, ELO management, and the mental game.", date: "September 15, 2026" },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a1a 100%)',
      color: '#f3f4f6',
      fontFamily: "'Outfit', sans-serif",
    }}>
      <header className="responsive-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src="/logo.png" alt="LostStreet Logo" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
        <Link href="/" style={{ textDecoration: 'none', color: '#f3f4f6', fontSize: '1.5rem', fontWeight: 800 }}>
          LostStreet
        </Link>
      </header>

      <main style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 800,
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #10b981, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Geography Guides & Tips
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '1.2rem', marginBottom: '3rem' }}>
          Improve your map guessing skills and explore the world of geography games.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {guides.map(guide => (
            <Link href={`/guides/${guide.slug}`} key={guide.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
              <article style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '2rem',
                transition: 'transform 0.2s, background 0.2s',
              }} className="guide-card">
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#10b981' }}>
                  {guide.title}
                </h2>
                <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem' }}>{guide.date}</div>
                <p style={{ color: '#d1d5db', lineHeight: 1.6 }}>{guide.desc}</p>
              </article>
            </Link>
          ))}
        </div>
      </main>
      <style dangerouslySetInnerHTML={{__html: `
        .guide-card:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.06) !important;
        }
      `}} />
    </div>
  );
}
