"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Lock } from "lucide-react";
import PinIndicator from "@/components/access/PinIndicator";
import PinPad from "@/components/access/PinPad";
import { secureAccess, authSeq } from "@/data/event";
import { useAccess } from "@/lib/access-machine";

export default function AccessModal() {
  const { state, pin, closeModal } = useAccess();
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const isVerifying = state === "verifying";
  const isDenied = state === "denied";
  const isOpen = state === "pin" || isDenied || isVerifying;

  // Verifying progress animation
  useEffect(() => {
    if (isVerifying) {
      setProgress(0);
      const startTime = Date.now();
      const duration = authSeq.durationMs || 2000;

      intervalRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentPct = Math.min(Math.round((elapsed / duration) * 100), 100);
        setProgress(currentPct);
        if (currentPct >= 100 && intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, 30);

      return () => {
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [isVerifying]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="access-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050A0F]/80 p-4 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="secure-access-title"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-[440px] overflow-hidden rounded-2xl border border-[#1B2A36] bg-[#0B141C]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.8)] sm:p-8"
        >
          {/* Subtle Ambient Top Border Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-80" />

          {/* Close button */}
          {!isVerifying && (
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-5 right-5 rounded-lg p-1 text-[#8B98A5] transition hover:bg-[#1B2A36] hover:text-[#F5F7FA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00D4FF]"
              aria-label="Tutup dialog autentikasi"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {isVerifying ? (
            <div className="py-8 text-center" aria-live="polite">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#00D4FF]/40 bg-[#00D4FF]/10 text-[#00D4FF] animate-pulse">
                <Lock className="h-6 w-6" />
              </div>
              <p
                id="secure-access-title"
                className="font-display text-lg font-medium uppercase tracking-[0.24em] text-[#F5F7FA]"
              >
                {authSeq.authenticating}
              </p>
              <p className="mt-2 text-xs font-mono tracking-[0.2em] text-[#8B98A5]">
                {authSeq.progress1}
              </p>

              {/* Progress bar with percentage */}
              <div className="mx-auto mt-6 w-full max-w-xs">
                <div className="flex justify-between text-xs font-mono text-[#00D4FF] mb-2">
                  <span>ENCRYPTED HANDSHAKE</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#1B2A36] overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00D4FF] to-[#00E5A0]"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-[#00D4FF]">
                  <Lock className="h-3 w-3" />
                  <span>{secureAccess.status}</span>
                </div>
                <h2
                  id="secure-access-title"
                  className="mt-3 font-display text-2xl font-bold uppercase tracking-[0.16em] text-[#F5F7FA]"
                >
                  {secureAccess.heading}
                </h2>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#8B98A5]">
                  {isDenied ? (
                    <span className="font-semibold text-[#FF4D5A]">
                      {secureAccess.wrongPin.title} — {secureAccess.wrongPin.retry}
                    </span>
                  ) : (
                    secureAccess.prompt
                  )}
                </p>
              </div>

              {/* PIN Indicator dots */}
              <div className="mt-6 flex justify-center py-2">
                <PinIndicator
                  length={secureAccess.placeholders}
                  filled={pin.length}
                  invalid={isDenied}
                />
              </div>

              {/* Interactive Keypad */}
              <div className="mt-6">
                <PinPad />
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}