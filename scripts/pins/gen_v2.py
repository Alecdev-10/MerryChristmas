"""Vague 2 — 60 épingles commerciales (C1 à C4) vers les rayons. Aucun prix, aucune promo, aucune urgence."""
import json, datetime as dt

U = "https://merry-christmas-shop-2026.vercel.app"
FIN = " Lien affilié : nous pouvons toucher une commission."
AMB = json.load(open("/home/claude/v2/ambiance.json"))
X = json.load(open("/home/claude/v2/extra.json"))
P = json.load(open("/home/claude/v2/products.json"))
def src(k):
    return (AMB.get(k) or X[k])["src"]

R = {
 "sapins": dict(nom="sapins", ens="Les sapins", board="Sapin de Noël : idées déco", rayon="Sapins & pieds",
   photos=["sapins","x_sapins2","x_sapins1_b","x_sapins2_b"],
   desc="des sapins artificiels de 150 à 210 cm, des sapins floqués effet neige, des pieds réglables et des jupes pour cacher le pied",
   pour=["un grand salon lumineux","un petit appartement","une pièce avec cheminée","un séjour scandinave"],
   kw1=["sapin artificiel floqué 180 cm","sapin artificiel réaliste","sapin de noël artificiel"],
   kw2=["sapin floqué neige","jupe de sapin","pied de sapin réglable"],
   kw4=["boutique de noël en ligne","idées sapin de noël 2026"]),
 "guirlandes": dict(nom="lumières", ens="Les lumières", board="Guirlandes lumineuses de Noël", rayon="Guirlandes & lumières",
   photos=["guirlandes","x_guirl1","x_guirl2","x_guirl1_b"],
   desc="des guirlandes LED blanc chaud de 10 à 20 m, des fils cuivre à micro-LED, des guirlandes à piles et des rideaux d'étoiles pour les fenêtres",
   pour=["un salon cosy","une chambre","une grande fenêtre","un sapin de 180 cm"],
   kw1=["guirlande led blanc chaud","rideau lumineux fenêtre","guirlande lumineuse noël"],
   kw2=["guirlande lumineuse salon","guirlande fil cuivre","guirlande à piles"],
   kw4=["déco lumineuse noël","idées guirlandes noël 2026"]),
 "boules": dict(nom="boules", ens="Les boules", board="Boules de Noël rouge et or", rayon="Boules & suspensions",
   photos=["boules","x_boules2","x_boules1","x_boules2_b"],
   desc="des lots de boules incassables rouge et or, des boules en verre champagne, des grosses boules de 10 cm et des cimiers étoile",
   pour=["un sapin rouge et or","un sapin blanc et doré","une maison avec enfants","un sapin floqué"],
   kw1=["boules de noël rouge et or","boules de noël en verre","boules de noël champagne"],
   kw2=["lot boules de noël incassables","boules de noël or","cimier étoile"],
   kw4=["décoration sapin boules","idées boules de noël 2026"]),
 "figurines": dict(nom="village", ens="Le village", board="Village de Noël lumineux", rayon="Villages & figurines",
   photos=["figurines","x_village1","x_village2","x_village1_b"],
   desc="des maisons de village lumineuses à LED, des villages en bois avec minuterie, des maisons en céramique, des casse-noisettes et des figurines de Père Noël",
   pour=["une cheminée","un buffet","un rebord de fenêtre","une étagère de salon"],
   kw1=["village de noël lumineux","maison lumineuse noël","village de noël miniature"],
   kw2=["casse-noisette déco","figurine père noël","maison céramique led"],
   kw4=["déco cheminée noël","idées village de noël 2026"]),
 "table-de-noel": dict(nom="table", ens="La table", board="Déco table de Noël", rayon="Table de Noël",
   photos=["table-de-noel","x_table1","x_table2_b","x_table2"],
   desc="des chemins de table rouges, dorés et brodés, des centres de table à bougies, des photophores et des bougies LED sans flamme",
   pour=["un réveillon en famille","une table blanche et dorée","une table de fête rouge","un dîner entre amis"],
   kw1=["déco table de noël","centre de table noël","table de noël chic"],
   kw2=["chemin de table noël doré","bougies led sans flamme","centre de table bougies"],
   kw4=["décoration table réveillon","idées table de noël 2026"]),
 "exterieur": dict(nom="jardin", ens="Le jardin", board="Décoration de Noël extérieur", rayon="Déco extérieure",
   photos=["exterieur","x_ext1","x_ext2","x_ext1_b"],
   desc="des couronnes de porte, des couronnes lumineuses, des guirlandes étanches IP44, des guirlandes guinguette, des lanternes et un projecteur de façade",
   pour=["une porte d'entrée","un balcon","une façade de maison","une terrasse"],
   kw1=["décoration de noël extérieure","couronne de porte noël","déco porte d'entrée noël"],
   kw2=["guirlande extérieure ip44","projecteur noël extérieur","guirlande guinguette"],
   kw4=["illuminations de noël maison","idées déco extérieure noël 2026"]),
}
for slug, r in R.items():
    r["prod"] = [p for p in P if p["rayon"] == r["rayon"]]

