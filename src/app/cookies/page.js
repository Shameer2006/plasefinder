import Link from 'next/link';
import { PageShell } from '@/app/components/SiteShell';

export const metadata = {
  title: "Cookie Policy — LostStreet Free World Geography Game",
  description: "Learn how LostStreet and our advertising partners use cookies and tracking technologies to deliver our free educational geography platform.",
  alternates: { canonical: "https://www.loststreet.online/cookies" },
  keywords: ["loststreet cookie policy", "google adsense cookies", "tracking technologies loststreet", "dart cookie geoguessr"],
  openGraph: {
    title: "Cookie Policy — LostStreet",
    description: "Cookie Policy and Advertising Tracking Disclosures for LostStreet.",
    url: "https://www.loststreet.online/cookies",
  },
};

export default function CookiePolicyPage() {
  return (
    <PageShell breadcrumb="Cookie Policy" badgeText="Tracking &amp; Cookie Disclosures" badgeColor="gray">

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
              Consent &amp; Privacy Choices
            </span>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              fontWeight: 900,
              lineHeight: 1.2,
              color: '#111827',
              letterSpacing: '-0.02em',
              margin: '0 0 0.5rem 0'
            }}>
              Cookie Policy &amp; Tracking Disclosures
            </h1>
            <p style={{ color: '#6b7280', fontSize: '0.92rem', margin: 0, fontStyle: 'italic' }}>
              Last Updated: August 27, 2026 &bull; Effective Date: August 27, 2026
            </p>
          </div>

          <div style={{ lineHeight: '1.8', fontSize: '0.98rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              This Cookie Policy explains how <strong>LostStreet</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies, local browser storage, and related web telemetry on <a href="https://www.loststreet.online" style={{ color: '#059669', fontWeight: 600, textDecoration: 'underline' }}>https://www.loststreet.online</a>.
            </p>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text strings saved to your computer, tablet, or smartphone by websites you visit. They are standard web mechanisms used to allow secure authentication, remember in-game user settings across sessions, and provide anonymous analytical and advertising insights to website operators.
            </p>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              2. Categories of Cookies We Use
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '16px' }}>
                <h3 style={{ color: '#059669', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.4rem 0' }}>
                  A. Strictly Necessary &amp; Operational Storage
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.6 }}>
                  These cookies and HTML5 LocalStorage entries are essential for core platform features. They enable Google Firebase authentication, maintain sound and measurement unit preferences (metric vs imperial), and preserve your daily streak progress. Without these, core game functions cannot operate properly.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '16px' }}>
                <h3 style={{ color: '#2563eb', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.4rem 0' }}>
                  B. Performance &amp; Analytics Cookies
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.6 }}>
                  We utilize Vercel Analytics and Google Analytics (GA4) to anonymously evaluate page rendering speeds, Core Web Vitals, and aggregate traffic trends. This telemetry helps our engineering team optimize Street View panorama loading and resolve platform bugs.
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '16px' }}>
                <h3 style={{ color: '#b45309', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.4rem 0' }}>
                  C. Advertising &amp; Google AdSense Cookies
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.6 }}>
                  LostStreet displays advertisements via Google AdSense to fund our cloud server hosting and keep the game 100% free with unlimited rounds. Google and its certified advertising partners use cookies (such as the DoubleClick DART cookie) to serve ads based on your visits to our site and other websites across the web.
                </p>
              </div>
            </div>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              3. Managing Your Cookie &amp; Advertising Preferences
            </h2>
            <p>
              You maintain complete control over how cookies and behavioral advertising tracking are applied:
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <strong>Google Ads Personalization:</strong> You can manage or disable personalized advertising at any time by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', fontWeight: 600, textDecoration: 'underline' }}>Google My Ad Center</a>.
              </li>
              <li>
                <strong>Consumer Opt-Out Platforms:</strong> You can opt out of interest-based advertising from multiple networks via the <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', fontWeight: 600, textDecoration: 'underline' }}>Digital Advertising Alliance (DAA)</a> or the <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', fontWeight: 600, textDecoration: 'underline' }}>European Interactive Digital Advertising Alliance (EDAA)</a>.
              </li>
              <li>
                <strong>Web Browser Controls:</strong> Major browsers (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge) provide settings to block cookies or notify you when cookies are set. Note that disabling necessary cookies may alter your game progress or session settings.
              </li>
            </ul>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              4. Contact Us Regarding Cookies
            </h2>
            <p>
              If you have any questions regarding our cookie practices, advertising partners, or data protection, please reach out through our <Link href="/contact" style={{ color: '#059669', fontWeight: 600, textDecoration: 'underline' }}>Contact Form</Link> or email:
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
                  Privacy &amp; Compliance Team
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
    </PageShell>
  );
}
