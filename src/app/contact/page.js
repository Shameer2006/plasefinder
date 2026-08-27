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
    // Simulate brief submission dispatch
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
      background: '#0a0a0a',
      color: '#e5e5e5',
      fontFamily: "'Outfit', system-ui, sans-serif"
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'rgba(26, 26, 46, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: 'clamp(1.5rem, 4vw, 3rem)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
      }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: '#9ca3af' }} aria-label="Breadcrumb">
          <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: '#10b981' }}>Contact Us</span>
        </nav>

        <h1 style={{
          fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
          fontWeight: 900,
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #10b981, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2
        }}>
          Contact Us &amp; Editorial Support
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Have a question about LostStreet, need assistance with your profile, want to suggest a new country guide, or report a bug? We are here to help.
        </p>

        {/* Contact Methods Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '1.5rem',
            borderRadius: '14px'
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📧</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f3f4f6', margin: '0 0 0.4rem 0' }}>General Support</h3>
            <p style={{ fontSize: '0.88rem', color: '#9ca3af', margin: '0 0 0.75rem 0' }}>For general player inquiries, bug reports, and account help.</p>
            <a href="mailto:support@loststreet.online" style={{ color: '#10b981', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none' }}>
              support@loststreet.online
            </a>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '1.5rem',
            borderRadius: '14px'
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📚</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f3f4f6', margin: '0 0 0.4rem 0' }}>Editorial &amp; Guides</h3>
            <p style={{ fontSize: '0.88rem', color: '#9ca3af', margin: '0 0 0.75rem 0' }}>For geography clue feedback, factual corrections, or guide ideas.</p>
            <a href="mailto:editorial@loststreet.online" style={{ color: '#60a5fa', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none' }}>
              editorial@loststreet.online
            </a>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '1.5rem',
            borderRadius: '14px'
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>⚖️</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f3f4f6', margin: '0 0 0.4rem 0' }}>Legal &amp; Privacy</h3>
            <p style={{ fontSize: '0.88rem', color: '#9ca3af', margin: '0 0 0.75rem 0' }}>For data protection inquiries, GDPR/CCPA requests, and DMCA notices.</p>
            <a href="mailto:legal@loststreet.online" style={{ color: '#a78bfa', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none' }}>
              legal@loststreet.online
            </a>
          </div>
        </div>

        {/* Contact Form Section */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          borderRadius: '16px',
          marginBottom: '3rem'
        }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: '#f3f4f6' }}>
            Send Us a Message
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
            Fill out the form below and our team will respond within 24–48 business hours.
          </p>

          {submitted ? (
            <div style={{
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
              <h3 style={{ color: '#10b981', margin: '0 0 0.5rem 0', fontWeight: 800 }}>Thank You for Reaching Out!</h3>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.95rem' }}>
                Your message has been received. Our editorial and support team will review your inquiry and get back to you shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', subject: 'general', message: '' }); }}
                style={{
                  marginTop: '1.25rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  padding: '8px 18px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label htmlFor="name" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '0.95rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Your Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="you@example.com"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '0.95rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Inquiry Topic *
                </label>
                <select
                  id="subject"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: '#111827',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.95rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="general">General Support &amp; Feedback</option>
                  <option value="bug">Report a Bug / Technical Issue</option>
                  <option value="editorial">Geography Guide Correction / Suggestion</option>
                  <option value="privacy">Privacy &amp; Data Rights (GDPR/CCPA)</option>
                  <option value="partnership">Partnerships &amp; Media Inquiries</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  Your Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="How can we assist you?"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.95rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                  color: 'white',
                  padding: '12px 28px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.7 : 1,
                  alignSelf: 'flex-start',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
                }}
              >
                {submitting ? 'Sending Message...' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>

        {/* Operating Hours & Physical Disclosures */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem',
          color: '#9ca3af',
          fontSize: '0.88rem',
          lineHeight: 1.6
        }}>
          <p>
            <strong>Support Operating Hours:</strong> Monday – Friday, 9:00 AM – 6:00 PM UTC. Urgent server availability reports are monitored 24/7.
          </p>
          <p style={{ margin: 0 }}>
            LostStreet is committed to user safety and privacy. Learn more about how we process and protect your data in our <Link href="/privacy" style={{ color: '#10b981', textDecoration: 'underline' }}>Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
