'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ChronicleClientView({ countryData, countriesList }) {
  const [exploredCountries, setExploredCountries] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const saved = localStorage.getItem('explored_countries');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setExploredCountries(parsed);
        
        const lowerCode = countryData.code.toLowerCase();
        if (!parsed.includes(lowerCode)) {
          const updated = [...parsed, lowerCode];
          setExploredCountries(updated);
          localStorage.setItem('explored_countries', JSON.stringify(updated));
        }
      } catch (e) {
        console.error("Failed to parse explored countries", e);
      }
    } else {
      const lowerCode = countryData.code.toLowerCase();
      setExploredCountries([lowerCode]);
      localStorage.setItem('explored_countries', JSON.stringify([lowerCode]));
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [countryData.code]);

  const toggleExplored = () => {
    const lowerCode = countryData.code.toLowerCase();
    let updated;
    if (exploredCountries.includes(lowerCode)) {
      updated = exploredCountries.filter(c => c !== lowerCode);
    } else {
      updated = [...exploredCountries, lowerCode];
    }
    setExploredCountries(updated);
    localStorage.setItem('explored_countries', JSON.stringify(updated));
  };

  const isExplored = exploredCountries.includes(countryData.code.toLowerCase());

  // Finding next and previous country indices in list
  const currentIndex = countriesList.findIndex(c => c.code.toLowerCase() === countryData.code.toLowerCase());
  const prevIndex = currentIndex === 0 ? countriesList.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === countriesList.length - 1 ? 0 : currentIndex + 1;

  const prevCountry = countriesList[prevIndex];
  const nextCountry = countriesList[nextIndex];

  const headingStyle = {
    fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
    fontWeight: 800,
    color: '#111827',
    marginTop: 'clamp(2rem, 5vw, 3.25rem)',
    marginBottom: 'clamp(0.65rem, 2vw, 1rem)',
    fontFamily: '"Merriweather", "Georgia", serif',
    lineHeight: 1.35,
    wordBreak: 'break-word',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafafa',
      color: '#111827',
      fontFamily: '"Merriweather", "Georgia", serif',
      lineHeight: 1.8
    }}>
      {/* ── BREADCRUMB & NAVIGATION SUB-NAV BAR (RESPONSIVE) ─────────── */}
      <nav aria-label="Chronicle Navigation" style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: isMobile ? '0.65rem 1rem' : '0.75rem clamp(1rem, 3vw, 2.5rem)',
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          maxWidth: '780px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: 'space-between',
          gap: isMobile ? '0.65rem' : '1rem'
        }}>
          {/* Top Line: Breadcrumb + Explored Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
              <Link href="/chronicles" style={{
                color: '#4b5563',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.84rem',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                <span>Chronicles</span>
              </Link>
              <span style={{ color: '#d1d5db' }}>/</span>
              <span style={{
                color: '#111827',
                fontWeight: '700',
                fontSize: '0.84rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {countryData.name}
              </span>
            </div>

            {/* Explored Pill */}
            <button
              onClick={toggleExplored}
              aria-label={isExplored ? "Marked as explored" : "Mark country as explored"}
              style={{
                background: isExplored ? '#ecfdf5' : '#f3f4f6',
                border: `1px solid ${isExplored ? '#10b981' : '#d1d5db'}`,
                color: isExplored ? '#065f46' : '#4b5563',
                padding: '4px 10px',
                borderRadius: '16px',
                fontSize: '0.75rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                flexShrink: 0,
                transition: 'all 0.2s'
              }}
            >
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: isExplored ? '#10b981' : '#9ca3af'
              }}></span>
              {isExplored ? 'Explored' : 'Mark as Explored'}
            </button>
          </div>

          {/* Bottom Line on Mobile / Right Side on Desktop: Prev & Next Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            width: isMobile ? '100%' : 'auto'
          }}>
            <Link 
              href={`/chronicles/${prevCountry.code.toLowerCase()}`}
              style={{
                color: '#4b5563',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontWeight: '600',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                background: '#ffffff',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block'
              }}
              title={`Previous: ${prevCountry.name}`}
            >
              ← {prevCountry.name}
            </Link>

            <Link 
              href={`/chronicles/${nextCountry.code.toLowerCase()}`}
              style={{
                color: '#4b5563',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontWeight: '600',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                background: '#ffffff',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block'
              }}
              title={`Next: ${nextCountry.name}`}
            >
              {nextCountry.name} →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── MAIN ARTICLE CONTAINER ───────────────────────────────────── */}
      <main style={{
        padding: isMobile ? '1.5rem 1rem 3rem 1rem' : 'clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 3vw, 1.5rem)',
        maxWidth: '780px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        {/* ARTICLE HEADER */}
        <header style={{ marginBottom: '1.75rem', fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
            <span style={{
              background: '#f0fdf4',
              color: '#166534',
              border: '1px solid #bbf7d0',
              padding: '3px 8px',
              borderRadius: '10px',
              fontSize: '0.72rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {countryData.continent}
            </span>
            <span style={{ color: '#d1d5db', fontSize: '0.8rem' }}>•</span>
            <span style={{ color: '#6b7280', fontSize: '0.8rem', fontWeight: '600' }}>
              World Geography Encyclopedia
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.5rem, 5vw, 2.65rem)',
            fontWeight: 900,
            lineHeight: 1.25,
            margin: '0.4rem 0 0.85rem 0',
            color: '#111827',
            fontFamily: '"Merriweather", "Georgia", serif',
            wordBreak: 'break-word',
          }}>
            {countryData.seoTitle ? countryData.seoTitle.replace(/ \| LostStreet$/, '') : `History & Geography of ${countryData.name}`}
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px 12px',
            color: '#6b7280',
            fontSize: '0.82rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #e5e7eb',
            flexWrap: 'wrap'
          }}>
            <span>By <strong>LostStreet Editorial Team</strong></span>
            <span>•</span>
            <span>August 2026</span>
            <span>•</span>
            <span>12 min read</span>
            <span>•</span>
            <span style={{ color: '#059669', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Fact-Checked
            </span>
          </div>
        </header>

        {/* HERO COUNTRY PROFILE CARD (RESPONSIVE) */}
        <section style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '14px',
          padding: isMobile ? '1.1rem' : '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '220px 1fr',
          gap: isMobile ? '1rem' : '1.5rem',
          alignItems: 'center',
          fontFamily: '"Inter", system-ui, sans-serif'
        }}>
          {/* Flag Preview */}
          <div style={{
            aspectRatio: '3/2',
            maxWidth: isMobile ? '100%' : '220px',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
            background: '#f3f4f6',
            margin: '0 auto',
            width: '100%'
          }}>
            <img 
              src={`https://flagcdn.com/w640/${countryData.code.toLowerCase()}.png`} 
              alt={`Flag of ${countryData.name}`} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Quick Facts Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: isMobile ? '0.75rem' : '1rem'
          }}>
            <div>
              <span style={{ fontSize: '0.68rem', color: '#6b7280', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block' }}>Capital City</span>
              <strong style={{ fontSize: '0.98rem', color: '#111827', fontWeight: 800 }}>{countryData.capital}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.68rem', color: '#6b7280', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block' }}>Population</span>
              <strong style={{ fontSize: '0.98rem', color: '#111827', fontWeight: 800 }}>{countryData.population}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.68rem', color: '#6b7280', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block' }}>Currency</span>
              <strong style={{ fontSize: '0.92rem', color: '#111827', fontWeight: 700 }}>{countryData.currency}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.68rem', color: '#6b7280', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block' }}>Languages</span>
              <strong style={{ fontSize: '0.92rem', color: '#111827', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }} title={countryData.languages.join(', ')}>
                {countryData.languages.join(', ')}
              </strong>
            </div>
          </div>
        </section>

        {/* AI SUMMARY CALLOUT (TL;DR) */}
        {countryData.aiSummary && (
          <aside style={{
            background: '#f8fafc',
            borderLeft: '4px solid #3b82f6',
            padding: isMobile ? '1rem' : '1.25rem 1.5rem',
            borderRadius: '0 10px 10px 0',
            marginBottom: '2rem',
            fontFamily: '"Inter", system-ui, sans-serif'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.88rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Executive Summary &amp; Key Highlights
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', fontSize: '0.88rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li><strong>Territory:</strong> {countryData.aiSummary.geo}</li>
              <li><strong>Flag:</strong> {countryData.aiSummary.flag}</li>
              <li><strong>Sovereignty:</strong> {countryData.aiSummary.freedom}</li>
              <li><strong>Contemporary Challenges:</strong> {countryData.aiSummary.challenge}</li>
            </ul>
          </aside>
        )}

        {/* ARTICLE BODY */}
        <article style={{ fontSize: 'clamp(0.98rem, 1.8vw, 1.125rem)', color: '#374151', wordBreak: 'break-word', lineHeight: 1.8 }}>

          {/* Section 1: Geography & Borders */}
          <section>
            <h2 style={headingStyle}>
              1. Geographical Foundations &amp; Territorial Formation
            </h2>
            <div 
              style={{ lineHeight: '1.85', color: '#374151' }}
              dangerouslySetInnerHTML={{ __html: countryData.mapFormation }}
            />

            {/* INLINE FIGURE 1: Landscape / Geography Photo */}
            {countryData.images?.landscape && (
              <figure style={{ margin: isMobile ? '1.5rem 0' : '2rem 0', textAlign: 'center' }}>
                <div style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 3px 14px rgba(0,0,0,0.06)',
                  border: '1px solid #e5e7eb',
                  background: '#f3f4f6'
                }}>
                  <img 
                    src={countryData.images.landscape.url} 
                    alt={countryData.images.landscape.alt || `${countryData.name} Landscape`} 
                    style={{ width: '100%', maxHeight: isMobile ? '280px' : '420px', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                </div>
                {countryData.images.landscape.caption && (
                  <figcaption style={{
                    marginTop: '0.5rem',
                    fontSize: '0.82rem',
                    color: '#6b7280',
                    fontFamily: '"Inter", system-ui, sans-serif',
                    lineHeight: 1.4,
                    padding: '0 0.5rem'
                  }}>
                    {countryData.images.landscape.caption}
                  </figcaption>
                )}
              </figure>
            )}
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '2rem 0' }} />

          {/* Section 2: Flag Heraldry */}
          <section>
            <h2 style={headingStyle}>
              2. Heraldry, Vexillology &amp; National Flag Symbolism
            </h2>
            <div 
              style={{ lineHeight: '1.85', color: '#374151' }}
              dangerouslySetInnerHTML={{ __html: countryData.flagHistory }}
            />

            {/* INLINE FIGURE 2: Heraldry / Seal / Flag Historical Photo */}
            {countryData.images?.heraldry && (
              <figure style={{ margin: isMobile ? '1.5rem 0' : '2rem 0', textAlign: 'center' }}>
                <div style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 3px 14px rgba(0,0,0,0.06)',
                  border: '1px solid #e5e7eb',
                  background: '#f3f4f6'
                }}>
                  <img 
                    src={countryData.images.heraldry.url} 
                    alt={countryData.images.heraldry.alt || `${countryData.name} Heraldry`} 
                    style={{ width: '100%', maxHeight: isMobile ? '280px' : '420px', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                </div>
                {countryData.images.heraldry.caption && (
                  <figcaption style={{
                    marginTop: '0.5rem',
                    fontSize: '0.82rem',
                    color: '#6b7280',
                    fontFamily: '"Inter", system-ui, sans-serif',
                    lineHeight: 1.4,
                    padding: '0 0.5rem'
                  }}>
                    {countryData.images.heraldry.caption}
                  </figcaption>
                )}
              </figure>
            )}
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '2rem 0' }} />

          {/* Section 3: Path to Freedom */}
          <section>
            <h2 style={headingStyle}>
              3. Path to Freedom &amp; Sovereign Independence
            </h2>
            <div 
              style={{ lineHeight: '1.85', color: '#374151' }}
              dangerouslySetInnerHTML={{ __html: countryData.freedomStory }}
            />

            {/* INLINE FIGURE 3: Landmark / Monument / Independence Photo */}
            {countryData.images?.landmark && (
              <figure style={{ margin: isMobile ? '1.5rem 0' : '2rem 0', textAlign: 'center' }}>
                <div style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 3px 14px rgba(0,0,0,0.06)',
                  border: '1px solid #e5e7eb',
                  background: '#f3f4f6'
                }}>
                  <img 
                    src={countryData.images.landmark.url} 
                    alt={countryData.images.landmark.alt || `${countryData.name} Landmark`} 
                    style={{ width: '100%', maxHeight: isMobile ? '280px' : '420px', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                </div>
                {countryData.images.landmark.caption && (
                  <figcaption style={{
                    marginTop: '0.5rem',
                    fontSize: '0.82rem',
                    color: '#6b7280',
                    fontFamily: '"Inter", system-ui, sans-serif',
                    lineHeight: 1.4,
                    padding: '0 0.5rem'
                  }}>
                    {countryData.images.landmark.caption}
                  </figcaption>
                )}
              </figure>
            )}
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '2rem 0' }} />

          {/* Section 4: Chronological Milestones Timeline */}
          {countryData.timeline && countryData.timeline.length > 0 && (
            <section style={{ margin: '2rem 0' }}>
              <h2 style={headingStyle}>
                4. Key Historical Milestones Timeline
              </h2>
              <div style={{
                position: 'relative',
                paddingLeft: isMobile ? '18px' : '24px',
                borderLeft: '3px solid #e5e7eb',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                margin: '1.25rem 0',
                fontFamily: '"Inter", system-ui, sans-serif'
              }}>
                {countryData.timeline.map((item, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    {/* Dot */}
                    <div style={{
                      position: 'absolute',
                      left: isMobile ? '-26px' : '-32px',
                      top: '6px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#10b981',
                      border: '2px solid #ffffff',
                      boxShadow: '0 0 0 1px #d1d5db'
                    }} />
                    <span style={{
                      color: '#10b981',
                      fontWeight: '800',
                      fontSize: '0.98rem',
                      display: 'block'
                    }}>
                      {item.year}
                    </span>
                    <p style={{
                      margin: '2px 0 0 0',
                      color: '#4b5563',
                      fontSize: '0.92rem',
                      lineHeight: '1.55'
                    }}>
                      {item.event}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '2rem 0' }} />

          {/* Section 5: Modern Challenges */}
          <section>
            <h2 style={headingStyle}>
              5. Modern Geopolitical &amp; Socioeconomic Dynamics
            </h2>
            <div 
              style={{ lineHeight: '1.85', color: '#374151' }}
              dangerouslySetInnerHTML={{ __html: countryData.challenges }}
            />
          </section>

          {/* Section 6: Street View Meta & Visual Geography Clues */}
          {countryData.streetViewMeta && (
            <>
              <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '2rem 0' }} />
              <section style={{ margin: '2rem 0', fontFamily: '"Inter", system-ui, sans-serif' }}>
                <h2 style={headingStyle}>
                  6. Street View Meta &amp; Visual Clues Guide
                </h2>
                <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '1.25rem' }}>
                  If you are exploring {countryData.name} in a geography guessing game, look for these distinctive road infrastructure tells, utility markers, and vehicle camera clues:
                </p>

                <div style={{
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: isMobile ? '1rem' : '1.25rem',
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1.25rem'
                }}>
                  {countryData.streetViewMeta.drivingSide && (
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase' }}>Driving Side</span>
                      <p style={{ margin: '2px 0 0 0', fontWeight: 700, color: '#111827', fontSize: '0.95rem' }}>
                        {countryData.streetViewMeta.drivingSide} Side of Road
                      </p>
                    </div>
                  )}

                  {countryData.streetViewMeta.licensePlates && (
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase' }}>License Plates</span>
                      <p style={{ margin: '2px 0 0 0', color: '#374151', fontSize: '0.9rem' }}>
                        {countryData.streetViewMeta.licensePlates}
                      </p>
                    </div>
                  )}

                  {countryData.streetViewMeta.utilityPoles && (
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase' }}>Utility Poles</span>
                      <p style={{ margin: '2px 0 0 0', color: '#374151', fontSize: '0.9rem' }}>
                        {countryData.streetViewMeta.utilityPoles}
                      </p>
                    </div>
                  )}

                  {countryData.streetViewMeta.roadMarkings && (
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase' }}>Road Lines</span>
                      <p style={{ margin: '2px 0 0 0', color: '#374151', fontSize: '0.9rem' }}>
                        {countryData.streetViewMeta.roadMarkings}
                      </p>
                    </div>
                  )}
                </div>

                {countryData.streetViewMeta.delineators && (
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    marginBottom: '1rem'
                  }}>
                    <strong style={{ color: '#111827', fontSize: '0.9rem' }}>Delineator Bollards: </strong>
                    <span style={{ color: '#4b5563', fontSize: '0.88rem' }}>{countryData.streetViewMeta.delineators}</span>
                  </div>
                )}

                {/* INLINE FIGURE 4: Street View Infrastructure / Road Photo */}
                {countryData.images?.streetview && (
                  <figure style={{ margin: isMobile ? '1.5rem 0' : '2rem 0', textAlign: 'center' }}>
                    <div style={{
                      borderRadius: '10px',
                      overflow: 'hidden',
                      boxShadow: '0 3px 14px rgba(0,0,0,0.06)',
                      border: '1px solid #e5e7eb',
                      background: '#f3f4f6'
                    }}>
                      <img 
                        src={countryData.images.streetview.url} 
                        alt={countryData.images.streetview.alt || `${countryData.name} Street View Clues`} 
                        style={{ width: '100%', maxHeight: isMobile ? '280px' : '420px', objectFit: 'cover', display: 'block' }}
                        loading="lazy"
                      />
                    </div>
                    {countryData.images.streetview.caption && (
                      <figcaption style={{
                        marginTop: '0.5rem',
                        fontSize: '0.82rem',
                        color: '#6b7280',
                        fontFamily: '"Inter", system-ui, sans-serif',
                        lineHeight: 1.4,
                        padding: '0 0.5rem'
                      }}>
                        {countryData.images.streetview.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </section>
            </>
          )}

          {/* Section 7: FAQs */}
          {countryData.faqs && countryData.faqs.length > 0 && (
            <>
              <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '2rem 0' }} />
              <section style={{ margin: '2rem 0', fontFamily: '"Inter", system-ui, sans-serif' }}>
                <h2 style={headingStyle}>
                  Frequently Asked Questions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '1rem' }}>
                  {countryData.faqs.map((faq, idx) => (
                    <details 
                      key={idx} 
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '10px',
                        padding: '12px 16px',
                        cursor: 'pointer'
                      }}
                    >
                      <summary style={{ fontWeight: '700', color: '#111827', outline: 'none', fontSize: '0.95rem' }}>
                        {faq.question}
                      </summary>
                      <p style={{ margin: '8px 0 0 0', color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* Author Bio Box */}
          <div style={{
            marginTop: '2.5rem',
            padding: '1.25rem',
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '0.85rem',
            alignItems: isMobile ? 'flex-start' : 'center',
            fontFamily: '"Inter", system-ui, sans-serif'
          }}>
            <div style={{
              width: '46px', height: '46px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981, #3b82f6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 900, fontSize: '1.1rem', flexShrink: 0
            }}>
              LS
            </div>
            <div>
              <h3 style={{ margin: '0 0 0.2rem 0', fontSize: '0.92rem', fontWeight: 700, color: '#111827' }}>
                LostStreet Geography Editorial Team
              </h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.5 }}>
                Researched and fact-checked by our cartographic and geopolitical history team. Every article is synthesized from verified historical treaties, official census bureaus, and vexillological registries.
              </p>
            </div>
          </div>

          {/* Interactive Game Callout Card */}
          <div style={{
            marginTop: '2rem',
            padding: isMobile ? '1.5rem 1rem' : '2rem',
            background: '#111827',
            color: 'white',
            borderRadius: '14px',
            textAlign: 'center',
            fontFamily: '"Inter", system-ui, sans-serif'
          }}>
            <h3 style={{ fontSize: '1.25rem', color: 'white', margin: '0 0 0.4rem 0', fontWeight: 800 }}>
              Explore {countryData.name} in 360° Street View
            </h3>
            <p style={{ color: '#9ca3af', marginBottom: '1.25rem', fontSize: '0.88rem', maxWidth: '480px', margin: '0 auto 1.25rem auto' }}>
              Put your geography knowledge to the test. Spawn into mystery streets across {countryData.name} and guess your location!
            </p>
            <Link href="/" style={{
              background: '#10b981',
              color: 'white',
              padding: '10px 22px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'inline-block'
            }}>
              Play Free on LostStreet →
            </Link>
          </div>

        </article>
      </main>
    </div>
  );
}
