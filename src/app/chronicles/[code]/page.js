import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { countriesData } from '@/lib/countriesData';
import ChronicleClientView from '@/app/components/ChronicleClientView';

// Read JSON data directly from filesystem (available during server rendering/build)
const getCountryData = (code) => {
  try {
    const filePath = path.join(process.cwd(), 'src/data/chronicles', `${code.toLowerCase()}.json`);
    if (!fs.existsSync(filePath)) return null;
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (e) {
    console.error(`Error loading chronicle data for ${code}`, e);
    return null;
  }
};

// Generates static HTML paths for all 196 countries at build time
export async function generateStaticParams() {
  try {
    const directoryPath = path.join(process.cwd(), 'src/data/chronicles');
    const files = fs.readdirSync(directoryPath);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => ({
        code: file.replace('.json', '').toLowerCase()
      }));
  } catch (e) {
    console.error("Failed to read chronicles directory for static params", e);
    return [];
  }
}

// Generate dynamic metadata for Google Search and SEO ranking
export async function generateMetadata({ params }) {
  const { code } = await params;
  const data = getCountryData(code);
  
  if (!data) {
    return {
      title: 'Chronicle Not Found - World Flag Chronicles',
      description: 'The requested country chronicle history page could not be located.'
    };
  }

  return {
    title: `${data.seoTitle} | LostStreet Chronicles`,
    description: data.metaDescription,
    alternates: {
      canonical: `/chronicles/${code.toLowerCase()}`
    },
    keywords: [
      `history of ${data.name}`,
      `${data.name} history`,
      `${data.name} background`,
      `${data.name} origin`,
      `${data.name} geography`,
      `${data.name} street view`,
      `how to identify ${data.name} in geoguessr`,
      'country chronicles',
      'loststreet',
    ],
    openGraph: {
      title: data.seoTitle,
      description: data.metaDescription,
      type: 'article',
      publishedTime: '2026-07-12T00:00:00Z',
      modifiedTime: '2026-07-26T00:00:00Z',
      authors: ['https://www.loststreet.online/about'],
      url: `https://www.loststreet.online/chronicles/${code.toLowerCase()}`,
      images: [
        {
          url: `https://www.loststreet.online/api/og?chronicle=${code.toLowerCase()}&name=${encodeURIComponent(data.name)}`,
          width: 1200,
          height: 630,
          alt: `History of ${data.name}`
        }
      ]
    }
  };
}

export default async function CountryChroniclePage({ params }) {
  const { code } = await params;
  const data = getCountryData(code);

  if (!data) {
    notFound();
  }

  // Compile full sorted list of countries for the swipe navigation (previous/next links)
  const countriesList = Object.keys(countriesData).map(cCode => ({
    code: cCode,
    name: countriesData[cCode].name
  })).sort((a, b) => a.name.localeCompare(b.name));

  // JSON-LD structured schema markup for Article indexing (AdSense/Google rank best practices)
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.seoTitle,
    "description": data.metaDescription,
    "abstract": data.aiSummary ? Object.values(data.aiSummary).join(" ") : data.metaDescription,
    "image": `https://www.loststreet.online/api/og?chronicle=${code.toLowerCase()}&name=${encodeURIComponent(data.name)}`,
    "datePublished": "2026-07-12T00:00:00Z",
    "dateModified": "2026-07-26T00:00:00Z",
    "wordCount": 1200,
    "inLanguage": "en-US",
    "author": {
      "@type": "Organization",
      "name": "LostStreet Editorial Team",
      "url": "https://www.loststreet.online/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LostStreet",
      "url": "https://www.loststreet.online",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.loststreet.online/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.loststreet.online/chronicles/${code.toLowerCase()}`
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "LostStreet Chronicles",
      "url": "https://www.loststreet.online/chronicles"
    }
  };

  // FAQPage Schema Markup
  const faqSchema = data.faqs && data.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <main style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundImage: 'linear-gradient(rgba(5, 8, 22, 0.96), rgba(5, 8, 22, 0.96)), url(/bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden'
    }}>
      {/* Inject Structured Data Schema in Head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Nav Header */}
      <nav style={{
        padding: '1rem 2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(255,255,255,0.01)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link href="/chronicles" style={{
          color: '#38bdf8',
          textDecoration: 'none',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.95rem'
        }} className="btn-hover-swipe">
          ← Back to Catalog
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.png" alt="LostStreet Logo" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
            LostStreet Encyclopedia
          </span>
        </div>
      </nav>

      {/* Interactive Chronicle View */}
      <ChronicleClientView countryData={data} countriesList={countriesList} />
    </main>
  );
}

// Inline Link helper for Server Component
import Link from 'next/link';
