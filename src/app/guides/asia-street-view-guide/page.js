import Link from 'next/link';

export const metadata = {
  title: 'How to Identify Asian Countries in Street View (2026) — Complete Guide | LostStreet',
  description: 'Identify Asian countries from street view clues. Covers East Asia, Southeast Asia, South Asia & Central Asia — scripts, bollards, architecture & driving side tips.',
  alternates: { canonical: 'https://www.loststreet.online/guides/asia-street-view-guide' },
  keywords: ['asia street view', 'asian countries geography game', 'southeast asia street view clues', 'identify asian countries', 'loststreet asia guide'],
  openGraph: {
    title: 'How to Identify Asian Countries in Street View (2026)',
    description: 'Visual clues for identifying Asian countries in geography guessing games.',
    url: 'https://www.loststreet.online/guides/asia-street-view-guide',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Identify Asian Countries in Street View (2026)',
  description: 'A complete visual clue guide to identifying Asian countries in geography guessing games.',
  author: { '@type': 'Organization', name: 'LostStreet', url: 'https://www.loststreet.online/about' },
  publisher: { '@type': 'Organization', name: 'LostStreet', url: 'https://www.loststreet.online', logo: { '@type': 'ImageObject', url: 'https://www.loststreet.online/icon.png' } },
  datePublished: '2026-07-18T00:00:00.000Z',
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
              Continent Guides
            </span>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900,
              lineHeight: 1.2,
              margin: '1rem 0',
              color: '#111827',
              fontFamily: '"Merriweather", "Georgia", serif'
            }}>
              How to Identify Asian Countries in Street View
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', color: '#6b7280', fontSize: '0.9rem', marginTop: '1.5rem' }}>
              <span>Published: September 8, 2026</span>
              <span>•</span>
              <span>11 min read</span>
            </div>
          </header>

          <article style={{ fontSize: '1.125rem', color: '#374151' }}>
            
            <p style={{ fontSize: '1.25rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Asia is the largest and most populous continent, covering an enormous range of climates, cultures, and landscapes. From the frozen tundra of Siberia to the tropical beaches of Thailand, identifying Asian countries in <strong>LostStreet</strong> requires a solid understanding of each sub-region's unique visual signatures.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '3rem 0' }} />

            <h2 style={headingStyle}>East Asia</h2>
            <h3 style={subHeadingStyle}>Japan</h3>
            <p>Japan is one of the most recognisable countries in street view games. Key clues:</p>
            <ul style={listStyle}>
              <li>Left-hand traffic.</li>
              <li>Extremely dense clusters of power lines and cables on wooden poles — unlike anywhere else in the world.</li>
              <li>Japanese script (Hiragana, Katakana, Kanji) on signs.</li>
              <li>Vending machines on almost every street corner.</li>
              <li>Distinctive red torii gates near Shinto shrines.</li>
              <li>Very clean, well-maintained roads and infrastructure.</li>
            </ul>

            <h3 style={subHeadingStyle}>South Korea</h3>
            <ul style={listStyle}>
              <li>Right-hand traffic.</li>
              <li>Hangul script — blocky characters with circles and lines, unique to Korea.</li>
              <li>Korean flag (Taegukgi) — white with a red and blue yin-yang symbol and black trigrams.</li>
              <li>Modern, dense urban areas with distinctive apartment block clusters.</li>
              <li>Mountains visible in the background in most locations.</li>
            </ul>

            <h3 style={subHeadingStyle}>China</h3>
            <ul style={listStyle}>
              <li>Right-hand traffic.</li>
              <li>Simplified Chinese characters on all signs.</li>
              <li>Red flags with yellow stars (Chinese national flag) on government buildings.</li>
              <li>Very wide roads in urban areas.</li>
              <li>Green electric vehicle license plates are increasingly common.</li>
            </ul>

            <h2 style={headingStyle}>Southeast Asia</h2>
            <h3 style={subHeadingStyle}>Thailand</h3>
            <ul style={listStyle}>
              <li>Left-hand traffic.</li>
              <li>Thai script — very distinctive circular, flowing letters unlike any other script.</li>
              <li>Buddhist temples (wats) with golden spires.</li>
              <li>Red, white, and blue striped flag.</li>
              <li>Motorbikes and tuk-tuks everywhere.</li>
            </ul>

            <h3 style={subHeadingStyle}>Vietnam</h3>
            <ul style={listStyle}>
              <li>Right-hand traffic.</li>
              <li>Latin script with extensive diacritical marks (Vietnamese uses a modified Latin alphabet).</li>
              <li>Red flag with a yellow star.</li>
              <li>Extremely dense motorbike traffic in cities.</li>
              <li>Narrow shophouse buildings (tube houses) in urban areas.</li>
              <li>Terraced rice fields in northern mountainous regions.</li>
            </ul>

            <h3 style={subHeadingStyle}>Indonesia</h3>
            <ul style={listStyle}>
              <li>Left-hand traffic.</li>
              <li>Latin script (Indonesian uses standard Latin alphabet).</li>
              <li>Red and white flag (simple bicolour).</li>
              <li>Tropical vegetation — palm trees, dense jungle.</li>
              <li>The Google camera is sometimes mounted on a motorbike.</li>
              <li>Distinctive Indonesian mosque architecture (domed mosques with minarets).</li>
            </ul>

            <h2 style={headingStyle}>South Asia</h2>
            <h3 style={subHeadingStyle}>India</h3>
            <ul style={listStyle}>
              <li>Left-hand traffic.</li>
              <li>Multiple scripts visible — Devanagari (Hindi), Tamil, Telugu, Bengali depending on region.</li>
              <li>Saffron, white, and green tricolour flag with blue Ashoka Chakra.</li>
              <li>Auto-rickshaws (tuk-tuks) are ubiquitous.</li>
              <li>Colourful hand-painted signs and advertisements.</li>
              <li>Cows on the road in many areas.</li>
            </ul>

            <h2 style={headingStyle}>Central Asia</h2>
            <p>Kazakhstan, Kyrgyzstan, Uzbekistan, and Tajikistan all use Cyrillic script and share Soviet-era infrastructure. Key differentiators:</p>
            <ul style={listStyle}>
              <li><strong>Kazakhstan:</strong> Flatter terrain, more industrialised, better road quality due to oil wealth.</li>
              <li><strong>Kyrgyzstan:</strong> Very mountainous — dramatic peaks visible in the background.</li>
              <li><strong>Uzbekistan:</strong> More desert landscape, distinctive Islamic architecture (blue-tiled mosques and madrasas).</li>
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
                Test Your Asia Knowledge!
              </h3>
              <p style={{ color: '#4b5563', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Play LostStreet and practice identifying Asian countries from street view clues.
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

