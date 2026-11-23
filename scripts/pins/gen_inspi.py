import json, re, sys, unicodedata
sys.argv = ["x", "/home/claude/v1/assets", "/home/claude/v1/out"]
import data_v1 as D
import render_v1 as R

def slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s

def rayon(kw):
    k = kw.lower()
    for key, r in [("table", "table-de-noel"), ("réveillon", "table-de-noel"), ("extérieur", "exterieur"), ("guirlande", "guirlandes"),
                   ("lumière", "guirlandes"), ("village", "figurines"), ("chalet", "figurines"), ("traditionnel", "figurines"),
                   ("sapin", "sapins"), ("palette", "boules"), ("couleur", "boules"), ("bordeaux", "boules"), ("glam", "boules"), ("chic", "boules")]:
        if key in k:
            return r
    return "sapins"

used = set()
def uid(prefix, kw):
    k = slug(kw)
    base = k if k.startswith(prefix) else prefix + "-" + k
    s, n = base, 2
    while s in used:
        s = f"{base}-{n}"; n += 1
    used.add(s); return s

out = {"etapes": [], "palettes": [], "erreurs": [], "styles": []}
for x in D.I1:
    x["anchor"] = uid("etapes", x["kw"])
    p = R.PAL[x["pal"]]
    out["etapes"].append(dict(id=x["anchor"], titre=x["img"], texte=x["tips"], etapes=x["steps"], papier=p["p"], encre=p["a"], accent=p["b"], rayon=rayon(x["kw"])))
for x in D.I2:
    x["anchor"] = uid("palette", x["kw"])
    out["palettes"].append(dict(id=x["anchor"], titre=x["img"], texte=x["tips"], couleurs=[{"hex": c, "nom": n} for c, n in x["colors"]], rayon=rayon(x["kw"])))
for x in D.I3:
    x["anchor"] = uid("erreurs", x["kw"])
    p = R.PAL[x["pal"]]
    out["erreurs"].append(dict(id=x["anchor"], titre=x["img"], texte=x["tips"], erreurs=x["items"], papier=p["p"], encre=p["a"], accent=p["b"], rayon=rayon(x["kw"])))
for x in D.I4:
    x["anchor"] = uid("style", x["kw"])
    st = D.STYLES[x["style"]]
    tiles = [{"kind": k, "label": l, "fond": st["tiles"][i], "encre": R.encre(st["tiles"][i], st)} for i, (k, l) in enumerate(x["tiles"])]
    out["styles"].append(dict(id=x["anchor"], titre=x["img"], texte=x["tips"], vignettes=tiles, rayon=rayon(x["kw"])))

json.dump(out, open("out/inspiration.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)

# Liens actualisés : ancre propre à chaque épingle
rows = []
for i, x in enumerate(R.ordre()):
    pos = i % 8
    section = {"I1": "guide-sapin", "I2": "guide-palettes", "I3": "guide-erreurs", "I4": "guide-styles"}[x["recette"]]
    rows.append(dict(n=f"P{i + 1:03d}", cycle=i // 8 + 1, recette=x["recette"], kw=x["kw"],
                     dest=f"{D.U}/inspiration#{x['anchor']}", titre=x["title"], description=D.description(x),
                     image=x["img"], tableau=x["board"], publication="En direct" if pos < 3 else f"Programmer J+{pos % 3 + 1}"))
import csv
with open("out/vague1.csv", "w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0]), delimiter=";"); w.writeheader(); w.writerows(rows)
json.dump(rows, open("out/vague1.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print([e["id"] for e in out["etapes"]][:12]); print([e["id"] for e in out["erreurs"]]); print([e["id"] for e in out["styles"]]); print([e["id"] for e in out["palettes"]])
