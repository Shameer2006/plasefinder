import Link from 'next/link';

export const metadata = {
  title: "Terms of Service — LostStreet Free World Geography Game",
  description: "Terms of Service and Conditions of Use for LostStreet. Learn about player rules, intellectual property, fair use, and platform policies.",
  alternates: { canonical: "https://www.loststreet.online/terms" },
  keywords: ["loststreet terms of service", "loststreet user agreement", "loststreet terms of use", "geoguessr alternative terms"],
  openGraph: {
    title: "Terms of Service — LostStreet",
    description: "Terms of Service for LostStreet free street view geography game.",
    url: "https://www.loststreet.online/terms",
  },
};

export default function TermsOfServicePage() {
  return (
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

      {/* ── BREADCRUMB / SUB-NAV BAR ─────────────────────────────────────── */}
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
            <span style={{ color: '#059669', fontWeight: 700 }}>Terms of Service</span>
          </nav>
        </div>

        <div style={{
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          color: '#059669',
          padding: '5px 14px',
          borderRadius: '20px',
          fontSize: '0.82rem',
          fontWeight: 800,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span>User Agreement &amp; Fair Play</span>
        </div>
      </div>

      {/* ── EDITORIAL CONTENT CARD ───────────────────────────────────────── */}
      <main style={{
        maxWidth: '880px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1rem, 3vw, 2rem) 4rem',
      }}>
        <article style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '24px',
          padding: 'clamp(1.75rem, 4vw, 3rem)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '20px',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#059669',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem'
            }}>
              Platform Guidelines
            </span>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              fontWeight: 900,
              lineHeight: 1.2,
              color: '#111827',
              letterSpacing: '-0.02em',
              margin: '0 0 0.5rem 0'
            }}>
              Terms of Service
            </h1>
            <p style={{ color: '#6b7280', fontSize: '0.92rem', margin: 0, fontStyle: 'italic' }}>
              Last Updated: August 27, 2026 &bull; Effective Date: August 27, 2026
            </p>
          </div>

          <div style={{ lineHeight: '1.8', fontSize: '0.98rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              Welcome to <strong>LostStreet</strong> (&quot;LostStreet&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), an online educational world geography exploration game accessible at <a href="https://www.loststreet.online" style={{ color: '#059669', fontWeight: 600, textDecoration: 'underline' }}>https://www.loststreet.online</a>.
            </p>
            <p>
              By accessing or playing LostStreet, registering an account, or interacting with our educational guides and services, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to all terms and conditions, you must discontinue use of the platform immediately.
            </p>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              1. Eligibility &amp; Account Registration
            </h2>
            <p>
              LostStreet is free to play. You may play singleplayer modes anonymously without creating an account. However, to access multiplayer 1v1 matchmaking, save daily streak achievements, climb global leaderboards, or access player profiles, you may authenticate via Google Sign-In (Firebase Authentication).
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>You must be at least 13 years old (or the minimum legal age in your jurisdiction) to create an account.</li>
              <li>You agree to provide accurate information and keep your login credentials secure.</li>
              <li>You are solely responsible for all activities occurring under your authenticated profile.</li>
            </ul>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              2. Acceptable Use &amp; Fair Play Rules
            </h2>
            <p>
              To maintain a fair, fun, and educational community for all players, you agree NOT to:
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Use automated bots, scripts, browser extensions, or coordinate-sniffing tools to cheat or artificially inflate ELO ratings or leaderboard scores.</li>
              <li>Attempt to reverse-engineer, decompile, scrape, or extract our underlying location databases, proprietary algorithms, or APIs.</li>
              <li>Engage in harassment, hate speech, offensive display names, or abusive behavior in multiplayer party rooms or community channels.</li>
              <li>Disrupt, overburden, or attack our servers, databases, or third-party cloud infrastructure.</li>
            </ul>
            <p>
              We reserve the right to suspend, reset ratings, or permanently ban accounts violating these Fair Play standards without prior notice.
            </p>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              3. Intellectual Property &amp; Third-Party Services
            </h2>
            <p>
              All original source code, game mechanics, UI design, illustrations, algorithms, written guides, and logos on LostStreet are the intellectual property of LostStreet and protected under applicable copyright and international property laws.
            </p>
            <p>
              <strong>Third-Party Attribution &amp; Trademarks:</strong> LostStreet utilizes Google Maps and Google Street View APIs for panoramic imagery and map visualization. All map imagery, satellite tiles, and trademarks belong to Google LLC and respective content partners. LostStreet is an independent web application and is not sponsored, endorsed, or affiliated with Google LLC or GeoGuessr AB.
            </p>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              4. In-Game Gold Coins &amp; Virtual Items
            </h2>
            <p>
              LostStreet features virtual Gold Coins and streak rewards earned purely through gameplay, daily login rewards, and trivia answers. These virtual items have <strong>no real-world monetary value</strong>, cannot be exchanged or redeemed for fiat currency, and are strictly for entertainment and educational progression.
            </p>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              5. Disclaimer of Warranties
            </h2>
            <p>
              LostStreet is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, either express or implied. We do not guarantee uninterrupted, bug-free, or error-free availability of third-party Street View panoramas or cloud servers.
            </p>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              6. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, LostStreet, its operators, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages resulting from your access to, use of, or inability to use the platform.
            </p>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              7. Modifications to Terms &amp; Services
            </h2>
            <p>
              We reserve the right to modify these Terms or alter in-game features at any time. Material updates will be indicated by updating the &quot;Last Updated&quot; date at the top of this document. Your continued use of LostStreet after revisions constitutes acceptance of the updated Terms.
            </p>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              8. Contact Information &amp; Legal Notices
            </h2>
            <p>
              For legal inquiries, copyright notices, or questions regarding these Terms of Service, please reach out via our <Link href="/contact" style={{ color: '#059669', fontWeight: 600, textDecoration: 'underline' }}>Contact Form</Link> or email our legal desk:
            </p>
            <div style={{
              background: '#f8fafc',
              padding: '1.5rem',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Legal &amp; Policy Desk
                </div>
                <a href="mailto:legal@loststreet.online" style={{ fontWeight: 800, color: '#059669', textDecoration: 'none', fontSize: '1.02rem' }}>
                  legal@loststreet.online
                </a>
              </div>
            </div>

            {/* Navigation Actions */}
            <div style={{
              textAlign: 'center',
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid #f3f4f6',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link href="/" style={{
                background: 'linear-gradient(135deg, #059669, #10b981)',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '0.95rem',
                boxShadow: '0 4px 14px rgba(5,150,105,0.25)'
              }}>
                Return to Game
              </Link>
              <Link href="/privacy" style={{
                background: '#ffffff',
                border: '1px solid #d1d5db',
                color: '#374151',
                padding: '12px 24px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.95rem'
              }}>
                Privacy Policy
              </Link>
              <Link href="/cookies" style={{
                background: '#ffffff',
                border: '1px solid #d1d5db',
                color: '#374151',
                padding: '12px 24px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.95rem'
              }}>
                Cookie Policy
              </Link>
              <Link href="/disclaimer" style={{
                background: '#ffffff',
                border: '1px solid #d1d5db',
                color: '#374151',
                padding: '12px 24px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.95rem'
              }}>
                Disclaimer
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
