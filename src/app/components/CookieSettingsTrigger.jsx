'use client';

export default function CookieSettingsTrigger({ label = 'Manage Cookie Preferences', style = {} }) {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-cookie-settings'));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: '#111827',
        color: '#ffffff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '10px',
        fontWeight: 700,
        fontSize: '0.92rem',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.15s, background 0.15s',
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = '#059669'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = style.background || '#111827'; }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
        <path d="M8.5 8.5v.01" />
        <path d="M16 15.5v.01" />
        <path d="M12 12v.01" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
