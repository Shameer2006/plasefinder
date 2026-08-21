import Link from 'next/link';

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
              Geography Masterclass
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
              The Map Sleuth's Guide: Guessing Countries Using Road Signs &amp; Language Toponymy
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', color: '#6b7280', fontSize: '0.88rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span>Published: August 20, 2026</span>
              <span>•</span>
              <span>7 min read</span>
            </div>
          </header>

          <article style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)', color: '#374151', wordBreak: 'break-word', lineHeight: 1.8 }}>
            
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.22rem)', color: '#4b5563', lineHeight: 1.75, marginBottom: '2rem' }}>
              Drop into a random street anywhere on Earth. Could you figure out exactly where you are in under a minute? For GeoGuessr players and geography enthusiasts, this isn't magic—it's a science of observation. While landscapes and architecture provide a general vibe, the quickest way to identify a country is often by looking at the things most people ignore: the back of a road sign, the shape of a bollard, or the specific letters on a street name.
            </p>

            <p style={{ fontWeight: 600, color: '#111827', marginBottom: '2rem' }}>
              Here is your crash course in reading the world through infrastructure and language.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '2.5rem 0' }} />

            <h2 style={headingStyle}>1. Reading the Road Hardware</h2>
            
            <p>
              Every country has its own safety standards and manufacturing quirks for road infrastructure. Recognizing these physical &quot;tells&quot; can immediately narrow down your location.
            </p>

            <h3 style={subHeadingStyle}>Bollards (Delineators)</h3>
            <p>
              These roadside markers are some of the most reliable clues in the game. For example, <strong>Austria</strong> uses a distinct white bollard with a black top section featuring a red or yellow rectangular reflector. Meanwhile, <strong>Australian</strong> bollards often feature a red strip on a white post, and <strong>Italy</strong> uses a bold black-and-white striped design.
            </p>

            <figure style={{ margin: 'clamp(1.5rem, 3vw, 2.5rem) 0', textAlign: 'center' }}>
              <img 
                src="/austrian-delineator-bollard.jpg" 
                alt="Austrian delineator bollard" 
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '480px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  display: 'block'
                }} 
              />
              <figcaption style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.85rem', marginTop: '0.65rem', fontFamily: '"Inter", system-ui, sans-serif' }}>
                Austrian delineator bollard. Source: David Crespo / Getty Images
              </figcaption>
            </figure>

            <h3 style={subHeadingStyle}>Poles</h3>
            <p>
              Utility poles are highly regional. <strong>France</strong>, <strong>Poland</strong>, and <strong>Mexico</strong> are famous for their &quot;holey poles&quot;—concrete utility poles with ladder-like holes running up the middle. If you see wooden poles with a specific insulator stack, you might be looking at the <strong>United States</strong> or <strong>Canada</strong>.
            </p>

            <h3 style={subHeadingStyle}>Sign Backings</h3>
            <p>
              The back of a road sign is often more helpful than the front. In <strong>Colombia</strong>, road signs are almost always reinforced with a distinctive metallic cross-frame on the back. In contrast, if you see road signs whose backs are painted completely black, you are almost certainly in <strong>Brazil</strong>.
            </p>

            <figure style={{ margin: 'clamp(1.5rem, 3vw, 2.5rem) 0', textAlign: 'center' }}>
              <img 
                src="/colombian-road-sign.jpg" 
                alt="Colombian road sign cross back" 
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '480px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  display: 'block'
                }} 
              />
              <figcaption style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.85rem', marginTop: '0.65rem', fontFamily: '"Inter", system-ui, sans-serif' }}>
                Colombian road sign cross back. Source: EGT / Getty Images
              </figcaption>
            </figure>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '2.5rem 0' }} />

            <h2 style={headingStyle}>2. Decoding Languages and Toponymy</h2>

            <p>
              You don't need to be fluent in a language to use it as a clue. Recognizing unique letters (orthography), common suffixes, and specific words can instantly place you on the right side of a border.
            </p>

            <h3 style={subHeadingStyle}>The &quot;Glaringly Obvious&quot; Letters</h3>
            <p>
              Certain characters belong to very specific countries. <strong>Poland</strong> is incredibly easy to spot if you look for letters like <strong>ą, ę, ł, ń, ó, ż,</strong> or <strong>ź</strong>. If you are torn between Scandinavian countries, remember that <strong>Swedish</strong> uses <strong>ö</strong> and <strong>ä</strong>, while <strong>Norway</strong> and <strong>Denmark</strong> use <strong>ø</strong> and <strong>æ</strong>.
            </p>

            <figure style={{ margin: 'clamp(1.5rem, 3vw, 2.5rem) 0', textAlign: 'center' }}>
              <img 
                src="/polish-town-entry-sign.jpg" 
                alt="Polish town entry sign" 
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '480px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  display: 'block'
                }} 
              />
              <figcaption style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.85rem', marginTop: '0.65rem', fontFamily: '"Inter", system-ui, sans-serif' }}>
                Polish town entry sign. Source: RobsonPL / Getty Images
              </figcaption>
            </figure>

            <h3 style={subHeadingStyle}>The &quot;Street&quot; Test</h3>
            <p>
              The word for &quot;street&quot; is a massive giveaway. If you are debating between Russia and Ukraine, look at the street signs. In <strong>Russian</strong>, street is <em>улица</em> (ulitsa) and often abbreviated as <strong>ул.</strong> In <strong>Ukrainian</strong>, it's <em>вулиця</em> (vulitsya), abbreviated as <strong>вул.</strong>
            </p>

            <h3 style={subHeadingStyle}>Script Mixing</h3>
            <p>
              Some countries regularly mix alphabets on their signage. <strong>Serbia</strong> is famous for dual-script road signs, displaying both Cyrillic and Latin alphabets one above the other.
            </p>

            <figure style={{ margin: 'clamp(1.5rem, 3vw, 2.5rem) 0', textAlign: 'center' }}>
              <img 
                src="/serbian-dual-script-road-sign.jpg" 
                alt="Serbian dual-script road sign" 
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '480px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  display: 'block'
                }} 
              />
              <figcaption style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.85rem', marginTop: '0.65rem', fontFamily: '"Inter", system-ui, sans-serif' }}>
                Serbian dual-script road sign. Source: Emily_M_Wilson / Getty Images
              </figcaption>
            </figure>

            <h3 style={subHeadingStyle}>Toponymy (Place Names)</h3>
            <p>
              Pay attention to the suffixes on town entry signs. A town ending in <strong>-grad</strong> or <strong>-vo</strong> points to Slavic regions, while <strong>-burg</strong> or <strong>-dorf</strong> indicates Germanic influence. In Central Asia, the <strong>-abad</strong> and <strong>-stan</strong> suffixes dominate the map.
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
                Test Your Language &amp; Sign Meta Skills!
              </h3>
              <p style={{ color: '#4b5563', marginBottom: '1.75rem', fontSize: 'clamp(0.95rem, 2vw, 1.08rem)', lineHeight: 1.6 }}>
                Test your newly acquired language deduction skills with LostStreet before your next game:
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
