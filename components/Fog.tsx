"use client";

import { useEffect, useImperativeHandle, useRef, forwardRef } from "react";

export type FogHandle = {
  /** Trace automatiquement un geste d'essuyage, pour montrer qu'on peut le faire */
  hint: () => void;
  /** Dissipe toute la buée (entrée dans la vitrine) */
  clear: () => void;
};

/**
 * Buée sur la vitre : une texture givrée qu'on essuie au survol ou au doigt.
 * Les zones essuyées se recouvrent lentement de buée.
 *
 * Deux canvas : `mask` mémorise où l'on a essuyé (et s'efface doucement),
 * le canvas visible = texture de buée moins le masque.
 */
const Fog = forwardRef<FogHandle, { active: boolean; onWipe?: () => void }>(function Fog({ active, onWipe }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const api = useRef<FogHandle>({ hint: () => {}, clear: () => {} });
  const activeRef = useRef(active);
  activeRef.current = active;
  const wipedRef = useRef(false);
  const onWipeRef = useRef(onWipe);
  onWipeRef.current = onWipe;

  useImperativeHandle(ref, () => ({
    hint: () => api.current.hint(),
    clear: () => api.current.clear(),
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const mask = document.createElement("canvas");
    const mctx = mask.getContext("2d")!;
    const texture = document.createElement("canvas");
    const tctx = texture.getContext("2d")!;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;
    let last: { x: number; y: number } | null = null;
    let clearing = 0; // 0..1 : dissipation complète

    const paintTexture = () => {
      texture.width = w;
      texture.height = h;
      tctx.clearRect(0, 0, w, h);
      tctx.fillStyle = "rgba(232, 226, 228, 0.5)";
      tctx.fillRect(0, 0, w, h);
      // Micro-gouttelettes et nuages de condensation
      for (let i = 0; i < (w * h) / 900; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 18 + 4;
        const g = tctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(250, 252, 255, ${0.05 + Math.random() * 0.1})`);
        g.addColorStop(1, "rgba(250, 252, 255, 0)");
        tctx.fillStyle = g;
        tctx.fillRect(x - r, y - r, r * 2, r * 2);
      }
      // Plus dense en bas de la vitre, comme la vraie condensation
      const bottom = tctx.createLinearGradient(0, h * 0.55, 0, h);
      bottom.addColorStop(0, "rgba(236, 240, 244, 0)");
      bottom.addColorStop(1, "rgba(236, 240, 244, 0.35)");
      tctx.fillStyle = bottom;
      tctx.fillRect(0, 0, w, h);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      mask.width = w;
      mask.height = h;
      paintTexture();
    };

    const wipe = (x: number, y: number) => {
      const from = last ?? { x, y };
      const dist = Math.hypot(x - from.x, y - from.y);
      const steps = Math.max(1, Math.ceil(dist / 6));
      const R = Math.max(26, Math.min(w, h) * 0.075);
      for (let i = 1; i <= steps; i++) {
        const px = from.x + ((x - from.x) * i) / steps;
        const py = from.y + ((y - from.y) * i) / steps;
        const g = mctx.createRadialGradient(px, py, R * 0.35, px, py, R);
        g.addColorStop(0, "rgba(0,0,0,0.9)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        mctx.fillStyle = g;
        mctx.fillRect(px - R, py - R, R * 2, R * 2);
      }
      last = { x, y };
      if (!wipedRef.current) {
        wipedRef.current = true;
        onWipeRef.current?.();
      }
    };

    const frame = () => {
      // La buée revient doucement (plus vite si la vitrine n'est pas active)
      mctx.globalCompositeOperation = "destination-out";
      mctx.fillStyle = `rgba(0,0,0,${activeRef.current ? 0.006 : 0.02})`;
      mctx.fillRect(0, 0, w, h);
      mctx.globalCompositeOperation = "source-over";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 1 - clearing;
      ctx.drawImage(texture, 0, 0);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "destination-out";
      ctx.drawImage(mask, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };

    const local = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e: PointerEvent) => {
      // Souris : on essuie au survol. Tactile/stylet : on essuie en glissant.
      if (e.pointerType === "mouse" || e.buttons > 0 || e.pointerType === "touch") {
        const p = local(e);
        wipe(p.x, p.y);
      }
    };
    const onLeave = () => {
      last = null;
    };

    api.current.hint = () => {
      // Geste d'essuyage en arc, comme un revers de main
      const pts = 26;
      let i = 0;
      last = null;
      const step = () => {
        const t = i / pts;
        const x = w * (0.22 + 0.56 * t);
        const y = h * (0.58 - Math.sin(t * Math.PI) * 0.16);
        wipe(x, y);
        i++;
        if (i <= pts) requestAnimationFrame(step);
        else last = null;
      };
      requestAnimationFrame(step);
    };
    api.current.clear = () => {
      const t0 = performance.now();
      const run = (now: number) => {
        clearing = Math.min(1, (now - t0) / 500);
        if (clearing < 1) requestAnimationFrame(run);
      };
      requestAnimationFrame(run);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(frame);
      },
      { rootMargin: "0px 200px" }
    );

    resize();
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerup", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerup", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="buee" aria-hidden="true" />;
});

export default Fog;
