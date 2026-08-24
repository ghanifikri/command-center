import { cn } from "@/lib/cn";

type Props = {
  index?: string;
  children: string;
  tone?: "cyan" | "gold" | "muted";
  className?: string;
};

/** Small letter-spaced eyebrow label used across event sections. */
export default function SectionLabel({
  index,
  children,
  tone = "cyan",
  className = "",
}: Props) {
  const color: Record<typeof tone, string> = {
    cyan: "text-[#00D4FF]",
    gold: "text-[#C9A96E]",
    muted: "text-[#8B98A5]",
  };
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.34em]",
        color[tone],
        className,
      )}
    >
      {index && <span className="text-[#8B98A5]/70">{index}</span>}
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
      {children}
    </p>
  );
}