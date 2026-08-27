"use client";

import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import EventHero from "@/components/event/EventHero";
import EventHeader from "@/components/event/EventHeader";
import VideoHero from "@/components/hero/VideoHero";
import {
  intro,
  details,
  story,
  inauguration,
  schedule,
  journey,
  locationData,
  closing,
  footer,
} from "@/data/event";
import { cn } from "@/lib/cn";
import { Calendar, MapPin, Clock, Award, Compass, ExternalLink } from "lucide-react";

/** The introduction — monumental opening statement. */
function Moment() {
  return (
    <section id="moment" className="relative px-6 py-28 sm:px-10">
      <Reveal className="mx-auto max-w-4xl">
        <SectionLabel index="01" children="THE MOMENT" />
        <h2 className="mt-8 font-display text-3xl font-light leading-tight tracking-wide text-[#F5F7FA] sm:text-5xl">
          {intro.title}
        </h2>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#8B98A5] sm:text-lg">
          {intro.long}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#8B98A5]/80">
          {intro.short}
        </p>
      </Reveal>
    </section>
  );
}

/** Official event info cards — DATE / LOCATION / AGENDA. */
function Details() {
  return (
    <section id="details" className="relative border-y border-[#1B2A36]/60 bg-[#0B141C]/50 px-6 py-20 backdrop-blur-sm sm:px-10">
      <Reveal>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Date Card */}
          <div className="rounded-xl border border-[#1B2A36] bg-[#050A0F]/60 p-6">
            <div className="flex items-center gap-2 text-[#00D4FF]">
              <Calendar className="h-4 w-4" />
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.3em]">Date</p>
            </div>
            <p className="mt-4 font-display text-xl font-light tracking-wide text-[#F5F7FA]">
              {details.date}
            </p>
          </div>

          {/* Location Card */}
          <div className="rounded-xl border border-[#1B2A36] bg-[#050A0F]/60 p-6">
            <div className="flex items-center gap-2 text-[#00D4FF]">
              <MapPin className="h-4 w-4" />
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.3em]">Location</p>
            </div>
            <p className="mt-4 font-display text-xl font-light leading-snug tracking-wide text-[#F5F7FA]">
              {details.locationLine1}
              <br />
              <span className="text-sm text-[#8B98A5]">{details.locationLine2}</span>
            </p>
          </div>

          {/* Agenda Card */}
          <div className="rounded-xl border border-[#1B2A36] bg-[#050A0F]/60 p-6">
            <div className="flex items-center gap-2 text-[#00D4FF]">
              <Clock className="h-4 w-4" />
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.3em]">Agenda</p>
            </div>
            <p className="mt-4 font-display text-xl font-light tracking-wide text-[#F5F7FA]">
              {details.agenda}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** MORE THAN A BUILDING — Strategic Vision */
