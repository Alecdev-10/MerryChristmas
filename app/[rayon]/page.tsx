import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { RAYONS, getRayon } from "@/data/rayons";
import { getProductsByRayon } from "@/lib/products";

type Props = { params: Promise<{ rayon: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return RAYONS.map((r) => ({ rayon: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { rayon: slug } = await params;
  const rayon = getRayon(slug);
  if (!rayon) return {};
  const products = getProductsByRayon(slug);
  const image = products.find((p) => p.image)?.image;
  return {
    title: rayon.title,
    description: rayon.intro,
    alternates: { canonical: `/${rayon.slug}` },
    openGraph: {
      title: rayon.title,
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

  return (
    <div className="container">
      <p className="breadcrumb">
        <Link href="/">Accueil</Link> › {rayon.name}
      </p>
      <header className="rayon-head">
        <h1>{rayon.title}</h1>
        <p>{rayon.intro}</p>
      </header>

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} color={rayon.color} />
          ))}
        </div>
      ) : (
        <p className="empty">Les produits de ce rayon arrivent très bientôt.</p>
      )}

      <nav className="other-rayons" aria-label="Autres rayons">
        <h2 className="section-title">Les autres rayons</h2>
        <ul>
          {RAYONS.filter((r) => r.slug !== slug).map((r) => (
            <li key={r.slug}>
              <Link href={`/${r.slug}`}>{r.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
