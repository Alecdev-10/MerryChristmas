import type { Metadata } from "next";
import Link from "next/link";
import { AFFILIATE_NOTICE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Idées déco de Noël 2026 : guides sapin, palettes, erreurs et styles",
  description:
    "Décorer son sapin en 5 étapes, les palettes de Noël 2026, les 7 erreurs à éviter et 4 styles de salon : nos guides pour une décoration de Noël réussie.",
  alternates: { canonical: "/inspiration" },
};

const PALETTES = [
  {
    nom: "Champagne et or",
    couleurs: ["#f1e4c8", "#d8b878", "#b38a4d", "#fbf7ee"],
    texte: "La palette glamour de l'année. Boules champagne mates, or brillant et touches de blanc crème.",
    sapin: "Sur un sapin floqué ou un sapin vert très fourni.",
  },
  {
    nom: "Rouge et vert sapin",
    couleurs: ["#9c1b26", "#1e4c4a", "#c9a27e", "#f3eef2"],
    texte: "Le Noël traditionnel, chaleureux et sans risque. Ajoutez du bois et du tissu écossais.",
    sapin: "Sur un sapin vert naturel, avec une guirlande blanc chaud.",
  },
  {
    nom: "Blanc givré et argent",
    couleurs: ["#ffffff", "#dfe7ec", "#a9b6c0", "#6f7f8c"],
    texte: "L'ambiance « winter wonderland » : blanc, argent, verre et beaucoup de lumière.",
    sapin: "Idéal sur un sapin floqué effet neige.",
  },
  {
    nom: "Bordeaux et cuivre",
    couleurs: ["#4a0d16", "#7a1222", "#b8733f", "#e8c9a6"],
    texte: "Plus profond et plus moderne que le rouge classique. Superbe à la lumière des bougies.",
    sapin: "Sur un sapin vert foncé, avec des rubans en velours.",
  },
];

