/**
 * WordPress.com Headless API Client for LostStreet
 * Target Site: loststreetcmc0.wordpress.com
 */

const WP_SITE = 'loststreetcmc0.wordpress.com';
const WP_API = `https://public-api.wordpress.com/wp/v2/sites/${WP_SITE}`;

// In development: 0s (instant updates on every page refresh)
// In production: 60s (auto-refreshes within 1 minute of publishing/deleting)
const isDev = process.env.NODE_ENV === 'development';
const REVALIDATE_SECONDS = isDev ? 0 : 60;

/**
 * Fetch list of published posts with embedded media and author data
 */
export async function getAllPosts(page = 1, perPage = 20) {
  try {
    const res = await fetch(`${WP_API}/posts?_embed&per_page=${perPage}&page=${page}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.warn(`[WordPress] Fetch error: ${res.status} ${res.statusText}`);
      return [];
    }

    const posts = await res.json();
    if (!Array.isArray(posts)) return [];

    return posts.map(formatPost);
  } catch (error) {
    console.error('[WordPress] Failed to fetch posts:', error);
    return [];
  }
}

/**
 * Fetch a single post by URL slug
 */
export async function getPostBySlug(slug) {
  if (!slug) return null;
  try {
    const res = await fetch(`${WP_API}/posts?slug=${encodeURIComponent(slug)}&_embed`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) return null;

    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) return null;

    return formatPost(posts[0]);
  } catch (error) {
    console.error(`[WordPress] Failed to fetch post by slug "${slug}":`, error);
    return null;
  }
}

/**
 * Get all slugs for static path generation
 */
export async function getAllPostSlugs() {
  try {
    const res = await fetch(`${WP_API}/posts?_fields=slug&per_page=100`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) return [];
    const posts = await res.json();
    if (!Array.isArray(posts)) return [];

    return posts.map((p) => p.slug).filter(Boolean);
  } catch (error) {
    console.error('[WordPress] Failed to fetch post slugs:', error);
    return [];
  }
}

/**
 * Clean & normalize post object
 */
function formatPost(post) {
  // Extract featured image from _embedded
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const imageUrl = featuredMedia?.source_url || '/blog-loststreet-logo.png';

  // Format date: "October 19, 2026"
  const dateObj = new Date(post.date);
  const formattedDate = isNaN(dateObj.getTime())
    ? 'Recently Published'
    : dateObj.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

  // Calculate approximate read time
  const cleanContentText = (post.content?.rendered || '').replace(/<[^>]+>/g, ' ');
  const wordCount = cleanContentText.split(/\s+/).filter(Boolean).length;
  const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  // Strip HTML from excerpt
  const cleanExcerpt = (post.excerpt?.rendered || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\[&hellip;\]/g, '...')
    .replace(/\s+/g, ' ')
    .trim();

  // Author extraction
  const authorName = post._embedded?.author?.[0]?.name || 'LostStreet Editorial';

  return {
    id: post.id,
    slug: post.slug,
    title: post.title?.rendered || 'Untitled Article',
    desc: cleanExcerpt || 'Read the full article on LostStreet.',
    content: post.content?.rendered || '',
    date: formattedDate,
    readTime,
    image: imageUrl,
    author: authorName,
  };
}
