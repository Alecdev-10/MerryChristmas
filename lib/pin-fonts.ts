/**
 * Polices des épingles générées au build (next/og ne lit pas le woff2).
 * On demande à Google Fonts la version TrueType en se présentant comme un ancien Safari (qui reçoit du .ttf).
 */
type Font = { name: string; data: ArrayBuffer; weight: 400 | 500 | 600 | 800; style: "normal" | "italic" };

const cache = new Map<string, Promise<ArrayBuffer>>();

function google(query: string): Promise<ArrayBuffer> {
  if (!cache.has(query)) {
    cache.set(
      query,
      (async () => {
        const css = await fetch(`https://fonts.googleapis.com/css2?family=${query}`, {
          headers: { "User-Agent": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1" },
        }).then((r) => r.text());
        const url = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
        if (!url) throw new Error(`Police introuvable : ${query} :: ${css.slice(0, 300)}`);
        return fetch(url).then((r) => r.arrayBuffer());
      })()
    );
  }
  return cache.get(query)!;
}

export async function pinFonts(): Promise<Font[]> {
  const [titre, titreItal, texte] = await Promise.all([
    google("Bodoni+Moda:opsz,wght@11,800"),
    google("Bodoni+Moda:ital,opsz,wght@1,11,600"),
    google("Jost:wght@500"),
  ]);
  return [
    { name: "Bodoni", data: titre, weight: 800, style: "normal" },
    { name: "Bodoni", data: titreItal, weight: 600, style: "italic" },
    { name: "Jost", data: texte, weight: 500, style: "normal" },
  ];
}
