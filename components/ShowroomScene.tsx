"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import type { Group, Points } from "three";
import { RAYONS, type Rayon } from "@/data/rayons";

const RADIUS = 4.2;

function Tree() {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.7, 12]} />
        <meshStandardMaterial color="#6b4423" />
      </mesh>
      {[
        { y: 1.1, r: 1.3, h: 1.4 },
        { y: 1.9, r: 1.0, h: 1.2 },
        { y: 2.6, r: 0.7, h: 1.0 },
      ].map((l, i) => (
        <mesh key={i} position={[0, l.y, 0]}>
          <coneGeometry args={[l.r, l.h, 24]} />
          <meshStandardMaterial color="#1f6b3a" />
        </mesh>
      ))}
      <mesh position={[0, 3.25, 0]}>
        <octahedronGeometry args={[0.22]} />
        <meshStandardMaterial color="#f2c14e" emissive="#f2c14e" emissiveIntensity={0.8} />
      </mesh>
      {/* Boules décoratives */}
      {[
        [0.7, 1.0, 0.75, "#b3261e"],
        [-0.8, 1.2, 0.5, "#d9a520"],
        [0.3, 1.8, -0.8, "#b3261e"],
        [-0.5, 2.3, 0.4, "#d9a520"],
        [0.55, 2.1, 0.45, "#ffffff"],
      ].map(([x, y, z, c], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color={c as string} metalness={0.4} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Stand({ rayon, angle, onOpen }: { rayon: Rayon; angle: number; onOpen: (slug: string) => void }) {
  const [hover, setHover] = useState(false);
  const ref = useRef<Group>(null);
  const x = Math.sin(angle) * RADIUS;
  const z = Math.cos(angle) * RADIUS;

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * (hover ? 1.6 : 0.4);
  });

  return (
    <group position={[x, 0, z]}>
      {/* Socle */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.8, 0.9, 0.3, 32]} />
        <meshStandardMaterial color="#f4ead8" />
      </mesh>
      {/* Paquet cadeau aux couleurs du rayon */}
      <group
        ref={ref}
        position={[0, 0.75, 0]}
        scale={hover ? 1.12 : 1}
        onClick={(e) => {
          e.stopPropagation();
          onOpen(rayon.slug);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = "auto";
        }}
      >
        <mesh>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial color={rayon.color} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.95, 0.95, 0.18]} />
          <meshStandardMaterial color="#f2c14e" />
        </mesh>
        <mesh>
          <boxGeometry args={[0.18, 0.95, 0.95]} />
          <meshStandardMaterial color="#f2c14e" />
        </mesh>
      </group>
      <Html position={[0, 1.65, 0]} center zIndexRange={[10, 0]}>
        <button type="button" className="showroom-label" onClick={() => onOpen(rayon.slug)}>
          {rayon.name}
        </button>
      </Html>
    </group>
  );
}

function Snow({ count = 400 }: { count?: number }) {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = Math.random() * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    const p = ref.current;
    if (!p) return;
    const pos = p.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) - dt * 0.6;
      if (y < 0) y = 8;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.06} transparent opacity={0.85} />
    </points>
  );
}

export default function ShowroomScene() {
  const router = useRouter();
  const open = (slug: string) => {
    document.body.style.cursor = "auto";
    router.push(`/${slug}`);
  };

  return (
    <Canvas camera={{ position: [0, 4.5, 10], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.1} />
      <pointLight position={[0, 3.3, 0]} intensity={2} color="#f2c14e" distance={6} />

      {/* Sol enneigé */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[7, 48]} />
        <meshStandardMaterial color="#eef3f0" />
      </mesh>

      <Tree />
      {RAYONS.map((r, i) => (
        <Stand key={r.slug} rayon={r} angle={(i / RAYONS.length) * Math.PI * 2} onOpen={open} />
      ))}
      <Snow />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.3}
        target={[0, 1.2, 0]}
      />
    </Canvas>
  );
}
