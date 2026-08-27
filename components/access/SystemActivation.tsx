"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VideoHero from "@/components/hero/VideoHero";
import { activation } from "@/data/event";
import { useAccess } from "@/lib/access-machine";
import { useSound } from "@/lib/sound";
import { easeOut } from "@/lib/motion";

/**
 * Cinematic system-activation sequence — subsystem lines light up sequentially,
 * culminating in ALL SYSTEMS READY. This is a ceremony, not an operational dashboard.
 */
export default function SystemActivation() {
  const { state, completeActivation } = useAccess();
  const sound = useSound();
  const [activeStep, setActiveStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const timeoutsRef = useRef<number[]>([]);

  const active = state === "voice" || state === "activation";

  useEffect(() => {
    if (!active) return;

    setActiveStep(0);
    setReady(false);
    setCompletedSteps(new Set());
    timeoutsRef.current.forEach(window.clearTimeout);
    timeoutsRef.current = [];

    const systemsCount = activation.systems.length;
    const stepDuration = 650; // crisp, ceremonial cadence

    activation.systems.forEach((_, idx) => {
      // Step activate
      const startId = window.setTimeout(() => {
        setActiveStep(idx);
        sound.play("beep");
      }, idx * stepDuration);
      timeoutsRef.current.push(startId);

      // Step complete
      const doneId = window.setTimeout(() => {
        setCompletedSteps((prev) => new Set([...prev, idx]));
      }, idx * stepDuration + stepDuration - 100);
      timeoutsRef.current.push(doneId);
    });

    // All systems ready
    const finishId = window.setTimeout(() => {
      setReady(true);
      sound.play("success");
    }, systemsCount * stepDuration + 200);
    timeoutsRef.current.push(finishId);

    // Hand off to cinematic
    const transitionId = window.setTimeout(() => {
      completeActivation();
    }, systemsCount * stepDuration + 1400);
    timeoutsRef.current.push(transitionId);

    return () => {
      timeoutsRef.current.forEach(window.clearTimeout);
      timeoutsRef.current = [];
    };
  }, [active, sound, completeActivation]);

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
          {/* Ambient Video Backdrop */}
          <VideoHero />

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative z-10 mb-8 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-[#00D4FF] sm:text-xs"
          >
            {activation.init}
          </motion.h2>

          <div className="relative z-10 w-full max-w-md rounded-xl border border-[#1B2A36]/80 bg-[#0B141C]/80 p-6 backdrop-blur-md shadow-2xl">
            <ul className="space-y-4 font-mono text-xs sm:text-sm">
              {activation.systems.map((sys, i) => {
                const isCurrent = i === activeStep && !completedSteps.has(i) && !ready;
                const isDone = completedSteps.has(i) || ready;
                const isPending = !isDone && !isCurrent;

                return (
                  <li
                    key={sys.label}
                    className="flex items-center justify-between gap-3"
                    aria-hidden={isPending}
                  >
                    <span
                      className={`w-28 sm:w-32 shrink-0 font-medium transition-colors duration-300 ${
                        isDone
                          ? "text-[#F5F7FA]"
                          : isCurrent
                            ? "text-[#00D4FF]"
                            : "text-[#8B98A5]/40"
                      }`}
                    >
                      {sys.label}
                    </span>

                    {/* Animated Progress / Divider */}
                    <div className="flex-1 overflow-hidden">
                      {isCurrent ? (
                        <div className="h-1 w-full rounded-full bg-[#1B2A36] overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#00D4FF] to-[#00E5A0]"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.55, ease: "linear" }}
                          />
                        </div>
                      ) : (
                        <div
                          className={`h-px w-full border-b border-dotted transition-colors duration-300 ${
                            isDone ? "border-[#00D4FF]/40" : "border-[#1B2A36]"
                          }`}
                        />
                      )}
                    </div>

                    {/* Status Badge */}
                    <div className="w-20 text-right shrink-0">
                      {isDone && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#00E5A0]"
                        >
                          {sys.status}
                        </motion.span>
                      )}
                      {isCurrent && (
                        <span className="inline-block text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#00D4FF] animate-pulse">
                          INITIALIZING
                        </span>
                      )}
                      {isPending && (
                        <span className="inline-block text-[0.62rem] uppercase tracking-[0.2em] text-[#8B98A5]/30">
                          STANDBY
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <AnimatePresence>
            {ready && (
              <motion.p
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOut }}
                className="relative z-10 mt-8 font-display text-lg sm:text-xl font-medium uppercase tracking-[0.35em] text-[#00E5A0]"
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