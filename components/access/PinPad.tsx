"use client";

import { motion } from "framer-motion";
import { Delete } from "lucide-react";
import { secureAccess } from "@/data/event";
import { useAccess } from "@/lib/access-machine";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

type Key = string;

/** Split keypad: circular number buttons on left, large ENTER on right. */
export default function PinPad() {
  const { press, pin } = useAccess();

  const numberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "back", "0"];

  const renderKey = (key: Key) => {
    const isAction = key === "back";
    return (
      <motion.button
        key={key}
        type="button"
        onClick={() => press(key)}
        whileTap={{ scale: 0.92 }}
        aria-label={key === "back" ? "Delete last digit" : `Digit ${key}`}
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full border bg-[#0B141C]/70 text-xl font-medium text-[#F5F7FA] transition-all sm:h-20 sm:w-20 text-2xl",
          isAction
            ? "border-[#2A3B4A] hover:border-[#FF4D5A]/60 hover:text-[#FF4D5A] hover:bg-[#FF4D5A]/5"
            : "border-[#2A3B4A] hover:border-[#00D4FF]/60 hover:text-[#00D4FF] hover:bg-[#00D4FF]/5",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]",
        )}
      >
        {isAction ? (
          <Delete className="h-6 w-6" aria-hidden="true" />
        ) : (
          key
        )}
      </motion.button>
    );
  };

  return (
    <div className="flex items-start gap-6">
      {/* Left: Number pad (3x4 grid without Enter) */}
      <div
        role="group"
        aria-label="Access code keypad"
        className="grid grid-cols-3 gap-3"
      >
        {numberKeys.map((k) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12, ease: EASE }}
          >
            {renderKey(k)}
          </motion.div>
        ))}
      </div>

      {/* Right: Large Enter button */}
      <motion.button
        type="button"
        onClick={() => press("ok")}
        disabled={pin.length !== 6}
        whileTap={{ scale: 0.96 }}
        aria-label="Confirm access code"
        className={cn(
          "flex h-[368px] min-h-[368px] w-28 items-center justify-center rounded-2xl border bg-[#0B141C]/70 text-2xl font-display text-[#00E5A0] transition-all sm:w-32",
          pin.length === 6
            ? "border-[#00E5A0]/50 hover:border-[#00E5A0] hover:bg-[#00E5A0]/10 hover:shadow-[0_0_32px_rgba(0,229,170,0.4)]"
            : "border-[#2A3B4A]/50 opacity-40 cursor-not-allowed",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5A0]",
        )}
      >
        <span className="writing-mode-vertical-lr text-center leading-tight tracking-wider">
          E N T E R
        </span>
      </motion.button>
    </div>
  );
}