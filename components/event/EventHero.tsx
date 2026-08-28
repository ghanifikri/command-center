"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Award, Terminal, Radio } from "lucide-react";
import { eventHero } from "@/data/event";
import { easeOut, EASE } from "@/lib/motion";

const GLYPHS = "010101KTI#$<>[]{}/*+=!~_?%&01924ABCDEF";

/**
 * High-Impact Cyberpunk RGB Split Glitch & Hacker Decryption Title System
 */
function CyberRGBGlitchTitle({ title }: { title: string }) {
  const words = title.split(" ");
  const [scrambleMap, setScrambleMap] = useState<Record<string, string>>({});
  const [decryptedMap, setDecryptedMap] = useState<Record<string, boolean>>({});
  const [glitchActive, setGlitchActive] = useState(false);
  const [glitchSliceTop, setGlitchSliceTop] = useState("25%");
  const [glitchSliceHeight, setGlitchSliceHeight] = useState("30%");

  // 1. Initial Hacker Decryption Scramble Cascade
  useEffect(() => {
    let globalIndex = 0;
    words.forEach((word) => {
      word.split("").forEach((char) => {
        const key = `${globalIndex}`;
        const charIndex = globalIndex;
        globalIndex++;

        let frame = 0;
        const totalFrames = 8;
        const startDelay = 120 + charIndex * 35;

        setTimeout(() => {
          const interval = setInterval(() => {
            if (frame < totalFrames) {
              setScrambleMap((prev) => ({
                ...prev,
                [key]: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
              }));
              frame++;
            } else {
              setScrambleMap((prev) => ({ ...prev, [key]: char }));
              setDecryptedMap((prev) => ({ ...prev, [key]: true }));
              clearInterval(interval);
            }
          }, 30);
        }, startDelay);
      });
    });
  }, [title]);

  // 2. High-Frequency Cyber RGB Glitch Spasm Engine
  useEffect(() => {
    const triggerGlitch = () => {
      const top = Math.floor(Math.random() * 60) + 10;
      const height = Math.floor(Math.random() * 35) + 15;
      setGlitchSliceTop(`${top}%`);
      setGlitchSliceHeight(`${height}%`);
      setGlitchActive(true);

      // Random temporary letter scramble on 1-2 random characters during glitch
      const totalChars = title.replace(/\s+/g, "").length;
      const randomChar1 = `${Math.floor(Math.random() * totalChars)}`;
      const randomChar2 = `${Math.floor(Math.random() * totalChars)}`;
      setScrambleMap((prev) => ({
        ...prev,
        [randomChar1]: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        [randomChar2]: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      }));

      // End glitch after 130ms
      setTimeout(() => {
        setGlitchActive(false);
        // Restore characters
        let idx = 0;
        const restored: Record<string, string> = {};
        words.forEach((w) => {
          w.split("").forEach((c) => {
            restored[`${idx}`] = c;
            idx++;
          });
        });
        setScrambleMap(restored);
      }, 130);
    };

    // Frequent rhythmic glitch bursts every 1.7s
    const interval = setInterval(() => {
      triggerGlitch();
    }, 1700);

    return () => clearInterval(interval);
  }, [title]);

  const renderWord = (word: string, wIdx: number, baseIdx: number) => {
    return (
      <div key={`${word}-${wIdx}`} className="flex items-center justify-center overflow-visible">
        {word.split("").map((realChar, cIdx) => {
          const charKey = `${baseIdx + cIdx}`;
          const isDec = decryptedMap[charKey] ?? false;
          const displayChar =
            scrambleMap[charKey] ??
            (isDec ? realChar : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);

          return (
            <span
              key={`${charKey}-${realChar}`}
              className="inline-block font-display text-[clamp(3.2rem,10.5vw,7.6rem)] font-black uppercase leading-[0.92] tracking-[0.06em]"
            >
              {displayChar}
            </span>
          );
        })}
      </div>
    );
  };

  let gIdx = 0;

  return (
    <div className="relative flex flex-col items-center justify-center select-none overflow-visible my-3">
      {/* Anamorphic Laser Flare Beam Sweeping Across Title */}
      <motion.div
        aria-hidden="true"
        initial={{ left: "-40%", opacity: 0 }}
        animate={{ left: "140%", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.8, delay: 0.25, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-[3px] w-80 bg-gradient-to-r from-transparent via-[#00D4FF] via-white to-transparent blur-[1px] shadow-[0_0_25px_#00D4FF] z-30"
      />

      {/* =======================================================================
          RGB LAYER 1: RED/MAGENTA ABERRATION CHANNEL (Offset Left)
         ======================================================================= */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-[#FF0055] transition-transform duration-75 z-10 ${
          glitchActive ? "opacity-90 -translate-x-[6px] translate-y-[2px]" : "opacity-0"
        }`}
        style={{
          clipPath: glitchActive
            ? `polygon(0 ${glitchSliceTop}, 100% ${glitchSliceTop}, 100% calc(${glitchSliceTop} + ${glitchSliceHeight}), 0 calc(${glitchSliceTop} + ${glitchSliceHeight}))`
            : undefined,
          filter: "drop-shadow(0 0 15px rgba(255,0,85,0.9))",
        }}
      >
        {words.map((w, i) => {
          const bIdx = gIdx;
          gIdx += w.length;
          return renderWord(w, i, bIdx);
        })}
      </div>

      {/* =======================================================================
          RGB LAYER 2: CYAN ABERRATION CHANNEL (Offset Right)
         ======================================================================= */}
      {(() => {
        let gIdx2 = 0;
        return (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-[#00D4FF] transition-transform duration-75 z-10 ${
              glitchActive ? "opacity-90 translate-x-[6px] -translate-y-[1px]" : "opacity-0"
            }`}
            style={{
              clipPath: glitchActive
                ? `polygon(0 calc(${glitchSliceTop} + 15%), 100% calc(${glitchSliceTop} + 15%), 100% calc(${glitchSliceTop} + ${glitchSliceHeight} + 20%), 0 calc(${glitchSliceTop} + ${glitchSliceHeight} + 20%))`
                : undefined,
              filter: "drop-shadow(0 0 15px rgba(0,212,255,0.9))",
            }}
          >
            {words.map((w, i) => {
              const bIdx = gIdx2;
              gIdx2 += w.length;
              return renderWord(w, i, bIdx);
            })}
          </div>
        );
      })()}

      {/* =======================================================================
          RGB LAYER 3: GREEN / EMERALD SCAN GLITCH CHANNEL (Jitter)
         ======================================================================= */}
      {(() => {
        let gIdx3 = 0;
        return (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-[#00E5A0] transition-transform duration-75 z-10 ${
              glitchActive ? "opacity-80 translate-x-[2px] translate-y-[3px]" : "opacity-0"
            }`}
            style={{
              clipPath: glitchActive
                ? `polygon(0 0, 100% 0, 100% ${glitchSliceTop}, 0 ${glitchSliceTop})`
                : undefined,
              filter: "drop-shadow(0 0 12px rgba(0,229,160,0.8))",
            }}
          >
            {words.map((w, i) => {
              const bIdx = gIdx3;
              gIdx3 += w.length;
              return renderWord(w, i, bIdx);
            })}
          </div>
        );
      })()}

      {/* =======================================================================
          PRIMARY MAIN LAYER: Crisp Metallic Silver / Cyan Core Text
         ======================================================================= */}
      {(() => {
        let gIdx4 = 0;
        return (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{
              opacity: 1,
              y: 0,
              x: glitchActive ? [-2, 3, -1, 0] : 0,
            }}
            transition={{ duration: 0.6, ease: easeOut }}
            className={`relative z-20 flex flex-col items-center justify-center text-transparent bg-clip-text ${
              glitchActive
                ? "bg-gradient-to-b from-[#FFFFFF] via-[#00D4FF] to-[#FFFFFF] drop-shadow-[0_0_40px_rgba(0,212,255,0.8)]"
                : "bg-gradient-to-b from-[#FFFFFF] via-[#E8F4FA] to-[#8FA7B8] drop-shadow-[0_0_35px_rgba(0,212,255,0.35)]"
            }`}
          >
            {words.map((w, i) => {
              const bIdx = gIdx4;
              gIdx4 += w.length;
              return renderWord(w, i, bIdx);
            })}
          </motion.div>
        );
      })()}
    </div>
  );
}

/**
 * Trapcode-style 3D Undulating Particle Grid Field (Background Ambience)
 */
function TrapcodeField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const cols = 36;
    const rows = 18;
    let time = 0;

    // Ambient floating cyber spark particles
    const sparks = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -0.4 - Math.random() * 0.8,
      size: Math.random() * 2 + 1,
      color: Math.random() < 0.35 ? "#FFD700" : Math.random() < 0.6 ? "#00E5A0" : "#00D4FF",
      alpha: Math.random() * 0.7 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      const fov = 380;
      const cameraY = -90;
      const cameraZ = -140;
      const spacingX = width / (cols * 0.75);
      const spacingZ = 32;

      // Draw Floating Trapcode Sparks
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        if (s.y < 0) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha * (0.6 + Math.sin(time * 3 + i) * 0.4);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Draw 3D Wave Particle Grid
      const points: { px: number; py: number; alpha: number; isNode: boolean }[][] = [];

      for (let r = 0; r < rows; r++) {
        const rowArr = [];
        for (let c = 0; c < cols; c++) {
          const worldX = (c - cols / 2) * spacingX;
          const worldZ = (r + 4) * spacingZ;

          const wave1 = Math.sin(c * 0.22 + time * 1.1) * 30;
          const wave2 = Math.cos(r * 0.3 + time * 0.8) * 20;
          const wave3 = Math.sin((c + r) * 0.16 + time * 1.4) * 12;
          const worldY = 175 + wave1 + wave2 + wave3;

          const relZ = worldZ - cameraZ;
          const scale = fov / (fov + relZ);
          const px = width / 2 + worldX * scale;
          const py = height / 2 + (worldY - cameraY) * scale;
          const alpha = Math.max(0.04, Math.min(0.65, 1 - relZ / 800));
          const isNode = (c + r) % 6 === 0;

          rowArr.push({ px, py, alpha, isNode });
        }
        points.push(rowArr);
      }

      // Connecting lines
      ctx.lineWidth = 0.65;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];

          if (c < cols - 1) {
            const pNext = points[r][c + 1];
            ctx.strokeStyle = `rgba(0, 212, 255, ${p.alpha * 0.2})`;
            ctx.beginPath();
            ctx.moveTo(p.px, p.py);
            ctx.lineTo(pNext.px, pNext.py);
            ctx.stroke();
          }

          if (r < rows - 1) {
            const pBelow = points[r + 1][c];
            ctx.strokeStyle = `rgba(0, 229, 160, ${p.alpha * 0.15})`;
            ctx.beginPath();
            ctx.moveTo(p.px, p.py);
            ctx.lineTo(pBelow.px, pBelow.py);
            ctx.stroke();
          }

          const pulse = Math.sin(time * 2.5 + c * 0.4 + r * 0.3);
          const size = p.isNode ? 2.2 + pulse * 0.8 : 1.1;

          ctx.fillStyle = p.isNode
            ? `rgba(0, 229, 160, ${p.alpha * 0.85})`
            : (c + r) % 3 === 0
            ? `rgba(201, 169, 110, ${p.alpha * 0.7})`
            : `rgba(0, 212, 255, ${p.alpha * 0.6})`;

          ctx.beginPath();
          ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-65" />;
}

/**
 * Executive Grand Inauguration Hero — Crisp, prestigious, and powerful for Director-level ceremony.
 */
export default function EventHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[95svh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
    >
      {/* Background Trapcode 3D Wave Particle & Spark Field */}
      <TrapcodeField />

      {/* Cyber Horizontal Scan Beam */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00D4FF]/40 to-transparent blur-[1px] shadow-[0_0_25px_#00D4FF]"
        initial={{ top: "-5%" }}
        animate={{ top: "105%" }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      />

      {/* Ambient Radial Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 h-[650px] w-[650px] rounded-full bg-gradient-to-br from-[#C9A96E]/20 via-[#00D4FF]/20 to-transparent blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 h-[450px] w-[450px] rounded-full bg-[#00E5A0]/12 blur-[140px]"
      />

      {/* HUD Telemetry - Left */}
      <div className="pointer-events-none absolute left-6 top-8 hidden font-mono text-[0.55rem] text-[#00D4FF]/70 sm:block text-left">
        <div className="flex items-center gap-1.5 text-[#00E5A0]">
          <Terminal className="h-3 w-3 animate-pulse" />
          <span className="font-bold">GRID_SEC // LEVEL_1</span>
        </div>
        <div className="mt-0.5 text-[#8B98A5]">CORE_LATENCY: 0.12ms</div>
        <div className="text-[#8B98A5]">LAT: -6.0128° | LON: 106.0538°</div>
      </div>

      {/* HUD Telemetry - Right */}
      <div className="pointer-events-none absolute right-6 top-8 hidden font-mono text-[0.55rem] text-[#00D4FF]/70 sm:block text-right">
        <div className="flex items-center justify-end gap-1.5 text-[#C9A96E]">
          <Radio className="h-3 w-3 animate-pulse" />
          <span className="font-bold">TELEMETRY: LIVE_SYNC</span>
        </div>
        <div className="mt-0.5 text-[#8B98A5]">PROTOCOL: KTI_ALPHA_01</div>
        <div className="text-[#00E5A0]">STATUS: OPERATIONAL</div>
      </div>

      {/* Top Prestigious Ribbon */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.15 }}
        className="relative z-10 mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#C9A96E]/60 bg-gradient-to-r from-[#C9A96E]/20 via-[#FFD700]/15 to-[#C9A96E]/20 px-6 py-2 shadow-[0_0_35px_rgba(201,169,110,0.35)] backdrop-blur-xl"
      >
        <Sparkles className="h-4 w-4 text-[#FFD700] animate-pulse" />
        <span className="font-mono text-xs font-extrabold uppercase tracking-[0.38em] text-[#FFD79A]">
          {eventHero.label}
        </span>
        <Sparkles className="h-4 w-4 text-[#FFD700] animate-pulse" />
      </motion.div>

      {/* Main Title: Full Multi-Layer Cyberpunk RGB Glitch & Hacker Decryption */}
      <CyberRGBGlitchTitle title={eventHero.title} />

      {/* Prestigious Company Ribbon */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: easeOut }}
        className="relative z-10 mt-8 flex items-center justify-center gap-4"
      >
        <span className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#C9A96E]" />
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-[#C9A96E]" />
          <p className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.32em] text-[#F5F7FA]">
            {eventHero.company}
          </p>
        </div>
        <span className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#C9A96E]" />
      </motion.div>

      {/* Date Pill: 29 AGUSTUS 2026 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: easeOut }}
        className="relative z-10 mt-6"
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#C9A96E]/70 bg-[#0B141C]/90 px-7 py-2.5 shadow-[0_0_35px_rgba(201,169,110,0.35)] backdrop-blur-2xl transition-all hover:border-[#FFD700] hover:shadow-[0_0_45px_rgba(255,215,0,0.5)]">
          <Calendar className="h-4 w-4 text-[#FFD700]" />
          <span className="font-display text-sm sm:text-base font-extrabold uppercase tracking-[0.28em] text-[#FFD79A] drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]">
            {eventHero.date}
          </span>
        </div>
      </motion.div>

      {/* Tagline Statement */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 mt-8 max-w-xl font-display text-sm sm:text-lg italic tracking-[0.06em] text-[#C9D7E4] leading-relaxed"
      >
        “{eventHero.tagline}”
      </motion.p>

      {/* Bottom Scroll / Agenda Indicator */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 1.4 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-[#00D4FF]">
          EXPLORE CEREMONY
        </span>
        <div className="h-6 w-px bg-gradient-to-b from-[#00D4FF] to-transparent shadow-[0_0_10px_#00D4FF]" />
      </motion.div>
    </section>
  );
}