export const metadata = {
  title: "Community — LostStreet Player Network & Hub | LostStreet",
  description: "Connect with the global LostStreet geography community. Join discussions on Reddit and Instagram, share panoramic tips, and participate in duels.",
  alternates: { canonical: "https://www.loststreet.online/community" },
  keywords: [
    "loststreet community", "street view guesser community", "geoguessr alternative community",
    "geography guessing reddit", "loststreet discord instagram", "street view clues community"
  ],
  openGraph: {
    title: "Community — LostStreet Player Network & Hub | LostStreet",
    description: "Connect with the global LostStreet geography community. Join discussions on Reddit and Instagram, share panoramic tips, and participate in duels.",
    url: "https://www.loststreet.online/community",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Community — LostStreet Player Network & Hub | LostStreet",
    description: "Connect with the global LostStreet geography community. Join discussions on Reddit and Instagram, share panoramic tips, and participate in duels.",
    images: ["/og-image.png"],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.loststreet.online' },
    { '@type': 'ListItem', position: 2, name: 'Community', item: 'https://www.loststreet.online/community' }
  ]
};

import CommunityClient from './CommunityClient';

export default function CommunityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CommunityClient />
    </>
  );
}
