"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Bulb = { x: number; y: number; delay: number; flicker: number; on: number };

/**
 * Enseigne lumineuse : le texte est échantillonné sur une grille, chaque point devient une ampoule.
 * Au chargement, les ampoules s'allument de gauche à droite avec un léger grésillement.
 * Les ampoules proches du curseur brillent davantage.
 */
export default function BulbSign({ lines }: { lines: string[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const box = wrap.current;
    if (!canvas || !box) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const state = { progress: reduced ? 1 : 0 };
    const pointer = { x: -9999, y: -9999 };
    let bulbs: Bulb[] = [];
    let w = 0;
    let h = 0;
    let step = 10;
    let raf = 0;
    let glow: HTMLCanvasElement | null = null;
    let tween: gsap.core.Tween | null = null;

    const makeGlow = (size: number) => {
      const g = document.createElement("canvas");
      g.width = g.height = size * 2;
      const gc = g.getContext("2d")!;
      const grad = gc.createRadialGradient(size, size, 0, size, size, size);
      grad.addColorStop(0, "rgba(255, 246, 214, 1)");
      grad.addColorStop(0.18, "rgba(255, 214, 120, 0.95)");
      grad.addColorStop(0.45, "rgba(242, 181, 68, 0.28)");
      grad.addColorStop(1, "rgba(242, 181, 68, 0)");
      gc.fillStyle = grad;
      gc.fillRect(0, 0, size * 2, size * 2);
      return g;
    };

    const layout = () => {
      w = box.clientWidth;
      h = box.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const family =
        getComputedStyle(document.body).getPropertyValue("--font-texte").trim() || "Futura, sans-serif";
      step = Math.max(5, Math.round(Math.min(w, 1400) / (w < 600 ? 60 : 96)));

      // Rendu du texte hors écran pour échantillonner les pixels
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const oc = off.getContext("2d")!;
      const lineH = h / lines.length;
      let size = lineH * 0.98;
      oc.font = `600 ${size}px ${family}`;
      const widest = Math.max(...lines.map((l) => oc.measureText(l).width));
      if (widest > w * 0.94) size *= (w * 0.94) / widest;
      oc.font = `600 ${size}px ${family}`;
      oc.textAlign = "center";
      oc.textBaseline = "middle";
      oc.fillStyle = "#fff";
      lines.forEach((l, i) => oc.fillText(l, w / 2, lineH * (i + 0.5)));
      const data = oc.getImageData(0, 0, w, h).data;

      bulbs = [];
      for (let y = step / 2; y < h; y += step) {
        for (let x = step / 2; x < w; x += step) {
          const a = data[(Math.floor(y) * w + Math.floor(x)) * 4 + 3];
          if (a > 140) {
            bulbs.push({
              x,
              y,
              delay: x / w + Math.random() * 0.12,
              flicker: Math.random(),
              on: 0,
            });
          }
        }
      }
      glow = makeGlow(Math.round(step * 2.3));
    };

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const p = state.progress * 1.25;
      const r = step * 0.3;
      for (const b of bulbs) {
        // Allumage : chaque ampoule passe de 0 à 1 autour de son délai, avec deux ratés
        const local = Math.min(1, Math.max(0, (p - b.delay) / 0.1));
        let on = local;
        if (local > 0 && local < 1) on = local * (Math.sin(t * 0.05 + b.flicker * 40) > 0 ? 1 : 0.2);
        // Grésillement résiduel très rare
        if (local === 1 && b.flicker > 0.995) on = 0.6 + 0.4 * Math.abs(Math.sin(t * 0.013 + b.flicker * 9));
        const dx = b.x - pointer.x;
        const dy = b.y - pointer.y;
        const near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 140);

        // Douille éteinte
        ctx.fillStyle = "#2a070d";
        ctx.beginPath();
        ctx.arc(b.x, b.y, r * 1.25, 0, Math.PI * 2);
        ctx.fill();
        if (on > 0.02 && glow) {
          const s = glow.width * (0.5 + near * 0.45) * (0.6 + on * 0.4);
          ctx.globalCompositeOperation = "lighter";
          ctx.globalAlpha = Math.min(1, on * (0.55 + near * 0.45));
          ctx.drawImage(glow, b.x - s / 2, b.y - s / 2, s, s);
          ctx.globalCompositeOperation = "source-over";
          // Filament : point chaud au centre de l'ampoule
          ctx.globalAlpha = on;
          ctx.fillStyle = "#fff4d6";
          ctx.beginPath();
          ctx.arc(b.x, b.y, r * 0.75, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
    };

    let start = performance.now();
    const loop = (now: number) => {
      draw(now - start);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const init = async () => {
      await document.fonts.ready;
      layout();
      start = performance.now();
      if (!reduced) {
        tween = gsap.to(state, { progress: 1, duration: 3.2, ease: "power1.inOut", delay: 0.4 });
      }
      raf = requestAnimationFrame(loop);
    };
    init();

    const ro = new ResizeObserver(() => layout());
    ro.observe(box);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      tween?.kill();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [lines]);

  return (
    <div ref={wrap} className="facade-sign" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}
