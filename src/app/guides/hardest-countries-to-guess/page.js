import Link from 'next/link';

export const metadata = {
  title: 'The 10 Hardest Countries to Guess in Street View — LostStreet',
  description: 'These countries are notoriously difficult to identify in geography guessing games. Learn what makes them hard and how to tell them apart in Google Street View.',
  openGraph: {
    title: 'The 10 Hardest Countries to Guess in Street View',
    description: 'These countries are notoriously difficult to identify in geography guessing games.',
    url: 'https://www.loststreet.online/guides/hardest-countries-to-guess',
    type: 'article',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The 10 Hardest Countries to Guess in Street View',
  description: 'These countries are notoriously difficult to identify in geography guessing games. Learn what makes them hard and how to tell them apart.',
  author: { '@type': 'Organization', name: 'LostStreet' },
  datePublished: '2026-08-25T00:00:00.000Z',
  dateModified: '2026-08-25T00:00:00.000Z',
};

const countries = [
  {
    rank: 1,
    name: 'Mongolia',
    why: 'Mongolia is an enormous, sparsely populated country with vast steppes that look almost identical to parts of Kazakhstan, Kyrgyzstan, and even parts of Russia. The landscape is dominated by endless grassland, dirt roads, and occasional gers (yurts). There are very few road signs, and the Cyrillic script used in Mongolia is nearly identical to Russian Cyrillic, making it extremely hard to distinguish without specific knowledge.',
    tips: 'Look for the unique Mongolian script (traditional script) on older signs. The landscape is drier and more barren than Kyrgyzstan. Telephone poles in Mongolia often have a distinctive cross-shaped top. The sky tends to be a very deep, clear blue due to the high altitude.',
  },
  {
    rank: 2,
    name: 'Senegal vs Mali',
    why: 'West African countries like Senegal, Mali, and Guinea share very similar landscapes — dry savanna, red dirt roads, and French-language signage. Without specific regional knowledge, these countries are almost impossible to distinguish from each other at first glance.',
    tips: 'Senegal has more coastal coverage and you may spot ocean views. Look for specific brand names on shops — certain brands are more common in one country than another. The quality of road infrastructure can also be a clue, as Senegal generally has better-maintained roads near Dakar.',
  },
  {
    rank: 3,
    name: 'Bolivia',
    why: 'Bolivia shares visual characteristics with Peru, Ecuador, and parts of Argentina. The Andean highlands (Altiplano) look similar across all these countries. Spanish is spoken everywhere, and the architecture in smaller towns is nearly identical across the region.',
    tips: 'Bolivia has a distinctive red, yellow, and green tricolor flag that appears frequently on buildings and vehicles. The Wiphala (a checkered rainbow flag) is also commonly displayed and is unique to Bolivia. Road signs in Bolivia often use a specific font and color scheme.',
  },
  {
    rank: 4,
    name: 'Finland vs Estonia',
    why: 'Both Finland and Estonia have similar Nordic landscapes — pine forests, flat terrain, and grey skies. Both use Latin script. The languages look superficially similar to untrained eyes, and the architecture in rural areas is nearly identical.',
    tips: 'Finnish uses double vowels extensively (e.g., "kauppakeskus", "tietokone"). Estonian looks similar but has different letter combinations. Finnish road signs use a specific shade of blue-green. Estonia is generally flatter and has more Soviet-era architecture in towns.',
  },
  {
    rank: 5,
    name: 'Laos vs Cambodia',
    why: 'Both Laos and Cambodia are Southeast Asian countries with tropical vegetation, Buddhist temples, and similar rural landscapes. Both use scripts that are visually similar to untrained eyes — Khmer (Cambodia) and Lao script look alike at a glance.',
    tips: 'Lao script has more rounded, circular letters. Khmer script is more angular and complex. Cambodia has more flat terrain while Laos is more mountainous. The Google car in Laos often shows a specific camera setup. Buddhist temple architecture differs subtly between the two countries.',
  },
  {
    rank: 6,
    name: 'Uruguay',
    why: 'Uruguay is one of the most commonly confused countries in South America. It looks almost identical to the Argentine Pampas — flat grassland, cattle farms, and Spanish signage. Many players default to Argentina when they see this landscape and lose significant points.',
    tips: 'Uruguay has a distinctive flag with a sun symbol (Sol de Mayo) that appears on government buildings. Road signs in Uruguay use a specific yellow color scheme. The country is smaller, so you are more likely to see the ocean or the Rio de la Plata. License plates in Uruguay have a specific format.',
  },
  {
    rank: 7,
    name: 'Ghana vs Nigeria',
    why: 'Both Ghana and Nigeria are West African countries with English as an official language, tropical vegetation, and similar urban and rural landscapes. The Google car in Ghana famously has black tape on its roof rack, but this is not always visible.',
    tips: 'Look for the Ghana flag (red, gold, green with a black star) on buildings. Nigerian signage tends to reference specific states (Lagos, Abuja, Kano). The Google car in Ghana has distinctive black tape. Urban areas in Nigeria tend to be denser and more chaotic than in Ghana.',
  },
  {
    rank: 8,
    name: 'Slovakia vs Czech Republic',
    why: 'These two Central European countries were once a single nation (Czechoslovakia) and share nearly identical landscapes, architecture, and road infrastructure. Both use Latin script with diacritical marks, and the languages are mutually intelligible.',
    tips: 'Czech uses "ř" — a letter that does not exist in Slovak. Slovak uses "ľ" and "ŕ". Road signs in the Czech Republic use a specific shade of blue. The Czech Republic has more medieval architecture in its town centers. Slovakia tends to have more mountainous terrain visible in the background.',
  },
  {
    rank: 9,
    name: 'Kyrgyzstan vs Kazakhstan',
    why: 'Both Central Asian countries use Cyrillic script, have similar steppe and mountain landscapes, and share cultural and architectural similarities from the Soviet era. The vast, empty landscapes make it nearly impossible to find distinguishing features.',
    tips: 'Kyrgyzstan is significantly more mountainous — if you see dramatic mountain peaks, lean towards Kyrgyzstan. Kazakhstan is flatter and more industrialized. Kazakh Cyrillic uses some unique letters. Road quality in Kazakhstan is generally better due to oil wealth.',
  },
  {
    rank: 10,
    name: 'Dominican Republic vs Haiti',
    why: 'These two countries share the island of Hispaniola, making the landscape identical. However, they are dramatically different in terms of language (Spanish vs French/Haitian Creole) and infrastructure. The challenge is that both have tropical vegetation and similar rural architecture.',
    tips: 'If you see French or Haitian Creole text, you are in Haiti. Spanish text means Dominican Republic. Haiti generally has less road coverage and poorer infrastructure. The Dominican Republic has more modern signage and better road quality. Look for specific brand names that are more common in one country.',
  },
];

export default function ArticlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a1a 100%)', color: '#f3f4f6', fontFamily: "'Outfit', sans-serif" }}>
        <header className="responsive-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/guides" style={{ textDecoration: 'none', color: '#9ca3af', fontSize: '1rem', fontWeight: 600 }}>← Back to Guides</Link>
          <Link href="/" style={{ textDecoration: 'none', color: '#f3f4f6', fontSize: '1.5rem', fontWeight: 800 }}>LostStreet</Link>
        </header>
        <main style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
            The 10 Hardest Countries to Guess in Street View
          </h1>
          <div style={{ color: '#9ca3af', marginBottom: '3rem', fontSize: '0.9rem' }}>Published: August 25, 2026 • 8 min read</div>
          <article style={{ fontSize: '1.1rem', color: '#d1d5db', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              Even experienced geography game players get stumped by certain countries. Whether it is the featureless steppe of Central Asia, the dense tropical forests of West Africa, or the eerily similar landscapes of neighbouring European nations, some locations are genuinely brutal to identify.
            </p>
            <p>
              This guide breaks down the 10 hardest countries to guess in street view games like <strong>LostStreet</strong>, explains exactly why they are so difficult, and gives you the specific clues to look for so you can start scoring points instead of losing them.
            </p>

            {countries.map((c) => (
              <div key={c.rank}>
                <h2 style={{ fontSize: '1.8rem', color: '#fff', marginTop: '2rem', marginBottom: '0.5rem' }}>#{c.rank} — {c.name}</h2>
                <h3 style={{ fontSize: '1rem', color: '#10b981', marginBottom: '0.5rem' }}>Why it's hard</h3>
                <p>{c.why}</p>
                <h3 style={{ fontSize: '1rem', color: '#10b981', marginBottom: '0.5rem' }}>How to identify it</h3>
                <p>{c.tips}</p>
              </div>
            ))}

            <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(16,185,129,0.1)', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(16,185,129,0.3)' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>Test yourself on these countries</h3>
              <p style={{ marginBottom: '1.5rem' }}>Play LostStreet and see if you can identify these tricky locations.</p>
              <Link href="/" style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)', color: '#fff', padding: '12px 24px', borderRadius: '50px', textDecoration: 'none', fontWeight: 700 }}>
                Play LostStreet Free
              </Link>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}
