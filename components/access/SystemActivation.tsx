"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VideoHero from "@/components/hero/VideoHero";
import { activation } from "@/data/event";
import { useAccess } from "@/lib/access-machine";
import { useSound } from "@/lib/sound";
import { easeOut } from "@/lib/motion";

/**
 * Cinematic system-activation sequence — system lines light up one by one,
 * then ALL SYSTEMS READY. This is a ceremony, not a monitoring dashboard.
 */
export default function SystemActivation() {
  const { state, completeActivation } = useAccess();
  const sound = useSound();
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [initializingIndex, setInitializingIndex] = useState(-1);
  const [systemProgress, setSystemProgress] = useState<Record<number, number>>({});
  const [systemDone, setSystemDone] = useState<Set<number>>(new Set());
  const timeoutsRef = useRef<number[]>([]);

  // The sequence screen lives in `voice`; `activation` belongs to the
  // cinematic-transition handoff (see CinematicTransition).
  const active = state === "voice";

  // Reveal one system row every 460ms with initializing animation
  useEffect(() => {
    console.log("[SystemActivation] Effect started, active:", active);
    setCount(0);
    setReady(false);
    setInitializingIndex(-1);
    setSystemProgress({});
    setSystemDone(new Set());
    if (!active) return;
    let finished = false;

    const finish = () => {
      console.log("[SystemActivation] finish() called");
      sound.play("success");
      window.setTimeout(() => setReady(true), 300);
      window.setTimeout(() => completeActivation(), 1000);
    };

    const animateProgress = (index: number, onComplete: () => void) => {
      let progress = 0;
      const interval = window.setInterval(() => {
        if (finished) return;
        progress += 2.5; // 2.5% * 40 steps = 100% over 2000ms
        setSystemProgress((prev) => ({ ...prev, [index]: Math.min(progress, 100) }));
        if (progress >= 100) {
          clearInterval(interval);
          // Mark this system as visually complete
          setSystemDone((prev) => new Set([...prev, index]));
          // Wait for visual animation to complete (framer-motion transition: 2s)
          // The interval runs for 2s, so progress reaches 100 at ~2s
          // Add small buffer then call onComplete
          const buffer = window.setTimeout(() => {
            onComplete();
          }, 300);
          timeoutsRef.current.push(buffer);
        }
      }, 50); // 50ms * 40 steps = 2000ms (2 seconds)
      timeoutsRef.current.push(interval);
    };

    const processSystem = (index: number) => {
      if (finished) return;
      setInitializingIndex(index);
      setSystemProgress((prev) => ({ ...prev, [index]: 0 }));
      sound.play("beep");

      // Animate progress bar from 0% to 100% over 2000ms, then complete this system
      animateProgress(index, () => {
        if (finished) return;
        setCount((c) => c + 1);
        setInitializingIndex(-1);

        if (index >= activation.systems.length - 1) {
          finished = true;
          finish();
        } else {
          processSystem(index + 1);
        }
      });
    };

    // Start the chain
    if (activation.systems.length > 0) {
      processSystem(0);
    }

    return () => {
      finished = true;
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [active, sound, completeActivation]);

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" as const }
    }
  };

  const dotVariants = {
    hidden: { opacity: 0.2 },
    visible: {
      opacity: 1,
      transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" as const }
    }
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="activation"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#050A0F] px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-live="polite"
        >
          {/* Background video — same semi-transparent landing video */}
          <VideoHero />
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-[#8B98A5]"
          >
            {activation.init}
          </motion.h2>

          <ul className="w-full max-w-md space-y-4 font-mono text-sm">
            {activation.systems.map((sys, i) => {
              const isDone = i < count;
              const isInitializing = i === initializingIndex;
              const isPending = i > count && !isInitializing;
              const isVisuallyDone = systemDone.has(i);
              const progress = systemProgress[i] ?? 0;

              return (
                <li
                  key={sys.label}
                  className="flex items-center gap-4 opacity-90"
                  aria-hidden={isPending}
                >
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={isDone || isInitializing ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3 }}
                    className="text-[#F5F7FA] w-24 shrink-0"
                  >
                    {sys.label}
                  </motion.span>

                  {/* Center area - loading bar replaces dotted line during initialization */}
                  <AnimatePresence mode="wait">
                    {isInitializing && (
                      <motion.div
                        key="loading-center"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="flex-1 flex items-center gap-3 min-w-0"
                      >
                        <div className="flex-1 h-2 bg-[#1B2A36] rounded-full overflow-hidden relative">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#00D4FF] to-[#00E5A0] rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-[0.55rem] font-mono text-[#050A0F] font-bold">{progress}%</span>
                        </div>
                        <div className="flex items-center gap-1 text-[0.62rem] font-medium tracking-[0.2em] text-[#00D4FF] whitespace-nowrap shrink-0">
                          <span>INITIALIZING</span>
                          <motion.span
                            variants={loadingVariants}
                            className="inline-block w-1 h-1 rounded-full bg-[#00D4FF]"
                            style={{ animationDelay: "0ms" }}
                          />
                          <motion.span
                            variants={loadingVariants}
                            className="inline-block w-1 h-1 rounded-full bg-[#00D4FF]"
                            style={{ animationDelay: "150ms" }}
                          />
                          <motion.span
                            variants={loadingVariants}
                            className="inline-block w-1 h-1 rounded-full bg-[#00D4FF]"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </motion.div>
                    )}
                    {!isInitializing && (
                      <motion.div
                        key="dots"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 border-b border-dotted border-[#2A3B4A]"
                      />
                    )}
                  </AnimatePresence>

                  {/* Right side - status */}
                  <AnimatePresence mode="wait">
                    {isDone && !isVisuallyDone && (
                      <motion.span
                        key="status-pending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        className="text-[0.62rem] font-medium tracking-[0.2em] text-[#00D4FF] w-24 shrink-0 text-right"
                      >
                        COMPLETING…
                      </motion.span>
                    )}
                    {isVisuallyDone && (
                      <motion.span
                        key="status-done"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: easeOut }}
                        className="text-[0.62rem] font-medium tracking-[0.2em] text-[#00E5A0] w-24 shrink-0 text-right"
                      >
                        {sys.status}
                      </motion.span>
                    )}
                    {isPending && (
                      <motion.span
                        key="pending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        className="text-[0.62rem] font-medium tracking-[0.2em] text-[#2A3B4A] w-24 shrink-0 text-right"
                      >
                        STANDBY
                      </motion.span>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <AnimatePresence>
            {ready && (
              <motion.p
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="mt-12 font-display text-xl font-medium uppercase tracking-[0.3em] text-[#00D4FF]"
              >
                {activation.ready}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}