import Link from 'next/link';

export const metadata = {
  title: 'Flag Guesser — Free World Flag Quiz Game | LostStreet',
  description: "Test your knowledge of world flags in LostStreet's free flag quiz. Identify 196 national flags across multiple choice and world map modes with zero sign-up.",
  alternates: { canonical: 'https://www.loststreet.online/flag-guesser' },
  keywords: [
    'flag identifier', 'country flag identifier', 'identify flag', 'flag guesser',
    'flag quiz game', 'world flags quiz', 'country flag quiz', 'identify country flag',
    'flags of the world identifier', 'flag searcher', 'find flag', 'find flags',
    'flag identification', 'flag guessing game free', 'geography quiz online'
  ],
  openGraph: {
    title: 'Flag Guesser — Free World Flag Quiz Game | LostStreet',
    description: "Test your knowledge of world flags in LostStreet's free flag quiz. Identify 196 national flags across multiple choice and world map modes with zero sign-up.",
    url: 'https://www.loststreet.online/flag-guesser',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flag Guesser — Free World Flag Quiz Game | LostStreet',
    description: "Test your knowledge of world flags in LostStreet's free flag quiz. Identify 196 national flags across multiple choice and world map modes with zero sign-up.",
    images: ['/og-image.png'],
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the LostStreet Flag Guesser?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The LostStreet Flag Guesser is a free online quiz game where players identify country flags from around the globe. Covering all 196 recognized sovereign nations, the game features multiple difficulty settings ranging from 4-option multiple choice to pinpointing countries directly on an interactive world map.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is the flag identifier quiz completely free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! LostStreet Flag Guesser is 100% free with no subscription, no credit card, and no registration required. You can play unlimited singleplayer rounds, build streak rewards, and hone your global flag recognition skills directly in your web browser.'
      }
    },
    {
      '@type': 'Question',
      name: 'What are the 3 difficulty modes in Flag Guesser?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LostStreet offers three progressive modes: Easy Mode (straightforward 4 multiple-choice options), Medium Mode (hybrid gameplay alternating between multiple-choice questions and interactive Leaflet map pin drops), and Hard Mode (pure world map pinning where you only see the flag and must click the exact country location).'
      }
    },
    {
      '@type': 'Question',
      name: 'How does the scoring formula work in Map Pinning mode?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Hard mode and Medium map-pin rounds, scoring is calculated using the Haversine distance formula between your pin and the target country\'s geographic coordinates. A pin within 25 km yields the maximum 5,000 points, followed by exponential decay with distance.'
      }
    },
    {
      '@type': 'Question',
      name: 'How can I tell lookalike flags apart (e.g. Chad vs Romania, Indonesia vs Monaco)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chad and Romania have identical blue-yellow-red stripes, but Chad uses a slightly deeper indigo blue. Indonesia and Monaco share red-and-white horizontal stripes, but Monaco uses a wider 4:5 ratio while Indonesia uses 2:3. Poland flips this combination with white on top and red on the bottom.'
      }
    }
  ]
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.loststreet.online' },
    { '@type': 'ListItem', position: 2, name: 'Flag Guesser', item: 'https://www.loststreet.online/flag-guesser' }
  ]
};

