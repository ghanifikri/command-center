import { useId } from "react";

/**
 * Cinematic fallback scene for the hero, used when no profile video exists yet.
 * A cool-toned grid receding into darkness — evokes a command center without
 * impersonating a dashboard. Kept subtle: no scanlines, no glitch.
 */
export default function SceneBackdrop() {
  const grad = useId();

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B141C" />
          <stop offset="60%" stopColor="#050A0F" />
          <stop offset="100%" stopColor="#03070B" />
        </linearGradient>
        <radialGradient id={`${grad}-glow`} cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Depth gradient */}
      <rect width="1600" height="900" fill={`url(#${grad})`} />

      {/* Receding grid floor, horizon ~ 52% */}
      <g stroke="#00D4FF" strokeOpacity="0.14" fill="none" strokeWidth="1">
        {Array.from({ length: 16 }, (_, i) => {
          // vertical perspective fan
          const x = ((i - 7.5) / 7.5) * 900 + 800;
          return <line key={`v${i}`} x1={x} y1={470} x2={800} y2={900} />;
        })}
        {[470, 505, 550, 605, 672, 755, 860].map((y, i) => (
          <line
            key={`h${y}`}
            x1={(-(y - 470) * 0.55) + 800}
            y1={y}
            x2={((y - 470) * 0.55) + 800}
            y2={y}
          />
        ))}
      </g>

      {/* Horizon glow */}
      <rect width="1600" height="900" fill={`url(#${grad}-glow)`} />

      {/* Free-standing command center block with window bands */}
      <g opacity="0.9">
        <rect x="630" y="250" width="340" height="230" fill="#0B141C" stroke="#00D4FF" strokeOpacity="0.35" />
        {Array.from({ length: 6 }, (_, i) => (
          <rect
            key={`w${i}`}
            x={640 + i * 55}
            y={265}
            width="40"
            height="200"
            fill="#00D4FF"
            fillOpacity={i === 2 ? 0.5 : 0.16}
          />
        ))}
        <rect x="630" y="480" width="340" height="8" fill="#00D4FF" fillOpacity="0.5" />
      </g>
    </svg>
  );
}