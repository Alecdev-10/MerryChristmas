"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import BulbSign from "./BulbSign";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ENSEIGNE = ["Merry", "Christmas"];

/** La façade : l'enseigne recule et s'estompe à mesure qu'on descend vers le boulevard. */
export default function Facade() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".facade-sign", { yPercent: -18, scale: 0.9, opacity: 0.35, ease: "none", scrollTrigger: st });
        gsap.to(".facade-foot", { yPercent: -60, opacity: 0, ease: "none", scrollTrigger: { ...st, end: "40% top" } });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="facade">
      <h1 className="sr-only">MerryChristmas, les vitrines de Noël</h1>
      <BulbSign lines={ENSEIGNE} />
      <div className="facade-foot">
        <p>Six vitrines de décoration de Noël 2026. Essuyez la buée pour voir ce qu&apos;il y a derrière.</p>
        <div className="facade-actions">
          <a href="#vitrines" className="bouton">Entrer dans la boutique</a>
          <Link href="/inspiration" className="bouton bouton-second">Espace Inspiration</Link>
        </div>
        <div className="descend" aria-hidden="true">
          <span />
          Descendez le boulevard
        </div>
      </div>
    </section>
  );
}
