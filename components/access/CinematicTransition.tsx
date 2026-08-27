"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Radio } from "lucide-react";
import { useAccess } from "@/lib/access-machine";
import { useSound } from "@/lib/sound";
import { easeInOut, easeOut } from "@/lib/motion";
import { event } from "@/data/event";

/**
 * Trapcode Luminous Wave Canvas
 * Generates an elegant, silky 3D particle ribbon wave field and subtle starglow dust.
 */
function TrapcodeWaveCanvas() {
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

    const cols = 42;
    const rows = 14;
    let time = 0;

    // Gentle floating starglow particles
    const sparks = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.3 - Math.random() * 0.5,
      size: Math.random() * 1.8 + 0.8,
      color: Math.random() < 0.3 ? "#FFD700" : Math.random() < 0.65 ? "#00E5A0" : "#00D4FF",
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.018;

      const fov = 420;
      const cameraY = -70;
      const cameraZ = -120;
      const spacingX = width / (cols * 0.85);
      const spacingZ = 28;

      // Draw Floating Starglow Micro-particles
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        if (s.y < 0) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha * (0.5 + Math.sin(time * 2 + i) * 0.4);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw 3D Trapcode Wave Ribbons
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        let prevPx = 0;
        let prevPy = 0;

        for (let c = 0; c < cols; c++) {
          const worldX = (c - cols / 2) * spacingX;
          const worldZ = (r + 3) * spacingZ;

          const wave1 = Math.sin(c * 0.18 + time * 1.2) * 32;
          const wave2 = Math.cos(r * 0.28 + time * 0.9) * 22;
          const wave3 = Math.sin((c + r) * 0.14 + time * 1.1) * 14;
          const worldY = 140 + wave1 + wave2 + wave3;

          const relZ = worldZ - cameraZ;
          const scale = fov / (fov + relZ);
          const px = width / 2 + worldX * scale;
          const py = height / 2 + (worldY - cameraY) * scale;
          const alpha = Math.max(0.05, Math.min(0.55, 1 - relZ / 750));

          // Draw node particle
          ctx.fillStyle = r % 2 === 0 ? "#00D4FF" : "#00E5A0";
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(px, py, (c + r) % 5 === 0 ? 2.2 : 1.2, 0, Math.PI * 2);
          ctx.fill();

          // Connect with smooth curve
          if (c === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
          prevPx = px;
          prevPy = py;
        }

        ctx.strokeStyle = r % 2 === 0 ? "rgba(0, 212, 255, 0.12)" : "rgba(0, 229, 160, 0.10)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-85" />;
}

/**
 * Elegant Trapcode Transition & Video Sequence:
 * - Phase 1: Minimalist Trapcode Starglow Waves + Cadence Reveal (0 -> ~2.4s)
 * - Phase 2: Soft Cinematic Feathered Aperture into AIRO Video
 * - Phase 3: Command Center Drone AI Video Playback
 */
export default function CinematicTransition() {
  const { state } = useAccess();
  const sound = useSound();
  const armed = useRef(false);
  const [phase, setPhase] = useState<"trapcode" | "iris" | "video" | "done">("trapcode");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (armed.current) return;
    armed.current = true;

    // Play subtle ambient atmospheric tone and trigger voice line exactly with the screen reveal
    sound.play("authenticate");
    const voiceTimer = window.setTimeout(() => {
      sound.playVoice("future");
    }, 250);

    // Phase 1 (Trapcode Wave & Typography with Voice): 0 -> ~3.0s
    const t1 = window.setTimeout(() => {
      setPhase("iris");
    }, 3000);

    // Phase 2 (Soft Aperture into AIRO Video): ~11s
    const t2 = window.setTimeout(() => setPhase("video"), 12600);

    // Phase 3 (Command Center drone video): ~8s
    const t3 = window.setTimeout(() => setPhase("done"), 21000);

    return () => {
      armed.current = false;
      window.clearTimeout(voiceTimer);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [sound]);

  // Video handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video || (phase !== "iris" && phase !== "video")) return;

    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, [phase]);

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic"
        className="fixed inset-0 z-50 overflow-hidden bg-[#050A0F]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: easeInOut }}
        aria-hidden="true"
      >
        {/* PHASE 1: Elegant Trapcode Particle Wave & Minimalist Telemetry */}
        {phase === "trapcode" && (
          <motion.div
            key="trapcode-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex h-full w-full items-center justify-center overflow-hidden"
          >
            {/* Trapcode 3D Canvas Background */}
            <TrapcodeWaveCanvas />

            {/* Ambient Breathing Cyan & Gold Aura */}
            <motion.div
              animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.95, 1.08, 0.95] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#00D4FF]/20 via-[#00E5A0]/15 to-transparent blur-[120px]"
            />

            {/* Centerpiece Minimalist Luxury Typography */}
            <div className="relative z-10 flex flex-col items-center px-6 text-center">
              {/* Subtle Pill Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-4 flex items-center gap-2 rounded-full border border-[#00D4FF]/30 bg-[#0B1724]/70 px-4 py-1 backdrop-blur-md"
              >
                <Radio className="h-3 w-3 text-[#00D4FF] animate-pulse" />
                <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.28em] text-[#00D4FF]">
                  {event.companyShort} · IT COMMAND CENTER
                </span>
              </motion.div>

              {/* Main Cadence Line */}
              <motion.h1
                initial={{ opacity: 0, letterSpacing: "0.25em", y: 15 }}
                animate={{ opacity: 1, letterSpacing: "0.38em", y: 0 }}
                transition={{ duration: 1.4, ease: easeOut }}
                className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-tight text-[#F5F7FA] drop-shadow-[0_0_35px_rgba(0,212,255,0.4)]"
              >
                THE FUTURE STARTS HERE
              </motion.h1>

              {/* Minimalist Glowing Gold Divider */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "160px", opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="my-5 h-px bg-gradient-to-r from-transparent via-[#FFD700]/70 to-transparent"
              />

              {/* Sub-label & Subtle Pulse Bar */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="flex flex-col items-center gap-2"
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#8B98A5]">
                  INTEGRATED COMMAND & COORDINATION EXCELLENCE
                </p>

                {/* Minimalist Equalizer Pulse */}
                <div className="mt-2 flex items-center gap-1">
                  {[40, 70, 100, 60, 90, 50, 80, 30].map((h, i) => (
                    <motion.span
                      key={i}
                      animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }}
                      transition={{ repeat: Infinity, duration: 1 + i * 0.1, ease: "easeInOut" }}
                      className="h-3.5 w-0.5 rounded-full bg-gradient-to-t from-[#00D4FF] to-[#00E5A0]"
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: Soft Cinematic Feathered Aperture into AIRO Video */}
        {(phase === "iris" || phase === "video") && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {/* Video with Smooth Expanding Circular Aperture */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0.8 }}
              animate={{ clipPath: "circle(150% at 50% 50%)", opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                autoPlay
                preload="auto"
                disablePictureInPicture
                onEnded={(e) => {
                  const video = e.currentTarget;
                  video.pause();
                  video.currentTime = video.duration;
                }}
              >
                <source src="/video/airo-airi.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A0F]/60 via-transparent to-[#050A0F]/40 pointer-events-none" />
            </motion.div>

            {/* Single Elegant Soft Glow Aperture Ring */}
            <motion.div
              className="pointer-events-none absolute rounded-full border border-[#00D4FF]/60 shadow-[0_0_60px_15px_rgba(0,212,255,0.3)]"
              initial={{ width: 30, height: 30, opacity: 0.9, scale: 0.3 }}
              animate={{ width: 2600, height: 2600, opacity: 0, scale: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        )}

        {/* PHASE 3: Command Center Drone AI Video Playback */}
        {phase === "video" && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
              autoPlay
              preload="auto"
              disablePictureInPicture
              onEnded={(e) => {
                const video = e.currentTarget;
                video.pause();
                video.currentTime = video.duration - 0.1;
              }}
            >
              <source src="/video/command-center-drone-ai.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050A0F]/60 via-transparent to-[#050A0F]/40" />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}