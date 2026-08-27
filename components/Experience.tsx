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

/**
 * State-machine driven layer coordinator.
 * Canonical progression:
 * LANDING / PIN / VERIFYING / DENIED -> GRANTED -> VOICE / ACTIVATION -> CINEMATIC -> EVENT.
 */
export default function Experience() {
  const { state } = useAccess();

  const isLandingFlow =
    state === "landing" ||
    state === "pin" ||
    state === "verifying" ||
    state === "denied";

  return (
    <ErrorBoundary>
      {/* 1. Landing & Modal Layer */}
      <AnimatePresence>
        {isLandingFlow && (
          <motion.div
            key="landing-layer"
            className="fixed inset-0 z-10 overflow-hidden bg-[#050A0F]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VideoHero />
            <Landing />
            <AccessModal />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Access Granted Screen */}
      {state === "granted" && <AccessGranted />}

      {/* 3. System Activation Sequence */}
      {(state === "voice" || state === "activation") && <SystemActivation />}

      {/* 4. Cinematic Transition */}
      {state === "cinematic" && <CinematicTransition />}

      {/* 5. Full Event Experience Page */}
      {state === "event" && (
        <motion.div
          key="event-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-[#050A0F]"
        >
          <EventExperience />
        </motion.div>
      )}
    </ErrorBoundary>
  );
}