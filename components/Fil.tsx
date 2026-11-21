"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Product } from "@/lib/products";
import { withAffiliateTag } from "@/lib/site";
import Illustration from "./Illustration";
import { illusForProduct } from "@/lib/illustrations";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

/* Position des étiquettes sur chaque fil et longueur de leur ficelle (px) */
const SLOTS = [
  { f: 0.17, len: 34 },
  { f: 0.5, len: 120 },
  { f: 0.83, len: 62 },
];
const PER_ROW = SLOTS.length;

/** Hauteur du fil (courbe de Bézier dans un viewBox 1000×60) à la position f */
const sagAt = (f: number) => 6 * (1 - f) ** 2 + 268 * f * (1 - f) + 6 * f ** 2;

/**
 * Les produits sont des étiquettes en carton suspendues à des fils.
 * Au survol, l'étiquette se balance dans le sens du geste.
 */
export default function Fil({ products }: { products: Product[] }) {
  const root = useRef<HTMLDivElement>(null);

  const rows: Product[][] = [];
  for (let i = 0; i < products.length; i += PER_ROW) rows.push(products.slice(i, i + PER_ROW));

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Chaque étiquette tombe sur sa ficelle au moment où elle entre à l'écran
        const swings = gsap.utils.toArray<HTMLElement>(".etiquette-swing", root.current);
        gsap.set(swings, { yPercent: -18, rotation: 0, autoAlpha: 0 });
        ScrollTrigger.batch(swings, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              yPercent: 0,
              autoAlpha: 1,
              keyframes: { rotation: [gsap.utils.random(-7, 7), 0] },
              duration: 1.6,
              ease: "elastic.out(1, 0.3)",
              stagger: 0.09,
              overwrite: true,
            }),
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const swing = contextSafe((el: HTMLElement, vx: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const angle = gsap.utils.clamp(-16, 16, vx * 0.9);
    gsap.killTweensOf(el);
    gsap.fromTo(el, { rotation: angle }, { rotation: 0, duration: 2.6, ease: "elastic.out(1, 0.16)" });
  });

  return (
    <div ref={root} className="fil">
      {rows.map((row, r) => (
        <div className="fil-ligne" key={r}>
          <svg viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,6 Q500,134 1000,6" fill="none" stroke="#d9c9a8" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          </svg>
          {row.map((p, i) => {
            const slot = SLOTS[(i + r) % PER_ROW];
            const top = sagAt(slot.f);
            return (
              <div className="etiquette" key={p.id} style={{ left: `${slot.f * 100}%`, top }}>
                <div
                  className="etiquette-swing"
                  onPointerEnter={(e) => swing(e.currentTarget, e.movementX || (Math.random() - 0.5) * 12)}
                >
                  <span className="etiquette-ficelle" style={{ height: slot.len }} />
                  <div className="etiquette-carton">
                    <a
                      className="etiquette-img"
                      href={withAffiliateTag(p.url)}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      {p.image ? (
                        // Image fournie par Amazon (SiteStripe), affichée telle quelle
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt="" loading="lazy" />
                      ) : (
                        <Illustration kind={illusForProduct(p.name, p.rayon)} color="#3a1a10" stroke={1.8} />
                      )}
                    </a>
                    {p.gamme && <p className="etiquette-gamme">{p.gamme}</p>}
                    <p className="etiquette-nom">{p.name}</p>
                    {p.benefice && <p className="etiquette-benefice">{p.benefice}</p>}
                    {p.price != null && <p className="etiquette-prix">{euro.format(p.price)}</p>}
                    <a href={withAffiliateTag(p.url)} target="_blank" rel="sponsored noopener noreferrer">
                      Voir sur Amazon
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
