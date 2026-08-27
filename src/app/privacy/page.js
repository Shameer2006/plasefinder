import Link from 'next/link';

export const metadata = {
  title: "Privacy Policy — LostStreet Free Street View Guesser",
  description: "Privacy Policy for LostStreet street view guesser game. Understand how we collect, use, and protect player data in compliance with GDPR and CCPA.",
  alternates: { canonical: "https://www.loststreet.online/privacy" },
  keywords: ["loststreet privacy policy", "loststreet data protection", "street view guesser privacy"],
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
      padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
      background: '#0a0a0a',
      color: '#e5e5e5',
      fontFamily: "'Outfit', system-ui, sans-serif"
    }}>
      <div style={{
        maxWidth: '860px',
        margin: '0 auto',
        background: 'rgba(26, 26, 46, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: 'clamp(1.5rem, 4vw, 3rem)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
      }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: '#9ca3af' }} aria-label="Breadcrumb">
          <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: '#10b981' }}>Privacy Policy</span>
        </nav>

        <h1 style={{
          fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
          fontWeight: 900,
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #10b981, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2
        }}>
          Privacy Policy
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '0.92rem', marginBottom: '2rem' }}>
          <em>Last Updated: August 27, 2026</em>
        </p>
        
        <div style={{ lineHeight: '1.8', fontSize: '1rem', color: '#d1d5db', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            Welcome to <strong>LostStreet</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal privacy and ensuring transparency regarding how data is handled across our website (<a href="https://www.loststreet.online" style={{ color: '#10b981', textDecoration: 'underline' }}>https://www.loststreet.online</a>) and our free geography guessing platform.
          </p>
          <p>
            This Privacy Policy outlines our data collection, usage, and security practices in compliance with global data protection standards, including the European Union General Data Protection Regulation (GDPR), the UK Data Protection Act, and the California Consumer Privacy Act (CCPA/CPRA).
          </p>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            1. Information We Collect
          </h2>
          <p>
            To provide a seamless, free educational gaming experience, we collect the following categories of data:
          </p>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong>Account &amp; Profile Information:</strong> If you choose to log in via Google Sign-In, we collect your email address, display name, and avatar URL via Google Firebase Authentication. You may also play as an anonymous guest.</li>
            <li><strong>Gameplay &amp; Score Records:</strong> We store your multiplayer match history, ELO rating, level progression, daily streak counter, and the geographic coordinates (latitude and longitude) of your guesses to calculate distance scores.</li>
            <li><strong>Technical &amp; Telemetry Data:</strong> Standard diagnostic data including your IP address, browser type, device operating system, language settings, and interaction metrics collected via Vercel Analytics and Google Analytics.</li>
          </ul>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            2. Third-Party Integrations &amp; Advertising Partners
          </h2>
          <p>
            LostStreet relies on carefully vetted third-party service providers that may process data in accordance with their respective privacy policies:
          </p>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <li>
              <strong>Google Maps Platform:</strong> Used to display interactive world maps and 360-degree street view panoramas. Usage is governed by the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'underline' }}>Google Privacy Policy</a>.
            </li>
            <li>
              <strong>Google AdSense &amp; DoubleClick:</strong> We use Google AdSense to serve non-intrusive advertisements to keep LostStreet 100% free. Google is a third-party vendor that uses cookies (such as DoubleClick DART cookies) to serve ads to users based on their visits to our site and other sites on the Internet. Users can manage or opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'underline' }}>Google My Ad Center</a>.
            </li>
            <li>
              <strong>Google Firebase:</strong> Used for secure cloud authentication, real-time matchmaking databases, and leaderboard state synchronization.
            </li>
            <li>
              <strong>Vercel:</strong> Used for edge cloud hosting, performance telemetry, and CDN asset delivery.
            </li>
          </ul>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            3. Cookies &amp; Local Storage
          </h2>
          <p>
            We and our third-party advertising partners use cookies and browser local storage to preserve your sound preferences, unit settings (miles vs km), game progress, and deliver relevant advertisements. For full technical details and opt-out instructions, please review our comprehensive <Link href="/cookies" style={{ color: '#10b981', textDecoration: 'underline' }}>Cookie Policy</Link>.
          </p>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            4. How We Use Your Data
          </h2>
          <p>We process collected information strictly for legitimate operational purposes:</p>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>To operate and maintain the multiplayer matchmaking system and party lobbies.</li>
            <li>To calculate distance scores, update global rankings, and maintain daily streaks.</li>
            <li>To serve relevant advertising that funds our cloud hosting and API infrastructure.</li>
            <li>To prevent automated bot abuse, cheating, and malicious network traffic.</li>
          </ul>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            5. Your Data Protection Rights (GDPR &amp; CCPA/CPRA)
          </h2>
          <p>Under international privacy laws, you possess fundamental data rights, including:</p>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about your profile.</li>
            <li><strong>Right to Rectification:</strong> Update or correct inaccurate account information.</li>
            <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Request full deletion of your user profile, leaderboard stats, and match records.</li>
            <li><strong>Right to Restrict or Object to Processing:</strong> Opt out of marketing or personalized telemetry.</li>
          </ul>
          <p>
            To exercise any of these privacy rights, submit a request via our <Link href="/contact" style={{ color: '#10b981', textDecoration: 'underline' }}>Contact Form</Link> or email our Data Protection Officer at <span style={{ color: '#10b981', fontWeight: 600 }}>privacy@loststreet.online</span>.
          </p>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            6. Children&apos;s Privacy
          </h2>
          <p>
            LostStreet is an educational geography game suitable for broad audiences, but we do not knowingly collect personal information from children under 13 years of age. If you are a parent or guardian and discover that your child has submitted personal information without consent, please contact us immediately to remove the data.
          </p>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            7. Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy periodically to reflect changes in legal regulations or platform features. We encourage you to review this page periodically. Revisions become effective immediately upon posting.
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f3f4f6' }}>Privacy Inquiries &amp; Data Requests</h3>
            <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.92rem', color: '#9ca3af' }}>Contact our designated data privacy team:</p>
            <p style={{ margin: 0, fontWeight: 700, color: '#10b981', fontSize: '1.05rem' }}>privacy@loststreet.online</p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{
              background: 'linear-gradient(135deg, #10b981, #3b82f6)',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.95rem'
            }}>
              Return to Home
            </Link>
            <Link href="/terms" style={{
              background: 'rgba(255,255,255,0.08)',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>
              Terms of Service
            </Link>
            <Link href="/cookies" style={{
              background: 'rgba(255,255,255,0.08)',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
