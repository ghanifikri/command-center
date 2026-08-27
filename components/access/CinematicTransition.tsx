"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useAccess } from "@/lib/access-machine";
import { useSound } from "@/lib/sound";
import { easeInOut, easeOut } from "@/lib/motion";

/**
 * Hyper-Spectacular Stacked Circular Iris Portal Transition:
 * - Phase 1: Cyber Lattice Overdrive & Laser Blades (0 -> 1.3s)
 * - Phase 2: High-Speed Stacked Concentric Circular Iris Burst directly revealing the video (1.3s -> 2.5s)
 * - Phase 3: AIRO video playback
 * - Phase 4: Command Center Drone AI video playback
 */
export default function CinematicTransition() {
  const { state } = useAccess();
  const sound = useSound();
  const armed = useRef(false);
  const [phase, setPhase] = useState<"lattice" | "iris" | "video" | "done">("lattice");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (armed.current) return;
    armed.current = true;
    sound.play("authenticate");

    // Phase 1 (Lattice & Laser Blades): 0 -> 1.3s
    const t1 = window.setTimeout(() => {
      sound.play("success");
      setPhase("iris");
    }, 1300);

    // Phase 2 (Stacked Circular Iris Portal into Video): 1.3s -> video runs
    // AIRO video runs ~10s
    const t2 = window.setTimeout(() => setPhase("video"), 11500);

    // Command Center video (~8s)
    const t3 = window.setTimeout(() => setPhase("done"), 19500);

    return () => {
      armed.current = false;
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [sound]);

  // Video handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video || (phase !== "iris" && phase !== "video")) return;

    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, [phase]);

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic"
        className="fixed inset-0 z-50 overflow-hidden bg-[#050A0F]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: easeInOut }}
        aria-hidden="true"
      >
        {/* PHASE 1: Cyber Lattice Overdrive + Slicing Laser Blades */}
        {phase === "lattice" && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Cold Flash Pulse */}
            <motion.div
              className="absolute inset-0 bg-[#00D4FF]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0.1, 0.5, 0] }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />

            {/* 3D Deep Space Hexagonal Lattice Expand */}
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.25)_0%,transparent_70%),linear-gradient(rgba(0,229,160,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.18)_1px,transparent_1px)] bg-[size:40px_40px]"
              initial={{ scale: 3, rotate: 15, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: easeInOut }}
            />

            {/* Slicing Laser Blade 1 (Cyan) */}
            <motion.div
              className="absolute -inset-y-32 w-2 -skew-x-45 bg-[#00D4FF] shadow-[0_0_50px_15px_#00D4FF,0_0_100px_30px_#00E5A0]"
              initial={{ left: "-40%" }}
              animate={{ left: "140%" }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeInOut" }}
            />

            {/* Slicing Laser Blade 2 (Gold) */}
            <motion.div
              className="absolute -inset-y-32 w-2 skew-x-45 bg-[#FFD700] shadow-[0_0_50px_15px_#FFD700,0_0_100px_30px_#C9A96E]"
              initial={{ right: "-40%" }}
              animate={{ right: "140%" }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeInOut" }}
            />

            {/* Central Holographic Target HUD */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0, rotate: -90 }}
              animate={{ scale: [0.2, 1.2, 1], opacity: 1, rotate: 0 }}
              transition={{ duration: 1, ease: easeOut }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Concentric Rotating Tech Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="h-44 w-44 rounded-full border-2 border-dashed border-[#00D4FF]/60 p-4 shadow-[0_0_40px_rgba(0,212,255,0.4)]"
              >
                <div className="h-full w-full rounded-full border border-[#00E5A0]/60 p-3">
                  <div className="h-full w-full rounded-full border border-dashed border-[#FFD700]/60" />
                </div>
              </motion.div>

              <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center">
                <Zap className="h-9 w-9 text-[#00E5A0] animate-pulse drop-shadow-[0_0_20px_#00E5A0]" />
                <span className="mt-2 font-mono text-[0.65rem] font-black uppercase tracking-[0.35em] text-[#00D4FF] drop-shadow-[0_0_12px_#00D4FF]">
                  AIRO // CEREMONIAL PORTAL
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {/* PHASE 2 & 3: High-Speed Stacked Circular Iris Opening into AIRO Video */}
        {(phase === "iris" || phase === "video") && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {/* AIRO Video Container with Circular Iris Expanding Mask */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(150% at 50% 50%)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A0F]/60 via-transparent to-[#050A0F]/40 pointer-events-none" />
            </motion.div>

            {/* Fast-Speed Stacked Concentric Portal Rings Exiting outwards */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {/* Ring 1: Outer Cyan Neon Shockwave */}
              <motion.div
                className="absolute rounded-full border-4 border-[#00D4FF] shadow-[0_0_80px_30px_#00D4FF]"
                initial={{ width: 40, height: 40, opacity: 1, scale: 0.2 }}
                animate={{ width: 2800, height: 2800, opacity: [1, 1, 0], scale: 1 }}
                transition={{ duration: 1.1, delay: 0, ease: easeOut }}
              />

              {/* Ring 2: Electric Emerald Portal Ring */}
              <motion.div
                className="absolute rounded-full border-4 border-[#00E5A0] shadow-[0_0_90px_35px_#00E5A0]"
                initial={{ width: 40, height: 40, opacity: 1, scale: 0.2 }}
                animate={{ width: 2600, height: 2600, opacity: [1, 1, 0], scale: 1 }}
                transition={{ duration: 1.1, delay: 0.08, ease: easeOut }}
              />

              {/* Ring 3: Royal Gold Concentric Energy Ring */}
              <motion.div
                className="absolute rounded-full border-3 border-[#FFD700] shadow-[0_0_70px_25px_#FFD700]"
                initial={{ width: 40, height: 40, opacity: 1, scale: 0.2 }}
                animate={{ width: 2400, height: 2400, opacity: [1, 1, 0], scale: 1 }}
                transition={{ duration: 1.1, delay: 0.16, ease: easeOut }}
              />

              {/* Ring 4: Laser Cyan Core Ring */}
              <motion.div
                className="absolute rounded-full border-2 border-white shadow-[0_0_60px_20px_white]"
                initial={{ width: 40, height: 40, opacity: 1, scale: 0.2 }}
                animate={{ width: 2200, height: 2200, opacity: [1, 1, 0], scale: 1 }}
                transition={{ duration: 1.1, delay: 0.24, ease: easeOut }}
              />

              {/* Central Iris Flare Spark */}
              <motion.div
                className="h-16 w-16 rounded-full bg-gradient-to-r from-[#00D4FF] via-white to-[#00E5A0] shadow-[0_0_80px_40px_#00D4FF]"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: [1, 4, 0], opacity: [1, 0.8, 0] }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {/* PHASE 4: Command Center Drone AI Video Playback */}
        {phase === "video" && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#050A0F]/60 via-transparent to-[#050A0F]/40" />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}