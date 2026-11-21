"use client";

import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Line, PerspectiveCamera } from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { SceneKey } from "@/data/rayons";

/* Couleurs tirées de la direction artistique */
const C = {
  velours: "#4a0d16",
  profond: "#2a070d",
  lampion: "#f2b544",
  sapin: "#1e4c4a",
  sapinFonce: "#143533",
  laiton: "#b38a4d",
  givre: "#f3eef2",
  bois: "#5a3520",
};

/** Lissage exponentiel indépendant du framerate */
const damp = (a: number, b: number, lambda: number, dt: number) => a + (b - a) * (1 - Math.exp(-lambda * dt));

function useLight(active: boolean) {
  const level = useRef(0.25);
  useFrame((_, dt) => {
    level.current = damp(level.current, active ? 1 : 0.25, 2.5, dt);
  });
  return level;
}

/** Fond de vitrine : tenture en velours + plancher, communs à toutes les scènes */
function Decor({ floor = "#5a3020" }: { floor?: string }) {
  return (
    <group>
      <mesh position={[0, 1.6, -2.2]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#6b1a26" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color={floor} roughness={0.85} />
      </mesh>
    </group>
  );
}

function Camera({ y = 1.1, z = 5.2 }: { y?: number; z?: number }) {
  const cam = useRef<THREE.PerspectiveCamera>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!cam.current) return;
    cam.current.position.x = Math.sin(t * 0.25) * 0.25;
    cam.current.lookAt(0, 0.9, 0);
  });
  return <PerspectiveCamera ref={cam} makeDefault position={[0, y, z]} fov={36} />;
}

function Lights({ level }: { level: React.MutableRefObject<number> }) {
  const spot = useRef<THREE.SpotLight>(null);
  const amb = useRef<THREE.AmbientLight>(null);
  useFrame(() => {
    if (spot.current) spot.current.intensity = 40 + 160 * level.current;
    if (amb.current) amb.current.intensity = 0.55 + 0.6 * level.current;
  });
  return (
    <>
      <ambientLight ref={amb} color="#ffd9c2" />
      <hemisphereLight args={["#ffe2c4", "#3a0a12", 0.8]} />
      <pointLight position={[-3, 2, 2]} intensity={12} color="#ff9e6b" distance={9} />
      <spotLight ref={spot} position={[0, 4.5, 3]} angle={0.55} penumbra={0.8} color="#ffd39a" castShadow={false} />
    </>
  );
}

/* ─── Vitrine 1 : le sapin sur son plateau tournant ───────────── */
function SceneSapins({ active }: { active: boolean }) {
  const level = useLight(active);
  const tree = useRef<THREE.Group>(null);
  const bulbs = useMemo(() => {
    const out: [number, number, number][] = [];
    for (let i = 0; i < 46; i++) {
      const t = i / 46;
      const y = 0.15 + t * 2.1;
      const r = 1.05 * (1 - t) + 0.08;
      const a = t * Math.PI * 9;
      out.push([Math.cos(a) * r, y, Math.sin(a) * r]);
    }
    return out;
  }, []);
  useFrame((_, dt) => {
    if (tree.current) tree.current.rotation.y += dt * (0.15 + 0.35 * level.current);
  });
  return (
    <>
      <Camera />
      <Lights level={level} />
      <Decor />
      <group ref={tree} position={[0, -0.45, 0]}>
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[1.35, 1.45, 0.16, 48]} />
          <meshStandardMaterial color={C.laiton} metalness={0.7} roughness={0.35} />
        </mesh>
        {[
          [0.55, 1.3, 1.1],
          [1.15, 1.05, 0.85],
          [1.7, 0.8, 0.7],
          [2.15, 0.5, 0.55],
        ].map(([y, r, hgt], i) => (
          <mesh key={i} position={[0, y, 0]}>
            <coneGeometry args={[r, hgt, 9]} />
            <meshStandardMaterial color={i % 2 ? C.sapin : C.sapinFonce} roughness={0.8} flatShading />
          </mesh>
        ))}
        {bulbs.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.045, 10, 10]} />
            <meshBasicMaterial color={C.lampion} toneMapped={false} />
          </mesh>
        ))}
        <mesh position={[0, 2.62, 0]}>
          <octahedronGeometry args={[0.16]} />
          <meshBasicMaterial color="#ffe29a" toneMapped={false} />
        </mesh>
        {[
          [-0.95, 0.12, 0.7, C.velours],
          [0.85, 0.1, 0.8, C.givre],
          [0.15, 0.09, 1.05, C.sapin],
        ].map(([x, y, z, col], i) => (
          <mesh key={i} position={[x as number, (y as number) + 0.05, z as number]} rotation={[0, i * 0.7, 0]}>
            <boxGeometry args={[0.36, 0.3, 0.36]} />
            <meshStandardMaterial color={col as string} roughness={0.6} />
          </mesh>
        ))}
      </group>
    </>
  );
}

