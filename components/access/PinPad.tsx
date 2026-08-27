"use client";

import { motion } from "framer-motion";
import { Delete, Check } from "lucide-react";
import { useAccess } from "@/lib/access-machine";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

type Key = string;

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
        aria-label={key === "back" ? "Hapus digit terakhir" : `Digit ${key}`}
        className={cn(
          "flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border bg-[#0B141C]/80 text-xl sm:text-2xl font-mono text-[#F5F7FA] transition-all",
          isAction
            ? "border-[#2A3B4A] hover:border-[#FF4D5A]/60 hover:text-[#FF4D5A] hover:bg-[#FF4D5A]/10"
            : "border-[#2A3B4A] hover:border-[#00D4FF]/60 hover:text-[#00D4FF] hover:bg-[#00D4FF]/10",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]",
        )}
      >
        {isAction ? (
          <Delete className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        ) : (
          key
        )}
      </motion.button>
    );
  };

  return (
    <div className="flex items-stretch justify-center gap-3 sm:gap-4">
      {/* Left: 3x4 Number pad */}
      <div
        role="group"
        aria-label="Access code keypad"
        className="grid grid-cols-3 gap-2.5 sm:gap-3"
      >
        {numberKeys.map((k) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {renderKey(k)}
          </motion.div>
        ))}
      </div>

      {/* Right: Enter / Confirm Button */}
      <motion.button
        type="button"
        onClick={() => press("ok")}
        disabled={pin.length !== 6}
        whileTap={{ scale: 0.96 }}
        aria-label="Konfirmasi kode akses"
        className={cn(
          "flex w-16 sm:w-20 flex-col items-center justify-center gap-2 rounded-2xl border bg-[#0B141C]/80 text-xs sm:text-sm font-display font-semibold transition-all",
          pin.length === 6
            ? "border-[#00E5A0] text-[#00E5A0] bg-[#00E5A0]/15 shadow-[0_0_24px_rgba(0,229,170,0.3)] hover:bg-[#00E5A0]/25 cursor-pointer"
            : "border-[#2A3B4A]/50 text-[#8B98A5]/40 opacity-40 cursor-not-allowed",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5A0]",
        )}
      >
        <Check className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="tracking-[0.2em] uppercase">OK</span>
      </motion.button>
    </div>
  );
}