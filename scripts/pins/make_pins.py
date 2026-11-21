"""Visuels d'épingles Pinterest (1000×1500) au style « Vitrines embuées ».

Rendu dans un vrai navigateur (Playwright + Chrome) pour avoir les polices du site
(Bodoni Moda, Jost) et le flou de la buée.

Usage : python scripts/pins/make_pins.py [tableur.xlsx]
Prérequis : pip install playwright openpyxl && playwright install chromium
Les polices sont dans scripts/pins/fonts/, les dessins dans data/illustrations.json.
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

ENSEIGNE = {
    "Sapins & pieds": "Les sapins",
    "Guirlandes & lumières": "Les lumières",
    "Boules & suspensions": "Les boules",
    "Table de Noël": "La table",
    "Déco extérieure": "Le jardin",
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


def svg_for(kind: str, color: str, stroke: float) -> str:
    """Vitre embuée : dessin flou partout, net seulement là où la buée a été essuyée."""
    W, H = 732, 672  # intérieur de la vitre (px)
    s = 430  # taille du dessin
    x, y = (W - s) / 2, (H - s) / 2 + 30
    paths = "".join(
        f'<path d="{e["d"]}" fill="{color if e["fill"] else "none"}" stroke="{color}" '
        f'stroke-width="{stroke}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>'
        for e in ILLUS[kind]
    )
    dessin = f'<svg x="{x}" y="{y}" width="{s}" height="{s}" viewBox="0 0 120 120">{paths}</svg>'
    # Le geste d'essuyage : un revers de main en arc, plus un petit second passage
    wipe = (
        f'<path d="M{W*.1} {H*.68} C{W*.3} {H*.38} {W*.66} {H*.32} {W*.9} {H*.52}" stroke-width="{H*.2}"/>'
        f'<path d="M{W*.28} {H*.82} C{W*.44} {H*.7} {W*.6} {H*.7} {W*.74} {H*.76}" stroke-width="{H*.09}"/>'
    )
    gouttes = "".join(
        f'<circle cx="{(i*97)%W}" cy="{(i*53)%H}" r="{1.2+(i%3)*.6}" fill="#fff" opacity=".35"/>' for i in range(1, 260)
    )
    return f"""<svg class="scene" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <filter id="flou" filterUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}"><feGaussianBlur stdDeviation="9"/></filter>
    <filter id="halo" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="bord" filterUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}"><feGaussianBlur stdDeviation="16"/></filter>
    <mask id="essuye"><rect width="{W}" height="{H}" fill="black"/>
      <g fill="none" stroke="white" stroke-linecap="round" filter="url(#bord)">{wipe}</g></mask>
    <mask id="buee"><rect width="{W}" height="{H}" fill="white"/>
      <g fill="none" stroke="black" stroke-linecap="round" filter="url(#bord)">{wipe}</g></mask>
  </defs>
  <g filter="url(#flou)" opacity=".85">{dessin}</g>
  <g mask="url(#buee)"><rect width="{W}" height="{H}" fill="rgba(236,228,232,.46)"/>{gouttes}</g>
  <g mask="url(#essuye)" filter="url(#halo)">{dessin}</g>