export default function Inspiration() {
  return (
    <div className="inspiration">
      <h1 className="rayon-titre display">Espace Inspiration</h1>
      <p className="inspiration-intro">
        Quatre guides pour réussir votre décoration de Noël 2026, du choix des couleurs au dernier ruban.
      </p>
      <ul className="sommaire">
        <li><a href="#guide-sapin">Décorer son sapin en 5 étapes</a></li>
        <li><a href="#guide-palettes">Les palettes de Noël 2026</a></li>
        <li><a href="#guide-erreurs">Les 7 erreurs qui gâchent un sapin</a></li>
        <li><a href="#guide-styles">4 styles de Noël pour votre salon</a></li>
      </ul>
      <p className="rayon-note">{AFFILIATE_NOTICE}</p>

      <section id="guide-sapin" className="guide">
        <h2>Décorer son sapin en 5 étapes</h2>
        <p>
          L&apos;ordre compte plus que les décorations elles-mêmes. Suivez ces cinq étapes dans l&apos;ordre et votre
          sapin aura l&apos;air décoré par un professionnel.
        </p>
        <ol>
          <li>
            <strong>Gonflez les branches.</strong> Écartez chaque pointe une à une, de bas en haut. Comptez vingt
            minutes pour un sapin artificiel de 180 cm : c&apos;est l&apos;étape qui fait la plus grande différence.
          </li>
          <li>
            <strong>Posez la lumière en premier.</strong> Environ 100 LED par tranche de 30 cm de hauteur, en blanc
            chaud. Enroulez la guirlande de l&apos;intérieur vers le bout de chaque branche.
          </li>
          <li>
            <strong>Ajoutez une guirlande perlée ou un ruban.</strong> En vagues larges, de haut en bas, pour relier
            l&apos;ensemble.
          </li>
          <li>
            <strong>Placez les boules des plus grosses aux plus petites.</strong> Les grosses vers l&apos;intérieur
            pour la profondeur, les petites au bout des branches pour combler les vides.
          </li>
          <li>
            <strong>Finissez par le cimier et la jupe.</strong> Le cimier dans la couleur dominante, et une jupe ou un
            panier pour cacher le pied.
          </li>
        </ol>
        <p className="guide-suite">
          Tout ce qu&apos;il faut est dans les vitrines <Link href="/sapins">Sapins</Link>,{" "}
          <Link href="/guirlandes">Lumières</Link> et <Link href="/boules">Boules</Link>.
        </p>
      </section>

      <section id="guide-palettes" className="guide">
        <h2>Les palettes de Noël 2026</h2>
        <p>
          Deux ou trois couleurs, pas plus, et les mêmes du sapin à la table. Voici les quatre palettes qu&apos;on voit
          partout cette année.
        </p>
        <div className="palette">
          {PALETTES.map((p) => (
            <div key={p.nom}>
              <div className="palette-nuancier" aria-hidden="true">
                {p.couleurs.map((c) => (
                  <span key={c} style={{ background: c }} />
                ))}
              </div>
              <h3>{p.nom}</h3>
              <p>{p.texte}</p>
              <p>{p.sapin}</p>
            </div>
          ))}
        </div>
        <p className="guide-suite">
          Trouvez les boules de chaque palette dans la vitrine <Link href="/boules">Boules</Link>, et reprenez les
          couleurs sur <Link href="/table-de-noel">la table du réveillon</Link>.
        </p>
      </section>

      <section id="guide-erreurs" className="guide">
        <h2>Les 7 erreurs qui gâchent un sapin</h2>
        <ol>
          <li>
            <strong>Pas assez de lumière.</strong> Une guirlande de 10 m sur un sapin de 180 cm, c&apos;est trois fois
            trop peu.
          </li>
          <li>
            <strong>Le blanc froid.</strong> Il rend le sapin bleuâtre et triste en photo. Préférez le blanc chaud.
          </li>
          <li>
            <strong>Trop de couleurs.</strong> Au-delà de trois, l&apos;œil ne sait plus où se poser.
          </li>
          <li>
            <strong>Toutes les boules de la même taille.</strong> Le sapin paraît plat. Mélangez trois tailles.
          </li>
          <li>
            <strong>Les boules seulement au bout des branches.</strong> Glissez-en aussi vers le tronc pour donner de
            la profondeur.
          </li>
          <li>
            <strong>Le pied visible.</strong> Une jupe, un panier ou une caisse en bois règle le problème.
          </li>
          <li>
            <strong>Des guirlandes d&apos;extérieur non étanches.</strong> Dehors, IP44 au minimum.
          </li>
        </ol>
        <p className="guide-suite">
          Pour la lumière, passez par la vitrine <Link href="/guirlandes">Lumières</Link> ; pour l&apos;extérieur, par{" "}
          <Link href="/exterieur">le jardin</Link>.
        </p>
      </section>

      <section id="guide-styles" className="guide">
        <h2>4 styles de Noël pour votre salon</h2>
        <div className="palette">
          <div className="style">
            <h3>Glamour champagne</h3>
            <p>Sapin floqué, boules or et champagne, rubans en velours, beaucoup de lumière chaude.</p>
          </div>
          <div className="style">
            <h3>Winter wonderland</h3>
            <p>Blanc, argent et verre, neige artificielle au pied du sapin et village lumineux sur la cheminée.</p>
          </div>
          <div className="style">
            <h3>Chalet traditionnel</h3>
            <p>Rouge et vert sapin, bois brut, tissu écossais, casse-noisettes et bougies.</p>
          </div>
          <div className="style">
            <h3>Nordique épuré</h3>
            <p>Sapin fin, peu de décorations mais bien choisies, bois clair, laine et papier kraft.</p>
          </div>
        </div>
        <p className="guide-suite">
          Pour la cheminée et le buffet, voyez la vitrine <Link href="/figurines">Le village</Link>.
        </p>
      </section>
    </div>
  );
}
