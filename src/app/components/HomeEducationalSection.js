import Link from 'next/link';

export default function HomeEducationalSection() {
  const guides = [
    {
      title: "The 10 Hardest Countries to Guess",
      slug: "hardest-countries-to-guess",
      desc: "Crack Russia, Lesotho, Kyrgyzstan, and Argentina with verified road lines, car meta, and terrain signatures.",
      tag: "Advanced Meta",
      color: "#ef4444"
    },
    {
      title: "25 Pro Street View Secrets",
      slug: "25-pro-street-view-geoguessr-secrets",
      desc: "Master Ghana tape, Kenya snorkel, Senegal sky rifts, and high-level 1v1 duel strategy.",
      tag: "Pro Secrets",
      color: "#f59e0b"
    },
    {
      title: "Street View Camera Generations (Gen 1-4)",
      slug: "street-view-camera-generations-guide",
      desc: "Date panoramas instantly by recognizing Gen 1 circular blur, Gen 2 halos, Gen 3 crisp HD, and Gen 4 vibrant color science.",
      tag: "Camera Tech",
      color: "#3b82f6"
    },
    {
      title: "Latin America Street View Masterclass",
      slug: "latin-america-street-view-guide",
      desc: "Differentiate Colombia, Mexico, Brazil, and Chile using cross-back signs, black sign backs, and octagonal poles.",
      tag: "Regional Guide",
      color: "#10b981"
    },
    {
      title: "Africa Street View Guide",
      slug: "africa-street-view-guide",
      desc: "Identify African coverage instantly across West, East, and Southern Africa with vehicle meta and landscape hallmarks.",
      tag: "Regional Guide",
      color: "#8b5cf6"
    },
    {
      title: "European Street View Masterclass",
      slug: "europe-street-view-guide",
      desc: "Decode road bollards, blue strip license plates, utility poles, and guardrails across 45+ European nations.",
      tag: "Regional Guide",
      color: "#06b6d4"
    }
  ];

  const faqs = [
    {
      q: "What is LostStreet?",
      a: "LostStreet is a 100% free educational world geography guessing game and web detective platform. Players are placed into random 360-degree street view panoramas across 195+ countries and must pinpoint their location on an interactive world map using environmental and cultural clues."
    },
    {
      q: "Is LostStreet completely free to play?",
      a: "Yes! LostStreet is 100% free with no paywalls, no round limits, and no subscription fees. You can play unlimited singleplayer rounds, challenge friends in 1v1 duels, play flag guessing quizzes, and explore global daily challenges."
    },
    {
      q: "How do players identify locations from street view clues?",
      a: "Expert geography detectives analyze multiple visual clues: driving side (left vs right), sun compass position (North indicates the Southern Hemisphere), road line colors (yellow vs white centerlines), utility pole designs, language scripts, and Street View camera generations."
    },
    {
      q: "Can I play LostStreet with my friends in multiplayer?",
      a: "Yes! LostStreet features real-time 1v1 ELO-ranked matchmaking as well as private party lobbies where up to 20 players can compete on identical panoramas simultaneously with instant leaderboard scoring."
    },
    {
      q: "How does LostStreet help users learn geography?",
      a: "LostStreet turns passive geography learning into an active visual deduction puzzle. By playing, students and enthusiasts memorize national flags, ISO country codes, road systems, architectural styles, and global biomes in an engaging, gamified format."
    }
  ];

  return (
    <section 
      id="educational-hub"
      aria-label="Educational Geography Hub"
      style={{
        position: 'relative',
        zIndex: 10,
        background: 'linear-gradient(180deg, #090d16 0%, #060911 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#f8fafc',
        fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem)',
        pointerEvents: 'auto'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Semantic H1 & Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: '20px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            color: '#34d399',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '1rem'
          }}>
            Educational Geography &amp; World Detective Platform
          </span>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: '0 0 1rem',
            background: 'linear-gradient(135deg, #ffffff 40%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            The Free World Geography Detective &amp; Street View Guessing Game
          </h1>
          <p style={{
            maxWidth: '820px',
            margin: '0 auto',
            color: '#94a3b8',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            lineHeight: 1.7
          }}>
            Explore 780,000+ real-world panoramas across 195+ nations. Differentiate countries by analyzing utility poles, road markings, camera generations, language scripts, and solar direction — 100% free with no subscription required.
          </p>
        </div>

        {/* Section: 4-Step Methodology */}
        <div style={{ marginBottom: '4.5rem' }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#ffffff'
          }}>
            How LostStreet Works: 4 Steps to World Mastery
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { num: "01", title: "360° Environmental Scan", text: "Look around in full panoramic view. Observe vegetation types, architectural building styles, soil colors, and road paving conditions." },
              { num: "02", title: "Meta Clue Identification", text: "Inspect vehicle hardware (snorkels, roof bars), camera artifacts (Gen 2 halo blurs vs Gen 4 crisp HDR), and road delineators." },
              { num: "03", title: "Hemisphere & Script Check", text: "Check whether the sun is North (Southern Hemisphere) or South (Northern Hemisphere). Read Cyrillic, Arabic, Thai, or Latin scripts." },
              { num: "04", title: "Pin & Climb the Ranks", text: "Drop your guess pin on the interactive world map. Earn distance accuracy points, unlock daily streaks, and climb the global ELO leaderboard." }
            ].map(step => (
              <div key={step.num} style={{
                background: 'rgba(20, 28, 48, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '1.75rem',
                backdropFilter: 'blur(12px)',
                position: 'relative'
              }}>
                <div style={{
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  color: '#38bdf8',
                  opacity: 0.8,
                  fontFamily: 'monospace',
                  marginBottom: '0.75rem'
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Masterclasses Spotlight */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#38bdf8', letterSpacing: '1px' }}>
                Strategy &amp; Knowledge Academy
              </span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)', fontWeight: 800, color: '#ffffff', margin: '4px 0 0' }}>
                Featured Geography Masterclasses &amp; Meta Guides
              </h2>
            </div>
            <Link href="/guides" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              transition: 'background 0.2s'
            }}>
              View All 13 Guides →
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}>
            {guides.map(g => (
              <Link key={g.slug} href={`/guides/${g.slug}`} style={{
                background: 'rgba(20, 28, 48, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '1.5rem',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s, border-color 0.2s, background 0.2s'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      background: `${g.color}15`,
                      color: g.color,
                      border: `1px solid ${g.color}35`
                    }}>
                      {g.tag}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Read Guide →</span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.6rem', lineHeight: 1.3 }}>
                    {g.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                    {g.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section: Comprehensive FAQ */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#ffffff'
          }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '880px', margin: '0 auto' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '1.25rem 1.5rem'
              }}>
                <h3 style={{ fontSize: '1.08rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem' }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
