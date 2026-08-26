'use client';
import Image from 'next/image';

export default function CoinIcon({ size = 20, className = '', animate = false, style = {} }) {
  return (
    <span
      className={`coin-icon-wrapper ${animate ? 'coin-icon-bounce' : ''} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        flexShrink: 0,
        verticalAlign: 'middle',
        filter: 'drop-shadow(0 2px 5px rgba(232, 200, 74, 0.45))',
        transition: 'transform 0.2s ease',
        ...style,
      }}
    >
      <img
        src="/logo-3d-square.png"
        alt="Coin"
        width={size}
        height={size}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          borderRadius: '50%',
        }}
      />
    </span>
  );
}
