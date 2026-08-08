'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useGameStore } from '@/lib/store';
import { sounds } from '@/lib/sounds';
import styles from './GamePhone.module.css';

export default function GamePhone() {
  const [isOpenMobile, setIsOpenMobile] = useState(false); // For tap-to-open on mobile
  const [screen, setScreen] = useState('home'); // home | loststreet | google
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const { 
    googleSearchUsed, setGoogleSearchUsed, currentLocation,
    circleSearchesUsed, circleSearchActive, setCircleSearchActive
  } = useGameStore();
  const inputRef = useRef(null);

  const circleSearchMaxed = circleSearchesUsed >= 2;

  // Reset local state when the store resets (new round)
  useEffect(() => {
    if (!googleSearchUsed) {
      setSearchResults(null);
      setSearchQuery('');
      setSearchError(null);
    }
  }, [googleSearchUsed, currentLocation]);

  const toggleMobilePhone = useCallback(() => {
    // Only used for mobile tap
    if (!isOpenMobile) {
      sounds.playPhoneOpen();
    }
    setIsOpenMobile((prev) => !prev);
  }, [isOpenMobile]);

  const goHome = useCallback(() => {
    setScreen('home');
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim() || googleSearchUsed || isSearching) return;
    
    setIsSearching(true);
    setSearchError(null);
    
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to search');
      }
      
      setSearchResults(data.results || []);
      setGoogleSearchUsed(true);
    } catch (err) {
      console.error(err);
      setSearchError('Search failed. The signal might be jammed...');
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, googleSearchUsed, setGoogleSearchUsed, isSearching]);

  const handleKeyDown = useCallback(
    (e) => { if (e.key === 'Enter') handleSearch(); },
    [handleSearch]
  );

  const activateCircleSearch = useCallback(() => {
    if (circleSearchMaxed || circleSearchActive) return;
    sounds.playPhoneOpen();
    setCircleSearchActive(true);
    // Auto-minimize the phone
    setIsOpenMobile(false);
  }, [circleSearchMaxed, circleSearchActive, setCircleSearchActive]);

  // Live clock for the status bar
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div 
      className={`${styles.phoneWrapper} ${isOpenMobile ? styles.phoneOpen : ''}`}
      onMouseEnter={() => {
        // Optional: play sound on hover if we want it every time
      }}
    >
      <div 
        className={styles.phonePeekEdge} 
        onClick={toggleMobilePhone}
        aria-hidden="true"
      />
      
      <div className={styles.phoneContainer}>
        <div className={styles.phoneFrame}>
          {/* Status bar */}
          <div className={styles.statusBar}>
            <span className={styles.time}>{timeStr}</span>
            <div className={styles.notch} />
            <div className={styles.statusIcons}>
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>

          {/* Screen */}
          <div className={styles.screen}>
            {/* ─────── HOME ─────── */}
            {screen === 'home' && (
              <div className={styles.homeScreen}>
                {/* Greeting bar */}
                <div className={styles.greetingBar}>
                  <span className={styles.greetingText}>Good morning</span>
                  <span className={styles.greetingTime}>{timeStr}</span>
                </div>

                {/* Search widget */}
                <div className={styles.homeSearchWidget}>
                  <div className={styles.searchWidgetInner}>
                    <span className={styles.searchWidgetIcon}>🔍</span>
                    <span className={styles.searchWidgetText}>Search the web</span>
                    <span className={styles.searchWidgetMic}>🎤</span>
                  </div>
                </div>

                {/* App grid */}
                <div className={styles.appGrid}>
                  {/* LostStreet app - uses logo.png */}
                  <button
                    className={styles.appIcon}
                    onClick={() => setScreen('loststreet')}
                  >
                    <div className={`${styles.iconBg} ${styles.lostStreetIcon}`} />
                    <span className={styles.appLabel}>LostStreet</span>
                  </button>

                  {/* Google app */}
                  <button
                    className={`${styles.appIcon} ${
                      googleSearchUsed ? styles.appDisabled : ''
                    }`}
                    onClick={() =>
                      !googleSearchUsed && setScreen('google')
                    }
                    disabled={googleSearchUsed}
                  >
                    <div
                      className={`${styles.iconBg} ${styles.googleIcon} ${
                        googleSearchUsed ? styles.iconUsed : ''
                      }`}
                    />
                    <span className={styles.appLabel}>
                      {googleSearchUsed ? 'Used' : 'Search'}
                    </span>
                  </button>

                  {/* Circle Search app (replaces Camera) */}
                  <button
                    className={`${styles.appIcon} ${
                      circleSearchMaxed ? styles.appDisabled : ''
                    }`}
                    onClick={activateCircleSearch}
                    disabled={circleSearchMaxed}
                  >
                    <div
                      className={`${styles.iconBg} ${styles.circleSearchIcon} ${
                        circleSearchMaxed ? styles.iconUsed : ''
                      }`}
                    />
                    <span className={styles.appLabel}>
                      {circleSearchMaxed ? 'Used' : 'Circle AI'}
                    </span>
                  </button>
                </div>

                {/* Dock */}
                <div className={styles.appDock}>
                  <button
                    className={`${styles.dockIcon} ${styles.lostStreetDock}`}
                    onClick={() => setScreen('loststreet')}
                    aria-label="LostStreet"
                  />
                  <button
                    className={styles.dockIcon}
                    onClick={() => !googleSearchUsed && setScreen('google')}
                    disabled={googleSearchUsed}
                    aria-label="Search"
                  >
                    🔍
                  </button>
                  <button
                    className={`${styles.dockIcon} ${circleSearchMaxed ? styles.dockDisabled : ''}`}
                    onClick={activateCircleSearch}
                    disabled={circleSearchMaxed}
                    aria-label="Circle Search"
                  >
                    ⭕
                  </button>
                  <button
                    className={styles.dockIcon}
                    onClick={goHome}
                    aria-label="Home"
                  >
                    🏠
                  </button>
                </div>

                {/* Page indicators */}
                <div className={styles.pageIndicators}>
                  <span className={`${styles.pageDot} ${styles.active}`} />
                  <span className={styles.pageDot} />
                  <span className={styles.pageDot} />
                </div>
              </div>
            )}

            {/* ─────── LOSTSTREET LORE ─────── */}
            {screen === 'loststreet' && (
              <div className={styles.appScreen}>
                <div className={styles.appHeader}>
                  <button className={styles.backBtn} onClick={goHome}>
                    ← Back
                  </button>
                  <span className={styles.appTitle}>LostStreet</span>
                </div>

                <div className={styles.loreContent}>
                  <div className={styles.loreLogo}>🌍</div>
                  <h3 className={styles.loreTitle}>Welcome, Traveler</h3>
                  <div className={styles.loreDivider} />

                  <p className={styles.loreText}>
                    You&apos;ve slipped into a{' '}
                    <strong>spatial paradox</strong> — dropped into an
                    unknown location somewhere in the world.
                  </p>

                  <p className={styles.loreText}>
                    Your mission:{' '}
                    <strong>figure out where you are.</strong> Study the
                    streets, signs, architecture, and surroundings for
                    clues.
                  </p>

                  <p className={styles.loreText}>
                    Pinpoint the correct location to earn{' '}
                    <strong>escape points</strong> and break free from the
                    paradox. The more accurate your guess, the more points
                    you earn.
                  </p>

                  <p className={styles.loreTextWarning}>
                    ⚠️ Wrong guesses keep you trapped longer. Fail too many
                    times, and the paradox tightens its grip…
                  </p>

                  <div className={styles.loreDivider} />

                  <p className={styles.loreTextHint}>
                    💡 You have <strong>one lifeline</strong> each round: a
                    single Web search. Use it wisely.
                  </p>

                  <p className={styles.loreTextHint}>
                    ⭕ <strong>Circle Search</strong>: Draw a circle around any 
                    detail in the street view to get an AI-powered clue. 
                    You get <strong>2 uses</strong> per round.
                  </p>

                  <p className={styles.loreTextFooter}>
                    Find your way home. 🏠
                  </p>
                </div>
              </div>
            )}

            {/* ─────── SEARCH APP ─────── */}
            {screen === 'google' && (
              <div className={styles.appScreen}>
                <div className={styles.appHeader}>
                  <button className={styles.backBtn} onClick={goHome}>
                    ← Back
                  </button>
                  <span className={styles.appTitle}>Search</span>
                </div>

                <div className={styles.googleContent}>
                  {!searchResults ? (
                    <>
                      <div className={styles.googleLogo}>
                        <span style={{ color: '#4285F4' }}>G</span>
                        <span style={{ color: '#EA4335' }}>o</span>
                        <span style={{ color: '#FBBC05' }}>o</span>
                        <span style={{ color: '#4285F4' }}>g</span>
                        <span style={{ color: '#34A853' }}>l</span>
                        <span style={{ color: '#EA4335' }}>e</span>
                      </div>

                      <div className={styles.searchBar}>
                        <input
                          ref={inputRef}
                          type="text"
                          className={styles.searchInput}
                          placeholder="Search the web..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={handleKeyDown}
                          autoFocus
                          disabled={isSearching}
                        />
                      </div>

                      <button
                        className={styles.searchBtn}
                        onClick={handleSearch}
                        disabled={!searchQuery.trim() || isSearching}
                      >
                        {isSearching ? 'Searching...' : 'Search (1 use only)'}
                      </button>

                      {isSearching && <div className={styles.spinner} />}

                      {searchError && (
                        <div className={styles.searchError}>{searchError}</div>
                      )}

                      {!isSearching && !searchError && (
                        <p className={styles.searchWarning}>
                          ⚠️ You can only search once per round. Make it
                          count!
                        </p>
                      )}
                    </>
                  ) : (
                    <div className={styles.searchResultsList}>
                      <div style={{ padding: '0 8px', marginBottom: '8px' }}>
                        <p className={styles.searchUsedLabel} style={{ textAlign: 'center' }}>
                          Results for: &quot;{searchQuery}&quot;
                        </p>
                      </div>
                      
                      {searchResults.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#9ca3af' }}>No results found.</p>
                      ) : (
                        searchResults.map((result, idx) => (
                          <div key={idx} className={styles.searchResultItem}>
                            <a 
                              href={result.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={styles.resultTitle}
                            >
                              {result.title}
                            </a>
                            <div className={styles.resultUrl}>{result.url}</div>
                            <div className={styles.resultSnippet}>{result.snippet}</div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Home bar */}
          <button
            className={styles.homeBar}
            onClick={screen === 'home' ? toggleMobilePhone : goHome}
            aria-label={screen === 'home' ? 'Close phone' : 'Home'}
          >
            <div className={styles.homeIndicator} />
          </button>
        </div>
      </div>
    </div>
  );
}
