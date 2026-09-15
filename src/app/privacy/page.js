import Link from 'next/link';

export const metadata = {
  title: "Privacy Policy — LostStreet Free Street View Guesser",
  description: "Privacy Policy for LostStreet street view guesser game. Understand how we collect, use, and protect player data in compliance with GDPR and CCPA.",
  alternates: { canonical: "https://www.loststreet.online/privacy" },
  keywords: ["loststreet privacy policy", "loststreet data protection", "street view guesser privacy", "geoguessr alternative privacy"],
  openGraph: {
    title: "Privacy Policy — LostStreet",
    description: "Privacy Policy and Data Protection standards for LostStreet.",
    url: "https://www.loststreet.online/privacy",
  },
};

export default function PrivacyPolicy() {
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
            <span style={{ color: '#059669', fontWeight: 700 }}>Privacy Policy</span>
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
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Data Protection &amp; GDPR / CCPA</span>
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
              Trust &amp; Transparency
            </span>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              fontWeight: 900,
              lineHeight: 1.2,
              color: '#111827',
              letterSpacing: '-0.02em',
              margin: '0 0 0.5rem 0'
            }}>
              Privacy Policy
            </h1>
            <p style={{ color: '#6b7280', fontSize: '0.92rem', margin: 0, fontStyle: 'italic' }}>
              Last Updated: August 27, 2026 &bull; Effective Date: August 27, 2026
            </p>
          </div>

          <div style={{ lineHeight: '1.8', fontSize: '0.98rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              Welcome to <strong>LostStreet</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are dedicated to maintaining the trust and confidence of all players who visit our website (<a href="https://www.loststreet.online" style={{ color: '#059669', fontWeight: 600, textDecoration: 'underline' }}>https://www.loststreet.online</a>) and use our free world geography guessing platform.
            </p>
            <p>
              This Privacy Policy explains how we collect, store, use, and safeguard personal information when you access our singleplayer modes, competitive multiplayer matchmaking, or educational guides. Our practices comply with worldwide privacy standards including the European Union General Data Protection Regulation (GDPR), the UK Data Protection Act, and the California Consumer Privacy Act (CCPA/CPRA).
            </p>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              1. Information We Collect
            </h2>
            <p>
              To deliver an accurate, fast, and competitive geography learning experience, we collect specific data categories depending on your level of interaction:
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <strong>Account &amp; Authentication Data:</strong> When you sign in using Google Sign-In, we collect your verified email address, public display name, and avatar profile picture via Firebase Authentication. You are also welcome to play without registration as an anonymous guest.
              </li>
              <li>
                <strong>Gameplay Records &amp; Stats:</strong> We record multiplayer match results, your calculated ELO rating, experience points (XP), level progression, daily login streaks, and the geographic coordinates (latitude and longitude) of each guess you submit to determine distance accuracy.
              </li>
              <li>
                <strong>Technical &amp; Telemetry Information:</strong> When you browse LostStreet, our servers automatically log standard network telemetry including your IP address, browser user agent, device operating system, language preferences, and basic interaction events.
              </li>
            </ul>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              2. Third-Party Integrations &amp; Advertising Partners
            </h2>
            <p>
              LostStreet partners with industry-leading infrastructure and advertising providers to deliver free access worldwide:
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <strong>Google Maps Platform:</strong> We utilize official Google Maps JavaScript and Street View APIs to display 360-degree street panoramas and interactive world maps. Your interactions with map views are governed by the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', fontWeight: 600, textDecoration: 'underline' }}>Google Privacy Policy</a>.
              </li>
              <li>
                <strong>Google AdSense &amp; DoubleClick:</strong> We use Google AdSense to display non-intrusive advertisements that help fund our server bandwidth and API costs. Google, as a third-party advertising vendor, uses cookies (including the DoubleClick DART cookie) to serve ads to players based on their visits to LostStreet and other sites across the Internet. You can manage your personalized ad settings or opt out at any time by visiting the <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', fontWeight: 600, textDecoration: 'underline' }}>Google My Ad Center</a>.
              </li>
              <li>
                <strong>Google Firebase:</strong> We utilize Firebase Authentication, Cloud Firestore, and Firebase Realtime Database for secure profile storage, real-time 1v1 matchmaking, and instant score synchronization.
              </li>
              <li>
                <strong>Vercel Cloud Platform:</strong> Our frontend application is hosted globally on Vercel&apos;s edge network, which processes diagnostic logs and ensures low-latency performance.
              </li>
            </ul>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              3. Cookies &amp; Local Browser Storage
            </h2>
            <p>
              LostStreet utilizes essential first-party cookies and browser local storage to save your audio preferences (sound effects volume), preferred measurement units (miles vs kilometers), guest match history, and daily streak timestamps.
            </p>
            <p>
              Our third-party advertising partners also set cookies to measure campaign performance and deliver relevant context. For a detailed breakdown of all cookie types and comprehensive instructions on managing or disabling them, please visit our dedicated <Link href="/cookies" style={{ color: '#059669', fontWeight: 600, textDecoration: 'underline' }}>Cookie Policy</Link>.
            </p>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              4. How We Use Collected Data
            </h2>
            <p>We process player data strictly for legitimate educational, operational, and security purposes:</p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>To host, operate, and maintain real-time multiplayer lobbies and party rooms.</li>
              <li>To compute distance scores, calculate ELO rating adjustments, and update global leaderboards.</li>
              <li>To serve advertising that enables LostStreet to remain 100% free and accessible to all students and geography enthusiasts.</li>
              <li>To detect and prevent automated bots, reverse-engineering attempts, cheating, and malicious network traffic.</li>
              <li>To respond directly to player feedback, bug reports, and customer support inquiries.</li>
            </ul>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              5. Your Data Protection Rights (GDPR &amp; CCPA/CPRA)
            </h2>
            <p>
              Regardless of your geographical location, LostStreet respects your statutory data protection rights:
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Right of Access:</strong> You can request a summary copy of all personal information and match logs associated with your account.</li>
              <li><strong>Right to Rectification:</strong> You can update inaccurate profile attributes, usernames, or regional preferences.</li>
              <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> You may request permanent deletion of your Firebase profile, ELO history, leaderboard rankings, and saved records.</li>
              <li><strong>Right to Restrict or Object to Processing:</strong> You have the right to limit the ways your information is processed or opt out of personalized analytics.</li>
            </ul>
            <p>
              To exercise any of these privacy rights, please reach out via our <Link href="/contact" style={{ color: '#059669', fontWeight: 600, textDecoration: 'underline' }}>Contact Form</Link> or send a request to our Data Protection Officer at <span style={{ color: '#059669', fontWeight: 700 }}>privacy@loststreet.online</span>. We respond to all verified requests within 30 days.
            </p>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              6. Children&apos;s Privacy
            </h2>
            <p>
              LostStreet is an educational platform designed to foster geographical knowledge and world curiosity. However, we do not knowingly solicit or collect personal information from individuals under the age of 13. If you believe that a minor has submitted personal data through our site without parental consent, please contact us immediately and we will promptly delete the data.
            </p>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              7. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this policy occasionally to maintain alignment with evolving data regulations, technology changes, and new game features. All revisions will be posted directly to this page with an updated &quot;Last Updated&quot; timestamp. Continued use of LostStreet after revisions implies acknowledgment of the updated policy.
            </p>

            {/* Privacy Inquiries Card */}
            <div style={{
              background: '#f8fafc',
              padding: '1.5rem',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginTop: '1rem'
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
                  Data Privacy Officer &amp; Inquiries
                </div>
                <a href="mailto:privacy@loststreet.online" style={{ fontWeight: 800, color: '#059669', textDecoration: 'none', fontSize: '1.02rem' }}>
                  privacy@loststreet.online
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
              <Link href="/terms" style={{
                background: '#ffffff',
                border: '1px solid #d1d5db',
                color: '#374151',
                padding: '12px 24px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.95rem'
              }}>
                Terms of Service
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
