"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/lib/sound";

/**
 * Global sound toggle — button + state text for keyboard users.
 * Audio never starts until the user's explicit gesture (RESMIKAN / this toggle).
 */
export default function SoundToggle() {
  const { muted, toggleMuted } = useSound();

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-pressed={muted}
      aria-label={muted ? "Enable sound" : "Mute sound"}
      className="group inline-flex items-center gap-2 rounded border border-[#8B98A5]/25 px-3 py-2 text-[#8B98A5] transition-colors hover:border-[#00D4FF]/50 hover:text-[#00D4FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]"
    >
      {muted ? (
        <VolumeX className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Volume2 className="h-4 w-4" aria-hidden="true" />
      )}
      <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em]">
        {muted ? "Sound Off" : "Sound On"}
      </span>
    </button>
  );
}