"use client";

import { SoundProvider } from "@/lib/sound";
import { AccessProvider } from "@/lib/access-machine";
import KioskGuard from "@/components/ui/KioskGuard";

/** Client-side provider stack, kept out of layout.tsx. */
export default function ProviderTree({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider>
      <AccessProvider>
        <KioskGuard />
        {children}
      </AccessProvider>
    </SoundProvider>
  );
}