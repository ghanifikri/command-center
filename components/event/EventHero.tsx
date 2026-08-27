"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Award, Terminal, Radio } from "lucide-react";
import { eventHero } from "@/data/event";
import { easeOut, EASE } from "@/lib/motion";

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

      {/* Main Title: Razor-Sharp, Luxurious Metallic Gradient Typography */}
      <div className="relative z-10 my-3 overflow-visible">
        {/* Anamorphic Laser Flare Beam Sweeping Across Title */}
        <motion.div
          aria-hidden="true"
          initial={{ left: "-40%", opacity: 0 }}
          animate={{ left: "140%", opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-1 w-72 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent blur-[2px] z-30"
        />

        <motion.h1
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="font-display text-[clamp(3.2rem,10vw,7.4rem)] font-black uppercase leading-[0.92] tracking-[0.06em] text-[#F5F7FA] drop-shadow-[0_0_40px_rgba(0,212,255,0.4)]"
        >
          <span className="bg-gradient-to-b from-[#FFFFFF] via-[#E8F4FA] to-[#8FA7B8] bg-clip-text text-transparent">
            {eventHero.title}
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