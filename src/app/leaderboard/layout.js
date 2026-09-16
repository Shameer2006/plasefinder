export const metadata = {
  title: "Leaderboard — Global Rankings & ELO | LostStreet",
  description: "View top-ranked street view guesser players on the official LostStreet leaderboard. Track ELO ratings, XP, 1v1 duel wins, and daily challenge streaks.",
  alternates: {
    canonical: "https://www.loststreet.online/leaderboard"
  },
  keywords: [
    "loststreet leaderboard", "street view guesser rankings", "geoguessr alternative leaderboard",
    "street view duel elo", "geography game champions", "top street view guessers"
  ],
  openGraph: {
    title: "Leaderboard — Global Rankings & ELO | LostStreet",
    description: "View top-ranked street view guesser players on the official LostStreet leaderboard. Track ELO ratings, XP, 1v1 duel wins, and daily challenge streaks.",
    url: "https://www.loststreet.online/leaderboard",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leaderboard — Global Rankings & ELO | LostStreet",
    description: "View top-ranked street view guesser players on the official LostStreet leaderboard. Track ELO ratings, XP, 1v1 duel wins, and daily challenge streaks.",
    images: ["/og-image.png"],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.loststreet.online' },
    { '@type': 'ListItem', position: 2, name: 'Leaderboard', item: 'https://www.loststreet.online/leaderboard' }
  ]
};

export default function LeaderboardLayout({ children }) {
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
