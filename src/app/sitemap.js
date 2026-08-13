import { countriesData } from '@/lib/countriesData';

const GUIDE_SLUGS = [
  '25-pro-street-view-geoguessr-secrets',
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
    { url: 'https://www.loststreet.online/about', lastModified: new Date('2026-08-06'), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.loststreet.online/leaderboard', lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: 'https://www.loststreet.online/guides', lastModified: new Date('2026-08-06'), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://www.loststreet.online/chronicles', lastModified: new Date('2026-08-06'), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://www.loststreet.online/community', lastModified: new Date('2026-07-26'), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.loststreet.online/flag-guesser', lastModified: new Date('2026-08-06'), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.loststreet.online/privacy', lastModified: new Date('2026-07-01'), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const guideRoutes = GUIDE_SLUGS.map(slug => ({
    url: `https://www.loststreet.online/guides/${slug}`,
    lastModified: new Date('2026-08-06'),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // High-value chronicle pages get priority 0.8, rest get 0.6
  const HIGH_VALUE = ['in', 'us', 'gb', 'de', 'fr', 'jp', 'br', 'au', 'ca', 'cn', 'ru', 'ng', 'za', 'mx', 'it', 'es', 'kr', 'id', 'tr', 'sa'];

  const countryRoutes = Object.keys(countriesData).map(code => ({
    url: `https://www.loststreet.online/chronicles/${code.toLowerCase()}`,
    lastModified: new Date('2026-08-06'),
    changeFrequency: 'monthly',
    priority: HIGH_VALUE.includes(code.toLowerCase()) ? 0.8 : 0.6,
  }));

  return [...baseRoutes, ...guideRoutes, ...countryRoutes];
}

