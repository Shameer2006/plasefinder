import Link from 'next/link';

export const metadata = {
  title: 'How to Identify Asian Countries in Street View — LostStreet',
  description: 'A complete guide to identifying Asian countries in geography guessing games. Learn visual clues for East Asia, Southeast Asia, South Asia, and Central Asia.',
  openGraph: {
    title: 'How to Identify Asian Countries in Street View',
    description: 'Learn visual clues for identifying Asian countries in geography guessing games.',
    url: 'https://www.loststreet.online/guides/asia-street-view-guide',
    type: 'article',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Identify Asian Countries in Street View',
  description: 'A complete guide to identifying Asian countries in geography guessing games.',
  author: { '@type': 'Organization', name: 'LostStreet' },
  datePublished: '2026-09-08T00:00:00.000Z',
  dateModified: '2026-09-08T00:00:00.000Z',
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
            How to Identify Asian Countries in Street View
          </h1>
          <div style={{ color: '#9ca3af', marginBottom: '3rem', fontSize: '0.9rem' }}>Published: September 8, 2026 • 11 min read</div>
          <article style={{ fontSize: '1.1rem', color: '#d1d5db', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              Asia is the largest and most populous continent, covering an enormous range of climates, cultures, and landscapes. From the frozen tundra of Siberia to the tropical beaches of Thailand, identifying Asian countries in <strong>LostStreet</strong> requires a solid understanding of each sub-region's unique visual signatures.
            </p>

            <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>East Asia</h2>
            <h3 style={{ fontSize: '1.3rem', color: '#10b981', marginBottom: '0.5rem' }}>Japan</h3>
            <p>Japan is one of the most recognisable countries in street view games. Key clues:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Left-hand traffic.</li>
              <li>Extremely dense clusters of power lines and cables on wooden poles — unlike anywhere else in the world.</li>
              <li>Japanese script (Hiragana, Katakana, Kanji) on signs.</li>
              <li>Vending machines on almost every street corner.</li>
              <li>Distinctive red torii gates near Shinto shrines.</li>
              <li>Very clean, well-maintained roads and infrastructure.</li>
            </ul>

            <h3 style={{ fontSize: '1.3rem', color: '#10b981', marginBottom: '0.5rem', marginTop: '1rem' }}>South Korea</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Right-hand traffic.</li>
              <li>Hangul script — blocky characters with circles and lines, unique to Korea.</li>
              <li>Korean flag (Taegukgi) — white with a red and blue yin-yang symbol and black trigrams.</li>
              <li>Modern, dense urban areas with distinctive apartment block clusters.</li>
              <li>Mountains visible in the background in most locations.</li>
            </ul>

            <h3 style={{ fontSize: '1.3rem', color: '#10b981', marginBottom: '0.5rem', marginTop: '1rem' }}>China</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Right-hand traffic.</li>
              <li>Simplified Chinese characters on all signs.</li>
              <li>Red flags with yellow stars (Chinese national flag) on government buildings.</li>
              <li>Very wide roads in urban areas.</li>
              <li>Green electric vehicle license plates are increasingly common.</li>
            </ul>

            <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>Southeast Asia</h2>
            <h3 style={{ fontSize: '1.3rem', color: '#10b981', marginBottom: '0.5rem' }}>Thailand</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Left-hand traffic.</li>
              <li>Thai script — very distinctive circular, flowing letters unlike any other script.</li>
              <li>Buddhist temples (wats) with golden spires.</li>
              <li>Red, white, and blue striped flag.</li>
              <li>Motorbikes and tuk-tuks everywhere.</li>
            </ul>

            <h3 style={{ fontSize: '1.3rem', color: '#10b981', marginBottom: '0.5rem', marginTop: '1rem' }}>Vietnam</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Right-hand traffic.</li>
              <li>Latin script with extensive diacritical marks (Vietnamese uses a modified Latin alphabet).</li>
              <li>Red flag with a yellow star.</li>
              <li>Extremely dense motorbike traffic in cities.</li>
              <li>Narrow shophouse buildings (tube houses) in urban areas.</li>
              <li>Terraced rice fields in northern mountainous regions.</li>
            </ul>

            <h3 style={{ fontSize: '1.3rem', color: '#10b981', marginBottom: '0.5rem', marginTop: '1rem' }}>Indonesia</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Left-hand traffic.</li>
              <li>Latin script (Indonesian uses standard Latin alphabet).</li>
              <li>Red and white flag (simple bicolour).</li>
              <li>Tropical vegetation — palm trees, dense jungle.</li>
              <li>The Google camera is sometimes mounted on a motorbike.</li>
              <li>Distinctive Indonesian mosque architecture (domed mosques with minarets).</li>
            </ul>

            <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>South Asia</h2>
            <h3 style={{ fontSize: '1.3rem', color: '#10b981', marginBottom: '0.5rem' }}>India</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Left-hand traffic.</li>
              <li>Multiple scripts visible — Devanagari (Hindi), Tamil, Telugu, Bengali depending on region.</li>
              <li>Saffron, white, and green tricolour flag with blue Ashoka Chakra.</li>
              <li>Auto-rickshaws (tuk-tuks) are ubiquitous.</li>
              <li>Colourful hand-painted signs and advertisements.</li>
              <li>Cows on the road in many areas.</li>
            </ul>

            <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>Central Asia</h2>
            <p>Kazakhstan, Kyrgyzstan, Uzbekistan, and Tajikistan all use Cyrillic script and share Soviet-era infrastructure. Key differentiators:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Kazakhstan:</strong> Flatter terrain, more industrialised, better road quality due to oil wealth.</li>
              <li><strong>Kyrgyzstan:</strong> Very mountainous — dramatic peaks visible in the background.</li>
              <li><strong>Uzbekistan:</strong> More desert landscape, distinctive Islamic architecture (blue-tiled mosques and madrasas).</li>
            </ul>

            <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(16,185,129,0.1)', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(16,185,129,0.3)' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>Test your Asia knowledge</h3>
              <p style={{ marginBottom: '1.5rem' }}>Play LostStreet and practice identifying Asian countries from street view clues.</p>
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
