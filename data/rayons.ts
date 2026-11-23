export type SceneKey = "sapins" | "guirlandes" | "boules" | "village" | "table" | "exterieur";

export type Rayon = {
  /** Adresse de la page : /{slug} */
  slug: string;
  /** Nom exact utilisé dans la colonne « Rayon » du tableur */
  name: string;
  /** Lettrage doré sur la vitrine */
  enseigne: string;
  /** Titre de la page rayon (h1) */
  title: string;
  /** Titre pour les moteurs de recherche et Pinterest */
  seoTitle: string;
  /** Une phrase concrète : ce qu'on trouve dans le rayon */
  intro: string;
  /** Texte de conseil (environ 150 mots), un paragraphe par entrée */
  texte: string[];
  /** Guide de l'Espace Inspiration lié à ce rayon */
  guide: { ancre: string; label: string };
  /** Scène 3D jouée derrière la vitre */
  scene: SceneKey;
};

export const RAYONS: Rayon[] = [
  {
    slug: "sapins",
    name: "Sapins & pieds",
    enseigne: "Les sapins",
    title: "Sapins et pieds de sapin",
    seoTitle: "Sapin de Noël artificiel 2026 : floqué, 180 cm, pieds et jupes",
    intro: "Sapins artificiels de 150 à 210 cm, sapins floqués effet neige, pieds réglables et jupes pour cacher le pied.",
    texte: [
      "Le sapin décide de tout le reste : sa hauteur, sa densité et sa couleur fixent la taille des boules, la longueur de la guirlande et l'ambiance de la pièce. Pour un salon avec 2,50 m sous plafond, un sapin de 180 cm laisse la place au cimier sans toucher le plafond.",
      "Le sapin floqué, saupoudré de neige artificielle, est la grande tendance de cette année. Il donne tout de suite un air de « winter wonderland » et met en valeur les décorations dorées et champagne. Le sapin vert classique reste le plus polyvalent : il accepte toutes les palettes.",
      "Comptez au moins 500 pointes de branches pour 180 cm si vous voulez un sapin bien fourni. Les sapins à branches articulées se montent en dix minutes et se rangent dans leur sac. Terminez avec une jupe ou un panier qui cache le pied : c'est le détail qui fait passer un sapin de « correct » à « photo ».",
    ],
    guide: { ancre: "guide-sapin", label: "Décorer son sapin en 5 étapes" },
    scene: "sapins",
  },
  {
    slug: "guirlandes",
    name: "Guirlandes & lumières",
    enseigne: "Les lumières",
    title: "Guirlandes et rideaux lumineux",
    seoTitle: "Guirlande lumineuse de Noël 2026 : LED blanc chaud, rideaux, fil cuivre",
    intro: "Guirlandes LED blanc chaud de 10 à 30 m, fils cuivre, rideaux d'étoiles pour les fenêtres et guinguettes.",
    texte: [
      "La lumière fait la moitié d'une décoration de Noël réussie. Les photos qu'on enregistre sur Pinterest ont presque toutes le même point commun : une lumière chaude, généreuse et bien répartie.",
      "Pour le sapin, comptez environ 100 LED par tranche de 30 cm de hauteur, soit 600 LED (une trentaine de mètres) pour 180 cm. Choisissez du blanc chaud (2700 K environ) : le blanc froid donne vite un effet de vitrine de supermarché.",
      "Enroulez la guirlande de l'intérieur vers l'extérieur de chaque branche plutôt qu'en spirale autour du sapin : la lumière vient alors du cœur et le sapin paraît plus profond. Les rideaux lumineux transforment une fenêtre ou un mur nu en décor en deux minutes. Les fils cuivre à micro-LED se glissent dans un bocal, une couronne ou un centre de table. Préférez les modèles avec minuteur : ils s'allument seuls chaque soir.",
    ],
    guide: { ancre: "guide-erreurs", label: "Les 7 erreurs qui gâchent un sapin" },
    scene: "guirlandes",
  },
  {
    slug: "boules",
    name: "Boules & suspensions",
    enseigne: "Les boules",
    title: "Boules et cimiers",
    seoTitle: "Boules de Noël 2026 : lots incassables or, champagne, rouge et cimiers",
    intro: "Lots de boules incassables or, champagne, rouge et blanc, et étoiles pour la pointe du sapin.",
    texte: [
      "Un sapin qui a l'air cher n'a pas forcément coûté cher : tout se joue dans la cohérence des couleurs. Choisissez deux ou trois teintes et tenez-vous-y. Or et champagne pour un Noël glamour, rouge et vert sapin pour un Noël traditionnel, blanc et argent pour un Noël givré.",
      "Mélangez les tailles et les finitions : des grosses boules de 8 cm à l'intérieur des branches pour donner de la profondeur, des moyennes de 6 cm au bord, et des petites de 3 cm pour combler les vides. Associez des finitions brillantes, mates et pailletées dans la même couleur.",
      "Pour un sapin de 180 cm, prévoyez 60 à 80 boules. Les lots incassables en plastique sont parfaits si vous avez des enfants ou un chat. Le cimier se choisit en dernier, dans la couleur dominante.",
    ],
    guide: { ancre: "guide-palettes", label: "Les palettes de Noël 2026" },
    scene: "boules",
  },
  {
    slug: "figurines",
    name: "Villages & figurines",
    enseigne: "Le village",
    title: "Villages, figurines et calendriers de l'Avent",
    seoTitle: "Village de Noël lumineux et calendrier de l'Avent 2026 : maisons LED, casse-noisettes",
    intro: "Calendriers de l'Avent à remplir, maisons de village lumineuses, casse-noisettes et figurines pour la cheminée ou le buffet.",
    texte: [
      "Le village de Noël est la décoration qu'on regarde de près. Posé sur une cheminée, un buffet ou le rebord d'une fenêtre, il raconte une petite histoire : des maisons enneigées, des fenêtres allumées, des personnages qui patinent ou rentrent du marché.",
      "Commencez petit avec trois ou quatre maisons lumineuses à LED, puis agrandissez le village d'année en année : c'est une tradition que les enfants adorent. Pour un rendu réaliste, posez les maisons sur un tapis de neige artificielle, ajoutez quelques sapins miniatures et variez les hauteurs avec des livres cachés sous la neige.",
      "Les casse-noisettes et les figurines en bois apportent une touche classique et se gardent des années. Choisissez des maisons à piles avec minuteur : pas de fil à cacher, et elles s'allument seules chaque soir.",
      "Et pour patienter jusqu'au 25, le calendrier de l'Avent à remplir : en tissu, en papier ou en bois, il se garde d'une année sur l'autre et décore le salon tout le mois de décembre.",
    ],
    guide: { ancre: "guide-styles", label: "4 styles de Noël pour votre salon" },
    scene: "village",
  },
  {
    slug: "table-de-noel",
    name: "Table de Noël",
    enseigne: "La table",
    title: "La table du réveillon",
    seoTitle: "Décoration de table de Noël 2026 : chemins, centres de table, bougies LED",
    intro: "Chemins de table, centres de table à bougies, bougies LED sans flamme et vaisselle de fête.",
    texte: [
      "La table du réveillon est la photo que tout le monde prend. Elle se construit en trois couches : une base (nappe ou chemin de table), un centre (couronne, bougeoirs ou branchages) et des détails à chaque place (serviette pliée, petite boule, étiquette avec le prénom).",
      "Gardez le centre de table bas, sous 30 cm, pour que les invités se voient et se parlent. Les bougies LED sans flamme donnent la même lumière chaude que de vraies bougies, sans risque au milieu des branches de sapin et des serviettes en papier.",
      "Reprenez les couleurs du sapin sur la table : c'est ce qui donne l'impression d'une maison décorée par un professionnel. Un chemin de table doré sur une nappe blanche, quelques boules champagne posées entre les verres, et la table est prête.",
    ],
    guide: { ancre: "guide-palettes", label: "Les palettes de Noël 2026" },
    scene: "table",
  },
  {
    slug: "exterieur",
    name: "Déco extérieure",
    enseigne: "Le jardin",
    title: "Porte d'entrée et jardin",
    seoTitle: "Décoration de Noël extérieure 2026 : couronnes de porte, guirlandes IP44",
    intro: "Couronnes de porte, guirlandes étanches IP44, lanternes et projecteurs pour l'extérieur.",
    texte: [
      "La porte d'entrée est la première chose que vos invités voient. Une couronne bien fournie, une guirlande le long de l'encadrement et deux lanternes de chaque côté suffisent à transformer une entrée ordinaire.",
      "Dehors, vérifiez toujours l'indice de protection : IP44 au minimum pour une guirlande exposée à la pluie, IP65 pour ce qui reste au sol ou dans la neige. Les modèles solaires évitent de tirer une rallonge, mais ils éclairent moins longtemps en décembre, quand les jours sont courts.",
      "Pour un balcon ou une terrasse, les guirlandes guinguette à grosses ampoules donnent un air de marché de Noël. Sur une façade, un rideau lumineux le long de la gouttière fait plus d'effet que dix petites décorations éparpillées. Choisissez une seule couleur de lumière pour toute la façade.",
    ],
    guide: { ancre: "guide-erreurs", label: "Les 7 erreurs qui gâchent un sapin" },
    scene: "exterieur",
  },
];

export function getRayon(slug: string): Rayon | undefined {
  return RAYONS.find((r) => r.slug === slug);
}