/* ─── Vitrine 2 : rideau de guirlandes qui s'allument en vagues ─ */
function SceneGuirlandes({ active }: { active: boolean }) {
  const level = useLight(active);
  const strands = 6;
  const per = 26;
  const inst = useRef<THREE.InstancedMesh>(null);
  const { positions, wires } = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const wires: THREE.Vector3[][] = [];
    for (let s = 0; s < strands; s++) {
      const y0 = 2.6 - s * 0.42;
      const sag = 0.28 + (s % 2) * 0.1;
      const wire: THREE.Vector3[] = [];
      for (let i = 0; i <= 40; i++) {
        const t = i / 40;
        const x = -2.1 + t * 4.2;
        wire.push(new THREE.Vector3(x, y0 - Math.sin(t * Math.PI) * sag, -0.4 + s * 0.12));
      }
      wires.push(wire);
      for (let i = 0; i < per; i++) {
        const t = (i + 0.5) / per;
        const x = -2.1 + t * 4.2;
        positions.push(new THREE.Vector3(x, y0 - Math.sin(t * Math.PI) * sag - 0.05, -0.4 + s * 0.12));
      }
    }
    return { positions, wires };
  }, []);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    positions.forEach((p, i) => {
      m.setPosition(p);
      inst.current?.setMatrixAt(i, m);
    });
    if (inst.current) inst.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  const col = useMemo(() => new THREE.Color(), []);
  const warm = useMemo(() => new THREE.Color("#ffd27a"), []);
  const dim = useMemo(() => new THREE.Color("#3a1408"), []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const mesh = inst.current;
    if (!mesh) return;
    positions.forEach((p, i) => {
      const s = Math.floor(i / per);
      const wave = Math.max(0, Math.sin(t * 2.2 - p.x * 1.6 + s * 0.9));
      const k = (0.2 + 0.8 * wave) * (0.35 + 0.65 * level.current);
      col.copy(dim).lerp(warm, k).multiplyScalar(0.6 + k * 1.6);
      mesh.setColorAt(i, col);
    });
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <>
      <Camera y={1.3} z={5.4} />
      <Lights level={level} />
      <Decor floor="#4d2818" />
      {wires.map((w, i) => (
        <Line key={i} points={w} color="#1b0c08" lineWidth={1.2} />
      ))}
      <instancedMesh ref={inst} args={[undefined, undefined, positions.length]}>
        <sphereGeometry args={[0.055, 10, 10]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      {/* Paquet posé au sol pour donner l'échelle */}
      <mesh position={[1.2, -0.35, 0.6]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={C.velours} />
      </mesh>
    </>
  );
}

/* ─── Vitrine 3 : boules suspendues qui se balancent ──────────── */
function Bauble({
  x,
  len,
  color,
  r,
  phase,
  level,
}: {
  x: number;
  len: number;
  color: string;
  r: number;
  phase: number;
  level: React.MutableRefObject<number>;
}) {
  const pivot = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!pivot.current) return;
    const t = clock.elapsedTime;
    const amp = 0.05 + 0.13 * level.current;
    pivot.current.rotation.z = Math.sin(t * (1.6 / Math.sqrt(len)) + phase) * amp;
    pivot.current.rotation.x = Math.cos(t * 1.1 + phase) * amp * 0.4;
  });
  return (
    <group ref={pivot} position={[x, 3.2, 0]}>
      <mesh position={[0, -len / 2, 0]}>
        <cylinderGeometry args={[0.006, 0.006, len, 4]} />
        <meshBasicMaterial color={C.laiton} />
      </mesh>
      <mesh position={[0, -len - r * 0.95, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.08, 12]} />
        <meshStandardMaterial color={C.laiton} metalness={1} roughness={0.3} />
      </mesh>
      <mesh position={[0, -len - r - 0.02, 0]}>
        <sphereGeometry args={[r, 28, 28]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.12} envMapIntensity={1.4} />
      </mesh>
    </group>
  );
}

