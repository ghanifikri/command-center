"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Award, Shield, Terminal, Radio } from "lucide-react";
import { eventHero } from "@/data/event";
import { easeOut, EASE } from "@/lib/motion";

const GLYPHS = "0101#@$%&*XKZ_9876543210ABCDEF";

/**
 * Trapcode-style 3D Undulating Particle Grid Canvas
 * Simulates Trapcode Form / Mir with wave dynamics, glowing data nodes, and cyber surges.
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

    // Grid definition
    const cols = 36;
    const rows = 20;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.025;

      const fov = 350;
      const cameraY = -120;
      const cameraZ = -180;
      const spacingX = width / (cols * 0.75);
      const spacingZ = 28;

      // Project grid points
      const points: { x: number; y: number; z: number; px: number; py: number; alpha: number; isNode: boolean }[][] = [];

      for (let r = 0; r < rows; r++) {
        const rowArr = [];
        for (let c = 0; c < cols; c++) {
          const worldX = (c - cols / 2) * spacingX;
          const worldZ = (r + 4) * spacingZ;

          // Trapcode 3D wave mathematics
          const wave1 = Math.sin(c * 0.25 + time * 1.2) * 35;
          const wave2 = Math.cos(r * 0.35 + time * 0.9) * 25;
          const wave3 = Math.sin((c + r) * 0.18 + time * 1.5) * 15;
          const worldY = 160 + wave1 + wave2 + wave3;

          // 3D perspective projection
          const relZ = worldZ - cameraZ;
          const scale = fov / (fov + relZ);
          const px = width / 2 + worldX * scale;
          const py = height / 2 + (worldY - cameraY) * scale;
          const alpha = Math.max(0.05, Math.min(0.85, 1 - relZ / 750));
          const isNode = (c + r) % 5 === 0;

          rowArr.push({ x: worldX, y: worldY, z: worldZ, px, py, alpha, isNode });
        }
        points.push(rowArr);
      }

      // Draw cybernet grid connecting lines
      ctx.lineWidth = 0.75;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];

          // Horizontal connect
          if (c < cols - 1) {
            const pNext = points[r][c + 1];
            ctx.strokeStyle = `rgba(0, 212, 255, ${p.alpha * 0.25})`;
            ctx.beginPath();
            ctx.moveTo(p.px, p.py);
            ctx.lineTo(pNext.px, pNext.py);
            ctx.stroke();
          }

          // Vertical connect
          if (r < rows - 1) {
            const pBelow = points[r + 1][c];
            ctx.strokeStyle = `rgba(0, 229, 160, ${p.alpha * 0.2})`;
            ctx.beginPath();
            ctx.moveTo(p.px, p.py);
            ctx.lineTo(pBelow.px, pBelow.py);
            ctx.stroke();
          }

          // Draw Glowing Particles / Cyber Nodes
          const pulse = Math.sin(time * 3 + c * 0.5 + r * 0.3);
          const size = p.isNode ? 2.5 + pulse * 1 : 1.2;

          ctx.fillStyle = p.isNode
            ? `rgba(0, 229, 160, ${p.alpha * 0.95})`
            : (c + r) % 3 === 0
            ? `rgba(201, 169, 110, ${p.alpha * 0.8})`
            : `rgba(0, 212, 255, ${p.alpha * 0.7})`;

          ctx.beginPath();
          ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
          ctx.fill();

          // Particle Glow on key nodes
          if (p.isNode && pulse > 0.3) {
            ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha * 0.35})`;
            ctx.beginPath();
            ctx.arc(p.px, p.py, size * 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
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

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />;
}

/**
 * Cyber Decryption Text Scramble Effect
 */
function ScrambleTitle({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 35);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText || text}</span>;
}

/**
 * Executive Grand Inauguration Hero with Trapcode 3D Particle Matrix & Cyber Hacking Aesthetics.
 */
export default function EventHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[95svh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
    >
      {/* Trapcode 3D Particle Matrix Field */}
      <TrapcodeField />

      {/* Cyber Laser Scan Sweep */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 h-2 bg-gradient-to-r from-transparent via-[#00D4FF]/40 to-transparent blur-sm shadow-[0_0_30px_#00D4FF]"
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      />

      {/* Ambient Lighting Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 h-[650px] w-[650px] rounded-full bg-gradient-to-br from-[#C9A96E]/25 via-[#00D4FF]/25 to-transparent blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 h-[500px] w-[500px] rounded-full bg-[#00E5A0]/15 blur-[140px]"
      />

      {/* Top Left HUD Telemetry */}
      <div className="pointer-events-none absolute left-6 top-8 hidden font-mono text-[0.55rem] text-[#00D4FF]/60 sm:block text-left">
        <div className="flex items-center gap-1.5 text-[#00E5A0]">
          <Terminal className="h-3 w-3" />
          <span className="font-bold">GRID_SEC // LEVEL_1</span>
        </div>
        <div className="mt-0.5 text-[#8B98A5]">CORE_SYS: OPTIMAL</div>
        <div className="text-[#8B98A5]">LAT: -6.0128° | LON: 106.0538°</div>
      </div>

      {/* Top Right HUD Telemetry */}
      <div className="pointer-events-none absolute right-6 top-8 hidden font-mono text-[0.55rem] text-[#00D4FF]/60 sm:block text-right">
        <div className="flex items-center justify-end gap-1.5 text-[#C9A96E]">
          <Radio className="h-3 w-3 animate-pulse" />
          <span className="font-bold">STREAM: ENCRYPTED</span>
        </div>
        <div className="mt-0.5 text-[#8B98A5]">PROTOCOL: KTI_V2</div>
        <div className="text-[#00D4FF]">STATUS: ONLINE_ACTIVE</div>
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

      {/* Main Title: COMMAND CENTER with Cyber Decryption & Anamorphic Flare */}
      <div className="relative z-10 my-2 overflow-visible">
        {/* Anamorphic Laser Flare Beam */}
        <motion.div
          aria-hidden="true"
          initial={{ left: "-50%", opacity: 0 }}
          animate={{ left: "150%", opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }}
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-1 w-64 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent blur-sm"
        />

        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          className="font-display text-[clamp(3.4rem,11vw,7.8rem)] font-black uppercase leading-[0.92] tracking-[0.06em] text-[#F5F7FA] drop-shadow-[0_0_60px_rgba(0,212,255,0.55)]"
        >
          <span className="bg-gradient-to-b from-[#FFFFFF] via-[#F5F7FA] to-[#8FA7B8] bg-clip-text text-transparent">
            <ScrambleTitle text={eventHero.title} />
          </span>
        </motion.h1>
      </div>

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