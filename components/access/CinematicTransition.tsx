"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, Lock, Unlock, Zap, Activity, Cpu, Radio, ChevronRight, Gauge } from "lucide-react";
import { useAccess } from "@/lib/access-machine";
import { useSound } from "@/lib/sound";
import { easeInOut } from "@/lib/motion";
import { event } from "@/data/event";

/**
 * Authentic Movie-Grade Heavy Blast Gate & Command Center Shutter Reveal:
 * - Multi-tier armored blast panels with carbon composite bevels & hex grilles
 * - Heavy interlocking mechanical chevron blast teeth that physically part open
 * - Working hydraulic pistons with pneumatic decompression sound effects
 * - Embedded real-time telemetry HUD monitors on both door leaves
 * - Dual rotary Arc-Reactor biometric lock with laser ceremony ribbon
 * - Frame 0 pre-rendered video standby (0-50% door open) and active play at 50% open
 */
export default function CinematicTransition() {
  const { state } = useAccess();
  const sound = useSound();
  const armed = useRef(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [videoPhase, setVideoPhase] = useState<"airo" | "drone" | "done">("airo");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (armed.current) return;
    armed.current = true;

    // 1. Play atmospheric transition sound & sync voice audio
    sound.play("authenticate");
    const voiceTimer = window.setTimeout(() => {
      sound.playVoice("future");
    }, 250);

    // 2. Rotary Lock Unlocks & Status changes (at 1.7s)
    const unlockTimer = window.setTimeout(() => {
      setUnlocked(true);
      sound.play("success");
    }, 1700);

    // 3. Vault Doors Hydraulic Open with pneumatic decompression audio (at 2.3s)
    const doorTimer = window.setTimeout(() => {
      setDoorOpen(true);
      sound.play("gateDecompress");
    }, 2300);

    // 4. Video starts playing actively when door is 50% open (at 3.0s -> 700ms after door starts moving)
    const playTimer = window.setTimeout(() => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    }, 3000);

    return () => {
      armed.current = false;
      window.clearTimeout(voiceTimer);
      window.clearTimeout(unlockTimer);
      window.clearTimeout(doorTimer);
      window.clearTimeout(playTimer);
    };
  }, [sound]);

  // Ensure next video (drone) plays immediately when transitioned
  useEffect(() => {
    if (videoPhase !== "drone") return;
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, [videoPhase]);

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic"
        className="fixed inset-0 z-50 overflow-hidden bg-[#020508]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: easeInOut }}
        aria-hidden="true"
      >
        {/* =======================================================================
            LAYER 0: The Live Video Screen (Pre-rendered Frame 0 on Standby)
           ======================================================================= */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
          {videoPhase === "airo" && (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              preload="auto"
              disablePictureInPicture
              onLoadedMetadata={(e) => {
                // Ensure frame 0 is decoded and painted so 0-50% opening shows crisp video
                e.currentTarget.currentTime = 0.001;
              }}
              onEnded={() => {
                setVideoPhase("drone");
              }}
            >
              <source src="/video/airo-airi.mp4#t=0.001" type="video/mp4" />
            </video>
          )}

          {videoPhase === "drone" && (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
              preload="auto"
              disablePictureInPicture
              onEnded={(e) => {
                const video = e.currentTarget;
                video.pause();
                video.currentTime = video.duration - 0.1;
                setVideoPhase("done");
              }}
            >
              <source src="/video/command-center-drone-ai.mp4" type="video/mp4" />
            </video>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#020508]/60 via-transparent to-[#020508]/40 pointer-events-none" />
        </div>

        {/* =======================================================================
            LAYER 1: The Authentic High-Tech Blast Gate Structure
           ======================================================================= */}
        <div className="pointer-events-none absolute inset-0 flex overflow-hidden">
          {/* ---------------------------------------------------------------------
              LEFT HEAVY BLAST DOOR LEAF
             --------------------------------------------------------------------- */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: doorOpen ? "-105%" : 0 }}
            transition={{ duration: 1.45, ease: [0.76, 0, 0.24, 1] }}
            className="relative h-full w-1/2 bg-gradient-to-r from-[#060C14] via-[#0A131F] to-[#0E1A29] shadow-[30px_0_80px_rgba(0,0,0,0.95)] overflow-visible flex flex-col justify-between p-6 sm:p-10 border-r-2 border-[#00D4FF]/80"
          >
            {/* Background Armor Mesh & Reinforcement Plates */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_20%,rgba(0,212,255,0.06),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Top Heavy Hydraulic Piston Assembly */}
            <div className="relative z-10 flex items-center justify-between border-b border-[#00D4FF]/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-20 bg-[repeating-linear-gradient(45deg,#00D4FF,#00D4FF_6px,#060C14_6px,#060C14_12px)] opacity-75 rounded shadow-[0_0_8px_#00D4FF]" />
                <div className="flex flex-col">
                  <span className="font-mono text-[0.62rem] font-black uppercase tracking-[0.25em] text-[#00D4FF]">
                    SECTOR A1 // HYDRAULIC ACTIVE
                  </span>
                  <span className="font-mono text-[0.52rem] text-[#8B98A5]">
                    PRESSURE: 4,200 PSI · LOCK: ARMED
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#07111D] border border-[#00D4FF]/30 text-[0.58rem] font-mono text-[#00E5A0]">
                <Activity className="h-3 w-3 text-[#00E5A0] animate-pulse" />
                <span>GRID ONLINE</span>
              </div>
            </div>

            {/* Middle Section: Armor Plates + Embedded Live Telemetry HUD */}
            <div className="relative z-10 my-auto flex flex-col gap-6 max-w-sm">
              {/* Massive Stencil Watermark */}
              <div>
                <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#00D4FF]/60">
                  HEAVY BLAST GATE · SERIES 01
                </span>
                <h2 className="mt-0.5 font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F5F7FA]/12 select-none">
                  COMMAND
                </h2>
              </div>

              {/* Embedded Live Telemetry HUD Card (Water & Network Grid) */}
              <div className="rounded-xl border border-[#00D4FF]/30 bg-[#050D17]/85 p-3.5 shadow-[inset_0_0_20px_rgba(0,212,255,0.08)] backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-[#00D4FF]/20 pb-2 mb-2 font-mono text-[0.58rem] text-[#00D4FF] font-bold">
                  <div className="flex items-center gap-1.5">
                    <Gauge className="h-3.5 w-3.5 text-[#00D4FF]" />
                    <span>WATER TELEMETRY CORE</span>
                  </div>
                  <span className="text-[#00E5A0] animate-pulse">100G SECURE</span>
                </div>

                {/* Animated Waveform Oscilloscope */}
                <div className="flex items-center justify-between gap-1 h-6 px-1 bg-[#02070D]/80 rounded border border-[#00D4FF]/10 mb-2">
                  {[30, 60, 90, 45, 80, 100, 70, 40, 85, 95, 50, 75, 60, 90, 40].map((val, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [`${val * 0.2}%`, `${val}%`, `${val * 0.3}%`] }}
                      transition={{ repeat: Infinity, duration: 1 + (i % 3) * 0.2, ease: "easeInOut" }}
                      className="w-1 rounded-full bg-gradient-to-t from-[#00D4FF] to-[#00E5A0]"
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-[0.55rem] text-[#8B98A5]">
                  <div>FLOW RATE: <span className="text-[#F5F7FA] font-bold">2,450 m³/h</span></div>
                  <div>PRESSURE: <span className="text-[#00E5A0] font-bold">6.8 BAR (OK)</span></div>
                </div>
              </div>
            </div>

            {/* Bottom Mechanical Clamps & Stencils */}
            <div className="relative z-10 flex items-center justify-between border-t border-[#00D4FF]/20 pt-4 font-mono text-[0.58rem] text-[#8B98A5]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#00D4FF] animate-ping" />
                <span className="tracking-widest uppercase">PT KRAKATAU TIRTA INDUSTRI</span>
              </div>
              <span className="text-[#00D4FF]/70">SERIES: KTI-CC-01</span>
            </div>

            {/* Mechanical Interlocking Chevron Teeth on Right Edge */}
            <div className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 w-4 bg-[#0E1A29] border-r-2 border-t border-b border-[#00D4FF] shadow-[0_0_12px_#00D4FF] [clip-path:polygon(0_0,100%_50%,0_100%)]"
                />
              ))}
            </div>

            {/* Left Half of Heavy Arc-Reactor Rotary Iris Housing */}
            <div className="pointer-events-none absolute -right-28 sm:-right-36 top-1/2 -translate-y-1/2 h-56 w-56 sm:h-72 sm:w-72 rounded-full border-4 border-[#00D4FF]/50 bg-[#060C14] shadow-[0_0_60px_rgba(0,212,255,0.45)] flex items-center justify-center z-10 overflow-hidden">
              <div className="h-44 w-44 sm:h-56 sm:w-56 rounded-full border-2 border-dashed border-[#00E5A0]/60 animate-spin [animation-duration:18s]" />
              <div className="absolute h-32 w-32 sm:h-40 sm:w-40 rounded-full border border-[#00D4FF]/40 bg-[#081320]/80 backdrop-blur-md" />
            </div>
          </motion.div>

          {/* ---------------------------------------------------------------------
              RIGHT HEAVY BLAST DOOR LEAF
             --------------------------------------------------------------------- */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: doorOpen ? "105%" : 0 }}
            transition={{ duration: 1.45, ease: [0.76, 0, 0.24, 1] }}
            className="relative h-full w-1/2 bg-gradient-to-l from-[#060C14] via-[#0A131F] to-[#0E1A29] shadow-[-30px_0_80px_rgba(0,0,0,0.95)] overflow-visible flex flex-col justify-between p-6 sm:p-10 border-l-2 border-[#00D4FF]/80"
          >
            {/* Background Armor Mesh & Reinforcement Plates */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_80%_20%,rgba(255,215,0,0.06),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Top Heavy Hydraulic Piston Assembly */}
            <div className="relative z-10 flex items-center justify-between border-b border-[#FFD700]/20 pb-4">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#07111D] border border-[#FFD700]/30 text-[0.58rem] font-mono text-[#FFD700]">
                <Cpu className="h-3 w-3 text-[#FFD700]" />
                <span>AIRO CORE: 100%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex flex-col text-right">
                  <span className="font-mono text-[0.62rem] font-black uppercase tracking-[0.25em] text-[#FFD700]">
                    AUTH: BOARD OF DIRECTORS
                  </span>
                  <span className="font-mono text-[0.52rem] text-[#8B98A5]">
                    CLEARANCE: EXECUTIVE ROOT
                  </span>
                </div>
                <div className="h-2.5 w-20 bg-[repeating-linear-gradient(-45deg,#FFD700,#FFD700_6px,#060C14_6px,#060C14_12px)] opacity-75 rounded shadow-[0_0_8px_#FFD700]" />
              </div>
            </div>

            {/* Middle Section: Armor Plates + Embedded Live Telemetry HUD */}
            <div className="relative z-10 my-auto flex flex-col gap-6 max-w-sm ml-auto text-right">
              {/* Massive Stencil Watermark */}
              <div>
                <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#FFD700]/60">
                  SECURITY LEVEL · MAXIMUM
                </span>
                <h2 className="mt-0.5 font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F5F7FA]/12 select-none">
                  CENTER
                </h2>
              </div>

              {/* Embedded Live Telemetry HUD Card (AI & Mainframe Operations) */}
              <div className="rounded-xl border border-[#FFD700]/30 bg-[#050D17]/85 p-3.5 shadow-[inset_0_0_20px_rgba(255,215,0,0.08)] backdrop-blur-md text-left">
                <div className="flex items-center justify-between border-b border-[#FFD700]/20 pb-2 mb-2 font-mono text-[0.58rem] text-[#FFD700] font-bold">
                  <div className="flex items-center gap-1.5">
                    <Radio className="h-3.5 w-3.5 text-[#FFD700] animate-pulse" />
                    <span>MAINFRAME AI CONTROL</span>
                  </div>
                  <span className="text-[#00D4FF]">AIRI SYNCED</span>
                </div>

                {/* Hex Telemetry Stream */}
                <div className="font-mono text-[0.58rem] bg-[#02070D]/80 rounded p-1.5 border border-[#FFD700]/10 mb-2 flex justify-between text-[#8B98A5]">
                  <span>0x7F4A: INITIALIZED</span>
                  <span className="text-[#00E5A0]">ALL OPS NORMAL</span>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-[0.55rem] text-[#8B98A5]">
                  <div>LATENCY: <span className="text-[#00E5A0] font-bold">0.8ms (FIBER)</span></div>
                  <div>UPTIME: <span className="text-[#F5F7FA] font-bold">99.999%</span></div>
                </div>
              </div>
            </div>

            {/* Bottom Mechanical Clamps & Stencils */}
            <div className="relative z-10 flex items-center justify-between border-t border-[#FFD700]/20 pt-4 font-mono text-[0.58rem] text-[#8B98A5]">
              <span className="text-[#FFD700]/70">STATUS: {unlocked ? "DOORS OPENING" : "LOCKED & ARMED"}</span>
              <div className="flex items-center gap-2">
                <span className="tracking-widest uppercase">IT COMMAND CENTER</span>
                <span className={`h-2 w-2 rounded-full ${unlocked ? "bg-[#00E5A0] animate-ping" : "bg-[#FFD700]"}`} />
              </div>
            </div>

            {/* Right Half of Heavy Arc-Reactor Rotary Iris Housing */}
            <div className="pointer-events-none absolute -left-28 sm:-left-36 top-1/2 -translate-y-1/2 h-56 w-56 sm:h-72 sm:w-72 rounded-full border-4 border-[#00D4FF]/50 bg-[#060C14] shadow-[0_0_60px_rgba(0,212,255,0.45)] flex items-center justify-center z-10 overflow-hidden">
              <div className="h-44 w-44 sm:h-56 sm:w-56 rounded-full border-2 border-dashed border-[#FFD700]/60 animate-spin [animation-duration:14s] [animation-direction:reverse]" />
              <div className="absolute h-32 w-32 sm:h-40 sm:w-40 rounded-full border border-[#FFD700]/40 bg-[#081320]/80 backdrop-blur-md" />
            </div>
          </motion.div>

          {/* =======================================================================
              CENTERPIECE: FLOATING BIOMETRIC IRIS LOCK & DIGITAL CEREMONIAL RIBBON
             ======================================================================= */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: doorOpen ? 0 : 1,
              scale: doorOpen ? 1.25 : 1,
            }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-4"
          >
            {/* Center Lock Capsule Card */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center justify-center rounded-3xl border-2 border-[#00D4FF]/60 bg-[#050D17]/95 px-8 py-8 shadow-[0_0_100px_rgba(0,212,255,0.45)] backdrop-blur-2xl text-center max-w-xl w-full"
            >
              {/* Sci-Fi Corner Bracket Accents */}
              <div className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-[#00D4FF]" />
              <div className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-[#00D4FF]" />
              <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-[#00D4FF]" />
              <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[#00D4FF]" />

              {/* Status Pill Badge */}
              <div className="mb-4 flex items-center gap-2 rounded-full border border-[#00E5A0]/50 bg-[#00E5A0]/10 px-4 py-1.5 shadow-[0_0_15px_rgba(0,229,160,0.2)]">
                {unlocked ? (
                  <Unlock className="h-4 w-4 text-[#00E5A0] animate-bounce" />
                ) : (
                  <Lock className="h-4 w-4 text-[#FFD700] animate-pulse" />
                )}
                <span className="font-mono text-[0.65rem] font-black uppercase tracking-[0.28em] text-[#00E5A0]">
                  {unlocked ? "ACCESS AUTHORIZED // DISENGAGING HYDRAULICS" : "BIOMETRIC SEAL ARMED // READY"}
                </span>
              </div>

              {/* Grand Typographic Cadence */}
              <motion.h1
                initial={{ letterSpacing: "0.22em", opacity: 0 }}
                animate={{ letterSpacing: "0.34em", opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.34em] text-[#F5F7FA] drop-shadow-[0_0_40px_rgba(0,212,255,0.7)]"
              >
                THE FUTURE STARTS HERE
              </motion.h1>

              {/* Horizontal Golden Ribbon Laser Seam */}
              <div className="relative my-4 w-full flex items-center justify-center">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1 }}
                  className="h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent shadow-[0_0_20px_#FFD700]"
                />
                {unlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 3, 0], opacity: [1, 0.9, 0] }}
                    transition={{ duration: 0.6 }}
                    className="absolute h-12 w-12 rounded-full bg-white shadow-[0_0_50px_25px_#FFD700]"
                  />
                )}
              </div>

              {/* Sub-label Details */}
              <p className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.26em] text-[#C9A96E]">
                {event.agenda} · {event.companyShort}
              </p>
              <p className="mt-1 font-mono text-[0.6rem] tracking-[0.22em] text-[#8B98A5]">
                {event.location}
              </p>
            </motion.div>
          </motion.div>

          {/* Central Vertical Laser Seam Light Flare */}
          {!doorOpen && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-1.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_40px_12px_#00D4FF]"
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}