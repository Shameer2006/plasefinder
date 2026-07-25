import Link from 'next/link';

export const metadata = {
  title: 'The Ultimate Street View Clues Guide — LostStreet',
  description: 'A comprehensive reference guide to every visual clue in Google Street View — bollards, road markings, utility poles, sun position, and more. Master geography guessing games.',
  openGraph: {
    title: 'The Ultimate Street View Clues Guide',
    description: 'A comprehensive reference to every visual clue in Google Street View for geography guessing games.',
    url: 'https://www.loststreet.online/guides/geography-clues-guide',
    type: 'article',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Ultimate Street View Clues Guide',
  description: 'A comprehensive reference guide to every visual clue in Google Street View for geography guessing games.',
  author: { '@type': 'Organization', name: 'LostStreet' },
  datePublished: '2026-09-01T00:00:00.000Z',
  dateModified: '2026-09-01T00:00:00.000Z',
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
            The Ultimate Street View Clues Guide
          </h1>
          <div style={{ color: '#9ca3af', marginBottom: '3rem', fontSize: '0.9rem' }}>Published: September 1, 2026 • 12 min read</div>
          <article style={{ fontSize: '1.1rem', color: '#d1d5db', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              This is the most comprehensive reference guide to visual clues in Google Street View for geography guessing games like <strong>LostStreet</strong>. Bookmark this page and refer back to it as you build your knowledge.
            </p>

            <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>Bollards</h2>
            <p>Bollards are the small posts on the side of roads. They are highly country-specific:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>France:</strong> White with a red top band and a red reflector.</li>
              <li><strong>Australia:</strong> White with a red reflector on the back, white on the front.</li>
              <li><strong>New Zealand:</strong> Similar to Australia but with yellow reflectors.</li>
              <li><strong>Brazil:</strong> Yellow and black striped bollards are common.</li>
              <li><strong>Russia:</strong> White with a red or orange reflective band.</li>
              <li><strong>Poland:</strong> White with a red stripe and a distinctive shape.</li>
              <li><strong>South Africa:</strong> Yellow and black chevron bollards on highways.</li>
            </ul>

            <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>Utility Poles and Power Lines</h2>
            <p>The style of electricity poles and how power lines are strung varies significantly by country:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Japan:</strong> Extremely dense clusters of power lines and cables on wooden poles. One of the most distinctive clues in the game.</li>
              <li><strong>USA:</strong> Tall wooden poles with multiple crossbars and transformers.</li>
              <li><strong>Mongolia:</strong> Wooden poles with a distinctive cross-shaped top piece.</li>
              <li><strong>Russia:</strong> Concrete poles with a specific angular shape.</li>
              <li><strong>Western Europe:</strong> Underground cables are common, so fewer visible poles.</li>
            </ul>

            <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>Road Markings and Signs</h2>
            <p>Road markings are standardised within countries but differ internationally:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Yellow centre lines:</strong> USA, Canada, Brazil, Japan, South Korea.</li>
              <li><strong>White centre lines:</strong> Most of Europe, Australia, UK.</li>
              <li><strong>Speed signs in km/h:</strong> Most of the world except USA, UK, Myanmar.</li>
              <li><strong>Speed signs in mph:</strong> USA, UK, Liberia, Myanmar.</li>
              <li><strong>Green highway signs:</strong> USA, Canada, Australia, Ireland.</li>
              <li><strong>Blue highway signs:</strong> Most of Europe.</li>
            </ul>

            <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>The Sun Position</h2>
            <p>
              The position of the sun in the sky tells you which hemisphere you are in. In the Northern Hemisphere, the sun travels across the southern part of the sky. In the Southern Hemisphere, it travels across the northern part of the sky. This means:
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Shadows pointing north = Southern Hemisphere (Australia, South America, Southern Africa).</li>
              <li>Shadows pointing south = Northern Hemisphere (Europe, North America, Asia).</li>
            </ul>
            <p>This clue alone can eliminate half the world instantly.</p>

            <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>Architecture Styles</h2>
            <p>Building styles are powerful regional indicators:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Soviet-era apartment blocks (Khrushchyovka):</strong> Russia, Ukraine, Belarus, Baltic states, Central Asia, and former Soviet satellite states in Eastern Europe.</li>
              <li><strong>Colourful colonial buildings:</strong> Latin America, parts of West Africa, Southeast Asia.</li>
              <li><strong>Corrugated iron roofs:</strong> Sub-Saharan Africa, Pacific Islands, parts of Southeast Asia.</li>
              <li><strong>Stucco white walls with terracotta roofs:</strong> Mediterranean Europe (Spain, Portugal, Greece, Italy).</li>
              <li><strong>Wooden houses with steep roofs:</strong> Scandinavia, Finland, Russia.</li>
              <li><strong>Shophouse architecture (narrow buildings with covered walkways):</strong> Malaysia, Singapore, Vietnam, parts of Indonesia.</li>
            </ul>

            <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>The Google Car Itself</h2>
            <p>The Google Street View car has country-specific modifications that are visible in the panorama:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Ghana:</strong> Black tape on the roof rack — one of the most famous clues in the game.</li>
              <li><strong>Kenya:</strong> A black snorkel visible on the front right of the vehicle.</li>
              <li><strong>Guatemala:</strong> Visible side mirrors on the car.</li>
              <li><strong>Mongolia:</strong> The car often has a distinctive antenna or equipment visible.</li>
              <li><strong>Indonesia:</strong> The camera is sometimes mounted on a motorbike rather than a car.</li>
            </ul>

            <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>Soil and Road Colour</h2>
            <p>The colour of unpaved roads and exposed soil is a strong regional indicator:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Red/orange soil:</strong> West Africa, parts of East Africa, Queensland (Australia), parts of Brazil.</li>
              <li><strong>White/grey chalky soil:</strong> Parts of the Middle East, North Africa.</li>
              <li><strong>Dark brown soil:</strong> Eastern Europe, parts of Russia (chernozem).</li>
              <li><strong>Sandy yellow:</strong> Sahara region, Arabian Peninsula, Central Australia.</li>
            </ul>

            <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(16,185,129,0.1)', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(16,185,129,0.3)' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>Put these clues to use</h3>
              <p style={{ marginBottom: '1.5rem' }}>Play a round of LostStreet and practice spotting these clues in real locations.</p>
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
