"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { authSeq, voice } from "@/data/event";
import { prefersReducedMotion } from "@/lib/motion";
import { useSound } from "@/lib/sound";
import {
  accessReducer,
  initialAccessState,
  type AccessAction,
  type AccessStateShape,
} from "@/lib/access-reducer";

type Action = AccessAction;

interface AccessContextValue extends AccessStateShape {
  openModal: () => void;
  closeModal: () => void;
  inputDigit: (d: string) => void;
  backspace: () => void;
  submit: () => void;
  completeVoice: () => void;
  completeActivation: () => void;
  toCinematic: () => void;
  press: (key: string) => void;
}

const Ctx = createContext<AccessContextValue | null>(null);

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const [a, dispatch] = useReducer(accessReducer, initialAccessState);
  const sound = useSound();
  const timeouts = useRef<number[]>([]);

  const schedule = useCallback((fn: () => void, ms: number) => {
    timeouts.current.push(window.setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    return () => timeouts.current.forEach(clearTimeout);
  }, []);

  const inputDigit = useCallback(
    (d: string) => {
      if (d.length !== 1 || a.pin.length >= 6) return;
      dispatch({ type: "SET_PIN", pin: a.pin + d });
      sound.play("beep");
    },
    [a.pin, sound],
  );

  const backspace = useCallback(() => {
    if (!a.pin) return;
    dispatch({ type: "SET_PIN", pin: a.pin.slice(0, -1) });
    sound.play("click");
  }, [a.pin, sound]);

  const submit = useCallback(() => {
    if (a.state !== "pin" || a.pin.length !== 6) return;
    dispatch({ type: "VERIFY" });
  }, [a.pin, a.state]);

  // Verify: authentication tone, then resolve after a cinematic beat.
  // Start verifying pulse sound while authenticating.
  useEffect(() => {
    if (a.state !== "verifying") return;
    sound.play("authenticate");
    sound.startVerifying();
    const ok = a.pin === "280296";
    schedule(
      () => {
        sound.stopVerifying();
        dispatch({ type: ok ? "GRANTED" : "DENIED" });
      },
      authSeq.durationMs,
    );
    return () => sound.stopVerifying();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a.state]);

  // Denied: error tone, then reset to pin entry after a beat.
  useEffect(() => {
    if (a.state !== "denied") return;
    sound.play("error");
    schedule(() => dispatch({ type: "RETRY" }), 1700);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a.state]);

  // Granted: success tone, voice lines, then advance to the activation
  // sequence. Fires once on granted entry (a.state dep); overlapping retry
  // entries re-fire, but later VOICE_DONE dispatches are reducer no-ops.
  useEffect(() => {
    if (a.state !== "granted") return;
    sound.play("success");
    schedule(() => sound.playVoice("granted"), 450);
    schedule(() => sound.playVoice("welcome"), 15500);
    // schedule(() => sound.playVoice("moment"), 5000);
    schedule(() => sound.playVoice("closing"), 17500);
    schedule(() => sound.playVoice("future"), 19500);
    schedule(() => dispatch({ type: "VOICE_DONE" }), 1600);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a.state]);

  // Stable dispatchers — never churn dependents (SystemActivation, transitions
  // and other effect-driven flow components rely on these identities).
  const dispatchStable = useCallback(
    (action: AccessAction) => {
      console.log("[access-machine] dispatchStable:", action.type, "current state:", a.state);
      dispatch(action);
    },
    [],
  );
  const completeVoice = useCallback(
    () => dispatchStable({ type: "VOICE_DONE" }),
    [dispatchStable],
  );
  const completeActivation = useCallback(
    () => dispatchStable({ type: "ACTIVATION_DONE" }),
    [dispatchStable],
  );
  // toCinematic dispatches TO_CINEMATIC (event -> cinematic)
  const toCinematic = useCallback(
    () => dispatchStable({ type: "TO_CINEMATIC" }),
    [dispatchStable],
  );

  const closeModal = useCallback(() => dispatch({ type: "CLOSE_MODAL" }), []);
  const openModal = useCallback(() => {
    sound.play("click");
    sound.resume();
    dispatch({ type: "OPEN_MODAL" });
  }, [sound]);

  // Keyboard: digits, Backspace, Enter, Escape (active only while dialog is open).
  useEffect(() => {
    if (a.state !== "pin") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        backspace();
      } else if (e.key === "Enter") {
        e.preventDefault();
        submit();
      } else if (/^\d$/.test(e.key)) {
        e.preventDefault();
        inputDigit(e.key);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a.state, a.pin]);

  // Expose state for debugging
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).__ACCESS_STATE = a.state;
    }
  }, [a.state]);

  // Reduced motion: skip the long ceremony and jump straight to the event.
  useEffect(() => {
    const reduced = prefersReducedMotion();
    console.log("[access-machine] reduced motion check:", reduced, "state:", a.state);
    if (!reduced) return;
    if (a.state === "granted" || a.state === "voice")
      dispatch({ type: "ACTIVATION_DONE" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a.state]);
  useEffect(() => {
    const reduced = prefersReducedMotion();
    console.log("[access-machine] reduced motion check 2:", reduced, "state:", a.state);
    if (!reduced) return;
    if (a.state === "activation" || a.state === "event")
      dispatch({ type: "TO_CINEMATIC" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a.state]);

  // Auto-advance from event to cinematic after event page is viewed
  // Event page: user scrolls through sections, then cinematic plays
  useEffect(() => {
    if (a.state !== "event") return;
    // Give user time to view event page (30s), then auto-transition to cinematic
    const timer = window.setTimeout(() => dispatch({ type: "TO_CINEMATIC" }), 30000);
    return () => window.clearTimeout(timer);
  }, [a.state]);

  // Auto-advance from voice to activation (fallback if SystemActivation doesn't complete)
  useEffect(() => {
    if (a.state !== "voice") return;
    // 6 systems × 2.3s each = ~13.8s, plus buffer
    const timer = window.setTimeout(() => dispatch({ type: "ACTIVATION_DONE" }), 17000);
    return () => window.clearTimeout(timer);
  }, [a.state]);

  return (
    <Ctx.Provider
      value={{
        ...a,
        openModal,
        closeModal,
        inputDigit,
        backspace,
        submit,
        completeVoice,
        completeActivation,
        toCinematic,
        press: (key: string) => {
          if (key === "back") backspace();
          else if (key === "ok") submit();
          else inputDigit(key);
        },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAccess(): AccessContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAccess must be used within AccessProvider");
  return ctx;
}