'use client';
import { useState, useEffect, useRef } from 'react';
import { sounds } from '@/lib/sounds';
import styles from './EyeOpeningIntro.module.css';

export default function EyeOpeningIntro({ onComplete }) {
  const [phase, setPhase] = useState('closed');
  // closed → text → opening (eyelids separate + blur clears)
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const timers = [];

    // Show "Where am I…?" after brief darkness
    timers.push(setTimeout(() => setPhase('text'), 400));

    // Start opening eyes + ambient sound
    timers.push(setTimeout(() => {
      setPhase('opening');
      sounds.playEyeOpen();
    }, 2200));

    // Animation finished — hand control to Game
    timers.push(setTimeout(() => {
      onCompleteRef.current?.();
    }, 5000));

    return () => timers.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.overlay} aria-hidden="true">
      {/* Blur + darken layer */}
      <div
        className={`${styles.blurOverlay} ${
          phase === 'opening' ? styles.blurClearing : ''
        }`}
      />

      {/* Peripheral vignette (eye shape) */}
      <div
        className={`${styles.vignette} ${
          phase === 'opening' ? styles.vignetteClearing : ''
        }`}
      />

      {/* Top eyelid */}
      <div
        className={`${styles.eyelid} ${styles.top} ${
          phase === 'opening' ? styles.topOpen : ''
        }`}
      >
        <div className={styles.eyelidEdge} />
      </div>

      {/* Bottom eyelid */}
      <div
        className={`${styles.eyelid} ${styles.bottom} ${
          phase === 'opening' ? styles.bottomOpen : ''
        }`}
      >
        <div className={`${styles.eyelidEdge} ${styles.eyelidEdgeBottom}`} />
      </div>

      {/* "Where am I...?" flicker text */}
      <div
        className={`${styles.text} ${
          phase === 'text' ? styles.textVisible : ''
        }`}
      >
        Where am I...?
      </div>
    </div>
  );
}
