import Link from 'next/link';
import { PageShell } from '@/app/components/SiteShell';

export const metadata = {
  title: "About LostStreet — Free Street View Guesser Game",
  description: "Learn about LostStreet — the premier free street view guesser game featuring 780,000+ locations, real-time 1v1 duels, and daily challenges.",
  alternates: { canonical: "https://www.loststreet.online/about" },
  keywords: [
    "loststreet", "street view guesser", "about loststreet", "free street view guesser", "street view guesser game", "lost street online",
    "geoguessr alternative free", "geography guessing game", "how to play street view guesser", "street view clues bollards license plates"
  ],
  openGraph: {
    title: "About LostStreet — Free Street View Guesser Game",
    description: "Learn about LostStreet — the premier free street view guesser game featuring 780,000+ locations, real-time 1v1 duels, and daily challenges.",
    url: "https://www.loststreet.online/about",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About LostStreet — Free Street View Guesser Game",
    description: "Learn about LostStreet — the premier free street view guesser game featuring 780,000+ locations, real-time 1v1 duels, and daily challenges.",
    images: ["/og-image.png"],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.loststreet.online' },
    { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://www.loststreet.online/about' }
  ]
};

const aboutPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About LostStreet',
  description: 'Learn about LostStreet, the free street view guesser game, mission, and educational geography platform.',
  url: 'https://www.loststreet.online/about'
};

const faqItems = [
  {
    q: "What is LostStreet?",
    a: "LostStreet is a 100% free street view guesser game and geography quiz. Players are dropped into random 360-degree Google Street View panoramas across 780,000+ locations and must pinpoint their location on an interactive world map."
  },
  {
    q: "Is LostStreet completely free to play?",
    a: "Yes, LostStreet is 100% free to play with no subscriptions, no paywalls, and no round limits. Enjoy unlimited singleplayer street view guessing, 1v1 duels, and daily challenges at zero cost."
  },
  {
    q: "Is LostStreet a free GeoGuessr alternative?",
    a: "Yes, LostStreet is recognized as the best free GeoGuessr alternative. It offers real-time multiplayer duels with ELO ratings, private 6-digit party rooms, daily streak challenges, and flag quizzes — completely free."
  },
  {
    q: "What visual clues can I use in street view guessing?",
    a: "Pro street view guessers inspect road bollard designs, utility pole structures, license plate colors (e.g. yellow in the UK/Netherlands), driving side traffic, country-specific chevrons, language scripts, and sun compass position."
  },
  {
    q: "Can I play LostStreet street view guesser on mobile?",
    a: "Yes, LostStreet is fully optimized for all modern mobile and tablet browsers. You can play directly in Safari, Chrome, or Firefox with no app download needed."
  },
  {
    q: "How does multiplayer work in LostStreet?",
    a: "LostStreet features real-time 1v1 ELO-ranked matchmaking where you duel another player on identical street views, as well as private party lobbies for up to 20 players."
  },
  {
    q: "Do I need an account to play LostStreet?",
    a: "No account is required for singleplayer map guessing. Signing in with Google unlocks your personal profile, multiplayer duels, global leaderboard ranking, and daily challenge streak tracking."
  },
];

const features = [
  { title: "780,000+ Locations", desc: "Hand-picked Street View panoramas across 195+ countries and territories." },
  { title: "1v1 Ranked Duels", desc: "Real-time ELO-ranked competitive multiplayer against players worldwide." },
  { title: "Private Party Rooms", desc: "Create 6-digit lobby codes for private games with up to 20 friends." },
  { title: "Daily Challenges", desc: "One new location every day with streak tracking and leaderboard rankings." },
  { title: "Flag Guesser Quiz", desc: "Three difficulty levels — multiple choice, map pinning, and hybrid modes." },
  { title: "100% Free Forever", desc: "No subscriptions, no round limits, no credit card required. Ever." },
];

export default function AboutPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageShell breadcrumb="About Us" badgeText="100% Free Forever" badgeColor="green">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1rem, 3vw, 2rem) clamp(1.5rem, 3vw, 2.5rem)',
          maxWidth: '1100px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
          textAlign: 'center',
        }}>
          <span style={{
            display: 'inline-block',
            padding: '5px 14px',
            borderRadius: '20px',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#059669',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '1rem',
          }}>
            Free Geography Game
          </span>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            color: '#111827',
            letterSpacing: '-0.03em',
            margin: '0 0 1rem 0',
          }}>
            About LostStreet
          </h1>
          <p style={{
            color: '#4b5563',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            maxWidth: '680px',
            margin: '0 auto 2rem',
            lineHeight: 1.7,
          }}>
            LostStreet is a 100% free alternative to GeoGuessr built with Next.js. Drop into 780,000+ hand-picked Google Street View locations globally — no subscription, unlimited plays, real-time ELO multiplayer.
          </p>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #059669, #10b981)',
            color: '#ffffff',
            padding: '13px 28px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: '1rem',
            boxShadow: '0 4px 14px rgba(5,150,105,0.25)',
          }}>
            Play Now — Free
          </Link>
        </section>

        {/* ── QUICK SUMMARY CARD ────────────────────────────────────────── */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)', boxSizing: 'border-box' }}>
          <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderLeft: '4px solid #059669',
            borderRadius: '16px',
            padding: '1.5rem 2rem',
            marginBottom: '3rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.6rem', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Quick Summary</h2>
            <p style={{ margin: 0, color: '#374151', lineHeight: 1.7, fontSize: '0.98rem' }}>
              <strong>LostStreet</strong> is a 100% free alternative to GeoGuessr built with Next.js.
              It features over <strong>780,000 hand-picked Google Street View locations</strong> globally.
              Unlike other platforms, it requires <strong>no subscription</strong> and offers unlimited daily plays,
              real-time ELO-based multiplayer duels, and private party modes for up to 20 players.
            </p>
          </div>

          {/* ── FEATURE GRID ────────────────────────────────────────────── */}
          <div style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#111827', textAlign: 'center', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
              Everything Included — Always Free
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}>
              {features.map((f, i) => (
                <div key={i} style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem' }}>{f.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── FAQ ─────────────────────────────────────────────────────── */}
          <div style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#111827', textAlign: 'center', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '880px', margin: '0 auto' }}>
              {faqItems.map((item, i) => (
                <div key={i} style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '14px',
                  padding: '1.25rem 1.5rem',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', margin: '0 0 0.5rem' }}>{item.q}</h3>
                  <p style={{ fontSize: '0.92rem', color: '#374151', lineHeight: 1.7, margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ─────────────────────────────────────────────────────── */}
          <div style={{
            textAlign: 'center',
            paddingBottom: '4rem',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <Link href="/" style={{
              background: 'linear-gradient(135deg, #059669, #10b981)',
              color: '#ffffff',
              padding: '12px 28px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: '0.95rem',
              boxShadow: '0 4px 14px rgba(5,150,105,0.25)',
            }}>
              Play Now — Free
            </Link>
            <Link href="/guides" style={{
              background: '#ffffff',
              border: '1px solid #d1d5db',
              color: '#374151',
              padding: '12px 28px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
            }}>
              View Guides
            </Link>
            <Link href="/contact" style={{
              background: '#ffffff',
              border: '1px solid #d1d5db',
              color: '#374151',
              padding: '12px 28px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
            }}>
              Contact Us
            </Link>
          </div>
        </div>
      </PageShell>
    </>
  );
}
