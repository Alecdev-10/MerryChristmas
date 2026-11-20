# CLAUDE.md — MerryChristmas

Contexte pour les sessions de travail sur ce dépôt.

- **Produit** : site vitrine de déco de Noël, 5 rayons, liens Amazon Partenaires. Trafic attendu depuis Pinterest, donc surtout mobile.
- **Stack** : Next.js 15 App Router, TypeScript, `output: "export"` (100 % statique), CSS global simple (`app/globals.css`), React Three Fiber + Drei pour la vitrine 3D. Hébergement Vercel.
- **Pas de base de données** : les produits viennent de `data/products.json`, généré depuis le tableur `pilotage/` par `npm run import`.
- **Règles à ne jamais casser** :
  - liens Amazon complets avec le paramètre `tag` (via `withAffiliateTag`), jamais raccourcis ou masqués ;
  - mention d'affiliation visible sur chaque page ;
  - prix toujours présentés comme indicatifs ;
  - la 3D ne doit jamais bloquer l'affichage : elle est chargée en `ssr: false`, et la grille des rayons reste toujours présente en dessous.
- **Langue** : tout le contenu du site est en français.
- **Délai** : mise en ligne v1 le soir du 20/11/2026, puis épingles quotidiennes jusqu'à Noël. Priorité à ce qui fait vendre, pas aux finitions.
