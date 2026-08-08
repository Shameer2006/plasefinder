'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { isUsernameTaken, completeOnboarding } from '@/lib/userProfile';

const COUNTRIES = [
  { code: 'us', name: 'United States' }, { code: 'gb', name: 'United Kingdom' },
  { code: 'in', name: 'India' }, { code: 'de', name: 'Germany' },
  { code: 'fr', name: 'France' }, { code: 'br', name: 'Brazil' },
  { code: 'au', name: 'Australia' }, { code: 'ca', name: 'Canada' },
  { code: 'jp', name: 'Japan' }, { code: 'kr', name: 'South Korea' },
  { code: 'mx', name: 'Mexico' }, { code: 'ru', name: 'Russia' },
  { code: 'it', name: 'Italy' }, { code: 'es', name: 'Spain' },
  { code: 'nl', name: 'Netherlands' }, { code: 'se', name: 'Sweden' },
  { code: 'no', name: 'Norway' }, { code: 'dk', name: 'Denmark' },
  { code: 'fi', name: 'Finland' }, { code: 'pl', name: 'Poland' },
  { code: 'tr', name: 'Turkey' }, { code: 'sa', name: 'Saudi Arabia' },
  { code: 'ae', name: 'UAE' }, { code: 'eg', name: 'Egypt' },
  { code: 'ng', name: 'Nigeria' }, { code: 'za', name: 'South Africa' },
  { code: 'ke', name: 'Kenya' }, { code: 'ar', name: 'Argentina' },
  { code: 'co', name: 'Colombia' }, { code: 'cl', name: 'Chile' },
  { code: 'pe', name: 'Peru' }, { code: 'th', name: 'Thailand' },
  { code: 'vn', name: 'Vietnam' }, { code: 'ph', name: 'Philippines' },
  { code: 'my', name: 'Malaysia' }, { code: 'id', name: 'Indonesia' },
  { code: 'sg', name: 'Singapore' }, { code: 'nz', name: 'New Zealand' },
  { code: 'ie', name: 'Ireland' }, { code: 'pt', name: 'Portugal' },
  { code: 'ch', name: 'Switzerland' }, { code: 'at', name: 'Austria' },
  { code: 'be', name: 'Belgium' }, { code: 'cz', name: 'Czech Republic' },
  { code: 'hu', name: 'Hungary' }, { code: 'ro', name: 'Romania' },
  { code: 'gr', name: 'Greece' }, { code: 'ua', name: 'Ukraine' },
  { code: 'pk', name: 'Pakistan' }, { code: 'bd', name: 'Bangladesh' },
  { code: 'lk', name: 'Sri Lanka' }, { code: 'np', name: 'Nepal' },
];

const ADJECTIVES = [
  'Shadow', 'Neon', 'Storm', 'Frost', 'Iron', 'Crimson', 'Lunar', 'Solar',
  'Arctic', 'Cosmic', 'Cyber', 'Dark', 'Ember', 'Ghost', 'Hyper', 'Mystic',
  'Nova', 'Phantom', 'Rogue', 'Vortex', 'Blaze', 'Crystal', 'Drift', 'Echo',
  'Flux', 'Grim', 'Haze', 'Jade', 'Onyx', 'Pulse', 'Rift', 'Sage',
  'Titan', 'Volt', 'Warp', 'Zenith', 'Apex', 'Aero', 'Cobalt', 'Dusk',
];

const NOUNS = [
  'Navigator', 'Wanderer', 'Pilot', 'Seeker', 'Ranger', 'Hunter', 'Voyager',
  'Explorer', 'Drifter', 'Scout', 'Strider', 'Hawk', 'Wolf', 'Fox', 'Falcon',
  'Rider', 'Walker', 'Runner', 'Stalker', 'Blade', 'Spark', 'Caster',
  'Watcher', 'Keeper', 'Finder', 'Tracer', 'Striker', 'Glider', 'Chaser',
  'Specter', 'Phantom', 'Cipher', 'Vanguard', 'Sentinel', 'Marauder',
];

function generateRandomUsername() {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = Math.floor(Math.random() * 90) + 10;
  return `${adj}${noun}${num}`;
}

