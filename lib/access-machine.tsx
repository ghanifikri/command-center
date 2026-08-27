"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { access, authSeq } from "@/data/event";
import { prefersReducedMotion } from "@/lib/motion";
import { useSound } from "@/lib/sound";
import {
  accessReducer,
  initialAccessState,
  type AccessAction,
  type AccessStateShape,
} from "@/lib/access-reducer";

export interface AccessContextValue extends AccessStateShape {
  openModal: () => void;
  closeModal: () => void;
  inputDigit: (d: string) => void;
  backspace: () => void;
  submit: () => void;
  completeVoice: () => void;
  completeActivation: () => void;
  completeCinematic: () => void;
  toCinematic: () => void;
  toEvent: () => void;
  press: (key: string) => void;
}

const Ctx = createContext<AccessContextValue | null>(null);

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const [a, dispatch] = useReducer(accessReducer, initialAccessState);
  const sound = useSound();
  const timeouts = useRef<number[]>([]);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timeouts.current.push(id);
    return id;
  }, []);

  const clearScheduled = useCallback(() => {
    timeouts.current.forEach(window.clearTimeout);
    timeouts.current = [];
  }, []);

  useEffect(() => {
    return () => clearScheduled();
  }, [clearScheduled]);

  const inputDigit = useCallback(
    (d: string) => {
      if (d.length !== 1 || a.pin.length >= access.codeLength) return;
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
    if (a.state !== "pin" || a.pin.length !== access.codeLength) return;
    dispatch({ type: "VERIFY" });
  }, [a.pin, a.state]);

  // Verify: authentication tone, start verifying pulse, then resolve after cinematic beat
  useEffect(() => {
    if (a.state !== "verifying") return;
    sound.play("authenticate");
    sound.startVerifying();

    const ok = a.pin === access.code;
    schedule(() => {
      sound.stopVerifying();
      dispatch({ type: ok ? "GRANTED" : "DENIED" });
    }, authSeq.durationMs);

    return () => sound.stopVerifying();
  }, [a.state, a.pin, sound, schedule]);

  // Denied: error tone, then reset to pin entry after a beat
  useEffect(() => {
    if (a.state !== "denied") return;
    sound.play("error");
    schedule(() => dispatch({ type: "RETRY" }), 1700);
  }, [a.state, sound, schedule]);

  // Granted: success tone, voice lines, then advance to activation
  useEffect(() => {
    if (a.state !== "granted") return;
    sound.play("success");
    schedule(() => sound.playVoice("granted"), 450);
    schedule(() => sound.playVoice("welcome"), 1500);
    schedule(() => dispatch({ type: "VOICE_DONE" }), 1800);
  }, [a.state, sound, schedule]);

  // Stable dispatchers
  const completeVoice = useCallback(() => dispatch({ type: "VOICE_DONE" }), []);
  const completeActivation = useCallback(() => dispatch({ type: "ACTIVATION_DONE" }), []);
  const completeCinematic = useCallback(() => dispatch({ type: "CINEMATIC_DONE" }), []);
  const toCinematic = useCallback(() => dispatch({ type: "TO_CINEMATIC" }), []);
  const toEvent = useCallback(() => dispatch({ type: "TO_EVENT" }), []);

  const closeModal = useCallback(() => dispatch({ type: "CLOSE_MODAL" }), []);
  const openModal = useCallback(() => {
    sound.play("click");
    sound.resume();
    dispatch({ type: "OPEN_MODAL" });
  }, [sound]);

  // Keyboard: digits, Backspace, Enter, Escape (active while dialog is open)
  useEffect(() => {
    if (a.state !== "pin" && a.state !== "denied") return;
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
  }, [a.state, closeModal, backspace, submit, inputDigit]);

  // Expose state for debugging in development / test runner
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as unknown as { __ACCESS_STATE: string }).__ACCESS_STATE = a.state;
    }
  }, [a.state]);

  // Reduced motion: skip ceremony straight to event page
  useEffect(() => {
    if (!prefersReducedMotion()) return;
    if (
      a.state === "granted" ||
      a.state === "voice" ||
      a.state === "activation" ||
      a.state === "cinematic"
    ) {
      dispatch({ type: "TO_EVENT" });
    }
  }, [a.state]);

  const press = useCallback(
    (key: string) => {
      if (key === "back") backspace();
      else if (key === "ok") submit();
      else inputDigit(key);
    },
    [backspace, submit, inputDigit],
  );

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
        completeCinematic,
        toCinematic,
        toEvent,
        press,
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