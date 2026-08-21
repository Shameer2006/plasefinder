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
              Street View Meta
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
              The Ultimate Street View Clues Guide
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', color: '#6b7280', fontSize: '0.88rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span>Published: September 1, 2026</span>
              <span>•</span>
              <span>12 min read</span>
            </div>
          </header>

          <article style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)', color: '#374151', wordBreak: 'break-word', lineHeight: 1.8 }}>
            
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.22rem)', color: '#4b5563', lineHeight: 1.75, marginBottom: '2rem' }}>
              When you're dropped onto a random dirt road in GeoGuessr, staring at a blurry horizon, the entire world is your multiple-choice answer. But the best players don't memorize ten million miles of roads—they use a logical process of elimination.
            </p>
            <p>
              Every Street View location is packed with standardized, repeatable clues. By learning what to look for, you can systematically filter down the globe until only one country is left standing. Here is the ultimate guide to reading Street View clues like a pro.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '2.5rem 0' }} />

            <h2 style={headingStyle}>1. Cut the Map in Half: Driving Side</h2>
            <p>The single most powerful clue in any Street View game is the driving side. Only about 76 countries and territories drive on the left, while roughly 163 drive on the right.</p>
            <ul style={listStyle}>
              <li><strong>Left-side driving:</strong> Restricts your options heavily. If you see cars on the left, you're immediately looking at places like the UK, Ireland, Australia, New Zealand, Japan, South Africa, Indonesia, or India.</li>
              <li><strong>How to check:</strong> Look at passing cars, parked cars (which usually face the flow of traffic), the orientation of road signs, or which side the Google car is traveling on.</li>
            </ul>

            <h2 style={headingStyle}>2. The &quot;Meta&quot; Clues: The Google Car and Camera</h2>
            <p>Because Google used different equipment and vehicles to map different regions, the artifacts they left behind are dead giveaways.</p>
            
            <div style={{ margin: 'clamp(1.5rem, 3vw, 2.5rem) 0', borderRadius: '12px', overflow: 'hidden' }}>
              <img src="/guides/google-car-v3.png" alt="Google Street View Car" style={{ width: '100%', height: 'auto', maxHeight: '480px', objectFit: 'cover', display: 'block', borderRadius: '12px', border: '1px solid #e5e7eb' }} />
            </div>

            <ul style={listStyle}>
              <li><strong>The Snorkel:</strong> A black plastic tube (a snorkel) visible on the front right of the Google car is a classic sign you are in Kenya. A similar setup occasionally appears in Mongolia or Uganda.</li>
              <li><strong>The Roof Rack:</strong> A visible roof rack with black tape or a distinctive black strip down the middle usually points to Guatemala, the Dominican Republic, or Ghana.</li>
              <li><strong>Camera Generations:</strong> Early &quot;Gen 1&quot; and &quot;Gen 2&quot; cameras have a distinct halo effect or look highly blurred. &quot;Gen 3&quot; and &quot;Gen 4&quot; are crisp and high-definition.</li>
              <li><strong>Camera Height:</strong> A noticeably low camera angle often indicates Japan or Switzerland.</li>
            </ul>

            <h2 style={headingStyle}>3. Infrastructure: Bollards and Road Lines</h2>
            <p>If you don't see the Google car, look at the infrastructure holding the road together. Standardized safety features rarely cross borders.</p>
            
            <div style={{ margin: 'clamp(1.5rem, 3vw, 2.5rem) 0', borderRadius: '12px', overflow: 'hidden', textAlign: 'center' }}>
              <img src="/guides/bollard-v3.png" alt="Road Bollard" style={{ width: '100%', height: 'auto', maxHeight: '480px', objectFit: 'cover', display: 'block', borderRadius: '12px', border: '1px solid #e5e7eb' }} />
            </div>

            <ul style={listStyle}>
              <li><strong>Bollards:</strong> These roadside reflector posts are incredibly specific. For example, Austria uses white posts with a black cap and dark red reflector. France uses a white post with a red strip near the top. Denmark uses short white posts with a green reflector.</li>
              <li><strong>Center Lines:</strong> Double yellow center lines are ubiquitous in the Americas. Europe mostly uses white center lines.</li>
              <li><strong>Edge Lines:</strong> A solid yellow line on the right edge of the road is a strong indicator of Israel or South Africa. Wide white outer edge lines with a yellow inner line point toward Italy or the Balkans.</li>
            </ul>

            <h2 style={headingStyle}>4. The Privacy Blur Survivors: License Plates</h2>
            <p>Google blurs license plate numbers, but the shape and color survive the algorithm—and that's all you need.</p>
            <ul style={listStyle}>
              <li><strong>Yellow Plates:</strong> Yellow plates on both the front and back of cars strongly indicate the Netherlands, Luxembourg, or Israel. A white front plate with a yellow rear plate is a classic UK signature.</li>
              <li><strong>Blue Strips:</strong> The European Union standard features a vertical blue stripe on the left edge. However, Italy and Albania feature blue strips on both the left and right edges of the plate.</li>
              <li><strong>Mercosur Design:</strong> In South America, a distinct blue horizontal band across the top of the plate is shared by Argentina, Brazil, Uruguay, and Paraguay.</li>
            </ul>

            <h2 style={headingStyle}>5. The Natural World and Architecture</h2>
            <p>When the road is completely empty, you have to read the environment.</p>
            <ul style={listStyle}>
              <li><strong>Sun Direction:</strong> Look at your compass. If the sun is in the north, you are in the Southern Hemisphere (e.g., South America, Oceania, southern Africa). If the sun is in the south, you are in the Northern Hemisphere.</li>
              <li><strong>Architecture:</strong> Red clay-tile roofs are dominant in Southern Europe, while wooden houses are more prevalent in Northern Europe. Utility poles also vary: concrete poles with triangle-shaped holes are a staple of Poland, while V-shaped braces are common in Thailand.</li>
              <li><strong>Soil and Vegetation:</strong> Eucalyptus trees and red dirt heavily suggest Australia. Birch forests are a hallmark of Eastern Europe and Russia.</li>
            </ul>
            
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.22rem)', color: '#4b5563', lineHeight: 1.75, marginTop: '2rem', fontWeight: 600 }}>
              The secret to improving isn't studying maps endlessly; it's building a mental checklist. Start every round by checking the driving side, look at the camera/car, find a bollard or license plate, and check the sun.
            </p>

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
                Put These Clues to Use!
              </h3>
              <p style={{ color: '#4b5563', marginBottom: '1.75rem', fontSize: 'clamp(0.95rem, 2vw, 1.08rem)', lineHeight: 1.6 }}>
                Play a round of LostStreet and practice spotting these clues in real locations.
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
