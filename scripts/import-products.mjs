// Importe la feuille « Produits » du tableur de pilotage vers data/products.json.
// Usage : npm run import            (lit pilotage/Pilotage_Pinterest_Noel.xlsx)
//         npm run import -- chemin/vers/fichier.xlsx
import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";

const file = process.argv[2] || "pilotage/Pilotage_Pinterest_Noel.xlsx";
const out = path.join("data", "products.json");

if (!fs.existsSync(file)) {
  console.error(`Fichier introuvable : ${file}`);
  process.exit(1);
}

const wb = XLSX.readFile(file);
const ws = wb.Sheets["Produits"];
if (!ws) {
  console.error("Feuille « Produits » introuvable dans le classeur.");
  process.exit(1);
}

// Ligne 1 = légende, ligne 2 = en-têtes, données à partir de la ligne 3.
const rows = XLSX.utils.sheet_to_json(ws, { header: 1, range: 1, defval: "" });
const [header, ...data] = rows;
const col = (label) => header.findIndex((h) => String(h).trim().startsWith(label));
const c = {
  id: col("ID"),
  name: col("Nom du produit"),
  rayon: col("Rayon"),
  url: col("Lien Amazon"),
  price: col("Prix"),
  image: col("URL image"),
  status: col("Statut"),
};

const products = [];
const skipped = [];
for (const r of data) {
  const id = String(r[c.id]).trim();
  const name = String(r[c.name]).trim();
  const url = String(r[c.url]).trim();
  if (!id && !name && !url) continue;
  if (name.toLowerCase().startsWith("exemple")) continue;
  if (!id || !name || !url.startsWith("http")) {
    skipped.push(id || name || "(ligne sans nom)");
    continue;
  }
  const price = typeof r[c.price] === "number" ? r[c.price] : parseFloat(String(r[c.price]).replace(",", ".")) || null;
  const image = String(r[c.image]).trim();
  products.push({
    id,
    name,
    rayon: String(r[c.rayon]).trim(),
    url,
    price,
    image: image.startsWith("http") ? image : null,
    status: String(r[c.status]).trim() || "À vérifier",
  });
}

if (products.length === 0) {
  console.warn("Aucun produit valide trouvé : data/products.json n'a pas été modifié.");
  process.exit(0);
}

fs.writeFileSync(out, JSON.stringify(products, null, 2) + "\n");
console.log(`${products.length} produit(s) écrit(s) dans ${out}.`);
console.log("Seuls les produits au statut « Validé » ou « En ligne » s'affichent sur le site.");
if (skipped.length) console.warn(`Ignorés (ID, nom ou lien manquant) : ${skipped.join(", ")}`);
