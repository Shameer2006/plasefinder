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
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a1a 100%)', color: '#f3f4f6', fontFamily: "'Outfit', sans-serif" }}>
        <header className="responsive-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/guides" style={{ textDecoration: 'none', color: '#9ca3af', fontSize: '1rem', fontWeight: 600 }}>← Back to Guides</Link>
          <Link href="/" style={{ textDecoration: 'none', color: '#f3f4f6', fontSize: '1.5rem', fontWeight: 800 }}>LostStreet</Link>
        </header>
        <main style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
            How to Identify African Countries in Street View
          </h1>
          <div style={{ color: '#9ca3af', marginBottom: '3rem', fontSize: '0.9rem' }}>Published: September 5, 2026 • 10 min read</div>
          <article style={{ fontSize: '1.1rem', color: '#d1d5db', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              Africa is the most diverse continent on Earth, yet many geography game players treat it as a single, undifferentiated region. This guide breaks Africa into its distinct sub-regions and gives you the specific visual clues to identify each country with confidence in <strong>LostStreet</strong> and similar games.
            </p>

            <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>First: Is It Africa?</h2>
            <p>Before identifying the country, confirm you are in Africa. Key continental clues:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Red or orange laterite soil on unpaved roads.</li>
              <li>Acacia trees (flat-topped, umbrella-shaped) in savanna regions.</li>
              <li>Corrugated iron roofs on houses.</li>
              <li>Older Japanese or Chinese vehicles (Toyota Land Cruisers, Isuzu trucks).</li>
              <li>Hand-painted shop signs with bright colours.</li>
              <li>The sun is high in the sky and shadows are short (equatorial region).</li>
            </ul>

            <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>West Africa</h2>
            <p><strong>Countries with Street View coverage:</strong> Nigeria, Ghana, Senegal, Ivory Coast, Cameroon, Togo, Benin.</p>
            <p><strong>Language clues:</strong> English (Nigeria, Ghana), French (Senegal, Ivory Coast, Cameroon, Togo, Benin).</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Ghana:</strong> The Google car has distinctive black tape on the roof rack. English signage. Green, gold, and red flag with a black star.</li>
              <li><strong>Nigeria:</strong> English signage. Very dense urban areas. References to specific Nigerian states on signs. Green and white flag.</li>
              <li><strong>Senegal:</strong> French signage. More Sahel-like landscape (drier, sandier). Green, yellow, red flag with a green star.</li>
              <li><strong>Ivory Coast (Côte d'Ivoire):</strong> French signage. Orange, white, green flag. More tropical vegetation than Senegal.</li>
            </ul>

            <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>East Africa</h2>
            <p><strong>Countries with Street View coverage:</strong> Kenya, Tanzania, Uganda, Ethiopia, Rwanda.</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Kenya:</strong> Left-hand traffic. The Google car has a black snorkel on the front right. English and Swahili signage. Red, green, black, and white flag.</li>
              <li><strong>Tanzania:</strong> Left-hand traffic. Similar to Kenya but generally less developed road infrastructure. Blue, black, green flag with yellow stripes.</li>
              <li><strong>Ethiopia:</strong> Unique Ge'ez (Ethiopic) script on signs — completely unlike any other African country. Green, yellow, red flag with a blue circle.</li>
              <li><strong>Rwanda:</strong> Very hilly, green landscape. French and English signage. Blue, yellow, green flag with a sun symbol.</li>
            </ul>

            <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>Southern Africa</h2>
            <p><strong>Countries with Street View coverage:</strong> South Africa, Botswana, Namibia, Zimbabwe, Mozambique, Madagascar.</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>South Africa:</strong> Left-hand traffic. English signage (plus Afrikaans, Zulu, Xhosa). Very modern road infrastructure. Yellow and black chevron bollards. Distinctive green highway signs.</li>
              <li><strong>Botswana:</strong> Left-hand traffic. Very flat, dry Kalahari landscape. English signage. Light blue, black, white flag.</li>
              <li><strong>Namibia:</strong> Right-hand traffic (former German colony). German and English signage. Very arid, desert landscape. Red, blue, green flag with a sun.</li>
              <li><strong>Madagascar:</strong> Right-hand traffic. French signage. Unique red laterite roads. Distinctive baobab trees. Red and white flag.</li>
            </ul>

            <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>North Africa</h2>
            <p><strong>Countries with Street View coverage:</strong> Morocco, Tunisia, Egypt.</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Morocco:</strong> Arabic and French signage. Red flag with a green star. Distinctive Islamic architecture. Atlas Mountains visible in background.</li>
              <li><strong>Tunisia:</strong> Arabic and French signage. Red and white flag with crescent and star. More Mediterranean feel than Morocco.</li>
              <li><strong>Egypt:</strong> Arabic signage. Red, white, black flag with an eagle. Nile Delta vegetation or desert landscape. Ancient monuments occasionally visible.</li>
            </ul>

            <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(16,185,129,0.1)', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(16,185,129,0.3)' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>Test your Africa knowledge</h3>
              <p style={{ marginBottom: '1.5rem' }}>Play LostStreet and see how many African countries you can correctly identify.</p>
              <Link href="/" style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)', color: '#fff', padding: '12px 24px', borderRadius: '50px', textDecoration: 'none', fontWeight: 700 }}>
                Play LostStreet Free
              </Link>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}
