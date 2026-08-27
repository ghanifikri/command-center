"use client";

import { motion } from "framer-motion";
import { Sparkles, Calendar, Award } from "lucide-react";
import { eventHero } from "@/data/event";
import { easeOut, EASE } from "@/lib/motion";

/**
 * Executive Grand Inauguration Hero — prestigious, powerful, and festive for Director-level inauguration.
 * Featuring royal gold accents, cyber-cyan reflections, ambient auroras, and majestic typography.
 */
export default function EventHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[95svh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
    >
      {/* Ambient Royal Gold & Cyber Cyan Lighting Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#C9A96E]/20 via-[#00D4FF]/20 to-transparent blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 h-[450px] w-[450px] rounded-full bg-[#00D4FF]/10 blur-[130px]"
      />

      {/* Faint Cyber Grid Backdrop with Radial Mask */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
      />

      {/* Top Prestigious Ribbon */}
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
        className="relative z-10 mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#C9A96E]/50 bg-gradient-to-r from-[#C9A96E]/20 via-[#FFD700]/15 to-[#C9A96E]/20 px-6 py-2 shadow-[0_0_30px_rgba(201,169,110,0.25)] backdrop-blur-md"
      >
        <Sparkles className="h-4 w-4 text-[#FFD700] animate-pulse" />
        <span className="font-mono text-xs font-bold uppercase tracking-[0.38em] text-[#FFD79A]">
          {eventHero.label}
        </span>
        <Sparkles className="h-4 w-4 text-[#FFD700] animate-pulse" />
      </motion.div>

      {/* Main Title: COMMAND CENTER */}
      <div className="relative z-10 overflow-visible">
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
          className="font-display text-[clamp(3.4rem,11vw,7.8rem)] font-black uppercase leading-[0.92] tracking-[0.06em] text-[#F5F7FA] drop-shadow-[0_0_50px_rgba(0,212,255,0.4)]"
        >
          <span className="bg-gradient-to-b from-[#FFFFFF] via-[#F5F7FA] to-[#8FA7B8] bg-clip-text text-transparent">
            {eventHero.title}
          </span>
        </motion.h1>
      </div>

      {/* Prestigious Company Ornament Ribbon */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: easeOut }}
        className="relative z-10 mt-8 flex items-center justify-center gap-4"
      >
        <span className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#C9A96E]/80" />
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-[#C9A96E]" />
          <p className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.32em] text-[#F5F7FA]">
            {eventHero.company}
          </p>
        </div>
        <span className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#C9A96E]/80" />
      </motion.div>

      {/* Date Pill: 29 AGUSTUS 2026 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: easeOut }}
        className="relative z-10 mt-6"
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#C9A96E]/60 bg-[#0B141C]/85 px-7 py-2.5 shadow-[0_0_30px_rgba(201,169,110,0.3)] backdrop-blur-xl transition-all hover:border-[#FFD700] hover:shadow-[0_0_40px_rgba(255,215,0,0.4)]">
          <Calendar className="h-4 w-4 text-[#FFD700]" />
          <span className="font-display text-sm sm:text-base font-extrabold uppercase tracking-[0.28em] text-[#FFD79A] drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]">
            {eventHero.date}
          </span>
        </div>
      </motion.div>

      {/* Tagline Statement */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 mt-8 max-w-xl font-display text-sm sm:text-lg italic tracking-[0.06em] text-[#C9D7E4] leading-relaxed"
      >
        “{eventHero.tagline}”
      </motion.p>

      {/* Bottom Scroll Chevron Indicator */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 1.4 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-[#8B98A5]">
          EXPLORE AGENDA
        </span>
        <div className="h-6 w-px bg-gradient-to-b from-[#00D4FF] to-transparent" />
      </motion.div>
    </section>
  );
}