"use client";

import { motion } from "framer-motion";
import { eventHero } from "@/data/event";
import { EASE } from "@/lib/motion";

/** The event page's opening statement, revealed slowly after the transition. */
export default function EventHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Faint backdrop grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
      />

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="relative text-[0.68rem] font-medium uppercase tracking-[0.42em] text-[#00D4FF]"
      >
        {eventHero.label}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.35 }}
        className="relative mt-5 font-display text-[clamp(2.8rem,9vw,6.4rem)] font-light uppercase leading-[0.95] tracking-[0.06em] text-[#F5F7FA]"
      >
        {eventHero.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="relative mt-6 text-[0.72rem] uppercase tracking-[0.32em] text-[#8B98A5]"
      >
        {eventHero.company}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.85 }}
        className="relative mt-3 text-[0.78rem] font-light tracking-[0.3em] text-[#C9A96E]"
      >
        {eventHero.date}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.05 }}
        className="relative mt-8 max-w-md font-display text-sm tracking-[0.06em] text-[#8B98A5] sm:text-base"
      >
        {eventHero.tagline}
      </motion.p>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 h-14 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#00D4FF]/50 to-transparent"
      />
    </section>
  );
}