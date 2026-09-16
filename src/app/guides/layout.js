export const metadata = {
  title: "Guides & Strategy — Pro Street View Clues | LostStreet",
  description: "Master street view meta clues, camera generations, road markings, and bollards with LostStreet's pro geography guides. 100% free with no sign-up.",
  alternates: {
    canonical: "https://www.loststreet.online/guides",
  },
  keywords: [
    "street view guides", "geography clues guide", "how to play street view guesser",
    "camera generations guide", "bollard identification", "geoguessr tips free", "loststreet guides"
  ],
  openGraph: {
    title: "Guides & Strategy — Pro Street View Clues | LostStreet",
    description: "Master street view meta clues, camera generations, road markings, and bollards with LostStreet's pro geography guides.",
    url: "https://www.loststreet.online/guides",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guides & Strategy — Pro Street View Clues | LostStreet",
    description: "Master street view meta clues, camera generations, road markings, and bollards with LostStreet's pro geography guides.",
    images: ["/og-image.png"],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.loststreet.online' },
    { '@type': 'ListItem', position: 2, name: 'Guides & Strategy', item: 'https://www.loststreet.online/guides' }
  ]
};

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'LostStreet Geography & Street View Guides',
  description: 'Comprehensive educational guides and tips for street view guessing and geography discovery.',
  url: 'https://www.loststreet.online/guides'
};

export default function GuidesLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      {children}
    </>
  );
}
