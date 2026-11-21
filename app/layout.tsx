import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Snow from "@/components/Snow";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const titre = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-titre",
  display: "swap",
});

const texte = Jost({
  subsets: ["latin"],
  variable: "--font-texte",
  display: "swap",
});

const pinterestVerify = process.env.NEXT_PUBLIC_PINTEREST_VERIFY || "be6c4a4e7b614b9ef6c062b1039b047b";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `Décoration de Noël 2026 : idées sapin, guirlandes et table · ${SITE_NAME}`, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: { type: "website", siteName: SITE_NAME, locale: "fr_FR" },
  ...(pinterestVerify ? { other: { "p:domain_verify": pinterestVerify } } : {}),
};

export const viewport: Viewport = { themeColor: "#4a0d16" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${titre.variable} ${texte.variable}`}>
      <body>
        <SmoothScroll />
        <Header />
        <main className="page">{children}</main>
        <Footer />
        <Snow />
      </body>
    </html>
  );
}
