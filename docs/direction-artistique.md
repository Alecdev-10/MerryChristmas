# Direction artistique — MerryChristmas v2

Statut : **proposition à valider** avant la refonte.

## Concept : « Les vitrines du boulevard »

Les 5 rayons deviennent les **5 vitrines de Noël d'un grand magasin parisien**, la nuit. Le visiteur descend le boulevard en scrollant : chaque vitrine s'allume à son passage, sa scène s'anime, et un clic fait « entrer » dans la vitrine, c'est-à-dire sur la page du rayon.

C'est la référence la plus juste pour le sujet : en France, la déco de Noël se regarde d'abord en vitrine (Galeries Lafayette, Printemps…). Ça répond aussi au brief d'origine (« boutique 3D, 5 rayons, une adresse par rayon »).

L'audace est concentrée **à un seul endroit** : la promenade devant les vitrines. Le reste (pages rayon, mentions, pied de page) reste calme et lisible.

## Palette

| Nom | Hex | Rôle |
| --- | --- | --- |
| Velours | `#4A0D16` | Fond principal, la façade du magasin |
| Velours profond | `#2A070D` | Fond des vitrines éteintes, ombres |
| Givre | `#F3EEF2` | Texte principal (blanc légèrement rosé, pas crème) |
| Lampion | `#F2B544` | Ampoules, lumière, actions principales |
| Sapin bleuté | `#1E4C4A` | Décor des scènes, états secondaires |
| Laiton | `#B38A4D` | Filets, prix, détails des étiquettes |

Pourquoi : un rouge velours de rideau de vitrine plutôt que le combo crème / vert forêt des sites IA. La lumière vient des ampoules (Lampion), pas de dégradés ni de lueurs néon.

## Typographie

- **Titres : Bodoni Moda** (Google Fonts, variable, axe optique). Le Didone des enseignes et catalogues de grands magasins parisiens. Utilisé grand, en romain, avec beaucoup d'air.
- **Texte : Jost** (Google Fonts). Une géométrique héritée de Futura, contemporaine des vitrines Art déco. Lisible en petit, et ce n'est pas Inter.
- Échelle à ratio 1,333 (quarte) : 14 / 18 / 24 / 32 / 42 / 56 / 75 / 100 px.
- Interdits : majuscules espacées en guise de labels, un seul mot coloré dans un titre, texte en dégradé.

## Mise en page

```
ACCUEIL
┌──────────────────────────────────────────────┐
│  façade de nuit, neige                       │
│      M E R R Y  C H R I S T M A S            │  ← enseigne en ampoules,
│  (les ampoules s'allument lettre par lettre) │    1 seule animation d'entrée
└──────────────────────────────────────────────┘
        ↓ scroll : le boulevard (section épinglée, défilement horizontal)
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│vitrine │ │vitrine │ │vitrine │ │vitrine │ │vitrine │  chaque vitrine = scène 3D
│ sapins │ │guirl.  │ │ boules │ │ table  │ │ extér. │  qui s'allume quand elle
└────────┘ └────────┘ └────────┘ └────────┘ └────────┘  arrive au centre
        ↓ pied de page : mention d'affiliation, mentions légales

PAGE RAYON (« dans la vitrine »)
┌──────────────────────────────────────────────┐
│ titre du rayon, aligné à gauche, très grand  │
│ une phrase concrète                          │
├──────────────────────────────────────────────┤
│ produits = étiquettes suspendues à un fil,   │  pas de grille de cartes :
│ hauteurs décalées, prix sur l'étiquette      │  une composition libre
└──────────────────────────────────────────────┘
```

Alignement à gauche partout sauf l'enseigne. Pas de cartes arrondies : les produits sont des étiquettes en carton (coins coupés, œillet, ficelle).

## Motion (3 idées, pas plus)

1. **L'enseigne s'allume** au chargement : les ampoules s'allument une à une, avec un léger scintillement. C'est la seule animation non déclenchée par l'utilisateur.
2. **Le boulevard** : le scroll fait défiler les vitrines horizontalement. La vitrine centrale s'allume et sa scène 3D s'anime (sapin qui pivote, guirlandes qui clignotent, boules qui se balancent).
3. **Entrer dans la vitrine** : au clic, la caméra traverse la vitre, puis transition vers la page du rayon.

Au survol des produits, l'étiquette se balance sur sa ficelle. Un mouvement physique, qui répond à la souris.

`prefers-reduced-motion` : pas de scroll horizontal, vitrines en image fixe, aucune animation automatique.

## Stack technique

| Besoin | Outil |
| --- | --- |
| Timeline, scroll, texte | GSAP 3.13+ (ScrollTrigger, SplitText, Flip), désormais 100 % gratuit, plugins compris |
| Intégration React | `@gsap/react` (`useGSAP`) |
| Scroll fluide | Lenis, synchronisé avec ScrollTrigger |
| Scènes 3D | `@react-three/fiber` + `@react-three/drei` (déjà installés) |
| Lumière des ampoules | `@react-three/postprocessing` (bloom), seulement dans les vitrines |
| Polices | `next/font/google` (Bodoni Moda, Jost), auto-hébergées, pas de saut d'affichage |

Garde-fous perf (trafic Pinterest = mobile) :
- une seule scène WebGL à la fois ;
- `dpr` plafonné à 1,5 ;
- scènes chargées à l'approche ;
- version 2D si l'appareil est trop faible.

## Rédaction

Pas de « Découvrez », « Sublimez », « Transformez ». Des phrases concrètes. Par exemple, pour le rayon guirlandes : « Guirlandes LED blanc chaud, intérieures ou étanches IP44, de 10 à 20 m. »
