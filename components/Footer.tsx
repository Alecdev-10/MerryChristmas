import Link from "next/link";
import { AFFILIATE_NOTICE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>{AFFILIATE_NOTICE}</p>
      <p>Les prix affichés sont indicatifs : seul le prix indiqué sur Amazon au moment de l'achat fait foi.</p>
      <p className="footer-liens">
        <Link href="/inspiration">Espace Inspiration</Link>
        <Link href="/a-propos">À propos</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/mentions-legales">Mentions légales</Link>
      </p>
    </footer>
  );
}