function Story() {
  return (
    <section id="story" className="relative px-6 py-28 sm:px-10">
      <Reveal className="mx-auto max-w-4xl">
        <SectionLabel index="02" tone="muted" children={story.eyebrow} />
        <h2 className="mt-8 font-display text-3xl font-light leading-tight tracking-wide text-[#F5F7FA] sm:text-5xl">
          {story.title}
        </h2>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#8B98A5] sm:text-lg">
          {story.body}
        </p>
        <div className="mt-8 rounded-xl border border-[#C9A96E]/30 bg-[#C9A96E]/5 p-6 backdrop-blur-sm">
          <p className="font-display text-lg font-light leading-relaxed text-[#C9A96E] sm:text-xl">
            {story.emphasis}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/** Project Journey Timeline */
function Journey() {
  return (
    <section id="journey" className="relative border-y border-[#1B2A36]/60 bg-[#0B141C]/40 px-6 py-28 backdrop-blur-sm sm:px-10">
      <Reveal className="mx-auto max-w-6xl">
        <SectionLabel index="03" children={journey.eyebrow} />
        <h2 className="mt-8 font-display text-3xl font-light tracking-wide text-[#F5F7FA] sm:text-5xl">
          {journey.title}
        </h2>

        {/* Mobile: Vertical timeline */}
        <ol className="mt-14 space-y-8 lg:hidden">
          {journey.steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-5">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-mono font-medium",
                    i === journey.steps.length - 1
                      ? "border-[#C9A96E] bg-[#C9A96E]/20 text-[#C9A96E]"
                      : "border-[#00D4FF]/50 bg-[#00D4FF]/10 text-[#00D4FF]",
                  )}
                >
                  {i + 1}
                </span>
                {i < journey.steps.length - 1 && (
                  <span aria-hidden="true" className="mt-2 w-px flex-1 bg-[#1B2A36]" />
                )}
              </div>
              <div className="pb-2">
                <p className="font-display text-lg font-light text-[#F5F7FA]">{s.title}</p>
                {s.date && (
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.24em] text-[#C9A96E]">
                    {s.date}
                  </p>
                )}
                {s.desc && (
                  <p className="mt-1 text-sm leading-relaxed text-[#8B98A5]">{s.desc}</p>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* Desktop: Horizontal timeline */}
        <div className="relative mt-20 hidden lg:block">
          <div aria-hidden="true" className="absolute left-0 right-0 top-4 h-px bg-[#1B2A36]" />
          <ol className="grid grid-cols-7 gap-6">
            {journey.steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-4 h-px w-full",
                    i === journey.steps.length - 1 ? "bg-[#C9A96E]" : "bg-[#00D4FF]/40",
                  )}
                />
                <span
                  className={cn(
                    "relative z-10 block h-3 w-3 rounded-full -translate-y-[5px]",
                    i === journey.steps.length - 1
                      ? "bg-[#C9A96E] shadow-[0_0_12px_#C9A96E]"
                      : "bg-[#00D4FF] shadow-[0_0_12px_#00D4FF]",
                  )}
                />
                <p className="mt-6 font-display text-base font-medium text-[#F5F7FA]">
                  {s.title}
                </p>
                {s.date && (
                  <p className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-[#C9A96E]">
                    {s.date}
                  </p>
                )}
                <p className="mt-2 text-xs leading-relaxed text-[#8B98A5]">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}

/** Ceremonial inauguration block with leadership note. */
function Inauguration() {
  return (
    <section id="inauguration" className="relative px-6 py-28 text-center sm:px-10">
      <Reveal className="mx-auto max-w-3xl">
        <SectionLabel
          index="04"
          tone="gold"
          className="justify-center"
          children={inauguration.eyebrow}
        />
        <h2 className="mt-8 font-display text-3xl font-light leading-tight tracking-wide text-[#F5F7FA] sm:text-5xl">
          {inauguration.title}
        </h2>
        <p className="mt-8 text-base leading-relaxed text-[#8B98A5] sm:text-lg">
          {inauguration.body}
        </p>

        {/* Leadership card */}
        <div className="mt-12 inline-flex items-center gap-4 rounded-xl border border-[#C9A96E]/40 bg-[#0B141C]/80 px-8 py-6 backdrop-blur-md shadow-lg">
          <Award className="h-8 w-8 text-[#C9A96E] shrink-0" />
          <div className="text-left">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[#C9A96E]">
              {inauguration.leadershipRole}
            </p>
            <p className="mt-1 font-display text-lg font-light tracking-[0.1em] text-[#F5F7FA]">
              {inauguration.leadershipCompany}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Event schedule section */
function Schedule() {
  const items: readonly {
    title: string;
    date: string;
    time: string;
    place: string;
  }[] = schedule.items;
  if (items.length === 0) return null;

  return (
    <section id="schedule" className="relative border-y border-[#1B2A36]/60 bg-[#0B141C]/40 px-6 py-28 backdrop-blur-sm sm:px-10">
      <Reveal className="mx-auto max-w-4xl">
        <SectionLabel index="05" children={schedule.eyebrow} />
        <h2 className="mt-8 font-display text-3xl font-light tracking-wide text-[#F5F7FA] sm:text-5xl">
          {schedule.title}
        </h2>
        <ul className="mt-12 divide-y divide-[#1B2A36]/60">
          {items.map((it) => (
            <li
              key={it.title}
              className="flex flex-col gap-3 py-6 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <div className="w-40 shrink-0">
                {it.time ? (
                  <p className="font-display text-lg text-[#00D4FF]">{it.time}</p>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1B2A36] px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-[#8B98A5]">
                    <Clock className="h-3 w-3" />
                    Waktu Menyusul
                  </span>
                )}
              </div>
              <div>
                <p className="font-display text-xl font-light text-[#F5F7FA]">{it.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#8B98A5]">
                  {it.date} · {it.place}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/** Location Card & Map Info */
function Location() {
  return (
    <section id="location" className="relative px-6 py-28 sm:px-10">
      <Reveal className="mx-auto max-w-4xl">
        <SectionLabel index="06" children={locationData.eyebrow} />
        <h2 className="mt-8 font-display text-3xl font-light tracking-wide text-[#F5F7FA] sm:text-5xl">
          {locationData.title}
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="rounded-xl border border-[#1B2A36] bg-[#0B141C]/70 p-8 backdrop-blur-md">
            <div className="flex items-center gap-2 text-[#00D4FF]">
              <Compass className="h-5 w-5" />
              <span className="text-xs font-mono uppercase tracking-[0.2em]">Venue</span>
            </div>
            <p className="mt-4 font-display text-2xl font-light tracking-wide text-[#F5F7FA]">
              {locationData.building}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[#8B98A5]">
              {locationData.address} · {locationData.country}
            </p>
            {locationData.mapUrl ? (
              <a
                href={locationData.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#00D4FF]/50 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-[#00D4FF] transition hover:bg-[#00D4FF]/10"
              >
                <span>Buka Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
          <p className="max-w-[16rem] text-xs leading-relaxed text-[#8B98A5]">
            Akses gedung dan parkir VIP akan dikoordinasikan langsung oleh tim protokoler.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/** Grand finale closing */
function Closing() {
  return (
    <section
      id="closing"
      className="relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.1),transparent_70%)]"
      />
      <Reveal>
        <p className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-light uppercase leading-none tracking-[0.08em] text-[#F5F7FA]">
          {closing.line1}
        </p>
        <p className="mt-3 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-medium uppercase leading-none tracking-[0.08em] text-[#00D4FF]">
          {closing.line2}
        </p>
        <div className="mx-auto mt-12 flex max-w-xl flex-col gap-2">
          {closing.after.map((line) => (
            <p
              key={line}
              className="text-xs font-light uppercase tracking-[0.32em] text-[#8B98A5]"
            >
              {line}
            </p>
          ))}
        </div>
        <p className="mt-8 font-display text-sm tracking-[0.14em] text-[#C9A96E]">
          {closing.final}
        </p>
      </Reveal>
    </section>
  );
}

/** Site footer */
function SiteFooter() {
  return (
    <footer className="border-t border-[#1B2A36]/60 bg-[#050A0F] px-6 py-10 text-center">
      <p className="text-xs uppercase tracking-[0.24em] text-[#8B98A5]/70">
        {footer.copyright}
      </p>
      <p className="mt-2 text-[0.65rem] uppercase tracking-[0.24em] text-[#8B98A5]/50">
        {footer.title} · {footer.subtitle}
      </p>
    </footer>
  );
}

/** Main Event Experience Page with sticky navigation and ambient hero backdrop */
export default function EventExperience() {
  return (
    <div className="relative min-h-screen">
      {/* Sticky Top Navigation */}
      <EventHeader />

      {/* Ambient background continuation */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <VideoHero />
      </div>

      {/* Page Sections */}
      <main className="relative z-10">
        <EventHero />
        <Moment />
        <Details />
        <Story />
        <Journey />
        <Inauguration />
        <Schedule />
        <Location />
        <Closing />
        <SiteFooter />
      </main>
    </div>
  );
}