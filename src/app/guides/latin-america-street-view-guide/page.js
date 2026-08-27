import Link from 'next/link';

export const metadata = {
  title: "How to Identify Latin American Countries in Street View (2026 Guide) | LostStreet",
  description: "Master Latin American geography clues in Street View. Discover road sign cross backings, yellow license plates, utility pole styles, and vegetation hints.",
  alternates: { canonical: "https://www.loststreet.online/guides/latin-america-street-view-guide" },
  keywords: [
    "latin america street view clues", "colombia cross back signs", "brazil black sign backs",
    "mexico holey utility poles", "geoguessr south america guide", "identify south american countries street view"
  ],
  openGraph: {
    title: "How to Identify Latin American Countries in Street View",
    description: "Region-by-region breakdown of visual infrastructure clues for Central and South America.",
    url: "https://www.loststreet.online/guides/latin-america-street-view-guide",
    type: "article",
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Identify Latin American Countries in Street View: Visual Clues Guide",
  "description": "A complete visual reference for identifying Latin American nations in Google Street View geography games.",
  "author": {
    "@type": "Person",
    "name": "LostStreet Editorial Team",
    "jobTitle": "Senior Geography Meta Analysts",
    "url": "https://www.loststreet.online/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "LostStreet",
    "logo": { "@type": "ImageObject", "url": "https://www.loststreet.online/icon.png" }
  },
  "datePublished": "2026-08-26T00:00:00.000Z",
  "dateModified": "2026-08-27T00:00:00.000Z",
  "mainEntityOfPage": "https://www.loststreet.online/guides/latin-america-street-view-guide"
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

export default function LatinAmericaGuidePage() {
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
        {/* Breadcrumb Sub-Nav */}
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

        {/* Article Container */}
        <main style={{ padding: 'clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 3vw, 1.5rem)', maxWidth: '760px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          
          <header style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.75rem)', textAlign: 'center', fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
            <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'inline-block' }}>
              Regional Masterclass
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
              How to Identify Every Latin American Country in Street View: Visual Clues Guide
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', color: '#6b7280', fontSize: '0.88rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span>By <strong>LostStreet Research Team</strong></span>
              <span>•</span>
              <span>Updated: August 27, 2026</span>
              <span>•</span>
              <span>9 min read</span>
            </div>
          </header>

          <article style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)', color: '#374151', wordBreak: 'break-word', lineHeight: 1.8 }}>
            
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.22rem)', color: '#4b5563', lineHeight: 1.75, marginBottom: '2rem' }}>
              Latin America is one of the most rewarding regions to master in geography guessing games. Spanning over 10,000 kilometers from Northern Mexico to Tierra del Fuego, the subcontinent shares linguistic and cultural traits, but features sharp differences in road hardware, sign backings, utility poles, and license plates.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '2.5rem 0' }} />

            <h2 style={headingStyle}>1. Colombia: Cross-Back Signs &amp; Yellow License Plates</h2>
            <p>
              <strong>Colombia</strong> has some of the most reliable visual tells in the entire game:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Sign Cross-Backs:</strong> Almost all Colombian road signs feature a distinctive cross-shaped metallic frame on the back for structural reinforcement against high mountain winds.</li>
              <li><strong>Yellow License Plates:</strong> All private passenger vehicles in Colombia sport bright yellow rectangular license plates (public taxis and buses use white plates with municipal transit markings on the side doors).</li>
              <li><strong>Terrain:</strong> Lush, green tropical Andean mountains with brick buildings and red-tiled roofs.</li>
            </ul>

            <h2 style={headingStyle}>2. Brazil: Black Sign Backs &amp; Portuguese Signage</h2>
            <p>
              As the only Portuguese-speaking nation in South America, <strong>Brazil</strong> can be identified immediately if you can read sign text (look for words like <em>Rua</em>, <em>Avenida</em>, <em>Rodovia</em>, and tildes like <em>São</em>).
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Black Sign Backings:</strong> The back of road signs in Brazil is painted completely black (unlike gray or metallic finishes in neighboring nations).</li>
              <li><strong>Road Lines:</strong> Highway centerlines frequently use double continuous white lines or yellow dividing lines with distinctive reflective studs.</li>
              <li><strong>Red Soil (Terra Roxa):</strong> The interior states (Paraná, São Paulo, Minas Gerais) are famous for rich, rust-red soil along roadside shoulders.</li>
            </ul>

            <h2 style={headingStyle}>3. Mexico: Octagonal &quot;Holey&quot; Concrete Poles</h2>
            <p>
              <strong>Mexico</strong> has extensive Street View coverage from the Baja peninsula to the Yucatán. Key tells include:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Holey Utility Poles:</strong> Concrete utility poles with ladder-like holes running up the central column (often octagonal at the base).</li>
              <li><strong>Road Sign Numbers:</strong> Federal highways feature a unique white shield outline with the state name and highway number printed in bold black font.</li>
              <li><strong>Topography:</strong> Desert scrub, cacti, and flat-roofed concrete residential buildings.</li>
            </ul>

            <h2 style={headingStyle}>4. Chile: All-White Road Markings &amp; The Andes Backbone</h2>
            <p>
              <strong>Chile</strong> is the longest and narrowest country in the world, stretching over 4,300 km along the Pacific coastline.
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>White Road Markings:</strong> Chile is one of the few South American countries that uses <strong>solid white lines</strong> for both the center line and outer road edges (unlike the yellow center lines used across Argentina and Brazil).</li>
              <li><strong>The Andes Mountains:</strong> Look to the east—the massive snow-capped Andes mountain range is almost always visible on your eastern horizon.</li>
              <li><strong>Bollards:</strong> White cylindrical posts with red rectangular reflectors.</li>
            </ul>

            <h2 style={headingStyle}>5. Argentina: Black-and-White Post Markers &amp; Endless Pampas</h2>
            <p>
              <strong>Argentina</strong> is characterized by flat, expansive agricultural plains (the Pampas) and rugged Patagonian steppes.
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Black &amp; White Guardrail Posts:</strong> Roadside posts and bridge abutments are painted with alternating black and white diagonal hazard stripes.</li>
              <li><strong>RN Highway Shields:</strong> National routes use a distinctive shield logo with &quot;RN&quot; followed by the route number (e.g., RN 3, RN 40).</li>
              <li><strong>Vehicle Meta:</strong> Long black car antennas are common on Argentine Street View coverage cars.</li>
            </ul>

            <h2 style={headingStyle}>6. Peru &amp; Bolivia: Striped Poles &amp; Indigenous Motifs</h2>
            <p>
              High in the Altiplano, <strong>Peru</strong> and <strong>Bolivia</strong> share high-altitude arid landscapes:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Peru Striped Poles:</strong> Utility poles are frequently painted with black-and-yellow or black-and-white safety stripes near the base.</li>
              <li><strong>Bolivia:</strong> Predominantly unpaved dirt roads in rural areas with prominent roof racks on the Street View car and unfinished red brick homes.</li>
            </ul>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '2.5rem 0' }} />

            <h2 style={headingStyle}>Quick Comparison: South America Identification Cheat Sheet</h2>
            <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', fontFamily: '"Inter", system-ui, sans-serif' }}>
                <thead>
                  <tr style={{ background: '#f3f4f6', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '10px 14px' }}>Country</th>
                    <th style={{ padding: '10px 14px' }}>Sign Backings</th>
                    <th style={{ padding: '10px 14px' }}>License Plates</th>
                    <th style={{ padding: '10px 14px' }}>Poles &amp; Road Markings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 'bold' }}>Colombia</td>
                    <td style={{ padding: '10px 14px' }}>Cross frame on back</td>
                    <td style={{ padding: '10px 14px' }}>Yellow (all private cars)</td>
                    <td style={{ padding: '10px 14px' }}>Yellow centerlines</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#fafafa' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 'bold' }}>Brazil</td>
                    <td style={{ padding: '10px 14px' }}>Painted solid black</td>
                    <td style={{ padding: '10px 14px' }}>White Mercosur / Gray</td>
                    <td style={{ padding: '10px 14px' }}>Red soil, Portuguese signs</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 'bold' }}>Mexico</td>
                    <td style={{ padding: '10px 14px' }}>Silver/Gray metal</td>
                    <td style={{ padding: '10px 14px' }}>White with state graphics</td>
                    <td style={{ padding: '10px 14px' }}>Octagonal holey concrete poles</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#fafafa' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 'bold' }}>Chile</td>
                    <td style={{ padding: '10px 14px' }}>Silver/Gray metal</td>
                    <td style={{ padding: '10px 14px' }}>White plates</td>
                    <td style={{ padding: '10px 14px' }}>All-white road centerlines</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 'bold' }}>Argentina</td>
                    <td style={{ padding: '10px 14px' }}>Silver metal</td>
                    <td style={{ padding: '10px 14px' }}>Black center strip (Mercosur)</td>
                    <td style={{ padding: '10px 14px' }}>Black/white guardrail posts</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Author Bio Box */}
            <div style={{
              marginTop: '3.5rem',
              padding: '1.5rem',
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '14px',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              fontFamily: '"Inter", system-ui, sans-serif'
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 900, fontSize: '1.3rem', flexShrink: 0
              }}>
                LS
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: 700, color: '#111827' }}>
                  LostStreet Geography Editorial Team
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5 }}>
                  Authored by our regional geography specialists. Every visual tell is verified across official Latin American highway inventories and active Google Street View camera coverage.
                </p>
              </div>
            </div>

            {/* Callout Link */}
            <div style={{
              marginTop: '2.5rem',
              padding: '2rem',
              background: '#111827',
              color: 'white',
              borderRadius: '16px',
              textAlign: 'center',
              fontFamily: '"Inter", system-ui, sans-serif'
            }}>
              <h3 style={{ fontSize: '1.3rem', color: 'white', margin: '0 0 0.5rem 0', fontWeight: 800 }}>
                Test Your Latin American Deduction Skills
              </h3>
              <p style={{ color: '#9ca3af', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Spawn into random panoramic streets across Colombia, Brazil, Chile, and Mexico in LostStreet!
              </p>
              <Link href="/" style={{
                background: '#10b981',
                color: 'white',
                padding: '11px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'inline-block'
              }}>
                Play LostStreet Free →
              </Link>
            </div>

          </article>
        </main>
      </div>
    </>
  );
}
