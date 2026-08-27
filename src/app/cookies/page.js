import Link from 'next/link';

export const metadata = {
  title: "Cookie Policy — LostStreet Free World Geography Game",
  description: "Learn how LostStreet and our advertising partners use cookies and tracking technologies to deliver our free educational geography platform.",
  alternates: { canonical: "https://www.loststreet.online/cookies" },
  keywords: ["loststreet cookie policy", "google adsense cookies", "tracking technologies loststreet"],
  openGraph: {
    title: "Cookie Policy — LostStreet",
    description: "Cookie Policy and Advertising Tracking Disclosures for LostStreet.",
    url: "https://www.loststreet.online/cookies",
  },
};

export default function CookiePolicyPage() {
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
          <span style={{ color: '#10b981' }}>Cookie Policy</span>
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
          Cookie Policy &amp; Tracking Disclosures
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '0.92rem', marginBottom: '2rem' }}>
          <em>Last Updated: August 27, 2026</em>
        </p>

        <div style={{ lineHeight: '1.8', fontSize: '1rem', color: '#d1d5db', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            This Cookie Policy explains how <strong>LostStreet</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies, local browser storage, and similar technologies on <a href="https://www.loststreet.online" style={{ color: '#10b981', textDecoration: 'underline' }}>https://www.loststreet.online</a>.
          </p>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files placed on your computer, tablet, or mobile phone by websites you visit. They are widely used to make web applications function efficiently, preserve user preferences across sessions, and provide anonymous analytical and advertising data to website publishers.
          </p>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            2. Categories of Cookies We Use
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '1.25rem', borderRadius: '12px' }}>
              <h3 style={{ color: '#10b981', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.4rem 0' }}>A. Strictly Necessary &amp; Essential Cookies</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#cbd5e1' }}>
                These cookies and LocalStorage items are essential for core platform features. They enable you to log in via Firebase Authentication, save your audio/unit preferences (metric vs imperial), and keep your in-game daily streak intact. Without these, core game functions cannot be provided.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '1.25rem', borderRadius: '12px' }}>
              <h3 style={{ color: '#60a5fa', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.4rem 0' }}>B. Performance &amp; Analytics Cookies</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#cbd5e1' }}>
                We utilize Vercel Analytics and Google Analytics (GA4) to anonymously monitor page load speeds, Core Web Vitals, and aggregate traffic patterns. This telemetry helps our engineering team optimize Street View asset rendering and diagnose technical glitches.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '1.25rem', borderRadius: '12px' }}>
              <h3 style={{ color: '#fbbf24', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.4rem 0' }}>C. Advertising &amp; Google AdSense Cookies</h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#cbd5e1' }}>
                LostStreet serves advertisements through Google AdSense to fund our cloud server hosting and keep the game 100% free with unlimited rounds. Google and its certified vendor partners use cookies (such as the DoubleClick DART cookie) to serve relevant advertisements based on a user's prior visits to our site or other websites across the Internet.
              </p>
            </div>
          </div>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            3. How to Opt-Out &amp; Manage Your Cookie Preferences
          </h2>
          <p>
            You have full control over cookie usage and personalized advertising tracking:
          </p>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <li>
              <strong>Google Ads Personalization:</strong> You can opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'underline' }}>Google My Ad Center</a>.
            </li>
            <li>
              <strong>Industry Opt-Out Platforms:</strong> You can opt out of third-party behavioral advertising cookies through the <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'underline' }}>Digital Advertising Alliance (DAA)</a> or the <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'underline' }}>European Interactive Digital Advertising Alliance (EDAA)</a>.
            </li>
            <li>
              <strong>Browser Controls:</strong> Most web browsers (Chrome, Firefox, Safari, Edge) allow you to refuse cookies or alert you when cookies are being sent. Note that disabling essential cookies may impact multiplayer or login functionality.
            </li>
          </ul>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            4. Contact Us Regarding Cookies
          </h2>
          <p>
            If you have questions about our cookie disclosures or third-party advertising partners, please visit our <Link href="/contact" style={{ color: '#10b981', textDecoration: 'underline' }}>Contact Page</Link> or email:
          </p>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1rem 1.5rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ margin: 0, fontWeight: 700, color: '#10b981' }}>privacy@loststreet.online</p>
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
