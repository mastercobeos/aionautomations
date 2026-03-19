"use client";

import { useEffect, useRef } from "react";

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;

    // Match canvas to screen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Fewer stars on mobile for performance
    const starCount = isMobile ? 80 : 280;
    const stars = Array.from({ length: starCount }, () => {
      const r = Math.random();
      // Most stars small, few larger
      const size = r < 0.7 ? 0.8 : r < 0.9 ? 1.2 : 1.8;
      // Color: mostly white, some cyan, some purple
      const colorRoll = Math.random();
      let color: string;
      if (colorRoll < 0.6) {
        color = "rgba(255,255,255,";
      } else if (colorRoll < 0.8) {
        color = "rgba(34,212,254,";
      } else {
        color = "rgba(168,85,247,";
      }
      return {
        x: Math.random(),
        y: Math.random(),
        size,
        color,
        baseAlpha: 0.3 + Math.random() * 0.6,
        twinkleSpeed: 0.3 + Math.random() * 1.5,
        twinkleOffset: Math.random() * Math.PI * 2,
      };
    });

    let animId: number;
    const draw = (time: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const star of stars) {
        const twinkle = Math.sin(time * 0.001 * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.baseAlpha + twinkle * 0.25;
        const clampedAlpha = Math.max(0.1, Math.min(1, alpha));

        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color + clampedAlpha.toFixed(2) + ")";
        ctx.fill();

        // Glow for larger stars
        if (star.size > 1.4) {
          ctx.beginPath();
          ctx.arc(star.x * w, star.y * h, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = star.color + (clampedAlpha * 0.15).toFixed(2) + ")";
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    // Check reduced motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // Draw once, no animation
      draw(0);
    } else {
      animId = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none"
      style={{ position: 'fixed', inset: 0, zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
