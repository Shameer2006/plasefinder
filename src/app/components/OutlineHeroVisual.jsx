'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CountrySilhouette from './CountrySilhouette';

const SAMPLE_CODES = [
  { code: 'IT', label: 'Boot', name: 'Italy' },
  { code: 'EG', label: 'Square', name: 'Egypt' },
  { code: 'JP', label: 'Arc', name: 'Japan' },
  { code: 'CL', label: 'Ribbon', name: 'Chile' },
  { code: 'ZA', label: 'Enclave', name: 'South Africa' },
];

function FlagThumb({ code }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      alt={`${code} flag`}
      width={18}
      height={12}
      style={{
        display: 'inline-block',
        objectFit: 'cover',
        borderRadius: '2px',
        border: '1px solid rgba(27, 18, 12, 0.16)',
        flexShrink: 0,
      }}
    />
  );
}

export default function OutlineHeroVisual() {
  const [outlines, setOutlines] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    let isMounted = true;
    fetch('/country-outlines.json')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) setOutlines(data);
      })
      .catch((err) => console.error('Failed to load hero outlines:', err));
    return () => {
      isMounted = false;
    };
  }, []);

  const currentSample = SAMPLE_CODES[selectedIdx];
  const target = outlines ? outlines[currentSample.code] : null;

  return (
    <div
      style={{
        background: 'rgba(254, 250, 243, 0.96)',
        border: '1.5px solid rgba(160, 125, 85, 0.35)',
        borderRadius: '22px',
        padding: '1.4rem',
        boxShadow: '0 14px 36px rgba(60, 37, 20, 0.12), 0 2px 8px rgba(60, 37, 20, 0.06)',
        width: '100%',
        maxWidth: '440px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Header Badge */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '1rem',
        }}
      >
        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            padding: '3px 10px',
            borderRadius: '20px',
            background: '#ecfdf5',
            color: '#059669',
            border: '1px solid #a7f3d0',
          }}
        >
          Interactive Preview
        </span>
        <span
          style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#3c2514',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <FlagThumb code={currentSample.code} />
          <span>{target?.name || currentSample.name}</span>
        </span>
      </div>

      {/* Silhouette Stage */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1rem',
          minHeight: '240px',
          alignItems: 'center',
        }}
      >
        {target ? (
          <CountrySilhouette
            path={target.d}
            viewBox={target.viewBox}
            countryName={target.name}
            status="NORMAL"
            revealed={true}
            size={215}
          />
        ) : (
          <div
            style={{
              width: '100%',
              maxWidth: '270px',
              height: '215px',
              borderRadius: '14px',
              background: 'radial-gradient(circle at 50% 45%, #fcf9f2 0%, #efe3cc 100%)',
              border: '1.5px solid rgba(139, 98, 57, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#7c6146',
              fontSize: '0.9rem',
              fontWeight: 700,
            }}
          >
            Loading Shape...
          </div>
        )}
      </div>

      {/* Country Switcher Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          width: '100%',
          marginBottom: '1.15rem',
        }}
      >
        {SAMPLE_CODES.map((item, idx) => {
          const isSelected = idx === selectedIdx;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              style={{
                padding: '5px 10px',
                borderRadius: '14px',
                fontSize: '0.78rem',
                fontWeight: 700,
                border: isSelected ? '1px solid #d97706' : '1px solid rgba(160, 125, 85, 0.3)',
                background: isSelected ? '#fef3c7' : '#ffffff',
                color: isSelected ? '#92400e' : '#3c2514',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease',
                fontFamily: 'inherit',
              }}
            >
              <FlagThumb code={item.code} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* CTA Button to Full Game */}
      <Link
        href="/?play=outline#OUTLINE_GAME"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          padding: '12px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '0.94rem',
          textDecoration: 'none',
          boxShadow: '0 6px 18px rgba(217, 119, 6, 0.32)',
          transition: 'transform 0.15s ease',
        }}
      >
        <span>Play Full 5-Round Speedrun</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </div>
  );
}
