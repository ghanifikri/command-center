import { branding } from "@/data/event";

type Props = { className?: string };

/** Company monogram — two stacked squares with the KT initials. */
export default function LogoMark({ className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-3 ${className}`}
      aria-label={branding.brandNameLines.join(" ")}
    >
      <span
        aria-hidden="true"
        className="grid h-9 w-9 shrink-0 place-items-center border border-[#00D4FF]/40 bg-[#050A0F]/30 backdrop-blur-sm"
      >
        <span className="font-display text-sm font-medium tracking-[0.08em] text-[#00D4FF]">
          {branding.monogram}
        </span>
      </span>
      <span aria-hidden="true" className="flex flex-col leading-none">
        {branding.brandNameLines.map((line) => (
          <span
            key={line}
            className="text-[0.55rem] font-medium uppercase tracking-[0.28em] text-[#F5F7FA]"
          >
            {line}
          </span>
        ))}
      </span>
    </span>
  );
}