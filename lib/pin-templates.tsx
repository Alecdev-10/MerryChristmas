import { ImageResponse } from "next/og";
import { getRayon } from "@/data/rayons";
import { pinFonts } from "@/lib/pin-fonts";

/**
 * Gabarits des épingles générées au build (vagues 2 et 3), en PNG 1000 × 1500.
 * Photos d'ambiance Unsplash (licence Unsplash), toujours signalées comme telles.
 */
export type Pin = {
  n: string;
  rec: "C1" | "C2" | "C3" | "C4" | "F1" | "F2" | "F3" | "F4";
  slug: string;
  img: string;
  photo?: string;
  grid?: string[];
  bands?: string[];
  bg?: string;
  ink?: string;
  band?: string;
  tiles?: { photo: string; nom: string }[];
  trio?: string[];
};

const V = { velours: "#4a0d16", profond: "#2a070d", givre: "#f3eef2", lampion: "#f2b544", kraft: "#cda875", encre: "#3a1a10" };
const HOST = "merry-christmas-shop-2026.vercel.app";


const u = (src: string, w: number, h: number) => `${src}?w=${w}&h=${h}&fit=crop&auto=format&q=72`;

function Titre({ text, color = V.givre, shadow = V.lampion, size = 96 }: { text: string; color?: string; shadow?: string; size?: number }) {
  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Bodoni",
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: -1,
        color,
        textShadow: `5px 4px 0 ${shadow}`,
      }}
    >
      {text}
    </div>
  );
}

function Pied({ enseigne, color = V.givre }: { enseigne: string; color?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%", color }}>
      <div style={{ display: "flex", fontFamily: "Bodoni", fontStyle: "italic", fontWeight: 600, fontSize: 36 }}>
        {`MerryChristmas, ${enseigne}`}
      </div>
      <div style={{ display: "flex", fontFamily: "Jost", fontSize: 22, opacity: 0.85 }}>{HOST}</div>
    </div>
  );
}

const mention = (color: string) => (
  <div style={{ display: "flex", fontFamily: "Jost", fontSize: 20, color, opacity: 0.8 }}>Photos d&apos;ambiance</div>
);

function C1({ p, ens }: { p: Pin; ens: string }) {
  return (
    <div style={{ display: "flex", width: 1000, height: 1500, position: "relative", background: V.profond }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={u(p.photo!, 1000, 1500)} width={1000} height={1500} style={{ position: "absolute", objectFit: "cover" }} alt="" />
      <div style={{ position: "absolute", top: 0, left: 0, width: 1000, height: 700, display: "flex", backgroundImage: "linear-gradient(180deg, rgba(42,7,13,0.92) 0%, rgba(42,7,13,0.55) 55%, rgba(42,7,13,0) 100%)" }} />
      <div style={{ position: "absolute", top: 90, left: 70, right: 70, display: "flex" }}>
        <Titre text={p.img} size={104} />
      </div>
      <div style={{ position: "absolute", bottom: 60, left: 60, right: 60, display: "flex", flexDirection: "column", gap: 14, padding: "30px 36px", background: V.kraft, color: V.encre }}>
        <Pied enseigne={ens.toLowerCase()} color={V.encre} />
        {mention(V.encre)}
      </div>
    </div>
  );
}

function C2({ p, ens }: { p: Pin; ens: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 1000, height: 1500, background: V.velours, padding: "90px 70px 56px" }}>
      <Titre text={p.img} size={100} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 28, marginTop: 70 }}>
        {p.grid!.map((src, i) => (
          <div key={i} style={{ display: "flex", padding: 14, background: V.kraft, transform: `rotate(${[-1.5, 1.2, 1, -1.3][i]}deg)` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u(src, 400, 460)} width={388} height={448} style={{ objectFit: "cover" }} alt="" />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", marginTop: "auto", flexDirection: "column", gap: 10 }}>
        {mention(V.givre)}
        <Pied enseigne={ens.toLowerCase()} />
      </div>
    </div>
  );
}

function C3({ p }: { p: Pin }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 1000, height: 1500, background: p.bg, padding: "90px 70px 56px" }}>
      <div style={{ display: "flex", width: "100%" }}>
        <Titre text={p.img} color={p.ink} shadow={p.ink === V.givre || p.ink === V.lampion ? V.velours : V.lampion} size={96} />
      </div>
      <div style={{ display: "flex", marginTop: 70, padding: "26px 26px 90px", background: "#fbf7ee", transform: "rotate(-2.5deg)", boxShadow: "0 30px 50px rgba(0,0,0,0.35)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={u(p.photo!, 760, 860)} width={720} height={820} style={{ objectFit: "cover" }} alt="" />
      </div>
      <div style={{ display: "flex", marginTop: "auto", flexDirection: "column", width: "100%", gap: 10 }}>
        {mention(p.ink!)}
        <Pied enseigne="la boutique en 3D" color={p.ink} />
      </div>
    </div>
  );
}

function C4({ p }: { p: Pin }) {
  const [a, b, c] = p.bands!;
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 1000, height: 1500, background: V.velours }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={u(a, 1000, 430)} width={1000} height={430} style={{ objectFit: "cover" }} alt="" />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: 640, padding: "0 70px", gap: 26, borderTop: `8px solid ${V.lampion}`, borderBottom: `8px solid ${V.lampion}` }}>
        <Titre text={p.img} size={108} />
        <div style={{ display: "flex", fontFamily: "Jost", fontSize: 34, color: V.givre, opacity: 0.9 }}>Six vitrines de Noël, une par rayon</div>
        <Pied enseigne="la boutique" />
      </div>
      <div style={{ display: "flex", position: "relative", height: 430 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={u(b, 500, 430)} width={500} height={414} style={{ objectFit: "cover" }} alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={u(c, 500, 430)} width={500} height={414} style={{ objectFit: "cover" }} alt="" />
        <div style={{ position: "absolute", right: 18, bottom: 26, display: "flex", padding: "4px 10px", background: "rgba(42,7,13,0.7)" }}>{mention(V.givre)}</div>
      </div>
    </div>
  );
}