function SceneBoules({ active, lite = false }: { active: boolean; lite?: boolean }) {
  const level = useLight(active);
  const balls = [
    { x: -1.6, len: 1.1, color: "#9e1b26", r: 0.28 },
    { x: -0.95, len: 1.9, color: C.lampion, r: 0.22 },
    { x: -0.3, len: 0.8, color: C.givre, r: 0.34 },
    { x: 0.35, len: 1.6, color: "#9e1b26", r: 0.3 },
    { x: 0.95, len: 1.1, color: C.sapin, r: 0.24 },
    { x: 1.55, len: 2.0, color: C.lampion, r: 0.27 },
  ];
  return (
    <>
      <Camera y={1.2} z={5.6} />
      <Lights level={level} />
      <Environment resolution={lite ? 32 : 128} frames={1}>
        <Lightformer intensity={3} color="#ffd39a" position={[0, 3, 3]} scale={[6, 2, 1]} />
        <Lightformer intensity={1.5} color="#ff9a7a" position={[-4, 1, 1]} scale={[2, 4, 1]} />
        <Lightformer intensity={0.6} color="#9fd0ff" position={[4, 1, -2]} scale={[2, 3, 1]} />
      </Environment>
      <Decor />
      {balls.map((b, i) => (
        <Bauble key={i} {...b} phase={i * 1.3} level={level} />
      ))}
    </>
  );
}

/* ─── Vitrine 4 : la table du réveillon aux bougies ───────────── */
function Candle({ x, z, h, seed }: { x: number; z: number; h: number; seed: number }) {
  const flame = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 9 + seed * 10;
    const f = 0.85 + Math.sin(t) * 0.08 + Math.sin(t * 2.7) * 0.06;
    if (flame.current) flame.current.scale.set(1, f, 1);
    if (light.current) light.current.intensity = 2.2 * f;
  });
  return (
    <group position={[x, 0.36, z]}>
      <mesh position={[0, h / 2, 0]}>
        <cylinderGeometry args={[0.07, 0.07, h, 16]} />
        <meshStandardMaterial color="#f5ecd9" roughness={0.7} />
      </mesh>
      <mesh ref={flame} position={[0, h + 0.09, 0]}>
        <coneGeometry args={[0.035, 0.14, 10]} />
        <meshBasicMaterial color="#ffd27a" toneMapped={false} />
      </mesh>
      <pointLight ref={light} position={[0, h + 0.15, 0]} color="#ffb35c" distance={2.4} decay={2} />
    </group>
  );
}

function SceneTable({ active }: { active: boolean }) {
  const level = useLight(active);
  return (
    <>
      <Camera y={1.9} z={4.6} />
      <Lights level={level} />
      <Decor floor="#4a2416" />
      {/* Table et nappe */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[3.6, 0.12, 1.8]} />
        <meshStandardMaterial color={C.givre} roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.315, 0]}>
        <boxGeometry args={[3.6, 0.01, 0.42]} />
        <meshStandardMaterial color={C.velours} roughness={0.9} />
      </mesh>
      {[-1.5, 1.5].map((x) => (
        <mesh key={x} position={[x, -0.2, 0]}>
          <boxGeometry args={[0.12, 0.8, 1.5]} />
          <meshStandardMaterial color={C.bois} />
        </mesh>
      ))}
      {/* Assiettes */}
      {[-1.15, -0.4, 0.4, 1.15].flatMap((x) =>
        [-0.6, 0.6].map((z) => (
          <group key={`${x}${z}`} position={[x, 0.33, z]}>
            <mesh>
              <cylinderGeometry args={[0.22, 0.2, 0.02, 32]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.012, 0]}>
              <torusGeometry args={[0.18, 0.006, 6, 40]} />
              <meshStandardMaterial color={C.laiton} metalness={1} roughness={0.3} />
            </mesh>
          </group>
        ))
      )}
      {/* Centre de table : couronne de sapin, baies, bougies */}
      <mesh position={[0, 0.37, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.36, 0.09, 10, 36]} />
        <meshStandardMaterial color={C.sapin} roughness={0.9} flatShading />
      </mesh>
      {Array.from({ length: 9 }, (_, i) => {
        const a = (i / 9) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.4, 0.45, Math.sin(a) * 0.4]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#b3161f" roughness={0.4} />
          </mesh>
        );
      })}
      <Candle x={-0.12} z={0} h={0.42} seed={1} />
      <Candle x={0.13} z={0.06} h={0.3} seed={2} />
      <Candle x={0.02} z={-0.13} h={0.22} seed={3} />
    </>
  );
}

