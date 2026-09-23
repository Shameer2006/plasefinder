import Link from 'next/link';
import { PageShell } from '@/app/components/SiteShell';

export const metadata = {
  title: "Disclaimer & Fair Use Notice — LostStreet",
  description: "Legal disclaimer, third-party trademark notices, and fair use disclosures for LostStreet free street view geography game.",
  alternates: { canonical: "https://www.loststreet.online/disclaimer" },
  keywords: ["loststreet disclaimer", "geoguessr disclaimer", "google maps fair use", "trademark notice loststreet"],
  openGraph: {
    title: "Disclaimer & Fair Use Notice — LostStreet",
    description: "Legal and trademark disclaimer for LostStreet.",
    url: "https://www.loststreet.online/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <PageShell breadcrumb="Disclaimer" badgeText="Legal Disclosures &amp; Fair Use" badgeColor="gray">

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
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 900,
            lineHeight: 1.2,
            color: '#111827',
            letterSpacing: '-0.02em',
            margin: '0 0 0.5rem 0'
          }}>
            Disclaimer &amp; Trademark Disclosures
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.92rem', marginBottom: '2rem', fontStyle: 'italic' }}>
            Last Updated: August 27, 2026
          </p>

          <div style={{ lineHeight: '1.8', fontSize: '0.98rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              1. Non-Affiliation with Google LLC or GeoGuessr AB
            </h2>
            <p>
              <strong>LostStreet</strong> is an independent educational web application. LostStreet is <strong>not affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with Google LLC, Alphabet Inc., GeoGuessr AB, or any of their subsidiaries or affiliates.
            </p>
            <p>
              The names &quot;Google&quot;, &quot;Google Maps&quot;, &quot;Google Street View&quot;, and &quot;GeoGuessr&quot; as well as related names, marks, emblems, and images are registered trademarks of their respective owners. Any reference to these terms on LostStreet is made strictly for descriptive, identification, and educational purposes under fair use principles.
            </p>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              2. Map &amp; Panoramic Imagery Fair Use
            </h2>
            <p>
              LostStreet renders panoramic street imagery and map tiles using official Google Maps Platform APIs. The underlying imagery, geographical data, and copyrights belong exclusively to Google LLC and its respective imagery contributors. LostStreet does not claim ownership of any third-party imagery displayed within the game.
            </p>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              3. Educational &amp; Informational Purpose
            </h2>
            <p>
              All guides, country chronicles, flag quizzes, and geography clues published on LostStreet are provided solely for general educational, trivia, and entertainment purposes. While our editorial team makes every effort to ensure accuracy in geographical descriptions, historical timelines, and infrastructure clues, road regulations and street-level infrastructure change frequently across world jurisdictions.
            </p>

            <h2 style={{ color: '#111827', fontSize: '1.28rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
              4. DMCA &amp; Content Removal Inquiries
            </h2>
            <p>
              LostStreet respects the intellectual property rights of others. If you believe that any material or content on our website infringes upon your copyright or trademark, please contact our designated copyright agent with:
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>The exact URL of the material you request to be removed or modified.</li>
              <li>Your contact information (name, address, telephone number, and email address).</li>
              <li>A statement made under penalty of perjury that the information provided is accurate and that you are authorized to act on behalf of the owner.</li>
            </ul>

            <div style={{
              background: '#f8fafc',
              padding: '1.25rem 1.5rem',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>Designated DMCA Agent</div>
                <a href="mailto:dmca@loststreet.online" style={{ fontWeight: 800, color: '#059669', textDecoration: 'none', fontSize: '1rem' }}>
                  dmca@loststreet.online
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
            </div>
          </div>
        </article>
      </main>
    </PageShell>
  );
}
