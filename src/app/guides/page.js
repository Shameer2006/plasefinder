'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GuidesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const guides = [
    {
      title: "25 Pro Street Detective Secrets to Guess Any Road on Earth",
      slug: "25-pro-street-view-geoguessr-secrets",
      desc: "Discover 25 clever clues used by expert players — from road posts and camera hints to sun direction tricks.",
      date: "August 9, 2026",
      readTime: "12 min read",
      category: "Street View Meta",
      icon: "🏆",
      featured: true
    },
    {
      title: "Google Street View Camera Generations Guide (Gen 1 to Gen 4)",
      slug: "street-view-camera-generations-guide",
      desc: "Learn to recognize Gen 1 blur, Gen 2 purple sun halos, Gen 3 clarity, and Gen 4 ultra-HDR to date and locate Street View coverage instantly.",
      date: "August 25, 2026",
      readTime: "10 min read",
      category: "Street View Meta",
      icon: "📷"
    },
    {
      title: "How to Identify Latin American Countries in Street View",
      slug: "latin-america-street-view-guide",
      desc: "Master Colombian cross-back signs, Brazilian black sign backs, Mexican holey poles, and Chilean white centerlines.",
      date: "August 26, 2026",
      readTime: "9 min read",
      category: "Continent Guides",
      icon: "🌄"
    },
    {
      title: "How to Guess Locations from Google Street View",
      slug: "how-to-guess-locations-from-street-view",
      desc: "Master the art of geography guessing games with these pro tips on identifying bollards, license plates, architecture, and sun position.",
      date: "August 20, 2026",
      readTime: "8 min read",
      category: "Street View Meta",
      icon: "🔍"
    },
    {
      title: "Top Free World Exploration & Geography Games in 2026",
      slug: "best-free-geoguessr-alternatives",
      desc: "Love exploring mystery streets? Here is our guide to the best free, unlimited map guessing games you can play right in your browser.",
      date: "August 15, 2026",
      readTime: "5 min read",
      category: "Strategy & Reviews",
      icon: "🎮"
    },
    {
      title: "The 10 Hardest Countries to Guess in Street View",
      slug: "hardest-countries-to-guess",
      desc: "These countries are notoriously difficult to identify. Learn what makes them hard and the specific clues to tell them apart.",
      date: "August 25, 2026",
      readTime: "7 min read",
      category: "Street View Meta",
      icon: "⛰️"
    },
    {
      title: "How to Get Better at Geography Guessing Games",
      slug: "how-to-improve-at-geography-games",
      desc: "Practical tips and strategies to improve your score — from beginner fundamentals to advanced meta-knowledge and memory techniques.",
      date: "August 28, 2026",
      readTime: "6 min read",
      category: "Strategy & Reviews",
      icon: "📈"
    },
    {
      title: "The Ultimate Street View Clues Guide",
      slug: "geography-clues-guide",
      desc: "A comprehensive reference to every visual clue in Google Street View — bollards, utility poles, road markings, guardrails, and signs.",
      date: "September 1, 2026",
      readTime: "10 min read",
      category: "Street View Meta",
      icon: "🛑"
    },
    {
      title: "How to Identify African Countries in Street View",
      slug: "africa-street-view-guide",
      desc: "A complete guide to identifying African countries in geography games, covering West, East, Southern, and North Africa.",
      date: "September 5, 2026",
      readTime: "7 min read",
      category: "Continent Guides",
      icon: "🌍"
    },
    {
      title: "How to Identify Asian Countries in Street View",
      slug: "asia-street-view-guide",
      desc: "Learn the visual clues for East Asia, Southeast Asia, South Asia, and Central Asia in geography guessing games.",
      date: "September 8, 2026",
      readTime: "8 min read",
      category: "Continent Guides",
      icon: "🌏"
    },
    {
      title: "How to Identify European Countries in Street View",
      slug: "europe-street-view-guide",
      desc: "A complete guide to identifying European countries — Western, Eastern, Northern, and Southern Europe.",
      date: "September 10, 2026",
      readTime: "9 min read",
      category: "Continent Guides",
      icon: "🏰"
    },
    {
      title: "How to Identify Every Country by Its Flag",
      slug: "flag-identification-guide",
      desc: "World flags grouped by visual pattern. Learn tricolours, crosses, stars, crescents, and the most easily confused flag pairs.",
      date: "September 12, 2026",
      readTime: "6 min read",
      category: "Flag & Strategy",
      icon: "🚩"
    },
    {
      title: "How to Win at Multiplayer Geography Games",
      slug: "multiplayer-geography-tips",
      desc: "Advanced strategies for winning 1v1 duels — speed techniques, ELO management, and psychological tactics.",
      date: "September 15, 2026",
      readTime: "7 min read",
      category: "Flag & Strategy",
      icon: "⚡"
    }
  ];

  const categories = ['All', 'Street View Meta', 'Continent Guides', 'Flag & Strategy', 'Strategy & Reviews'];

  const filteredGuides = guides.filter(g => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term ||
                          g.title.toLowerCase().includes(term) ||
                          g.desc.toLowerCase().includes(term) ||
                          g.category.toLowerCase().includes(term);
    const matchesCategory = selectedCategory === 'All' || g.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredGuide = guides.find(g => g.featured) || guides[0];

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.12) 0%, transparent 60%), linear-gradient(180deg, #0b0f19 0%, #080b12 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
      overflowX: 'hidden'
    }}>
      {/* ── SUB-NAV BAR (below SiteShell) ────────────────────────── */}
      <div style={{
        background: 'rgba(11, 15, 25, 0.85)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.75rem clamp(1rem, 3vw, 2.5rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: 'white',
            padding: '7px 14px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '700',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            transition: 'all 0.2s ease',
            touchAction: 'manipulation',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Back to Menu</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981, #3b82f6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '900', fontSize: '1rem', color: 'white',
              boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)'
            }}>
              📚
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.01em', color: 'white' }}>
              LostStreet <span style={{ color: '#34d399' }}>Guides</span>
            </span>
          </div>
        </div>

        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: '#34d399',
          padding: '5px 12px',
          borderRadius: '10px',
          fontSize: '0.8rem',
          fontWeight: 800,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span>{guides.length} Pro Masterclasses</span>
        </div>
      </div>

      {/* ── HERO BANNER ──────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.5rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.95) 50%, rgba(59, 130, 246, 0.12) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: 'clamp(1.25rem, 3.5vw, 2.5rem)',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          {/* Ambient Glow */}
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', background: 'rgba(16, 185, 129, 0.15)', filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 800,
              marginBottom: '0.85rem'
            }}>
              <span>🧠 KNOWLEDGE ACADEMY</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(1.65rem, 4.5vw, 3rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              margin: '0 0 0.85rem 0',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              wordBreak: 'break-word',
            }}>
              Street View Meta &amp; Geography Guides
            </h1>

            <p style={{
              fontSize: 'clamp(0.92rem, 2vw, 1.1rem)',
              color: '#94a3b8',
              lineHeight: 1.6,
              margin: '0 0 1.25rem 0',
              maxWidth: '680px'
            }}>
              Learn to read bollards, utility poles, license plates, architecture, and sun position to pinpoint any world location instantly.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span style={featureTagStyle}>🛑 Bollards &amp; Poles</span>
              <span style={featureTagStyle}>🚘 License Plates</span>
              <span style={featureTagStyle}>🌍 Continent Clues</span>
              <span style={featureTagStyle}>⚡ 1v1 Duel Strategy</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED SPOTLIGHT ARTICLE ───────────────────────────────── */}
      {selectedCategory === 'All' && !searchTerm && featuredGuide && (
        <section style={{
          padding: '0 clamp(1rem, 3vw, 2.5rem) clamp(1.25rem, 3vw, 2rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <Link href={`/guides/${featuredGuide.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(18, 24, 38, 0.9) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '20px',
              padding: 'clamp(1.25rem, 3vw, 2rem)',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
            }} className="featured-card-hover">
              <div style={{ flex: '1 1 300px', minWidth: '260px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{
                    background: '#10b981', color: '#0f172a',
                    fontWeight: 900, fontSize: '0.72rem',
                    padding: '3px 10px', borderRadius: '10px', textTransform: 'uppercase'
                  }}>
                    FEATURED MASTERCLASS
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                    {featuredGuide.readTime}
                  </span>
                </div>
                <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.8rem)', fontWeight: 900, color: 'white', margin: '0 0 8px 0', lineHeight: 1.25, wordBreak: 'break-word' }}>
                  {featuredGuide.icon} {featuredGuide.title}
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: 'clamp(0.88rem, 1.8vw, 0.98rem)', lineHeight: 1.6, margin: 0, maxWidth: '750px' }}>
                  {featuredGuide.desc}
                </p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                padding: '10px 22px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.92rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
                minHeight: '44px',
                alignSelf: 'flex-start',
              }}>
                Read Masterclass →
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── SEARCH & CATEGORY FILTER TABS ────────────────────────────── */}
      <section style={{
        padding: '0 clamp(1rem, 3vw, 2.5rem) clamp(1.25rem, 2.5vw, 2rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          background: 'rgba(18, 24, 38, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: 'clamp(0.85rem, 2.5vw, 1.25rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}>
            {/* Search Bar */}
            <div style={{ position: 'relative', flex: '1 1 240px', minWidth: '220px' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', display: 'flex' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input 
                type="text" 
                placeholder="Search guides (e.g. bollards, Africa, flags)..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 36px 11px 42px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: searchTerm ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease',
                  minHeight: '44px',
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#94a3b8',
                    width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem'
                  }}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
              Showing <strong style={{ color: '#34d399' }}>{filteredGuides.length}</strong> guides
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '4px',
            maxWidth: '100%',
            whiteSpace: 'nowrap',
            WebkitOverflowScrolling: 'touch',
          }} className="no-scrollbar">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    minHeight: '40px',
                    background: isSelected ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(255, 255, 255, 0.05)',
                    border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isSelected ? 'white' : '#94a3b8',
                    fontWeight: isSelected ? 800 : 600,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s ease',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    boxShadow: isSelected ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none',
                    flexShrink: 0,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GUIDES GRID ──────────────────────────────────────────────── */}
      <section style={{
        flex: 1,
        padding: '0 clamp(1rem, 3vw, 2.5rem) clamp(2rem, 5vw, 4rem)',
        maxWidth: '1300px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {filteredGuides.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 1rem',
            color: '#94a3b8',
            textAlign: 'center'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.75rem' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <h2 style={{ color: 'white', margin: 0, fontWeight: 800, fontSize: '1.25rem' }}>No matching guides found</h2>
            <p style={{ fontSize: '0.9rem', marginTop: '6px', color: '#64748b' }}>Try adjusting your search terms or category filter.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(14px, 2.5vw, 22px)'
          }}>
            {filteredGuides.map(guide => (
              <Link href={`/guides/${guide.slug}`} key={guide.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                <article style={{
                  background: 'rgba(18, 24, 38, 0.75)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '18px',
                  padding: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  boxSizing: 'border-box',
                  transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                }} className="guide-card-interactive">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{
                        background: 'rgba(56, 189, 248, 0.12)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        color: '#38bdf8',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 800
                      }}>
                        {guide.category}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                        {guide.readTime}
                      </span>
                    </div>

                    <h2 style={{
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.22rem)',
                      fontWeight: 800,
                      color: 'white',
                      margin: '0 0 8px 0',
                      lineHeight: 1.35,
                      wordBreak: 'break-word',
                    }}>
                      {guide.icon} {guide.title}
                    </h2>

                    <p style={{
                      color: '#cbd5e1',
                      fontSize: '0.88rem',
                      lineHeight: 1.55,
                      margin: 0
                    }}>
                      {guide.desc}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '1.1rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                      {guide.date}
                    </span>
                    <span style={{
                      color: '#34d399',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      Read Guide →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .guide-card-interactive:hover {
          transform: translateY(-5px);
          border-color: rgba(16, 185, 129, 0.4) !important;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(16, 185, 129, 0.15) !important;
        }
        .featured-card-hover:hover {
          transform: translateY(-3px);
          border-color: rgba(16, 185, 129, 0.6) !important;
        }
      `}} />
    </div>
  );
}

const featureTagStyle = {
  background: 'rgba(255, 255, 255, 0.06)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  color: '#e2e8f0',
  padding: '5px 12px',
  borderRadius: '20px',
  fontSize: '0.78rem',
  fontWeight: 700
};
