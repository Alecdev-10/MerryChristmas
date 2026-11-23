"""Rendu des 48 épingles de la vague 1 (1000×1500) — modèles T-GUIDE et T-GRILLE.

Même famille visuelle que la série « Imprimé à Noël » : papier coloré, deux encres décalées,
trame de points, grain. Titre en Bodoni très gras (lisible en miniature), 6 mots max sur l'image.
"""
import csv
import html
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

from data_v1 import RECETTES, STYLES, TILES, description

ROOT = Path(sys.argv[1])  # dossier contenant fonts/ et illustrations.json
OUT = Path(sys.argv[2])
ILLUS = json.loads((ROOT / "illustrations.json").read_text(encoding="utf-8"))

PAL = {
    "velours": dict(p="#4a0d16", a="#f3eef2", b="#f2b544", blend="screen"),
    "sapin": dict(p="#16352f", a="#f3eef2", b="#f2b544", blend="screen"),
    "or": dict(p="#f2b544", a="#7a1222", b="#1e4c4a", blend="multiply"),
    "rose": dict(p="#e8b4a6", a="#4a0d16", b="#1e4c4a", blend="multiply"),
    "givre": dict(p="#bcd3db", a="#7a1222", b="#16352f", blend="multiply"),
    "creme": dict(p="#efe6d6", a="#4a0d16", b="#b38a4d", blend="multiply"),
    "nuit": dict(p="#14213d", a="#f3eef2", b="#d8b878", blend="screen"),
}


def dessin(kind, color, stroke):
    return "".join(
        f'<path d="{e["d"]}" fill="{color if e["fill"] else "none"}" stroke="{color}" stroke-width="{stroke}" '
        f'stroke-linecap="round" stroke-linejoin="round"/>'
        for e in ILLUS[kind]
    )


def illus(kind, x, y, size, pal, stroke=3.4):
    off = size * 0.013
    return (
        f'<g filter="url(#encre)"><svg x="{x + off}" y="{y + off * .7}" width="{size}" height="{size}" viewBox="0 0 120 120" class="eb">{dessin(kind, pal["b"], stroke)}</svg>'
        f'<svg x="{x}" y="{y}" width="{size}" height="{size}" viewBox="0 0 120 120" class="ea">{dessin(kind, pal["a"], stroke)}</svg></g>'
    )


def soleil(cx, cy, r, color, op=.55):
    dots = []
    for gy in range(int(cy - r), int(cy + r), 15):
        for gx in range(int(cx - r), int(cx + r), 15):
            d = ((gx - cx) ** 2 + (gy - cy) ** 2) ** .5
            if d <= r:
                dots.append(f'<circle cx="{gx}" cy="{gy}" r="{1.2 + 5.6 * (1 - d / r) ** .8:.1f}"/>')
    return f'<g fill="{color}" opacity="{op}" class="eb">{"".join(dots)}</g>'


def flocons(seed, color, n=40):
    return f'<g fill="{color}" opacity=".45">' + "".join(
        f'<circle cx="{(seed * 131 + i * 227) % 1000}" cy="{(seed * 71 + i * 389) % 1500}" r="{1.5 + (i * 7 % 5) * .8}"/>'
        for i in range(n)) + "</g>"


