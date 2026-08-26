"use client";

import { motion } from "framer-motion";
import VideoHero from "@/components/hero/VideoHero";
import { authSeq } from "@/data/event";
import { EASE } from "@/lib/motion";
/**
 * Fullscreen ACCESS GRANTED reveal — the celebratory beat of the ceremony.
 * Voice-over begins here (driven by the state machine). Visible text always
 * accompanies the voice so the content is never audio-only.
 */
export default function AccessGranted() {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#050A0F] px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      aria-live="polite"
      aria-label="Access granted"
    >
      {/* Background video — same semi-transparent landing video */}
      <VideoHero />
      {/* Scan line sweep — subtle, not a dashboard widget. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/60 to-transparent"
        initial={{ top: "0%", opacity: 0 }}
        animate={{ top: "100%", opacity: [0, 1, 0] }}
        transition={{ duration: 3.1, ease: "easeInOut" }}
      />

      <motion.p
        className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-[#8B98A5]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        Authorization Confirmed
      </motion.p>

      <div className="overflow-hidden font-display">
        <motion.h1
          className="text-6xl font-light uppercase leading-none tracking-[0.14em] text-[#F5F7FA] sm:text-7xl"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.7, ease: EASE }}
        >
          {authSeq.granted}
        </motion.h1>
        <motion.h2
          className="mt-3 text-4xl font-semibold uppercase leading-none tracking-[0.14em] text-[#00E5A0] sm:text-5xl"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.7, delay: 0.18, ease: EASE }}
        >
          {authSeq.grantedState}
        </motion.h2>
      </div>

      <motion.p
        className="mt-8 max-w-sm text-center text-sm leading-relaxed text-[#8B98A5]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        Welcome to Command Center. The future starts here.
      </motion.p>
    </motion.div>
  );
}