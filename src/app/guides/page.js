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
      image: "/kenya-snorkel-car.jpg",
      featured: true
    },
    {
      title: "Google Street View Camera Generations Guide (Gen 1 to Gen 4)",
      slug: "street-view-camera-generations-guide",
      desc: "Learn to recognize Gen 1 blur, Gen 2 purple sun halos, Gen 3 clarity, and Gen 4 ultra-HDR to date and locate Street View coverage instantly.",
      date: "August 25, 2026",
      readTime: "10 min read",
      category: "Street View Meta",
      icon: "📷",
      image: "/guides/google-car-v3.png"
    },
    {
      title: "How to Identify Latin American Countries in Street View",
      slug: "latin-america-street-view-guide",
      desc: "Master Colombian cross-back signs, Brazilian black sign backs, Mexican holey poles, and Chilean white centerlines.",
      date: "August 26, 2026",
      readTime: "9 min read",
      category: "Continent Guides",
      icon: "🌄",
      image: "/colombian-road-sign.jpg"
    },
    {
      title: "How to Guess Locations from Google Street View",
      slug: "how-to-guess-locations-from-street-view",
      desc: "Master the art of geography guessing games with these pro tips on identifying bollards, license plates, architecture, and sun position.",
      date: "August 20, 2026",
      readTime: "8 min read",
      category: "Street View Meta",
      icon: "🔍",
      image: "/mas-de-carles-sign.png"
    },
    {
      title: "Top Free World Exploration & Geography Games in 2026",
      slug: "best-free-geoguessr-alternatives",
      desc: "Love exploring mystery streets? Here is our guide to the best free, unlimited map guessing games you can play right in your browser.",
      date: "August 15, 2026",
      readTime: "5 min read",
      category: "Strategy & Reviews",
      icon: "🎮",
      image: "/Screenshot 2026-08-16 195723.png"
    },
    {
      title: "The 10 Hardest Countries to Guess in Street View",
      slug: "hardest-countries-to-guess",
      desc: "These countries are notoriously difficult to identify. Learn what makes them hard and the specific clues to tell them apart.",
      date: "August 25, 2026",
      readTime: "7 min read",
      category: "Street View Meta",
      icon: "⛰️",
      image: "/hardest-img1.jpg"
    },
    {
      title: "How to Get Better at Geography Guessing Games",
      slug: "how-to-improve-at-geography-games",
      desc: "Practical tips and strategies to improve your score — from beginner fundamentals to advanced meta-knowledge and memory techniques.",
      date: "August 28, 2026",
      readTime: "6 min read",
      category: "Strategy & Reviews",
      icon: "📈",
      image: "/austrian-delineator-bollard.jpg"
    },
    {
      title: "The Ultimate Street View Clues Guide",
      slug: "geography-clues-guide",
      desc: "A comprehensive reference to every visual clue in Google Street View — bollards, utility poles, road markings, guardrails, and signs.",
      date: "September 1, 2026",
      readTime: "10 min read",
      category: "Street View Meta",
      icon: "🛑",
      image: "/french-holey-pole.jpg"
    },
    {
      title: "How to Identify African Countries in Street View",
      slug: "africa-street-view-guide",
      desc: "A complete guide to identifying African countries in geography games, covering West, East, Southern, and North Africa.",
      date: "September 5, 2026",
      readTime: "7 min read",
      category: "Continent Guides",
      icon: "🌍",
      image: "/nigeria-follow-car-meta.jpg"
    },
    {
      title: "How to Identify Asian Countries in Street View",
      slug: "asia-street-view-guide",
      desc: "Learn the visual clues for East Asia, Southeast Asia, South Asia, and Central Asia in geography guessing games.",
      date: "September 8, 2026",
      readTime: "8 min read",
      category: "Continent Guides",
      icon: "🌏",
      image: "/kyrgyzstan-city.png"
    },
    {
      title: "How to Identify European Countries in Street View",
      slug: "europe-street-view-guide",
      desc: "A complete guide to identifying European countries — Western, Eastern, Northern, and Southern Europe.",
      date: "September 10, 2026",
      readTime: "9 min read",
      category: "Continent Guides",
      icon: "🏰",
      image: "/polish-town-entry-sign.jpg"
    },
    {
      title: "How to Identify Every Country by Its Flag",
      slug: "flag-identification-guide",
      desc: "World flags grouped by visual pattern. Learn tricolours, crosses, stars, crescents, and the most easily confused flag pairs.",
      date: "September 12, 2026",
      readTime: "6 min read",
      category: "Flag & Strategy",
      icon: "🚩",
      image: "/og-image.png"
    },
    {
      title: "How to Win at Multiplayer Geography Games",
      slug: "multiplayer-geography-tips",
      desc: "Advanced strategies for winning 1v1 duels — speed techniques, ELO management, and psychological tactics.",
      date: "September 15, 2026",
      readTime: "7 min read",
      category: "Flag & Strategy",
      icon: "⚡",
      image: "/Screenshot 2026-08-16 202137.png"
    }
  ];

  const categories = ['All', 'Street View Meta', 'Continent Guides', 'Flag & Strategy', 'Strategy & Reviews'];

  const categoryBadgeStyles = {
    'Street View Meta': { bg: '#eff6ff', color: '#1d4ed8', border: '#dbeafe' },
    'Continent Guides': { bg: '#f0fdf4', color: '#15803d', border: '#dcfce7' },
    'Flag & Strategy': { bg: '#fef2f2', color: '#b91c1c', border: '#fee2e2' },
    'Strategy & Reviews': { bg: '#fffbeb', color: '#b45309', border: '#fef3c7' }
  };

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
      background: '#fafafa',
      color: '#111827',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Outfit", system-ui, -apple-system, sans-serif',
      overflowX: 'hidden'
    }}>
      {/* ── BREADCRUMB / SUB-NAV BAR ─────────────────────────────────── */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '0.85rem clamp(1rem, 3vw, 2.5rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link href="/" style={{
            background: '#f3f4f6',
            border: '1px solid #e5e7eb',
            color: '#1f2937',
            padding: '7px 14px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '700',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            transition: 'all 0.2s ease',
            touchAction: 'manipulation'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Back to Game</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '8px',
              background: '#111827',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.95rem', color: 'white'
            }}>
              📖
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: '#111827' }}>
              LostStreet <span style={{ color: '#059669' }}>Guides</span>
            </span>
          </div>
        </div>

        <div style={{
          background: '#f3f4f6',
          border: '1px solid #e5e7eb',
          color: '#4b5563',
          padding: '5px 14px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span>{guides.length} Pro Masterclasses</span>
        </div>
      </div>

      {/* ── EDITORIAL HERO SECTION ───────────────────────────────────── */}
      <section style={{
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 2.5rem)',
        maxWidth: '1240px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#047857',
            padding: '4px 14px',
            borderRadius: '20px',
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}>
            <span>THE LOSTSTREET JOURNAL &bull; KNOWLEDGE ACADEMY</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            margin: '0 0 1rem 0',
            letterSpacing: '-0.03em',
            color: '#111827',
            wordBreak: 'break-word'
          }}>
            Street View Meta &amp; Geography Masterclasses
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.18rem)',
            color: '#4b5563',
            lineHeight: 1.65,
            margin: '0 auto 1.75rem auto',
            maxWidth: '680px'
          }}>
            Master road clues, utility poles, bollards, camera generations, and geographic meta to pinpoint any street on Earth with surgical precision.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {['🛑 Bollards & Poles', '🚘 Camera Gens & Plates', '🌍 Continent Clues', '⚡ 1v1 Duel Strategy'].map(tag => (
              <span key={tag} style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                color: '#374151',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: 600,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED MAGAZINE ARTICLE SPOTLIGHT ───────────────────────── */}
      {selectedCategory === 'All' && !searchTerm && featuredGuide && (
        <section style={{
          padding: '0 clamp(1rem, 3vw, 2.5rem) clamp(2rem, 4vw, 3rem)',
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <Link href={`/guides/${featuredGuide.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '24px',
              padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              transition: 'all 0.25s ease',
              boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)'
            }} className="featured-card-hover">
              
              {/* Left Details */}
              <div style={{ flex: '1 1 360px', minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{
                    background: '#111827',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}>
                    Featured Masterclass
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 600 }}>
                    {featuredGuide.readTime} &bull; {featuredGuide.date}
                  </span>
                </div>

                <h2 style={{
                  fontSize: 'clamp(1.45rem, 3.2vw, 2.1rem)',
                  fontWeight: 900,
                  color: '#111827',
                  margin: '0 0 12px 0',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  wordBreak: 'break-word'
                }}>
                  {featuredGuide.title}
                </h2>

                <p style={{
                  color: '#4b5563',
                  fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
                  lineHeight: 1.65,
                  margin: '0 0 1.5rem 0',
                  maxWidth: '650px'
                }}>
                  {featuredGuide.desc}
                </p>

                <div style={{
                  background: '#111827',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(17, 24, 39, 0.25)',
                  transition: 'background 0.2s ease'
                }}>
                  Read Masterclass &rarr;
                </div>
              </div>

              {/* Right Visual Image */}
              {featuredGuide.image && (
                <div style={{
                  flex: '1 1 320px',
                  maxWidth: '480px',
                  width: '100%',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  background: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={featuredGuide.image}
                    alt={featuredGuide.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      maxHeight: '280px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
              )}

            </div>
          </Link>
        </section>
      )}

      {/* ── SEARCH & CATEGORY FILTER TABS ────────────────────────────── */}
      <section style={{
        padding: '0 clamp(1rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 2rem)',
        maxWidth: '1240px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '20px',
          padding: 'clamp(1rem, 2.5vw, 1.25rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1 1 280px', minWidth: '220px' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', display: 'flex' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input
                type="text"
                placeholder="Search guides (e.g. bollards, camera gens, flags)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 36px 11px 42px',
                  background: '#f9fafb',
                  border: searchTerm ? '1px solid #111827' : '1px solid #e5e7eb',
                  borderRadius: '12px',
                  color: '#111827',
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease',
                  minHeight: '44px'
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: '#e5e7eb', border: 'none', color: '#4b5563',
                    width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem'
                  }}
                  title="Clear search"
                >
                  &times;
                </button>
              )}
            </div>

            <div style={{ color: '#6b7280', fontSize: '0.88rem', fontWeight: 600 }}>
              Showing <strong style={{ color: '#111827' }}>{filteredGuides.length}</strong> masterclasses
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '2px',
            maxWidth: '100%',
            whiteSpace: 'nowrap',
            WebkitOverflowScrolling: 'touch'
          }} className="no-scrollbar">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 18px',
                    minHeight: '40px',
                    background: isSelected ? '#111827' : '#f3f4f6',
                    border: isSelected ? '1px solid #111827' : '1px solid #e5e7eb',
                    color: isSelected ? '#ffffff' : '#4b5563',
                    fontWeight: isSelected ? 800 : 600,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    transition: 'all 0.2s ease',
                    touchAction: 'manipulation',
                    boxShadow: isSelected ? '0 2px 8px rgba(17, 24, 39, 0.2)' : 'none',
                    flexShrink: 0
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
        padding: '0 clamp(1rem, 3vw, 2.5rem) clamp(3rem, 6vw, 5rem)',
        maxWidth: '1240px',
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
            padding: '5rem 1rem',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <h2 style={{ color: '#111827', margin: 0, fontWeight: 800, fontSize: '1.3rem' }}>No matching guides found</h2>
            <p style={{ fontSize: '0.95rem', marginTop: '6px', color: '#6b7280' }}>Try adjusting your search terms or selecting another category.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
            gap: 'clamp(18px, 3vw, 28px)'
          }}>
            {filteredGuides.map(guide => {
              const badgeStyle = categoryBadgeStyles[guide.category] || { bg: '#f3f4f6', color: '#374151', border: '#e5e7eb' };

              return (
                <Link href={`/guides/${guide.slug}`} key={guide.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <article style={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    boxSizing: 'border-box',
                    transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                  }} className="guide-card-white">
                    
                    {/* Thumbnail Image Banner */}
                    {guide.image ? (
                      <div style={{ width: '100%', height: '190px', overflow: 'hidden', background: '#f3f4f6' }}>
                        <img
                          src={guide.image}
                          alt={guide.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform 0.35s ease'
                          }}
                          className="guide-card-img"
                        />
                      </div>
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '140px',
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem'
                      }}>
                        {guide.icon}
                      </div>
                    )}

                    {/* Card Content */}
                    <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{
                          background: badgeStyle.bg,
                          border: `1px solid ${badgeStyle.border}`,
                          color: badgeStyle.color,
                          padding: '3px 10px',
                          borderRadius: '8px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          letterSpacing: '0.3px'
                        }}>
                          {guide.category}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 600 }}>
                          {guide.readTime}
                        </span>
                      </div>

                      <h2 style={{
                        fontSize: '1.18rem',
                        fontWeight: 800,
                        color: '#111827',
                        margin: '0 0 10px 0',
                        lineHeight: 1.35,
                        wordBreak: 'break-word',
                        letterSpacing: '-0.01em'
                      }}>
                        {guide.title}
                      </h2>

                      <p style={{
                        color: '#4b5563',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        margin: '0 0 1.2rem 0',
                        flex: 1
                      }}>
                        {guide.desc}
                      </p>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.9rem',
                        borderTop: '1px solid #f3f4f6',
                        marginTop: 'auto'
                      }}>
                        <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 600 }}>
                          {guide.date}
                        </span>
                        <span style={{
                          color: '#059669',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }} className="read-guide-link">
                          Read Guide &rarr;
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ── CLASSICAL EDITORIAL CALLOUT FOOTER ───────────────────────── */}
      <section style={{
        background: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1rem, 3vw, 2.5rem)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}>🌍</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#111827', margin: '0 0 0.75rem 0', letterSpacing: '-0.02em' }}>
            Ready to Test Your Geography Skills?
          </h2>
          <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.65, margin: '0 auto 1.75rem auto' }}>
            Put these masterclass tips to the test in unlimited free games, random street view drops, 1v1 duels, and flag quizzes.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{
              background: '#111827',
              color: '#ffffff',
              padding: '13px 28px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '0.98rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(17, 24, 39, 0.2)'
            }}>
              Play LostStreet Free &rarr;
            </Link>
            <Link href="/flag-guesser" style={{
              background: '#f3f4f6',
              border: '1px solid #e5e7eb',
              color: '#1f2937',
              padding: '13px 28px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '0.98rem',
              textDecoration: 'none'
            }}>
              Take Flag Quiz 🏁
            </Link>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .guide-card-white:hover {
          transform: translateY(-5px);
          border-color: #cbd5e1 !important;
          box-shadow: 0 16px 36px -6px rgba(0, 0, 0, 0.08) !important;
        }
        .guide-card-white:hover .guide-card-img {
          transform: scale(1.04);
        }
        .guide-card-white:hover .read-guide-link {
          color: #047857 !important;
          gap: 7px !important;
        }
        .featured-card-hover:hover {
          transform: translateY(-4px);
          border-color: #cbd5e1 !important;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1) !important;
        }
      `}} />
    </div>
  );
}
