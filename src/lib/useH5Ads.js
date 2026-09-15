'use client';
import { useEffect, useRef, useCallback } from 'react';

/**
 * Google AdSense for H5 Games API Integration Hook
 * 
 * Complies with the official Google AdSense H5 Games Ads specification:
 * https://developers.google.com/ad-placement/docs/quickstart
 * 
 * Allows triggering:
 * - 'start': Preroll ad before a game starts
 * - 'next': Interstitial ad between game rounds (e.g. Round 5 score screen)
 * - 'reward': Rewarded ad when a player requests an optional hint
 */
export function useH5Ads({ client = 'ca-pub-1006713173738488', sound = 'on' } = {}) {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Ensure adBreak and adConfig stubs exist
    window.adsbygoogle = window.adsbygoogle || [];
    window.adBreak = window.adBreak || function(o) {
      // Graceful fallback if SDK is still loading or adblock active
      if (o && o.adBreakDone) o.adBreakDone({ breakStatus: 'notReady' });
    };
    window.adConfig = window.adConfig || function(o) {};

    if (!isInitialized.current) {
      window.adConfig({
        preloadAdBreaks: 'on',
        sound: sound,
        onReady: () => {
          isInitialized.current = true;
        },
      });
    }
  }, [sound]);

  /**
   * Triggers an interstitial or preroll ad break between match rounds.
   */
  const triggerAdBreak = useCallback(({ type = 'next', name = 'round_transition', beforeAd, afterAd, onDone } = {}) => {
    if (typeof window === 'undefined') {
      if (onDone) onDone({ breakStatus: 'server' });
      return;
    }

    window.adBreak({
      type: type, // 'start', 'next', 'pause', 'browse'
      name: name,
      beforeAd: () => {
        if (beforeAd) beforeAd();
      },
      afterAd: () => {
        if (afterAd) afterAd();
      },
      adBreakDone: (placementInfo) => {
        if (onDone) onDone(placementInfo);
      },
    });
  }, []);

  /**
   * Triggers a rewarded video ad (e.g. for bonus coins or round hints).
   */
  const triggerRewardedAd = useCallback(({ name = 'rewarded_hint', beforeAd, afterAd, beforeReward, onDone } = {}) => {
    if (typeof window === 'undefined') {
      if (onDone) onDone({ breakStatus: 'server' });
      return;
    }

    window.adBreak({
      type: 'reward',
      name: name,
      beforeAd: () => {
        if (beforeAd) beforeAd();
      },
      afterAd: () => {
        if (afterAd) afterAd();
      },
      beforeReward: (showAdFn) => {
        // Prompt user to confirm if required, then show ad
        showAdFn();
        if (beforeReward) beforeReward();
      },
      adDismissed: () => {
        // Player closed ad early without reward
      },
      adViewed: () => {
        // Player watched full ad — grant reward
      },
      adBreakDone: (placementInfo) => {
        if (onDone) onDone(placementInfo);
      },
    });
  }, []);

  return {
    triggerAdBreak,
    triggerRewardedAd
  };
}