export default function FlagGuesserPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div style={{
        minHeight: '100vh',
        width: '100%',
        background: '#fafafa',
        color: '#111827',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
        overflowX: 'hidden'
      }}>

        {/* ── BREADCRUMB / EDITORIAL SUB-NAV ──────────────────────────────── */}
        <div style={{
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '0.85rem clamp(1rem, 3vw, 2.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link href="/" style={{
              background: '#f3f4f6',
              border: '1px solid #e5e7eb',
              color: '#1f2937',
              padding: '7px 14px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              transition: 'all 0.2s ease',
              touchAction: 'manipulation'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to Game</span>
            </Link>

            <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: '#6b7280' }}>
              <Link href="/" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
              <span>/</span>
              <span style={{ color: '#d97706', fontWeight: 700 }}>Flag Guesser</span>
            </nav>
          </div>

          <div style={{
            background: '#fef3c7',
            border: '1px solid #fde68a',
            color: '#b45309',
            padding: '5px 14px',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            <span>196 World Flags • 3 Difficulty Modes</span>
          </div>
        </div>

        {/* ── EDITORIAL HERO SECTION ───────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(1rem, 3vw, 2.5rem) clamp(2rem, 4vw, 3rem)',
          maxWidth: '1080px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            
            {/* Eyebrow Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '30px',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#059669',
              fontSize: '0.84rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
              <span>Official LostStreet Vexillology Quiz</span>
            </div>

            {/* Main Heading */}
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.18,
              color: '#111827',
              letterSpacing: '-0.03em',
              margin: '0 0 1.25rem 0'
            }}>
              Free Country Flag Identifier &amp; World Geography Quiz
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.22rem)',
              lineHeight: 1.7,
              color: '#4b5563',
              maxWidth: '720px',
              margin: '0 auto 2.25rem',
              fontWeight: 400
            }}>
              How many of the world&apos;s 196 national flags can you recognize? Test your knowledge in fast-paced multiple choice, master lookalike color patterns, or drop your pin directly on the world map in pro mode.
            </p>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2.5rem'
            }}>
              <Link href="/?play=flag#FLAG_GAME" style={{
                textDecoration: 'none',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                padding: '16px 36px',
                borderRadius: '50px',
                fontWeight: 800,
                fontSize: '1.1rem',
                minHeight: '52px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                touchAction: 'manipulation'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                <span>Start Flag Quiz — Play Free</span>
              </Link>

              <Link href="/guides/flag-identification-guide" style={{
                textDecoration: 'none',
                color: '#374151',
                background: '#ffffff',
                border: '1px solid #d1d5db',
                padding: '16px 28px',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '1rem',
                minHeight: '52px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                transition: 'all 0.2s',
                touchAction: 'manipulation'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                <span>Flag Identification Guide</span>
              </Link>
            </div>

            {/* Stat Pill Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              padding: '1.25rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#111827' }}>196</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Sovereign Flags</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#059669' }}>3 Tiers</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Choice &amp; Map Modes</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#2563eb' }}>0ms</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Zero Sign-Up Gate</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#d97706' }}>5,000 pts</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Max Distance Score</div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 3 GAMEPLAY DIFFICULTY MODES ──────────────────────────────────── */}
        <section style={{
          padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1rem, 3vw, 2.5rem)',
          maxWidth: '1120px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#d97706'
            }}>
              Choose Your Challenge Level
            </span>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)',
              fontWeight: 900,
              color: '#111827',
              marginTop: '0.5rem',
              letterSpacing: '-0.02em'
            }}>
              Three Ways to Play &amp; Master Flags
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: '640px', margin: '0.5rem auto 0' }}>
              Whether you are just learning your first European tricolours or training to be a global vexillology champion, LostStreet has a game mode built for you.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Mode 1: Easy */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '20px',
              padding: '1.75rem',
              boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: '#ecfdf5',
                    color: '#059669',
                    border: '1px solid #a7f3d0'
                  }}>
                    Easy Mode
                  </span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', marginBottom: '0.6rem' }}>
                  4-Choice Multiple Choice
                </h3>
                <p style={{ fontSize: '0.94rem', color: '#4b5563', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                  A full-screen national flag is shown with 4 country name choices. Fast-paced, intuitive, and perfect for beginners to memorize shapes and regional color palettes.
                </p>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.88rem', color: '#6b7280', lineHeight: 1.8 }}>
                  <li>Instant correct/incorrect feedback chimes</li>
                  <li>Flag deduplication across all 5 rounds</li>
                  <li>Great for casual school &amp; family trivia</li>
                </ul>
              </div>
              <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid #f3f4f6' }}>
                <Link href="/?play=flag#FLAG_GAME" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  color: '#111827',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  textDecoration: 'none'
                }}>
                  Play Easy Mode →
                </Link>
              </div>
            </div>

            {/* Mode 2: Medium */}
            <div style={{
              background: '#ffffff',
              border: '2px solid #fde68a',
              borderRadius: '20px',
              padding: '1.75rem',
              boxShadow: '0 6px 24px rgba(245, 158, 11, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#f59e0b',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 900,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '3px 12px',
                borderRadius: '12px'
              }}>
                Most Popular
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '0.25rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: '#fef3c7',
                    color: '#b45309',
                    border: '1px solid #fde68a'
                  }}>
                    Medium Mode
                  </span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', marginBottom: '0.6rem' }}>
                  Hybrid Gauntlet (Choice + Pin)
                </h3>
                <p style={{ fontSize: '0.94rem', color: '#4b5563', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                  The ultimate geography workout. Odd rounds feature 4 multiple-choice options; even rounds eliminate all options and require you to drop your pin on the world map!
                </p>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.88rem', color: '#6b7280', lineHeight: 1.8 }}>
                  <li>Tests flag recognition AND map location</li>
                  <li>Leaflet interactive world map pinning</li>
                  <li>Distance scored with Haversine formula</li>
                </ul>
              </div>
              <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid #fef3c7' }}>
                <Link href="/?play=flag#FLAG_GAME" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  background: '#f59e0b',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  textDecoration: 'none'
                }}>
                  Play Medium Mode →
                </Link>
              </div>
            </div>

            {/* Mode 3: Hard */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '20px',
              padding: '1.75rem',
              boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: '#fef2f2',
                    color: '#dc2626',
                    border: '1px solid #fecaca'
                  }}>
                    Hard Mode
                  </span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', marginBottom: '0.6rem' }}>
                  100% World Map Pinning
                </h3>
                <p style={{ fontSize: '0.94rem', color: '#4b5563', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                  Zero text clues. Zero multiple-choice buttons. You are shown only the flag — pinpoint where that nation sits on planet Earth directly on the interactive map.
                </p>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.88rem', color: '#6b7280', lineHeight: 1.8 }}>
                  <li>For geography purists &amp; GeoGuessr pros</li>
                  <li>Pin within 25 km for a perfect 5,000 pts</li>
                  <li>Real geographic coordinate verification</li>
                </ul>
              </div>
              <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid #f3f4f6' }}>
                <Link href="/?play=flag#FLAG_GAME" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  color: '#111827',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  textDecoration: 'none'
                }}>
                  Play Hard Mode →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS: 3-STEP FLOW ───────────────────────────────────── */}
        <section style={{
          padding: 'clamp(2.5rem, 4vw, 4rem) clamp(1rem, 3vw, 2.5rem)',
          maxWidth: '1080px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#059669' }}>
              Simple Rules • Instant Gameplay
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 900, color: '#111827', margin: '0.4rem 0 0' }}>
              How the Flag Guesser Works
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '18px',
              padding: '1.75rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                width: '46px', height: '46px', borderRadius: '12px',
                background: '#ecfdf5', color: '#059669',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem', fontWeight: 900, marginBottom: '1rem'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>
                Inspect the Flag
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.65, margin: 0 }}>
                A random sovereign nation flag is rendered in crisp vector SVG. Observe stripe orientations, coat of arms, cantons, and regional color signatures.
              </p>
            </div>

            <div style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '18px',
              padding: '1.75rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                width: '46px', height: '46px', borderRadius: '12px',
                background: '#fef3c7', color: '#b45309',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem', fontWeight: 900, marginBottom: '1rem'
              }}>
                2
              </div>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>
                Make Your Deduction
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.65, margin: 0 }}>
                Select the country from 4 options in Easy mode, or click your best location guess on the full-screen interactive world map in Medium and Hard modes.
              </p>
            </div>

            <div style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '18px',
              padding: '1.75rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                width: '46px', height: '46px', borderRadius: '12px',
                background: '#eff6ff', color: '#2563eb',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem', fontWeight: 900, marginBottom: '1rem'
              }}>
                3
              </div>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>
                Score, Learn &amp; Level Up
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.65, margin: 0 }}>
                Review accurate distance kilometers, see the exact capital coordinates, bank XP for your global player profile, and unlock achievements.
              </p>
            </div>
          </div>
        </section>

        {/* ── VEXILLOLOGY FIELD GUIDE / CHEAT SHEET ────────────────────────── */}
        <section style={{
          padding: 'clamp(2.5rem, 4vw, 4rem) clamp(1rem, 3vw, 2.5rem)',
          maxWidth: '1080px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '24px',
            padding: 'clamp(1.75rem, 4vw, 3rem)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb' }}>
                Identification Masterclass
              </span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 900, color: '#111827', margin: '0.4rem 0 0' }}>
                How to Tell Global Flags Apart
              </h2>
              <p style={{ color: '#6b7280', fontSize: '0.96rem', maxWidth: '620px', margin: '0.5rem auto 0' }}>
                Flags follow historical, religious, and geographic patterns. Memorize these core families to boost your quiz accuracy:
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {/* Pattern 1 */}
              <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '1.25rem', background: '#fafafa' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', background: '#e0e7ff', color: '#3730a3' }}>SCANDINAVIA</span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>The Nordic Cross</h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  <strong>Denmark, Sweden, Norway, Finland, Iceland</strong>: All use an off-center vertical cross shifted toward the hoist. Denmark is red/white, Sweden is blue/yellow, and Finland is blue on white.
                </p>
              </div>

              {/* Pattern 2 */}
              <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '1.25rem', background: '#fafafa' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', background: '#fef3c7', color: '#92400e' }}>ISLAMIC WORLD</span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>Crescent &amp; Star</h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  <strong>Turkey, Pakistan, Tunisia, Algeria, Azerbaijan, Malaysia</strong>: The crescent moon and star represents historic heraldry. Notice the white-on-green of Pakistan vs red-and-white of Turkey.
                </p>
              </div>

              {/* Pattern 3 */}
              <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '1.25rem', background: '#fafafa' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#065f46' }}>WESTERN EUROPE</span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>Vertical Tricolours</h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  <strong>France, Italy, Ireland, Belgium, Romania</strong>: France is Blue-White-Red; Italy is Green-White-Red; Ireland is Green-White-Orange (not red); Belgium is Black-Yellow-Red.
                </p>
              </div>

              {/* Pattern 4 */}
              <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '1.25rem', background: '#fafafa' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', background: '#fee2e2', color: '#991b1b' }}>PAN-AFRICAN</span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>Gold, Green &amp; Red</h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  <strong>Ghana, Senegal, Mali, Cameroon, Guinea</strong>: Derived from Ethiopia&apos;s historic colors. Ghana features a central black star; Senegal has a green star; Cameroon has a gold star on red.
                </p>
              </div>

              {/* Pattern 5 */}
              <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '1.25rem', background: '#fafafa' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', background: '#f1f5f9', color: '#334155' }}>SLAVIC NATIONS</span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>Pan-Slavic Colors</h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  <strong>Russia, Serbia, Slovakia, Slovenia, Croatia, Czechia</strong>: White, blue, and red horizontal stripes. Slovakia and Slovenia add coats of arms on the hoist side to prevent confusion with Russia.
                </p>
              </div>

              {/* Pattern 6 */}
              <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '1.25rem', background: '#fafafa' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', background: '#e0f2fe', color: '#075985' }}>OCEANIA</span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>Australia vs New Zealand</h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  Both share a British Blue Ensign canton. Australia has 6 white stars (including the 7-pointed Commonwealth Star). New Zealand has 4 red stars outlined in white.
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f3f4f6' }}>
              <Link href="/guides/flag-identification-guide" style={{
                color: '#2563eb',
                fontWeight: 800,
                fontSize: '0.96rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span>Read the Complete 196-Country Flag Masterclass</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FREQUENTLY ASKED QUESTIONS ───────────────────────────────────── */}
        <section style={{
          padding: 'clamp(2.5rem, 4vw, 4rem) clamp(1rem, 3vw, 2.5rem)',
          maxWidth: '860px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#059669' }}>
              Common Inquiries
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 900, color: '#111827', margin: '0.4rem 0 0' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqJsonLd.mainEntity.map((faq, index) => (
              <details key={index} style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}>
                <summary style={{
                  padding: '1.15rem 1.4rem',
                  minHeight: '48px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#111827',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent'
                }}>
                  <span>{faq.name}</span>
                  <span style={{
                    fontSize: '1.2rem',
                    color: '#d97706',
                    marginLeft: '1rem',
                    flexShrink: 0,
                    fontWeight: 900
                  }}>
                    +
                  </span>
                </summary>
                <div style={{
                  padding: '0 1.4rem 1.4rem',
                  color: '#4b5563',
                  lineHeight: 1.7,
                  fontSize: '0.94rem'
                }}>
                  {faq.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── EDITORIAL BOTTOM CTA BANNER ─────────────────────────────────── */}
        <section style={{
          padding: 'clamp(3rem, 5vw, 4.5rem) clamp(1rem, 3vw, 2.5rem)',
          maxWidth: '1080px',
          margin: '0 auto 2.5rem',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
            border: '1px solid #fde68a',
            borderRadius: '24px',
            padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)',
            textAlign: 'center',
            boxShadow: '0 8px 30px rgba(245, 158, 11, 0.1)'
          }}>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#b45309'
            }}>
              Ready for the Vexillology Challenge?
            </span>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 900,
              color: '#92400e',
              margin: '0.6rem 0 1rem',
              lineHeight: 1.2
            }}>
              Start Your Free Flag Guessing Quiz Now
            </h2>
            <p style={{
              color: '#78350f',
              fontSize: '1.05rem',
              maxWidth: '600px',
              margin: '0 auto 2rem',
              lineHeight: 1.6
            }}>
              No paywalls. No download. Jump straight into round 1 and see how many countries you can name before making a mistake.
            </p>
            <Link href="/?play=flag#FLAG_GAME" style={{
              textDecoration: 'none',
              color: '#ffffff',
              background: '#b45309',
              padding: '16px 36px',
              borderRadius: '50px',
              fontWeight: 800,
              fontSize: '1.1rem',
              minHeight: '52px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 16px rgba(180, 83, 9, 0.35)',
              transition: 'all 0.2s',
              touchAction: 'manipulation'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <span>Launch Flag Guesser Free</span>
            </Link>
          </div>
        </section>

        {/* ── RELATED GUIDES & STRATEGY ───────────────────────────────────── */}
        <section style={{
          padding: '2.5rem clamp(1rem, 3vw, 2.5rem) 4rem',
          maxWidth: '1080px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
          borderTop: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              More Masterclasses &amp; Games
            </h3>
            <Link href="/guides" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700 }}>
              Explore All 13 Guides →
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem'
          }}>
            <Link href="/guides/flag-identification-guide" style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '14px',
              padding: '1.25rem',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <div>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', margin: '0 0 0.4rem 0' }}>
                  World Flag Identification Guide
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
                  Master tricolours, crests, and lookalikes across all continents.
                </p>
              </div>
              <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: 700, marginTop: '1rem' }}>Read Guide →</span>
            </Link>

            <Link href="/guides/hardest-countries-to-guess" style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '14px',
              padding: '1.25rem',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <div>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"></path></svg>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', margin: '0 0 0.4rem 0' }}>
                  The 10 Hardest Countries to Guess
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
                  Crack Russia, Lesotho, Kyrgyzstan, and Argentina in Street View.
                </p>
              </div>
              <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: 700, marginTop: '1rem' }}>Read Guide →</span>
            </Link>

            <Link href="/guides/geography-clues-guide" style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '14px',
              padding: '1.25rem',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <div>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', margin: '0 0 0.4rem 0' }}>
                  Ultimate Street View Clues Sheet
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
                  Decode roadside bollards, utility pole styles, and car meta.
                </p>
              </div>
              <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: 700, marginTop: '1rem' }}>Read Guide →</span>
            </Link>

            <Link href="/" style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '14px',
              padding: '1.25rem',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <div>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', margin: '0 0 0.4rem 0' }}>
                  Play 360° Street View Guesser
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
                  Drop onto random streets across 780k+ locations around Earth.
                </p>
              </div>
              <span style={{ color: '#d97706', fontSize: '0.85rem', fontWeight: 700, marginTop: '1rem' }}>Play Free →</span>
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
