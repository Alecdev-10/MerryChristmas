import data from "@/data/ambiance.json";

type Photo = { src: string; page: string };
const PHOTOS = data as Record<string, Photo>;

/**
 * Photos d'ambiance libres (licence Unsplash). Elles illustrent un type de décoration
 * et ne représentent jamais le produit vendu : elles sont toujours légendées comme telles.
 * Dès que l'API Amazon sera ouverte (3 ventes), `product.image` prendra le relais sur les étiquettes.
 */
export function ambiance(key: string, w = 600, h = 600): string | null {
  const p = PHOTOS[key];
  return p ? `${p.src}?w=${w}&h=${h}&fit=crop&auto=format&q=70` : null;
}

export function ambiancePage(key: string): string | null {
  return PHOTOS[key]?.page ?? null;
}
