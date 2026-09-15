'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

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

      {/* ── BREADCRUMB / SUB-NAV BAR ─────────────────────────────────────── */}
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
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Game</span>
          </Link>

          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: '#6b7280' }}>
            <Link href="/" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
            <span>/</span>
            <span style={{ color: '#059669', fontWeight: 700 }}>Contact Us</span>
          </nav>
        </div>

        <div style={{
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          color: '#059669',
          padding: '5px 14px',
          borderRadius: '20px',
          fontSize: '0.82rem',
          fontWeight: 800,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>Support &amp; Editorial Desk</span>
        </div>
      </div>

      {/* ── MAIN EDITORIAL CONTAINER ─────────────────────────────────────── */}
      <main style={{
        maxWidth: '920px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1rem, 3vw, 2rem) 4rem',
      }}>

        {/* Hero Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{
            display: 'inline-block',
            padding: '5px 14px',
            borderRadius: '20px',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#059669',
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.85rem'
          }}>
            Get In Touch
          </span>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            color: '#111827',
            letterSpacing: '-0.03em',
            margin: '0 0 0.75rem 0'
          }}>
            Contact Us &amp; Editorial Support
          </h1>
          <p style={{
            color: '#4b5563',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Have a question about LostStreet, need assistance with your profile, want to suggest a new country guide, or report a bug? We are here to help.
          </p>
        </div>

        {/* ── CONTACT METHODS GRID ────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          {/* Card 1: General */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: '#ecfdf5', color: '#059669',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '0.85rem'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
            </div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: '0 0 0.35rem 0' }}>General Support</h2>
            <p style={{ fontSize: '0.88rem', color: '#6b7280', margin: '0 0 0.85rem 0', lineHeight: 1.5 }}>For player account questions, bug reports, and multiplayer assistance.</p>
            <a href="mailto:support@loststreet.online" style={{ color: '#059669', fontWeight: 700, fontSize: '0.92rem', textDecoration: 'none' }}>
              support@loststreet.online
            </a>
          </div>

          {/* Card 2: Editorial */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: '#eff6ff', color: '#2563eb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '0.85rem'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: '0 0 0.35rem 0' }}>Editorial &amp; Guides</h2>
            <p style={{ fontSize: '0.88rem', color: '#6b7280', margin: '0 0 0.85rem 0', lineHeight: 1.5 }}>For geography clue feedback, corrections, or new country masterclass ideas.</p>
            <a href="mailto:editorial@loststreet.online" style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.92rem', textDecoration: 'none' }}>
              editorial@loststreet.online
            </a>
          </div>

          {/* Card 3: Legal */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: '#fef3c7', color: '#b45309',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '0.85rem'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: '0 0 0.35rem 0' }}>Legal &amp; Privacy</h2>
            <p style={{ fontSize: '0.88rem', color: '#6b7280', margin: '0 0 0.85rem 0', lineHeight: 1.5 }}>For data privacy inquiries, GDPR/CCPA requests, and DMCA notices.</p>
            <a href="mailto:legal@loststreet.online" style={{ color: '#b45309', fontWeight: 700, fontSize: '0.92rem', textDecoration: 'none' }}>
              legal@loststreet.online
            </a>
          </div>
        </div>

        {/* ── CONTACT FORM CARD ───────────────────────────────────────────── */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '24px',
          padding: 'clamp(1.75rem, 4vw, 3rem)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          marginBottom: '2.5rem'
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem', color: '#111827' }}>
            Send Us a Message
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.94rem', marginBottom: '1.75rem' }}>
            Fill out the form below and our team will respond within 24 to 48 business hours.
          </p>

          {submitted ? (
            <div style={{
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              padding: '2rem',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: '#d1fae5', color: '#059669',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 style={{ color: '#065f46', margin: '0 0 0.5rem 0', fontWeight: 800, fontSize: '1.2rem' }}>Thank You for Reaching Out!</h3>
              <p style={{ color: '#047857', margin: 0, fontSize: '0.96rem', lineHeight: 1.6 }}>
                Your message has been received. Our editorial and support team will review your inquiry and get back to you shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', subject: 'general', message: '' }); }}
                style={{
                  marginTop: '1.5rem',
                  background: '#059669',
                  border: 'none',
                  color: '#ffffff',
                  padding: '10px 22px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.92rem'
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label htmlFor="name" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Jane Doe"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '10px',
                      color: '#111827',
                      fontSize: '0.95rem',
                      fontFamily: '"Outfit", sans-serif',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jane@example.com"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '10px',
                      color: '#111827',
                      fontSize: '0.95rem',
                      fontFamily: '"Outfit", sans-serif',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
                  Inquiry Topic *
                </label>
                <select
                  id="subject"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#ffffff',
                    border: '1px solid #d1d5db',
                    borderRadius: '10px',
                    color: '#111827',
                    fontSize: '0.95rem',
                    fontFamily: '"Outfit", sans-serif',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="general">General Inquiry &amp; Feedback</option>
                  <option value="bug">Bug Report / Technical Issue</option>
                  <option value="guide">Guide Suggestion / Geography Clue Correction</option>
                  <option value="privacy">Privacy &amp; Data Deletion Request</option>
                  <option value="press">Press &amp; Educational Partnership</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
                  Your Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="How can our team help you?"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#ffffff',
                    border: '1px solid #d1d5db',
                    borderRadius: '10px',
                    color: '#111827',
                    fontSize: '0.95rem',
                    fontFamily: '"Outfit", sans-serif',
                    lineHeight: 1.6,
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px 28px',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '0.98rem',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 14px rgba(5,150,105,0.3)',
                    transition: 'all 0.2s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  <span>{submitting ? 'Sending Message...' : 'Submit Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ── FOOTER DIRECTORY OF POLICIES ───────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem'
        }}>
          <Link href="/privacy" style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            padding: '1.25rem',
            borderRadius: '14px',
            textDecoration: 'none',
            display: 'block'
          }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#111827', margin: '0 0 0.25rem 0' }}>Privacy Policy</h3>
            <p style={{ fontSize: '0.84rem', color: '#6b7280', margin: 0 }}>Review GDPR/CCPA data protection practices.</p>
          </Link>

          <Link href="/terms" style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            padding: '1.25rem',
            borderRadius: '14px',
            textDecoration: 'none',
            display: 'block'
          }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#111827', margin: '0 0 0.25rem 0' }}>Terms of Service</h3>
            <p style={{ fontSize: '0.84rem', color: '#6b7280', margin: 0 }}>Understand player fair use rules and conditions.</p>
          </Link>

          <Link href="/disclaimer" style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            padding: '1.25rem',
            borderRadius: '14px',
            textDecoration: 'none',
            display: 'block'
          }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#111827', margin: '0 0 0.25rem 0' }}>Disclaimer</h3>
            <p style={{ fontSize: '0.84rem', color: '#6b7280', margin: 0 }}>Trademark and Google Maps API disclosures.</p>
          </Link>
        </div>

      </main>
    </div>
  );
}
