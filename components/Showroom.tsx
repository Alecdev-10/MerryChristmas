"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// La scène 3D n'est chargée que dans le navigateur, après le reste de la page.
const ShowroomScene = dynamic(() => import("./ShowroomScene"), {
  ssr: false,
  loading: () => <div className="showroom-fallback">Chargement de la vitrine…</div>,
});

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Showroom() {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setOk(hasWebGL() && !reduced);
  }, []);

  // Pas de WebGL (ou animations réduites) : on masque la vitrine, la grille des rayons reste en dessous.
  if (ok === false) return null;

  return (
    <section className="showroom" aria-label="Vitrine 3D des rayons">
      {ok && <ShowroomScene />}
      <p className="showroom-hint">Fais tourner la vitrine et clique sur un rayon</p>
    </section>
  );
}
