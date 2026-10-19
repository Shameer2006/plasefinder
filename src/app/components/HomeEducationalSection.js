import Link from 'next/link';

export default function HomeEducationalSection() {
  const guides = [
    {
      title: "The 10 Hardest Countries to Guess",
      slug: "hardest-countries-to-guess",
      desc: "Crack Russia, Lesotho, Kyrgyzstan, and Argentina with verified road lines, car meta, and terrain signatures.",
      tag: "Advanced Meta",
      badgeBg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
      badgeBorder: "#a7f3d0",
      badgeColor: "#059669",
      accentGradient: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
    },
    {
      title: "25 Pro Street View Secrets",
      slug: "25-pro-street-view-geoguessr-secrets",
      desc: "Master Ghana tape, Kenya snorkel, Senegal sky rifts, and high-level 1v1 duel strategy.",
      tag: "Pro Secrets",
      badgeBg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
      badgeBorder: "#fde68a",
      badgeColor: "#d97706",
      accentGradient: "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)",
    },
    {
      title: "Street View Camera Generations (Gen 1-4)",
      slug: "street-view-camera-generations-guide",
      desc: "Date panoramas instantly by recognizing Gen 1 circular blur, Gen 2 halos, Gen 3 crisp HD, and Gen 4 vibrant color science.",
      tag: "Camera Tech",
      badgeBg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      badgeBorder: "#bfdbfe",
      badgeColor: "#2563eb",
      accentGradient: "linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)",
    },
    {
      title: "Latin America Street View Masterclass",
      slug: "latin-america-street-view-guide",
      desc: "Differentiate Colombia, Mexico, Brazil, and Chile using cross-back signs, black sign backs, and octagonal poles.",
      tag: "Regional Guide",
      badgeBg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
      badgeBorder: "#a7f3d0",
      badgeColor: "#059669",
      accentGradient: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
    },
    {
      title: "Africa Street View Guide",
      slug: "africa-street-view-guide",
      desc: "Identify African coverage instantly across West, East, and Southern Africa with vehicle meta and landscape hallmarks.",
      tag: "Regional Guide",
      badgeBg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      badgeBorder: "#bfdbfe",
      badgeColor: "#2563eb",
      accentGradient: "linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)",
    },
    {
      title: "European Street View Masterclass",
      slug: "europe-street-view-guide",
      desc: "Decode road bollards, blue strip license plates, utility poles, and guardrails across 45+ European nations.",
      tag: "Regional Guide",
      badgeBg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
      badgeBorder: "#fde68a",
      badgeColor: "#d97706",
      accentGradient: "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)",
    }
  ];

  const steps = [
    {
      num: "1",
      title: "Scan the 360° view",
      text: "Look around in full panoramic Street View. Inspect vegetation types, architectural styles, soil colors, road pavement, and driving side."
    },
    {
      num: "2",
      title: "Identify meta clues",
      text: "Spot vehicle hardware (roof bars, snorkels, mirrors), camera artifacts (Gen 2 halo vs Gen 4 crisp HDR), and regional road bollards."
    },
    {
      num: "3",
      title: "Check sun & scripts",
      text: "Look at the sun position for North or South hemisphere confirmation. Read Cyrillic, Arabic, Thai, Greek, or Latin street signs."
    },
    {
      num: "4",
      title: "Pin & climb the ranks",
      text: "Drop your pin on the interactive world map. Earn distance points, maintain your daily challenge streak, and climb the ELO leaderboard."
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
      q: "Can I play LostStreet with my friends?",
      a: "Yes! You can host private party rooms with custom game codes for up to 20 players, or jump into live matchmaking ranked 1v1 duels with synchronized timers and real-time damage calculation."
    }
  ];

  return (
    <section
      id="educational-hub"
      aria-label="Educational Geography Hub"
      style={{
        position: 'relative',
        zIndex: 10,
        background: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        color: '#111827',
        fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
        padding: 'clamp(3.5rem, 6vw, 6rem) clamp(1rem, 4vw, 3rem)',
        pointerEvents: 'auto',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

        {/* ── EDITORIAL HERO SECTION (Inspired by PrintEG Hero) ──────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'clamp(2.5rem, 5vw, 5rem)',
          flexWrap: 'wrap',
          marginBottom: 'clamp(4.5rem, 8vw, 7rem)',
        }}>
          {/* Left Column: Typography & Action Buttons */}
          <div style={{ flex: '1 1 520px', maxWidth: '680px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              border: '1px solid #a7f3d0',
              color: '#059669',
              fontSize: '0.82rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '1.5rem',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }} />
              100% Free World Geography Detective
            </div>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: '0 0 1.5rem',
              color: '#111827',
              fontFamily: '"Outfit", sans-serif',
            }}>
              Explore the world from your screen. Deduce with clues.
            </h1>

            <p style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: '#4b5563',
              lineHeight: 1.7,
              margin: '0 0 2.5rem',
              maxWidth: '620px',
            }}>
              LostStreet drops you into 780,000+ real-world panoramas across 195+ nations. Differentiate countries by analyzing utility poles, road markings, camera generations, language scripts, and solar direction.
            </p>

            {/* Pill Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
                  color: '#ffffff',
                  padding: '16px 36px',
                  minHeight: '52px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: 800,
                  fontSize: '1rem',
                  letterSpacing: '0.01em',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.18)',
                  transition: 'transform 0.2s, background 0.2s, box-shadow 0.2s',
                  touchAction: 'manipulation',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(16,185,129,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #111827 0%, #1f2937 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.18)';
                }}
              >
                Play LostStreet Free →
              </a>

              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#ffffff',
                  color: '#111827',
                  border: '1.5px solid #d1d5db',
                  padding: '16px 30px',
                  minHeight: '52px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  touchAction: 'manipulation',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#111827'; e.currentTarget.style.background = '#f9fafb'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.background = '#ffffff'; }}
              >
                See How It Works ↓
              </a>
            </div>
          </div>

          {/* Right Column: Cheerful Mascot with Editorial Backdrop */}
          <div style={{
            flex: '1 1 360px',
            maxWidth: '460px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}>
            {/* Soft, beautiful radial glow behind mascot */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: '380px',
                height: '380px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(254, 240, 138, 0.45) 0%, rgba(253, 230, 138, 0.15) 50%, transparent 70%)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
            {/* Bold typographic backdrop inspired by PrintEG graphic */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 950,
                fontSize: 'clamp(4.5rem, 10vw, 7.5rem)',
                lineHeight: 0.88,
                color: 'rgba(254, 243, 199, 0.65)',
                fontFamily: '"Outfit", sans-serif',
                letterSpacing: '-0.04em',
                userSelect: 'none',
                pointerEvents: 'none',
                zIndex: 0,
                textAlign: 'center',
                textTransform: 'uppercase',
              }}
            >
              <div>EXPLORE</div>
              <div>GUESS</div>
              <div>DISCOVER</div>
            </div>

            {/* Mascot Image */}
            <img
              src="/cheerful-mascot.png"
              alt="LostStreet Cheerful Mascot"
              width={440}
              height={440}
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '440px',
                height: 'auto',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.12))',
                transform: 'rotate(-1deg)',
              }}
            />
          </div>
        </div>

        {/* ── FOUR STEPS SECTION (Image 3 Inspiration: Zero Boxes, Pure Editorial Lines) ─ */}
        <div id="how-it-works" style={{ marginBottom: 'clamp(4.5rem, 8vw, 7rem)', scrollMarginTop: '2rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 900,
              color: '#111827',
              letterSpacing: '-0.02em',
              margin: '0 0 0.5rem',
              fontFamily: '"Outfit", sans-serif',
            }}>
              Four steps from panoramic drop to pinpoint guess
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.05rem', margin: 0, maxWidth: '620px' }}>
              How world detectives systematically deduce country locations without ever reading road names.
            </p>
          </div>

          {/* 4 Clean Columns with Top Border (ZERO BOXES / NO CARDS) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}>
            {steps.map((step) => (
              <div
                key={step.num}
                style={{
                  borderTop: '2px solid #111827',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Large Serif Number (Image 3 Inspiration) */}
                <span style={{
                  fontFamily: '"Merriweather", "Georgia", serif',
                  fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
                  lineHeight: 1,
                  fontWeight: 400,
                  color: '#111827',
                  marginBottom: '1rem',
                }}>
                  {step.num}
                </span>

                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: '#111827',
                  margin: '0 0 0.65rem',
                  lineHeight: 1.35,
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontSize: '0.94rem',
                  color: '#4b5563',
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURED MASTERCLASSES & META GUIDES (Refined Gradient Palette) ── */}
        <div style={{ marginBottom: 'clamp(4.5rem, 8vw, 7rem)' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '2.5rem',
            borderBottom: '2px solid #111827',
            paddingBottom: '1.25rem',
          }}>
            <div>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#059669',
                letterSpacing: '1px',
                marginBottom: '6px',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                Strategy &amp; Knowledge Academy
              </span>
              <h2 style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                fontWeight: 900,
                color: '#111827',
                margin: '4px 0 0',
                letterSpacing: '-0.02em',
                fontFamily: '"Outfit", sans-serif',
              }}>
                Featured Geography Masterclasses &amp;{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Meta Guides
                </span>
              </h2>
            </div>

            <Link href="/guides" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: '50px',
              background: '#111827',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: '0.92rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#059669'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#111827'; }}
            >
              View All 13 Guides →
            </Link>
          </div>

          {/* Guide Grid with Harmonious Gradient Accents */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}>
            {guides.map(g => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'linear-gradient(145deg, #ffffff 0%, #fafbfc 100%)',
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb',
                  padding: '1.75rem',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                  transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.07)';
                  e.currentTarget.style.borderColor = g.badgeColor;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.02)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                {/* Subtle top color gradient accent bar */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: g.accentGradient,
                }} />

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      background: g.badgeBg,
                      color: g.badgeColor,
                      border: `1px solid ${g.badgeBorder}`,
                      letterSpacing: '0.04em',
                    }}>
                      {g.tag}
                    </span>
                    <span style={{
                      color: g.badgeColor,
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      Read Guide →
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#111827',
                    marginBottom: '0.65rem',
                    lineHeight: 1.35,
                    fontFamily: '"Outfit", sans-serif',
                  }}>
                    {g.title}
                  </h3>

                  <p style={{
                    fontSize: '0.94rem',
                    color: '#4b5563',
                    lineHeight: 1.65,
                    margin: 0,
                  }}>
                    {g.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── FREQUENTLY ASKED QUESTIONS (Clean Minimalist Dividers) ─── */}
        <div style={{ borderTop: '2px solid #111827', paddingTop: '3rem' }}>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            fontWeight: 900,
            marginBottom: '2rem',
            color: '#111827',
            letterSpacing: '-0.02em',
            fontFamily: '"Outfit", sans-serif',
          }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{
                padding: '1.75rem 0',
                borderBottom: '1px solid #e5e7eb',
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginBottom: '0.65rem' }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '0.97rem', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
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
