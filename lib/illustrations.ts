import data from "@/data/illustrations.json";
import type { SceneKey } from "@/data/rayons";

export type IllusKind = keyof typeof data;
export type IllusElement = { d: string; fill: boolean };

export const ILLUSTRATIONS = data as Record<IllusKind, IllusElement[]>;

/** Dessin associé à un produit, déduit de son nom (repli : le dessin du rayon). */
export function illusForProduct(name: string, rayon: string): IllusKind {
  const n = name.toLowerCase();
  const rules: [RegExp, IllusKind][] = [
    [/cache-pied|jupe/, "jupe"],
    [/pied|support/, "pied"],
    [/sapin/, "sapin"],
    [/rideau/, "rideau"],
    [/guinguette|g40/, "guinguette"],
    [/guirlande/, "guirlande"],
    [/cimier|étoile/, "cimier"],
    [/boule/, "boules"],
    [/chemin de table/, "chemin"],
    [/centre de table/, "centre"],
    [/bougie/, "bougies"],
    [/couronne/, "couronne"],
    [/lanterne/, "lanterne"],
  ];
  for (const [re, kind] of rules) if (re.test(n)) return kind;
  const byRayon: Record<string, IllusKind> = {
    "Sapins & pieds": "sapin",
    "Guirlandes & lumières": "guirlande",
    "Boules & suspensions": "boules",
    "Table de Noël": "centre",
    "Déco extérieure": "couronne",
  };
  return byRayon[rayon] ?? "sapin";
}

/** Dessin principal d'une vitrine (affiché quand la 3D n'est pas disponible). */
export const ILLUS_BY_SCENE: Record<SceneKey, IllusKind> = {
  sapins: "sapin",
  guirlandes: "guirlande",
  boules: "boules",
  table: "centre",
  exterieur: "couronne",
};
