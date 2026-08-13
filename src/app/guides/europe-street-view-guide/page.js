import Link from 'next/link';

export const metadata = {
  title: 'How to Identify European Countries in Street View (2026) — Pro Tips | LostStreet',
  description: 'Tell European countries apart in geography games. Country-specific road signs, bollards, license plates & architecture for Western, Eastern, Nordic & Southern Europe.',
  alternates: { canonical: 'https://www.loststreet.online/guides/europe-street-view-guide' },
  keywords: ['europe street view', 'european countries geography game', 'identify european countries', 'europe bollards street view', 'loststreet europe guide'],
  openGraph: {
    title: 'How to Identify European Countries in Street View (2026)',
    description: 'Country-specific road signs, bollards, license plates & architecture for European geography games.',
    url: 'https://www.loststreet.online/guides/europe-street-view-guide',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Identify European Countries in Street View (2026)',
  description: 'A complete visual clue guide to identifying European countries in geography guessing games.',
  author: { '@type': 'Organization', name: 'LostStreet', url: 'https://www.loststreet.online/about' },
  publisher: { '@type': 'Organization', name: 'LostStreet', url: 'https://www.loststreet.online', logo: { '@type': 'ImageObject', url: 'https://www.loststreet.online/icon.png' } },
  datePublished: '2026-07-20T00:00:00.000Z',
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
              How to Identify European Countries in Street View
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', color: '#6b7280', fontSize: '0.9rem', marginTop: '1.5rem' }}>
              <span>Published: September 10, 2026</span>
              <span>•</span>
              <span>10 min read</span>
            </div>
          </header>

          <article style={{ fontSize: '1.125rem', color: '#374151' }}>
            
            <p style={{ fontSize: '1.25rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Europe is one of the most challenging continents in geography guessing games because many countries share similar landscapes, architecture, and even languages. This guide breaks Europe into sub-regions and gives you the specific clues to distinguish between countries that look almost identical.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '3rem 0' }} />

            <h2 style={headingStyle}>General European Clues</h2>
            <ul style={listStyle}>
              <li>Most of Europe drives on the right, except the UK, Ireland, Malta, and Cyprus.</li>
              <li>EU member states have blue highway signs with white text.</li>
              <li>EU license plates have a blue strip on the left with the country code and EU stars.</li>
              <li>Speed limits are in km/h everywhere except the UK.</li>
              <li>Most Western European countries have underground power cables, so fewer visible poles.</li>
            </ul>

            <h2 style={headingStyle}>Western Europe</h2>
            <h3 style={subHeadingStyle}>France</h3>
            <ul style={listStyle}>
              <li>White bollards with a red top band and red reflector — one of the most reliable France clues.</li>
              <li>French language on signs (look for accents: é, è, ê, ç).</li>
              <li>Blue and white road signs with specific French formatting.</li>
              <li>Distinctive French architecture: shuttered windows, mansard roofs in cities.</li>
            </ul>

            <h3 style={subHeadingStyle}>Germany</h3>
            <ul style={listStyle}>
              <li>German language — look for compound words (very long words) and the letter ß (Eszett).</li>
              <li>Very well-maintained roads and infrastructure.</li>
              <li>Distinctive yellow post boxes (Deutsche Post).</li>
              <li>Autobahn signs are blue with white text.</li>
            </ul>

            <h3 style={subHeadingStyle}>United Kingdom</h3>
            <ul style={listStyle}>
              <li>Left-hand traffic — the most immediate clue.</li>
              <li>English language but with British spelling and terminology.</li>
              <li>Speed limits in mph (miles per hour).</li>
              <li>Red post boxes and red telephone boxes.</li>
              <li>Green highway signs (not blue like EU countries).</li>
              <li>Yellow rear license plates (front plates are white).</li>
            </ul>

            <h2 style={headingStyle}>Northern Europe (Scandinavia)</h2>
            <h3 style={subHeadingStyle}>Sweden vs Norway vs Finland</h3>
            <ul style={listStyle}>
              <li><strong>Sweden:</strong> Swedish language (uses å, ä, ö). Blue and yellow flag. Very flat in the south, forested in the north.</li>
              <li><strong>Norway:</strong> Norwegian language (similar to Swedish but uses æ, ø, å). Red, white, blue cross flag. Very mountainous with fjords.</li>
              <li><strong>Finland:</strong> Finnish language (uses double vowels: aa, ee, ii, oo, uu). Blue and white flag. Very flat, dense birch and pine forests, many lakes.</li>
              <li><strong>Denmark:</strong> Danish language. Red and white flag (Dannebrog). Very flat terrain — no mountains.</li>
            </ul>

            <h2 style={headingStyle}>Eastern Europe</h2>
            <p>Eastern Europe is defined by Soviet-era architecture and Cyrillic or Latin scripts with diacritical marks.</p>
            <ul style={listStyle}>
              <li><strong>Poland:</strong> Latin script with ą, ę, ó, ś, ź, ż, ć, ń. Red and white flag. Well-maintained roads. Distinctive yellow road signs.</li>
              <li><strong>Czech Republic:</strong> Latin script with ř (unique letter). White, red, blue flag. Medieval architecture in town centres.</li>
              <li><strong>Hungary:</strong> Latin script with ő and ű (double acute accent — unique to Hungarian). Red, white, green flag.</li>
              <li><strong>Romania:</strong> Latin script. Blue, yellow, red flag (similar to Chad — look for Romanian text to confirm). Carpathian mountains visible.</li>
              <li><strong>Bulgaria:</strong> Cyrillic script. White, green, red flag. More Mediterranean feel in the south.</li>
            </ul>

            <h2 style={headingStyle}>Southern Europe</h2>
            <ul style={listStyle}>
              <li><strong>Spain:</strong> Spanish language. Red and yellow flag. Dry, arid landscape in the interior. Olive trees and vineyards.</li>
              <li><strong>Portugal:</strong> Portuguese language (look for ã, õ, ç). Green and red flag with a coat of arms. Atlantic coastline. Azulejo (blue tile) architecture.</li>
              <li><strong>Italy:</strong> Italian language. Green, white, red flag. Roman ruins and Renaissance architecture. Cypress trees in Tuscany.</li>
              <li><strong>Greece:</strong> Greek script (unique alphabet). Blue and white flag. White-washed buildings with blue domes (especially in the islands). Mediterranean vegetation.</li>
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
                Test Your Europe Knowledge!
              </h3>
              <p style={{ color: '#4b5563', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Play LostStreet and see how many European countries you can correctly identify.
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

