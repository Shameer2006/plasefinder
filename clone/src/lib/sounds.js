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

  playEyeOpen() {
    // Low, atmospheric rising tone — simulates waking up
    this.playTone(60, 'sine', 3, 0.12, 250);
    setTimeout(() => this.playTone(120, 'sine', 2, 0.06, 400), 800);
  }

  playPhoneOpen() {
    // Short UI tap / notification
    this.playTone(1200, 'sine', 0.08, 0.15, 900);
    setTimeout(() => this.playTone(1400, 'sine', 0.06, 0.1), 60);
  }

  playScoreReveal() {
    // Rising "cha-ching" — coin-drop feel
    this.playTone(880, 'sine', 0.12, 0.4);
    setTimeout(() => this.playTone(1108.73, 'sine', 0.12, 0.4), 80);   // C#6
    setTimeout(() => this.playTone(1318.51, 'sine', 0.25, 0.45), 160);  // E6
    setTimeout(() => this.playTone(1760, 'sine', 0.4, 0.3), 280);      // A6 shimmer
  }

  playRareRound() {
    // Dramatic ascending flourish for bonus round announcement
    const notes = [
      { f: 523.25, d: 0.1 },  // C5
      { f: 659.25, d: 0.1 },  // E5
      { f: 783.99, d: 0.1 },  // G5
      { f: 1046.5, d: 0.35 }, // C6
    ];
    let t = 0;
    notes.forEach(n => {
      setTimeout(() => this.playTone(n.f, 'sine', n.d, 0.35), t);
      t += 100;
    });
  }

  playStreakUp() {
    // Quick celebratory ascending triple-ping
    this.playTone(659.25, 'sine', 0.12, 0.3);   // E5
    setTimeout(() => this.playTone(783.99, 'sine', 0.12, 0.3), 100);  // G5
    setTimeout(() => this.playTone(1046.5, 'sine', 0.3, 0.35), 200);  // C6
  }
}

// Singleton instance
export const sounds = new SoundEngine();
