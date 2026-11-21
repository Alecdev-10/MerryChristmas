"use client";

import { Fragment, useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Vitrine from "./Vitrine";
import type { FogHandle } from "./Fog";
import { RAYONS } from "@/data/rayons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Le boulevard : section épinglée qui défile horizontalement au scroll.
 * La vitrine qui passe au centre de l'écran s'allume.
 */
export default function Boulevard() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const rideau = useRef<HTMLDivElement>(null);
  const vitrines = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(-1);
  const router = useRouter();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const move = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            pin: true,
            // Lenis lisse déjà le scroll : un scrub direct évite le décalage « élastique »
            scrub: true,
            // À l'arrêt du scroll, la vitrine la plus proche vient se centrer
            snap: {
              snapTo: (value: number) => {
                const d = distance();
                if (d <= 0) return value;
                const points = vitrines.current
                  .filter((v): v is HTMLElement => !!v)
                  .map((v) => (v.offsetLeft + v.offsetWidth / 2 - window.innerWidth / 2) / d)
                  .map((p) => Math.min(1, Math.max(0, p)));
                // Garder la possibilité de sortir du boulevard par les extrémités
                if (value < points[0] / 2 || value > (1 + points[points.length - 1]) / 2) return value;
                return points.reduce((a, b) => (Math.abs(b - value) < Math.abs(a - value) ? b : a), points[0]);
              },
              duration: { min: 0.25, max: 0.6 },
              delay: 0.08,
              ease: "power2.inOut",
            },
            anticipatePin: 1,
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
          },
        });
        vitrines.current.forEach((v, i) => {
          if (!v) return;
          ScrollTrigger.create({
            trigger: v,
            containerAnimation: move,
            start: "left 62%",
            end: "right 38%",
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
        // Le décor défile un peu moins vite que les vitrines : profondeur
        gsap.to(".trottoir", {
          backgroundPositionX: () => -distance() * 0.3,
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        vitrines.current.forEach((v, i) => {
          if (!v) return;
          ScrollTrigger.create({
            trigger: v,
            start: "top 60%",
            end: "bottom 40%",
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
      });

      return () => mm.revert();
    },
    { scope: section }
  );

  const enter = useCallback((slug: string, origin: { x: number; y: number }, fog: FogHandle | null) => {
    try {
      sessionStorage.setItem("entree-vitrine", "1");
    } catch {}
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(`/${slug}`);
      return;
    }
    fog?.clear();
    const tl = gsap.timeline({ onComplete: () => router.push(`/${slug}`) });
    tl.set(rideau.current, { clipPath: `circle(0% at ${origin.x}px ${origin.y}px)` })
      .to(rideau.current, {
        clipPath: `circle(150% at ${origin.x}px ${origin.y}px)`,
        duration: 0.9,
        ease: "power3.inOut",
        delay: 0.35,
      });
  }, [router]);

  return (
    <>
    <section ref={section} id="vitrines" className="boulevard" aria-label="Les vitrines">
      <div className="trottoir" aria-hidden="true" />
      <div ref={track} className="boulevard-track">
        {RAYONS.map((r, i) => (
          <Fragment key={r.slug}>
            <div className="pilastre" aria-hidden="true" style={{ position: "relative" }}>
              {i % 2 === 0 && <span className="reverbere" style={{ left: "50%" }} />}
            </div>
            <Vitrine
              ref={(el) => {
                vitrines.current[i] = el;
              }}
              rayon={r}
              active={active === i}
              onEnter={enter}
            />
          </Fragment>
        ))}
        <div className="pilastre" aria-hidden="true" />
      </div>
    </section>
    <div ref={rideau} className="rideau" aria-hidden="true" />
    </>
  );
}
