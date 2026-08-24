"use client";

import { useEffect, useState } from "react";
import SceneBackdrop from "@/components/hero/SceneBackdrop";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Self-checking hero video with graceful degradation:
 *  - prefers the full desktop/mobile video assets when present
 *  - falls back to the static cinematic SVG scene when they're missing
 * Media failure must never block the experience (see performance.md).
 */
export default function VideoHero() {
  const [media, setMedia] = useState<{ src?: string; poster?: string }>({});
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const poster = "/video/command-center-poster.jpg";
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;

    if (!prefersReducedMotion()) {
      // Probe for the video file (desktop or mobile variant).
      const src = isMobile
        ? "/video/command-center-profile-mobile.mp4"
        : "/video/command-center-profile.mp4";
      fetch(src, { method: "HEAD" })
        .then((r) => r.ok && setMedia({ src, poster }))
        .catch(() => setMedia({ poster }));
    } else {
      // Reduced motion: poster only, never auto-play video.
      setMedia({ poster });
    }
  }, []);

  const hasVideo = Boolean(media.src);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#050A0F]"
      aria-hidden="true"
    >
      {/* Video when available */}
      {hasVideo && !failed && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={media.src}
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onError={() => {
            setFailed(true);
            setMedia((m) => ({ poster: m.poster }));
          }}
        />
      )}

      {/* Awaiting video probe or failed video → SVG scene */}
      {(!hasVideo || failed) && <SceneBackdrop />}

      {/* Cinematic overlay — keeps UI legible without drowning the media */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050A0F]/70 via-[#050A0F]/30 to-[#050A0F]/85" />
      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 180px rgba(3,7,11,0.9)" }} />
    </div>
  );
}