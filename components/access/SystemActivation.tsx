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

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="activation"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#050A0F]/90 px-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-live="polite"
        >
          {/* Background video — same semi-transparent landing video */}
          <VideoHero />

          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-[#00D4FF]/10 blur-[120px]"
          />

          {/* HUD Command Console Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#00D4FF]/25 bg-[#07111D]/85 p-6 shadow-[0_0_50px_rgba(0,212,255,0.12)] backdrop-blur-xl sm:p-8"
          >
            {/* Tech HUD Corner Brackets */}
            <div className="pointer-events-none absolute left-2 top-2 h-3.5 w-3.5 border-l-2 border-t-2 border-[#00D4FF]" />
            <div className="pointer-events-none absolute right-2 top-2 h-3.5 w-3.5 border-r-2 border-t-2 border-[#00D4FF]" />
            <div className="pointer-events-none absolute bottom-2 left-2 h-3.5 w-3.5 border-b-2 border-l-2 border-[#00D4FF]" />
            <div className="pointer-events-none absolute bottom-2 right-2 h-3.5 w-3.5 border-b-2 border-r-2 border-[#00D4FF]" />

            {/* Scanning radar line */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-[#00D4FF]/10 to-transparent"
              initial={{ top: "-15%" }}
              animate={{ top: "115%" }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between border-b border-[#1B2A36] pb-4">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D4FF] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00D4FF]" />
                </span>
                <div>
                  <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[#F5F7FA]">
                    {activation.init}
                  </h2>
                  <p className="font-mono text-[0.55rem] tracking-wider text-[#8B98A5]">
                    TELEMETRY INITIALIZATION
                  </p>
                </div>
              </div>

              {/* Counter badge */}
              <div className="flex items-center gap-1.5 rounded border border-[#00D4FF]/20 bg-[#0B1724]/90 px-2 py-0.5 font-mono text-[0.6rem] text-[#00D4FF]">
                <span className="font-bold">{systemDone.size}</span>
                <span className="text-[#8B98A5]">/</span>
                <span>{activation.systems.length}</span>
              </div>
            </div>

            {/* System rows */}
            <ul className="w-full space-y-3 font-mono text-sm">
              {activation.systems.map((sys, i) => {
                const isDone = i < count;
                const isInitializing = i === initializingIndex;
                const isPending = i > count && !isInitializing;
                const isVisuallyDone = systemDone.has(i);
                const progress = systemProgress[i] ?? 0;

                return (
                  <li
                    key={sys.label}
                    className={`relative flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-all duration-300 ${
                      isInitializing
                        ? "border-[#00D4FF]/50 bg-[#00D4FF]/10 shadow-[0_0_15px_rgba(0,212,255,0.15)]"
                        : isVisuallyDone
                        ? "border-[#00E5A0]/25 bg-[#00E5A0]/5"
                        : "border-[#1B2A36]/40 bg-[#07111D]/40 opacity-50"
                    }`}
                    aria-hidden={isPending}
                  >
                    {/* System Name */}
                    <div className="w-32 shrink-0">
                      <span className="font-display text-xs font-semibold tracking-wider text-[#F5F7FA]">
                        {sys.label}
                      </span>
                    </div>

                    {/* Center Area: Progress Bar or Connection Line */}
                    <div className="flex-1 min-w-0">
                      {isInitializing ? (
                        <div className="flex items-center gap-2">
                          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[#1B2A36]">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-[#00D4FF] to-[#00E5A0]"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="font-mono text-[0.58rem] font-bold text-[#00D4FF] shrink-0">
                            {Math.round(progress)}%
                          </span>
                        </div>
                      ) : isVisuallyDone ? (
                        <div className="h-px w-full bg-gradient-to-r from-[#00E5A0]/30 via-[#00E5A0]/60 to-[#00E5A0]/30" />
                      ) : (
                        <div className="h-px w-full border-b border-dashed border-[#2A3B4A]" />
                      )}
                    </div>

                    {/* Right Side: Status Badge */}
                    <div className="w-24 shrink-0 text-right">
                      {isInitializing && (
                        <span className="inline-flex items-center gap-1 rounded border border-[#00D4FF]/40 bg-[#00D4FF]/10 px-2 py-0.5 font-mono text-[0.6rem] font-bold text-[#00D4FF]">
                          <span className="h-1 w-1 animate-pulse rounded-full bg-[#00D4FF]" />
                          SYNC
                        </span>
                      )}
                      {isDone && !isVisuallyDone && !isInitializing && (
                        <span className="font-mono text-[0.6rem] text-[#00D4FF]">
                          COMPLETING…
                        </span>
                      )}
                      {isVisuallyDone && (
                        <span className="inline-flex items-center gap-1 rounded border border-[#00E5A0]/40 bg-[#00E5A0]/10 px-2 py-0.5 font-mono text-[0.62rem] font-bold text-[#00E5A0] shadow-[0_0_10px_rgba(0,229,160,0.2)]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#00E5A0]" />
                          {sys.status}
                        </span>
                      )}
                      {isPending && (
                        <span className="font-mono text-[0.58rem] tracking-wider text-[#8B98A5]/50">
                          STANDBY
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Bottom: ALL SYSTEMS READY Climax */}
            <div className="mt-5 border-t border-[#1B2A36]/60 pt-4">
              <AnimatePresence mode="wait">
                {ready ? (
                  <motion.div
                    key="all-ready"
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: easeOut }}
                    className="flex flex-col items-center justify-center rounded-xl border border-[#00E5A0]/50 bg-gradient-to-r from-[#00D4FF]/15 via-[#00E5A0]/20 to-[#00D4FF]/15 py-3 shadow-[0_0_25px_rgba(0,229,160,0.25)]"
                  >
                    <div className="flex items-center gap-2 text-[#00E5A0]">
                      <svg className="h-4 w-4 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="font-display text-base font-bold uppercase tracking-[0.25em] text-[#00E5A0] drop-shadow-[0_0_12px_rgba(0,229,160,0.8)]">
                        {activation.ready}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[0.52rem] tracking-[0.2em] text-[#F5F7FA]/70">
                      INTEGRATION COMPLETE · COMMENCING CEREMONY
                    </p>
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-between px-1 font-mono text-[0.58rem] text-[#8B98A5]">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] animate-ping" />
                      <span>INITIALIZING SYSTEMS...</span>
                    </div>
                    <span>STANDBY</span>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}