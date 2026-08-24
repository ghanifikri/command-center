"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Props = {
  label: string;
  onStart: () => void;
  enabled: boolean;
};

/**
 * The RESMIKAN button — the ceremonial entry point into the experience.
 * Minimal, thin-bordered, with a restrained cyan glow. Arrow nudges right on
 * hover; active state compresses briefly to signal the click.
 */
export default function InaugurationButton({ label, onStart, enabled }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onStart}
      disabled={!enabled}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: enabled ? 1 : 0, y: enabled ? 0 : 16 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`${label} — enter the Command Center inauguration`}
      className="group relative inline-flex items-center gap-3 rounded-full border border-[#00D4FF]/40 bg-[#0B141C]/40 px-7 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-[#F5F7FA] backdrop-blur-sm transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF] hover:border-[#00D4FF]/70 disabled:cursor-wait"
      style={{ boxShadow: "0 0 0 rgba(0,212,255,0)" }}
      whileHover={{ boxShadow: "0 0 26px rgba(0,212,255,0.28)" }}
    >
      {label}
      <ArrowRight
        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </motion.button>
  );
}