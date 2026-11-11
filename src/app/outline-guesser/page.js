import Link from 'next/link';
import { PageShell } from '@/app/components/SiteShell';
import OutlineHeroVisual from '@/app/components/OutlineHeroVisual';

export const metadata = {
  title: 'Country Outline Quiz — Guess Country by Map Shape (Free) | LostStreet',
  description:
    "Can you identify world countries by their outline shape alone? Play LostStreet's free Country Outline Quiz. 166 vector silhouettes, 4-choice speedruns, 3 clue lifelines & zero sign-up.",
  alternates: { canonical: 'https://www.loststreet.online/outline-guesser' },
  keywords: [
    'country outline quiz',
    'guess country by shape',
    'guess the country outline',
    'country shape quiz',
    'country silhouette game',
    'world map outline quiz',
    'worldle alternative',
    'geography silhouette game',
    'identify country by border',
    'free geography quiz game',
    'loststreet outline guesser',
    'map silhouette quiz',
  ],
  openGraph: {
    title: 'Country Outline Quiz — Guess Country by Map Shape | LostStreet',
    description:
      "Test your geography knowledge! Identify world countries by their border silhouettes in this fast-paced 4-choice quiz game. 100% free with zero paywalls.",
    url: 'https://www.loststreet.online/outline-guesser',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Country Outline Quiz — Guess Country by Map Shape (2026)',
    description:
      "Can you identify nations by border outlines alone? Play the free Country Outline Quiz on LostStreet.",
    images: ['/og-image.png'],
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the LostStreet Country Outline Quiz?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The LostStreet Country Outline Quiz is a free online geography guessing game where players are shown the glowing vector border silhouette of a country and must pick the correct nation from 4 multiple-choice options within a 15-second timer. It tests spatial awareness, coastline recognition, and global border knowledge.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the outline guesser game completely free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! LostStreet Country Outline Quiz is 100% free with no subscription, no credit card, and no registration required. You can play unlimited singleplayer rounds, build streak rewards, and test yourself on 166 sovereign country shapes directly in your browser.',
      },
    },
    {
      '@type': 'Question',
      name: 'What clues or lifelines can I use if I am stuck on a country shape?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Players can spend in-game virtual coins on three helpful lifelines: Continent Hint (costs 10 coins, reveals the target continent), Flag Clue (costs 15 coins, shows the national flag), or 50/50 Eliminator (costs 20 coins, removes two wrong answers).',
      },
    },
    {
      '@type': 'Question',
      name: 'How does scoring work in the Country Outline Quiz?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each correct answer awards 1,000 base points. You also earn a time bonus of 20 points per second remaining on the 15-second clock, plus a streak bonus of 50 points multiplied by your consecutive streak count. Correct guesses also award 5 virtual coins.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the easiest and hardest country outlines to identify?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Iconic outlines like Italy (boot shape), Chile (4,300 km narrow coastal ribbon), Japan (curved island arc), and South Africa (donut hole encircling Lesotho) are the easiest. Small landlocked interior nations like Burkina Faso, Paraguay, or Central African Republic are often the most challenging.',
      },
    },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.loststreet.online' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Outline Guesser',
      item: 'https://www.loststreet.online/outline-guesser',
    },
  ],
};

