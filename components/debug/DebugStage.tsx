"use client";

import { useEffect, useState } from "react";
import ProviderTree from "@/components/ProviderTree";
import { useAccess } from "@/lib/access-machine";
import AccessModal from "@/components/access/AccessModal";

const DEBUG_PIN = "280296";

/** Dev harness: monitors live machine state and allows manual step transitions. */
function DebugBody() {
  const {
    state,
    pin,
    dialogOpen,
    openModal,
    closeModal,
    press,
    completeVoice,
    completeActivation,
    completeCinematic,
    toEvent,
  } = useAccess();
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    setLog((l) => [...l.slice(-9), `${state} pin="${pin}"`]);
  }, [state, pin]);

  const dfast = (k: string) => {
    if (k === "grant") {
      for (const d of DEBUG_PIN) press(d);
      press("ok");
    } else if (k === "advance") {
      if (state === "granted") completeVoice();
      else if (state === "voice" || state === "activation") completeActivation();
      else if (state === "cinematic") completeCinematic();
      else toEvent();
    } else {
      press(k);
    }
  };

  return (
    <div className="min-h-screen bg-[#050A0F] p-4 font-mono text-xs text-[#8B98A5]">
      <div className="mb-4 flex flex-wrap gap-2">
        <button className="border border-[#00D4FF] px-3 py-1.5 text-[#00D4FF] hover:bg-[#00D4FF]/10" onClick={openModal}>
          Open Modal
        </button>
        <button className="border border-[#8B98A5] px-3 py-1.5 text-[#8B98A5] hover:bg-white/5" onClick={closeModal}>
          Close Modal
        </button>
        <button className="border border-[#00E5A0] px-3 py-1.5 text-[#00E5A0] hover:bg-[#00E5A0]/10" onClick={() => dfast("grant")}>
          Auto Grant
        </button>
        <button className="border border-[#C9A96E] px-3 py-1.5 text-[#C9A96E] hover:bg-[#C9A96E]/10" onClick={() => dfast("advance")}>
          Advance Step
        </button>
      </div>
      <div className="rounded-lg border border-[#1B2A36] bg-[#0B141C] p-3 text-[#F5F7FA]">
        state = <span className="text-[#00D4FF] font-bold">{state}</span> | dialog = {String(dialogOpen)} | pin = &quot;{pin}&quot;
      </div>
      <div className="mt-3 whitespace-pre-wrap rounded-lg border border-[#1B2A36] bg-[#0B141C]/50 p-3 text-xs text-[#8B98A5]">
        {[...log].reverse().join("\n")}
      </div>
      <AccessModal />
    </div>
  );
}

export default function DebugStage() {
  return (
    <ProviderTree>
      <DebugBody />
    </ProviderTree>
  );
}