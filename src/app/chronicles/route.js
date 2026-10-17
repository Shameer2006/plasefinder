/**
 * Permanent 410 Gone Route Handler for /chronicles
 * Signals to Googlebot and other search engines that this URL and section
 * have been permanently deleted and must be purged from search indexes.
 */

const HEADERS = {
  'Content-Type': 'text/plain; charset=utf-8',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Cache-Control': 'public, max-age=31536000, immutable',
};

export async function GET() {
  return new Response('410 Gone: The chronicles section has been permanently removed.', {
    status: 410,
    statusText: 'Gone',
    headers: HEADERS,
  });
}

export async function HEAD() {
  return new Response(null, {
    status: 410,
    statusText: 'Gone',
    headers: HEADERS,
  });
}
