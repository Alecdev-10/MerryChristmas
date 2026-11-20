import type { Product } from "@/lib/products";
import { withAffiliateTag } from "@/lib/site";

const euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export default function ProductCard({ product, color }: { product: Product; color: string }) {
  return (
    <article className="product-card" style={{ ["--c" as string]: color } as React.CSSProperties}>
      <div className="product-img">
        {product.image ? (
          // Image fournie par Amazon (SiteStripe) : balise <img> simple, pas de copie locale.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <div className="ph" aria-hidden="true" />
        )}
      </div>
      <div className="product-body">
        {product.example && <span className="badge">Exemple à remplacer</span>}
        <h2>{product.name}</h2>
        {product.price != null && (
          <p className="price" style={{ margin: 0 }}>
            {euro.format(product.price)} <small>prix indicatif</small>
          </p>
        )}
        <a className="btn" href={withAffiliateTag(product.url)} target="_blank" rel="sponsored noopener noreferrer">
          Voir sur Amazon
        </a>
      </div>
    </article>
  );
}
