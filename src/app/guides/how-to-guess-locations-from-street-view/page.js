import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "How to Guess Locations in Google Street View — Language & Sign Guide | LostStreet",
  description: "Master Google Street View guessing using road sign hardware, backings, and language clues. Learn to recognize French 'Mas', Cyrillic letters, Spanish vs Portuguese prefixes, and sign post construction.",
  alternates: { canonical: "https://www.loststreet.online/guides/how-to-guess-locations-from-street-view" },
  keywords: [
    "street view guesser", "how to guess location street view", "loststreet guide", "street view sign clues",
    "mas de carles street view", "french road sign back", "geoguessr language guide", "toponymy geography clues",
    "spanish vs portuguese street view", "cyrillic alphabet identification"
  ],
  openGraph: {
    title: "How to Guess Locations in Google Street View — Language & Sign Guide",
    description: "Learn how to identify countries by sign hardware, backings, and place name prefixes like French 'Mas', Spanish 'San', and Cyrillic script.",
    url: "https://www.loststreet.online/guides/how-to-guess-locations-from-street-view",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Guess Locations in Google Street View — Language & Sign Hardware Guide",
  "description": "Master location identification in Google Street View using physical sign hardware, sign backings, and toponymy language clues.",
  "author": {
    "@type": "Organization",
    "name": "LostStreet",
    "url": "https://www.loststreet.online"
  },
  "publisher": {
    "@type": "Organization",
    "name": "LostStreet",
    "logo": { "@type": "ImageObject", "url": "https://www.loststreet.online/icon.png" }
  },
  "datePublished": "2026-08-20T00:00:00.000Z",
  "dateModified": "2026-08-20T00:00:00.000Z"
};

