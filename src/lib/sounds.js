'use client';

// Web Audio API wrapper for procedural sounds (zero network cost)
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.volume = 0.5;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    // Resume context if suspended (browser autoplay policy)
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  playTone(frequency, type, duration, volMultiplier = 1, slideToFreq = null) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, t);
    
    if (slideToFreq) {
      osc.frequency.exponentialRampToValueAtTime(slideToFreq, t + duration);
    }

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(this.volume * volMultiplier, t + duration * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + duration);
  }

  playPinDrop() {
    // Quick 'bloop' sound
    this.playTone(600, 'sine', 0.15, 0.6, 200);
  }

  playCorrect() {
    // Two-tone chime (ding-ding)
    this.playTone(523.25, 'sine', 0.2, 0.5); // C5
    setTimeout(() => this.playTone(659.25, 'sine', 0.4, 0.5), 100); // E5
  }

  playWrong() {
    // Low buzz
    this.playTone(150, 'sawtooth', 0.3, 0.4, 100);
  }

  playTick() {
    // Very short, quiet click for countdown
    this.playTone(800, 'square', 0.05, 0.1, 400);
  }

  playLevelUp() {
    // Triumphant fanfare
    const notes = [
      { f: 440, d: 0.15 },    // A4
      { f: 554.37, d: 0.15 }, // C#5
      { f: 659.25, d: 0.15 }, // E5
      { f: 880, d: 0.6 },     // A5
    ];
    let timeOffset = 0;
    notes.forEach(note => {
      setTimeout(() => this.playTone(note.f, 'square', note.d, 0.3), timeOffset);
      timeOffset += 150;
    });
  }

  playMatchFound() {
    // Two ascending chimes for match found
    this.playTone(440, 'sine', 0.15, 0.5);
    setTimeout(() => this.playTone(659.25, 'sine', 0.15, 0.5), 120);
    setTimeout(() => this.playTone(880, 'sine', 0.4, 0.5), 240);
  }

  playTimeout() {
    // Low descending tone for timeout
    this.playTone(400, 'sine', 0.3, 0.3, 200);
  }
}

// Singleton instance
export const sounds = new SoundEngine();
