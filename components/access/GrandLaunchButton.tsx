"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Cpu, Power } from "lucide-react";
import { secureAccess, event } from "@/data/event";
import { useAccess } from "@/lib/access-machine";
import { useSound } from "@/lib/sound";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";

interface Props {
  onLaunch?: () => void;
}

/**
 * Grand Futuristic JARVIS IT Command Center Inauguration Launch Console
 * Emits power charging audio on reveal, rotating holographic Arc-Reactor HUD rings,
 * live telemetry readouts, and a massive shockwave blast upon activation.
 */
export default function GrandLaunchButton({ onLaunch }: Props) {
  const { submit } = useAccess();
  const sound = useSound();
  const [isLaunching, setIsLaunching] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Play futuristic power spool-up sound on reveal
  useEffect(() => {
    sound.play("launchArm");
  }, [sound]);

  const handleTriggerLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    sound.play("launchIgnite");

    if (onLaunch) {
      onLaunch();
    }

    // Brief cinematic shockwave beat before dispatching submit
    window.setTimeout(() => {
      submit();
    }, 650);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: 20 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="relative w-full max-w-[450px] sm:max-w-[470px] lg:w-[420px] flex flex-col justify-between overflow-hidden rounded-3xl border border-[#00E5A0]/40 bg-[#07111D]/95 p-6 shadow-[0_0_70px_rgba(0,229,160,0.25)] backdrop-blur-2xl sm:p-7"
    >
      {/* Sci-Fi Corner Brackets */}
      <div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-[#00E5A0]" />
      <div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-[#00E5A0]" />
      <div className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-[#00E5A0]" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[#00E5A0]" />

      {/* Holographic Scanline Sweep */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[#00E5A0]/15 to-transparent"
        initial={{ top: "-30%" }}
        animate={{ top: "130%" }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
      />

      {/* Ambient background energy pulsing glow */}
      <motion.div
        aria-hidden="true"
        animate={{
          scale: hovered ? [1, 1.25, 1] : [1, 1.1, 1],
          opacity: hovered ? [0.25, 0.45, 0.25] : [0.15, 0.25, 0.15],
        }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-10 -right-10 h-64 w-64 rounded-full bg-gradient-to-br from-[#00E5A0]/30 via-[#00D4FF]/25 to-transparent blur-[80px]"
      />

      {/* Top Header: JARVIS Telemetry Status */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#1B2A36] pb-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#00E5A0]/50 bg-[#00E5A0]/15 text-[#00E5A0] shadow-[0_0_12px_rgba(0,229,160,0.4)]">
            <Cpu className="h-3.5 w-3.5 animate-pulse" />
          </div>
          <div>
            <span className="block font-mono text-[0.65rem] font-black tracking-[0.24em] text-[#00E5A0] uppercase">
              {secureAccess.launchConsole.badge}
            </span>
            <span className="block font-mono text-[0.52rem] tracking-wider text-[#8B98A5]">
              {event.companyShort} · IT COMMAND CENTER
            </span>
          </div>
        </div>

        {/* Live Audio / Pulse Signal Visualizer */}
        <div className="flex items-end gap-1 h-4 px-2 py-0.5 rounded border border-[#00E5A0]/30 bg-[#07111D]/80">
          <motion.span
            animate={{ height: ["40%", "100%", "60%", "90%", "30%"] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="w-1 rounded-full bg-[#00E5A0]"
          />
          <motion.span
            animate={{ height: ["80%", "40%", "100%", "50%", "70%"] }}
            transition={{ repeat: Infinity, duration: 0.9, delay: 0.1 }}
            className="w-1 rounded-full bg-[#00D4FF]"
          />
          <motion.span
            animate={{ height: ["50%", "90%", "30%", "100%", "60%"] }}
            transition={{ repeat: Infinity, duration: 1.1, delay: 0.2 }}
            className="w-1 rounded-full bg-[#00E5A0]"
          />
        </div>
      </div>

      {/* Center Console: Holographic Arc-Reactor & Grand Launch Trigger */}
      <div className="relative z-10 my-6 flex flex-col items-center justify-center">
        {/* Arc-Reactor Rotating Hologram Housing */}
        <div className="relative flex items-center justify-center py-3">
          {/* Outer Rotating Cyan Dials */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="pointer-events-none absolute h-52 w-52 rounded-full border border-dashed border-[#00D4FF]/40 shadow-[0_0_30px_rgba(0,212,255,0.2)]"
          />

          {/* Middle Rotating Emerald Counter-Dial */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="pointer-events-none absolute h-44 w-44 rounded-full border border-[#00E5A0]/50"
          >
            {/* Degree Tick Marks */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-0.5 bg-[#00E5A0]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-2 w-0.5 bg-[#00E5A0]" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-2 bg-[#00E5A0]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-0.5 w-2 bg-[#00E5A0]" />
          </motion.div>

          {/* Inner Pulsing Gold Core Ring */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="pointer-events-none absolute h-36 w-36 rounded-full border-2 border-[#FFD700]/60 shadow-[0_0_25px_rgba(255,215,0,0.3)]"
          />

          {/* The Big High-Tech Launch Core Button */}
          <motion.button
            type="button"
            onClick={handleTriggerLaunch}
            onMouseEnter={() => {
              setHovered(true);
              sound.play("hoverChirp");
            }}
            onMouseLeave={() => setHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            disabled={isLaunching}
            aria-label="Launch and inaugurate Command Center"
            className={cn(
              "group relative flex h-32 w-32 flex-col items-center justify-center rounded-full border-2 transition-all duration-300 cursor-pointer select-none",
              isLaunching
                ? "border-white bg-white text-[#050A0F] shadow-[0_0_100px_rgba(255,255,255,1)]"
                : "border-[#00E5A0] bg-gradient-to-b from-[#00E5A0]/30 via-[#07111D] to-[#00D4FF]/30 text-[#00E5A0] shadow-[0_0_40px_rgba(0,229,160,0.6)] hover:border-white hover:text-white hover:shadow-[0_0_60px_rgba(0,229,160,0.9)]"
            )}
          >
            {/* Dynamic Reactor Pulse Wave */}
            <motion.div
              aria-hidden="true"
              animate={{ scale: [1, 1.4, 1.8], opacity: [0.8, 0.4, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 rounded-full border border-[#00E5A0]"
            />

            {/* Glowing Icon in the center */}
            <div className="relative flex flex-col items-center justify-center">
              <Power className={cn("h-10 w-10 transition-transform duration-300 group-hover:scale-110", isLaunching ? "animate-spin text-[#050A0F]" : "text-[#00E5A0] group-hover:text-white drop-shadow-[0_0_15px_#00E5A0]")} />
              <span className="mt-1 font-mono text-[0.62rem] font-black tracking-widest uppercase">
                {isLaunching ? "LAUNCHING" : "ENTER"}
              </span>
            </div>
          </motion.button>
        </div>

        {/* Action Title & Subtitles */}
        <div className="mt-4 text-center">
          <motion.h3
            animate={{ textShadow: ["0 0 10px rgba(0,229,160,0.5)", "0 0 20px rgba(0,229,160,0.9)", "0 0 10px rgba(0,229,160,0.5)"] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="font-display text-xl sm:text-2xl font-black uppercase tracking-[0.14em] text-[#F5F7FA]"
          >
            {secureAccess.launchConsole.title}
          </motion.h3>

          <p className="mt-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#00E5A0]">
            {secureAccess.launchConsole.subtitle}
          </p>

          <p className="mt-2 font-mono text-[0.58rem] tracking-[0.18em] text-[#8B98A5]">
            {secureAccess.launchConsole.description}
          </p>
        </div>
      </div>

      {/* Footer Banner: Armed Status & Prompt */}
      <div className="relative z-10 mt-auto rounded-xl border border-[#00E5A0]/30 bg-[#0B1724]/90 p-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00E5A0] opacity-80" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00E5A0]" />
          </span>
          <span className="font-mono text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#00E5A0]">
            {secureAccess.launchConsole.statusArmed}
          </span>
        </div>
        <p className="mt-1 font-mono text-[0.54rem] uppercase tracking-[0.2em] text-[#F5F7FA]/80">
          {secureAccess.launchConsole.pressPrompt}
        </p>
      </div>

      {/* Cinematic Shockwave Blast Overlay when triggered */}
      <AnimatePresence>
        {isLaunching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#00E5A0]/20 backdrop-blur-sm"
          >
            {/* Rapid Expanding Concentric Rings */}
            <motion.div
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute h-64 w-64 rounded-full border-4 border-white shadow-[0_0_80px_#00E5A0]"
            />
            <motion.div
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 4.5, opacity: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
              className="absolute h-64 w-64 rounded-full border-4 border-[#00D4FF] shadow-[0_0_90px_#00D4FF]"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.2, 1], opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center text-center bg-[#07111D]/90 p-4 rounded-2xl border border-white shadow-[0_0_40px_rgba(255,255,255,0.8)]"
            >
              <Zap className="h-8 w-8 text-[#00E5A0] animate-bounce" />
              <span className="mt-2 font-display text-sm font-black uppercase tracking-[0.25em] text-white">
                INITIALIZING COMMAND CENTER...
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
