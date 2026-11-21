"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

/**
 * Une seule Canvas WebGL pour toute la page, fixée sous le contenu.
 * Chaque vitrine y dessine sa scène dans son propre rectangle (drei <View>),
 * visible à travers le « trou » transparent de la vitre.
 */
export default function Stage() {
  const [source, setSource] = useState<HTMLElement | null>(null);
  useEffect(() => setSource(document.body), []);
  if (!source) return null;

  return (
    <Canvas
      eventSource={source}
      eventPrefix="client"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <View.Port />
    </Canvas>
  );
}
