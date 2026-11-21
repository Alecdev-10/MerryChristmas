"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RAYONS } from "@/data/rayons";

export default function Header() {
  const path = usePathname();
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="MerryChristmas, accueil">
        MerryChristmas
      </Link>
      <nav className="site-nav" aria-label="Vitrines">
        {RAYONS.map((r) => (
          <Link key={r.slug} href={`/${r.slug}`} aria-current={path === `/${r.slug}` ? "page" : undefined}>
            {r.enseigne}
          </Link>
        ))}
        <Link href="/inspiration" aria-current={path === "/inspiration" ? "page" : undefined}>
          Inspiration
        </Link>
      </nav>
    </header>
  );
}
