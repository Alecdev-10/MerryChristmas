import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contacter ${SITE_NAME}.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <div className="texte">
      <h1 className="display">Contact</h1>
      <p>Une question sur une sélection, un lien qui ne marche plus, une idée de produit ? Écrivez-nous :</p>
      <p>
        <a className="bouton" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </p>
      <p>Nous répondons sous 48 heures.</p>
      <p>
        Pour une commande (livraison, retour, remboursement), contactez directement le service client Amazon : les
        produits sont vendus et expédiés par Amazon.
      </p>
    </div>
  );
}