export default function OutlineGuesserPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageShell
        breadcrumb="Outline Guesser"
        badgeText="166 World Country Shapes · Speedrun Quiz"
        badgeColor="amber"
        variant="vintage"
      >
        <noscript>
          <section style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Country Outline Quiz Game — Test Your World Geography Skills</h1>
            <p>
              Can you identify 166 world countries by their border silhouettes alone? Challenge yourself
              with fast 4-option multiple choice speedruns, unlock strategic lifelines, and learn global cartography.
            </p>
            <p>Please enable JavaScript to play the Country Outline Quiz.</p>
          </section>
        </noscript>

        {/* ── EDITORIAL HERO SECTION ───────────────────────────────────────── */}
        <section
          style={{
            padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(1rem, 3vw, 2.5rem) clamp(2rem, 4vw, 3rem)',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Flex Container for Text (Left) and Interactive Visual (Right) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '3rem',
              flexWrap: 'wrap',
              marginBottom: '3rem',
            }}
          >
            {/* Left Column (Text) */}
            <div style={{ flex: '1 1 500px', maxWidth: '650px', textAlign: 'left' }}>
              {/* Eyebrow Badge */}
              <div
                style={{
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
                  marginBottom: '1.25rem',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>Official LostStreet Cartography Quiz</span>
              </div>

              {/* Main Heading */}
              <h1
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.4rem)',
                  fontWeight: 900,
                  lineHeight: 1.18,
                  color: '#111827',
                  letterSpacing: '-0.03em',
                  margin: '0 0 1.25rem 0',
                }}
              >
                Free Country Outline Quiz &amp; World Map Silhouette Game
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 2vw, 1.22rem)',
                  lineHeight: 1.7,
                  color: '#4b5563',
                  maxWidth: '720px',
                  margin: '0 0 2.25rem 0',
                  fontWeight: 400,
                }}
              >
                Can you recognize world nations by their border shapes alone? Test your spatial awareness
                in fast-paced 4-choice speedruns, decode iconic boots and island chains, and climb the leaderboard with zero sign-up.
              </p>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '2.5rem',
                }}
              >
                <Link
                  href="/?play=outline#OUTLINE_GAME"
                  style={{
                    textDecoration: 'none',
                    color: '#ffffff',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    padding: '16px 36px',
                    borderRadius: '50px',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    minHeight: '52px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.35)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    touchAction: 'manipulation',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Start Outline Quiz — Play Free</span>
                </Link>

                <Link
                  href="/guides/hardest-countries-to-guess"
                  style={{
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
                    touchAction: 'manipulation',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  <span>Hardest Countries Guide</span>
                </Link>
              </div>
            </div>

            {/* Right Column (Interactive Visual Showcase) */}
            <div
              style={{
                flex: '1 1 350px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <OutlineHeroVisual />
            </div>
          </div>

          {/* Stat Pill Grid (Matches Flag Guesser design) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              padding: '1.25rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}
          >
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#111827' }}>166</div>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Sovereign Outlines
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#059669' }}>15s</div>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Speedrun Clock
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#2563eb' }}>0ms</div>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Zero Sign-Up Gate
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#d97706' }}>3 Clues</div>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Lifeline Hints
              </div>
            </div>
          </div>
        </section>

        {/* ── 3 GAMEPLAY FEATURES / MODES ──────────────────────────────────── */}
        <section
          style={{
            padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1rem, 3vw, 2.5rem)',
            maxWidth: '1120px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#d97706',
              }}
            >
              Master Global Cartography
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)',
                fontWeight: 900,
                color: '#111827',
                marginTop: '0.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              How to Play &amp; Boost Your Geography IQ
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: '640px', margin: '0.5rem auto 0' }}>
              Whether you are just recognizing your first boot-shaped peninsula or training for competitive
              geoguessing, LostStreet provides the tools to master national silhouettes.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Feature 1 */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '20px',
                padding: '1.75rem',
                boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      background: '#ecfdf5',
                      color: '#059669',
                      border: '1px solid #a7f3d0',
                    }}
                  >
                    Speedrun Mode
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: '#ecfdf5',
                      color: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', marginBottom: '0.6rem' }}>
                  4-Choice Speedrun Quiz
                </h3>
                <p style={{ fontSize: '0.94rem', color: '#4b5563', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                  A glowing vector silhouette is centered with 4 country name choices. Fast-paced, intuitive,
                  and perfect for training your brain on coastal peninsulas and territorial borders.
                </p>
                <ul
                  style={{
                    paddingLeft: '1.25rem',
                    margin: 0,
                    fontSize: '0.88rem',
                    color: '#6b7280',
                    lineHeight: 1.8,
                  }}
                >
                  <li>15-second dynamic countdown clock</li>
                  <li>Deduplicated countries across 5-round sets</li>
                  <li>Keyboard shortcuts: 1-4 or A-D for speedrun plays</li>
                </ul>
              </div>
              <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid #f3f4f6' }}>
                <Link
                  href="/?play=outline#OUTLINE_GAME"
                  style={{
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
                    textDecoration: 'none',
                  }}
                >
                  Play Speedrun Mode →
                </Link>
              </div>
            </div>

            {/* Feature 2: Lifelines */}
            <div
              style={{
                background: '#ffffff',
                border: '2px solid #fde68a',
                borderRadius: '20px',
                padding: '1.75rem',
                boxShadow: '0 6px 24px rgba(245, 158, 11, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div
                style={{
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
                  borderRadius: '12px',
                }}
              >
                Most Popular
              </div>
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    marginTop: '0.25rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      background: '#fef3c7',
                      color: '#b45309',
                      border: '1px solid #fde68a',
                    }}
                  >
                    Strategic Clues
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: '#fef3c7',
                      color: '#b45309',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="22" y1="12" x2="18" y2="12" />
                      <line x1="6" y1="12" x2="2" y2="12" />
                      <line x1="12" y1="6" x2="12" y2="2" />
                      <line x1="12" y1="22" x2="12" y2="18" />
                    </svg>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', marginBottom: '0.6rem' }}>
                  Continent, Flag &amp; 50/50 Clues
                </h3>
                <p style={{ fontSize: '0.94rem', color: '#4b5563', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                  Stumped by a landlocked African shape or Polynesian archipelago? Spend your in-game virtual
                  coins to unlock tactical lifelines and preserve your streak.
                </p>
                <ul
                  style={{
                    paddingLeft: '1.25rem',
                    margin: 0,
                    fontSize: '0.88rem',
                    color: '#6b7280',
                    lineHeight: 1.8,
                  }}
                >
                  <li>Continent Hint reveals global region (-10 coins)</li>
                  <li>National Flag Clue reveals the flag (-15 coins)</li>
                  <li>50/50 Eliminator cuts 2 wrong options (-20 coins)</li>
                </ul>
              </div>
              <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid #fef3c7' }}>
                <Link
                  href="/?play=outline#OUTLINE_GAME"
                  style={{
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
                    textDecoration: 'none',
                  }}
                >
                  Play with Lifelines →
                </Link>
              </div>
            </div>

            {/* Feature 3: Streak Bonuses */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '20px',
                padding: '1.75rem',
                boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      background: '#fef2f2',
                      color: '#dc2626',
                      border: '1px solid #fecaca',
                    }}
                  >
                    Competitive Scoring
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: '#fef2f2',
                      color: '#dc2626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', marginBottom: '0.6rem' }}>
                  Streak Multipliers &amp; Speed
                </h3>
                <p style={{ fontSize: '0.94rem', color: '#4b5563', lineHeight: 1.65, margin: '0 0 1.25rem 0' }}>
                  Earn up to 1,300+ points per round! Score is calculated from a 1,000 pt base + 20 pts per
                  second remaining on the clock + 50 pts per consecutive streak combo.
                </p>
                <ul
                  style={{
                    paddingLeft: '1.25rem',
                    margin: 0,
                    fontSize: '0.88rem',
                    color: '#6b7280',
                    lineHeight: 1.8,
                  }}
                >
                  <li>Sub-3-second speed bonuses for quick eyes</li>
                  <li>Win +5 virtual coins for each correct nation</li>
                  <li>Full 5/5 perfection trophies &amp; victory sound effects</li>
                </ul>
              </div>
              <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid #f3f4f6' }}>
                <Link
                  href="/?play=outline#OUTLINE_GAME"
                  style={{
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
                    textDecoration: 'none',
                  }}
                >
                  Play for High Score →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS: 3-STEP FLOW ───────────────────────────────────── */}
        <section
          style={{
            padding: 'clamp(2.5rem, 4vw, 4rem) clamp(1rem, 3vw, 2.5rem)',
            maxWidth: '1080px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#059669',
              }}
            >
              Simple Rules • Instant Gameplay
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                fontWeight: 900,
                color: '#111827',
                margin: '0.4rem 0 0',
              }}
            >
              How the Outline Quiz Works
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '18px',
                padding: '1.75rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#ecfdf5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  marginBottom: '1rem',
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>
                Inspect the Silhouette
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.65, margin: 0 }}>
                A random sovereign nation is drawn in glowing vector SVG with luminous emerald-to-azure gradients.
                Inspect coastlines, tectonic borders, and unique territorial appendages.
              </p>
            </div>

            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '18px',
                padding: '1.75rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#fef3c7',
                  color: '#b45309',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  marginBottom: '1rem',
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>
                Deploy Strategic Lifelines
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.65, margin: 0 }}>
                Unsure if you are looking at Mali or Niger? Spend your coins on the Continent hint, reveal the
                national flag, or activate the 50/50 eliminator to boost your odds.
              </p>
            </div>

            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '18px',
                padding: '1.75rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  marginBottom: '1rem',
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>
                Score, Learn &amp; Streak
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.65, margin: 0 }}>
                Instant visual and audio confirmation: green contour glow for correct answers, red with answer reveal
                for mistakes. Rack up streaks, earn coins, and advance your geography skills.
              </p>
            </div>
          </div>
        </section>

        {/* ── CARTOGRAPHY FIELD GUIDE / CHEAT SHEET ────────────────────────── */}
        <section
          style={{
            padding: 'clamp(2.5rem, 4vw, 4rem) clamp(1rem, 3vw, 2.5rem)',
            maxWidth: '1080px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '24px',
              padding: 'clamp(1.75rem, 4vw, 3rem)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#2563eb',
                }}
              >
                Recognition Masterclass
              </span>
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                  fontWeight: 900,
                  color: '#111827',
                  margin: '0.4rem 0 0',
                }}
              >
                How to Recognize Countries by Map Outline
              </h2>
              <p style={{ color: '#6b7280', fontSize: '0.96rem', maxWidth: '620px', margin: '0.5rem auto 0' }}>
                Country shapes tell geological and geopolitical stories. Memorize these core silhouette families to
                dominate the speedrun quiz:
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {/* Pattern 1 */}
              <div
                style={{
                  border: '1px solid #f3f4f6',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  background: '#fafafa',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: '#e0e7ff',
                      color: '#3730a3',
                    }}
                  >
                    ICONIC SHAPES
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                    The Boot &amp; The Ribbon
                  </h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  <strong>Italy</strong> looks like a high-heeled boot kicking Sicily; <strong>Chile</strong> is a
                  4,300 km ribbon hugging the Andes; and <strong>Vietnam</strong> forms an elegant coastal &ldquo;S&rdquo; curve.
                </p>
              </div>

              {/* Pattern 2 */}
              <div
                style={{
                  border: '1px solid #f3f4f6',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  background: '#fafafa',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: '#fef3c7',
                      color: '#92400e',
                    }}
                  >
                    HOLES &amp; ENCLAVES
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                    The Donut Outlines
                  </h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  Notice a hole cut cleanly out of the center? That is <strong>South Africa</strong> encircling the kingdom
                  of Lesotho. If you see tiny islands inside Italy, you are spotting San Marino or Vatican City.
                </p>
              </div>

              {/* Pattern 3 */}
              <div
                style={{
                  border: '1px solid #f3f4f6',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  background: '#fafafa',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: '#ecfdf5',
                      color: '#065f46',
                    }}
                  >
                    STRAIGHT BORDERS
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                    Desert Coordinate Rulers
                  </h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  <strong>Egypt, Algeria, Libya, Mali</strong>: Sahara treaty lines created perfectly straight, 90-degree
                  geometric corners. Egypt is almost a giant square with the Sinai peninsula at the top-right.
                </p>
              </div>

              {/* Pattern 4 */}
              <div
                style={{
                  border: '1px solid #f3f4f6',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  background: '#fafafa',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: '#fee2e2',
                      color: '#991b1b',
                    }}
                  >
                    PANHANDLES
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                    Strategic Corridors
                  </h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  <strong>Afghanistan</strong> has the Wakhan Corridor reaching east to China; <strong>Namibia</strong> features
                  the Caprivi Strip reaching the Zambezi; and <strong>Thailand</strong> drops a long southern tail into Malaysia.
                </p>
              </div>

              {/* Pattern 5 */}
              <div
                style={{
                  border: '1px solid #f3f4f6',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  background: '#fafafa',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: '#f1f5f9',
                      color: '#334155',
                    }}
                  >
                    SPLIT TERRITORIES
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                    Two Halves &amp; Crescents
                  </h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  <strong>Malaysia</strong> is divided by hundreds of kilometers of sea between Peninsular Malaya and Borneo.
                  <strong>Croatia</strong> curls like a crescent dragon around Bosnia and Herzegovina&apos;s border.
                </p>
              </div>

              {/* Pattern 6 */}
              <div
                style={{
                  border: '1px solid #f3f4f6',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  background: '#fafafa',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: '#e0f2fe',
                      color: '#075985',
                    }}
                  >
                    ARCHIPELAGOS
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                    Island Chains
                  </h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  <strong>Japan</strong> bends in a four-main-island curved arc; <strong>Indonesia</strong> spans 17,000 islands
                  stretching across 5,000 km; and <strong>New Zealand</strong> splits cleanly into North and South Islands.
                </p>
              </div>
            </div>

            <div
              style={{
                textAlign: 'center',
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid #f3f4f6',
              }}
            >
              <Link
                href="/guides/hardest-countries-to-guess"
                style={{
                  color: '#2563eb',
                  fontWeight: 800,
                  fontSize: '0.96rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Read the 10 Hardest Countries to Guess Masterclass</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FREQUENTLY ASKED QUESTIONS ───────────────────────────────────── */}
        <section
          style={{
            padding: 'clamp(2.5rem, 4vw, 4rem) clamp(1rem, 3vw, 2.5rem)',
            maxWidth: '860px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#059669',
              }}
            >
              Common Inquiries
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                fontWeight: 900,
                color: '#111827',
                margin: '0.4rem 0 0',
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqJsonLd.mainEntity.map((faq, index) => (
              <details
                key={index}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                }}
              >
                <summary
                  style={{
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
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  <span>{faq.name}</span>
                  <span
                    style={{
                      fontSize: '1.2rem',
                      color: '#d97706',
                      marginLeft: '1rem',
                      flexShrink: 0,
                      fontWeight: 900,
                    }}
                  >
                    +
                  </span>
                </summary>
                <div
                  style={{
                    padding: '0 1.4rem 1.4rem',
                    color: '#4b5563',
                    lineHeight: 1.7,
                    fontSize: '0.94rem',
                  }}
                >
                  {faq.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── EDITORIAL BOTTOM CTA BANNER ─────────────────────────────────── */}
        <section
          style={{
            padding: 'clamp(3rem, 5vw, 4.5rem) clamp(1rem, 3vw, 2.5rem)',
            maxWidth: '1080px',
            margin: '0 auto 2.5rem',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
              border: '1px solid #fde68a',
              borderRadius: '24px',
              padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)',
              textAlign: 'center',
              boxShadow: '0 8px 30px rgba(245, 158, 11, 0.1)',
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#b45309',
              }}
            >
              Ready for the Cartography Challenge?
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 900,
                color: '#92400e',
                margin: '0.6rem 0 1rem',
                lineHeight: 1.2,
              }}
            >
              Start Your Free Country Outline Quiz Now
            </h2>
            <p
              style={{
                color: '#78350f',
                fontSize: '1.05rem',
                maxWidth: '600px',
                margin: '0 auto 2rem',
                lineHeight: 1.6,
              }}
            >
              No paywalls. No download. Jump straight into round 1 and see how many country shapes you can identify in a row!
            </p>
            <Link
              href="/?play=outline#OUTLINE_GAME"
              style={{
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
                touchAction: 'manipulation',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>Launch Outline Guesser Free</span>
            </Link>
          </div>
        </section>

        {/* ── RELATED GUIDES & STRATEGY ───────────────────────────────────── */}
        <section
          style={{
            padding: '2.5rem clamp(1rem, 3vw, 2.5rem) 4rem',
            maxWidth: '1080px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
            borderTop: '1px solid #e5e7eb',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              More Masterclasses &amp; Games
            </h3>
            <Link
              href="/guides"
              style={{ color: '#2563eb', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700 }}
            >
              Explore All 13 Guides →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}
          >
            <Link
              href="/flag-guesser"
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '14px',
                padding: '1.25rem',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              <div>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: '#ecfdf5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.75rem',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <line x1="4" y1="22" x2="4" y2="15" />
                  </svg>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', margin: '0 0 0.4rem 0' }}>
                  World Flag Guesser Quiz
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
                  Test yourself across 196 national flags in multiple choice and map pinning.
                </p>
              </div>
              <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: 700, marginTop: '1rem' }}>
                Play Flag Quiz →
              </span>
            </Link>

            <Link
              href="/guides/hardest-countries-to-guess"
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '14px',
                padding: '1.25rem',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              <div>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: '#fef2f2',
                    color: '#dc2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.75rem',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  </svg>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', margin: '0 0 0.4rem 0' }}>
                  The 10 Hardest Countries to Guess
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
                  Crack tricky landlocked enclaves, Kyrgyzstan, and Argentina.
                </p>
              </div>
              <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: 700, marginTop: '1rem' }}>
                Read Guide →
              </span>
            </Link>

            <Link
              href="/guides/flag-identification-guide"
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '14px',
                padding: '1.25rem',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              <div>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: '#fef3c7',
                    color: '#b45309',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.75rem',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', margin: '0 0 0.4rem 0' }}>
                  Flag Identification Masterclass
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
                  Master tricolours, crests, and lookalikes across all continents.
                </p>
              </div>
              <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: 700, marginTop: '1rem' }}>
                Read Guide →
              </span>
            </Link>

            <Link
              href="/"
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '14px',
                padding: '1.25rem',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              <div>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.75rem',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', margin: '0 0 0.4rem 0' }}>
                  Play 360° Street View Guesser
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
                  Drop onto random streets across 780k+ locations around Earth.
                </p>
              </div>
              <span style={{ color: '#d97706', fontSize: '0.85rem', fontWeight: 700, marginTop: '1rem' }}>
                Play Free →
              </span>
            </Link>
          </div>
        </section>
      </PageShell>
    </>
  );
}
