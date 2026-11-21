"""Affiches Pinterest (1000×1500) — série « Imprimé à Noël ».

Direction : affiches imprimées en risographie (deux encres, or et blanc, sur papier velours),
avec le léger décalage de repérage, la trame de points et le grain du papier propres à ce procédé.
Trois mises en page alternent pour que le fil Pinterest ne se répète pas.

Rendu dans un vrai navigateur (Playwright + Chrome) pour les polices du site (Bodoni Moda, Jost).
Usage : python scripts/pins/make_pins.py [tableur.xlsx]
Prérequis : pip install playwright openpyxl && playwright install chromium
"""
import html
import json
import os
import sys
from pathlib import Path

import openpyxl
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent if (HERE.parent.parent / "data").exists() else HERE
ILLUS = json.loads((ROOT / "data" / "illustrations.json").read_text(encoding="utf-8"))
OUT = ROOT / "pins"

# Un papier et deux encres par rayon, comme une vraie série riso tirée sur cinq papiers différents
PALETTES = {
    "Sapins & pieds": {"papier": "#16352f", "a": "#f3eef2", "b": "#f2b544", "blend": "screen"},
    "Guirlandes & lumières": {"papier": "#f2b544", "a": "#7a1222", "b": "#1e4c4a", "blend": "multiply"},
    "Boules & suspensions": {"papier": "#4a0d16", "a": "#f3eef2", "b": "#f2b544", "blend": "screen"},
    "Table de Noël": {"papier": "#e8b4a6", "a": "#4a0d16", "b": "#1e4c4a", "blend": "multiply"},
    "Déco extérieure": {"papier": "#bcd3db", "a": "#7a1222", "b": "#16352f", "blend": "multiply"},
}
DEFAUT = PALETTES["Boules & suspensions"]

RAYON = {
    "Sapins & pieds": "les sapins",
    "Guirlandes & lumières": "les lumières",
    "Boules & suspensions": "les boules",
    "Table de Noël": "la table",
    "Déco extérieure": "le jardin",
}

RULES = [
    ("cimier", "cimier"), ("rideau", "rideau"), ("lanterne", "lanterne"), ("bougie", "bougies"),
    ("centre de table", "centre"), ("couronne", "couronne"), ("porte", "couronne"),
    ("ordre parfait", "cimier"), ("guirlande", "guirlande"), ("lumineuse", "rideau"),
    ("rouge et or", "boules"), ("boule", "boules"), ("suspension", "boules"), ("sapin", "sapin"),
    ("table", "bougies"), ("extérieure", "lanterne"),
]


def kind_for(title: str) -> str:
    t = title.lower()
    for key, kind in RULES:
        if key in t:
            return kind
    return "sapin"


def dessin(kind: str, color: str, stroke: float, fill_color: str | None = None) -> str:
    """Le dessin au trait, épaissi pour l'affiche (le trait grossit avec la taille)."""
    fc = fill_color or color
    return "".join(
        f'<path d="{e["d"]}" fill="{fc if e["fill"] else "none"}" stroke="{color}" '
        f'stroke-width="{stroke}" stroke-linecap="round" stroke-linejoin="round"/>'
        for e in ILLUS[kind]
    )


def illus_block(kind: str, x: float, y: float, size: float, pal: dict, stroke: float = 3.2) -> str:
    """Deux passages d'encre légèrement décalés (repérage riso) : encre B dessous, encre A dessus."""
    off = size * 0.013
    return (
        f'<g filter="url(#encre)"><svg x="{x + off}" y="{y + off * 0.7}" width="{size}" height="{size}" viewBox="0 0 120 120" class="encre-b">'
        f'{dessin(kind, pal["b"], stroke)}</svg>'
        f'<svg x="{x}" y="{y}" width="{size}" height="{size}" viewBox="0 0 120 120" class="encre-a">'
        f'{dessin(kind, pal["a"], stroke)}</svg></g>'
    )


def soleil(cx: float, cy: float, r: float, pal: dict) -> str:
    """Disque en trame de points (demi-teinte), les points grossissent vers le centre."""
    dots = []
    step = 15
    for gy in range(int(cy - r), int(cy + r), step):
        for gx in range(int(cx - r), int(cx + r), step):
            d = ((gx - cx) ** 2 + (gy - cy) ** 2) ** 0.5
            if d > r:
                continue
            k = 1 - d / r
            rad = 1.2 + 5.6 * k ** 0.8
            dots.append(f'<circle cx="{gx}" cy="{gy}" r="{rad:.1f}"/>')
    return f'<g fill="{pal["b"]}" opacity=".6" class="encre-b">{"".join(dots)}</g>'


def flocons(seed: int, color: str, n: int = 46) -> str:
    out = []
    for i in range(n):
        x = (seed * 131 + i * 227) % 1000
        y = (seed * 71 + i * 389) % 1500
        r = 1.5 + (i * 7 % 5) * 0.8
        out.append(f'<circle cx="{x}" cy="{y}" r="{r}"/>')
    return f'<g fill="{color}" opacity=".5">{"".join(out)}</g>'


