"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

export type SoundName =
  | "click"
  | "beep"
  | "success"
  | "error"
  | "authenticate"
  | "verifying";

/**
 * Modular sound system.
 *
 * Priority per audio-voice.md:
 *   1. Real audio files in /public/audio (voice-over, music, etc.)
 *   2. Web Audio synthesized tones as an always-available fallback
 *   3. Silent no-op — the experience must never break on audio failure
 *
 * The synthesized click/beep/success/error tones exist so the PIN flow still
 * "sounds" premium before any audio assets are delivered. Voice-over is
 * strictly file-based (never synthesized) and is fully optional.
 */
interface SoundManagerContextValue {
  startVerifying: () => void;
  stopVerifying: () => void;
  muted: boolean;
  toggleMuted: () => void;
  play: (name: SoundName) => void;
  playVoice: (kind: "granted" | "welcome" | "moment" | "closing" | "future") => void;
  resume: () => void;
}

const SoundManagerContext = createContext<SoundManagerContextValue | null>(null);

const VOICE_FILES: Record<string, string | undefined> = {
  granted: "/audio/voice-access-granted.wav",
  welcome: "/audio/voice-welcome.wav",
  moment: "/audio/voice-moment.wav",
  closing: "/audio/voice-closing.wav",
  future: "/audio/voice-future.wav",
};

const UI_FILES: Record<string, string | undefined> = {
  click: "/audio/ui-click.mp3",
  beep: "/audio/pin-beep.mp3",
  success: "/audio/access-granted.mp3",
  error: "/audio/error.mp3",
  authenticate: "/audio/transition.mp3",
  verifying: "/audio/verifying.mp3",
};

const SYNTH = {
  click: { freq: 660, end: 480, dur: 0.05, type: "sine" as OscillatorType, gain: 0.05 },
  beep: { freq: 1567, end: 1800, dur: 0.06, type: "sine" as OscillatorType, gain: 0.06 },
  success: { freq: 660, end: 1180, dur: 0.45, type: "sine" as OscillatorType, gain: 0.05 },
  error: { freq: 240, end: 150, dur: 0.28, type: "sine" as OscillatorType, gain: 0.05 },
  authenticate: { freq: 440, end: 720, dur: 0.7, type: "sine" as OscillatorType, gain: 0.03 },
  verifying: { freq: 520, end: 520, dur: 0.3, type: "sine" as OscillatorType, gain: 0.025 },
};

function useAudioEngine() {
  const ctxRef = useRef<AudioContext | null>(null);
  const verifyingOscRef = useRef<OscillatorNode | null>(null);
  const verifyingGainRef = useRef<GainNode | null>(null);
  const [muted, setMuted] = useState(false);

  const ctx = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctxRef.current ??= new AC();
    return ctxRef.current;
  }, []);

  const synth = useCallback(
    (name: SoundName) => {
      if (muted) return;
      const c = ctx();
      if (!c || c.state !== "running") return;
      const def = SYNTH[name];
      if (!def) return;
      const t0 = c.currentTime;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = def.type;
      osc.frequency.setValueAtTime(def.freq, t0);
      osc.frequency.exponentialRampToValueAtTime(Math.max(def.end, 1), t0 + def.dur);
      gain.gain.setValueAtTime(def.gain, t0);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + def.dur);
      osc.connect(gain).connect(c.destination);
      osc.start(t0);
      osc.stop(t0 + def.dur + 0.02);
    },
    [muted, ctx],
  );

  // Continuous verifying pulse sound
  const startVerifying = useCallback(() => {
    if (muted) return;
    const c = ctx();
    if (!c || c.state !== "running") return;
    if (verifyingOscRef.current) return;

    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, c.currentTime);
    gain.gain.setValueAtTime(0.015, c.currentTime);
    osc.connect(gain).connect(c.destination);
    osc.start();
    verifyingOscRef.current = osc;
    verifyingGainRef.current = gain;

    // Pulsing effect
    const pulse = () => {
      if (!verifyingGainRef.current || !verifyingOscRef.current) return;
      const t = c.currentTime;
      verifyingGainRef.current.gain.setValueAtTime(0.015, t);
      verifyingGainRef.current.gain.linearRampToValueAtTime(0.035, t + 0.4);
      verifyingGainRef.current.gain.linearRampToValueAtTime(0.015, t + 0.8);
    };
    const interval = setInterval(pulse, 800);
    verifyingOscRef.current.onended = () => clearInterval(interval);
  }, [muted, ctx]);

  const stopVerifying = useCallback(() => {
    if (verifyingOscRef.current) {
      verifyingOscRef.current.stop();
      verifyingOscRef.current = null;
      verifyingGainRef.current = null;
    }
  }, []);

  const playFile = useCallback(
    (path: string | undefined) => {
      if (muted || !path) return Promise.resolve();
      return new Promise<void>((resolve) => {
        const audio = new Audio(path);
        audio.volume = 0.8;
        audio.preload = "none";
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
        audio.play().catch(() => resolve());
      });
    },
    [muted],
  );

  const resume = useCallback(() => {
    const c = ctx();
    if (c && c.state === "suspended") void c.resume();
  }, [ctx]);

  const play = useCallback(
    (name: SoundName) => {
      if (muted) return;
      const file = UI_FILES[name];
      if (file) {
        void playFile(file);
        synth(name);
      } else {
        synth(name);
      }
    },
    [muted, playFile, synth],
  );

  const playVoice = useCallback(
    (kind: "granted" | "welcome" | "moment" | "closing" | "future") => {
      void playFile(VOICE_FILES[kind]);
    },
    [playFile],
  );

  const toggleMuted = useCallback(() => {
    setMuted((m) => !m);
    ctxRef.current?.suspend();
  }, []);

  return { muted, toggleMuted, play, playVoice, resume, startVerifying, stopVerifying };
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const engine = useAudioEngine();
  return (
    <SoundManagerContext.Provider value={engine}>
      {children}
    </SoundManagerContext.Provider>
  );
}

export function useSound(): SoundManagerContextValue {
  const ctx = useContext(SoundManagerContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}
