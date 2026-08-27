"use client";

import { useEffect, useState } from "react";
import SceneBackdrop from "@/components/hero/SceneBackdrop";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Self-checking hero video with graceful degradation:
 *  - Plays background video asset when supported
 *  - Falls back to the static cinematic SVG scene on error or reduced motion
 *  - Media failure never blocks the experience
 */
export default function VideoHero() {
  const [useFallback, setUseFallback] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (prefersReducedMotion()) {
      setUseFallback(true);
    }
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#050A0F]"
      aria-hidden="true"
    >
      {/* Background video */}
      {isClient && !useFallback && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/video/background.mp4"
          poster="/video/command-center-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          style={{ opacity: 0.35 }}
          onError={() => setUseFallback(true)}
        />
      )}

      {/* Fallback SVG scene */}
      {(!isClient || useFallback) && <SceneBackdrop />}

      {/* Cinematic overlay — keeps UI legible without drowning the media */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050A0F]/70 via-[#050A0F]/30 to-[#050A0F]/85" />
      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 180px rgba(3,7,11,0.9)" }}
      />
    </div>
  );
}