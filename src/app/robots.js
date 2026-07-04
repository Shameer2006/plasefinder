export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/about', '/leaderboard'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
      }
    ],
    sitemap: 'https://www.loststreet.online/sitemap.xml',
  }
}