/* ─── Vitrine 5 : la porte d'entrée enneigée ──────────────────── */
function SceneExterieur({ active }: { active: boolean }) {
  const level = useLight(active);
  const lanterns = useRef<THREE.Group>(null);
  const roofBulbs = useMemo(
    () => Array.from({ length: 22 }, (_, i) => -2 + (i / 21) * 4),
    []
  );
  useFrame(({ clock }) => {
    if (!lanterns.current) return;
    const t = clock.elapsedTime;
    lanterns.current.children.forEach((c, i) => {
      const m = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
      if (m?.color) m.color.setScalar(0.7 + 0.3 * Math.sin(t * 3 + i) * level.current);
    });
  });
  return (
    <>
      <Camera y={1.2} z={5.4} />
      <Lights level={level} />
      {/* Façade de maison */}
      <mesh position={[0, 1.2, -1.2]}>
        <planeGeometry args={[6, 4.4]} />
        <meshStandardMaterial color="#6d5a4c" roughness={1} />
      </mesh>
      {/* Porte */}
      <mesh position={[0, 0.55, -1.15]}>
        <boxGeometry args={[1.1, 2.2, 0.08]} />
        <meshStandardMaterial color={C.sapinFonce} roughness={0.6} />
      </mesh>
      <mesh position={[0.38, 0.5, -1.08]}>
        <sphereGeometry args={[0.04, 10, 10]} />
        <meshStandardMaterial color={C.laiton} metalness={1} roughness={0.3} />
      </mesh>
      {/* Couronne + nœud */}
      <mesh position={[0, 1.05, -1.05]}>
        <torusGeometry args={[0.3, 0.09, 10, 32]} />
        <meshStandardMaterial color={C.sapin} roughness={0.9} flatShading />
      </mesh>
      <mesh position={[0, 0.75, -1.0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.14, 0.14, 0.04]} />
        <meshStandardMaterial color="#b3161f" />
      </mesh>
      {/* Guirlande sous l'avant-toit */}
      {roofBulbs.map((x, i) => (
        <mesh key={i} position={[x, 3.0 - Math.sin(((x + 2) / 4) * Math.PI) * 0.18, -1.0]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color={i % 2 ? "#ffd27a" : "#fff1c9"} toneMapped={false} />
        </mesh>
      ))}
      {/* Lanternes au sol */}
      <group ref={lanterns}>
        {[-1.2, 1.2].map((x) => (
          <mesh key={x} position={[x, -0.25, -0.5]}>
            <boxGeometry args={[0.24, 0.36, 0.24]} />
            <meshBasicMaterial color="#ffc766" toneMapped={false} />
          </mesh>
        ))}
      </group>
      {/* Petits sapins enneigés */}
      {[-2.1, 2.1].map((x) => (
        <group key={x} position={[x, -0.6, -0.6]}>
          <mesh position={[0, 0.7, 0]}>
            <coneGeometry args={[0.5, 1.4, 8]} />
            <meshStandardMaterial color={C.sapinFonce} flatShading />
          </mesh>
          <mesh position={[0, 1.05, 0]}>
            <coneGeometry args={[0.3, 0.5, 8]} />
            <meshStandardMaterial color={C.givre} flatShading />
          </mesh>
        </group>
      ))}
      {/* Sol enneigé */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#e9eef2" roughness={1} />
      </mesh>
    </>
  );
}

export function VitrineScene({ scene, active, lite = false }: { scene: SceneKey; active: boolean; lite?: boolean }) {
  switch (scene) {
    case "sapins":
      return <SceneSapins active={active} />;
    case "guirlandes":
      return <SceneGuirlandes active={active} />;
    case "boules":
      return <SceneBoules active={active} lite={lite} />;
    case "table":
      return <SceneTable active={active} />;
    case "exterieur":
      return <SceneExterieur active={active} />;
  }
}
