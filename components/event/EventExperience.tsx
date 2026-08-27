"use client";

import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import EventHero from "@/components/event/EventHero";
import { intro, details, story, inauguration, schedule, journey, locationData, closing, footer } from "@/data/event";
import { cn } from "@/lib/cn";

/** The introduction — one considered paragraph, generous whitespace. */
function Moment() {
  return (
    <section id="moment" className="px-6 py-28 sm:px-10">
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

/** Official event info — DATE / LOCATION / AGENDA. */
function Details() {
  return (
    <section id="details" className="border-y border-[#1B2A36]/60 bg-[#0B141C]/40 px-6 py-20 sm:px-10">
      <Reveal>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.3em] text-[#00D4FF]">Date</p>
            <p className="mt-3 font-display text-xl font-bold tracking-wide text-[#F5F7FA]">
              {details.date}
            </p>
          </div>
          <div>
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.3em] text-[#00D4FF]">Location</p>
            <p className="mt-3 font-display text-xl font-light leading-snug tracking-wide text-[#F5F7FA]">
              {details.locationLine1}
              <br />
              {details.locationLine2}
            </p>
          </div>
          <div>
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.3em] text-[#00D4FF]">Agenda</p>
            <p className="mt-3 font-display text-xl font-light tracking-wide text-[#F5F7FA]">
              {details.agenda}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** MORE THAN A BUILDING — the building story. */
function Story() {
  return (
    <section id="story" className="px-6 py-28 sm:px-10">
      <Reveal className="mx-auto max-w-4xl">
        <SectionLabel index="04" tone="muted" children={story.eyebrow} />
        <h2 className="mt-8 font-display text-3xl font-light leading-tight tracking-wide text-[#F5F7FA] sm:text-5xl">
          {story.title}
        </h2>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#8B98A5] sm:text-lg">
          {story.body}
        </p>
        <p className="mt-6 border-l-2 border-[#C9A96E]/60 pl-5 font-display text-lg font-light leading-relaxed text-[#C9A96E] sm:text-2xl">
          {story.emphasis}
        </p>
      </Reveal>
    </section>
  );
}

/** Horizontal-on-desktop, vertical-on-mobile journey timeline. */
function Journey() {
  return (
    <section id="journey" className="bg-[#0B141C]/40 px-6 py-28 sm:px-10">
      <Reveal className="mx-auto max-w-6xl">
        <SectionLabel index="05" children={journey.eyebrow} />
        <h2 className="mt-8 font-display text-3xl font-light tracking-wide text-[#F5F7FA] sm:text-5xl">
          {journey.title}
        </h2>

        {/* Mobile: vertical timeline */}
        <ol className="mt-14 space-y-10 lg:hidden">
          {journey.steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-5">
              <span className="flex flex-col items-center">
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full border text-[0.62rem] font-medium",
                    i === journey.steps.length - 1
                      ? "border-[#C9A96E] text-[#C9A96E]"
                      : "border-[#00D4FF]/50 text-[#00D4FF]",
                  )}
                >
                  {i + 1}
                </span>
                {i < journey.steps.length - 1 && (
                  <span aria-hidden="true" className="mt-2 w-px flex-1 bg-[#1B2A36]" />
                )}
              </span>
              <div className="pb-2">
                <p className="font-display text-lg font-light text-[#F5F7FA]">{s.title}</p>
                {s.date && (
                  <p className="mt-1 text-[0.62rem] uppercase tracking-[0.24em] text-[#C9A96E]">
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

        {/* Desktop: horizontal timeline */}
        <div className="relative mt-20 hidden lg:block">
          <div aria-hidden="true" className="absolute left-0 right-0 top-4 h-px bg-[#1B2A36]" />
          <ol className="grid grid-cols-7 gap-6">
            {journey.steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-4 h-px w-full",
                    i === journey.steps.length - 1 ? "bg-[#C9A96E]/60" : "bg-[#00D4FF]/40",
                  )}
                />
                <span
                  className={cn(
                    "relative z-10 block h-2 w-2 rounded-full -translate-y-[7px]",
                    i === journey.steps.length - 1
                      ? "bg-[#C9A96E]"
                      : "bg-[#00D4FF]",
                  )}
                />
                <p className="mt-5 font-display text-base font-light text-[#F5F7FA]">
                  {s.title}
                </p>
                {s.date && (
                  <p className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-[#C9A96E]">
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

/** Ceremonial inauguration block with leadership mention. */
function Inauguration() {
  return (
    <section id="inauguration" className="px-6 py-28 text-center sm:px-10">
      <Reveal className="mx-auto max-w-3xl">
        <SectionLabel index="06" tone="gold" className="justify-center" children={inauguration.eyebrow} />
        <h2 className="mt-8 font-display text-3xl font-light leading-tight tracking-wide text-[#F5F7FA] sm:text-5xl">
          {inauguration.title}
        </h2>
        <p className="mt-8 text-base leading-relaxed text-[#8B98A5] sm:text-lg">
          {inauguration.body}
        </p>
        {/* Leadership — role only (name is not supplied; never invent). */}
        <div className="mt-14 inline-block border border-[#C9A96E]/40 bg-[#0B141C]/60 px-10 py-6">
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-[#C9A96E]">
            {inauguration.leadershipRole}
          </p>
          <p className="mt-2 font-display text-lg font-light tracking-[0.12em] text-[#F5F7FA]">
            {inauguration.leadershipCompany}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/** Single known agenda item; time hidden until provided. */
function Schedule() {
  // Widened so the empty guard stays meaningful if the schedule array is later emptied.
  const items: readonly {
    title: string;
    date: string;
    time: string;
    place: string;
  }[] = schedule.items;
  if (items.length === 0) return null;
  return (
    <section id="schedule" className="border-y border-[#1B2A36]/60 bg-[#0B141C]/40 px-6 py-28 sm:px-10">
      <Reveal className="mx-auto max-w-4xl">
        <SectionLabel index="07" children={schedule.eyebrow} />
        <h2 className="mt-8 font-display text-3xl font-light tracking-wide text-[#F5F7FA] sm:text-5xl">
          {schedule.title}
        </h2>
        <ul className="mt-12 divide-y divide-[#1B2A36]/60">
          {items.map((it) => (
            <li key={it.title} className="flex flex-col gap-3 py-6 sm:flex-row sm:items-baseline sm:gap-8">
              <div className="w-40 shrink-0">
                {it.time ? (
                  <p className="font-display text-lg text-[#00D4FF]">{it.time}</p>
                ) : (
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-[#8B98A5]/70">
                    Waktu menyusul
                  </p>
                )}
              </div>
              <div>
                <p className="font-display text-xl font-light text-[#F5F7FA]">{it.title}</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.22em] text-[#8B98A5]">
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

/** Location card; map integration becomes available when mapUrl is configured. */
function Location() {
  return (
    <section id="location" className="px-6 py-28 sm:px-10">
      <Reveal className="mx-auto max-w-4xl">
        <SectionLabel index="09" children={locationData.eyebrow} />
        <h2 className="mt-8 font-display text-3xl font-light tracking-wide text-[#F5F7FA] sm:text-5xl">
          {locationData.title}
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="border border-[#1B2A36] bg-[#0B141C]/50 p-8">
            <p className="font-display text-2xl font-light tracking-wide text-[#F5F7FA]">
              {locationData.building}
            </p>
            <p className="mt-3 text-[0.7rem] uppercase tracking-[0.26em] text-[#8B98A5]">
              {locationData.address}
            </p>
            <p className="mt-1 text-[0.7rem] uppercase tracking-[0.26em] text-[#8B98A5]">
              {locationData.country}
            </p>
            {locationData.mapUrl && (
              <a
                href={locationData.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block border border-[#00D4FF]/50 px-5 py-2.5 text-[0.62rem] font-medium uppercase tracking-[0.24em] text-[#00D4FF] transition-colors hover:bg-[#00D4FF]/10"
              >
                Buka Peta
              </a>
            )}
          </div>
          <p className="max-w-[16rem] text-sm leading-relaxed text-[#8B98A5]">
            Lokasi dapat dikonfigurasi pada content layer saat data peta terverifikasi.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/** Cinematic closing. */
function Closing() {
  return (
    <section
      id="closing"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.08),transparent_65%)]"
      />
      <Reveal>
        <p className="font-display text-[clamp(2.4rem,8vw,5.4rem)] font-light uppercase leading-[1.02] tracking-[0.08em] text-[#F5F7FA]">
          {closing.line1}
        </p>
        <p className="mt-2 font-display text-[clamp(2.4rem,8vw,5.4rem)] font-medium uppercase leading-[1.02] tracking-[0.08em] text-[#00D4FF]">
          {closing.line2}
        </p>
        <div className="mx-auto mt-16 flex max-w-xl flex-col gap-3">
          {closing.after.map((line) => (
            <p
              key={line}
              className="text-[0.72rem] font-light uppercase tracking-[0.34em] text-[#8B98A5]"
            >
              {line}
            </p>
          ))}
        </div>
        <p className="mt-10 font-display text-sm tracking-[0.1em] text-[#C9A96E]">
          {closing.final}
        </p>
      </Reveal>
    </section>
  );
}

/** Minimal footer. */
function SiteFooter() {
  return (
    <footer className="border-t border-[#1B2A36]/60 px-6 py-10 text-center">
      <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#8B98A5]/70">
        {footer.copyright}
      </p>
      <p className="mt-2 text-[0.62rem] uppercase tracking-[0.28em] text-[#8B98A5]/50">
        {footer.title} · {footer.subtitle}
      </p>
    </footer>
  );
}

/** The complete event page, laid out in story order. */
export default function EventExperience() {
  return (
    <main>
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
  );
}