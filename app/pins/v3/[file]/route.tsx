import pins from "@/data/vague3.json";
import { renderPin, type Pin } from "@/lib/pin-templates";

/** Épingles de la vague 3 (achat), rendues au build. Adresse publique : /pins/…/Pxxx.png (« Media URL » de l'import Pinterest). */
export const dynamic = "force-static";
export const dynamicParams = false;

const PINS = pins as unknown as Pin[];

export function generateStaticParams() {
  return PINS.map((p) => ({ file: `${p.n}.png` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const p = PINS.find((x) => `${x.n}.png` === file);
  if (!p) return new Response("Introuvable", { status: 404 });
  return renderPin(p);
}
