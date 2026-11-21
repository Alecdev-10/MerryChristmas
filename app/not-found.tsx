import Link from "next/link";
import { RAYONS } from "@/data/rayons";

export default function NotFound() {
  return (
    <div className="texte">
      <h1 className="display">Cette vitrine n'existe pas.</h1>
      <p>L'adresse est peut-être mal tapée. Les vitrines ouvertes :</p>
      <ul>
        {RAYONS.map((r) => (
          <li key={r.slug}>
            <Link href={`/${r.slug}`}>{r.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