CSS = """
@font-face{font-family:Bodoni;src:url(fonts/bodoni.woff2) format("woff2");font-weight:400 900}
@font-face{font-family:Bodoni;font-style:italic;src:url(fonts/bodoni-italic.woff2) format("woff2");font-weight:400 900}
@font-face{font-family:Jost;src:url(fonts/jost.woff2) format("woff2");font-weight:100 900}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1000px;height:1500px;overflow:hidden;background:var(--p);color:var(--a);font-family:Jost,sans-serif;position:relative}
.art{position:absolute;inset:0;width:1000px;height:1500px}
.ea,.eb{mix-blend-mode:var(--blend)}
.titre{position:absolute;left:70px;right:70px;top:96px;font-family:Bodoni;font-weight:800;font-variation-settings:'opsz' 11;
  line-height:.96;letter-spacing:-.012em;color:var(--a);text-shadow:5px 4px 0 var(--b)}
.titre em{font-style:italic;font-weight:600;display:block}
.pied{position:absolute;left:70px;right:70px;bottom:52px;display:flex;justify-content:space-between;align-items:baseline;font-size:24px;opacity:.85}
.pied b{font-family:Bodoni;font-style:italic;font-weight:600;font-size:32px}
.grain{position:absolute;inset:0;mix-blend-mode:overlay;opacity:.32;pointer-events:none}
.liste{position:absolute;left:70px;right:70px;list-style:none}
.liste li{display:flex;align-items:center;gap:22px;font-weight:500;font-size:37px;line-height:1.1;margin-bottom:22px}
.liste .n{flex:none;width:58px;height:58px;border-radius:50%;background:var(--a);color:var(--p);display:grid;place-items:center;
  font-family:Bodoni;font-weight:800;font-size:34px}
.liste .x{flex:none;width:52px;height:52px;display:grid;place-items:center;font-size:46px;font-weight:300;color:var(--b);line-height:1}
.nuancier{position:absolute;left:60px;right:60px;top:1110px;display:flex;justify-content:space-between}
.nuancier div{width:160px;text-align:center;font-size:23px;font-weight:500;line-height:1.15}
.nuancier span{display:block;width:150px;height:150px;margin:0 auto 14px;border-radius:50%;border:4px solid var(--a)}
.grille{position:absolute;left:70px;right:70px;top:440px;display:grid;grid-template-columns:1fr 1fr;gap:26px}
.tuile{height:420px;position:relative;overflow:hidden}
.tuile svg{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:290px;height:290px}
.tuile p{position:absolute;left:22px;bottom:18px;font-size:27px;font-weight:500}
"""


def doc(pal, seed, body, art):
    p = PAL[pal]
    return (f'<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>{CSS}'
            f':root{{--p:{p["p"]};--a:{p["a"]};--b:{p["b"]};--blend:{p["blend"]}}}</style></head><body>'
            f'<svg class="art" viewBox="0 0 1000 1500"><defs><filter id="encre" x="-5%" y="-5%" width="110%" height="110%">'
            f'<feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="{seed}" result="t"/>'
            f'<feDisplacementMap in="SourceGraphic" in2="t" scale="5" result="d"/>'
            f'<feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="{seed}" result="n"/>'
            f'<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -3 2.75" result="trous"/>'
            f'<feComposite in="d" in2="trous" operator="in"/></filter>'
            f'<filter id="flou"><feGaussianBlur stdDeviation="14"/></filter></defs>'
            f'{flocons(seed, p["a"])}{art}</svg>{body}'
            f'<div class="pied"><b>MerryChristmas, le guide</b><span>merry-christmas-shop-2026.vercel.app</span></div>'
            f'<svg class="grain" viewBox="0 0 1000 1500"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="{seed}"/>'
            f'<feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 1.4 -.35"/></filter><rect width="1000" height="1500" filter="url(#g)"/></svg>'
            f'</body></html>')


def titre(t, size):
    t = html.escape(t)
    if " : " in t:
        a, b = t.split(" : ", 1)
        t = f"{a}<em>{b}</em>"
    return f'<h1 class="titre" style="font-size:{size}px">{t}</h1>'


def tsize(t):
    n = len(t)
    return 118 if n <= 22 else 104 if n <= 28 else 94


def render_i1(x, seed):
    p = PAL[x["pal"]]
    art = soleil(500, 690, 270, p["b"]) + illus("sapin", 250, 380, 500, p, 3.2)
    steps = "".join(f'<li><span class="n">{i + 1}</span>{html.escape(s)}</li>' for i, s in enumerate(x["steps"]))
    body = titre(x["img"], tsize(x["img"])) + f'<ol class="liste" style="top:1000px">{steps}</ol>'
    return doc(x["pal"], seed, body, art)