const keyframesInjected = { current: false };
function injectKeyframes() {
  if (keyframesInjected.current) return;
  keyframesInjected.current = true;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes onb-popIn {
      0% { opacity: 0; transform: scale(0.85) translateY(30px); }
      60% { opacity: 1; transform: scale(1.03) translateY(-4px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes onb-fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes onb-slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes onb-shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
    @keyframes onb-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes onb-checkPop {
      0% { opacity: 0; transform: scale(0); }
      60% { transform: scale(1.3); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes onb-flagIn {
      from { opacity: 0; transform: scale(0.7); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes onb-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4); }
      50% { box-shadow: 0 0 0 8px rgba(251, 191, 36, 0); }
    }
  `;
  document.head.appendChild(style);
}

export default function OnboardingModal({ user, onComplete }) {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState(null); // null | 'checking' | 'available' | 'taken' | 'invalid'
  const [usernameError, setUsernameError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cardAnim, setCardAnim] = useState('in'); // 'in' | 'out-left' | 'in-right'

  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    injectKeyframes();
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const validateUsername = useCallback((val) => {
    if (!val) {
      setUsernameStatus(null);
      setUsernameError('');
      return false;
    }
    if (val.length < 3) {
      setUsernameStatus('invalid');
      setUsernameError('Must be at least 3 characters');
      return false;
    }
    if (val.length > 20) {
      setUsernameStatus('invalid');
      setUsernameError('Must be 20 characters or less');
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(val)) {
      setUsernameStatus('invalid');
      setUsernameError('Only letters, numbers, and underscores');
      return false;
    }
    setUsernameError('');
    return true;
  }, []);

  const checkAvailability = useCallback((val) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!validateUsername(val)) return;

    setUsernameStatus('checking');
    debounceRef.current = setTimeout(async () => {
      try {
        const taken = await isUsernameTaken(val);
        setUsernameStatus(taken ? 'taken' : 'available');
        if (taken) setUsernameError('Username is already taken');
      } catch {
        setUsernameStatus('invalid');
        setUsernameError('Error checking availability');
      }
    }, 500);
  }, [validateUsername]);

  const handleUsernameChange = (e) => {
    const val = e.target.value;
    setUsername(val);
    checkAvailability(val);
  };

  const handleDiceRoll = () => {
    const name = generateRandomUsername();
    setUsername(name);
    checkAvailability(name);
    if (inputRef.current) {
      inputRef.current.style.animation = 'none';
      void inputRef.current.offsetWidth;
      inputRef.current.style.animation = 'onb-shake 0.4s ease';
    }
  };

  const goToStep2 = () => {
    setCardAnim('out-left');
    setTimeout(() => {
      setStep(2);
      setCardAnim('in-right');
    }, 300);
  };

  const goBackToStep1 = () => {
    setCardAnim('out-left');
    setTimeout(() => {
      setStep(1);
      setCardAnim('in-right');
    }, 300);
  };

  const handleFinish = async () => {
    if (!user?.uid || !username || !selectedCountry || submitting) return;
    setSubmitting(true);
    try {
      await completeOnboarding(user.uid, username, selectedCountry);
      onComplete({ username, countryCode: selectedCountry });
    } catch (err) {
      console.error('Onboarding error:', err);
      setSubmitting(false);
    }
  };

  const filteredCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const canContinue = usernameStatus === 'available' && username.length >= 3;

  const getCardAnimStyle = () => {
    if (cardAnim === 'in') return { animation: 'onb-popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' };
    if (cardAnim === 'out-left') return { animation: 'onb-fadeIn 0.3s ease reverse forwards' };
    if (cardAnim === 'in-right') return { animation: 'onb-popIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' };
    return {};
  };

  // ─── Styles ───
  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(10, 10, 26, 0.95)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    animation: 'onb-fadeIn 0.4s ease',
    padding: isMobile ? '16px' : '24px',
  };

  const cardStyle = {
    background: 'rgba(26, 26, 46, 0.85)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: isMobile ? '28px 20px' : '40px 44px',
    maxWidth: step === 1 ? '480px' : '640px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 80px rgba(59, 130, 246, 0.08)',
    ...getCardAnimStyle(),
  };

  const logoStyle = {
    fontSize: isMobile ? '28px' : '36px',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textAlign: 'center',
    marginBottom: '4px',
    letterSpacing: '-0.5px',
  };

  const subtitleStyle = {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '13px',
    textAlign: 'center',
    marginBottom: '28px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  };

  const headingStyle = {
    color: '#fff',
    fontSize: isMobile ? '18px' : '22px',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: '24px',
    animation: 'onb-slideUp 0.4s ease 0.2s both',
  };

  const inputWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  };

  const inputStyle = {
    flex: 1,
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: `2px solid ${
      usernameStatus === 'available' ? 'var(--success-color, #22c55e)' :
      usernameStatus === 'taken' || usernameStatus === 'invalid' ? 'var(--error-color, #ef4444)' :
      'rgba(255,255,255,0.12)'
    }`,
    borderRadius: '12px',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: usernameStatus === 'available'
      ? '0 0 15px rgba(34, 197, 94, 0.15)'
      : usernameStatus === 'taken' || usernameStatus === 'invalid'
        ? '0 0 15px rgba(239, 68, 68, 0.15)'
        : 'none',
  };

  const diceButtonStyle = {
    width: '50px',
    height: '50px',
    minWidth: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.08)',
    border: '2px solid rgba(255,255,255,0.15)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#fbbf24',
  };

  const statusRowStyle = {
    minHeight: '28px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '20px',
    paddingLeft: '4px',
  };

  const continueButtonStyle = {
    width: '100%',
    padding: '15px',
    background: canContinue
      ? 'linear-gradient(135deg, #3b82f6, #6366f1)'
      : 'rgba(255,255,255,0.06)',
    border: 'none',
    borderRadius: '14px',
    color: canContinue ? '#fff' : 'rgba(255,255,255,0.3)',
    fontSize: '16px',
    fontWeight: 700,
    cursor: canContinue ? 'pointer' : 'not-allowed',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px',
    boxShadow: canContinue ? '0 8px 25px rgba(59, 130, 246, 0.3)' : 'none',
    animation: 'onb-slideUp 0.4s ease 0.4s both',
  };

  const searchInputStyle = {
    width: '100%',
    padding: '12px 16px 12px 42px',
    background: 'rgba(255,255,255,0.06)',
    border: '2px solid rgba(255,255,255,0.12)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    marginBottom: '20px',
    boxSizing: 'border-box',
  };

  const flagGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
    gap: isMobile ? '10px' : '12px',
    maxHeight: isMobile ? '340px' : '380px',
    overflowY: 'auto',
    padding: '4px',
    marginBottom: '20px',
  };

  const finishButtonStyle = {
    width: '100%',
    padding: '15px',
    background: selectedCountry
      ? 'linear-gradient(135deg, #f59e0b, #f97316)'
      : 'rgba(255,255,255,0.06)',
    border: 'none',
    borderRadius: '14px',
    color: selectedCountry ? '#fff' : 'rgba(255,255,255,0.3)',
    fontSize: '16px',
    fontWeight: 700,
    cursor: selectedCountry ? 'pointer' : 'not-allowed',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px',
    boxShadow: selectedCountry ? '0 8px 25px rgba(245, 158, 11, 0.3)' : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  };

  // Step indicator dots
  const StepDots = () => (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
      {[1, 2].map(s => (
        <div key={s} style={{
          width: s === step ? '28px' : '10px',
          height: '10px',
          borderRadius: '5px',
          background: s === step
            ? 'linear-gradient(90deg, #3b82f6, #a78bfa)'
            : 'rgba(255,255,255,0.15)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }} />
      ))}
    </div>
  );

  // ─── Step 1: Username ───
  const renderStep1 = () => (
    <>
      <div style={logoStyle}>LostStreet</div>
      <div style={subtitleStyle}>Geography Explorer</div>
      <StepDots />
      <h2 style={headingStyle}>Welcome, Explorer! Choose your identity.</h2>

      <div style={inputWrapperStyle}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            ref={inputRef}
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter username..."
            maxLength={20}
            style={inputStyle}
            autoFocus
          />
          {/* Status icon inside input */}
          {usernameStatus && (
            <div style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              animation: 'onb-checkPop 0.3s ease forwards',
            }}>
              {usernameStatus === 'checking' && (
                <div style={{
                  width: '20px', height: '20px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderTopColor: '#60a5fa',
                  borderRadius: '50%',
                  animation: 'onb-spin 0.7s linear infinite',
                }} />
              )}
              {usernameStatus === 'available' && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {(usernameStatus === 'taken' || usernameStatus === 'invalid') && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </div>
          )}
        </div>

        {/* Dice button */}
        <button
          onClick={handleDiceRoll}
          style={diceButtonStyle}
          title="Generate random username"
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(251, 191, 36, 0.15)';
            e.currentTarget.style.borderColor = '#fbbf24';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="1.8"/>
            <circle cx="7.5" cy="7.5" r="1.5"/>
            <circle cx="16.5" cy="7.5" r="1.5"/>
            <circle cx="7.5" cy="16.5" r="1.5"/>
            <circle cx="16.5" cy="16.5" r="1.5"/>
            <circle cx="12" cy="12" r="1.5"/>
          </svg>
        </button>
      </div>

      {/* Status message */}
      <div style={statusRowStyle}>
        {usernameError && (
          <span style={{ color: '#ef4444', fontSize: '13px', animation: 'onb-slideUp 0.2s ease' }}>
            {usernameError}
          </span>
        )}
        {usernameStatus === 'available' && (
          <span style={{ color: '#22c55e', fontSize: '13px', animation: 'onb-slideUp 0.2s ease' }}>
            ✓ Username is available!
          </span>
        )}
        {usernameStatus === 'checking' && (
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
            Checking availability...
          </span>
        )}
        {!usernameStatus && username.length === 0 && (
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px' }}>
            3-20 characters · Letters, numbers, underscores
          </span>
        )}
      </div>

      <button
        onClick={goToStep2}
        disabled={!canContinue}
        style={continueButtonStyle}
        onMouseEnter={e => {
          if (canContinue) e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Continue →
      </button>
    </>
  );

  // ─── Step 2: Country ───
  const renderStep2 = () => (
    <>
      <div style={logoStyle}>LostStreet</div>
      <div style={subtitleStyle}>Geography Explorer</div>
      <StepDots />

      {/* Back button */}
      <button
        onClick={goBackToStep1}
        style={{
          position: 'absolute',
          top: isMobile ? '16px' : '20px',
          left: isMobile ? '16px' : '24px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '10px',
          color: 'rgba(255,255,255,0.6)',
          padding: '8px 12px',
          cursor: 'pointer',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
        }}
      >
        ← Back
      </button>

      <h2 style={headingStyle}>Select Your Country</h2>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '0' }}>
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round"
          style={{ position: 'absolute', left: '14px', top: '14px', pointerEvents: 'none' }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={countrySearch}
          onChange={e => setCountrySearch(e.target.value)}
          placeholder="Search countries..."
          style={searchInputStyle}
        />
      </div>

      {/* Flag grid */}
      <div style={flagGridStyle}>
        {filteredCountries.map((c, idx) => (
          <div
            key={c.code}
            onClick={() => setSelectedCountry(c.code)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: isMobile ? '12px 6px' : '14px 8px',
              background: selectedCountry === c.code
                ? 'rgba(251, 191, 36, 0.12)'
                : 'rgba(255,255,255,0.03)',
              border: selectedCountry === c.code
                ? '2px solid #fbbf24'
                : '2px solid rgba(255,255,255,0.06)',
              borderRadius: '14px',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              animation: `onb-flagIn 0.3s ease ${Math.min(idx * 0.03, 0.8)}s both`,
              ...(selectedCountry === c.code ? { animation: 'onb-pulse 1.5s ease infinite' } : {}),
            }}
            onMouseEnter={e => {
              if (selectedCountry !== c.code) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={e => {
              if (selectedCountry !== c.code) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            <img
              src={`https://flagcdn.com/w40/${c.code}.png`}
              alt={c.name}
              width={isMobile ? 32 : 36}
              height={isMobile ? 21 : 24}
              style={{
                borderRadius: '3px',
                marginBottom: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            />
            <span style={{
              color: selectedCountry === c.code ? '#fbbf24' : 'rgba(255,255,255,0.7)',
              fontSize: isMobile ? '10px' : '11px',
              fontWeight: selectedCountry === c.code ? 600 : 400,
              textAlign: 'center',
              lineHeight: 1.2,
              transition: 'color 0.2s ease',
            }}>
              {c.name}
            </span>
          </div>
        ))}
        {filteredCountries.length === 0 && (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.3)',
            padding: '40px 0',
            fontSize: '14px',
          }}>
            No countries match your search
          </div>
        )}
      </div>

      <button
        onClick={handleFinish}
        disabled={!selectedCountry || submitting}
        style={finishButtonStyle}
        onMouseEnter={e => {
          if (selectedCountry && !submitting) e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {submitting ? (
          <>
            <div style={{
              width: '20px', height: '20px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: '#fff',
              borderRadius: '50%',
              animation: 'onb-spin 0.7s linear infinite',
            }} />
            Setting up...
          </>
        ) : (
          <>🚀 Start Playing!</>
        )}
      </button>
    </>
  );

  return (
    <div style={overlayStyle}>
      <div style={{ ...cardStyle, position: 'relative' }}>
        {step === 1 ? renderStep1() : renderStep2()}
      </div>
    </div>
  );
}