</svg>"""


def bulbs(n: int) -> str:
    return "".join('<i class="ampoule"></i>' for _ in range(n))


TEMPLATE = """<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
@font-face{{font-family:Bodoni;src:url(fonts/bodoni.woff2) format("woff2");font-weight:400 900}}
@font-face{{font-family:Bodoni;font-style:italic;src:url(fonts/bodoni-italic.woff2) format("woff2");font-weight:400 900}}
@font-face{{font-family:Jost;src:url(fonts/jost.woff2) format("woff2");font-weight:100 900}}
*{{box-sizing:border-box;margin:0}}
body{{width:1000px;height:1500px;overflow:hidden;background:#4a0d16;color:#f3eef2;font-family:Jost,sans-serif;position:relative}}
body::before{{content:"";position:absolute;inset:0;background:radial-gradient(90% 55% at 50% 38%,#64162a 0%,transparent 70%)}}
.guirlande{{position:absolute;top:44px;left:60px;right:60px;display:flex;justify-content:space-between}}
.ampoule{{width:16px;height:16px;border-radius:50%;background:radial-gradient(circle,#fff4d6 0 22%,#f2b544 45%,rgba(242,181,68,0) 72%);box-shadow:0 0 24px 8px rgba(242,181,68,.35)}}
.vitrine{{position:absolute;left:120px;right:120px;top:150px;height:880px}}
.marquise{{height:70px;margin:0 -22px;background:repeating-linear-gradient(90deg,#2a070d 0 40px,#f3eef2 40px 80px);clip-path:polygon(0 0,100% 0,100% 62%,97% 100%,3% 100%,0 62%);filter:drop-shadow(0 14px 12px rgba(0,0,0,.5))}}
.enseigne{{text-align:center;font-family:Bodoni;font-style:italic;font-weight:500;font-size:46px;color:#f2b544;margin:16px 0 14px;text-shadow:0 2px 0 #6b4a14}}
.verre{{position:relative;height:700px;border-radius:46% 46% 0 0/16% 16% 0 0;overflow:hidden;
  background:radial-gradient(70% 60% at 50% 62%,#7a2433 0%,#3a0b14 70%);
  box-shadow:inset 0 0 0 14px #b38a4d,inset 0 0 0 17px #6b4f22,0 0 0 8px #2a070d}}
.scene{{position:absolute;inset:14px;width:calc(100% - 28px);height:calc(100% - 28px)}}
.titre{{position:absolute;left:96px;right:96px;top:1084px;font-family:Bodoni;font-weight:700;font-size:{size}px;line-height:1.04;letter-spacing:0;font-variation-settings:'opsz' 11;text-wrap:balance}}
.pied{{position:absolute;left:96px;right:96px;bottom:64px;display:flex;justify-content:space-between;align-items:baseline;font-size:25px;color:rgba(243,238,242,.78)}}
.pied b{{font-family:Bodoni;font-style:italic;font-weight:500;font-size:34px;color:#f3eef2}}
</style></head><body>
<div class="guirlande">{bulbs}</div>
<div class="vitrine">
  <div class="marquise"></div>
  <div class="enseigne">{enseigne}</div>
  <div class="verre">{svg}</div>
</div>
<h1 class="titre">{titre}</h1>
<div class="pied"><b>MerryChristmas</b><span>{host}</span></div>
</body></html>"""

# Masque : blanc = buée, noir = vitre essuyée (un revers de main en arc)
MASK = (
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'>"
    "<defs><filter id='f'><feGaussianBlur stdDeviation='2.2'/></filter></defs>"
    "<rect width='100' height='100' fill='white'/>"
    "<path d='M14 66 C30 40 64 34 86 52' stroke='black' stroke-width='19' fill='none' stroke-linecap='round' filter='url(%23f)'/>"
    "<path d='M30 78 C46 66 62 66 74 72' stroke='black' stroke-width='10' fill='none' stroke-linecap='round' filter='url(%23f)'/>"
    "</svg>"
)


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
        for row in ws.iter_rows(min_row=3, values_only=True):
            pin_id, title, _d, board, _kw, _pid, _prod, url = row[:8]
            if not pin_id or not title or not url:
                continue
            size = 84 if len(title) < 34 else 74 if len(title) < 48 else 66
            host = str(url).split("//")[-1].split("/")[0]
            doc = TEMPLATE.format(
                mask=MASK.replace("<", "%3C").replace(">", "%3E").replace("#", "%23"),
                size=size,
                bulbs=bulbs(19),
                enseigne=html.escape(ENSEIGNE.get(str(board), "La vitrine")),
                svg=svg_for(kind_for(str(title)), "#f2b544", 2.4),
                titre=html.escape(str(title)),
                host=html.escape(host),
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
    print(f"{n} visuel(s) générés dans pins/")


if __name__ == "__main__":
    main()
