export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: '/api/',
      }
    ],
    sitemap: 'https://www.loststreet.online/sitemap.xml',
  }
}