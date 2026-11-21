import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Fil from "@/components/Fil";
import EntreeVitrine from "@/components/EntreeVitrine";
import { RAYONS, getRayon } from "@/data/rayons";
import { getProductsByRayon } from "@/lib/products";
import { AFFILIATE_NOTICE } from "@/lib/site";

type Props = { params: Promise<{ rayon: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return RAYONS.map((r) => ({ rayon: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { rayon: slug } = await params;
  const rayon = getRayon(slug);
  if (!rayon) return {};
  const image = getProductsByRayon(slug).find((p) => p.image)?.image;
  return {
    title: rayon.seoTitle,
    description: rayon.intro,
    alternates: { canonical: `/${rayon.slug}` },
    openGraph: {
      title: rayon.seoTitle,
      description: rayon.intro,
      url: `/${rayon.slug}`,
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

export default async function RayonPage({ params }: Props) {
  const { rayon: slug } = await params;
  const rayon = getRayon(slug);
  if (!rayon) notFound();
  const products = getProductsByRayon(slug);
  const i = RAYONS.findIndex((r) => r.slug === slug);
  const next = RAYONS[(i + 1) % RAYONS.length];
  const prev = RAYONS[(i - 1 + RAYONS.length) % RAYONS.length];

  return (
    <div className="rayon">
      <EntreeVitrine />
      <h1 className="rayon-titre display">{rayon.title}</h1>
      <p className="rayon-intro">{rayon.intro}</p>
      <p className="rayon-note">{AFFILIATE_NOTICE}</p>

      {products.length > 0 ? (
        <Fil products={products} />
      ) : (
        <p className="rayon-note">Cette vitrine se remplit : revenez dans quelques jours.</p>
      )}

      <section className="rayon-conseil" aria-labelledby="conseil-titre">
        <h2 id="conseil-titre">Nos conseils pour ce rayon</h2>
        {rayon.texte.map((t, k) => (
          <p key={k}>{t}</p>
        ))}
        <p>
          <Link href={`/inspiration#${rayon.guide.ancre}`}>Lire le guide : {rayon.guide.label}</Link>
        </p>
      </section>

      <nav className="vitrine-suivante" aria-label="Autres vitrines">
        <Link href={`/${prev.slug}`}>
          <small>Vitrine précédente</small>
          {prev.enseigne}
        </Link>
        <Link href={`/${next.slug}`} style={{ textAlign: "right" }}>
          <small>Vitrine suivante</small>
          {next.enseigne}
        </Link>
      </nav>
    </div>
  );
}
