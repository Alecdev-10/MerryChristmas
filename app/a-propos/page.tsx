import type { Metadata } from "next";
import Link from "next/link";
import { AFFILIATE_NOTICE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  description: `Qui est derrière ${SITE_NAME} et comment nous choisissons les décorations de Noël présentées.`,
  alternates: { canonical: "/a-propos" },
};

export default function APropos() {
  return (
    <div className="texte">
      <h1 className="display">À propos</h1>
      <p>
        {SITE_NAME} est une petite boutique de décoration de Noël tenue par Alec. L&apos;idée : vous faire gagner du
        temps en rassemblant, rayon par rayon, des décorations faciles à commander et livrées avant Noël.
      </p>
      <h2>Comment nous choisissons</h2>
      <p>
        Chaque produit est retenu pour sa note client, son nombre d&apos;avis et sa disponibilité sur Amazon.fr.
        Nous retirons ceux qui baissent ou ne sont plus en stock. Nous proposons trois gammes de prix dans chaque rayon, pour que chacun trouve son
        compte.
      </p>
      <h2>Comment fonctionne la boutique</h2>
      <p>
        Les produits sont vendus et expédiés par Amazon. Quand vous cliquez sur un article, vous arrivez sur sa page
        Amazon, où vous retrouvez le prix du jour, les avis et les conditions de retour.
      </p>
      <p>{AFFILIATE_NOTICE}</p>
      <p>
        Une question ? <Link href="/contact">Écrivez-nous</Link>.
      </p>
    </div>
  );
}
