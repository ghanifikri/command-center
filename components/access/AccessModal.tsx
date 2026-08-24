"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { X } from "lucide-react";
import PinIndicator from "@/components/access/PinIndicator";
import PinPad from "@/components/access/PinPad";
import { secureAccess, authSeq } from "@/data/event";
import { useAccess } from "@/lib/access-machine";
import { useSound } from "@/lib/sound";

export default function AccessModal() {
  const { state, pin, closeModal, press, submit } = useAccess();
  const { play, playVoice } = useSound();
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

  // Play success sound on granted - handled by access-machine useEffect
  // useEffect(() => {
  //   if (state === "granted") {
  //     play("success");
  //     playVoice("granted");
  //   }
  // }, [state, play, playVoice]);

  // Handle keyboard input
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (state !== "pin" && state !== "denied") return;
      if (e.key >= "0" && e.key <= "9") {
        if (pin.length < 6) press(e.key);
      } else if (e.key === "Backspace") {
        press("back");
      } else if (e.key === "Enter" && pin.length === 6) {
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050A0F]/70 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby={verified ? undefined : "secure-access-title"}
        aria-describedby={verified ? undefined : "secure-access-desc"}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-[430px] rounded-xl border border-[#2A3B4A] bg-[#0B141C]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.6)] sm:p-8"
        >
          {/* Close button - only show in PIN and DENIED states */}
          {(state === "pin" || state === "denied") && (
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-[#8B98A5] hover:text-[#F5F7FA] transition-colors"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {verified ? (
            <motion.div
              key="verifying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-2 text-center"
              aria-live="polite"
            >
              <p className="font-display text-lg uppercase tracking-[0.2em] text-[#F5F7FA]">
                {authSeq.authenticating}
              </p>
              {/* Progress bar with percentage */}
              <div className="mx-auto mt-5 w-80">
                <div className="flex justify-between text-[0.7rem] font-mono text-[#00D4FF] mb-2">
                  <span>VERIFYING ACCESS…</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-6 w-full rounded-full overflow-hidden bg-[#1B2A36]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00D4FF] to-[#00E5A0] rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.4, ease: "easeInOut" }}
                  />
                </div>
              </div>
              <p className="mt-4 text-[0.6rem] uppercase tracking-[0.28em] text-[#8B98A5]">
                {authSeq.progress1}
              </p>
            </motion.div>
          ) : (
            <motion.div key="pin" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2
                id="secure-access-title"
                className="font-display text-2xl font-medium uppercase tracking-[0.16em] text-[#F5F7FA]"
              >
                {secureAccess.system}
              </h2>
              <p id="secure-access-desc" className="mt-2 text-[0.68rem] uppercase tracking-[0.26em] text-[#8B98A5]">
                {secureAccess.heading}
              </p>
              <p className="mt-6 text-[0.62rem] uppercase tracking-[0.28em] text-[#8B98A5]">
                {secureAccess.prompt}
              </p>

              <div className="mt-4 flex justify-center py-2">
                <PinIndicator
                  length={secureAccess.placeholders}
                  filled={pin.length}
                  invalid={state === "denied"}
                />
              </div>

              <div className="mt-4">
                <PinPad />
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}