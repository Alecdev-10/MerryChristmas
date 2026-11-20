"""Génère les visuels d'épingles Pinterest (1000x1500) depuis la feuille « Épingles » du tableur.

Usage :  python scripts/make-pins.py [chemin/vers/tableur.xlsx]
Sortie : pins/E001.png, pins/E002.png, ...

Photo de fond (facultatif) : déposez pins/backgrounds/<slug>.jpg (ex. sapins.jpg, guirlandes.jpg).
Utilisez uniquement vos propres photos ou des photos libres de droits (pas les photos produits Amazon).
Dépendances : pip install pillow openpyxl
"""
import os
import sys
from urllib.parse import urlparse

import openpyxl
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1000, 1500
COLORS = {
    "sapins": (31, 107, 58),
    "guirlandes": (150, 105, 20),
    "boules": (150, 30, 25),
    "table-de-noel": (110, 70, 35),
    "exterieur": (35, 75, 115),
}
CREAM = (251, 246, 236)
GOLD = (242, 193, 78)

FONT_CANDIDATES = {
    "title": ["DejaVuSerif-Bold.ttf", "georgiab.ttf", "timesbd.ttf"],
    "label": ["Lato-Black.ttf", "Lato-Bold.ttf", "DejaVuSans-Bold.ttf", "arialbd.ttf"],
    "small": ["Lato-Bold.ttf", "DejaVuSans.ttf", "arial.ttf"],
}
FONT_DIRS = ["/usr/share/fonts/truetype/dejavu", "/usr/share/fonts/truetype/lato", "C:/Windows/Fonts", "/Library/Fonts", "."]


def font(kind, size):
    for name in FONT_CANDIDATES[kind]:
        for d in FONT_DIRS:
            p = os.path.join(d, name)
            if os.path.exists(p):
                return ImageFont.truetype(p, size)
    return ImageFont.load_default(size)


def wrap(draw, text, fnt, max_w):
    words, lines, line = text.split(), [], ""
    for w in words:
        test = f"{line} {w}".strip()
        if draw.textlength(test, font=fnt) <= max_w:
            line = test
        else:
            lines.append(line)
            line = w
    if line:
        lines.append(line)
    return lines


def background(slug):
    base = COLORS.get(slug, (31, 77, 51))
    photo = os.path.join("pins", "backgrounds", f"{slug}.jpg")
    if os.path.exists(photo):
        img = Image.open(photo).convert("RGB")
        scale = max(W / img.width, H / img.height)
        img = img.resize((int(img.width * scale), int(img.height * scale)))
        left, top = (img.width - W) // 2, (img.height - H) // 2
        img = img.crop((left, top, left + W, top + H))
        shade = Image.new("RGB", (W, H), base)
        return Image.blend(img, shade, 0.35)
    # Fond uni + halos lumineux façon guirlande floutée
    img = Image.new("RGB", (W, H), base)
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g = ImageDraw.Draw(glow)
    spots = [(120, 160, 70), (860, 240, 90), (300, 420, 50), (780, 1180, 80), (160, 1300, 60), (640, 90, 40), (920, 820, 55), (60, 760, 45)]
    for x, y, r in spots:
        g.ellipse([x - r, y - r, x + r, y + r], fill=GOLD + (120,))
    glow = glow.filter(ImageFilter.GaussianBlur(28))
    img.paste(glow, (0, 0), glow)
    return img


def render(pin_id, title, board, url, out_dir="pins"):
    slug = urlparse(url).path.strip("/") or "sapins"
    img = background(slug)
    d = ImageDraw.Draw(img)

    # Panneau central crème
    pad, top, bottom = 70, 330, 1180
    panel = Image.new("RGBA", (W - 2 * pad, bottom - top), CREAM + (238,))
    img.paste(panel, (pad, top), panel)

    # Étiquette du haut
    lab = font("label", 34)
    tag = "IDÉES DÉCO DE NOËL"
    tw = d.textlength(tag, font=lab)
    d.rounded_rectangle([(W - tw) / 2 - 28, 200, (W + tw) / 2 + 28, 262], radius=31, fill=GOLD)
    d.text((W / 2, 231), tag, font=lab, fill=(43, 33, 24), anchor="mm")

    # Titre, taille ajustée pour tenir dans le panneau
    max_w = W - 2 * pad - 100
    for size in range(84, 40, -4):
        tf = font("title", size)
        lines = wrap(d, title, tf, max_w)
        line_h = int(size * 1.22)
        if len(lines) * line_h <= (bottom - top) - 200:
            break
    block = len(lines) * line_h
    y = top + ((bottom - top) - 120 - block) / 2 + line_h / 2
    color = COLORS.get(slug, (31, 77, 51))
    for ln in lines:
        d.text((W / 2, y), ln, font=tf, fill=color, anchor="mm")
        y += line_h

    # Rayon en bas du panneau
    sm = font("small", 34)
    d.line([(W / 2 - 60, bottom - 120), (W / 2 + 60, bottom - 120)], fill=GOLD, width=4)
    d.text((W / 2, bottom - 70), board, font=sm, fill=(107, 93, 79), anchor="mm")

    # Pied : adresse du site
    host = urlparse(url).netloc or "merrychristmas"
    d.text((W / 2, 1330), host, font=font("label", 36), fill=CREAM, anchor="mm")

    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, f"{pin_id}.png")
    img.save(path, optimize=True)
    return path


def main():
    xlsx = sys.argv[1] if len(sys.argv) > 1 else os.path.join("pilotage", "Pilotage_Pinterest_Noel.xlsx")
    ws = openpyxl.load_workbook(xlsx, data_only=False)["Épingles"]
    n = 0
    for row in ws.iter_rows(min_row=3, values_only=True):
        pin_id, title, _desc, board, _kw, _pid, _prod, url = row[:8]
        if not pin_id or not title or not url:
            continue
        print(render(str(pin_id), str(title), str(board or ""), str(url)))
        n += 1
    print(f"{n} visuel(s) générés dans pins/")


if __name__ == "__main__":
    main()