STY = [
 ("déco noël scandinave","s_scandinave","Noël scandinave, tout le style","Déco de Noël scandinave","sapins","#efe6d6","#3a2a1e","bois clair, lin, laine et beaucoup de blanc, avec une lumière douce"),
 ("noël chic blanc et doré","s_chic","Blanc et doré, tout le style","Noël chic blanc et doré","boules","#f4ecdd","#7d5a24","boules or mates et brillantes, rubans crème et lumière blanc chaud"),
 ("déco noël chalet","s_chalet_b","L'esprit chalet à la maison","Déco de Noël 2026 : idées et tendances","figurines","#1e4c4a","#f3eef2","bois brut, rouge et vert sapin, casse-noisettes et lanternes"),
 ("noël winter wonderland","s_winter","Le Noël winter wonderland","Déco de Noël 2026 : idées et tendances","sapins","#dfe7ec","#2c3e4c","sapin floqué, verre, argent et neige au pied du sapin"),
 ("noël glam doré","s_glam","Le Noël glam doré","Noël chic blanc et doré","boules","#2a070d","#f2b544","boules dorées, guirlandes denses et reflets partout"),
 ("déco noël bohème","s_boheme","Le Noël bohème","Déco de Noël 2026 : idées et tendances","table-de-noel","#e8c9a6","#3a1a10","matières naturelles, bougies et tons terre"),
 ("noël rouge velours","s_opera_b","Le Noël rouge velours","Boules de Noël rouge et or","boules","#4a0d16","#f3eef2","rouge profond, nœuds en velours et sapin enneigé"),
 ("noël bleu et or","s_celeste","Le Noël bleu nuit et or","Déco de Noël 2026 : idées et tendances","guirlandes","#14213d","#d8b878","étoiles dorées, bleu nuit et lumières suspendues"),
 ("déco noël nordique","s_nordique","Le Noël nordique","Déco de Noël scandinave","table-de-noel","#f7f3ec","#2c3e4c","bougies blanches, bois clair et lumière basse"),
 ("déco noël cosy","s_cosy","Un Noël cosy à la maison","Déco de Noël 2026 : idées et tendances","guirlandes","#5a3520","#f3eef2","plaids, boissons chaudes, bougies et guirlandes chaudes"),
 ("noël traditionnel déco","s_trad_b","Le Noël traditionnel","Guides et astuces déco de Noël","figurines","#1e4c4a","#f2b544","rouge, vert, or, cheminée et chaussettes"),
 ("noël rouge et or chic","s_rougeor_b","Rouge et or, version chic","Boules de Noël rouge et or","boules","#7a1222","#f2b544","boules rouges et dorées, ruban or et lumière chaude"),
]

def fit(body, extra):
    extra = list(extra) + ["Déco de Noël 2026.", "Décoration de Noël 2026, idées maison.", "Mots-clés : décoration de Noël 2026, idées déco maison, inspiration salon et cadeaux.", "Mots-clés : décoration de Noël 2026, idées déco pour la maison, inspiration salon, cadeaux."]
    for e in extra:
        d = body + " " + e + FIN
        if 400 <= len(d) <= 450:
            return d
    # ajustement fin : on prend la plus proche et on tronque proprement si besoin
    best = min((body + " " + e + FIN for e in extra), key=lambda d: abs(len(d) - 425))
    if len(best) < 400:
        best = best.replace(FIN, " Bonne visite." + FIN)
    assert 380 <= len(best) <= 470, (len(best), body[:40])
    return best

