const GUIDE_SLUGS = [
  '25-pro-street-view-geoguessr-secrets',
  'street-view-camera-generations-guide',
  'latin-america-street-view-guide',
  'best-free-geoguessr-alternatives',
  'how-to-guess-locations-from-street-view',
  'hardest-countries-to-guess',
  'how-to-improve-at-geography-games',
  'geography-clues-guide',
  'africa-street-view-guide',
  'asia-street-view-guide',
  'europe-street-view-guide',
  'flag-identification-guide',
  'multiplayer-geography-tips',
];

export default function sitemap() {
  const now = new Date();

  const baseRoutes = [
    { url: 'https://www.loststreet.online', lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: 'https://www.loststreet.online/about', lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.loststreet.online/guides', lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://www.loststreet.online/leaderboard', lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: 'https://www.loststreet.online/flag-guesser', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.loststreet.online/community', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.loststreet.online/contact', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.loststreet.online/privacy', lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: 'https://www.loststreet.online/terms', lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: 'https://www.loststreet.online/cookies', lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: 'https://www.loststreet.online/guides', lastModified: new Date('2026-08-06'), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://www.loststreet.online/disclaimer', lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const guideRoutes = GUIDE_SLUGS.map(slug => ({
    url: `https://www.loststreet.online/guides/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...baseRoutes, ...guideRoutes];
}
