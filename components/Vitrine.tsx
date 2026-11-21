"use client";

import { forwardRef, memo, useEffect, useRef, useState } from "react";
import { View } from "@react-three/drei";
import Fog, { type FogHandle } from "./Fog";
import { VitrineScene } from "./scenes";
import Illustration from "./Illustration";
import { ILLUS_BY_SCENE } from "@/lib/illustrations";
import { useTier } from "@/lib/perf";
import type { Rayon } from "@/data/rayons";

type Props = {
  rayon: Rayon;
  active: boolean;
  onEnter: (slug: string, origin: { x: number; y: number }, fog: FogHandle | null) => void;
};

const Vitrine = forwardRef<HTMLElement, Props>(function Vitrine({ rayon, active, onEnter }, ref) {
  const fog = useRef<FogHandle>(null);
  const hinted = useRef(false);
  const [wiped, setWiped] = useState(false);
  const tier = useTier();

  // La première fois que la vitrine s'allume, un geste d'essuyage montre qu'on peut le faire
  useEffect(() => {
    if (!active || hinted.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    hinted.current = true;
    const id = window.setTimeout(() => fog.current?.hint(), 650);
    return () => window.clearTimeout(id);
  }, [active]);

  return (
    <article ref={ref} className={`vitrine${active ? " is-active" : ""}`} data-slug={rayon.slug}>
      <div className="marquise" aria-hidden="true" />
      <h2 className="enseigne-vitrine">{rayon.enseigne}</h2>

      <div className="verre">
        {tier === "static" ? (
          <Illustration kind={ILLUS_BY_SCENE[rayon.scene]} color="#f2b544" stroke={1.6} className="vitrine-dessin" />
        ) : (
          <View className="scene-view">
            <VitrineScene scene={rayon.scene} active={active} lite={tier === "lite"} />
          </View>
        )}
        <div className="lueur" />
        <Fog ref={fog} active={active} onWipe={() => setWiped(true)} />
        <p className="indice" style={{ opacity: wiped ? 0 : 0.75 }}>
          Essuyez la buée
        </p>
      </div>

      <div className="soubassement">
        <p>{rayon.intro}</p>
        <button
          type="button"
          className="entrer"
          onClick={(e) => onEnter(rayon.slug, { x: e.clientX, y: e.clientY }, fog.current)}
        >
          Entrer dans la vitrine
        </button>
      </div>
      <div className="reflet" aria-hidden="true" />
    </article>
  );
});

export default memo(Vitrine);
