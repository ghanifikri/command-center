"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import LogoMark from "@/components/ui/LogoMark";
import SoundToggle from "@/components/ui/SoundToggle";
import { event } from "@/data/event";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { id: "moment", label: "Momentum" },
  { id: "details", label: "Informasi" },
  { id: "story", label: "Visi" },
  { id: "journey", label: "Perjalanan" },
  { id: "inauguration", label: "Peresmian" },
  { id: "schedule", label: "Agenda" },
  { id: "location", label: "Lokasi" },
] as const;

function scrollTo(id: string) {
  const elem = document.getElementById(id);
  if (elem) {
    elem.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Responsive navigation bar with frosted glass effect on scroll,
 * mobile drawer menu, and quick jump navigation.
 */
export default function EventHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-[#1B2A36]/80 bg-[#050A0F]/85 backdrop-blur-md shadow-lg"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        {/* Brand Monogram */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Kembali ke atas"
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00D4FF]"
        >
          <LogoMark />
        </button>

        {/* Desktop Navigation */}
        <nav aria-label="Navigasi bagian acara" className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#8B98A5] transition-colors hover:text-[#00D4FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00D4FF]"
            >
              {link.label}
            </button>
          ))}
          <div className="h-4 w-px bg-[#1B2A36]" />
          <SoundToggle />
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <SoundToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="rounded-lg border border-[#1B2A36] bg-[#0B141C]/80 p-2 text-[#F5F7FA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00D4FF]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav
          aria-label="Navigasi mobile"
          className="flex flex-col gap-3 border-b border-[#1B2A36] bg-[#050A0F]/95 px-6 py-4 backdrop-blur-xl lg:hidden shadow-2xl"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => {
                close();
                scrollTo(link.id);
              }}
              className="py-2 text-left text-xs font-medium uppercase tracking-[0.22em] text-[#8B98A5] transition-colors hover:text-[#00D4FF]"
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}

      <span className="sr-only">{event.company}</span>
    </header>
  );
}