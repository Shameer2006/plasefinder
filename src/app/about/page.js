import Link from 'next/link';
import { PageShell } from '@/app/components/SiteShell';

export const metadata = {
  title: "About LostStreet — Who We Are & Why We Built This",
  description: "LostStreet is a free street view geography game built by a passionate team in India. Launched in July 2026, it features 780,000+ real-world locations, 1v1 duels, and daily challenges — all completely free.",
  alternates: { canonical: "https://www.loststreet.online/about" },
  keywords: [
    "loststreet", "about loststreet", "who made loststreet", "loststreet team", "loststreet india",
    "free street view guesser", "geoguessr alternative free", "geography guessing game", "loststreet story"
  ],
  openGraph: {
    title: "About LostStreet — Who We Are & Why We Built This",
    description: "LostStreet is a free street view geography game built by a passionate team in India. Learn our story, our mission, and how we built a free GeoGuessr alternative for everyone.",
    url: "https://www.loststreet.online/about",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About LostStreet — Who We Are & Why We Built This",
    description: "Built in India by geography lovers. LostStreet is 100% free with 780,000+ Street View locations, 1v1 duels, and daily challenges.",
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
  description: 'LostStreet is a free street view geography game built by a passionate team in India, launched in July 2026. Features 780,000+ locations, 1v1 duels, daily challenges, and flag quizzes — all completely free.',
  url: 'https://www.loststreet.online/about',
  publisher: {
    '@type': 'Organization',
    name: 'LostStreet',
    url: 'https://www.loststreet.online',
    email: 'loststreet.contact@gmail.com',
    logo: { '@type': 'ImageObject', url: 'https://www.loststreet.online/icon.png' },
    address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    sameAs: ['https://www.instagram.com/loststreet.co']
  },
  datePublished: '2026-07-01',
};

const faqItems = [
  {
    q: "What is LostStreet?",
    a: "LostStreet is a 100% free street view geography game. You are dropped into a random 360-degree Google Street View panorama somewhere in the world and must pinpoint your exact location on an interactive world map using visual clues like road signs, bollards, license plates, and language scripts."
  },
  {
    q: "Who built LostStreet?",
    a: "LostStreet was built and is maintained by a small, passionate team based in India. We are geography enthusiasts who wanted to create a completely free, high-quality alternative to paywalled geography games. You can reach us at loststreet.contact@gmail.com."
  },
  {
    q: "When did LostStreet launch?",
    a: "LostStreet officially launched in July 2026. Since then, we have continuously added new features including real-time 1v1 ELO duels, private party rooms, a flag guesser quiz, daily streak challenges, and an in-game coin economy."
  },
  {
    q: "Is LostStreet completely free to play?",
    a: "Yes, LostStreet is 100% free with no subscriptions, no paywalls, and no round limits. Every game mode — including ranked multiplayer, party rooms, and daily challenges — is available to all players at zero cost."
  },
  {
    q: "Is LostStreet a free GeoGuessr alternative?",
    a: "Yes. LostStreet was born from a passion for geography and a desire to make world exploration accessible to everyone. It offers real-time multiplayer duels with ELO ratings, private 6-digit party rooms, daily streak challenges, and flag quizzes — all completely free."
  },
  {
    q: "What countries and locations does LostStreet include?",
    a: "LostStreet features over 780,000 hand-picked Google Street View locations spanning 195+ countries and territories. Our location database covers every inhabited continent, including often-overlooked regions in Africa, Central Asia, and the Pacific Islands."
  },
  {
    q: "What visual clues can I use to guess locations?",
    a: "Expert players look for road bollard designs, utility pole structures, license plate colors, which side of the road traffic drives on, country-specific road sign shapes, language scripts (e.g. Cyrillic vs Latin), sun compass position, and camera generation quality. Our Guides section has in-depth tutorials for each technique."
  },
  {
    q: "Can I play LostStreet on mobile?",
    a: "Yes. LostStreet is fully optimized for smartphones and tablets. You can play directly in Safari, Chrome, or Firefox with no app download required."
  },
  {
    q: "How does multiplayer work in LostStreet?",
    a: "LostStreet features real-time 1v1 ELO-ranked matchmaking, where you compete against another player on identical street views. It also supports private party lobbies with custom 6-digit room codes for up to 20 simultaneous players."
  },
  {
    q: "How can I contact the LostStreet team?",
    a: "You can reach us by email at loststreet.contact@gmail.com, or via our Contact page at loststreet.online/contact. We welcome player feedback, bug reports, and partnership inquiries."
  },
];

const features = [
  {
    icon: "📍",
    title: "780,000+ Real Locations",
    desc: "Hand-picked Google Street View panoramas across 195+ countries and territories — from Norway's fjords to Kenya's savannahs."
  },
  {
    icon: "⚔️",
    title: "1v1 Ranked Duels",
    desc: "Real-time ELO-ranked competitive multiplayer. Both players see the same street view and race to guess closest. Your ELO rises or falls based on performance."
  },
  {
    icon: "🏠",
    title: "Private Party Rooms",
    desc: "Create a private lobby with a custom 6-digit room code and invite up to 20 friends for custom games with adjustable time limits."
  },
  {
    icon: "📅",
    title: "Daily Challenges",
    desc: "One new mystery location every day. Build a consecutive streak, track your all-time accuracy, and compete on the global daily leaderboard."
  },
  {
    icon: "🏳️",
    title: "Flag Guesser Quiz",
    desc: "Test your flag knowledge across three difficulty modes — multiple choice, interactive map pinning, and a combined hybrid challenge."
  },
  {
    icon: "🎓",
    title: "Pro Strategy Guides",
    desc: "13 in-depth educational articles teaching bollard recognition, camera generations, road sign analysis, and regional geography clues."
  },
  {
    icon: "🪙",
    title: "In-Game Coin Economy",
    desc: "Earn coins by playing, claim daily login rewards, and spend them on helpful lifelines like 50/50 and AI-powered location hints."
  },
  {
    icon: "🆓",
    title: "100% Free, Always",
    desc: "No subscriptions, no round limits, no credit card. LostStreet will always be free — because geography should be accessible to everyone."
  },
];

const techStack = [
  { name: "Next.js", role: "Web Framework" },
  { name: "React 19", role: "UI Library" },
  { name: "Google Maps API", role: "Street View Engine" },
  { name: "Firebase", role: "Auth & Real-time Database" },
  { name: "Leaflet", role: "Interactive Maps" },
  { name: "Zustand", role: "Game State Management" },
  { name: "Tailwind CSS", role: "Styling" },
  { name: "Vercel", role: "Hosting & Deployment" },
];

const timeline = [
  { date: "June 2026", event: "Development begins", detail: "The first prototype of LostStreet is built — a simple location guessing loop powered by Google Street View." },
  { date: "July 2026", event: "Official launch", detail: "LostStreet goes live with classic 5-round singleplayer mode, the guessing map, and a full scoring system." },
  { date: "July 2026", event: "Multiplayer duels added", detail: "Real-time 1v1 ELO-ranked matchmaking launches using Firebase Firestore, along with private party rooms." },
  { date: "August 2026", event: "Flag Guesser & Daily Challenge", detail: "The Flag Guesser quiz mode (3 difficulty levels) and daily challenge with streak tracking launch." },
  { date: "August 2026", event: "13 Pro Strategy Guides", detail: "The Guides section launches with in-depth geography tutorials on bollards, camera generations, and regional clues." },
  { date: "September 2026", event: "Coin economy & power-ups", detail: "In-game coins, daily login rewards, 50/50 lifelines, and AI-powered location hints are released." },
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

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  };

  const sectionHeadingStyle = {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: 800,
    color: '#111827',
    textAlign: 'center',
    marginBottom: '0.6rem',
    letterSpacing: '-0.02em',
  };

  const sectionSubStyle = {
    color: '#6b7280',
    textAlign: 'center',
    fontSize: '0.98rem',
    marginBottom: '2.2rem',
    lineHeight: 1.6,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageShell breadcrumb="About Us" badgeText="Made in India 🇮🇳" badgeColor="green">

        {/* ── HERO ───────────────────────────────────────────────────── */}
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
            Built with passion in India 🇮🇳
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
            maxWidth: '700px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.8,
          }}>
            We believe the world is endlessly fascinating — and that exploring it should not cost a subscription fee.
            LostStreet is a free, open, geography guessing game that drops you onto real streets anywhere on Earth
            and challenges you to figure out where you are.
          </p>
          <p style={{
            color: '#6b7280',
            fontSize: '0.95rem',
            marginBottom: '2rem',
          }}>
            Launched July 2026 &nbsp;·&nbsp; Built in India &nbsp;·&nbsp; Contact: <a href="mailto:loststreet.contact@gmail.com" style={{ color: '#059669', textDecoration: 'underline' }}>loststreet.contact@gmail.com</a>
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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
            <a href="https://www.instagram.com/loststreet.co" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ffffff',
              border: '1px solid #d1d5db',
              color: '#374151',
              padding: '13px 28px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
            }}>
              Follow on Instagram
            </a>
          </div>
        </section>

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)', boxSizing: 'border-box' }}>

          {/* ── OUR STORY ──────────────────────────────────────────────── */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={sectionHeadingStyle}>Our Story</h2>
            <p style={sectionSubStyle}>Why we built LostStreet — and what drives us to keep improving it.</p>

            <div style={{ ...cardStyle, borderLeft: '4px solid #059669', maxWidth: '860px', margin: '0 auto' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.98rem', margin: '0 0 1rem' }}>
                LostStreet started from a simple frustration: the best geography guessing games on the internet
                were locked behind paywalls or had strict daily limits. As geography enthusiasts, we wanted
                to explore every corner of the planet — Mongolia's open steppes, Senegal's red-earth roads,
                Bolivia's colonial plazas — without watching a timer run out or hitting a subscription wall.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.98rem', margin: '0 0 1rem' }}>
                So in June 2026, we started building. What began as a personal project quickly grew into
                something we realized others would enjoy too. We launched LostStreet in <strong>July 2026</strong>,
                and the response from the geography and gaming community has inspired us to keep building.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.98rem', margin: 0 }}>
                Today, LostStreet features over <strong>780,000 hand-picked Street View locations</strong> across
                195+ countries, real-time multiplayer duels, private party rooms, daily challenges, a flag guesser
                quiz, and a growing library of pro strategy guides. And it is — and always will be — <strong>100% free</strong>.
              </p>
            </div>
          </section>

          {/* ── WHO WE ARE ─────────────────────────────────────────────── */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={sectionHeadingStyle}>Who We Are</h2>
            <p style={sectionSubStyle}>A small, independent team united by a love of geography and exploration.</p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}>
              <div style={{ ...cardStyle, textAlign: 'center' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #059669, #10b981)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', margin: '0 auto 1rem',
                }}>
                  🌍
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: '0 0 0.4rem' }}>Independent Studio</h3>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>
                  We are a small, self-funded team building LostStreet independently — no VC funding, no corporate backing.
                  Just a passion project that grew into something real.
                </p>
              </div>
              <div style={{ ...cardStyle, textAlign: 'center' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f97316, #fb923c)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', margin: '0 auto 1rem',
                }}>
                  🇮🇳
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: '0 0 0.4rem' }}>Based in India</h3>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>
                  LostStreet is built and operated from India. We work across time zones to keep the platform running
                  smoothly for players worldwide, 24 hours a day.
                </p>
              </div>
              <div style={{ ...cardStyle, textAlign: 'center' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', margin: '0 auto 1rem',
                }}>
                  ✉️
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: '0 0 0.4rem' }}>Always Reachable</h3>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>
                  We genuinely read player feedback. Email us at{' '}
                  <a href="mailto:loststreet.contact@gmail.com" style={{ color: '#059669', textDecoration: 'underline' }}>
                    loststreet.contact@gmail.com
                  </a>{' '}
                  — bug reports, feature ideas, and partnership inquiries are all welcome.
                </p>
              </div>
            </div>
          </section>

          {/* ── MISSION STATEMENT ──────────────────────────────────────── */}
          <section style={{ marginBottom: '4rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
              border: '1px solid #a7f3d0',
              borderRadius: '20px',
              padding: 'clamp(2rem, 4vw, 3rem)',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                Our Mission
              </p>
              <p style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                fontWeight: 700,
                color: '#065f46',
                lineHeight: 1.6,
                maxWidth: '750px',
                margin: '0 auto',
                fontStyle: 'italic',
              }}>
                "To make the joy of exploring the world through Google Street View completely free and accessible to everyone — forever."
              </p>
            </div>
          </section>

          {/* ── FEATURES ───────────────────────────────────────────────── */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={sectionHeadingStyle}>Everything Included — Always Free</h2>
            <p style={sectionSubStyle}>Every feature below is available at zero cost. No sign-up required for most modes.</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}>
              {features.map((f, i) => (
                <div key={i} style={cardStyle}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem' }}>{f.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── TIMELINE ───────────────────────────────────────────────── */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={sectionHeadingStyle}>LostStreet Timeline</h2>
            <p style={sectionSubStyle}>From a weekend project to a full geography platform — built in under 4 months.</p>
            <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
              {/* Vertical line */}
              <div style={{
                position: 'absolute', left: '120px', top: 0, bottom: 0,
                width: '2px', background: '#e5e7eb',
              }} />
              {timeline.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '1.5rem', marginBottom: '1.75rem', position: 'relative',
                  alignItems: 'flex-start',
                }}>
                  <div style={{
                    minWidth: '105px', textAlign: 'right',
                    fontSize: '0.82rem', fontWeight: 700, color: '#9ca3af',
                    paddingTop: '3px',
                  }}>
                    {item.date}
                  </div>
                  {/* Dot */}
                  <div style={{
                    position: 'absolute', left: '113px', top: '6px',
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: '#059669', border: '3px solid #ecfdf5',
                    zIndex: 1,
                  }} />
                  <div style={{ paddingLeft: '1.5rem', flex: 1 }}>
                    <p style={{ fontWeight: 800, color: '#111827', margin: '0 0 0.25rem', fontSize: '0.97rem' }}>{item.event}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── TECH STACK ─────────────────────────────────────────────── */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={sectionHeadingStyle}>Built With</h2>
            <p style={sectionSubStyle}>A modern, performant technology stack chosen for speed, reliability, and scale.</p>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center',
            }}>
              {techStack.map((t, i) => (
                <div key={i} style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '0.65rem 1.1rem',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  textAlign: 'center',
                }}>
                  <p style={{ fontWeight: 800, color: '#111827', margin: '0 0 2px', fontSize: '0.9rem' }}>{t.name}</p>
                  <p style={{ color: '#9ca3af', fontSize: '0.78rem', margin: 0 }}>{t.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ────────────────────────────────────────────────────── */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={sectionHeadingStyle}>Frequently Asked Questions</h2>
            <p style={sectionSubStyle}>Everything you want to know about LostStreet.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '880px', margin: '0 auto' }}>
              {faqItems.map((item, i) => (
                <div key={i} style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '14px',
                  padding: '1.25rem 1.5rem',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                }}>
                  <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#111827', margin: '0 0 0.5rem' }}>{item.q}</h3>
                  <p style={{ fontSize: '0.92rem', color: '#374151', lineHeight: 1.7, margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CONTACT CARD ───────────────────────────────────────────── */}
          <section style={{ marginBottom: '4rem' }}>
            <div style={{
              ...cardStyle,
              borderLeft: '4px solid #6366f1',
              maxWidth: '680px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', margin: 0 }}>Get in Touch</h2>
              <p style={{ color: '#6b7280', lineHeight: 1.7, fontSize: '0.94rem', margin: 0 }}>
                We love hearing from players. Whether you have found a bug, have a feature idea, or want to discuss
                a collaboration — please reach out.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                <a href="mailto:loststreet.contact@gmail.com" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  color: '#059669', fontWeight: 700, fontSize: '0.94rem', textDecoration: 'none',
                }}>
                  ✉️ loststreet.contact@gmail.com
                </a>
                <a href="https://www.instagram.com/loststreet.co" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  color: '#e1306c', fontWeight: 700, fontSize: '0.94rem', textDecoration: 'none',
                }}>
                  📸 @loststreet.co
                </a>
                <Link href="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  color: '#6366f1', fontWeight: 700, fontSize: '0.94rem', textDecoration: 'none',
                }}>
                  📬 Contact Form
                </Link>
              </div>
            </div>
          </section>

          {/* ── CTA ────────────────────────────────────────────────────── */}
          <section style={{
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
              Browse Strategy Guides
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
          </section>

        </div>
      </PageShell>
    </>
  );
}
