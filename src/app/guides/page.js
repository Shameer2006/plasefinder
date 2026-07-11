import Link from 'next/link';

export const metadata = {
  title: "Geography Guides & Tips — LostStreet",
  description: "Learn how to get better at geography guessing games, discover free GeoGuessr alternatives, and master Google Street View clues.",
  openGraph: {
    title: "Geography Guides & Tips — LostStreet",
    description: "Learn how to get better at geography guessing games, discover free GeoGuessr alternatives, and master Google Street View clues.",
    url: "https://www.loststreet.online/guides",
  },
};

export default function GuidesPage() {
  const guides = [
    {
      title: "The Best Free GeoGuessr Alternatives in 2026",
      slug: "best-free-geoguessr-alternatives",
      desc: "Looking to play map guessing games without paying a subscription? Here are the best free options available.",
      date: "August 15, 2026"
    },
    {
      title: "How to Guess Locations from Google Street View",
      slug: "how-to-guess-locations-from-street-view",
      desc: "Master the art of geography guessing games with these pro tips on identifying bollards, license plates, and architecture.",
      date: "August 20, 2026"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a1a 100%)',
      color: '#f3f4f6',
      fontFamily: "'Outfit', sans-serif",
    }}>
      <header className="responsive-header">
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
