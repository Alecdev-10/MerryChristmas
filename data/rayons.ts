export type Rayon = {
  /** Adresse de la page : /{slug} */
  slug: string;
  /** Nom exact utilisé dans la colonne « Rayon » du tableur */
  name: string;
  title: string;
  intro: string;
  /** Couleur d'accent (vitrine 3D + cartes) */
  color: string;
};

export const RAYONS: Rayon[] = [
  {
    slug: "sapins",
    name: "Sapins & pieds",
    title: "Sapins de Noël et pieds de sapin",
    intro: "Sapins artificiels, pieds stables et cache-pieds pour un sapin qui tient toute la saison.",
    color: "#1f6b3a",
  },
  {
    slug: "guirlandes",
    name: "Guirlandes & lumières",
    title: "Guirlandes lumineuses de Noël",
    intro: "Guirlandes LED, rideaux lumineux et déco qui brille, pour l'intérieur comme pour la chambre.",
    color: "#d9a520",
  },
  {
    slug: "boules",
    name: "Boules & suspensions",
    title: "Boules de Noël et suspensions",
    intro: "Boules, étoiles et suspensions pour habiller le sapin, en rouge et or ou tout en blanc.",
    color: "#b3261e",
  },
  {
    slug: "table-de-noel",
    name: "Table de Noël",
    title: "Décoration de table de Noël",
    intro: "Centres de table, chemins de table et bougies pour un repas de fête chaleureux.",
    color: "#8a5a2b",
  },
  {
    slug: "exterieur",
    name: "Déco extérieure",
    title: "Décoration de Noël extérieure",
    intro: "Couronnes de porte, illuminations de jardin et déco de balcon résistantes à l'humidité.",
    color: "#2f5d8a",
  },
];

export function getRayon(slug: string): Rayon | undefined {
  return RAYONS.find((r) => r.slug === slug);
}
