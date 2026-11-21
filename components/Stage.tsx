"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor, View } from "@react-three/drei";
import { downgradeTier, useTier } from "@/lib/perf";

/**
 * Une seule Canvas WebGL pour toute la page, fixée sous le contenu.
 * Chaque vitrine y dessine sa scène dans son propre rectangle (drei <View>),
 * visible à travers le « trou » transparent de la vitre.
 *
 * Si l'appareil peine (images/seconde qui chutent), on baisse la définition,
 * puis on remplace la 3D par des dessins.
 */
export default function Stage() {
  const tier = useTier();
  const [source, setSource] = useState<HTMLElement | null>(null);
  useEffect(() => setSource(document.body), []);
  if (!source || tier === "static") return null;

  const lite = tier === "lite";
  return (
    <Canvas
      eventSource={source}
      eventPrefix="client"
      dpr={lite ? 1 : [1, 1.5]}
      gl={{ antialias: !lite, alpha: true, powerPreference: lite ? "low-power" : "high-performance" }}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <PerformanceMonitor flipflops={3} onDecline={downgradeTier} onFallback={downgradeTier} />
      <View.Port />
    </Canvas>
  );
}
