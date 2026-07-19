'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Spinner({ text = 'Loading...', fullScreen = true }) {
  if (!fullScreen) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem' }}>
        <div style={{ width: '200px', height: '200px' }}>
          <DotLottieReact src="/map search.lottie" autoplay loop />
        </div>
        {text && <p style={{ color: '#9ca3af', fontSize: '1rem', fontWeight: 500 }}>{text}</p>}
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100vh', width: '100vw', background: 'rgba(10, 10, 26, 0.9)',
      position: 'fixed', inset: 0, zIndex: 9999,
    }}>
      <div style={{ width: '340px', height: '340px', marginBottom: '0.5rem' }}>
        <DotLottieReact src="/map search.lottie" autoplay loop />
      </div>
      {text && <p style={{ color: '#9ca3af', fontSize: '1.3rem', fontWeight: 600 }}>{text}</p>}
    </div>
  );
}
