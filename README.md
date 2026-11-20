# MerryChristmas

Boutique déco de Noël en affiliation Amazon Partenaires, alimentée par Pinterest.
Next.js (App Router) en export statique, hébergée sur Vercel, sans base de données.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner NEXT_PUBLIC_AMAZON_TAG
npm run dev                  # http://localhost:3000
```

## Mettre à jour les produits

1. Remplir la feuille **Produits** de `pilotage/Pilotage_Pinterest_Noel.xlsx`
   (ID, nom, rayon, lien Amazon, prix, URL image, statut).
2. `npm run import` → réécrit `data/products.json`.
3. Seuls les produits au statut **Validé** ou **En ligne** s'affichent.
4. Commit + push → Vercel redéploie.

Le tag Partenaires est ajouté automatiquement à chaque lien Amazon (`NEXT_PUBLIC_AMAZON_TAG`).
Les liens restent complets : jamais de raccourcisseur.

## Structure

| Chemin | Rôle |
| --- | --- |
| `data/rayons.ts` | Les 5 rayons : slug (adresse), nom, textes, couleur |
| `data/products.json` | Produits (généré par `npm run import`) |
| `components/ShowroomScene.tsx` | Vitrine 3D (React Three Fiber), chargée côté navigateur uniquement |
| `app/[rayon]/page.tsx` | Une page statique par rayon : `/sapins`, `/guirlandes`, `/boules`, `/table-de-noel`, `/exterieur` |
| `app/mentions-legales/page.tsx` | Mentions légales + affiliation (**à compléter**) |
| `pilotage/` | Tableur de pilotage (mots-clés, produits, épingles) |

## Déployer sur Vercel

1. Pousser le dépôt sur GitHub.
2. vercel.com → **Add New Project** → importer `MerryChristmas` (framework détecté : Next.js).
3. Ajouter les variables de `.env.example` dans **Settings → Environment Variables**.
4. Deploy. Chaque push sur `main` redéploie.

## Avant de lancer la campagne

- [ ] Remplacer les produits d'exemple (badge « Exemple à remplacer ») par de vrais produits
- [ ] Renseigner le vrai tag Partenaires et l'URL du site dans Vercel
- [ ] Compléter l'éditeur dans les mentions légales
- [ ] Vérifier le domaine dans Pinterest (`NEXT_PUBLIC_PINTEREST_VERIFY`)
