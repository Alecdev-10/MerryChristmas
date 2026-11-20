import Link from "next/link";
import { RAYONS } from "@/data/rayons";
import { AFFILIATE_NOTICE } from "@/lib/site";

export default function Header() {
  return (
    <>
      <header className="site-header">
        <div className="container">
          <Link href="/" className="logo">
            Merry<span>Christmas</span>
          </Link>
          <nav className="nav" aria-label="Rayons">
            {RAYONS.map((r) => (
              <Link key={r.slug} href={`/${r.slug}`}>
                {r.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <div className="notice">
        <div className="container">{AFFILIATE_NOTICE}</div>
      </div>
    </>
  );
}
