import Link from 'next/link';

export const metadata = {
  title: 'World Flag Identification Guide (2026) — Identify Any Country Flag | LostStreet',
  description: 'Learn to identify every country flag by color, pattern & region. Tricolours, crescents, crosses, stars — plus the most commonly confused flag pairs in quiz games.',
  alternates: { canonical: 'https://www.loststreet.online/guides/flag-identification-guide' },
  keywords: ['identify flag', 'country flag identifier', 'flag identification', 'world flags quiz', 'flag guesser', 'country flag quiz', 'flags of the world identifier'],
  openGraph: {
    title: 'World Flag Identification Guide (2026) — Identify Any Country Flag',
    description: 'World flags grouped by visual pattern. Tricolours, crescents, crosses, stars & confused flag pairs.',
    url: 'https://www.loststreet.online/guides/flag-identification-guide',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'World Flag Identification Guide (2026)',
  description: 'A complete guide to world flags grouped by region and visual pattern for geography games.',
  author: { '@type': 'Organization', name: 'LostStreet', url: 'https://www.loststreet.online/about' },
  publisher: { '@type': 'Organization', name: 'LostStreet', url: 'https://www.loststreet.online', logo: { '@type': 'ImageObject', url: 'https://www.loststreet.online/icon.png' } },
  datePublished: '2026-07-22T00:00:00.000Z',
  dateModified: '2026-08-06T00:00:00.000Z',
  image: 'https://www.loststreet.online/og-image.png',
};

const flagGroups = [
  {
    title: 'Tricolour Flags (Three Horizontal Stripes)',
    desc: 'Many countries use three horizontal stripes. The colours are the key differentiator.',
    flags: [
      { country: 'Germany', desc: 'Black, red, gold (top to bottom).' },
      { country: 'Russia', desc: 'White, blue, red.' },
      { country: 'France', desc: 'Blue, white, red (vertical stripes, not horizontal).' },
      { country: 'India', desc: 'Saffron, white, green with blue Ashoka Chakra in the centre.' },
      { country: 'Italy', desc: 'Green, white, red (vertical stripes).' },
      { country: 'Hungary', desc: 'Red, white, green (horizontal).' },
      { country: 'Netherlands', desc: 'Red, white, blue (horizontal).' },
    ],
  },
  {
    title: 'Flags with Crosses',
    desc: 'Nordic countries and several others use cross designs.',
    flags: [
      { country: 'Denmark', desc: 'Red with a white Nordic cross — the oldest national flag still in use.' },
      { country: 'Sweden', desc: 'Blue with a yellow Nordic cross.' },
      { country: 'Norway', desc: 'Red with a blue and white Nordic cross.' },
      { country: 'Finland', desc: 'White with a blue Nordic cross.' },
      { country: 'Iceland', desc: 'Blue with a red and white Nordic cross.' },
      { country: 'Switzerland', desc: 'Red with a white plus sign (square flag).' },
      { country: 'United Kingdom', desc: 'Union Jack — combination of English, Scottish, and Irish crosses.' },
    ],
  },
  {
    title: 'Flags with Stars',
    desc: 'Stars are one of the most common flag symbols.',
    flags: [
      { country: 'USA', desc: '50 white stars on a blue canton, 13 red and white stripes.' },
      { country: 'China', desc: 'Red with one large yellow star and four smaller yellow stars.' },
      { country: 'Vietnam', desc: 'Red with a single yellow star in the centre.' },
      { country: 'Ghana', desc: 'Red, gold, green with a black star in the centre.' },
      { country: 'Australia', desc: 'Blue with the Union Jack, a large seven-pointed star, and the Southern Cross.' },
      { country: 'New Zealand', desc: 'Blue with the Union Jack and four red stars of the Southern Cross.' },
      { country: 'Brazil', desc: 'Green with a yellow diamond, blue circle, and 27 white stars.' },
    ],
  },
  {
    title: 'Flags with Crescents',
    desc: 'The crescent moon is associated with Islamic countries.',
    flags: [
      { country: 'Turkey', desc: 'Red with a white crescent and star.' },
      { country: 'Pakistan', desc: 'Green with a white crescent and star, white stripe on the left.' },
      { country: 'Malaysia', desc: 'Red and white stripes with a blue canton containing a yellow crescent and star.' },
      { country: 'Tunisia', desc: 'Red with a white circle containing a red crescent and star.' },
      { country: 'Algeria', desc: 'Green and white with a red crescent and star.' },
    ],
  },
  {
    title: 'Easily Confused Flag Pairs',
    desc: 'These flags are frequently mixed up — learn the differences.',
    flags: [
      { country: 'Chad vs Romania', desc: 'Nearly identical blue, yellow, red vertical tricolours. Chad\'s blue is slightly darker.' },
      { country: 'Indonesia vs Monaco', desc: 'Both are red over white horizontal bicolours. Monaco\'s proportions are different.' },
      { country: 'Ireland vs Ivory Coast', desc: 'Both are green, white, orange vertical tricolours — but mirrored. Ireland has green on the left.' },
      { country: 'New Zealand vs Australia', desc: 'Both have the Union Jack and Southern Cross. New Zealand\'s stars are red with white borders; Australia\'s are white.' },
      { country: 'Colombia vs Ecuador vs Venezuela', desc: 'All three have yellow, blue, red horizontal stripes. Ecuador has a coat of arms in the centre.' },
    ],
  },
];

export default function ArticlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{
        minHeight: '100vh',
        background: '#fafafa',
        color: '#111827',
        fontFamily: '"Merriweather", "Georgia", serif',
        lineHeight: 1.8
      }}>
        {/* ── TOP STICKY NAVBAR ────────────────────────────────────────── */}
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '1rem 2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: '"Inter", system-ui, -apple-system, sans-serif'
        }}>
          <Link href="/guides" style={{
            color: '#4b5563',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Back to Guides</span>
          </Link>

          <Link href="/" style={{ textDecoration: 'none', color: '#111827', fontSize: '1.2rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
            LostStreet <span style={{ color: '#10b981' }}>Academy</span>
          </Link>
        </header>

        {/* ── ARTICLE CONTAINER ────────────────────────────────────────── */}
        <main style={{ padding: '4rem 1.5rem', maxWidth: '720px', margin: '0 auto' }}>
          
          <header style={{ marginBottom: '3rem', textAlign: 'center', fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
            <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Flag & Strategy
            </span>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900,
              lineHeight: 1.2,
              margin: '1rem 0',
              color: '#111827',
              fontFamily: '"Merriweather", "Georgia", serif'
            }}>
              How to Identify Every Country by Its Flag
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', color: '#6b7280', fontSize: '0.9rem', marginTop: '1.5rem' }}>
              <span>Published: September 12, 2026</span>
              <span>•</span>
              <span>9 min read</span>
            </div>
          </header>

          <article style={{ fontSize: '1.125rem', color: '#374151' }}>
            
            <p style={{ fontSize: '1.25rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Flags appear everywhere in street view games — on government buildings, vehicles, storefronts, and public spaces. Being able to instantly recognise a flag eliminates all ambiguity about which country you are in. This guide groups world flags by visual pattern to make them easier to learn and remember.
            </p>
            <p>
              You can also practice flag identification directly in <strong>LostStreet's Flag Guesser mode</strong>, which tests you on flags from all 195 countries.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '3rem 0' }} />

            {flagGroups.map((group) => (
              <div key={group.title}>
                <h2 style={headingStyle}>{group.title}</h2>
                <p>{group.desc}</p>
                <ul style={listStyle}>
                  {group.flags.map((f) => (
                    <li key={f.country}><strong>{f.country}:</strong> {f.desc}</li>
                  ))}
                </ul>
              </div>
            ))}

            <h2 style={headingStyle}>Tips for Memorising Flags</h2>
            <ul style={listStyle}>
              <li>Group flags by region — neighbouring countries often share colour schemes.</li>
              <li>Learn the unique flags first (Nepal's double pennant, Switzerland's square, Vatican's vertical bicolour).</li>
              <li>Focus on the easily confused pairs — these are the ones that cost points in games.</li>
              <li>Use LostStreet's Flag Guesser mode for daily practice — 5 minutes a day builds recognition quickly.</li>
              <li>Associate flags with their country's history — the story behind a flag makes it memorable.</li>
            </ul>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '4rem 0' }} />

            {/* ── CTA CALLOUT ────────────────────────────────────────────── */}
            <div style={{
              marginTop: '4rem',
              padding: '3rem',
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              textAlign: 'center',
              fontFamily: '"Inter", system-ui, sans-serif'
            }}>
              <h3 style={{ fontSize: '1.5rem', color: '#111827', margin: '0 0 16px 0', fontWeight: 800 }}>
                Practice with Flag Guesser
              </h3>
              <p style={{ color: '#4b5563', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Test your flag knowledge with LostStreet's built-in Flag Guesser mode — all 195 countries, completely free.
              </p>
              <Link href="/" style={{
                background: '#10b981',
                color: '#fff',
                padding: '16px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                display: 'inline-block',
                transition: 'background 0.2s ease'
              }}>
                Play LostStreet Free
              </Link>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}

const headingStyle = {
  fontSize: '2rem',
  fontWeight: 800,
  color: '#111827',
  marginTop: '3.5rem',
  marginBottom: '1.5rem',
  fontFamily: '"Merriweather", "Georgia", serif',
  lineHeight: 1.3
};

const subHeadingStyle = {
  fontSize: '1.4rem',
  fontWeight: 700,
  color: '#1f2937',
  marginTop: '2.5rem',
  marginBottom: '1rem',
  fontFamily: '"Inter", system-ui, sans-serif'
};

const listStyle = {
  listStyleType: 'disc',
  paddingLeft: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  marginBottom: '2rem',
  color: '#374151'
};

