"""Vague 3 — 84 épingles « achat » (F1 à F4). Aucun prix inventé, aucune réduction chiffrée, aucune date de livraison promise."""
import json, datetime as dt, itertools

U = "https://merry-christmas-shop-2026.vercel.app"
FIN = " Lien affilié : nous pouvons toucher une commission."
RAPPEL = " Prix, offres et délais de livraison sont à vérifier sur Amazon."
CTA = " Voir la sélection dans notre boutique et commander sur Amazon."
AMB = json.load(open("/home/claude/v2/ambiance.json")); X = json.load(open("/home/claude/v2/extra.json"))
P = json.load(open("/home/claude/v2/products.json"))
src = lambda k: (AMB.get(k) or X[k])["src"]

RAY = {  # slug: (objet, board, enseigne, photos pour F1/F4, rayon tableur)
 "sapins": ("sapin artificiel", "Sapin de Noël : idées déco", "sapins", ["sapins", "x_sapins2", "P002", "x_sapins1_b"], "Sapins & pieds"),
 "guirlandes": ("guirlande lumineuse", "Guirlandes lumineuses de Noël", "lumières", ["guirlandes", "x_guirl1", "P008", "P028"], "Guirlandes & lumières"),
 "boules": ("boules de noël", "Boules de Noël rouge et or", "boules", ["boules", "x_boules2_b", "P011", "x_boules1"], "Boules & suspensions"),
 "figurines": ("village de noël", "Village de Noël lumineux", "village", ["figurines", "x_village1", "P034", "P033"], "Villages & figurines"),
 "table-de-noel": ("déco table de noël", "Déco table de Noël", "table", ["table-de-noel", "x_table2_b", "P041", "P019"], "Table de Noël"),
 "exterieur": ("décoration extérieure noël", "Décoration de Noël extérieur", "jardin", ["exterieur", "x_ext2", "P023", "P022"], "Déco extérieure"),
}
SLUGS = list(RAY)

def cap(s):
    s = s.replace("black friday", "Black Friday")
    return s[0].upper() + s[1:]

def fit(body, extras):
    extras = list(extras) + ["Déco de Noël 2026.", "Idées déco de Noël 2026 pour toute la maison.",
                             "Mots-clés : décoration de Noël 2026, idées cadeaux maison, déco de fête facile."]
    for e in extras:
        d = body + " " + e + RAPPEL + CTA + FIN
        if 400 <= len(d) <= 450: return d
    d = min((body + " " + e + RAPPEL + CTA + FIN for e in extras), key=lambda d: abs(len(d) - 425))
    if len(d) < 400: d = d.replace(FIN, " Bonne visite." + FIN)
    if len(d) > 450:  # on retire la phrase de mots-clés
        d = body + RAPPEL + CTA + FIN
    return d

def short(name):
    n = name.split(" (")[0]
    return n if len(n) <= 46 else n[:44].rsplit(" ", 1)[0] + "…"

pins = []
# F1 · Black Friday (21)
f1kw = []
for s in SLUGS:
    o = RAY[s][0]
    f1kw += [(s, f"black friday {o}"), (s, f"{o} black friday 2026"), (s, f"sélection black friday {o}")]
f1kw += [("sapins", "black friday déco noël"), ("guirlandes", "black friday décoration de noël 2026"), ("figurines", "black friday idées cadeaux déco")]
for i, (s, kw) in enumerate(f1kw):
    o, board, ens, photos, _ = RAY[s]
    body = (f"{cap(kw)} : la semaine du Black Friday est le bon moment pour s'équiper avant les fêtes. "
            f"Notre rayon {ens} rassemble une sélection notée par les clients, en trois gammes.")
    pins.append(dict(rec="F1", slug=s, kw=kw, titre=f"{cap(kw)} : notre sélection à voir sur Amazon"[:100],
                     img=["Black Friday : la sélection", "Sélection Black Friday", "Le Black Friday de Noël"][i % 3],
                     band="Sélection Black Friday", photo=src(photos[i % 4]),
                     desc=fit(body, [f"Mots-clés : {o}, déco de Noël 2026, cadeaux maison."]), board=board))
# F2 · Petit budget (21)
f2kw = []
F2O = {"sapins": "déco sapin", "guirlandes": "guirlande lumineuse", "boules": "boules de noël", "figurines": "village de noël",
       "table-de-noel": "déco table de noël", "exterieur": "décoration extérieure noël"}
for s in SLUGS:
    o = F2O[s]
    f2kw += [(s, f"{o} pas cher"), (s, f"{o} petit budget"), (s, f"idée cadeau {o}")]
f2kw += [("boules", "déco noël petit budget"), ("table-de-noel", "idée cadeau déco noël"), ("guirlandes", "cadeau noël maison")]
for i, (s, kw) in enumerate(f2kw):
    o, board, ens, photos, ray = RAY[s]
    pool = [p for p in P if p.get("gamme") == "Petit prix"]
    own = [p for p in pool if p["rayon"] == ray]
    rest = [p for p in pool if p["rayon"] != ray]
    sel = (own + rest)[i % 2:][:6] if len(own) >= 2 else (own + rest[i:] + rest[:i])[:6]
    body = (f"{cap(kw)} : six idées de notre boutique dans la gamme petit prix, pour décorer sans se ruiner "
            f"ou offrir une jolie attention. Chaque article a sa fiche avec ce qu'il apporte chez vous.")
    pins.append(dict(rec="F2", slug=s, kw=kw, titre=f"{cap(kw)} : 6 idées déco de Noël à petit prix"[:100],
                     img=["Idées déco petit budget", "Noël à petit prix", "6 idées petit budget"][i % 3],
                     tiles=[dict(photo=src(p["id"]), nom=short(p["name"])) for p in sel],
                     desc=fit(body, [f"Mots-clés : {o}, cadeau de Noël, déco de Noël 2026."]), board=board))
