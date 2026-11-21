"use client";

import { useSyncExternalStore } from "react";

/**
 * Niveau de rendu selon l'appareil :
 * - full   : tout (3D en pleine définition, neige dense)
 * - lite   : téléphone modeste ou économie de données → 3D allégée, moins de neige
 * - static : pas de WebGL, ou mouvement réduit demandé, ou la 3D rame → dessins à la place de la 3D
 */
export type Tier = "full" | "lite" | "static";

type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function detect(): Tier {
  if (typeof window === "undefined") return "full";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";
  if (!hasWebGL()) return "static";
  const nav = navigator as Nav;
  const mem = nav.deviceMemory;
  const cores = nav.hardwareConcurrency;
  const small = window.matchMedia("(max-width: 760px)").matches;
  if (nav.connection?.saveData) return "lite";
  if ((mem && mem <= 4) || (cores && cores <= 4)) return "lite";
  if (small && (!mem || mem <= 6)) return "lite";
  return "full";
}

let current: Tier | null = null;
const listeners = new Set<() => void>();

export function getTier(): Tier {
  if (current === null) current = detect();
  return current;
}

/** Descend d'un niveau (appelé quand la 3D n'arrive pas à tenir le rythme). Ne remonte jamais. */
export function downgradeTier() {
  const t = getTier();
  const next: Tier = t === "full" ? "lite" : "static";
  if (next === t) return;
  current = next;
  listeners.forEach((l) => l());
}

export function useTier(): Tier {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    getTier,
    () => "full"
  );
}
