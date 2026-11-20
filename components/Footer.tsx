import Link from "next/link";
import { AFFILIATE_NOTICE, SITE_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p style={{ margin: 0 }}>{AFFILIATE_NOTICE}</p>
        <p style={{ margin: 0 }}>
          Prix indicatifs, susceptibles de changer : le prix final est celui affiché sur Amazon.{" "}
          <Link href="/mentions-legales">Mentions légales</Link>
        </p>
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} {SITE_NAME}</p>
      </div>
    </footer>
  );
}