pins = []
for slug, r in R.items():
    E = r["ens"].split(" ", 1)[1]
    cta = f"Entrez dans le rayon {r['nom']} de notre boutique virtuelle."
    for i, kw in enumerate(r["kw1"]):  # C1 · la vitrine du rayon
        body = (f"{kw[0].upper() + kw[1:]} : dans notre vitrine {r['ens'].lower()}, on trouve {r['desc']}. "
                f"Une sélection pensée pour {r['pour'][i]}, avec trois gammes de prix. {cta}")
        extra = [f"Mots-clés : {r['kw2'][i]}, déco de Noël 2026.", f"Idées : {r['kw2'][i]}, {r['kw4'][1]}, décoration de Noël.", f"À voir aussi : {r['kw2'][i]}, {r['kw4'][0]}, inspiration déco de Noël 2026."]
        pins.append(dict(rec="C1", slug=slug, kw=kw, titre=f"{kw[0].upper()+kw[1:]} : entrez dans notre rayon {r['nom']} de Noël", img=f"Entrez dans le rayon {r['nom']}", photo=src(r["photos"][i]), desc=fit(body, extra), board=r["board"]))
    for i, kw in enumerate(r["kw2"]):  # C2 · la sélection
        sel = r["prod"][i:] + r["prod"][:i]
        body = (f"{kw[0].upper() + kw[1:]} : quatre idées de notre rayon {r['nom']}, de la plus simple à la plus spectaculaire, pour {r['pour'][(i+1)%4]}. "
                f"Chaque article a sa fiche avec ce qu'il change chez vous. {cta}")
        extra = [f"Mots-clés : {r['kw1'][i]}, décoration de Noël 2026.", f"Idées : {r['kw1'][i]}, {r['kw4'][1]}, déco de Noël facile.", f"À voir aussi : {r['kw1'][i]}, {r['kw4'][0]}, inspiration déco de Noël 2026, idées cadeaux maison."]
        pins.append(dict(rec="C2", slug=slug, kw=kw, titre=f"{kw[0].upper()+kw[1:]} : 4 idées à découvrir dans notre boutique", img=f"La sélection {r['nom']}", grid=[src(p["id"]) for p in sel[:4]], desc=fit(body, extra), board=r["board"]))
    for i, kw in enumerate(r["kw4"]):  # C4 · la visite (version image fixe)
        body = (f"{kw[0].upper() + kw[1:]} : visitez notre boutique virtuelle de Noël en 3D, vitrine après vitrine. "
                f"Le rayon {r['nom']} présente {r['desc']}. {cta}")
        extra = ["Mots-clés : boutique de Noël, déco de Noël 2026.", "Idées : boutique de Noël, déco de Noël 2026, inspiration maison.", "À voir aussi : boutique de Noël en 3D, idées déco de Noël 2026, inspiration maison."]
        pins.append(dict(rec="C4", slug=slug, kw=kw, titre=f"{kw[0].upper()+kw[1:]} : visitez notre boutique de Noël en 3D", img="Visitez la boutique en 3D", bands=[src(k) for k in (r["photos"][3], r["photos"][(i+1)%3], r["photos"][(i+2)%3])], desc=fit(body, extra), board=r["board"]))
for kw, key, img, board, slug, bg, ink, quoi in STY:  # C3 · le style complet
    r = R[slug]
    body = (f"{kw[0].upper()+kw[1:]} : {quoi}. Pour recréer ce style chez vous, notre rayon {r['nom']} rassemble {r['desc']}. "
            f"Entrez dans le rayon {r['nom']} de notre boutique virtuelle.")
    extra = ["Mots-clés : style de Noël, déco de Noël 2026.", "Idées : style de Noël, déco de Noël 2026, inspiration salon.", "Inspiration : style de Noël, déco de Noël 2026, idées salon, maison."]
    pins.append(dict(rec="C3", slug=slug, kw=kw, titre=f"{kw[0].upper()+kw[1:]} : tout le style dans notre boutique de Noël 3D", img=img, photo=src(key), bg=bg, ink=ink, desc=fit(body, extra), board=board))

# Ordre : 6 cycles × (3 C1, 3 C2, 2 C3, 2 C4), en alternant les rayons
by = {c: [p for p in pins if p["rec"] == c] for c in ("C1", "C2", "C3", "C4")}
import itertools
def interleave(L):  # alterne les rayons
    groups = {}
    for p in L: groups.setdefault(p["slug"], []).append(p)
    out = []
    for t in itertools.zip_longest(*groups.values()):
        out += [x for x in t if x]
    return out
for c in by: by[c] = interleave(by[c])
order = []
for c in range(6):
    order += by["C1"][3*c:3*c+3] + by["C2"][3*c:3*c+3] + by["C3"][2*c:2*c+2] + by["C4"][2*c:2*c+2]
assert len(order) == 60, len(order)

# Calendrier : J+2 à J+10 (25 nov. → 2 déc.), 7 à 8 par jour, 07:00 → 21:00 UTC
for i, p in enumerate(order):
    day = 25 + i // 8 if i < 56 else 2  # 25→1er déc. (7 jours × 8 = 56), puis 2 déc.
    month = 11 if i < 48 else 12
    d = dt.date(2026, 11, 25) + dt.timedelta(days=i // 8)
    t = dt.datetime.combine(d, dt.time(7, 0)) + dt.timedelta(minutes=110 * (i % 8))
    p["n"] = f"P{49 + i:03d}"
    p["date"] = t.strftime("%Y-%m-%dT%H:%M:%S")
    p["dest"] = f"{U}/{p['slug']}"
    assert len(p["titre"]) <= 100 and len(p["img"].split()) <= 6, (p["titre"], p["img"])
json.dump(order, open("/home/claude/v2/vague2.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
from collections import Counter
print(Counter(p["rec"] for p in order), order[0]["date"], order[-1]["date"])
print(min(len(p["desc"]) for p in order), max(len(p["desc"]) for p in order), len({p["titre"] for p in order}), len({p["kw"] for p in order}))
