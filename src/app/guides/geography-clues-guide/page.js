import Link from 'next/link';

export const metadata = {
  title: 'Ultimate Street View Clues Cheat Sheet (2026) — Bollards, Poles & More | LostStreet',
  description: 'The complete reference to every visual clue in Google Street View. Bollards, road markings, utility poles, sun position, driving side & vegetation — master them all.',
  alternates: { canonical: 'https://www.loststreet.online/guides/geography-clues-guide' },
  keywords: ['street view clues', 'geoguessr clues', 'bollard identification', 'street view clues list', 'geography clues guide', 'road markings geography'],
  openGraph: {
    title: 'Ultimate Street View Clues Cheat Sheet (2026)',
    description: 'Complete reference to every visual clue in Google Street View — bollards, poles, road markings & more.',
    url: 'https://www.loststreet.online/guides/geography-clues-guide',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Ultimate Street View Clues Cheat Sheet (2026)',
  description: 'A comprehensive reference guide to every visual clue in Google Street View for geography guessing games.',
  author: { '@type': 'Organization', name: 'LostStreet', url: 'https://www.loststreet.online/about' },
  publisher: { '@type': 'Organization', name: 'LostStreet', url: 'https://www.loststreet.online', logo: { '@type': 'ImageObject', url: 'https://www.loststreet.online/icon.png' } },
  datePublished: '2026-07-25T00:00:00.000Z',
  dateModified: '2026-08-06T00:00:00.000Z',
  image: 'https://www.loststreet.online/og-image.png',
};

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
              Street View Meta
            </span>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900,
              lineHeight: 1.2,
              margin: '1rem 0',
              color: '#111827',
              fontFamily: '"Merriweather", "Georgia", serif'
            }}>
              The Ultimate Street View Clues Guide
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', color: '#6b7280', fontSize: '0.9rem', marginTop: '1.5rem' }}>
              <span>Published: September 1, 2026</span>
              <span>•</span>
              <span>12 min read</span>
            </div>
          </header>

          <article style={{ fontSize: '1.125rem', color: '#374151' }}>
            
            <p style={{ fontSize: '1.25rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              This is the most comprehensive reference guide to visual clues in Google Street View for geography guessing games like <strong>LostStreet</strong>. Bookmark this page and refer back to it as you build your knowledge.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '3rem 0' }} />

            <h2 style={headingStyle}>Bollards</h2>
            <p>Bollards are the small posts on the side of roads. They are highly country-specific:</p>
            <ul style={listStyle}>
              <li><strong>France:</strong> White with a red top band and a red reflector.</li>
              <li><strong>Australia:</strong> White with a red reflector on the back, white on the front.</li>
              <li><strong>New Zealand:</strong> Similar to Australia but with yellow reflectors.</li>
              <li><strong>Brazil:</strong> Yellow and black striped bollards are common.</li>
              <li><strong>Russia:</strong> White with a red or orange reflective band.</li>
              <li><strong>Poland:</strong> White with a red stripe and a distinctive shape.</li>
              <li><strong>South Africa:</strong> Yellow and black chevron bollards on highways.</li>
            </ul>

            <h2 style={headingStyle}>Utility Poles and Power Lines</h2>
            <p>The style of electricity poles and how power lines are strung varies significantly by country:</p>
            <ul style={listStyle}>
              <li><strong>Japan:</strong> Extremely dense clusters of power lines and cables on wooden poles. One of the most distinctive clues in the game.</li>
              <li><strong>USA:</strong> Tall wooden poles with multiple crossbars and transformers.</li>
              <li><strong>Mongolia:</strong> Wooden poles with a distinctive cross-shaped top piece.</li>
              <li><strong>Russia:</strong> Concrete poles with a specific angular shape.</li>
              <li><strong>Western Europe:</strong> Underground cables are common, so fewer visible poles.</li>
            </ul>

            <h2 style={headingStyle}>Road Markings and Signs</h2>
            <p>Road markings are standardised within countries but differ internationally:</p>
            <ul style={listStyle}>
              <li><strong>Yellow centre lines:</strong> USA, Canada, Brazil, Japan, South Korea.</li>
              <li><strong>White centre lines:</strong> Most of Europe, Australia, UK.</li>
              <li><strong>Speed signs in km/h:</strong> Most of the world except USA, UK, Myanmar.</li>
              <li><strong>Speed signs in mph:</strong> USA, UK, Liberia, Myanmar.</li>
              <li><strong>Green highway signs:</strong> USA, Canada, Australia, Ireland.</li>
              <li><strong>Blue highway signs:</strong> Most of Europe.</li>
            </ul>

            <h2 style={headingStyle}>The Sun Position</h2>
            <p>
              The position of the sun in the sky tells you which hemisphere you are in. In the Northern Hemisphere, the sun travels across the southern part of the sky. In the Southern Hemisphere, it travels across the northern part of the sky. This means:
            </p>
            <ul style={listStyle}>
              <li>Shadows pointing north = Southern Hemisphere (Australia, South America, Southern Africa).</li>
              <li>Shadows pointing south = Northern Hemisphere (Europe, North America, Asia).</li>
            </ul>
            <p>This clue alone can eliminate half the world instantly.</p>

            <h2 style={headingStyle}>Architecture Styles</h2>
            <p>Building styles are powerful regional indicators:</p>
            <ul style={listStyle}>
              <li><strong>Soviet-era apartment blocks (Khrushchyovka):</strong> Russia, Ukraine, Belarus, Baltic states, Central Asia, and former Soviet satellite states in Eastern Europe.</li>
              <li><strong>Colourful colonial buildings:</strong> Latin America, parts of West Africa, Southeast Asia.</li>
              <li><strong>Corrugated iron roofs:</strong> Sub-Saharan Africa, Pacific Islands, parts of Southeast Asia.</li>
              <li><strong>Stucco white walls with terracotta roofs:</strong> Mediterranean Europe (Spain, Portugal, Greece, Italy).</li>
              <li><strong>Wooden houses with steep roofs:</strong> Scandinavia, Finland, Russia.</li>
              <li><strong>Shophouse architecture (narrow buildings with covered walkways):</strong> Malaysia, Singapore, Vietnam, parts of Indonesia.</li>
            </ul>

            <h2 style={headingStyle}>The Google Car Itself</h2>
            <p>The Google Street View car has country-specific modifications that are visible in the panorama:</p>
            <ul style={listStyle}>
              <li><strong>Ghana:</strong> Black tape on the roof rack — one of the most famous clues in the game.</li>
              <li><strong>Kenya:</strong> A black snorkel visible on the front right of the vehicle.</li>
              <li><strong>Guatemala:</strong> Visible side mirrors on the car.</li>
              <li><strong>Mongolia:</strong> The car often has a distinctive antenna or equipment visible.</li>
              <li><strong>Indonesia:</strong> The camera is sometimes mounted on a motorbike rather than a car.</li>
            </ul>

            <h2 style={headingStyle}>Soil and Road Colour</h2>
            <p>The colour of unpaved roads and exposed soil is a strong regional indicator:</p>
            <ul style={listStyle}>
              <li><strong>Red/orange soil:</strong> West Africa, parts of East Africa, Queensland (Australia), parts of Brazil.</li>
              <li><strong>White/grey chalky soil:</strong> Parts of the Middle East, North Africa.</li>
              <li><strong>Dark brown soil:</strong> Eastern Europe, parts of Russia (chernozem).</li>
              <li><strong>Sandy yellow:</strong> Sahara region, Arabian Peninsula, Central Australia.</li>
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
                Put These Clues to Use!
              </h3>
              <p style={{ color: '#4b5563', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Play a round of LostStreet and practice spotting these clues in real locations.
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

