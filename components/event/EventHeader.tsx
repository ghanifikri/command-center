"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import LogoMark from "@/components/ui/LogoMark";
import SoundToggle from "@/components/ui/SoundToggle";
import { event } from "@/data/event";
import { cn } from "@/lib/cn";

const LINKS = [
  { id: "moment", label: "Moment" },
  { id: "story", label: "Journey" },
  { id: "schedule", label: "Schedule" },
  { id: "location", label: "Location" },
  { id: "closing", label: "Closing" },
] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Transparent event header that gains a subtle glass surface on scroll.
 * Mobile collapses into a compact menu.
 */
export default function EventHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-30 transition-all duration-300",
        scrolled
          ? "border-b border-[#1B2A36] bg-[#050A0F]/85 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => scrollTo("top")}
          aria-label="Back to top"
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00D4FF]"
        >
          <LogoMark />
        </button>

        <nav aria-label="Event sections" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => scrollTo(l.id)}
              className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-[#8B98A5] transition-colors hover:text-[#F5F7FA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00D4FF]"
            >
              {l.label}
            </button>
          ))}
          <SoundToggle />
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <SoundToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded p-1.5 text-[#F5F7FA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00D4FF]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Event sections (mobile)"
          className="flex flex-col gap-4 border-b border-[#1B2A36] bg-[#050A0F]/95 px-5 pb-5 pt-2 lg:hidden"
        >
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => {
                close();
                scrollTo(l.id);
              }}
              className="text-left text-xs font-medium uppercase tracking-[0.24em] text-[#F5F7FA]"
            >
              {l.label}
            </button>
          ))}
        </nav>
      )}

      <span className="sr-only">{event.company}</span>
    </header>
  );
}