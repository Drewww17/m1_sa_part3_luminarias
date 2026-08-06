// F1 Motorsport Web Audio API Synthesizer
// Generates engine revs, gear downshifts, and UI clicks without external audio asset dependencies

let audioCtx = null;
let soundEnabled = true;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleAudio(enable) {
  if (enable !== undefined) {
    soundEnabled = enable;
  } else {
    soundEnabled = !soundEnabled;
  }
  return soundEnabled;
}

export function isAudioEnabled() {
  return soundEnabled;
}

/**
 * Play subtle UI click / hover tick
 */
export function playHoverTick() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {
    // Ignore audio context errors on strict browser autoplay policies
  }
}

/**
 * Play high-RPM F1 engine rev & upshift sound
 */
export function playEngineRev() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    // F1 Engine V10 / V6 Turbo Hybrid rev frequency ramp
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.18);
    osc.frequency.setValueAtTime(450, ctx.currentTime + 0.19); // Quick gear shift drop
    osc.frequency.exponentialRampToValueAtTime(1300, ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  } catch (e) {
    // Ignore
  }
}
