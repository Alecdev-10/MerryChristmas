"use client";

import { useEffect, useRef } from "react";
import { getTier } from "@/lib/perf";

type Flake = { x: number; y: number; r: number; vy: number; drift: number; phase: number; px: number; py: number };

/**
 * Neige 2D plein écran. Les flocons s'écartent du curseur (ou du doigt) au lieu de le traverser.
 * Couche fixe, sans interaction (pointer-events: none).
 */
export default function Snow() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const pointer = { x: -9999, y: -9999 };
    let flakes: Flake[] = [];
    let raf = 0;
    let last = performance.now();

    const make = (y?: number): Flake => {
      const r = Math.random() ** 2 * 2.6 + 0.6;
      return {
        x: Math.random() * w,
        y: y ?? Math.random() * h,
        r,
        vy: 18 + r * 16,
        drift: 6 + Math.random() * 14,
        phase: Math.random() * Math.PI * 2,
        px: 0,
        py: 0,
      };
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const density = getTier() === "lite" ? 0.45 : 1;
      const count = Math.round(Math.min(220, (w * h) / 7000) * density);
      flakes = Array.from({ length: count }, () => make());
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(243, 238, 242, 0.85)";
      for (const f of flakes) {
        f.phase += dt * 0.8;
        // Répulsion douce autour du curseur
        const dx = f.x - pointer.x;
        const dy = f.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        const R = 110;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1;
          const force = (1 - d / R) * 240;
          f.px += (dx / d) * force * dt;
          f.py += (dy / d) * force * dt;
        }
        f.px *= 0.92;
        f.py *= 0.92;
        f.x += (Math.sin(f.phase) * f.drift + f.px) * dt;
        f.y += (f.vy + f.py) * dt;
        if (f.y > h + 6) Object.assign(f, make(-6));
        if (f.x < -6) f.x = w + 6;
        if (f.x > w + 6) f.x = -6;
        ctx.globalAlpha = 0.35 + f.r / 4;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 30, pointerEvents: "none" }}
    />
  );
}
