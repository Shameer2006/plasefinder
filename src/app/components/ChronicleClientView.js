'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ChronicleClientView({ countryData, countriesList }) {
  const [exploredCountries, setExploredCountries] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const saved = localStorage.getItem('explored_countries');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setExploredCountries(parsed);
        
        // Auto mark as explored when the user visits the page
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
      // Auto mark first explored country
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

  return (
    <article style={{
      maxWidth: '900px',
      width: '100%',
      margin: '0 auto',
      padding: isMobile ? '1rem' : '2.5rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      


      {/* SWIPE NAVIGATION TOP */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.03)',
        padding: '10px 16px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <Link 
          href={`/chronicles/${prevCountry.code.toLowerCase()}`}
          style={{
            color: '#9ca3af',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}
          className="btn-hover-swipe"
        >
          ← {prevCountry.name}
        </Link>

        <button
          onClick={toggleExplored}
          style={{
            background: isExplored ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${isExplored ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255,255,255,0.1)'}`,
            color: isExplored ? '#10b981' : '#d1d5db',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isExplored ? '#10b981' : '#9ca3af'
          }}></div>
          {isExplored ? 'Explored & Read' : 'Mark as Explored'}
        </button>

        <Link 
          href={`/chronicles/${nextCountry.code.toLowerCase()}`}
          style={{
            color: '#9ca3af',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}
          className="btn-hover-swipe"
        >
          {nextCountry.name} →
        </Link>
      </div>

      {/* HERO SECTION (Flag & Quick Stats) */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '2.5rem',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        padding: isMobile ? '1.5rem' : '2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }} className="glass-panel">
        
        {/* Giant Flag */}
        <div style={{
          maxWidth: isMobile ? '100%' : '340px',
          width: '100%',
          aspectRatio: '3/2',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 12px 45px rgba(0,0,0,0.6)',
          border: '4px solid rgba(255,255,255,0.06)',
          background: '#111827'
        }}>
          <img 
            src={`https://flagcdn.com/w640/${countryData.code.toLowerCase()}.png`} 
            alt={`${countryData.name} Flag`} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Stats Dashboard */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}>
          <div>
            <span style={{
              background: 'rgba(0, 242, 254, 0.12)',
              color: '#00f2fe',
              padding: '5px 14px',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              display: 'inline-block'
            }}>
              {countryData.continent}
            </span>
            <h1 style={{
              fontSize: isMobile ? '2.2rem' : '3.2rem',
              fontWeight: '900',
              marginTop: '10px',
              marginBottom: '0',
              lineHeight: 1.1,
              background: 'linear-gradient(135deg, #ffffff, #e5e7eb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}>
              {countryData.name}
            </h1>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '14px',
            background: 'rgba(0, 0, 0, 0.25)',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 'bold', textTransform: 'uppercase' }}>Capital</span>
              <strong style={{ fontSize: '1.1rem', color: '#e5e7eb' }}>{countryData.capital}</strong>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 'bold', textTransform: 'uppercase' }}>Population</span>
              <strong style={{ fontSize: '1.1rem', color: '#e5e7eb' }}>{countryData.population}</strong>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 'bold', textTransform: 'uppercase' }}>Currency</span>
              <strong style={{ fontSize: '1.1rem', color: '#e5e7eb' }}>{countryData.currency}</strong>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 'bold', textTransform: 'uppercase' }}>Languages</span>
              <strong style={{ fontSize: '1rem', color: '#e5e7eb', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={countryData.languages.join(', ')}>
                {countryData.languages.join(', ')}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* AI SUMMARY CARD (TL;DR) */}
      {countryData.aiSummary && (
        <section 
          aria-label="AI Summary" 
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>🤖</span>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#60a5fa', fontWeight: 'bold' }}>
              Quick Summary (Generative AI & Reader Guide)
            </h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#9ca3af', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.92rem', lineHeight: '1.5' }}>
            <li><strong>Geography:</strong> {countryData.aiSummary.geo}</li>
            <li><strong>Flag Design:</strong> {countryData.aiSummary.flag}</li>
            <li><strong>Independence:</strong> {countryData.aiSummary.freedom}</li>
            <li><strong>Challenges:</strong> {countryData.aiSummary.challenge}</li>
          </ul>
        </section>
      )}

      {/* DETAILED ARTICLE CONTENT */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* Section 1: Geography & Borders */}
        <article className="chronicle-article-section" style={{
          background: 'rgba(255, 255, 255, 0.01)',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          borderRadius: '20px',
          padding: isMobile ? '1.5rem' : '2.2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#00f2fe',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '1.2rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: '0.6rem'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
            1. Geographical & Map Formation
          </h2>
          <p 
            style={{ fontSize: '1.1rem', lineHeight: '1.75', color: '#d1d5db', margin: 0 }}
            dangerouslySetInnerHTML={{ __html: countryData.mapFormation }}
          />
        </article>



        {/* Section 2: Flag */}
        <article className="chronicle-article-section" style={{
          background: 'rgba(255, 255, 255, 0.01)',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          borderRadius: '20px',
          padding: isMobile ? '1.5rem' : '2.2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#38bdf8',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '1.2rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: '0.6rem'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
            2. Heraldry & Flag Symbolism
          </h2>
          <p 
            style={{ fontSize: '1.1rem', lineHeight: '1.75', color: '#d1d5db', margin: 0 }}
            dangerouslySetInnerHTML={{ __html: countryData.flagHistory }}
          />
        </article>

        {/* Section 3: Independence */}
        <article className="chronicle-article-section" style={{
          background: 'rgba(255, 255, 255, 0.01)',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          borderRadius: '20px',
          padding: isMobile ? '1.5rem' : '2.2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '1.2rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: '0.6rem'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            3. Path to Freedom & Sovereignty
          </h2>
          <p 
            style={{ fontSize: '1.1rem', lineHeight: '1.75', color: '#d1d5db', margin: 0 }}
            dangerouslySetInnerHTML={{ __html: countryData.freedomStory }}
          />
        </article>

        {/* TIMELINE */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '24px',
          padding: isMobile ? '1.5rem' : '2.5rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#fbbf24',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: '0.6rem'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Key Historical Milestones
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', paddingLeft: '20px', borderLeft: '2px solid rgba(251, 191, 36, 0.3)' }}>
            {countryData.timeline.map((item, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '-31px',
                  top: '4px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: '#fbbf24',
                  border: '4px solid #050816',
                  boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)'
                }}></div>
                <span style={{
                  color: '#fbbf24',
                  fontWeight: '800',
                  fontSize: '1.1rem',
                  display: 'block'
                }}>
                  {item.year}
                </span>
                <p style={{
                  margin: '4px 0 0',
                  color: '#d1d5db',
                  lineHeight: '1.5',
                  fontSize: '0.98rem'
                }}>
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Challenges */}
        <article className="chronicle-article-section" style={{
          background: 'rgba(255, 255, 255, 0.01)',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          borderRadius: '20px',
          padding: isMobile ? '1.5rem' : '2.2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#f87171',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '1.2rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: '0.6rem'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            4. Modern Geopolitical Challenges
          </h2>
          <p 
            style={{ fontSize: '1.1rem', lineHeight: '1.75', color: '#d1d5db', margin: 0 }}
            dangerouslySetInnerHTML={{ __html: countryData.challenges }}
          />
        </article>

        {/* FAQs SECTION (Search Engine & AI Snippets) */}
        {countryData.faqs && countryData.faqs.length > 0 && (
          <article className="chronicle-article-section" style={{
            background: 'rgba(255, 255, 255, 0.01)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            borderRadius: '20px',
            padding: isMobile ? '1.5rem' : '2.2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              color: '#a78bfa',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '0.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              paddingBottom: '0.6rem'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {countryData.faqs.map((faq, idx) => (
                <details 
                  key={idx} 
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    cursor: 'pointer'
                  }}
                  className="faq-disclosure"
                >
                  <summary style={{ fontWeight: '700', color: '#f3f4f6', outline: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{faq.question}</span>
                  </summary>
                  <p style={{ margin: '10px 0 0 0', color: '#9ca3af', fontSize: '0.96rem', lineHeight: '1.6' }}>
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </article>
        )}

        {/* IN-BLOG GAME CTA WIDGET */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: '20px',
          padding: '1.75rem',
          textAlign: 'center',
          marginTop: '1rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'white', marginBottom: '6px' }}>
            Think You Can Pin {countryData.name} on the Map?
          </h3>
          <p style={{ color: '#9ca3af', fontSize: '0.92rem', marginBottom: '14px', lineHeight: '1.5' }}>
            Use the landscape and flag clues you just learned to spot this country in our free Street View guessing game.
          </p>
          <Link href="/" style={{
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
          }} className="btn-hover">
            Play LostStreet Guessing Game
          </Link>
        </div>

      </section>



      {/* BOTTOM ACTION BUTTON */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0 4rem' }}>
        <Link href="/chronicles" style={{
          background: 'linear-gradient(135deg, #00f2fe, #4facfe)',
          border: 'none',
          color: 'white',
          padding: '14px 36px',
          borderRadius: '12px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          boxShadow: '0 4px 15px rgba(0, 242, 254, 0.4)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px'
        }} className="btn-hover">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          Back to Flag Catalog
        </Link>
      </div>

    </article>
  );
}


