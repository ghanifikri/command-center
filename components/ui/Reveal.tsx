"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

type Props = {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  once?: boolean;
};

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 26 },
  down: { x: 0, y: -26 },
  left: { x: 26, y: 0 },
  right: { x: -26, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Section reveal wrapper — fades + slides in on view with dismissed transforms
 * when the visitor prefers reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  once = true,
}: Props) {
  const reduced = useReducedMotion();
  const o = reduced ? { x: 0, y: 0 } : offset[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...o }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}