# F3 · Le look complet (21)
LOOKS = [
 ("rouge et or", ["sapins", "P001", "s_rougeor_b"], ["P006", "x_guirl1", "P029"], ["P011", "P012", "x_boules2_b"], "Boules de Noël rouge et or"),
 ("blanc et doré", ["P026", "s_chic_b", "s_winter"], ["P028", "P007", "x_guirl2_b"], ["P031", "P015", "P030"], "Noël chic blanc et doré"),
 ("champagne", ["s_glam_b", "P004", "x_sapins2_b"], ["P007", "P020", "P028"], ["P030", "s_glam", "P013"], "Noël chic blanc et doré"),
 ("floqué blanc", ["s_winter", "P026", "P003"], ["P009", "P010", "x_guirl2_b"], ["x_boules1", "P031", "P014"], "Sapin de Noël : idées déco"),
 ("nature", ["P027", "P005", "s_boheme"], ["P024", "P006", "P008"], ["P013", "x_boules1_b", "P017"], "Déco de Noël 2026 : idées et tendances"),
 ("scandinave", ["s_scandinave", "s_scandinave_b", "P002"], ["x_guirl2_b", "P028", "P007"], ["P014", "P035", "P031"], "Déco de Noël scandinave"),
 ("bordeaux et or", ["s_rougeor_b", "s_opera_b", "x_sapins2"], ["x_guirl1", "P029", "P006"], ["x_boules2_b", "P012", "s_rougeor"], "Boules de Noël rouge et or"),
]
for style, sap, lum, bou, board in LOOKS:
    for v, kw in enumerate([f"sapin {style} complet", f"déco sapin {style}", f"kit déco noël {style}"]):
        body = (f"{cap(kw)} : le sapin, la lumière et les boules choisis pour aller ensemble, de quoi composer tout le look "
                f"{style} en une seule visite. Commencez par le sapin, ajoutez la guirlande puis les boules.")
        pins.append(dict(rec="F3", slug="sapins", kw=kw, titre=f"{cap(kw)} : tout le look en un clic"[:100],
                         img=f"Le look {style}" if len(f"Le look {style}".split()) <= 6 else "Le look complet",
                         trio=[src(sap[v]), src(lum[v]), src(bou[v])],
                         desc=fit(body, [f"Mots-clés : sapin de noël complet, look {style}, déco de Noël 2026."]), board=board))
# F4 · Dernière minute (21)
f4kw = []
for s in SLUGS:
    o = RAY[s][0]
    f4kw += [(s, f"{o} dernière minute"), (s, f"idée {o} de dernière minute"), (s, f"{o} à commander vite")]
f4kw += [("sapins", "déco noël dernière minute"), ("figurines", "cadeau noël rapide"), ("table-de-noel", "déco de fête dernière minute")]
for i, (s, kw) in enumerate(f4kw):
    o, board, ens, photos, _ = RAY[s]
    body = (f"{cap(kw)} : il reste quelques jours avant le réveillon. Dans notre rayon {ens}, nos idées faciles à installer, "
            f"triées en trois gammes pour choisir en deux minutes.")
    pins.append(dict(rec="F4", slug=s, kw=kw, titre=f"{cap(kw)} : nos idées à commander"[:100],
                     img=["Déco de dernière minute", "Noël de dernière minute", "Il est encore temps"][i % 3],
                     band="Dernière minute", photo=src(photos[(i + 1) % 4]),
                     desc=fit(body, [f"Mots-clés : {o}, cadeau de Noël, déco de Noël 2026."]), board=board))

# Calendrier (UTC) : F1 26/11→1/12 · F2 27/11→19/12 · F3 28/11→20/12 · F4 8/12→20/12
def spread(L, d0, d1, hours):
    days = (d1 - d0).days + 1
    for i, p in enumerate(L):
        d = d0 + dt.timedelta(days=int(i * days / len(L)))
        h = hours[i % len(hours)]
        p["date"] = dt.datetime.combine(d, dt.time(h, 15 * (i % 4))).strftime("%Y-%m-%dT%H:%M:%S")
by = {r: [p for p in pins if p["rec"] == r] for r in ("F1", "F2", "F3", "F4")}
spread(by["F1"], dt.date(2026, 11, 26), dt.date(2026, 12, 1), [8, 12, 17, 20])
spread(by["F2"], dt.date(2026, 11, 27), dt.date(2026, 12, 19), [10, 18])
spread(by["F3"], dt.date(2026, 11, 28), dt.date(2026, 12, 20), [9, 19])
spread(by["F4"], dt.date(2026, 12, 8), dt.date(2026, 12, 20), [11, 16, 21])
pins.sort(key=lambda p: p["date"])
for i, p in enumerate(pins):
    p["n"] = f"P{109 + i:03d}"
    p["dest"] = f"{U}/{p['slug']}"
    assert len(p["titre"]) <= 100 and len(p["img"].split()) <= 6, (p["titre"], p["img"])
    assert "%" not in p["desc"] and "€" not in p["desc"]
json.dump(pins, open("/home/claude/v2/vague3.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
from collections import Counter
print(len(pins), Counter(p["rec"] for p in pins), pins[0]["date"], pins[-1]["date"])
L = [len(p["desc"]) for p in pins]; print(min(L), max(L), len({p["titre"] for p in pins}), len({p["kw"] for p in pins}))
print(Counter(p["date"][:10] for p in pins))
