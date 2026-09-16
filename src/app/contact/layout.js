export const metadata = {
  title: "Contact Us — Support & Player Feedback | LostStreet",
  description: "Contact the LostStreet team for player support, feature suggestions, partnership inquiries, or geography game feedback. We respond within 24-48 hours.",
  alternates: {
    canonical: "https://www.loststreet.online/contact",
  },
  keywords: [
    "contact loststreet", "loststreet support", "loststreet feedback", "loststreet inquiries",
    "street view game help", "geography game feedback"
  ],
  openGraph: {
    title: "Contact Us — Support & Player Feedback | LostStreet",
    description: "Contact the LostStreet team for player support, feature suggestions, partnership inquiries, or geography game feedback.",
    url: "https://www.loststreet.online/contact",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us — Support & Player Feedback | LostStreet",
    description: "Contact the LostStreet team for player support, feature suggestions, partnership inquiries, or geography game feedback.",
    images: ["/og-image.png"],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.loststreet.online' },
    { '@type': 'ListItem', position: 2, name: 'Contact Us', item: 'https://www.loststreet.online/contact' }
  ]
};

const contactPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact LostStreet',
  description: 'Official contact and player support page for the LostStreet geography game.',
  url: 'https://www.loststreet.online/contact'
};

export default function ContactLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      {children}
    </>
  );
}
