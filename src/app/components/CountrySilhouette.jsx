'use client';
import { useId } from 'react';

/**
 * CountrySilhouette Component
 * Renders a crisp, engraved cartographic vector silhouette of a country border
 * on a warm antique chart plate with subtle graticule grid lines and cardinal marks.
 */
export default function CountrySilhouette({
  path,
  viewBox = '0 0 500 500',
  countryName = '',
  status = 'NORMAL', // 'NORMAL' | 'CORRECT' | 'WRONG'
  revealed = false,
  size = 175,
  fluid = false, // When true, fills parent width & uses size as height / minHeight
  plateLabel = 'ATLAS PLATE',
  revealedContinent = null,
  revealedFlagCode = null,
}) {
  const gradientId = useId();

  // Cartographic ink & fill palette based on round status
  let gradStart = '#0f766e'; // Deep maritime teal
  let gradMid = '#0d9488';   // Atlas turquoise-emerald
  let gradEnd = '#115e59';   // Deep forest sea-green
  let strokeColor = '#1b120c'; // Warm sepia-charcoal ink
  let frameBorder = 'rgba(139, 98, 57, 0.35)';
  let innerRingBorder = 'rgba(139, 98, 57, 0.18)';
  let plateBg = 'radial-gradient(circle at 50% 45%, #fcf9f2 0%, #ede0c8 100%)';
  let dropShadow = 'drop-shadow(0 6px 14px rgba(27, 18, 12, 0.22))';

  if (status === 'CORRECT') {
    gradStart = '#10b981';
    gradMid = '#059669';
    gradEnd = '#047857';
    strokeColor = '#064e3b';
    frameBorder = 'rgba(5, 150, 105, 0.55)';
    innerRingBorder = 'rgba(5, 150, 105, 0.25)';
    plateBg = 'radial-gradient(circle at 50% 45%, #f0fdf4 0%, #dcfce7 100%)';
    dropShadow = 'drop-shadow(0 8px 18px rgba(5, 150, 105, 0.3))';
  } else if (status === 'WRONG') {
    gradStart = '#ef4444';
    gradMid = '#dc2626';
    gradEnd = '#b91c1c';
    strokeColor = '#7f1d1d';
    frameBorder = 'rgba(220, 38, 38, 0.55)';
    innerRingBorder = 'rgba(220, 38, 38, 0.24)';
    plateBg = 'radial-gradient(circle at 50% 45%, #fef2f2 0%, #fee2e2 100%)';
    dropShadow = 'drop-shadow(0 8px 18px rgba(220, 38, 38, 0.28))';
  }

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        background: plateBg,
        border: `1.5px solid ${frameBorder}`,
        boxShadow: 'inset 0 2px 14px rgba(92, 61, 30, 0.09), 0 6px 20px rgba(60, 37, 20, 0.08)',
        width: '100%',
        maxWidth: fluid ? '100%' : `${size + 56}px`,
        height: fluid ? '100%' : `${size}px`,
        minHeight: fluid ? `${size}px` : undefined,
        maxHeight: fluid ? '100%' : `${size}px`,
        padding: fluid ? '1.6rem 1.8rem' : '0.7rem 1.1rem',
        boxSizing: 'border-box',
        overflow: 'hidden',
        transition: 'border-color 0.35s ease, background 0.35s ease',
      }}
    >
      {/* Inner double-ruled atlas border */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '8px',
          borderRadius: '11px',
          border: `1px solid ${innerRingBorder}`,
          pointerEvents: 'none',
        }}
      />

      {/* Subtle lat/long cartographic graticule lines */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.5,
          backgroundImage: `
            linear-gradient(to right, rgba(139, 98, 57, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 98, 57, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top-left compass north & plate badge */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '14px',
          left: '16px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '0.62rem',
          fontWeight: 800,
          letterSpacing: '0.1em',
          color: 'rgba(104, 78, 52, 0.65)',
          fontFamily: 'monospace',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 12,
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
        <span>N · {plateLabel}</span>
      </div>

      {/* Top-right revealed hint stamps (if unlocked) */}
      {(revealedContinent || revealedFlagCode) && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '14px',
            zIndex: 15,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            gap: '6px',
          }}
        >
          {revealedContinent && (
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                background: 'rgba(255, 255, 255, 0.92)',
                color: '#1e40af',
                border: '1px solid #bfdbfe',
                padding: '3px 9px',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              }}
            >
              {revealedContinent}
            </span>
          )}
          {revealedFlagCode && (
            <span
              style={{
                background: 'rgba(255, 255, 255, 0.94)',
                border: '1px solid #fde68a',
                padding: '3px 6px',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              }}
            >
              <img
                src={`https://flagcdn.com/w40/${revealedFlagCode.toLowerCase()}.png`}
                alt="Flag clue"
                width={22}
                height={15}
                style={{
                  display: 'block',
                  objectFit: 'cover',
                  borderRadius: '2px',
                  border: '1px solid rgba(27,18,12,0.15)',
                }}
              />
            </span>
          )}
        </div>
      )}

      {/* Bottom-left subtle cartographic scale bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '13px',
          left: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.58rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: 'rgba(104, 78, 52, 0.55)',
          fontFamily: 'monospace',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 12,
        }}
      >
        <span style={{ display: 'inline-block', width: '28px', height: '4px', borderLeft: '1.5px solid currentColor', borderRight: '1.5px solid currentColor', borderBottom: '1.5px solid currentColor' }} />
        <span>BORDER PROFILE</span>
      </div>

      {/* Bottom-right revealed country stamp */}
      {revealed && countryName && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '14px',
            zIndex: 15,
            fontSize: '0.76rem',
            fontWeight: 800,
            padding: '3px 10px',
            borderRadius: '8px',
            background: status === 'CORRECT' ? '#059669' : '#dc2626',
            color: '#ffffff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          }}
        >
          {countryName}
        </div>
      )}

      <svg
        viewBox={viewBox}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100%',
          maxHeight: fluid ? '100%' : `${size - 20}px`,
          display: 'block',
          filter: dropShadow,
          transform: status === 'NORMAL' ? 'scale(1)' : 'scale(1.03)',
          transition: 'transform 0.35s ease, filter 0.35s ease',
          userSelect: 'none',
        }}
        aria-label={revealed ? countryName : 'Country Map Silhouette'}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="50%" stopColor={gradMid} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
        </defs>

        {path ? (
          <path
            d={path}
            fill={`url(#${gradientId})`}
            stroke={strokeColor}
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ transition: 'fill 0.35s ease, stroke 0.35s ease' }}
          />
        ) : (
          <text
            x="250"
            y="250"
            textAnchor="middle"
            fill="#7c6146"
            fontSize="18"
            fontFamily="sans-serif"
          >
            Loading Map Shape...
          </text>
        )}
      </svg>
    </div>
  );
}
