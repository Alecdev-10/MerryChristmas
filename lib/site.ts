export const SITE_NAME = "MerryChristmas";
export const SITE_DESCRIPTION =
  "Idées déco de Noël sélectionnées rayon par rayon : sapins, guirlandes, boules, table de fête et extérieur.";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://merrychristmas.vercel.app").replace(/\/$/, "");

export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "votreid-21";

export const AFFILIATE_NOTICE =
  "Liens affiliés : en tant que Partenaire Amazon, nous touchons une commission sur les achats remplissant les conditions requises, sans surcoût pour vous.";

/**
 * Ajoute (ou remplace) le paramètre `tag` Partenaires sur un lien Amazon.
 * Le lien reste complet et lisible : aucun raccourcisseur, conformément aux règles Pinterest/Amazon.
 */
export function withAffiliateTag(url: string): string {
  try {
    const u = new URL(url);
    if (!/(^|\.)amazon\./.test(u.hostname)) return url;
    u.searchParams.set("tag", AMAZON_TAG);
    return u.toString();
  } catch {
    return url;
  }
}