export default function ArticlePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          
          {/* Article Header */}
          <header style={{ marginBottom: '3rem', textAlign: 'center', fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
            <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Geography Masterclass
            </span>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900,
              lineHeight: 1.2,
              margin: '1rem 0',
              color: '#111827',
              fontFamily: '"Merriweather", "Georgia", serif'
            }}>
              How to Guess Countries Using Road Sign Hardware & Language Toponymy
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', color: '#6b7280', fontSize: '0.9rem', marginTop: '1.5rem' }}>
              <span>Published: August 20, 2026</span>
              <span>•</span>
              <span>10 min read</span>
            </div>
          </header>

          <article style={{ fontSize: '1.125rem', color: '#374151' }}>
            
            <p style={{ fontSize: '1.25rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              In geography guessing games like <strong>LostStreet</strong>, players often encounter road signs that are facing away from the camera or written in regional dialects. However, top players can instantly determine the exact country—and even the region—by examining two key elements: the physical hardware of the sign, and language toponymy.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '3rem 0' }} />

            <h2 style={headingStyle}>Featured Case Study: Analyzing the "MAS DE CARLES" Road Sign</h2>
            
            <p>
              Let's look at a practical example. Imagine you are dropped on a rural road and you spot a directional sign. You can glean an immense amount of information from both the physical construction of the sign and the words written on it.
            </p>

            {/* Actual Image / Visual Sign */}
            <figure style={{ margin: '3rem 0' }}>
              <img 
                src="/mas-de-carles.png" 
                alt="Street View Mas De Carles French Road Sign Backing" 
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }} 
              />
              <figcaption style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', marginTop: '1rem', fontFamily: '"Inter", system-ui, sans-serif' }}>
                Analyzing a typical rural road sign in Southern France.
              </figcaption>
            </figure>

            <h3 style={subHeadingStyle}>Hardware Clue: Sign Backing</h3>
            <p>
              The rear face of French signs is uniquely identifiable. It is typically a raw metallic silver/grey plate with <strong>double horizontal mounting brackets</strong> fixed to a central post. This mounting style instantly eliminates many other European nations.
            </p>

            <h3 style={subHeadingStyle}>Toponymy Clue: "MAS"</h3>
            <p>
              "Mas" is a traditional Provençal / Occitan word for a countryside farmhouse or estate. You will see this used heavily on road signs throughout <strong>Southern France (Occitanie / Provence)</strong>. Seeing "Mas" combined with the double-bracket sign backing guarantees you are in Southern France.
            </p>

            <blockquote style={{
              borderLeft: '4px solid #10b981',
              paddingLeft: '1.5rem',
              fontStyle: 'italic',
              color: '#4b5563',
              margin: '2rem 0',
              background: '#f9fafb',
              padding: '1.5rem'
            }}>
              <strong>📍 Country Verdict:</strong> France 🇫🇷 (Villeneuve-lès-Avignon, Gard)
            </blockquote>

            <h2 style={headingStyle}>1. How to Identify Countries by Sign Backings</h2>
            <p>
              When a sign is turned away from the Street View camera, you can still deduce the country by analyzing the rear construction. Here are the most common rules of thumb:
            </p>

            <ul style={listStyle}>
              <li><strong>France 🇫🇷:</strong> Raw metallic grey rear plate with two horizontal mounting rails attached across the back.</li>
              <li><strong>Italy 🇮🇹:</strong> Solid blue or dark grey backing with a thin white outline strip around the outer perimeter.</li>
              <li><strong>Spain 🇪🇸:</strong> Dark grey or black backs, often accompanied by square white-and-blue kilometer posts.</li>
              <li><strong>Germany & Austria 🇩🇪🇦🇹:</strong> Plain grey unpainted metal backs with tubular steel posts.</li>
              <li><strong>Japan 🇯🇵:</strong> Dark grey or green backs with yellow-and-black striped protective poles at the base.</li>
              <li><strong>United States & Canada 🇺🇸🇨🇦:</strong> Unpainted aluminum backs mounted on wooden square posts or perforated metal square channels.</li>
            </ul>

            <h2 style={headingStyle}>2. Master Language & Toponymy Cheat Sheet</h2>
            <p>
              Street names, city entrances, and directional arrows contain regional prefixes that reveal the exact country or province instantly. Keep an eye out for these patterns:
            </p>

            <h3 style={subHeadingStyle}>🇫🇷 French / Occitan</h3>
            <ul style={listStyle}>
              <li><strong>Mas:</strong> Farmhouse (South France)</li>
              <li><strong>Saint / Sainte:</strong> Town names</li>
              <li><strong>Le / La / Les:</strong> French articles</li>
              <li><strong>Ville / Cap:</strong> City / Cape</li>
              <li><strong>D- / N- roads:</strong> D123 (Departmental)</li>
            </ul>

            <h3 style={subHeadingStyle}>🇪🇸 Spanish</h3>
            <ul style={listStyle}>
              <li><strong>San / Santa:</strong> Saints (*San José*)</li>
              <li><strong>El / La / Los / Las:</strong> Spanish articles</li>
              <li><strong>Calle / Avenida:</strong> Street / Avenue</li>
              <li><strong>Puerto / Sierra:</strong> Pass / Range</li>
              <li><strong>ñ:</strong> Exclusive to Spanish</li>
            </ul>

            <h3 style={subHeadingStyle}>🇵🇹🇧🇷 Portuguese</h3>
            <ul style={listStyle}>
              <li><strong>São / Santa:</strong> Saints (*São Paulo*)</li>
              <li><strong>Vila:</strong> Village (single 'l')</li>
              <li><strong>Rua / Alameda:</strong> Street</li>
              <li><strong>Do / Da / Dos / Das:</strong> Of the</li>
              <li><strong>ã / õ / ç:</strong> Distinctive vowels</li>
            </ul>

            <h3 style={subHeadingStyle}>🇺🇦🇷🇺🇧🇬 Cyrillic Script</h3>
            <ul style={listStyle}>
              <li><strong>Ukraine 🇺🇦:</strong> Uses "і", "ї", "є"</li>
              <li><strong>Bulgaria 🇧🇬:</strong> Uses "Ъ" frequently</li>
              <li><strong>Russia 🇷🇺:</strong> Uses "ы", "э", "ё"</li>
              <li><strong>Serbia 🇷🇸:</strong> Uses "ћ", "ђ", "j"</li>
            </ul>

            <h3 style={subHeadingStyle}>🇰🇷🇯🇵🇹🇭 Asian Alphabets</h3>
            <ul style={listStyle}>
              <li><strong>Korea 🇰🇷:</strong> Circles & straight lines (Hangul)</li>
              <li><strong>Japan 🇯🇵:</strong> Kanji + curved Hiragana (の)</li>
              <li><strong>Thailand 🇹🇭:</strong> Loops at letter ends</li>
              <li><strong>Cambodia 🇰🇭:</strong> Double-decker squiggles</li>
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
                Test Your Language & Sign Meta Skills!
              </h3>
              <p style={{ color: '#4b5563', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Put these place-name clues and sign hardware tricks into action in a free round of LostStreet.
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
