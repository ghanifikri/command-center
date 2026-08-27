"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type SoundName =
  | "click"
  | "beep"
  | "success"
  | "error"
  | "authenticate"
  | "verifying";

export type VoiceKind = "granted" | "welcome" | "moment" | "closing" | "future";

interface SoundManagerContextValue {
  startVerifying: () => void;
  stopVerifying: () => void;
  muted: boolean;
  toggleMuted: () => void;
  play: (name: SoundName) => void;
  playVoice: (kind: VoiceKind) => void;
  resume: () => void;
}

const SoundManagerContext = createContext<SoundManagerContextValue | null>(null);

const VOICE_FILES: Record<VoiceKind, string> = {
  granted: "/audio/voice-access-granted.wav",
  welcome: "/audio/voice-welcome.wav",
  moment: "/audio/voice-moment.wav",
  closing: "/audio/voice-closing.wav",
  future: "/audio/voice-future.wav",
};

const UI_FILES: Partial<Record<SoundName, string>> = {
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
  const verifyingIntervalRef = useRef<number | null>(null);
  const [muted, setMuted] = useState(false);

  const getAudioContext = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    const AudioCtx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    ctxRef.current ??= new AudioCtx();
    return ctxRef.current;
  }, []);

  const resume = useCallback(() => {
    const c = getAudioContext();
    if (c && c.state === "suspended") {
      void c.resume().catch(() => {});
    }
  }, [getAudioContext]);

  const synth = useCallback(
    (name: SoundName) => {
      if (muted) return;
      const c = getAudioContext();
      if (!c || c.state !== "running") return;
      const def = SYNTH[name];
      if (!def) return;

      try {
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
      } catch {
        // Safe no-op if audio node creation is restricted
      }
    },
    [muted, getAudioContext],
  );

  const startVerifying = useCallback(() => {
    if (muted) return;
    const c = getAudioContext();
    if (!c || c.state !== "running" || verifyingOscRef.current) return;

    try {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, c.currentTime);
      gain.gain.setValueAtTime(0.015, c.currentTime);
      osc.connect(gain).connect(c.destination);
      osc.start();
      verifyingOscRef.current = osc;
      verifyingGainRef.current = gain;

      const pulse = () => {
        if (!verifyingGainRef.current || !verifyingOscRef.current || !c) return;
        const t = c.currentTime;
        verifyingGainRef.current.gain.setValueAtTime(0.015, t);
        verifyingGainRef.current.gain.linearRampToValueAtTime(0.035, t + 0.4);
        verifyingGainRef.current.gain.linearRampToValueAtTime(0.015, t + 0.8);
      };
      verifyingIntervalRef.current = window.setInterval(pulse, 800);
    } catch {
      // Audio node failure fallback
    }
  }, [muted, getAudioContext]);

  const stopVerifying = useCallback(() => {
    if (verifyingIntervalRef.current !== null) {
      window.clearInterval(verifyingIntervalRef.current);
      verifyingIntervalRef.current = null;
    }
    if (verifyingOscRef.current) {
      try {
        verifyingOscRef.current.stop();
        verifyingOscRef.current.disconnect();
      } catch {
        // Ignore disconnect errors
      }
      verifyingOscRef.current = null;
      verifyingGainRef.current = null;
    }
  }, []);

  const playFile = useCallback(
    (path: string | undefined): Promise<void> => {
      if (muted || !path || typeof window === "undefined") return Promise.resolve();
      return new Promise<void>((resolve) => {
        const audio = new Audio(path);
        audio.volume = 0.8;
        audio.preload = "auto";
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
        audio.play().catch(() => resolve());
      });
    },
    [muted],
  );

  const play = useCallback(
    (name: SoundName) => {
      if (muted) return;
      resume();
      const file = UI_FILES[name];
      if (file) {
        playFile(file).catch(() => synth(name));
      } else {
        synth(name);
      }
    },
    [muted, playFile, synth, resume],
  );

  const playVoice = useCallback(
    (kind: VoiceKind) => {
      if (muted) return;
      resume();
      void playFile(VOICE_FILES[kind]);
    },
    [muted, playFile, resume],
  );

  const toggleMuted = useCallback(() => {
    setMuted((m) => !m);
    if (!muted) {
      stopVerifying();
      if (ctxRef.current && ctxRef.current.state === "running") {
        void ctxRef.current.suspend();
      }
    } else {
      resume();
    }
  }, [muted, stopVerifying, resume]);

  return { muted, toggleMuted, play, playVoice, resume, startVerifying, stopVerifying };
}

export function SoundProvider({ children }: { children: ReactNode }) {
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
