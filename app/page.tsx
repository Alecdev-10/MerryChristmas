import BulbSign from "@/components/BulbSign";
import Boulevard from "@/components/Boulevard";
import Stage from "@/components/Stage";

const ENSEIGNE = ["Merry", "Christmas"];

export default function HomePage() {
  return (
    <>
      <Stage />
      <section className="facade">
        <h1 className="sr-only">MerryChristmas, les vitrines de Noël</h1>
        <BulbSign lines={ENSEIGNE} />
        <div className="facade-foot">
          <p>Cinq vitrines de décoration de Noël. Essuyez la buée pour voir ce qu'il y a derrière.</p>
          <div className="descend" aria-hidden="true">
            <span />
            Descendez le boulevard
          </div>
        </div>
      </section>
      <Boulevard />
    </>
  );
}