I2_K = ["boules", "cimier", "couronne", "bougies", "centre", "lanterne"]


def render_i2(x, seed):
    p = PAL[x["pal"]]
    art = soleil(500, 760, 260, p["b"]) + illus(I2_K[seed % len(I2_K)], 270, 500, 460, p, 3.2)
    sw = "".join(f'<div><span style="background:{c}"></span>{html.escape(n)}</div>' for c, n in x["colors"])
    body = titre(x["img"], tsize(x["img"])) + f'<div class="nuancier">{sw}</div>'
    return doc(x["pal"], seed, body, art)


def render_i3(x, seed):
    p = PAL[x["pal"]]
    # Fond d'ambiance flouté et assombri : grand dessin + trame, passés au flou
    art = (f'<g filter="url(#flou)" opacity=".55">{soleil(720, 520, 420, p["b"], .7)}'
           f'<svg x="380" y="160" width="760" height="760" viewBox="0 0 120 120">{dessin(["guirlande", "sapin", "rideau", "couronne", "village", "lanterne"][seed % 6], p["b"], 5)}</svg></g>')
    items = "".join(f'<li><span class="x">✕</span>{html.escape(s)}</li>' for s in x["items"])
    body = titre(x["img"], tsize(x["img"])) + f'<ul class="liste" style="top:560px">{items}</ul>'
    return doc(x["pal"], seed, body, art)


def lum(h):
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (1, 3, 5))
    return .2126 * r + .7152 * g + .0722 * b


def encre(bg, st):
    """Encre lisible sur la tuile : la plus contrastée des deux encres du style."""
    return max((st["ink"], st["acc"]), key=lambda c: abs(lum(c) - lum(bg)))


def render_i4(x, seed):
    st = STYLES[x["style"]]
    tiles = "".join(
        f'<div class="tuile" style="background:{st["tiles"][i]}">'
        f'<svg viewBox="0 0 120 120">{dessin(k, encre(st["tiles"][i], st), 2.6)}</svg>'
        f'<p style="color:{encre(st["tiles"][i], st)}">{html.escape(lab)}</p></div>'
        for i, (k, lab) in enumerate(x.get("tiles", TILES)))
    body = titre(x["img"], tsize(x["img"])) + f'<div class="grille">{tiles}</div>'
    return doc(x["pal"], seed, body, "")


RENDER = {"I1": render_i1, "I2": render_i2, "I3": render_i3, "I4": render_i4}


def ordre():
    """6 cycles × 8 épingles : 2 de chaque recette par cycle, recettes alternées."""
    out = []
    for c in range(6):
        for k in range(2):
            for r in ("I1", "I2", "I3", "I4"):
                out.append(RECETTES[r][2 * c + k])
    return out


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    rows = []
    with sync_playwright() as pw:
        b = pw.chromium.launch(executable_path="/usr/bin/google-chrome")
        page = b.new_page(viewport={"width": 1000, "height": 1500})
        work = ROOT / "_v1.html"
        for i, x in enumerate(ordre()):
            n = f"P{i + 1:03d}"
            work.write_text(RENDER[x["recette"]](x, i + 7), encoding="utf-8")
            page.goto(work.as_uri())
            page.evaluate("document.fonts.ready")
            page.wait_for_timeout(120)
            page.screenshot(path=str(OUT / f"{n}.png"))
            cycle = i // 8 + 1
            pos = i % 8
            rows.append(dict(n=n, cycle=cycle, recette=x["recette"], kw=x["kw"], dest=x["dest"], titre=x["title"],
                             description=description(x), image=x["img"], tableau=x["board"],
                             publication="En direct" if pos < 3 else f"Programmer J+{pos % 3 + 1}"))
        b.close()
    with open(OUT / "vague1.csv", "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]), delimiter=";")
        w.writeheader()
        w.writerows(rows)
    json.dump(rows, open(OUT / "vague1.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(len(rows))


if __name__ == "__main__":
    main()
