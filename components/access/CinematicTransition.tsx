"use client";

import { useAccess } from "@/lib/access-machine";
import { easeInOut, easeOut } from "@/lib/motion";
import { useSound } from "@/lib/sound";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Centered Minimalist Typography Content:
 * Rendered inside both the left and right panels with precise viewport-offset
 * so the text physically splits in half and glides away with each door!
 */
function CenterpieceContent() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 sm:px-16 text-center select-none">
      {/* Clean, Understated Pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" />
        <span className="font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.32em] text-[#A0AEC0]">
          GRAND INAUGURATION
        </span>
      </motion.div>

      {/* Clean, Bold, Minimal Headline */}
      <motion.h1
        initial={{ letterSpacing: "0.15em", opacity: 0, y: 12 }}
        animate={{ letterSpacing: "0.22em", opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: easeOut }}
        className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-tight text-[#F5F7FA] max-w-5xl"
      >
        THE FUTURE STARTS HERE
      </motion.h1>

      {/* Razor-Thin Minimalist Line */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100px", opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="my-6 h-px bg-white/30"
      />

      {/* Sub-label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.28em] text-[#8B98A5]"
      >
        PT KRAKATAU TIRTA INDUSTRI
      </motion.p>
    </div>
  );
}

/**
 * Sleek Minimalist Executive Gate & Cinematic Reveal:
 * - The text & elements physically split down the center and slide open WITH the gate!
 * - High-intensity radiant light burst / lens flare transition as the gate opens
 * - Smooth luxury dissipation from light into the Airo-Airi video
 */
export default function CinematicTransition() {
  const { state } = useAccess();
  const sound = useSound();
  const armed = useRef(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [lightPhase, setLightPhase] = useState<"idle" | "burst" | "dissolve" | "hidden">("idle");
  const [videoPhase, setVideoPhase] = useState<"airo" | "drone" | "done">("airo");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (armed.current) return;
    armed.current = true;

    // 1. Atmospheric tone & sync voice audio
    sound.play("authenticate");
    const voiceTimer = window.setTimeout(() => {
      sound.playVoice("future");
    }, 250);

    // 2. Vault Doors Smooth Architectural Open & Light Burst Ignition (at 2.3s)
    const doorTimer = window.setTimeout(() => {
      setDoorOpen(true);
      setLightPhase("burst");
      sound.play("gateDecompress");
      sound.play("launchIgnite");
    }, 2300);

    // 3. Video starts playing and light begins smooth dissolve (at 3.2s)
    const playTimer = window.setTimeout(() => {
      setLightPhase("dissolve");
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => { });
        });
      }
    }, 3200);

    // 4. Light transition complete, fully clear (at 4.6s)
    const lightEndTimer = window.setTimeout(() => {
      setLightPhase("hidden");
    }, 4600);

    return () => {
      armed.current = false;
      window.clearTimeout(voiceTimer);
      window.clearTimeout(doorTimer);
      window.clearTimeout(playTimer);
      window.clearTimeout(lightEndTimer);
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
        video.play().catch(() => { });
      });
    }
  }, [videoPhase]);

  const showLight = lightPhase === "burst" || lightPhase === "dissolve";

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic"
        className="fixed inset-0 z-50 overflow-hidden bg-[#05080C]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: easeInOut }}
        aria-hidden="true"
      >
        {/* =======================================================================
            LAYER 0: The Live Video Screen (Pre-rendered Frame 0 on Standby)
           ======================================================================= */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black z-0">
          {videoPhase === "airo" && (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              preload="auto"
              disablePictureInPicture
              onLoadedMetadata={(e) => {
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

          <div className="absolute inset-0 bg-gradient-to-t from-[#05080C]/70 via-transparent to-[#05080C]/50 pointer-events-none" />
        </div>

        {/* =======================================================================
            LAYER 1: Under-Door Volumetric Light Eruption (Spills out between doors)
           ======================================================================= */}
        {showLight && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
            {/* Core Vertical Energy Pillar emerging through the crack */}
            <motion.div
              initial={{ scaleX: 0.05, opacity: 0 }}
              animate={{
                scaleX: lightPhase === "burst" ? [0.05, 3, 15] : 20,
                opacity: lightPhase === "burst" ? [0, 1, 0.9] : 0,
              }}
              transition={{
                duration: lightPhase === "burst" ? 0.9 : 1.4,
                ease: "easeOut",
              }}
              className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-[#00D4FF]/80 via-white to-transparent blur-xl"
            />

            {/* Radiant Expanding Bloom Disc */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{
                scale: lightPhase === "burst" ? [0.1, 1.6, 2.8] : 3.5,
                opacity: lightPhase === "burst" ? [0, 1, 0.85] : 0,
              }}
              transition={{
                duration: lightPhase === "burst" ? 1.0 : 1.4,
                ease: "easeOut",
              }}
              className="absolute h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,rgba(0,212,255,0.85)_25%,rgba(92,255,208,0.5)_50%,transparent_75%)] blur-[60px]"
            />
          </div>
        )}

        {/* =======================================================================
            LAYER 2: Left & Right Split Monolith Panels (Text splits WITH the doors!)
           ======================================================================= */}
        <div className="pointer-events-none absolute inset-0 z-20 flex overflow-hidden">
          {/* LEFT SLIDING PANEL */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: doorOpen ? "-101%" : 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="relative h-full w-1/2 bg-[#05080C] border-r border-white/10 shadow-[20px_0_60px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Left-half cropped viewport container (anchored at left: 0) */}
            <div className="absolute left-0 top-0 h-screen w-[100vw]">
              <CenterpieceContent />
            </div>

            {/* Bottom Left Corner Label */}
            <div className="absolute left-8 bottom-8 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-[#8B98A5]">
              PT KRAKATAU TIRTA INDUSTRI
            </div>
          </motion.div>

          {/* RIGHT SLIDING PANEL */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: doorOpen ? "101%" : 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="relative h-full w-1/2 bg-[#05080C] border-l border-white/10 shadow-[-20px_0_60px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Right-half cropped viewport container (offset by -50vw so center matches left border) */}
            <div className="absolute -left-[50vw] top-0 h-screen w-[100vw]">
              <CenterpieceContent />
            </div>

            {/* Bottom Right Corner Label */}
            <div className="absolute right-8 bottom-8 font-mono text-[0.65rem] tracking-[0.25em] uppercase text-[#8B98A5]">
              IT COMMAND CENTER
            </div>
          </motion.div>

          {/* Ultra-Fine Hairline Laser Seam in the Center (Pre-Open) */}
          {!doorOpen && (
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#00D4FF]/70 to-transparent z-40"
            />
          )}
        </div>

        {/* =======================================================================
            LAYER 3: Foreground Cinematic Optical Light Flare & Screen-wide Flash
           ======================================================================= */}
        {showLight && (
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden">
            {/* Primary Anamorphic Horizontal Lens Flare Streak */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: lightPhase === "burst" ? [0, 1.2, 1.5] : 2,
                opacity: lightPhase === "burst" ? [0, 1, 0.95] : 0,
              }}
              transition={{
                duration: lightPhase === "burst" ? 0.85 : 1.3,
                ease: "easeOut",
              }}
              className="absolute h-[6px] w-[140vw] bg-gradient-to-r from-transparent via-[#00D4FF] via-white to-transparent blur-[2px] shadow-[0_0_50px_#00D4FF,0_0_100px_#FFFFFF]"
            />

            {/* Secondary Golden/Cyan Razor Flare Line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: lightPhase === "burst" ? [0, 1, 1.3] : 1.8,
                opacity: lightPhase === "burst" ? [0, 0.85, 0.7] : 0,
              }}
              transition={{
                duration: lightPhase === "burst" ? 0.9 : 1.2,
                delay: 0.05,
                ease: "easeOut",
              }}
              className="absolute h-[2px] w-[110vw] bg-gradient-to-r from-transparent via-[#FFE57F]/90 via-[#00E5A0] to-transparent blur-[1px]"
            />

            {/* Dynamic Volumetric God Rays (Rotating Shards of Light) */}
            <motion.div
              initial={{ scale: 0.2, rotate: 0, opacity: 0 }}
              animate={{
                scale: lightPhase === "burst" ? [0.2, 1.4, 2] : 2.6,
                rotate: lightPhase === "burst" ? 15 : 35,
                opacity: lightPhase === "burst" ? [0, 0.9, 0.75] : 0,
              }}
              transition={{
                duration: lightPhase === "burst" ? 1.0 : 1.4,
                ease: "easeOut",
              }}
              className="absolute h-[900px] w-[900px] mix-blend-screen opacity-80"
              style={{
                background:
                  "conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.9) 0deg, transparent 25deg, rgba(0,212,255,0.7) 45deg, transparent 70deg, rgba(255,255,255,0.85) 90deg, transparent 120deg, rgba(92,255,208,0.7) 140deg, transparent 175deg, rgba(255,255,255,0.9) 195deg, transparent 220deg, rgba(0,212,255,0.7) 240deg, transparent 270deg, rgba(255,255,255,0.85) 300deg, transparent 330deg, rgba(92,255,208,0.6) 350deg, rgba(255,255,255,0.9) 360deg)",
                filter: "blur(20px)",
              }}
            />

            {/* Fullscreen Luminous Radiant Light Bath (Blinding Light Breakthrough) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: lightPhase === "burst" ? [0, 0.95, 0.85] : 0,
              }}
              transition={{
                duration: lightPhase === "burst" ? 0.75 : 1.3,
                ease: "easeOut",
              }}
              className="absolute inset-0 bg-gradient-to-b from-white/30 via-[#00D4FF]/25 to-white/40 backdrop-blur-[3px]"
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}