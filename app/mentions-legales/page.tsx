import type { Metadata } from "next";
import { AFFILIATE_NOTICE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = { title: "Mentions légales", robots: { index: false } };

export default function MentionsLegales() {
  return (
    <div className="texte">
      <h1 className="display">Mentions légales</h1>

      <h2>Éditeur du site</h2>
      {/* À COMPLÉTER : nom ou raison sociale, adresse, e-mail de contact */}
      <p>{SITE_NAME} — [Nom de l'éditeur] — [Adresse] — [E-mail de contact]</p>

      <h2>Hébergement</h2>
      <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com</p>

      <h2>Affiliation</h2>
      <p>{AFFILIATE_NOTICE}</p>
      <p>
        {SITE_NAME} participe au Programme Partenaires d'Amazon EU, un programme d'affiliation conçu pour permettre à
        des sites de percevoir une rémunération grâce à la création de liens vers Amazon.
      </p>
      <p>
        Les prix et la disponibilité affichés sont indicatifs et peuvent changer. Seuls le prix et la disponibilité
        indiqués sur Amazon au moment de l'achat font foi.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Ce site ne collecte aucune donnée personnelle et ne dépose pas de cookie. Lorsque vous cliquez sur un lien
        Amazon, la politique de confidentialité d'Amazon s'applique.
      </p>
    </div>
  );
}
