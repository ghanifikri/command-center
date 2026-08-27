"use client";

import { motion } from "framer-motion";
import { Delete, Check } from "lucide-react";
import { access, secureAccess } from "@/data/event";
import { useAccess } from "@/lib/access-machine";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

type Key = string;

/**
 * Pure numeric 3x4 cybernetic keypad with maximized button sizing, minimal gaps, and tactile feedback.
 */
export default function PinPad() {
  const { press, pin } = useAccess();
  const keys = secureAccess.keypad; // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "back", "0", "ok"]
  const isReadyToSubmit = pin.length === access.codeLength;

  const renderKey = (key: Key) => {
    const isBack = key === "back";
    const isOk = key === "ok";

    if (isOk) {
      return (
        <motion.button
          type="button"
          onClick={() => press("ok")}
          disabled={!isReadyToSubmit}
          whileTap={{ scale: isReadyToSubmit ? 0.94 : 1 }}
          aria-label="Confirm access code"
          className={cn(
            "flex h-[68px] sm:h-[78px] w-full flex-col items-center justify-center rounded-2xl border transition-all duration-200",
            isReadyToSubmit
              ? "border-[#00E5A0] bg-[#00E5A0]/25 text-[#00E5A0] shadow-[0_0_25px_rgba(0,229,160,0.45)] hover:bg-[#00E5A0]/35 hover:scale-[1.02] cursor-pointer"
              : "border-[#1B2A36] bg-[#07111D]/40 text-[#8B98A5]/30 opacity-35 cursor-not-allowed",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5A0]"
          )}
        >
          <Check className={cn("h-7 w-7 stroke-[2.5]", isReadyToSubmit ? "text-[#00E5A0]" : "text-[#8B98A5]/40")} />
          <span className="mt-1 font-mono text-[0.6rem] font-black tracking-wider uppercase">
            ENTER
          </span>
        </motion.button>
      );
    }

    if (isBack) {
      return (
        <motion.button
          type="button"
          onClick={() => press("back")}
          whileTap={{ scale: 0.94 }}
          aria-label="Delete last digit"
          className={cn(
            "flex h-[68px] sm:h-[78px] w-full flex-col items-center justify-center rounded-2xl border border-[#1B2A36] bg-[#07111D]/70 text-[#8B98A5] transition-all duration-200",
            "hover:border-[#FF4D5A]/50 hover:bg-[#FF4D5A]/15 hover:text-[#FF4D5A] hover:shadow-[0_0_20px_rgba(255,77,90,0.25)]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4D5A]"
          )}
        >
          <Delete className="h-6 w-6" />
          <span className="mt-1 font-mono text-[0.6rem] font-bold tracking-wider uppercase">
            DEL
          </span>
        </motion.button>
      );
    }

    return (
      <motion.button
        type="button"
        onClick={() => press(key)}
        whileTap={{ scale: 0.94 }}
        aria-label={`Digit ${key}`}
        className={cn(
          "relative flex h-[68px] sm:h-[78px] w-full items-center justify-center rounded-2xl border border-[#1B2A36]/80 bg-[#07111D]/80 backdrop-blur-md transition-all duration-200",
          "hover:border-[#00D4FF]/70 hover:bg-[#00D4FF]/15 hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] hover:scale-[1.02]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]"
        )}
      >
        <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F5F7FA]">
          {key}
        </span>
      </motion.button>
    );
  };

  return (
    <div
      role="group"
      aria-label="Access code keypad"
      className="grid w-full grid-cols-3 gap-2 sm:gap-2.5 mx-auto"
    >
      {keys.map((k, i) => (
        <motion.div
          key={k}
          className="w-full"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: i * 0.015, ease: EASE }}
        >
          {renderKey(k)}
        </motion.div>
      ))}
    </div>
  );
}