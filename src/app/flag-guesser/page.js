import Link from 'next/link';

export const metadata = {
  title: 'Free Country Flag Identifier & Quiz Game — LostStreet Flag Guesser',
  description: 'Test your flag knowledge with LostStreet\'s free flag identifier quiz. Identify country flags from around the world, learn flag patterns, and compete for the highest score. No sign-up required.',
  alternates: { canonical: 'https://www.loststreet.online/flag-guesser' },
  keywords: [
    'flag identifier', 'country flag identifier', 'identify flag', 'flag guesser',
    'flag quiz game', 'world flags quiz', 'country flag quiz', 'identify country flag',
    'flags of the world identifier', 'flag searcher', 'find flag', 'find flags',
    'flag identification', 'flag guessing game free'
  ],
  openGraph: {
    title: 'Free Country Flag Identifier & Quiz Game — LostStreet',
    description: 'Test your flag knowledge. Identify country flags from 196 nations. 100% free, no sign-up.',
    url: 'https://www.loststreet.online/flag-guesser',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Country Flag Identifier & Quiz Game',
    description: 'How many country flags can you identify? Take the free flag quiz on LostStreet.',
    images: ['/og-image.png'],
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the LostStreet Flag Guesser?',
      acceptedAnswer: { '@type': 'Answer', text: 'The LostStreet Flag Guesser is a free online quiz game where players identify country flags from around the world. You are shown a flag and must select the correct country from multiple choice options. It covers all 196 recognized nations.' }
    },
    {
      '@type': 'Question',
      name: 'Is the flag identifier quiz free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, the LostStreet Flag Guesser is 100% free to play with no sign-up required. You can take unlimited quizzes and practice identifying flags from all regions of the world.' }
    },
    {
      '@type': 'Question',
      name: 'How many flags are in the quiz?',
      acceptedAnswer: { '@type': 'Answer', text: 'The flag quiz covers all 196 recognized country flags. Flags are presented randomly, so each game is different. You will see flags from every continent and region.' }
    },
    {
      '@type': 'Question',
      name: 'How can I learn to identify country flags?',
      acceptedAnswer: { '@type': 'Answer', text: 'The best way to learn flags is through repetition and pattern recognition. Group flags by visual features: tricolours (France, Italy, Ireland), crescents (Turkey, Pakistan, Tunisia), crosses (Scandinavia), and stars (USA, China, Brazil). Our Flag Identification Guide breaks down every pattern.' }
    }
  ]
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.loststreet.online' },
    { '@type': 'ListItem', position: 2, name: 'Flag Guesser', item: 'https://www.loststreet.online/flag-guesser' }
  ]
};

