import Link from 'next/link';

export const metadata = {
  title: "Terms of Service — LostStreet Free World Geography Game",
  description: "Terms of Service and Conditions of Use for LostStreet. Learn about player rules, intellectual property, fair use, and platform policies.",
  alternates: { canonical: "https://www.loststreet.online/terms" },
  keywords: ["loststreet terms of service", "loststreet user agreement", "loststreet terms of use"],
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
          <span style={{ color: '#10b981' }}>Terms of Service</span>
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
          Terms of Service
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '0.92rem', marginBottom: '2rem' }}>
          <em>Last Updated: August 27, 2026</em>
        </p>

        <div style={{ lineHeight: '1.8', fontSize: '1rem', color: '#d1d5db', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            Welcome to <strong>LostStreet</strong> (&quot;LostStreet&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), an online educational world geography exploration game accessible at <a href="https://www.loststreet.online" style={{ color: '#10b981', textDecoration: 'underline' }}>https://www.loststreet.online</a>.
          </p>
          <p>
            By accessing or playing LostStreet, registering an account, or interacting with our educational guides and services, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to all terms and conditions, you must discontinue use of the platform immediately.
          </p>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
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

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
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

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            3. Intellectual Property &amp; Third-Party Services
          </h2>
          <p>
            All original source code, game mechanics, UI design, illustrations, algorithms, written guides, and logos on LostStreet are the intellectual property of LostStreet and protected under applicable copyright and international property laws.
          </p>
          <p>
            <strong>Third-Party Attribution &amp; Trademarks:</strong> LostStreet utilizes Google Maps and Google Street View APIs for panoramic imagery and map visualization. All map imagery, satellite tiles, and trademarks belong to Google LLC and respective content partners. LostStreet is an independent web application and is not sponsored, endorsed, or affiliated with Google LLC or GeoGuessr AB.
          </p>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            4. In-Game Gold Coins &amp; Virtual Items
          </h2>
          <p>
            LostStreet features virtual Gold Coins and streak rewards earned purely through gameplay, daily login rewards, and trivia answers. These virtual items have <strong>no real-world monetary value</strong>, cannot be exchanged or redeemed for fiat currency, and are strictly for entertainment and educational progression.
          </p>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            5. Disclaimer of Warranties
          </h2>
          <p>
            LostStreet is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, either express or implied. We do not guarantee uninterrupted, bug-free, or error-free availability of third-party Street View panoramas or cloud servers.
          </p>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            6. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, LostStreet, its operators, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages resulting from your access to, use of, or inability to use the platform.
          </p>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            7. Modifications to Terms &amp; Services
          </h2>
          <p>
            We reserve the right to modify these Terms or alter in-game features at any time. Material updates will be indicated by updating the &quot;Last Updated&quot; date at the top of this document. Your continued use of LostStreet after revisions constitutes acceptance of the updated Terms.
          </p>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            8. Contact Information
          </h2>
          <p>
            For legal inquiries, copyright notices, or questions regarding these Terms of Service, please contact us via our <Link href="/contact" style={{ color: '#10b981', textDecoration: 'underline' }}>Contact Page</Link> or email:
          </p>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1rem 1.5rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ margin: 0, fontWeight: 700, color: '#10b981' }}>legal@loststreet.online</p>
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
              Return to Game
            </Link>
            <Link href="/privacy" style={{
              background: 'rgba(255,255,255,0.08)',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>
              Read Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
