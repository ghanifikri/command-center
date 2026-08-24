"use client";

import { motion } from "framer-motion";
import LogoMark from "@/components/ui/LogoMark";
import InaugurationButton from "@/components/hero/InaugurationButton";
import SoundToggle from "@/components/ui/SoundToggle";
import { landing } from "@/data/event";
import { useAccess } from "@/lib/access-machine";
import { EASE } from "@/lib/motion";

/** Cinematic entrance: logo settles, title reveals, date appears, CTA activates. */
export default function Landing() {
  const { state, openModal } = useAccess();
  const enabled = state === "landing";

  return (
    <div className="relative z-10 flex min-h-svh flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          <LogoMark />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SoundToggle />
        </motion.div>
      </header>

      {/* Centered hero stack */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          className="mb-6 text-[0.7rem] font-medium uppercase tracking-[0.42em] text-[#00D4FF]"
        >
          {landing.label}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
          className="font-display text-[clamp(2.6rem,8vw,5.6rem)] font-light uppercase leading-[0.95] tracking-[0.08em] text-[#F5F7FA]"
        >
          {landing.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          className="mt-5 max-w-xl font-display text-sm tracking-[0.02em] text-[#C9A96E] sm:text-base"
        >
          {landing.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-4 text-[0.78rem] font-light uppercase tracking-[0.34em] text-[#8B98A5]"
        >
          {landing.date}
        </motion.p>

        <div className="mt-12">
          <InaugurationButton label={landing.cta} onStart={openModal} enabled={enabled} />
        </div>
      </main>

      {/* Footer strip */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex items-center justify-center gap-2 pb-6 text-[0.6rem] uppercase tracking-[0.3em] text-[#8B98A5]/60"
      >
        {landing.secondary}
        <span aria-hidden="true" className="h-3 w-px bg-[#8B98A5]/30" />
        {landing.date}
      </motion.footer>
    </div>
  );
}