export default function FlagGuesserPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #0a1a0a 50%, #0a0a1a 100%)',
        color: '#f3f4f6',
        fontFamily: "'Outfit', sans-serif",
      }}>
        <header className="responsive-header">
          <Link href="/" style={{ textDecoration: 'none', color: '#f3f4f6', fontSize: '1.5rem', fontWeight: 800 }}>
            LostStreet
          </Link>
          <Link href="/" style={{
            textDecoration: 'none', color: '#fff',
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            padding: '10px 24px', borderRadius: '50px', fontWeight: 600, fontSize: '0.95rem',
          }}>
            ▶ Play Now
          </Link>
        </header>

        {/* Breadcrumbs */}
        <nav style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem 2rem 0', fontSize: '0.85rem', color: '#6b7280' }} aria-label="Breadcrumb">
          <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: '#10b981' }}>Flag Guesser</span>
        </nav>

        {/* Hero */}
        <section style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1.2,
          }}>
            Free Country Flag Identifier & Quiz
          </h1>

          <p style={{ fontSize: '1.25rem', lineHeight: 1.8, color: '#9ca3af', maxWidth: '700px', margin: '0 auto 2rem' }}>
            How many of the world&apos;s 196 country flags can you identify?
            Test your knowledge with our free flag guessing game — no sign-up needed.
          </p>

          <Link href="/#FLAG_GAME" style={{
            textDecoration: 'none', color: '#fff',
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            padding: '16px 40px', borderRadius: '50px', fontWeight: 700, fontSize: '1.15rem',
            display: 'inline-block', boxShadow: '0 4px 20px rgba(251,191,36,0.3)',
          }}>
            🏁 Start Flag Quiz — It&apos;s Free
          </Link>
        </section>

        {/* How It Works */}
        <section style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>How the Flag Guesser Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🏳️', title: 'See a Flag', desc: 'A random country flag is displayed. Study the colors, symbols, and patterns carefully.' },
              { icon: '🤔', title: 'Make Your Guess', desc: 'Choose the correct country from multiple choice options. The faster you answer, the more points you earn.' },
              { icon: '📊', title: 'Track Your Score', desc: 'See your results and learn from mistakes. Repeat to build pattern recognition across all 196 flags.' },
            ].map((step) => (
              <div key={step.title} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', padding: '1.5rem',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{step.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>Flag Identification Tips</h2>
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem',
          }}>
            {[
              { pattern: 'Tricolour Flags', tip: 'France, Italy, Ireland, Belgium, Romania — learn which colors belong to which country.' },
              { pattern: 'Crescent & Star', tip: 'Turkey, Pakistan, Tunisia, Algeria, Libya — subtle differences in crescent size and star placement.' },
              { pattern: 'Nordic Crosses', tip: 'Denmark, Sweden, Norway, Finland, Iceland — the offset cross is a Scandinavian signature.' },
              { pattern: 'Red, White & Blue', tip: 'USA, UK, France, Netherlands, Russia — the most common color combination. Learn the patterns.' },
              { pattern: 'African Pan-Colors', tip: 'Green, yellow, red stripes appear across many African nations. Look for unique emblems.' },
            ].map((item) => (
              <div key={item.pattern} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                <span style={{ color: '#fbbf24', fontWeight: 700, fontSize: '1rem', minWidth: 'fit-content' }}>▸ {item.pattern}</span>
                <span style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.tip}</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link href="/guides/flag-identification-guide" style={{ color: '#60a5fa', textDecoration: 'underline', fontSize: '1rem' }}>
              → Read our complete Flag Identification Guide
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '3rem 2rem 5rem', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqJsonLd.mainEntity.map((faq) => (
              <details key={faq.name} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px', overflow: 'hidden',
              }}>
                <summary style={{
                  padding: '1.25rem 1.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '1.05rem',
                  listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  {faq.name}
                  <span style={{ fontSize: '1.2rem', color: '#fbbf24', flexShrink: 0, marginLeft: '1rem' }}>+</span>
                </summary>
                <div style={{ padding: '0 1.5rem 1.25rem', color: '#9ca3af', lineHeight: 1.7, fontSize: '0.95rem' }}>
                  {faq.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: '4rem 2rem', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(245,158,11,0.1) 100%)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Ready to Test Your Flag Knowledge?</h2>
          <p style={{ color: '#9ca3af', marginBottom: '2rem', fontSize: '1.1rem' }}>Start the flag quiz now — no account needed.</p>
          <Link href="/#FLAG_GAME" style={{
            textDecoration: 'none', color: '#fff',
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            padding: '16px 40px', borderRadius: '50px', fontWeight: 700, fontSize: '1.15rem',
            display: 'inline-block', boxShadow: '0 4px 20px rgba(251,191,36,0.3)',
          }}>
            🏁 Play Flag Guesser Free
          </Link>
        </section>

        {/* Related Links */}
        <section style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', color: '#9ca3af' }}>Related</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link href="/guides/flag-identification-guide" style={{ color: '#60a5fa', textDecoration: 'none' }}>→ World Flag Identification Guide</Link>
            <Link href="/guides/hardest-countries-to-guess" style={{ color: '#60a5fa', textDecoration: 'none' }}>→ 10 Hardest Countries to Guess in Street View</Link>
            <Link href="/guides/geography-clues-guide" style={{ color: '#60a5fa', textDecoration: 'none' }}>→ Ultimate Street View Clues Cheat Sheet</Link>
            <Link href="/" style={{ color: '#60a5fa', textDecoration: 'none' }}>→ Play LostStreet Street View Guesser</Link>
          </div>
        </section>

        <footer style={{ padding: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p>© {new Date().getFullYear()} LostStreet. A free geography guessing game and GeoGuessr alternative.</p>
        </footer>
      </div>
    </>
  );
}
