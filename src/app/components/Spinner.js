'use client';

export default function Spinner({ text = 'Loading...', fullScreen = true }) {
  if (!fullScreen) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem' }}>
        <div style={{
          width: '40px', height: '40px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderTop: '3px solid var(--primary-color)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        {text && <p style={{ color: '#9ca3af', fontSize: '1rem', fontWeight: 500 }}>{text}</p>}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100vh', width: '100vw', background: 'rgba(10, 10, 26, 0.9)',
      position: 'fixed', inset: 0, zIndex: 9999,
    }}>
      <div style={{
        width: '50px', height: '50px',
        border: '4px solid rgba(255,255,255,0.1)',
        borderTop: '4px solid var(--primary-color)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1.5rem',
      }} />
      {text && <p style={{ color: '#9ca3af', fontSize: '1.3rem', fontWeight: 600 }}>{text}</p>}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
