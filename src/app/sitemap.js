export default function sitemap() {
  return [
    {
      url: 'https://www.loststreet.online',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // Add additional dynamic routes here later if they exist (e.g. /play, /about)
  ]
}