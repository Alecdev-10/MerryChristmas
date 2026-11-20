import raw from "@/data/products.json";
import { RAYONS } from "@/data/rayons";

export type Product = {
  id: string;
  name: string;
  /** Nom du rayon, identique à data/rayons.ts */
  rayon: string;
  url: string;
  price: number | null;
  image: string | null;
  status: string;
  /** true = produit d'exemple, à remplacer par un vrai produit */
  example?: boolean;
};

const products = raw as Product[];

const VISIBLE = new Set(["Validé", "En ligne"]);

/** Produits affichés d'un rayon (statut « Validé » ou « En ligne »). */
export function getProductsByRayon(slug: string): Product[] {
  const rayon = RAYONS.find((r) => r.slug === slug);
  if (!rayon) return [];
  return products.filter((p) => p.rayon === rayon.name && VISIBLE.has(p.status));
}
