import Link from 'next/link';

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
          <span style={{ color: '#10b981' }}>Disclaimer</span>
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
          Disclaimer &amp; Trademark Disclosures
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '0.92rem', marginBottom: '2rem' }}>
          <em>Last Updated: August 27, 2026</em>
        </p>

        <div style={{ lineHeight: '1.8', fontSize: '1rem', color: '#d1d5db', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            1. Non-Affiliation with Google LLC or GeoGuessr AB
          </h2>
          <p>
            <strong>LostStreet</strong> is an independent educational web application. LostStreet is <strong>not affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with Google LLC, Alphabet Inc., GeoGuessr AB, or any of their subsidiaries or affiliates.
          </p>
          <p>
            The names &quot;Google&quot;, &quot;Google Maps&quot;, &quot;Google Street View&quot;, and &quot;GeoGuessr&quot; as well as related names, marks, emblems, and images are registered trademarks of their respective owners. Any reference to these terms on LostStreet is made strictly for descriptive, identification, and educational purposes under fair use principles.
          </p>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            2. Map &amp; Panoramic Imagery Fair Use
          </h2>
          <p>
            LostStreet renders panoramic street imagery and map tiles using official Google Maps Platform APIs. The underlying imagery, geographical data, and copyrights belong exclusively to Google LLC and its respective imagery contributors. LostStreet does not claim ownership of any third-party imagery displayed within the game.
          </p>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            3. Educational &amp; Informational Purpose
          </h2>
          <p>
            All guides, country chronicles, flag quizzes, and geography clues published on LostStreet are provided solely for general educational, trivia, and entertainment purposes. While our editorial team makes every effort to ensure accuracy in geographical descriptions, historical timelines, and infrastructure clues, road regulations and street-level infrastructure change frequently across world jurisdictions.
          </p>

          <h2 style={{ color: '#f3f4f6', fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.4rem' }}>
            4. DMCA &amp; Content Removal Inquiries
          </h2>
          <p>
            LostStreet respects the intellectual property rights of others. If you believe that any material or content on our website infringes upon your copyright or trademark, please contact our designated copyright agent with:
          </p>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>The exact URL of the material you request to be removed or modified.</li>
            <li>Your contact information (name, address, telephone number, and email address).</li>
            <li>A statement made under penalty of perjury that the information provided is accurate and that you are authorized to act on behalf of the owner.</li>
          </ul>

          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1rem 1.5rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ margin: 0, fontWeight: 700, color: '#10b981' }}>dmca@loststreet.online</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}
