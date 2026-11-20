import Link from "next/link";
import { RAYONS } from "@/data/rayons";

export default function RayonGrid() {
  return (
    <div className="rayon-grid">
      {RAYONS.map((r) => (
        <Link
          key={r.slug}
          href={`/${r.slug}`}
          className="rayon-card"
          style={{ ["--c" as string]: r.color } as React.CSSProperties}
        >
          <h3>{r.name}</h3>
          <p>{r.intro}</p>
        </Link>
      ))}
    </div>
  );
}
