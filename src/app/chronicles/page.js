'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { countriesData } from '@/lib/countriesData';

export default function ChroniclesCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');
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
        setExploredCountries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse explored countries", e);
      }
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const countriesList = Object.keys(countriesData).map(code => ({
    code,
    ...countriesData[code]
  }));

  // Filtering
  const filteredCountries = countriesList.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.capital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent = selectedContinent === 'All' || c.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  }).sort((a, b) => a.name.localeCompare(b.name));

  const continents = ['All', 'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];

  return (
    <main style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundImage: 'linear-gradient(rgba(5, 8, 22, 0.95), rgba(5, 8, 22, 0.95)), url(/bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden'
    }}>
      {/* HEADER */}
      <header style={{
        padding: isMobile ? '1.5rem 1rem' : '2rem 3rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        background: 'rgba(255, 255, 255, 0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: 'white',
            padding: '10px 18px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.95rem'
          }} className="btn-hover">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Back to Menu</span>
          </Link>
          <img src="/logo.png" alt="LostStreet Logo" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.1)' }} />
          <div>
            <h1 style={{
              fontSize: isMobile ? '1.8rem' : '2.6rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #00f2fe, #4facfe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(0, 242, 254, 0.2)',
              margin: 0
            }}>
              World Flag Chronicles
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: '0.95rem', color: '#9ca3af' }}>
              Explore the detailed history, flag creation, and freedom stories of all {countriesList.length} nations.
            </p>
          </div>
        </div>

        {/* PROGRESS METER */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '10px 20px',
          borderRadius: '14px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          alignSelf: isMobile ? 'flex-start' : 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', tracking: '1px', color: '#9ca3af', fontWeight: 'bold' }}>Progress</span>
            <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#00f2fe' }}>
              {exploredCountries.length} <span style={{ color: '#6b7280', fontWeight: 'normal', fontSize: '0.95rem' }}>/ {countriesList.length} Read</span>
            </span>
          </div>
          <div style={{
            width: '100px',
            height: '6px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(exploredCountries.length / countriesList.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00f2fe, #4facfe)',
              boxShadow: '0 0 8px #00f2fe',
              transition: 'width 0.4s ease'
            }}></div>
          </div>
        </div>
      </header>

      {/* FILTER & SEARCH */}
      <section style={{
        padding: isMobile ? '1rem' : '1.5rem 3rem',
        background: 'rgba(0,0,0,0.2)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input
              type="text"
              placeholder="Search by country name, capital, or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              className="input-focus-glow"
            />
          </div>

          {/* Continents Tabs */}
          <div style={{
            display: 'flex',
            gap: '6px',
            background: 'rgba(255,255,255,0.02)',
            padding: '6px',
            borderRadius: '12px',
            overflowX: 'auto',
            maxWidth: '100%',
            whiteSpace: 'nowrap'
          }} className="no-scrollbar">
            {continents.map(cont => (
              <button
                key={cont}
                onClick={() => setSelectedContinent(cont)}
                style={{
                  padding: '10px 18px',
                  minHeight: '44px',
                  background: selectedContinent === cont ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
                  border: 'none',
                  color: selectedContinent === cont ? '#00f2fe' : '#9ca3af',
                  fontWeight: selectedContinent === cont ? 'bold' : 'normal',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {cont}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG GRID */}
      <section style={{
        flex: 1,
        padding: isMobile ? '1.5rem 1rem' : '3rem',
        overflowY: 'auto'
      }}>
        {/* GAME CTA BANNER */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.15))',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '20px',
          padding: isMobile ? '1.5rem 1rem' : '2rem',
          maxWidth: '1400px',
          margin: '0 auto 2.5rem',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
        }}>
          <h2 style={{
            fontSize: isMobile ? '1.4rem' : '1.8rem',
            fontWeight: '900',
            marginBottom: '8px',
            color: 'white'
          }}>
            Think You Know Where These Flags Belong?
          </h2>
          <p style={{
            fontSize: '0.98rem',
            color: '#d1d5db',
            maxWidth: '650px',
            margin: '0 auto 1.2rem',
            lineHeight: '1.6'
          }}>
            Put your geography and flag knowledge to the test! Guess global locations from street-view vistas in our free multiplayer game.
          </p>
          <Link href="/" style={{
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            color: 'white',
            padding: '10px 24px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '0.95rem',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }} className="btn-hover">
            Play LostStreet Game Free
          </Link>
        </div>

        {filteredCountries.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5rem 0',
            color: '#9ca3af'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem', color: '#6b7280' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <h2>No country chronicles found</h2>
            <p style={{ fontSize: '1rem', marginTop: '6px' }}>Try adjusting your search query or continent filters.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(auto-fill, minmax(130px, 1fr))' : 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: isMobile ? '12px' : '26px',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {filteredCountries.map(c => {
              const isRead = exploredCountries.includes(c.code.toLowerCase());
              return (
                <Link
                  key={c.code}
                  href={`/chronicles/${c.code.toLowerCase()}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      height: '100%'
                    }}
                    className="flag-card-interactive"
                  >
                    {/* Read indicator */}
                    {isRead && (
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: '#10b981',
                        color: 'white',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                        zIndex: 10,
                        boxShadow: '0 2px 10px rgba(16,185,129,0.5)'
                      }}>
                        ✓
                      </div>
                    )}

                    {/* Flag Container */}
                    <div style={{
                      width: '100%',
                      aspectRatio: '3/2',
                      background: '#111827',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <img
                        src={`https://flagcdn.com/w320/${c.code.toLowerCase()}.png`}
                        alt={`${c.name} Flag`}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s'
                        }}
                        className="flag-image-hover"
                      />
                    </div>

                    {/* Metadata */}
                    <div style={{
                      padding: '14px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      flexGrow: 1
                    }}>
                      <span style={{
                        fontSize: '1.05rem',
                        fontWeight: '800',
                        color: '#f3f4f6',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {c.name}
                      </span>
                      <span style={{
                        fontSize: '0.8rem',
                        color: '#9ca3af',
                        fontWeight: '600'
                      }}>
                        {c.continent}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
