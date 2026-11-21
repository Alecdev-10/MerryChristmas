export type SceneKey = "sapins" | "guirlandes" | "boules" | "table" | "exterieur";

export type Rayon = {
  /** Adresse de la page : /{slug} */
  slug: string;
  /** Nom exact utilisé dans la colonne « Rayon » du tableur */
  name: string;
  /** Lettrage doré sur la vitrine */
  enseigne: string;
  /** Titre de la page rayon */
  title: string;
  /** Une phrase concrète : ce qu'on trouve dans le rayon */
  intro: string;
  /** Scène 3D jouée derrière la vitre */
  scene: SceneKey;
};

export const RAYONS: Rayon[] = [
  {
    slug: "sapins",
    name: "Sapins & pieds",
    enseigne: "Les sapins",
    title: "Sapins et pieds de sapin",
    intro: "Sapins artificiels de 180 cm, pieds réglables et jupes pour cacher le pied.",
    scene: "sapins",
  },
  {
    slug: "guirlandes",
    name: "Guirlandes & lumières",
    enseigne: "Les lumières",
    title: "Guirlandes et rideaux lumineux",
    intro: "Guirlandes LED blanc chaud de 10 à 20 m, et rideaux d'étoiles pour les fenêtres.",
    scene: "guirlandes",
  },
  {
    slug: "boules",
    name: "Boules & suspensions",
    enseigne: "Les boules",
    title: "Boules et cimiers",
    intro: "Lots de boules incassables rouge et or, et étoiles pour la pointe du sapin.",
    scene: "boules",
  },
  {
    slug: "table-de-noel",
    name: "Table de Noël",
    enseigne: "La table",
    title: "La table du réveillon",
    intro: "Chemins de table, centres de table à bougies et bougies LED sans flamme.",
    scene: "table",
  },
  {
    slug: "exterieur",
    name: "Déco extérieure",
    enseigne: "Le jardin",
    title: "Porte d'entrée et jardin",
    intro: "Couronnes de porte, guirlandes étanches IP44 et lanternes pour l'extérieur.",
    scene: "exterieur",
  },
];

export function getRayon(slug: string): Rayon | undefined {
  return RAYONS.find((r) => r.slug === slug);
}
