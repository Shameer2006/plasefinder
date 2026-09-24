import Link from 'next/link';
import { PageShell } from '@/app/components/SiteShell';

export const metadata = {
  title: 'LostStreet Blog — News, Strategy Guides, and Geography Articles',
  description: 'Read the latest news, updates, and geography articles from the LostStreet editorial team. Learn geography game strategies, updates about the world detective game, and flag guessing tips.',
  keywords: ['loststreet blog', 'geography game news', 'street view guesser updates', 'geography articles', 'flag guesser news', 'world detective game blog'],
  alternates: { canonical: 'https://www.loststreet.online/blog' },
  openGraph: {
    title: 'LostStreet Blog — News & Geography Articles',
    description: 'Read the latest news, updates, and geography articles from the LostStreet editorial team.',
    url: 'https://www.loststreet.online/blog',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LostStreet Blog — News & Geography Articles',
    description: 'Read the latest news, updates, and geography articles from the LostStreet editorial team.',
    images: ['/og-image.png'],
  },
};

export default function BlogIndex() {
  const posts = [
    {
      title: "Flag Guesser: A Fast-Paced Journey Through the World’s Flags",
      slug: "flag-guesser-journey",
      desc: "LostStreet’s Flag Guesser turns this everyday geography skill into a quick, competitive, and educational online game covering 196 sovereign flags.",
      date: "September 24, 2026",
      readTime: "4 min read",
      image: "/blog-flag-guesser-logo.png"
    },
    {
      title: "What Is LostStreet? The Online Game That Turns the World Into a Detective Puzzle",
      slug: "what-is-loststreet",
      desc: "Explore how LostStreet turns Google Street View into a global detective puzzle. Learn the mechanics, modes, and educational value of this free alternative.",
      date: "September 24, 2026",
      readTime: "8 min read",
      image: "/blog-loststreet-logo.png"
    }
  ];

  return (
    <>
      <style>{`
        .blog-card > div {
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s !important;
        }
        .blog-card:hover > div {
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 25px rgba(0,0,0,0.06) !important;
          border-color: #10b981 !important;
        }
      `}</style>
      <PageShell breadcrumb="Blog" badgeText="LostStreet Articles" badgeColor="green">
      <main style={{
        background: '#f9fafb',
        minHeight: '100vh',
        fontFamily: '"Inter", system-ui, sans-serif'
      }}>
        <section style={{
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 3vw, 2.5rem)',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: 900,
            color: '#111827',
            marginBottom: '1rem',
            fontFamily: '"Outfit", sans-serif',
            letterSpacing: '-0.02em'
          }}>
            The LostStreet <span style={{ color: '#10b981' }}>Blog</span>
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
            color: '#4b5563',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            News, game updates, and feature articles about geography exploration.
          </p>
        </section>

        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2.5rem) 4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none' }}
                className="blog-card"
              >
                <div style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderBottom: '1px solid #f3f4f6',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#fafafa'
                  }} />
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                      {post.title}
                    </h2>
                    <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
                      {post.desc}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#6b7280', fontSize: '0.85rem', fontWeight: 500, paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
    </>
  );
}
