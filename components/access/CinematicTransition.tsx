"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, Lock, Unlock, Zap, Radio } from "lucide-react";
import { useAccess } from "@/lib/access-machine";
import { useSound } from "@/lib/sound";
import { easeInOut } from "@/lib/motion";
import { event } from "@/data/event";

/**
 * High-Tech Command Center Vault Gate & Digital Ribbon Reveal:
 * - Phase 1: Massive Titanium Vault Gate with Central Rotary Lock & Digital Ribbon (0s -> 2.6s)
 *   Synchronized with "The future starts here" voice audio.
 * - Phase 2: Rotary Lock unlocks, Digital Ribbon splits, and Hydraulic Vault Panels slide
 *   open to the Left and Right, dramatically revealing the live video behind them!
 * - Phase 3: AIRO Video playback (~11s)
 * - Phase 4: Command Center Drone AI Video playback (~8s)
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
    }, 300);

    // 2. Rotary Lock Unlocks & Status changes (at 2.0s)
    const unlockTimer = window.setTimeout(() => {
      setUnlocked(true);
      sound.play("success");
    }, 2000);

    // 3. Vault Doors Hydraulic Open (at 2.8s, as voice line reaches climax)
    const doorTimer = window.setTimeout(() => {
      setDoorOpen(true);
    }, 2800);

    // 4. Switch to Drone AI Video after AIRO video completes (~12.5s)
    const droneTimer = window.setTimeout(() => {
      setVideoPhase("drone");
    }, 13500);

    // 5. Complete transition (~22s)
    const doneTimer = window.setTimeout(() => {
      setVideoPhase("done");
    }, 22500);

    return () => {
      armed.current = false;
      window.clearTimeout(voiceTimer);
      window.clearTimeout(unlockTimer);
      window.clearTimeout(doorTimer);
      window.clearTimeout(droneTimer);
      window.clearTimeout(doneTimer);
    };
  }, [sound]);

  // Video autoplay handling
  useEffect(() => {
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
        className="fixed inset-0 z-50 overflow-hidden bg-[#050A0F]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: easeInOut }}
        aria-hidden="true"
      >
        {/* UNDERNEATH LAYER: The Live Video Screen */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
          {videoPhase === "airo" && (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              autoPlay
              preload="auto"
              disablePictureInPicture
              onEnded={(e) => {
                const video = e.currentTarget;
                video.pause();
                video.currentTime = video.duration;
              }}
            >
              <source src="/video/airo-airi.mp4" type="video/mp4" />
            </video>
          )}

          {videoPhase === "drone" && (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
              autoPlay
              preload="auto"
              disablePictureInPicture
              onEnded={(e) => {
                const video = e.currentTarget;
                video.pause();
                video.currentTime = video.duration - 0.1;
              }}
            >
              <source src="/video/command-center-drone-ai.mp4" type="video/mp4" />
            </video>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#050A0F]/60 via-transparent to-[#050A0F]/40 pointer-events-none" />
        </div>

        {/* OVERLAY LAYER: The High-Tech Titanium Vault Doors */}
        <div className="pointer-events-none absolute inset-0 flex overflow-hidden">
          {/* =======================================================================
              LEFT VAULT SHUTTER DOOR PANEL
             ======================================================================= */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: doorOpen ? "-102%" : 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="relative h-full w-1/2 border-r-2 border-[#00D4FF]/60 bg-gradient-to-r from-[#070D14] via-[#09131D] to-[#0D1B2A] shadow-[20px_0_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between p-8"
          >
            {/* Metal Plate Tech Ribs & Geometric Details */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="pointer-events-none absolute -right-2 top-0 bottom-0 w-4 bg-gradient-to-l from-[#00D4FF]/20 to-transparent" />

            {/* Industrial Warning Hazard Lines on Top Left */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="h-2 w-16 bg-[repeating-linear-gradient(45deg,#00D4FF,#00D4FF_6px,#070D14_6px,#070D14_12px)] opacity-60 rounded" />
              <span className="font-mono text-[0.62rem] font-black uppercase tracking-[0.3em] text-[#00D4FF]">
                SECTOR A // MAIN ENTRANCE
              </span>
            </div>

            {/* Left Stencil Watermark */}
            <div className="relative z-10 my-auto">
              <span className="block font-mono text-[0.7rem] font-bold uppercase tracking-[0.4em] text-[#8B98A5]/40">
                DOOR SYSTEM // HYDRAULIC ACTIVE
              </span>
              <h2 className="mt-1 font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F5F7FA]/10 select-none">
                COMMAND
              </h2>
            </div>

            {/* Bottom Tech Badge */}
            <div className="relative z-10 flex items-center gap-2 font-mono text-[0.6rem] text-[#8B98A5]/60 uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] animate-ping" />
              <span>PT KTI · COMMAND CENTER BUILDING</span>
            </div>

            {/* Left Half of Center Rotary Lock Housing */}
            <div className="pointer-events-none absolute -right-24 sm:-right-32 top-1/2 -translate-y-1/2 h-48 w-48 sm:h-64 sm:w-64 rounded-full border-4 border-[#00D4FF]/40 bg-[#070D14] shadow-[0_0_50px_rgba(0,212,255,0.4)] flex items-center justify-center">
              <div className="h-36 w-36 sm:h-48 sm:w-48 rounded-full border-2 border-dashed border-[#00E5A0]/50 animate-spin [animation-duration:16s]" />
            </div>
          </motion.div>

          {/* =======================================================================
              RIGHT VAULT SHUTTER DOOR PANEL
             ======================================================================= */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: doorOpen ? "102%" : 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="relative h-full w-1/2 border-l-2 border-[#00D4FF]/60 bg-gradient-to-l from-[#070D14] via-[#09131D] to-[#0D1B2A] shadow-[-20px_0_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between p-8"
          >
            {/* Metal Plate Tech Ribs & Geometric Details */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,229,160,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,160,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="pointer-events-none absolute -left-2 top-0 bottom-0 w-4 bg-gradient-to-r from-[#00D4FF]/20 to-transparent" />

            {/* Industrial Warning Hazard Lines on Top Right */}
            <div className="relative z-10 flex items-center justify-end gap-3">
              <span className="font-mono text-[0.62rem] font-black uppercase tracking-[0.3em] text-[#FFD700]">
                AUTH: DIREKSI // EXECUTIVE
              </span>
              <div className="h-2 w-16 bg-[repeating-linear-gradient(-45deg,#FFD700,#FFD700_6px,#070D14_6px,#070D14_12px)] opacity-60 rounded" />
            </div>

            {/* Right Stencil Watermark */}
            <div className="relative z-10 my-auto text-right">
              <span className="block font-mono text-[0.7rem] font-bold uppercase tracking-[0.4em] text-[#8B98A5]/40">
                SECURITY LEVEL // HIGHEST
              </span>
              <h2 className="mt-1 font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F5F7FA]/10 select-none">
                CENTER
              </h2>
            </div>

            {/* Bottom Tech Badge */}
            <div className="relative z-10 flex items-center justify-end gap-2 font-mono text-[0.6rem] text-[#8B98A5]/60 uppercase tracking-widest">
              <span>STATUS: {unlocked ? "DOOR OPENING" : "LOCKED & ARMED"}</span>
              <span className={`h-1.5 w-1.5 rounded-full ${unlocked ? "bg-[#00E5A0] animate-ping" : "bg-[#FFD700]"}`} />
            </div>

            {/* Right Half of Center Rotary Lock Housing */}
            <div className="pointer-events-none absolute -left-24 sm:-left-32 top-1/2 -translate-y-1/2 h-48 w-48 sm:h-64 sm:w-64 rounded-full border-4 border-[#00D4FF]/40 bg-[#070D14] shadow-[0_0_50px_rgba(0,212,255,0.4)] flex items-center justify-center">
              <div className="h-36 w-36 sm:h-48 sm:w-48 rounded-full border-2 border-dashed border-[#FFD700]/50 animate-spin [animation-duration:12s] [animation-direction:reverse]" />
            </div>
          </motion.div>

          {/* =======================================================================
              CENTERPIECE: FLOATING CEREMONIAL ROTARY LOCK & DIGITAL RIBBON SEAL
             ======================================================================= */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: doorOpen ? 0 : 1,
              scale: doorOpen ? 1.2 : 1,
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-4"
          >
            {/* Center Lock Capsule Card */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center justify-center rounded-3xl border border-[#00D4FF]/40 bg-[#07111D]/90 px-8 py-7 shadow-[0_0_80px_rgba(0,212,255,0.35)] backdrop-blur-2xl text-center max-w-xl w-full"
            >
              {/* Sci-Fi Corner Accents */}
              <div className="absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-[#00D4FF]" />
              <div className="absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-[#00D4FF]" />
              <div className="absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-[#00D4FF]" />
              <div className="absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-[#00D4FF]" />

              {/* Status Pill Badge */}
              <div className="mb-4 flex items-center gap-2 rounded-full border border-[#00E5A0]/40 bg-[#00E5A0]/10 px-4 py-1">
                {unlocked ? (
                  <Unlock className="h-3.5 w-3.5 text-[#00E5A0] animate-bounce" />
                ) : (
                  <Lock className="h-3.5 w-3.5 text-[#FFD700] animate-pulse" />
                )}
                <span className="font-mono text-[0.62rem] font-black uppercase tracking-[0.26em] text-[#00E5A0]">
                  {unlocked ? "DOORS UNLOCKED // OPENING" : "CEREMONIAL LOCK ARMED"}
                </span>
              </div>

              {/* Grand Typographic Cadence */}
              <motion.h1
                initial={{ letterSpacing: "0.22em", opacity: 0 }}
                animate={{ letterSpacing: "0.34em", opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.32em] text-[#F5F7FA] drop-shadow-[0_0_35px_rgba(0,212,255,0.6)]"
              >
                THE FUTURE STARTS HERE
              </motion.h1>

              {/* Horizontal Golden Ribbon Laser Seam */}
              <div className="relative my-4 w-full flex items-center justify-center">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1 }}
                  className="h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent shadow-[0_0_15px_#FFD700]"
                />
                {unlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 2.5, 0], opacity: [1, 0.8, 0] }}
                    transition={{ duration: 0.6 }}
                    className="absolute h-10 w-10 rounded-full bg-white shadow-[0_0_40px_20px_#FFD700]"
                  />
                )}
              </div>

              {/* Sub-label Details */}
              <p className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-[#C9A96E]">
                {event.agenda} · {event.companyShort}
              </p>
              <p className="mt-1 font-mono text-[0.58rem] tracking-[0.2em] text-[#8B98A5]">
                {event.location}
              </p>
            </motion.div>
          </motion.div>

          {/* Central Vertical Laser Seam Light Flare */}
          {!doorOpen && (
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_30px_10px_#00D4FF]"
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}