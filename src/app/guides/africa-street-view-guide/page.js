import Link from 'next/link';

export const metadata = {
  title: 'How to Identify African Countries in Street View (2026) — Visual Clue Guide | LostStreet',
  description: 'Master African countries in street view games. Region-by-region breakdown of visual clues for West, East, Southern & North Africa — road signs, vegetation, languages & more.',
  alternates: { canonical: 'https://www.loststreet.online/guides/africa-street-view-guide' },
  keywords: ['africa street view', 'african countries geography game', 'west africa street view clues', 'identify african countries', 'loststreet africa guide'],
  openGraph: {
    title: 'How to Identify African Countries in Street View (2026)',
    description: 'Region-by-region breakdown of visual clues for Africa in geography games.',
    url: 'https://www.loststreet.online/guides/africa-street-view-guide',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Identify African Countries in Street View (2026)',
  description: 'A complete visual clue guide to identifying African countries in geography guessing games.',
  author: { '@type': 'Organization', name: 'LostStreet', url: 'https://www.loststreet.online/about' },
  publisher: { '@type': 'Organization', name: 'LostStreet', url: 'https://www.loststreet.online', logo: { '@type': 'ImageObject', url: 'https://www.loststreet.online/icon.png' } },
  datePublished: '2026-07-15T00:00:00.000Z',
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
              How to Identify African Countries in Street View
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', color: '#6b7280', fontSize: '0.9rem', marginTop: '1.5rem' }}>
              <span>Published: September 5, 2026</span>
              <span>•</span>
              <span>10 min read</span>
            </div>
          </header>

          <article style={{ fontSize: '1.125rem', color: '#374151' }}>
            
            <p style={{ fontSize: '1.25rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Africa is the most diverse continent on Earth, yet many geography game players treat it as a single, undifferentiated region. This guide breaks Africa into its distinct sub-regions and gives you the specific visual clues to identify each country with confidence in <strong>LostStreet</strong> and similar games.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '3rem 0' }} />

            <h2 style={headingStyle}>First: Is It Africa?</h2>
            <p>Before identifying the country, confirm you are in Africa. Key continental clues:</p>
            <ul style={listStyle}>
              <li>Red or orange laterite soil on unpaved roads.</li>
              <li>Acacia trees (flat-topped, umbrella-shaped) in savanna regions.</li>
              <li>Corrugated iron roofs on houses.</li>
              <li>Older Japanese or Chinese vehicles (Toyota Land Cruisers, Isuzu trucks).</li>
              <li>Hand-painted shop signs with bright colours.</li>
              <li>The sun is high in the sky and shadows are short (equatorial region).</li>
            </ul>

            <h2 style={headingStyle}>West Africa</h2>
            <p><strong>Countries with Street View coverage:</strong> Nigeria, Ghana, Senegal, Ivory Coast, Cameroon, Togo, Benin.</p>
            <p><strong>Language clues:</strong> English (Nigeria, Ghana), French (Senegal, Ivory Coast, Cameroon, Togo, Benin).</p>
            <ul style={listStyle}>
              <li><strong>Ghana:</strong> The Google car has distinctive black tape on the roof rack. English signage. Green, gold, and red flag with a black star.</li>
              <li><strong>Nigeria:</strong> English signage. Very dense urban areas. References to specific Nigerian states on signs. Green and white flag.</li>
              <li><strong>Senegal:</strong> French signage. More Sahel-like landscape (drier, sandier). Green, yellow, red flag with a green star.</li>
              <li><strong>Ivory Coast (Côte d'Ivoire):</strong> French signage. Orange, white, green flag. More tropical vegetation than Senegal.</li>
            </ul>

            <h2 style={headingStyle}>East Africa</h2>
            <p><strong>Countries with Street View coverage:</strong> Kenya, Tanzania, Uganda, Ethiopia, Rwanda.</p>
            <ul style={listStyle}>
              <li><strong>Kenya:</strong> Left-hand traffic. The Google car has a black snorkel on the front right. English and Swahili signage. Red, green, black, and white flag.</li>
              <li><strong>Tanzania:</strong> Left-hand traffic. Similar to Kenya but generally less developed road infrastructure. Blue, black, green flag with yellow stripes.</li>
              <li><strong>Ethiopia:</strong> Unique Ge'ez (Ethiopic) script on signs — completely unlike any other African country. Green, yellow, red flag with a blue circle.</li>
              <li><strong>Rwanda:</strong> Very hilly, green landscape. French and English signage. Blue, yellow, green flag with a sun symbol.</li>
            </ul>

            <h2 style={headingStyle}>Southern Africa</h2>
            <p><strong>Countries with Street View coverage:</strong> South Africa, Botswana, Namibia, Zimbabwe, Mozambique, Madagascar.</p>
            <ul style={listStyle}>
              <li><strong>South Africa:</strong> Left-hand traffic. English signage (plus Afrikaans, Zulu, Xhosa). Very modern road infrastructure. Yellow and black chevron bollards. Distinctive green highway signs.</li>
              <li><strong>Botswana:</strong> Left-hand traffic. Very flat, dry Kalahari landscape. English signage. Light blue, black, white flag.</li>
              <li><strong>Namibia:</strong> Right-hand traffic (former German colony). German and English signage. Very arid, desert landscape. Red, blue, green flag with a sun.</li>
              <li><strong>Madagascar:</strong> Right-hand traffic. French signage. Unique red laterite roads. Distinctive baobab trees. Red and white flag.</li>
            </ul>

            <h2 style={headingStyle}>North Africa</h2>
            <p><strong>Countries with Street View coverage:</strong> Morocco, Tunisia, Egypt.</p>
            <ul style={listStyle}>
              <li><strong>Morocco:</strong> Arabic and French signage. Red flag with a green star. Distinctive Islamic architecture. Atlas Mountains visible in background.</li>
              <li><strong>Tunisia:</strong> Arabic and French signage. Red and white flag with crescent and star. More Mediterranean feel than Morocco.</li>
              <li><strong>Egypt:</strong> Arabic signage. Red, white, black flag with an eagle. Nile Delta vegetation or desert landscape. Ancient monuments occasionally visible.</li>
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
                Test Your Africa Knowledge!
              </h3>
              <p style={{ color: '#4b5563', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Play LostStreet and see how many African countries you can correctly identify.
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

