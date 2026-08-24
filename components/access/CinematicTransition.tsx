"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAccess } from "@/lib/access-machine";
import { useSound } from "@/lib/sound";
import { easeInOut, easeOut } from "@/lib/motion";

/**
 * Cinematic bridge from activation to the event page:
 * - Grid lattice reveal
 * - Light sweep
 * - Brightness rise
 * - Zoom into white light
 * - Video playback
 * - Dissolve into event hero
 */
export default function CinematicTransition() {
  const { state, completeTransition, toEvent } = useAccess();
  const sound = useSound();
  const armed = useRef(false);
  const [phase, setPhase] = useState<"lattice" | "zoom" | "video" | "done">("lattice");
  const videoRef = useRef<HTMLVideoElement>(null);

  const active = state === "activation" || state === "transition";

  // Phase 1: Lattice reveal (on mount)
  useEffect(() => {
    if (state !== "activation" || armed.current) return;
    armed.current = true;
    sound.play("success");
    completeTransition(); // dispatches TRANSITION_DONE

    // Phase 1 duration: ~1.6s
    const t1 = window.setTimeout(() => setPhase("zoom"), 1600);
    // Phase 2: Zoom into white light ~2s
    const t2 = window.setTimeout(() => setPhase("video"), 3600);
    // Phase 3: Video plays ~8s then transition to event
    const t3 = window.setTimeout(() => {
      setPhase("done");
      toEvent();
    }, 11000);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, sound, completeTransition, toEvent]);

  // Video handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video || phase !== "video") return;

    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked, try again on user interaction or just continue
        video.muted = true;
        video.play().catch(() => {});
      });
    }

    const onEnded = () => {
      if (phase === "video") {
        setPhase("done");
        toEvent();
      }
    };
    video.addEventListener("ended", onEnded);

    // Fallback: if video doesn't end (e.g., loop or error), transition after 8s
    const fallbackTimer = window.setTimeout(() => {
      if (phase === "video") {
        setPhase("done");
        toEvent();
      }
    }, 8000);

    return () => {
      video.removeEventListener("ended", onEnded);
      window.clearTimeout(fallbackTimer);
    };
  }, [phase, toEvent]);

  void sound;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="transition"
          className="fixed inset-0 z-40 overflow-hidden bg-[#050A0F]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: easeInOut }}
          aria-hidden="true"
        >
          {/* Phase 1: Lattice grid expand + cold flash + light sweep */}
          {phase === "lattice" && (
            <>
              {/* Cold flash */}
              <motion.div
                className="absolute inset-0 bg-[#DFF7FF]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.9, 0] }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
              {/* Lattice grid expand */}
              <motion.div
                className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.16)_1px,transparent_1px)] bg-[size:48px_48px]"
                initial={{ scale: 1.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: easeInOut, delay: 0.1 }}
              />
              {/* Light sweep */}
              <motion.div
                className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#F5F7FA]/25 to-transparent blur-md"
                initial={{ left: "-40%" }}
                animate={{ left: "110%" }}
                transition={{ duration: 1.2, ease: easeInOut, delay: 0.35 }}
              />
              {/* Brightness rise then settle */}
              <motion.div
                className="absolute inset-0 bg-[#050A0F]"
                initial={{ opacity: 0.55 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: easeInOut, delay: 0.2 }}
              />
            </>
          )}

          {/* Phase 2: Zoom into white light box */}
          {phase === "zoom" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 50], opacity: [1, 1, 0] }}
              transition={{ duration: 2, ease: easeInOut }}
            >
              <motion.div
                className="w-32 h-32 rounded-[24px] bg-white/90 shadow-[0_0_120px_40px_rgba(255,255,255,0.8),0_0_200px_80px_rgba(0,212,255,0.4)]"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: easeOut }}
              />
            </motion.div>
          )}

          {/* Phase 3: Video playback */}
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
              >
                <source src="/video/Command Center Drone AI.mp4" type="video/mp4" />
              </video>
              {/* Subtle vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A0F]/60 via-transparent to-[#050A0F]/40" />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}