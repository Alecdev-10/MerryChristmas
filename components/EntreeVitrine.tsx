"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Suite de la transition depuis le boulevard : on arrive « derrière la vitre »,
 * une dernière couche de buée se dissipe depuis le centre.
 */
export default function EntreeVitrine() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let fromWindow = false;
    try {
      fromWindow = sessionStorage.getItem("entree-vitrine") === "1";
      sessionStorage.removeItem("entree-vitrine");
    } catch {}
    if (!fromWindow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show || !ref.current) return;
    const tw = gsap.fromTo(
      ref.current,
      { "--trou": "0%" },
      { "--trou": "140%", duration: 1.6, ease: "power2.inOut", onComplete: () => setShow(false) }
    );
    return () => {
      tw.kill();
    };
  }, [show]);

  if (!show) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={
        {
          position: "fixed",
          inset: 0,
          zIndex: 60,
          pointerEvents: "none",
          background: "rgba(226, 232, 238, 0.7)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          "--trou": "0%",
          maskImage: "radial-gradient(circle at 50% 55%, transparent var(--trou), #000 calc(var(--trou) + 14%))",
          WebkitMaskImage: "radial-gradient(circle at 50% 55%, transparent var(--trou), #000 calc(var(--trou) + 14%))",
        } as React.CSSProperties
      }
    />
  );
}
