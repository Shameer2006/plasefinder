'use client';

import { useEffect } from 'react';
import { initPlaygamaBridge } from '@/lib/playgamaBridge';
import { useGameStore } from '@/lib/store';

export default function PlaygamaBridgeInit() {
  useEffect(() => {
    initPlaygamaBridge();

    const handleVisibilityChange = () => {
      const hidden = document.visibilityState === 'hidden';
      useGameStore.getState().setPlatformPaused(hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}

