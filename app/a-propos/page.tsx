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
        temps en rassemblant, rayon par rayon, des décorations faciles à commander sur Amazon.
      </p>
      <h2>Comment fonctionne la boutique</h2>
      <p>
        Les commandes se font sur Amazon. Quand vous cliquez sur un article, vous arrivez sur sa page Amazon, où vous
        retrouvez le prix du jour, le vendeur, le délai de livraison, les avis et les conditions de retour.
      </p>
      <p>{AFFILIATE_NOTICE}</p>
      <p>
        Une question ? <Link href="/contact">Écrivez-nous</Link>.
      </p>
    </div>
  );
}
