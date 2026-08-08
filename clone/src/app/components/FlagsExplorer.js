'use client';

import { useState, useEffect } from 'react';
import { countriesData } from '@/lib/countriesData';

export default function FlagsExplorer({ onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [activeCountryCode, setActiveCountryCode] = useState(null);
  const [exploredCountries, setExploredCountries] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Safely initialize state on client side
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

  const saveExplored = (updatedList) => {
    setExploredCountries(updatedList);
    localStorage.setItem('explored_countries', JSON.stringify(updatedList));
  };

  const toggleExplored = (code, e) => {
    if (e) e.stopPropagation();
    const lowerCode = code.toLowerCase();
    if (exploredCountries.includes(lowerCode)) {
      const updated = exploredCountries.filter(c => c !== lowerCode);
      saveExplored(updated);
    } else {
      const updated = [...exploredCountries, lowerCode];
      saveExplored(updated);
    }
  };

  const countriesList = Object.keys(countriesData).map(code => ({
    code,
    ...countriesData[code]
  }));

  // Filtering logic
  const filteredCountries = countriesList.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.capital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent = selectedContinent === 'All' || c.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  }).sort((a, b) => a.name.localeCompare(b.name));

  const continents = ['All', 'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];

  // Detail view navigation
  const navigateCountry = (direction) => {
    const currentIndex = filteredCountries.findIndex(c => c.code.toLowerCase() === activeCountryCode.toLowerCase());
    if (currentIndex === -1) return;

    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = filteredCountries.length - 1;
    if (nextIndex >= filteredCountries.length) nextIndex = 0;

    const nextCode = filteredCountries[nextIndex].code.toLowerCase();
    setActiveCountryCode(nextCode);

    // Auto mark as explored when navigating to a country
    if (!exploredCountries.includes(nextCode)) {
      const updated = [...exploredCountries, nextCode];
      saveExplored(updated);
    }
  };

  const handleOpenCountry = (code) => {
    const lowerCode = code.toLowerCase();
    setActiveCountryCode(lowerCode);
    if (!exploredCountries.includes(lowerCode)) {
      const updated = [...exploredCountries, lowerCode];
      saveExplored(updated);
    }
  };

  const activeCountry = activeCountryCode ? countriesData[activeCountryCode] : null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5, 8, 22, 0.95)',
      backdropFilter: 'blur(16px)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      color: '#fff',
      animation: 'fade-in 0.3s ease-out',
      overflow: 'hidden'
    }}>
      
      {/* HEADER PANEL */}
      <header style={{
        padding: isMobile ? '1rem' : '1.5rem 2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        background: 'rgba(255, 255, 255, 0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {activeCountryCode && (
            <button 
              onClick={() => setActiveCountryCode(null)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s'
              }}
              className="btn-hover"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              <span>Back to Grid</span>
            </button>
          )}
          <div>
            <h1 style={{
              fontSize: isMobile ? '1.5rem' : '2.2rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #00f2fe, #4facfe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(0, 242, 254, 0.2)',
              margin: 0
            }}>
              {activeCountryCode ? `${activeCountry.name} Chronicle` : 'World Flag Explorer'}
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#9ca3af' }}>
              Explore the rich histories, flag symbolisms, and modern trials of {countriesList.length} nations.
            </p>
          </div>
        </div>

        {/* PROGRESS TRACKER */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '8px 16px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          alignSelf: isMobile ? 'flex-start' : 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', tracking: '1px', color: '#9ca3af', fontWeight: 'bold' }}>Progress</span>
            <span style={{ fontSize: '1rem', fontWeight: '800', color: '#00f2fe' }}>
              {exploredCountries.length} <span style={{ color: '#6b7280', fontWeight: 'normal' }}>/ {countriesList.length} Read</span>
            </span>
          </div>
          <div style={{
            width: '80px',
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
              transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}></div>
          </div>
        </div>

        {!activeCountryCode && (
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.2s',
              alignSelf: isMobile ? 'stretch' : 'center'
            }}
            className="btn-hover-close"
          >
            Close Explorer
          </button>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {/* GRID VIEW */}
        {!activeCountryCode ? (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            
            {/* SEARCH & FILTERS BAR */}
            <div style={{
              padding: '1rem 2rem',
              background: 'rgba(0,0,0,0.2)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center' }}>
                {/* Search input */}
                <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </span>
                  <input 
                    type="text" 
                    placeholder="Search by country name, capital, or code..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 42px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    className="input-focus-glow"
                  />
                </div>

                {/* Continent selection tabs */}
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '4px',
                  borderRadius: '10px',
                  overflowX: 'auto',
                  maxWidth: '100%',
                  whiteSpace: 'nowrap'
                }} className="no-scrollbar">
                  {continents.map(cont => (
                    <button
                      key={cont}
                      onClick={() => setSelectedContinent(cont)}
                      style={{
                        padding: '8px 16px',
                        background: selectedContinent === cont ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
                        border: 'none',
                        color: selectedContinent === cont ? '#00f2fe' : '#9ca3af',
                        fontWeight: selectedContinent === cont ? 'bold' : 'normal',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                      }}
                    >
                      {cont}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FLAG CARDS GRID */}
            <div style={{
              flex: 1,
              padding: isMobile ? '1rem' : '2rem',
              overflowY: 'auto'
            }}>
              {filteredCountries.length === 0 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4rem 0',
                  color: '#9ca3af'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                  <h3>No countries found matching your filters</h3>
                  <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Try adjusting your search keywords or continent selection.</p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                  gap: isMobile ? '12px' : '20px',
                  justifyContent: 'center'
                }}>
                  {filteredCountries.map(c => {
                    const isRead = exploredCountries.includes(c.code.toLowerCase());
                    return (
                      <div
                        key={c.code}
                        onClick={() => handleOpenCountry(c.code)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        }}
                        className="flag-card-interactive"
                      >
                        {/* Checked marker if read */}
                        {isRead && (
                          <div style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: '#10b981',
                            color: 'white',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            zIndex: 10,
                            boxShadow: '0 2px 8px rgba(16,185,129,0.5)'
                          }}>
                            ✓
                          </div>
                        )}
                        
                        {/* Flag image */}
                        <div style={{
                          width: '100%',
                          aspectRatio: '3/2',
                          background: '#111827',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <img 
                            src={`https://flagcdn.com/w160/${c.code.toLowerCase()}.png`} 
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

                        {/* Card metadata */}
                        <div style={{
                          padding: '10px 12px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                          flexGrow: 1,
                          justifyContent: 'center'
                        }}>
                          <span style={{
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: '#e5e7eb'
                          }} title={c.name}>
                            {c.name}
                          </span>
                          <span style={{
                            fontSize: '0.75rem',
                            color: '#9ca3af',
                            fontWeight: '500'
                          }}>
                            {c.continent}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          
          /* DETAILED BLOG VIEW */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '900px',
            width: '100%',
            margin: '0 auto',
            padding: isMobile ? '1rem' : '2.5rem 2rem',
            gap: '2rem'
          }}>
            
            {/* SWIPE NAVIGATION */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '10px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <button 
                onClick={() => navigateCountry(-1)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}
                className="btn-hover-swipe"
              >
                ← Prev Country
              </button>

              <button
                onClick={(e) => toggleExplored(activeCountryCode, e)}
                style={{
                  background: exploredCountries.includes(activeCountryCode.toLowerCase()) ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${exploredCountries.includes(activeCountryCode.toLowerCase()) ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.1)'}`,
                  color: exploredCountries.includes(activeCountryCode.toLowerCase()) ? '#10b981' : '#d1d5db',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: exploredCountries.includes(activeCountryCode.toLowerCase()) ? '#10b981' : '#9ca3af'
                }}></div>
                {exploredCountries.includes(activeCountryCode.toLowerCase()) ? 'Explored & Read' : 'Mark as Explored'}
              </button>

              <button 
                onClick={() => navigateCountry(1)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}
                className="btn-hover-swipe"
              >
                Next Country →
              </button>
            </div>

            {/* HERO CARD (Flag, Name, Continent & Stats) */}
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '2rem',
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
                maxWidth: isMobile ? '100%' : '320px',
                width: '100%',
                aspectRatio: '3/2',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                border: '4px solid rgba(255,255,255,0.05)',
                background: '#111827'
              }}>
                <img 
                  src={`https://flagcdn.com/w640/${activeCountryCode.toLowerCase()}.png`} 
                  alt={`${activeCountry.name} Flag`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Stats Panel */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                <div>
                  <span style={{
                    background: 'rgba(0, 242, 254, 0.1)',
                    color: '#00f2fe',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {activeCountry.continent}
                  </span>
                  <h2 style={{
                    fontSize: isMobile ? '2rem' : '2.8rem',
                    fontWeight: '900',
                    marginTop: '8px',
                    marginBottom: '0',
                    lineHeight: 1.1,
                    textShadow: '0 4px 12px rgba(0,0,0,0.5)'
                  }}>
                    {activeCountry.name}
                  </h2>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  padding: '14px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.04)'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Capital City</span>
                    <strong style={{ fontSize: '1rem', color: '#e5e7eb' }}>{activeCountry.capital}</strong>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Population</span>
                    <strong style={{ fontSize: '1rem', color: '#e5e7eb' }}>{activeCountry.population}</strong>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Currency</span>
                    <strong style={{ fontSize: '1rem', color: '#e5e7eb' }}>{activeCountry.currency}</strong>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Languages</span>
                    <strong style={{ fontSize: '0.95rem', color: '#e5e7eb', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={activeCountry.languages.join(', ')}>
                      {activeCountry.languages.join(', ')}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* CHRONICLE ARTICLE SECTIONS */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
              paddingBottom: '4rem'
            }}>
              
              {/* Map/Border Formation */}
              <article className="chronicle-article-section" style={{
                background: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                borderRadius: '20px',
                padding: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  color: '#00f2fe',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '1rem',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  paddingBottom: '0.5rem'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
                  1. Geographical & Map Formation
                </h3>
                <p style={{
                  fontSize: '1.05rem',
                  lineHeight: '1.7',
                  color: '#d1d5db',
                  margin: 0
                }}>
                  {activeCountry.mapFormation}
                </p>
              </article>

              {/* Flag Origin */}
              <article className="chronicle-article-section" style={{
                background: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                borderRadius: '20px',
                padding: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  color: '#38bdf8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '1rem',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  paddingBottom: '0.5rem'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                  2. Heraldry & Flag Symbolism
                </h3>
                <p style={{
                  fontSize: '1.05rem',
                  lineHeight: '1.7',
                  color: '#d1d5db',
                  margin: 0
                }}>
                  {activeCountry.flagHistory}
                </p>
              </article>

              {/* Freedom struggle */}
              <article className="chronicle-article-section" style={{
                background: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                borderRadius: '20px',
                padding: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  color: '#34d399',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '1rem',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  paddingBottom: '0.5rem'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  3. Path to Freedom & Sovereignty
                </h3>
                <p style={{
                  fontSize: '1.05rem',
                  lineHeight: '1.7',
                  color: '#d1d5db',
                  margin: 0
                }}>
                  {activeCountry.freedomStory}
                </p>
              </article>

              {/* Modern Difficulties */}
              <article className="chronicle-article-section" style={{
                background: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                borderRadius: '20px',
                padding: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  color: '#f87171',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '1rem',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  paddingBottom: '0.5rem'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  4. Modern Geopolitical Challenges
                </h3>
                <p style={{
                  fontSize: '1.05rem',
                  lineHeight: '1.7',
                  color: '#d1d5db',
                  margin: 0
                }}>
                  {activeCountry.challenges}
                </p>
              </article>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
