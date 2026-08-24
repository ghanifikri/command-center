"use client";

import { useEffect, useState } from "react";
import ProviderTree from "@/components/ProviderTree";
import { useAccess } from "@/lib/access-machine";
import AccessModal from "@/components/access/AccessModal";

const DEBUG_PIN = "280296";
/* Debug harness — exercises the live machine but renders no ceremony layers. */

/** Dev-only harness: shows the live machine state and steps it from the outside. */
function DebugBody() {
  const { state, pin, dialogOpen, openModal, closeModal, press, completeVoice, completeActivation, toCinematic } = useAccess();
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    setLog((l) => [...l.slice(-9), `${state} pin="${pin}"`]);
  }, [state, pin]);

  const dfast = (k: string) => {
    if (k === "grant") {
      // Auto-verify with the configured code.
      for (const d of DEBUG_PIN) press(d);
      press("ok");
    } else if (k === "advance") {
      // Step the ceremony forward regardless of the timer chain.
      completeVoice();
      completeActivation();
      toCinematic();
    } else {
      press(k);
    }
  };

  return (
    <div className="min-h-screen bg-[#050A0F] p-2 font-mono text-xs text-[#8B98A5]">
      <div className="mb-2 flex flex-wrap gap-2">
        <button className="border border-[#00D4FF] px-2 py-1" onClick={openModal}>open</button>
        <button className="border border-[#00D4FF] px-2 py-1" onClick={closeModal}>close</button>
        <button className="border border-[#00D4FF] px-2 py-1" onClick={() => dfast("grant")}>grant</button>
        <button className="border border-[#00E5A0] px-2 py-1" onClick={() => dfast("advance")}>advance</button>
      </div>
      <div>state={state} dialog={String(dialogOpen)} pin="{pin}"</div>
      <div className="mt-2 whitespace-pre-wrap">{[...log].reverse().join("\n")}</div>
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