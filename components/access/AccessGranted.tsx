"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import VideoHero from "@/components/hero/VideoHero";
import { authSeq, event } from "@/data/event";
import { easeOut } from "@/lib/motion";

/**
 * Fullscreen ACCESS GRANTED reveal — the celebratory, prestigious beat of the ceremony.
 * Cinematic, powerful, and luxurious with glowing aura, tech rings, and grand typography.
 */
export default function AccessGranted() {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-[#050A0F] px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      aria-live="polite"
      aria-label="Access granted"
    >
      {/* Background video */}
      <VideoHero />

      {/* Radiant Emerald & Cyan Ambient Pulses */}
      <motion.div
        aria-hidden="true"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.2, 1], opacity: [0, 0.4, 0.25] }}
        transition={{ duration: 1.2, ease: easeOut }}
        className="pointer-events-none absolute h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-[#00E5A0]/20 via-[#00D4FF]/25 to-transparent blur-[140px]"
      />

      {/* Expanding Concentric Shockwave Rings */}
      <motion.div
        aria-hidden="true"
        initial={{ scale: 0.2, opacity: 0.8 }}
        animate={{ scale: 2.2, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="pointer-events-none absolute h-64 w-64 rounded-full border border-[#00E5A0]/40"
      />
      <motion.div
        aria-hidden="true"
        initial={{ scale: 0.2, opacity: 0.6 }}
        animate={{ scale: 2.8, opacity: 0 }}
        transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
        className="pointer-events-none absolute h-64 w-64 rounded-full border border-[#00D4FF]/30"
      />

      {/* Holographic Scan Line Sweep */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00E5A0] to-transparent shadow-[0_0_20px_#00E5A0]"
        initial={{ top: "0%", opacity: 0 }}
        animate={{ top: "100%", opacity: [0, 1, 0] }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      {/* Central Glass HUD Ceremony Panel */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="relative flex flex-col items-center text-center z-10"
      >
        {/* Top Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-[#00E5A0]/40 bg-[#00E5A0]/10 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(0,229,160,0.2)]"
        >
          <ShieldCheck className="h-4 w-4 text-[#00E5A0] animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#00E5A0]">
            AUTHORIZATION CONFIRMED
          </span>
        </motion.div>

        {/* Grand Typography: ACCESS */}
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.4em" }}
          animate={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
          className="font-display text-6xl font-light uppercase leading-none text-[#F5F7FA] drop-shadow-[0_0_30px_rgba(245,247,250,0.3)] sm:text-7xl md:text-8xl"
        >
          {authSeq.granted}
        </motion.h1>

        {/* Grand Typography: GRANTED */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: easeOut }}
          className="mt-2 font-display text-5xl font-black uppercase leading-none tracking-[0.24em] sm:text-6xl md:text-7xl bg-gradient-to-r from-[#00E5A0] via-[#5CFFD0] to-[#00D4FF] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,229,160,0.7)]"
        >
          {authSeq.grantedState}
        </motion.h2>

        {/* Decorative Gold & Cyan Divider */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "180px", opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="my-6 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent"
        />

        {/* Subtitle & Company Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-1.5"
        >
          <p className="font-display text-sm uppercase tracking-[0.3em] text-[#C9A96E] font-semibold sm:text-base">
            COMMAND CENTER · {event.companyShort}
          </p>
          <p className="font-mono text-[0.68rem] tracking-[0.25em] text-[#8B98A5]">
            THE FUTURE STARTS HERE
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}