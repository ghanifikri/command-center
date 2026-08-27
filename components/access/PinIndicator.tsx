"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  length: number;
  filled: number;
  invalid: boolean;
};

/**
 * Modern cybernetic PIN indicator with segmented glass cells and neon glow.
 */
export default function PinIndicator({ length, filled, invalid }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`${filled} of ${length} digits entered`}
      className="flex items-center justify-center gap-2.5 sm:gap-3"
    >
      {Array.from({ length }, (_, i) => {
        const isFilled = i < filled;
        const isCurrent = i === filled && !invalid;

        return (
          <motion.div
            key={i}
            initial={false}
            animate={
              invalid
                ? {
                    x: [0, -4, 4, -4, 4, 0],
                    borderColor: "#FF4D5A",
                    backgroundColor: "rgba(255, 77, 90, 0.15)",
                  }
                : isFilled
                ? {
                    borderColor: "rgba(0, 229, 160, 0.6)",
                    backgroundColor: "rgba(0, 229, 160, 0.08)",
                  }
                : isCurrent
                ? {
                    borderColor: "rgba(0, 212, 255, 0.8)",
                    backgroundColor: "rgba(0, 212, 255, 0.05)",
                  }
                : {
                    borderColor: "rgba(27, 42, 54, 0.8)",
                    backgroundColor: "rgba(7, 17, 29, 0.6)",
                  }
            }
            transition={{ duration: 0.2 }}
            className={cn(
              "relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border transition-all",
              isCurrent && "shadow-[0_0_15px_rgba(0,212,255,0.3)]",
              isFilled && "shadow-[0_0_15px_rgba(0,229,160,0.2)]",
              invalid && "shadow-[0_0_15px_rgba(255,77,90,0.4)]"
            )}
          >
            {/* Center dot/indicator */}
            {isFilled && !invalid ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="h-3.5 w-3.5 rounded-full bg-[#00E5A0] shadow-[0_0_10px_#00E5A0]"
              />
            ) : isCurrent ? (
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]"
              />
            ) : (
              <span className="h-1 w-1 rounded-full bg-[#8B98A5]/30" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}