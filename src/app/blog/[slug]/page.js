import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageShell } from '@/app/components/SiteShell';
import { getPostBySlug, getAllPostSlugs } from '@/lib/wordpress';

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found — LostStreet',
      description: 'The requested geography article could not be found.',
    };
  }

  const siteUrl = 'https://www.loststreet.online';
  const articleUrl = `${siteUrl}/blog/${slug}`;

  return {
    title: `${post.title} — LostStreet Blog`,
    description: post.desc,
    alternates: { canonical: articleUrl },
    openGraph: {
      title: `${post.title} — LostStreet Blog`,
      description: post.desc,
      url: articleUrl,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} — LostStreet Blog`,
      description: post.desc,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <style>{`
        .wp-content {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #1f2937;
          font-size: 1.125rem;
          line-height: 1.85;
          word-break: break-word;
        }
        .wp-content p {
          margin-bottom: 1.6rem;
        }
        .wp-content h2 {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.6rem, 3.5vw, 2.2rem);
          font-weight: 800;
          color: #111827;
          margin-top: 2.8rem;
          margin-bottom: 1rem;
          line-height: 1.3;
          letter-spacing: -0.02em;
        }
        .wp-content h3 {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.3rem, 2.5vw, 1.6rem);
          font-weight: 700;
          color: #1f2937;
          margin-top: 2.2rem;
          margin-bottom: 0.8rem;
          line-height: 1.35;
        }
        .wp-content a {
          color: #059669;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.15s ease;
        }
        .wp-content a:hover {
          color: #047857;
        }
        .wp-content ul, .wp-content ol {
          margin: 1.4rem 0 1.8rem 1.6rem;
          padding-left: 0.5rem;
        }
        .wp-content ul {
          list-style-type: disc;
        }
        .wp-content ol {
          list-style-type: decimal;
        }
        .wp-content li {
          margin-bottom: 0.6rem;
          padding-left: 0.25rem;
        }
        .wp-content blockquote {
          border-left: 4px solid #10b981;
          background: #f0fdf4;
          padding: 1.25rem 1.5rem;
          margin: 2rem 0;
          border-radius: 0 12px 12px 0;
          font-style: italic;
          color: #065f46;
        }
        .wp-content img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 2rem auto;
          display: block;
          border: 1px solid #e5e7eb;
        }
        .wp-content figure {
          margin: 2rem 0;
        }
        .wp-content figcaption {
          text-align: center;
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 0.5rem;
        }
        .wp-content pre {
          background: #111827;
          color: #f9fafb;
          padding: 1.25rem;
          border-radius: 12px;
          overflow-x: auto;
          font-size: 0.95rem;
          margin: 1.8rem 0;
        }
        .wp-content code {
          background: #f3f4f6;
          color: #111827;
          padding: 0.2rem 0.45rem;
          border-radius: 6px;
          font-size: 0.9em;
        }
        .wp-content pre code {
          background: transparent;
          color: inherit;
          padding: 0;
        }
      `}</style>

      <PageShell breadcrumb={post.title} badgeText="LostStreet Blog" badgeColor="green">
        <main style={{
          background: 'transparent',
          minHeight: '100vh',
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
        }}>
          <article style={{
            maxWidth: '820px',
            margin: '0 auto',
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e5e7eb',
            padding: 'clamp(1.5rem, 4vw, 3.5rem)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          }}>
            {/* Navigation back */}
            <div style={{ marginBottom: '2rem' }}>
              <Link 
                href="/blog"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  color: '#4b5563',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'color 0.15s',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to all articles
              </Link>
            </div>

            {/* Post Header */}
            <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '2rem' }}>
              <h1 
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                  fontWeight: 900,
                  color: '#111827',
                  lineHeight: 1.25,
                  marginBottom: '1.25rem',
                  fontFamily: '"Outfit", sans-serif',
                  letterSpacing: '-0.02em',
                }}
                dangerouslySetInnerHTML={{ __html: post.title }}
              />

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1rem',
                color: '#6b7280',
                fontSize: '0.9rem',
                fontWeight: 500,
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#111827', fontWeight: 600 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  {post.author}
                </span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span style={{ background: '#ecfdf5', color: '#065f46', padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600 }}>
                  {post.readTime}
                </span>
              </div>
            </header>

            {/* Featured Image */}
            {post.image && post.image !== '/blog-loststreet-logo.png' && (
              <div style={{
                width: '100%',
                maxHeight: '440px',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '2.8rem',
                border: '1px solid #e5e7eb',
                backgroundColor: '#f3f4f6',
              }}>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                />
              </div>
            )}

            {/* Post Content */}
            <div 
              className="wp-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Bottom Footer Callout */}
            <div style={{
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '1px solid #f3f4f6',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <Link 
                href="/blog"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.95rem',
                  color: '#059669',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                ← Read more articles
              </Link>

              <Link
                href="/"
                style={{
                  background: '#10b981',
                  color: '#ffffff',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)',
                }}
              >
                Play LostStreet Free
              </Link>
            </div>
          </article>
        </main>
      </PageShell>
    </>
  );
}
