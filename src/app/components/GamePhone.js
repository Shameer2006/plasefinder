'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useGameStore } from '@/lib/store';
import { sounds } from '@/lib/sounds';
import styles from './GamePhone.module.css';

export default function GamePhone() {
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState('home'); // home | loststreet | google
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDone, setSearchDone] = useState(false);
  const { googleSearchUsed, setGoogleSearchUsed } = useGameStore();
  const inputRef = useRef(null);

  // Reset local state when the store resets (new round)
  useEffect(() => {
    if (!googleSearchUsed) {
      setSearchDone(false);
      setSearchQuery('');
    }
  }, [googleSearchUsed]);

  const openPhone = useCallback(() => {
    setIsOpen(true);
    sounds.playPhoneOpen();
  }, []);

  const closePhone = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setScreen('home'), 300);
  }, []);

  const goHome = useCallback(() => {
    setScreen('home');
  }, []);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim() || googleSearchUsed) return;
    setGoogleSearchUsed(true);
    setSearchDone(true);
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(searchQuery.trim())}`,
      '_blank',
      'noopener,noreferrer'
    );
  }, [searchQuery, googleSearchUsed, setGoogleSearchUsed]);

  const handleKeyDown = useCallback(
    (e) => { if (e.key === 'Enter') handleSearch(); },
    [handleSearch]
  );

  // Live clock for the status bar
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      {/* ── Floating phone toggle ── */}
      {!isOpen && (
        <button
          className={styles.toggleBtn}
          onClick={openPhone}
          aria-label="Open phone"
          title="Open Phone"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5" y="2" width="14" height="20" rx="3" />
            <line x1="12" y1="18" x2="12" y2="18" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {/* ── Phone panel ── */}
      <div
        className={`${styles.phoneContainer} ${
          isOpen ? styles.phoneOpen : styles.phoneClosed
        }`}
      >
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
                <div className={styles.appGrid}>
                  {/* LostStreet app */}
                  <button
                    className={styles.appIcon}
                    onClick={() => setScreen('loststreet')}
                  >
                    <div
                      className={`${styles.iconBg} ${styles.lostStreetIcon}`}
                    >
                      🧭
                    </div>
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
                    >
                      {googleSearchUsed ? '🔒' : '🔍'}
                    </div>
                    <span className={styles.appLabel}>
                      {googleSearchUsed ? 'Used' : 'Google'}
                    </span>
                  </button>
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
                    single Google search. Use it wisely.
                  </p>

                  <p className={styles.loreTextFooter}>
                    Find your way home. 🏠
                  </p>
                </div>
              </div>
            )}

            {/* ─────── GOOGLE SEARCH ─────── */}
            {screen === 'google' && (
              <div className={styles.appScreen}>
                <div className={styles.appHeader}>
                  <button className={styles.backBtn} onClick={goHome}>
                    ← Back
                  </button>
                  <span className={styles.appTitle}>Google Search</span>
                </div>

                <div className={styles.googleContent}>
                  {!searchDone ? (
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
                        />
                      </div>

                      <button
                        className={styles.searchBtn}
                        onClick={handleSearch}
                        disabled={!searchQuery.trim()}
                      >
                        Search (1 use only)
                      </button>

                      <p className={styles.searchWarning}>
                        ⚠️ You can only search once per round. Make it
                        count!
                      </p>
                    </>
                  ) : (
                    <div className={styles.searchComplete}>
                      <div className={styles.checkmark}>✓</div>
                      <h3>Search Complete</h3>
                      <p>Your results have been opened in a new tab.</p>
                      <p className={styles.searchUsedLabel}>
                        Search used for this round
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Home bar */}
          <button
            className={styles.homeBar}
            onClick={screen === 'home' ? closePhone : goHome}
            aria-label={screen === 'home' ? 'Close phone' : 'Home'}
          >
            <div className={styles.homeIndicator} />
          </button>
        </div>
      </div>
    </>
  );
}
