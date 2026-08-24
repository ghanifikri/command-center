"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  length: number;
  filled: number;
  invalid: boolean;
};

/** Six dots that fill as digits are entered; flash red on invalid input. */
export default function PinIndicator({ length, filled, invalid }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`${filled} of ${length} digits entered`}
      className="flex items-center justify-center gap-3"
    >
      {Array.from({ length }, (_, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          animate={
            invalid
              ? { backgroundColor: ["#FF4D5A", "#FF4D5A"] }
              : { backgroundColor: i < filled ? "#00E5A0" : "#1B2A36" }
          }
          transition={{ duration: 0.2 }}
          className={cn(
            "h-3 w-3 rounded-full",
            invalid && "bg-[#FF4D5A]",
          )}
        />
      ))}
    </div>
  );
}