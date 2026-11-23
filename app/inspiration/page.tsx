import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Illustration from "@/components/Illustration";
import data from "@/data/inspiration.json";
import { getRayon } from "@/data/rayons";
import type { IllusKind } from "@/lib/illustrations";
import { AFFILIATE_NOTICE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Idées déco de Noël 2026 : sapins pas à pas, palettes, erreurs et styles",
  description:
    "48 fiches pour réussir votre décoration de Noël 2026 : décorer son sapin en 5 étapes, 12 palettes de couleurs, les erreurs à éviter pièce par pièce et 12 styles, du scandinave au glam champagne.",
  alternates: { canonical: "/inspiration" },
};

type Fiche = { id: string; titre: string; texte: string; rayon: string };
type Papier = { papier: string; encre: string; accent: string };

const SECTIONS = [
  { id: "guide-sapin", titre: "Décorer son sapin, pas à pas", chapo: "Douze sapins, douze méthodes en cinq gestes. Trouvez le vôtre.", fiches: data.etapes },
  { id: "guide-palettes", titre: "Les palettes de Noël 2026", chapo: "Deux ou trois couleurs, pas plus, et les mêmes du sapin à la table.", fiches: data.palettes },
  { id: "guide-erreurs", titre: "Les erreurs à éviter", chapo: "Sept erreurs par pièce, et de quoi les corriger en dix minutes.", fiches: data.erreurs },
  { id: "guide-styles", titre: "Douze styles pour votre salon", chapo: "Quatre coins de la maison, une seule ambiance par style.", fiches: data.styles },
] as const;

function vers(rayon: string) {
  const r = getRayon(rayon);
  return r ? (
    <Link className="fiche-lien" href={`/${r.slug}`}>
      Voir la vitrine {r.enseigne.toLowerCase()}
    </Link>
  ) : null;
}

function papier(f: Papier): CSSProperties {
  return { "--papier": f.papier, "--encre": f.encre, "--accent": f.accent } as CSSProperties;
}

/** Une fiche épinglée au mur : même papier et mêmes encres que l'épingle Pinterest qui y mène. */
function FicheEtapes({ f }: { f: Fiche & Papier & { etapes: string[] } }) {
  return (
    <article id={f.id} className="fiche fiche-imprimee" style={papier(f)}>
      <span className="punaise" aria-hidden="true" />
      <h3>{f.titre}</h3>
      <ol className="fiche-etapes">
        {f.etapes.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ol>
      <p>{f.texte}</p>
      {vers(f.rayon)}
    </article>
  );
}

function FicheErreurs({ f }: { f: Fiche & Papier & { erreurs: string[] } }) {
  return (
    <article id={f.id} className="fiche fiche-imprimee" style={papier(f)}>
      <span className="punaise" aria-hidden="true" />
      <h3>{f.titre}</h3>
      <ul className="fiche-erreurs">
        {f.erreurs.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
      <p>{f.texte}</p>
      {vers(f.rayon)}
    </article>
  );
}

function encreSur(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.55 ? "#2a070d" : "#f3eef2";
}

/** Palette présentée comme un nuancier de droguerie : une bande par couleur. */
function FichePalette({ f }: { f: Fiche & { couleurs: { hex: string; nom: string }[] } }) {
  return (
    <article id={f.id} className="fiche fiche-nuancier">
      <span className="punaise" aria-hidden="true" />
      <div className="bandes">
        {f.couleurs.map((c) => (
          <div key={c.hex + c.nom} className="bande" style={{ background: c.hex, color: encreSur(c.hex) }}>
            <span>{c.nom}</span>
            <code>{c.hex}</code>
          </div>
        ))}
      </div>
      <div className="fiche-corps">
        <h3>{f.titre}</h3>
        <p>{f.texte}</p>
        {vers(f.rayon)}
      </div>
    </article>
  );
}

function FicheStyle({ f }: { f: Fiche & { vignettes: { kind: string; label: string; fond: string; encre: string }[] } }) {
  return (
    <article id={f.id} className="fiche fiche-moodboard">
      <span className="punaise" aria-hidden="true" />
      <h3>{f.titre}</h3>
      <div className="vignettes">
        {f.vignettes.map((v) => (
          <div key={v.label} className="vignette" style={{ background: v.fond, color: v.encre }}>
            <Illustration kind={v.kind as IllusKind} color={v.encre} stroke={1.6} />
            <span>{v.label}</span>
          </div>
        ))}
      </div>
      <p>{f.texte}</p>
      {vers(f.rayon)}
    </article>
  );
}

export default function Inspiration() {
  return (
    <div className="inspiration">
      <h1 className="rayon-titre display">Espace Inspiration</h1>
      <p className="inspiration-intro">
        Quarante-huit fiches pour réussir votre décoration de Noël 2026. Chaque fiche de ce mur est celle d&apos;une
        épingle : si vous arrivez de Pinterest, elle vous attend, allumée.
      </p>
      <nav className="sommaire" aria-label="Les quatre guides">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            {s.titre}
            <small>{s.fiches.length} fiches</small>
          </a>
        ))}
      </nav>
      <p className="rayon-note">{AFFILIATE_NOTICE}</p>

      {SECTIONS.map((s) => (
        <section key={s.id} id={s.id} className="mur" aria-labelledby={`${s.id}-titre`}>
          <header className="mur-tete">
            <h2 id={`${s.id}-titre`}>{s.titre}</h2>
            <p>{s.chapo}</p>
          </header>
          <div className="mur-fiches">
            {s.id === "guide-sapin" && data.etapes.map((f) => <FicheEtapes key={f.id} f={f} />)}
            {s.id === "guide-palettes" && data.palettes.map((f) => <FichePalette key={f.id} f={f} />)}
            {s.id === "guide-erreurs" && data.erreurs.map((f) => <FicheErreurs key={f.id} f={f} />)}
            {s.id === "guide-styles" && data.styles.map((f) => <FicheStyle key={f.id} f={f} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
