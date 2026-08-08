export const metadata = {
  title: "World Country Chronicles & Geography Database — LostStreet",
  description: "Explore detailed country profiles, historical insights, and street view guessing clues for 196 nations on LostStreet.",
  alternates: { canonical: "https://www.loststreet.online/chronicles" },
  keywords: [
    "loststreet chronicles", "world country geography", "street view country clues",
    "country identification guide", "street view guesser countries", "world geography database"
  ],
  openGraph: {
    title: "World Country Chronicles & Geography Database — LostStreet",
    description: "Discover history, geography facts, and street view clues for 196 countries on LostStreet.",
    url: "https://www.loststreet.online/chronicles",
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.loststreet.online' },
    { '@type': 'ListItem', position: 2, name: 'Country Map & Chronicles', item: 'https://www.loststreet.online/chronicles' }
  ]
};

export default function ChroniclesLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
