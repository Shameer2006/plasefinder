'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';

const CONSENT_STORAGE_KEY = 'loststreet_cookie_consent_v2';
const emptySubscribe = () => () => {};

export default function CookieConsentBanner() {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always required for game session, streak & Firebase auth
    analytics: true,
    advertising: true,
  });

  const applyGtagConsent = (consentSettings) => {
    if (typeof window === 'undefined') return;
    try {
      window.dataLayer = window.dataLayer || [];
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          ad_storage: consentSettings.advertising ? 'granted' : 'denied',
          ad_user_data: consentSettings.advertising ? 'granted' : 'denied',
          ad_personalization: consentSettings.advertising ? 'granted' : 'denied',
          analytics_storage: consentSettings.analytics ? 'granted' : 'denied',
        });
      }
    } catch (e) {
      console.warn('[ConsentManager] Consent update failed:', e);
    }
  };

  useEffect(() => {
    // Read stored consent
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        applyGtagConsent(parsed);
      } else {
        // Show banner after brief delay so it doesn't block initial page render
        const timer = setTimeout(() => setShowBanner(true), 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      const timer = setTimeout(() => setShowBanner(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for custom trigger from footer or /cookies page
  useEffect(() => {
    const handleOpenSettings = () => {
      setShowPreferences(true);
      setShowBanner(false);
    };

    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const handleAcceptAll = () => {
    const updated = { essential: true, analytics: true, advertising: true };
    setPreferences(updated);
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
    applyGtagConsent(updated);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleRejectNonEssential = () => {
    const updated = { essential: true, analytics: false, advertising: false };
    setPreferences(updated);
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
    applyGtagConsent(updated);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleSaveCustom = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
    } catch (e) {}
    applyGtagConsent(preferences);
    setShowBanner(false);
    setShowPreferences(false);
  };

  if (!isClient) return null;
  if (!showBanner && !showPreferences) return null;

  return (
    <>
      {/* ── CONSENT BANNER NOTIFICATION ───────────────────────────────── */}
      {showBanner && !showPreferences && (
        <aside
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent banner"
          style={{
            position: 'fixed',
            bottom: '16px',
            left: '16px',
            right: '16px',
            maxWidth: '920px',
            margin: '0 auto',
            zIndex: 9999,
            background: 'rgba(15, 23, 42, 0.96)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '18px',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45)',
            color: '#f8fafc',
            fontFamily: '"Outfit", system-ui, sans-serif',
            animation: 'fadeInUp 0.3s ease-out forwards',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#059669',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                  <path d="M8.5 8.5v.01" />
                  <path d="M16 15.5v.01" />
                  <path d="M12 12v.01" />
                  <path d="M11 17v.01" />
                  <path d="M7 13v.01" />
                </svg>
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 800, margin: '0 0 0.35rem 0', color: '#ffffff' }}>
                  Privacy &amp; Cookie Consent
                </h3>
                <p style={{ fontSize: '0.86rem', lineHeight: 1.55, margin: 0, color: '#cbd5e1' }}>
                  We and our partners (including Google AdSense) use cookies and local storage to personalize advertisements, analyze website traffic, and ensure gameplay functions smoothly. You can choose your preferences or accept all below. Read our{' '}
                  <Link href="/cookies" style={{ color: '#34d399', textDecoration: 'underline' }}>
                    Cookie Policy
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" style={{ color: '#34d399', textDecoration: 'underline' }}>
                    Privacy Policy
                  </Link>.
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '0.65rem',
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
              alignItems: 'center',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '0.85rem'
            }}>
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#e2e8f0',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                Customize
              </button>

              <button
                type="button"
                onClick={handleRejectNonEssential}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                Reject Non-Essential
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                style={{
                  background: 'linear-gradient(135deg, #059669, #10b981)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '8px 20px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(5, 150, 105, 0.4)',
                }}
              >
                Accept All
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* ── DETAILED PREFERENCES MODAL ─────────────────────────────────── */}
      {showPreferences && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              maxWidth: '620px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
              color: '#111827',
              fontFamily: '"Outfit", system-ui, sans-serif',
              boxSizing: 'border-box',
              padding: 'clamp(1.5rem, 4vw, 2.25rem)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 id="cookie-preferences-title" style={{ fontSize: '1.35rem', fontWeight: 900, color: '#111827', margin: '0 0 0.25rem 0' }}>
                  Cookie &amp; Consent Preferences
                </h2>
                <p style={{ fontSize: '0.86rem', color: '#6b7280', margin: 0 }}>
                  Manage how LostStreet and Google AdSense store information on your device.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                aria-label="Close preferences"
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4b5563',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
              {/* Essential Category */}
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '14px', padding: '1rem 1.25rem', background: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <div style={{ fontWeight: 800, color: '#111827', fontSize: '0.98rem' }}>
                    Strictly Necessary &amp; Game Session
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#059669', background: '#ecfdf5', padding: '3px 8px', borderRadius: '12px' }}>
                    Always Active
                  </span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#4b5563', margin: 0, lineHeight: 1.5 }}>
                  Required for Street View navigation, Firebase player login, daily streak persistence, coin balance, and sound settings. Cannot be disabled.
                </p>
              </div>

              {/* Analytics Category */}
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '14px', padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label htmlFor="consent-analytics" style={{ fontWeight: 800, color: '#111827', fontSize: '0.98rem', cursor: 'pointer' }}>
                    Performance &amp; Analytics (GA4)
                  </label>
                  <input
                    id="consent-analytics"
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#059669' }}
                  />
                </div>
                <p style={{ fontSize: '0.84rem', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
                  Allows anonymous tracking of Core Web Vitals, page rendering performance, and traffic trends to help us debug Street View loading bottlenecks.
                </p>
              </div>

              {/* Advertising Category */}
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '14px', padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label htmlFor="consent-ads" style={{ fontWeight: 800, color: '#111827', fontSize: '0.98rem', cursor: 'pointer' }}>
                    Advertising &amp; Personalization (Google AdSense)
                  </label>
                  <input
                    id="consent-ads"
                    type="checkbox"
                    checked={preferences.advertising}
                    onChange={(e) => setPreferences({ ...preferences, advertising: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#059669' }}
                  />
                </div>
                <p style={{ fontSize: '0.84rem', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
                  Google AdSense uses cookies (such as DoubleClick DART) to serve personalized or contextual advertisements that fund our cloud hosting and keep LostStreet 100% free. If disabled, only non-personalized ads are served.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleRejectNonEssential}
                style={{
                  background: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  color: '#374151',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                }}
              >
                Reject All Non-Essential
              </button>

              <button
                type="button"
                onClick={handleSaveCustom}
                style={{
                  background: '#111827',
                  border: 'none',
                  color: '#ffffff',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                }}
              >
                Save Preferences
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                style={{
                  background: 'linear-gradient(135deg, #059669, #10b981)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '10px 22px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  color: '#ffffff',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(5, 150, 105, 0.3)',
                }}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
