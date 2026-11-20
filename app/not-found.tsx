import RayonGrid from "@/components/RayonGrid";

export default function NotFound() {
  return (
    <div className="container prose" style={{ maxWidth: "var(--max)" }}>
      <h1>Page introuvable</h1>
      <p>Cette page n'existe pas (ou plus). Voici nos rayons :</p>
      <RayonGrid />
    </div>
  );
}
