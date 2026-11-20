import Showroom from "@/components/Showroom";
import RayonGrid from "@/components/RayonGrid";

export default function HomePage() {
  return (
    <div className="container">
      <section className="hero">
        <h1>La boutique déco de Noël</h1>
        <p>Cinq rayons d'idées sélectionnées pour décorer le sapin, la maison, la table de fête et l'extérieur.</p>
      </section>

      <Showroom />

      <h2 className="section-title">Les rayons</h2>
      <RayonGrid />
    </div>
  );
}
