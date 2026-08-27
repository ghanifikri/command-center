"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useAccess } from "@/lib/access-machine";
import { useSound } from "@/lib/sound";
import { easeInOut, easeOut } from "@/lib/motion";

type CinematicPhase = "lattice" | "zoom" | "video" | "outro";

export default function CinematicTransition() {
  const { state, completeCinematic } = useAccess();
  const sound = useSound();
  const [phase, setPhase] = useState<CinematicPhase>("lattice");
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutsRef = useRef<number[]>([]);

  const active = state === "cinematic";

  const handleFinish = useCallback(() => {
    timeoutsRef.current.forEach(window.clearTimeout);
    completeCinematic();
  }, [completeCinematic]);

  useEffect(() => {
    if (!active) return;

    sound.play("success");

    // Phase 1: Lattice grid sweep (~1.4s)
    const t1 = window.setTimeout(() => setPhase("zoom"), 1400);
    // Phase 2: Zoom white burst (~1.6s)
    const t2 = window.setTimeout(() => setPhase("video"), 3000);
    // Phase 3 fallback duration in case video metadata or onEnded doesn't fire (~12s)
    const t3 = window.setTimeout(() => setPhase("outro"), 14000);
    const t4 = window.setTimeout(() => handleFinish(), 15500);

    timeoutsRef.current = [t1, t2, t3, t4];

    return () => {
      timeoutsRef.current.forEach(window.clearTimeout);
      timeoutsRef.current = [];
    };
  }, [active, sound, handleFinish]);

  // Video playback handler
  useEffect(() => {
    if (phase !== "video") return;
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Retry muted if browser blocked audio autoplay
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, [phase]);

  if (!active) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-portal"
        className="fixed inset-0 z-50 overflow-hidden bg-[#050A0F]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: easeInOut }}
        role="region"
        aria-label="Inauguration ceremony transition"
      >
        {/* Skip button for quick navigation */}
        <button
          type="button"
          onClick={handleFinish}
          className="absolute top-6 right-6 z-50 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-[#F5F7FA]/80 backdrop-blur-md transition hover:border-[#00D4FF] hover:text-[#00D4FF]"
          aria-label="Lewati transisi seremoni"
        >
          <span>Lewati</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>

        {/* Phase 1: Lattice grid expand + Cold Flash + Light Sweep */}
        {phase === "lattice" && (
          <div className="absolute inset-0">
            {/* Cold Flash */}
            <motion.div
              className="absolute inset-0 bg-[#DFF7FF]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0] }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
            {/* Cyber Grid Lattice */}
            <motion.div
              className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.18)_1px,transparent_1px)] bg-[size:40px_40px]"
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: easeInOut }}
            />
            {/* Light Sweep */}
            <motion.div
              className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#00D4FF]/40 to-transparent blur-xl"
              initial={{ left: "-40%" }}
              animate={{ left: "120%" }}
              transition={{ duration: 1.1, ease: easeInOut, delay: 0.2 }}
            />
          </div>
        )}

        {/* Phase 2: Dimensional White Burst / Zoom */}
        {phase === "zoom" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-[#050A0F]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="w-24 h-24 rounded-2xl bg-white shadow-[0_0_140px_60px_rgba(0,212,255,0.7)]"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.2, 1, 35], opacity: [0, 1, 0.9] }}
              transition={{ duration: 1.5, ease: easeInOut }}
            />
          </motion.div>
        )}

        {/* Phase 3: High-Definition Inauguration Video */}
        {phase === "video" && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              playsInline
              autoPlay
              preload="auto"
              onEnded={() => {
                setPhase("outro");
                setTimeout(handleFinish, 800);
              }}
            >
              <source src="/video/airo-airi.mp4" type="video/mp4" />
            </video>
            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050A0F] via-transparent to-[#050A0F]/60 pointer-events-none" />
          </motion.div>
        )}

        {/* Phase 4: Smooth Outro Dissolve */}
        {phase === "outro" && (
          <motion.div
            className="absolute inset-0 bg-[#050A0F]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: easeOut }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}