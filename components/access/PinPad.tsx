"use client";

import { motion } from "framer-motion";
import { Delete, Check } from "lucide-react";
import { access, secureAccess } from "@/data/event";
import { useAccess } from "@/lib/access-machine";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

type Key = string;

const KEY_SUBTEXT: Record<string, string> = {
  "1": "—",
  "2": "ABC",
  "3": "DEF",
  "4": "GHI",
  "5": "JKL",
  "6": "MNO",
  "7": "PQRS",
  "8": "TUV",
  "9": "WXYZ",
  "0": "+",
};

/**
 * Balanced, modern 3x4 cybernetic keypad with micro-interactions and tactile feedback.
 */
export default function PinPad() {
  const { press, pin } = useAccess();
  const keys = secureAccess.keypad; // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "back", "0", "ok"]
  const isReadyToSubmit = pin.length === access.codeLength;

  const renderKey = (key: Key) => {
    const isBack = key === "back";
    const isOk = key === "ok";
    const subtext = KEY_SUBTEXT[key];

    if (isOk) {
      return (
        <motion.button
          type="button"
          onClick={() => press("ok")}
          disabled={!isReadyToSubmit}
          whileTap={{ scale: isReadyToSubmit ? 0.92 : 1 }}
          aria-label="Confirm access code"
          className={cn(
            "flex h-16 w-16 sm:h-[72px] sm:w-[72px] flex-col items-center justify-center rounded-2xl border transition-all duration-200",
            isReadyToSubmit
              ? "border-[#00E5A0] bg-[#00E5A0]/20 text-[#00E5A0] shadow-[0_0_20px_rgba(0,229,160,0.4)] hover:bg-[#00E5A0]/30 hover:scale-105 cursor-pointer"
              : "border-[#1B2A36] bg-[#07111D]/40 text-[#8B98A5]/40 opacity-40 cursor-not-allowed",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5A0]"
          )}
        >
          <Check className={cn("h-6 w-6 stroke-[2.5]", isReadyToSubmit ? "text-[#00E5A0]" : "text-[#8B98A5]/40")} />
          <span className="mt-0.5 font-mono text-[0.55rem] font-bold tracking-wider uppercase">
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
          whileTap={{ scale: 0.92 }}
          aria-label="Delete last digit"
          className={cn(
            "flex h-16 w-16 sm:h-[72px] sm:w-[72px] flex-col items-center justify-center rounded-2xl border border-[#1B2A36] bg-[#07111D]/60 text-[#8B98A5] transition-all duration-200",
            "hover:border-[#FF4D5A]/50 hover:bg-[#FF4D5A]/10 hover:text-[#FF4D5A] hover:shadow-[0_0_15px_rgba(255,77,90,0.2)]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4D5A]"
          )}
        >
          <Delete className="h-5 w-5" />
          <span className="mt-0.5 font-mono text-[0.55rem] tracking-wider uppercase">
            DEL
          </span>
        </motion.button>
      );
    }

    return (
      <motion.button
        type="button"
        onClick={() => press(key)}
        whileTap={{ scale: 0.92 }}
        aria-label={`Digit ${key}`}
        className={cn(
          "relative flex h-16 w-16 sm:h-[72px] sm:w-[72px] flex-col items-center justify-center rounded-2xl border border-[#1B2A36] bg-[#07111D]/75 backdrop-blur-md transition-all duration-200",
          "hover:border-[#00D4FF]/60 hover:bg-[#00D4FF]/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.25)] hover:scale-[1.03]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]"
        )}
      >
        <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#F5F7FA]">
          {key}
        </span>
        {subtext && (
          <span className="font-mono text-[0.52rem] font-medium tracking-widest text-[#8B98A5]/60">
            {subtext}
          </span>
        )}
      </motion.button>
    );
  };

  return (
    <div
      role="group"
      aria-label="Access code keypad"
      className="grid grid-cols-3 gap-3.5 sm:gap-4 justify-items-center mx-auto"
    >
      {keys.map((k, i) => (
        <motion.div
          key={k}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.02, ease: EASE }}
        >
          {renderKey(k)}
        </motion.div>
      ))}
    </div>
  );
}