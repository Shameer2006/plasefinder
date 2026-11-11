'use client';

import { sounds } from './sounds';
import { useGameStore } from './store';

let initPromise = null;
let initialized = false;
let gameReadySent = false;
let storageSaveTimer = null;

const BRIDGE_STORAGE_KEY = 'loststreet_save';

function getBridgeInstance() {
  if (typeof window === 'undefined') return null;
  return window.bridge || null;
}

/**
 * Safely send a platform lifecycle message (e.g., 'game_ready', 'gameplay_started', 'gameplay_stopped').
 */
export function sendPlaygamaMessage(message) {
  const bridge = getBridgeInstance();
  if (!bridge || !initialized || !bridge.platform?.sendMessage) return;
  try {
    bridge.platform.sendMessage(message);
  } catch (err) {
    // Mock/unsupported environments safely ignore platform messages
  }
}

/**
 * Signals 'game_ready' once the first playable frame has painted.
 */
export function notifyPlaygamaGameReady() {
  if (gameReadySent) return;
  const bridge = getBridgeInstance();
  if (!bridge || !initialized) return;
  gameReadySent = true;
  const readyMsg = bridge.PLATFORM_MESSAGE?.GAME_READY || 'game_ready';
  sendPlaygamaMessage(readyMsg);
}

function hydrateStoreFromBridge(bridge) {
  if (!bridge?.storage?.get) return Promise.resolve();
  const isMock = !bridge.platform?.id || bridge.platform.id === 'mock';
  if (isMock) return Promise.resolve();

  return bridge.storage
    .get([BRIDGE_STORAGE_KEY])
    .then((data) => {
      const raw = Array.isArray(data) ? data[0] : data?.[BRIDGE_STORAGE_KEY] ?? data;
      if (!raw) return;
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (parsed && typeof parsed === 'object') {
        const store = useGameStore.getState();
        if (typeof parsed.coins === 'number') store.setCoins(parsed.coins);
        if (typeof parsed.soundEnabled === 'boolean') store.setSoundEnabled(parsed.soundEnabled);
        if (typeof parsed.soundVolume === 'number') store.setSoundVolume(parsed.soundVolume);
        if (typeof parsed.loginStreak === 'number') store.setLoginStreak(parsed.loginStreak);
        if (typeof parsed.lastClaimDate === 'string') store.setLastClaimDate(parsed.lastClaimDate);
        if (parsed.units) store.setUnits(parsed.units);
        if (parsed.mapType) store.setMapType(parsed.mapType);
      }
    })
    .catch(() => {
      // Fallback safely to existing local state if storage is empty or unavailable
    });
}

function setupBridgeStorageSync(bridge) {
  if (!bridge?.storage?.set) return;
  const isMock = !bridge.platform?.id || bridge.platform.id === 'mock';
  if (isMock) return;

  let lastSerialized = '';
  useGameStore.subscribe((state) => {
    const payload = JSON.stringify({
      coins: state.coins,
      soundEnabled: state.soundEnabled,
      soundVolume: state.soundVolume,
      units: state.units,
      mapType: state.mapType,
      loginStreak: state.loginStreak,
      lastClaimDate: state.lastClaimDate,
    });
    if (payload === lastSerialized) return;
    lastSerialized = payload;

    if (storageSaveTimer) clearTimeout(storageSaveTimer);
    storageSaveTimer = setTimeout(() => {
      try {
        bridge.storage.set([BRIDGE_STORAGE_KEY], [payload]);
      } catch {}
    }, 600);
  });
}

/**
 * Initializes Playgama Bridge SDK v2, binds audio/pause lifecycle listeners,
 * hydrates Bridge storage on supported platforms, and signals 'game_ready'.
 */
export function initPlaygamaBridge() {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (initPromise) return initPromise;

  const bridge = getBridgeInstance();
  if (!bridge || typeof bridge.initialize !== 'function') {
    return Promise.resolve(false);
  }

  initPromise = bridge
    .initialize()
    .then(async () => {
      initialized = true;

      // 1. Platform language
      const lang = bridge.platform?.language;
      if (lang) {
        useGameStore.getState().setPlatformLanguage(lang);
      }

      // 2. Initial audio state
      if (bridge.platform && typeof bridge.platform.isAudioEnabled === 'boolean') {
        sounds.setPlatformMuted(!bridge.platform.isAudioEnabled);
      }

      // 3. Subscribe to audio & pause state changes
      const audioEvent = bridge.EVENT_NAME?.AUDIO_STATE_CHANGED || 'audio_state_changed';
      const pauseEvent = bridge.EVENT_NAME?.PAUSE_STATE_CHANGED || 'pause_state_changed';

      if (typeof bridge.platform?.on === 'function') {
        bridge.platform.on(audioEvent, (isEnabled) => {
          sounds.setPlatformMuted(!isEnabled);
        });
        bridge.platform.on(pauseEvent, (isPaused) => {
          useGameStore.getState().setPlatformPaused(!!isPaused);
        });
      }

      // 4. Read saved state from Bridge Storage when running on hosted platforms
      await hydrateStoreFromBridge(bridge);
      setupBridgeStorageSync(bridge);

      // 5. Signal 'game_ready' once the first playable frame renders
      requestAnimationFrame(() => {
        notifyPlaygamaGameReady();
      });

      return true;
    })
    .catch(() => {
      return false;
    });

  return initPromise;
}