def layout(i: int, kind: str, pal: dict) -> str:
    """Trois compositions qui alternent."""
    v = i % 3
    if v == 0:
        # Dessin géant qui déborde à droite, soleil tramé derrière
        return soleil(640, 560, 360, pal) + illus_block(kind, 280, 140, 800, pal, 3.4)
    if v == 1:
        # Dessin centré bas, posé sur une ligne d'horizon, soleil au-dessus
        return (
            soleil(500, 980, 300, pal)
            + f'<line x1="0" y1="1290" x2="1000" y2="1290" stroke="{pal["b"]}" stroke-width="5"/>'
            + illus_block(kind, 170, 620, 660, pal, 3.6)
        )
    # Dessin incliné en haut à gauche, comme un tampon
    return (
        soleil(380, 420, 330, pal)
        + f'<g transform="rotate(-9 380 420)">{illus_block(kind, 50, 90, 660, pal, 3.6)}</g>'
    )


TITRE_POS = {0: "bas", 1: "haut", 2: "bas-droite"}

TEMPLATE = """<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
@font-face{{font-family:Bodoni;src:url(fonts/bodoni.woff2) format("woff2");font-weight:400 900}}
@font-face{{font-family:Bodoni;font-style:italic;src:url(fonts/bodoni-italic.woff2) format("woff2");font-weight:400 900}}
@font-face{{font-family:Jost;src:url(fonts/jost.woff2) format("woff2");font-weight:100 900}}
*{{box-sizing:border-box;margin:0}}
body{{width:1000px;height:1500px;overflow:hidden;background:{papier};color:{blanc};font-family:Jost,sans-serif;position:relative}}
.art{{position:absolute;inset:0;width:1000px;height:1500px}}
.encre-a,.encre-b{{mix-blend-mode:{blend}}}
.titre{{position:absolute;font-family:Bodoni;font-weight:800;font-variation-settings:'opsz' 11;line-height:.98;letter-spacing:-.01em;color:{a};
  text-shadow:5px 4px 0 {b}}}
.titre em{{font-style:italic;font-weight:600}}
.bas{{left:70px;right:70px;bottom:150px;font-size:{size}px}}
.haut{{left:70px;right:70px;top:110px;font-size:{size}px}}
.bas-droite{{left:200px;right:70px;bottom:150px;font-size:{size}px;text-align:right}}
.pied{{position:absolute;left:70px;right:70px;bottom:58px;display:flex;justify-content:space-between;align-items:baseline;font-size:25px;color:{a};opacity:.85}}
.pied b{{font-family:Bodoni;font-style:italic;font-weight:600;font-size:34px}}
.grain{{position:absolute;inset:0;mix-blend-mode:overlay;opacity:.35;pointer-events:none}}
</style></head><body>
<svg class="art" viewBox="0 0 1000 1500"><defs>
<filter id="encre" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="{seed}" result="t"/>
  <feDisplacementMap in="SourceGraphic" in2="t" scale="5" result="d"/>
  <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="{seed}" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -3 2.75" result="trous"/>
  <feComposite in="d" in2="trous" operator="in"/>
</filter></defs>{flocons}{art}</svg>
<h1 class="titre {pos}">{titre}</h1>
<div class="pied"><b>MerryChristmas, {rayon}</b><span>{host}</span></div>
<svg class="grain" viewBox="0 0 1000 1500"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="{seed}"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 1.4 -.35"/></filter><rect width="1000" height="1500" filter="url(#g)"/></svg>
</body></html>"""


def split_title(t: str) -> str:
    """Si le titre a deux parties (avant/après « : »), la seconde passe en italique, sur sa ligne."""
    t = html.escape(t)
    if " : " in t:
        a, b = t.split(" : ", 1)
        return f"{a}<br><em>{b}</em>"
    if ", " in t:
        a, b = t.split(", ", 1)
        return f"{a},<br><em>{b}</em>"
    return t


def main():
    xlsx = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "pilotage" / "Pilotage_Pinterest_Noel.xlsx"
    ws = openpyxl.load_workbook(xlsx)["Épingles"]
    OUT.mkdir(exist_ok=True)
    work = HERE / "_render.html"
    with sync_playwright() as p:
        exe = os.environ.get("CHROME_PATH")
        browser = p.chromium.launch(executable_path=exe) if exe else p.chromium.launch()
        page = browser.new_page(viewport={"width": 1000, "height": 1500})
        n = 0
        for i, row in enumerate(ws.iter_rows(min_row=3, values_only=True)):
            pin_id, title, _d, board, _kw, _pid, _prod, url = row[:8]
            if not pin_id or not title or not url:
                continue
            title = str(title)
            size = 104 if len(title) < 34 else 92 if len(title) < 48 else 82
            pal = PALETTES.get(str(board), DEFAUT)
            doc = TEMPLATE.format(
                papier=pal["papier"], blanc=pal["a"], a=pal["a"], b=pal["b"], blend=pal["blend"], size=size, seed=i + 3,
                flocons=flocons(i + 1, pal["a"]),
                art=layout(i, kind_for(title), pal),
                pos=TITRE_POS[i % 3],
                titre=split_title(title),
                rayon=html.escape(RAYON.get(str(board), "la vitrine")),
                host=html.escape(str(url).split("//")[-1].split("/")[0]),
            )
            work.write_text(doc, encoding="utf-8")
            page.goto(work.as_uri())
            page.evaluate("document.fonts.ready")
            page.wait_for_timeout(150)
            out = OUT / f"{pin_id}.png"
            page.screenshot(path=str(out))
            print(out)
            n += 1
        browser.close()
    work.unlink(missing_ok=True)
    print(f"{n} affiche(s) générée(s) dans pins/")


if __name__ == "__main__":
    main()
