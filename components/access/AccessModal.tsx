"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { X, ShieldCheck, Lock } from "lucide-react";
import PinIndicator from "@/components/access/PinIndicator";
import PinPad from "@/components/access/PinPad";
import { access, secureAccess, authSeq } from "@/data/event";
import { useAccess } from "@/lib/access-machine";
import { easeOut } from "@/lib/motion";

export default function AccessModal() {
  const { state, pin, closeModal, press, submit } = useAccess();
  const controls = useAnimationControls();
  const [progress, setProgress] = useState(0);

  const verified = state === "verifying";

  // Trigger progress counter animation when verifying starts
  useEffect(() => {
    if (verified) {
      setProgress(0);
      controls.start({ width: "100%" });
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 2;
        });
      }, 28); // ~1400ms / 50 steps = 28ms
      return () => clearInterval(interval);
    }
  }, [verified, controls]);

  // Handle keyboard input
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (state !== "pin" && state !== "denied") return;
      if (e.key >= "0" && e.key <= "9") {
        if (pin.length < access.codeLength) press(e.key);
      } else if (e.key === "Backspace") {
        press("back");
      } else if (e.key === "Enter" && pin.length === access.codeLength) {
        submit();
      } else if (e.key === "Escape") {
        closeModal();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [press, submit, closeModal, pin.length, state]);

  if (!state || state === "landing" || state === "idle") return null;

  // Only show modal during PIN entry, denied, or verifying
  const showModal = state === "pin" || state === "denied" || state === "verifying";
  if (!showModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050A0F]/80 p-4 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby={verified ? undefined : "secure-access-title"}
        aria-describedby={verified ? undefined : "secure-access-desc"}
      >
        {/* Ambient background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-[450px] w-[450px] rounded-full bg-[#00D4FF]/15 blur-[120px]"
        />

        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="relative w-full max-w-[420px] overflow-hidden rounded-3xl border border-[#00D4FF]/30 bg-[#07111D]/90 p-6 shadow-[0_0_60px_rgba(0,212,255,0.15)] backdrop-blur-2xl sm:p-8"
        >
          {/* Sci-Fi Corner Brackets */}
          <div className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 border-l-2 border-t-2 border-[#00D4FF]" />
          <div className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 border-r-2 border-t-2 border-[#00D4FF]" />
          <div className="pointer-events-none absolute bottom-3 left-3 h-3.5 w-3.5 border-b-2 border-l-2 border-[#00D4FF]" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-3.5 w-3.5 border-b-2 border-r-2 border-[#00D4FF]" />

          {/* Close button - only show in PIN and DENIED states */}
          {(state === "pin" || state === "denied") && (
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-lg border border-[#1B2A36] bg-[#0B1724]/80 text-[#8B98A5] transition-all hover:border-[#FF4D5A]/50 hover:bg-[#FF4D5A]/10 hover:text-[#FF4D5A]"
              aria-label="Tutup"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {verified ? (
            <motion.div
              key="verifying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-6 text-center"
              aria-live="polite"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00D4FF]/40 bg-[#00D4FF]/10 text-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                <ShieldCheck className="h-7 w-7 animate-pulse" />
              </div>

              <h3 className="font-display text-xl font-bold uppercase tracking-[0.2em] text-[#F5F7FA]">
                {authSeq.authenticating}
              </h3>

              {/* Progress bar with percentage */}
              <div className="mx-auto mt-6 w-full max-w-[300px]">
                <div className="mb-2 flex justify-between font-mono text-[0.68rem] text-[#00D4FF]">
                  <span className="tracking-wider">VERIFYING ACCESS...</span>
                  <span className="font-bold">{progress}%</span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#1B2A36]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#00D4FF] to-[#00E5A0]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.4, ease: "easeInOut" }}
                  />
                </div>
              </div>

              <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-[#8B98A5]">
                {authSeq.progress1}
              </p>
            </motion.div>
          ) : (
            <motion.div key="pin" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Header Badge */}
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded border border-[#00D4FF]/40 bg-[#00D4FF]/10 text-[#00D4FF]">
                  <Lock className="h-3 w-3" />
                </div>
                <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#00D4FF]">
                  {secureAccess.status}
                </span>
              </div>

              <h2
                id="secure-access-title"
                className="font-display text-2xl font-bold uppercase tracking-[0.12em] text-[#F5F7FA]"
              >
                {secureAccess.system}
              </h2>

              <p
                id="secure-access-desc"
                className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[#8B98A5]"
              >
                {state === "denied" ? (
                  <span className="font-bold text-[#FF4D5A] animate-pulse">
                    ACCESS DENIED · INVALID CODE
                  </span>
                ) : (
                  secureAccess.heading
                )}
              </p>

              {/* Pin Indicator */}
              <div className="my-5">
                <PinIndicator
                  length={secureAccess.placeholders}
                  filled={pin.length}
                  invalid={state === "denied"}
                />
              </div>

              {/* Keypad */}
              <div className="mt-6">
                <PinPad />
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}