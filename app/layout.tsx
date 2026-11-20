import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const pinterestVerify = process.env.NEXT_PUBLIC_PINTEREST_VERIFY;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} · Déco de Noël rayon par rayon`, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: { type: "website", siteName: SITE_NAME, locale: "fr_FR" },
  ...(pinterestVerify ? { other: { "p:domain_verify": pinterestVerify } } : {}),
};

export const viewport: Viewport = { themeColor: "#1f4d33" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
