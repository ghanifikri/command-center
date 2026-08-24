"use client";

import { SoundProvider } from "@/lib/sound";
import { AccessProvider } from "@/lib/access-machine";

/** Client-side provider stack, kept out of layout.tsx. */
export default function ProviderTree({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider>
      <AccessProvider>{children}</AccessProvider>
    </SoundProvider>
  );
}