function Bandeau({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignSelf: "flex-start", padding: "14px 26px", background: V.lampion, color: V.profond, fontFamily: "Jost", fontSize: 34, transform: "rotate(-2deg)" }}>
      {text}
    </div>
  );
}

/** F1 Black Friday · F4 Dernière minute : photo plein cadre + bandeau */
function FVitrine({ p, ens }: { p: Pin; ens: string }) {
  const nuit = p.rec === "F4";
  return (
    <div style={{ display: "flex", width: 1000, height: 1500, position: "relative", background: V.profond }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={u(p.photo!, 1000, 1500)} width={1000} height={1500} style={{ position: "absolute", objectFit: "cover" }} alt="" />
      <div style={{ position: "absolute", top: 0, left: 0, width: 1000, height: 1500, display: "flex", backgroundImage: nuit ? "linear-gradient(180deg, rgba(20,33,61,0.92) 0%, rgba(20,33,61,0.35) 50%, rgba(20,33,61,0.85) 100%)" : "linear-gradient(180deg, rgba(42,7,13,0.92) 0%, rgba(42,7,13,0.4) 45%, rgba(42,7,13,0) 70%)" }} />
      <div style={{ position: "absolute", top: 80, left: 70, right: 70, display: "flex", flexDirection: "column", gap: 34 }}>
        <Bandeau text={p.band!} />
        <Titre text={p.img} size={100} />
      </div>
      <div style={{ position: "absolute", bottom: 60, left: 60, right: 60, display: "flex", flexDirection: "column", gap: 12, padding: "28px 36px", background: V.kraft, color: V.encre }}>
        <Pied enseigne={ens.toLowerCase()} color={V.encre} />
        <div style={{ display: "flex", fontFamily: "Jost", fontSize: 22 }}>Prix et délais à vérifier sur Amazon · Photos d&apos;ambiance</div>
      </div>
    </div>
  );
}

/** F2 Petit budget : 6 étiquettes */
function FGrille({ p }: { p: Pin }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 1000, height: 1500, background: V.velours, padding: "80px 60px 50px" }}>
      <Bandeau text="Petit budget" />
      <div style={{ display: "flex", marginTop: 26 }}>
        <Titre text={p.img} size={92} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 22, marginTop: 44 }}>
        {p.tiles!.map((t, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", width: 428, padding: 12, background: V.kraft, color: V.encre }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u(t.photo, 420, 250)} width={404} height={240} style={{ objectFit: "cover" }} alt="" />
            <div style={{ display: "flex", fontFamily: "Jost", fontSize: 22, lineHeight: 1.2, marginTop: 10, height: 54, overflow: "hidden" }}>{t.nom}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", marginTop: "auto", flexDirection: "column", gap: 8 }}>
        {mention(V.givre)}
        <Pied enseigne="la boutique" />
      </div>
    </div>
  );
}

/** F3 Le look complet : sapin + lumière + boules */
function FTrio({ p }: { p: Pin }) {
  const labels = ["1  Le sapin", "2  La lumière", "3  Les boules"];
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 1000, height: 1500, background: "#f4ecdd", padding: "80px 60px 50px" }}>
      <Titre text={p.img} color={V.velours} shadow={V.lampion} size={96} />
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 44 }}>
        {p.trio!.map((s, i) => (
          <div key={i} style={{ display: "flex", position: "relative", height: 330 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u(s, 880, 330)} width={880} height={330} style={{ objectFit: "cover" }} alt="" />
            <div style={{ position: "absolute", left: 18, top: 18, display: "flex", padding: "8px 16px", background: V.velours, color: V.givre, fontFamily: "Bodoni", fontWeight: 800, fontSize: 34 }}>{labels[i]}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", marginTop: "auto", flexDirection: "column", gap: 8 }}>
        {mention(V.encre)}
        <Pied enseigne="le look complet" color={V.encre} />
      </div>
    </div>
  );
}

export async function renderPin(p: Pin) {
  const ens = getRayon(p.slug)?.enseigne ?? "la boutique";
  const el =
    p.rec === "C1" ? <C1 p={p} ens={ens} />
    : p.rec === "C2" ? <C2 p={p} ens={ens} />
    : p.rec === "C3" ? <C3 p={p} />
    : p.rec === "C4" ? <C4 p={p} />
    : p.rec === "F2" ? <FGrille p={p} />
    : p.rec === "F3" ? <FTrio p={p} />
    : <FVitrine p={p} ens={ens} />;
  return new ImageResponse(el, { width: 1000, height: 1500, fonts: await pinFonts() });
}
