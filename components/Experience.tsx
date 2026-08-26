"use client";

import { AnimatePresence, motion } from "framer-motion";
import Landing from "@/components/hero/Landing";
import VideoHero from "@/components/hero/VideoHero";
import AccessModal from "@/components/access/AccessModal";
import AccessGranted from "@/components/access/AccessGranted";
import SystemActivation from "@/components/access/SystemActivation";
import CinematicTransition from "@/components/access/CinematicTransition";
import EventExperience from "@/components/event/EventExperience";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useAccess } from "@/lib/access-machine";

/** State-machine → screen mapper. Renders exactly the layer for the current state. */
export default function Experience() {
  const { state } = useAccess();

  const showLanding = state === "landing" || state === "pin" || state === "verifying" || state === "denied";
  const showEvent = state === "event";

  return (
    <>
      {/* Landing layer */}
      <AnimatePresence>
        {showLanding && (
          <motion.div
            key="landing"
            className="fixed inset-0 z-10 overflow-hidden bg-[#050A0F]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <VideoHero />
            <Landing />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ceremony layers — one screen per machine state, mounted directly.
          No AnimatePresence exit here: each screen animates in on mount and the
          layer swap is abrupt-but-dark, which reads as a deliberate hard cut
          between ceremonial beats rather than a lingering crossfade that can
          leave a stuck fullscreen overlay. */}
      <AccessModal />
      {state === "granted" && <AccessGranted />}
      {state === "voice" && <SystemActivation />}

      {/* Event layer */}
            {showEvent && (
              <ErrorBoundary>
                <motion.div
                  key="event"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="min-h-screen bg-[#050A0F]"
                >
                  {/* Background video — same semi-transparent landing video continues through event page */}
                  <VideoHero />
                  <EventExperience />
                </motion.div>
              </ErrorBoundary>
            )}

      {/* Cinematic layer — plays after event page */}
      {state === "cinematic" && <CinematicTransition />}
    </>
  );
}