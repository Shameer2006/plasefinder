'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

/**
 * AntiqueCompassBackground
 * 
 * Recreates the authentic visual aesthetic of a vintage hand-drawn nautical compass rose
 * on aged parchment paper, inspired by classical 16th-century cartography and treasure maps.
 * 
 * Layers:
 * 1. Warm parchment base tone (#f5ede0)
 * 2. High-resolution organic aged paper texture (stains, creases, fibers)
 * 3. Atmospheric sepia vignette with burnt/charred edges & subtle stain spots
 * 4. Classical cartographic rhumb lines (navigation course lines)
 * 5. Hand-drawn eight-point antique compass rose with fleur-de-lis and dark brown ink
 * 6. Subtle 90-120s rotation and gentle mouse parallax (disabled on prefers-reduced-motion)
 */
export default function AntiqueCompassBackground({
  mode = 'fixed', // 'fixed' | 'absolute' | 'hero'
  enableRotation = false,
  enableParallax = true,
  opacity = 0.55,
  showRhumbLines = true,
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef(null);

  // Check for prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener?.('change', handler);
    return () => mediaQuery.removeEventListener?.('change', handler);
  }, []);

  // Subtle mouse parallax effect
  useEffect(() => {
    if (!enableParallax || reducedMotion || typeof window === 'undefined') return;

    let rafId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalize to -1 .. 1
      const normX = (e.clientX / innerWidth) * 2 - 1;
      const normY = (e.clientY / innerHeight) * 2 - 1;
      // Subtle maximum travel: ±12px
      targetX = normX * 12;
      targetY = normY * 12;
    };

    const animate = () => {
      // Smooth lerp (linear interpolation)
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        setOffset({ x: currentX, y: currentY });
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enableParallax, reducedMotion]);

  const isFixed = mode === 'fixed';

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: isFixed ? 'fixed' : 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        userSelect: 'none',
        backgroundColor: '#f6efe2', // Base warm parchment beige
      }}
    >
      {/* ── LAYER 1: AGED PARCHMENT TEXTURE ─────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/images/parchment-texture.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.38,
          mixBlendMode: 'multiply',
        }}
      />

      {/* ── LAYER 2: ATMOSPHERIC VIGNETTE & BURNED BURNT EDGES ───────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(255, 252, 245, 0) 30%, rgba(200, 168, 124, 0.35) 75%, rgba(68, 40, 16, 0.65) 100%),
            radial-gradient(circle at 12% 82%, rgba(110, 70, 30, 0.18) 0%, transparent 45%),
            radial-gradient(circle at 88% 25%, rgba(100, 65, 28, 0.16) 0%, transparent 40%)
          `,
          mixBlendMode: 'multiply',
        }}
      />

      {/* ── LAYER 3: HISTORICAL MAP RHUMB LINES (SEA NAVIGATION GRID) ───── */}
      {showRhumbLines && (
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.15,
            mixBlendMode: 'multiply',
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="rhumbGrid" width="600" height="600" patternUnits="userSpaceOnUse">
              <line x1="300" y1="0" x2="300" y2="600" stroke="#4a301a" strokeWidth="0.75" strokeDasharray="6 4" />
              <line x1="0" y1="300" x2="600" y2="300" stroke="#4a301a" strokeWidth="0.75" strokeDasharray="6 4" />
              <line x1="0" y1="0" x2="600" y2="600" stroke="#4a301a" strokeWidth="0.5" strokeDasharray="8 6" />
              <line x1="600" y1="0" x2="0" y2="600" stroke="#4a301a" strokeWidth="0.5" strokeDasharray="8 6" />
              <circle cx="300" cy="300" r="240" fill="none" stroke="#4a301a" strokeWidth="0.5" strokeDasharray="4 6" />
              <circle cx="300" cy="300" r="140" fill="none" stroke="#4a301a" strokeWidth="0.5" strokeDasharray="4 6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rhumbGrid)" />
        </svg>
      )}

      {/* ── LAYER 4: THE ANTIQUE HAND-DRAWN COMPASS ROSE ────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: mode === 'hero' ? '40%' : '38%',
          left: '50%',
          width: 'clamp(320px, 68vw, 760px)',
          height: 'clamp(320px, 68vw, 760px)',
          transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
          transition: 'transform 0.12s ease-out',
          willChange: 'transform',
        }}
      >
        {/* Soft radial mask to feather outer perimeter seamlessly into parchment */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            mixBlendMode: 'multiply',
            opacity,
          }}
        >
          {/* Rotating Compass Layer */}
          <div
            className={enableRotation && !reducedMotion ? 'antique-compass-spinning' : ''}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animationDuration: '100s',
            }}
          >

          </div>
        </div>
      </div>

      {/* ── LAYER 5: SUBTLE PARCHMENT LIGHT WASH OVERLAY ─────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.18) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
