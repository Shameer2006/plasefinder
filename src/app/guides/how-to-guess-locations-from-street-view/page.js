import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "The Map Sleuth's Guide: Guessing Countries Using Road Signs & Language Toponymy | LostStreet",
  description: "Drop into any random street view location and guess the country in under a minute using road sign hardware, bollards, utility poles, and language toponymy clues.",
  alternates: { canonical: "https://www.loststreet.online/guides/how-to-guess-locations-from-street-view" },
  keywords: [
    "road sign guessing", "street view hardware clues", "bollards geoguessr", "holey poles mexico france",
    "language toponymy clues", "cyrillic vs latin road signs", "street view sign backings", "geoguessr guide"
  ],
  openGraph: {
    title: "The Map Sleuth's Guide: Guessing Countries Using Road Signs & Language Toponymy",
    description: "Learn how to identify countries in Street View using road hardware, sign backings, bollards, utility poles, and language toponymy.",
    url: "https://www.loststreet.online/guides/how-to-guess-locations-from-street-view",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Map Sleuth's Guide: Guessing Countries Using Road Signs & Language Toponymy",
  "description": "Master location identification in Google Street View using physical sign hardware, sign backings, bollards, utility poles, and toponymy language clues.",
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
              The Map Sleuth's Guide: Guessing Countries Using Road Signs & Language Toponymy
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', color: '#6b7280', fontSize: '0.9rem', marginTop: '1.5rem' }}>
              <span>Published: August 20, 2026</span>
              <span>•</span>
              <span>7 min read</span>
            </div>
          </header>

          <article style={{ fontSize: '1.125rem', color: '#374151' }}>
            
            <p style={{ fontSize: '1.25rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Drop into a random street anywhere on Earth. Could you figure out exactly where you are in under a minute? For GeoGuessr players and geography enthusiasts, this isn't magic—it's a science of observation. While landscapes and architecture provide a general vibe, the quickest way to identify a country is often by looking at the things most people ignore: the back of a road sign, the shape of a bollard, or the specific letters on a street name.
            </p>

            <p style={{ fontWeight: 600, color: '#111827', marginBottom: '2rem' }}>
              Here is your crash course in reading the world through infrastructure and language.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '3rem 0' }} />

            <h2 style={headingStyle}>1. Reading the Road Hardware</h2>
            
            <p>
              Every country has its own safety standards and manufacturing quirks for road infrastructure. Recognizing these physical "tells" can immediately narrow down your location.
            </p>

            <h3 style={subHeadingStyle}>Bollards (Delineators)</h3>
            <p>
              These roadside markers are some of the most reliable clues in the game. For example, <strong>Austria</strong> uses a distinct white bollard with a black top section featuring a red or yellow rectangular reflector. Meanwhile, <strong>Australian</strong> bollards often feature a red strip on a white post, and <strong>Italy</strong> uses a bold black-and-white striped design.
            </p>

            <figure style={{ margin: '2rem 0' }}>
              <img 
                src="/austrian-delineator-bollard.jpg" 
                alt="Austrian delineator bollard" 
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }} 
              />
              <figcaption style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', marginTop: '0.75rem', fontFamily: '"Inter", system-ui, sans-serif' }}>
                Austrian delineator bollard. Source: David Crespo / Getty Images
              </figcaption>
            </figure>

            <h3 style={subHeadingStyle}>Poles</h3>
            <p>
              Utility poles are highly regional. <strong>France</strong>, <strong>Poland</strong>, and <strong>Mexico</strong> are famous for their "holey poles"—concrete utility poles with ladder-like holes running up the middle. If you see wooden poles with a specific insulator stack, you might be looking at the <strong>United States</strong> or <strong>Canada</strong>.
            </p>

            <h3 style={subHeadingStyle}>Sign Backings</h3>
            <p>
              The back of a road sign is often more helpful than the front. In <strong>Colombia</strong>, road signs are almost always reinforced with a distinctive metallic cross-frame on the back. In contrast, if you see road signs whose backs are painted completely black, you are almost certainly in <strong>Brazil</strong>.
            </p>

            <figure style={{ margin: '2rem 0' }}>
              <img 
                src="/colombian-road-sign.jpg" 
                alt="Colombian road sign cross back" 
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }} 
              />
              <figcaption style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', marginTop: '0.75rem', fontFamily: '"Inter", system-ui, sans-serif' }}>
                Colombian road sign cross back. Source: EGT / Getty Images
              </figcaption>
            </figure>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '3rem 0' }} />

            <h2 style={headingStyle}>2. Decoding Languages and Toponymy</h2>

            <p>
              You don't need to be fluent in a language to use it as a clue. Recognizing unique letters (orthography), common suffixes, and specific words can instantly place you on the right side of a border.
            </p>

            <h3 style={subHeadingStyle}>The "Glaringly Obvious" Letters</h3>
            <p>
              Certain characters belong to very specific countries. <strong>Poland</strong> is incredibly easy to spot if you look for letters like <strong>ą, ę, ł, ń, ó, ż,</strong> or <strong>ź</strong>. If you are torn between Scandinavian countries, remember that <strong>Swedish</strong> uses <strong>ö</strong> and <strong>ä</strong>, while <strong>Norway</strong> and <strong>Denmark</strong> use <strong>ø</strong> and <strong>æ</strong>.
            </p>

            <figure style={{ margin: '2rem 0' }}>
              <img 
                src="/polish-town-entry-sign.jpg" 
                alt="Polish town entry sign" 
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }} 
              />
              <figcaption style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', marginTop: '0.75rem', fontFamily: '"Inter", system-ui, sans-serif' }}>
                Polish town entry sign. Source: RobsonPL / Getty Images
              </figcaption>
            </figure>

            <h3 style={subHeadingStyle}>The "Street" Test</h3>
            <p>
              The word for "street" is a massive giveaway. If you are debating between Russia and Ukraine, look at the street signs. In <strong>Russian</strong>, street is <em>улица</em> (ulitsa) and often abbreviated as <strong>ул.</strong> In <strong>Ukrainian</strong>, it's <em>вулиця</em> (vulitsya), abbreviated as <strong>вул.</strong>
            </p>

            <h3 style={subHeadingStyle}>Script Mixing</h3>
            <p>
              Some countries regularly mix alphabets on their signage. <strong>Serbia</strong> is famous for dual-script road signs, displaying both Cyrillic and Latin alphabets one above the other.
            </p>

            <figure style={{ margin: '2rem 0' }}>
              <img 
                src="/serbian-dual-script-road-sign.jpg" 
                alt="Serbian dual-script road sign" 
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }} 
              />
              <figcaption style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', marginTop: '0.75rem', fontFamily: '"Inter", system-ui, sans-serif' }}>
                Serbian dual-script road sign. Source: Emily_M_Wilson / Getty Images
              </figcaption>
            </figure>

            <h3 style={subHeadingStyle}>Toponymy (Place Names)</h3>
            <p>
              Pay attention to the suffixes on town entry signs. A town ending in <strong>-grad</strong> or <strong>-vo</strong> points to Slavic regions, while <strong>-burg</strong> or <strong>-dorf</strong> indicates Germanic influence. In Central Asia, the <strong>-abad</strong> and <strong>-stan</strong> suffixes dominate the map.
            </p>

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
                Test your newly acquired language deduction skills with this interactive quiz before your next game:
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

