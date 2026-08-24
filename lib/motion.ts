/**
 * Shared motion presets — single source of timing for the experience.
 * Durations follow cinematic-motion.md: micro 120–220ms, button/modal 250–450ms,
 * section reveal 500–900ms, ceremonial transition 900–1800ms.
 */
export const EASE = [0.22, 0.61, 0.36, 1] as const;

export const motionReduced = {
  duration: 0.2,
  ease: EASE,
};

/** Respect prefers-reduced-motion: collapse every preset to a quick fade. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Common single-ease curves for quick access in components. */
export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;
