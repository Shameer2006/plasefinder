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

const headingStyle = {
  fontSize: 'clamp(1.35rem, 3.5vw, 1.85rem)',
  fontWeight: 800,
  color: '#111827',
  marginTop: 'clamp(2.2rem, 4.5vw, 3.5rem)',
  marginBottom: 'clamp(0.75rem, 2vw, 1.2rem)',
  fontFamily: '"Merriweather", "Georgia", serif',
  lineHeight: 1.35,
  wordBreak: 'break-word',
};

const subHeadingStyle = {
  fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
  fontWeight: 700,
  color: '#1f2937',
  marginTop: 'clamp(1.5rem, 3vw, 2.2rem)',
  marginBottom: '0.65rem',
  fontFamily: '"Inter", system-ui, sans-serif',
  lineHeight: 1.35,
  wordBreak: 'break-word',
};

const listStyle = {
  listStyleType: 'disc',
  paddingLeft: 'clamp(1.2rem, 3vw, 1.8rem)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.65rem',
  marginBottom: '1.8rem',
  color: '#374151',
  lineHeight: 1.75,
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
        {/* ── BREADCRUMB SUB-NAV BAR ─────────────────────────────────────── */}
        <div style={{
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '0.75rem clamp(1rem, 3vw, 2.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontFamily: '"Inter", system-ui, -apple-system, sans-serif'
        }}>
          <Link href="/guides" style={{
            color: '#4b5563',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.88rem',
            padding: '4px 8px',
            borderRadius: '6px',
            transition: 'color 0.2s',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Back to Guides</span>
          </Link>

          <div style={{ color: '#111827', fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            LostStreet <span style={{ color: '#10b981' }}>Academy</span>
          </div>
        </div>

        {/* ── ARTICLE CONTAINER ────────────────────────────────────────── */}
        <main style={{ padding: 'clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 3vw, 1.5rem)', maxWidth: '760px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          
          <header className="article-header" style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.75rem)', textAlign: 'center', fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
            <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'inline-block' }}>
              Continent Guides
            </span>
            <h1 style={{
              fontSize: 'clamp(1.65rem, 4.5vw, 2.75rem)',
              fontWeight: 900,
              lineHeight: 1.22,
              margin: '0.85rem 0',
              color: '#111827',
              fontFamily: '"Merriweather", "Georgia", serif',
              wordBreak: 'break-word',
            }}>
              How to Identify African Countries in Street View
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', color: '#6b7280', fontSize: '0.88rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span>Published: September 5, 2026</span>
              <span>•</span>
              <span>10 min read</span>
            </div>
          </header>

          <article style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)', color: '#374151', wordBreak: 'break-word', lineHeight: 1.8 }}>
            
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.22rem)', color: '#4b5563', lineHeight: 1.75, marginBottom: '2rem' }}>
              Africa is the most diverse continent on Earth, yet many geography game players treat it as a single, undifferentiated region. This guide breaks Africa into its distinct sub-regions and gives you the specific visual clues to identify each country with confidence in <strong>LostStreet</strong> and similar games.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '2.5rem 0' }} />

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

            {/* ── CTA CALLOUT ────────────────────────────────────────────── */}
            <div style={{
              marginTop: 'clamp(2.5rem, 5vw, 4rem)',
              padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)',
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              textAlign: 'center',
              fontFamily: '"Inter", system-ui, sans-serif'
            }}>
              <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.6rem)', color: '#111827', margin: '0 0 12px 0', fontWeight: 800 }}>
                Test Your Africa Knowledge!
              </h3>
              <p style={{ color: '#4b5563', marginBottom: '1.75rem', fontSize: 'clamp(0.95rem, 2vw, 1.08rem)', lineHeight: 1.6 }}>
                Play LostStreet and see how many African countries you can correctly identify.
              </p>
              <Link href="/" style={{
                background: '#10b981',
                color: '#fff',
                padding: '13px 28px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.98rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '46px',
                transition: 'background 0.2s ease',
                touchAction: 'manipulation',
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
