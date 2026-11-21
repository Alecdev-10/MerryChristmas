"""Génère data/illustrations.json : dessins au trait (viewBox 120x120) par type de produit.
Chaque élément : {"d": path, "fill": bool}. Traits pensés pour stroke-width ~2.2, bouts arrondis."""
import json, math

def f(x):
    return f"{x:.1f}".rstrip("0").rstrip(".")

def circle(cx, cy, r):
    return f"M{f(cx-r)} {f(cy)}a{f(r)} {f(r)} 0 1 0 {f(2*r)} 0a{f(r)} {f(r)} 0 1 0 {f(-2*r)} 0"

def ellipse(cx, cy, rx, ry):
    return f"M{f(cx-rx)} {f(cy)}a{f(rx)} {f(ry)} 0 1 0 {f(2*rx)} 0a{f(rx)} {f(ry)} 0 1 0 {f(-2*rx)} 0"

def star(cx, cy, R, r, n=5, rot=-90):
    pts = []
    for i in range(n * 2):
        a = math.radians(rot + i * 180 / n)
        rad = R if i % 2 == 0 else r
        pts.append((cx + math.cos(a) * rad, cy + math.sin(a) * rad))
    return "M" + "L".join(f"{f(x)} {f(y)}" for x, y in pts) + "Z"

def flame(cx, cy, h=9, w=3.4):
    return f"M{f(cx)} {f(cy-h)}C{f(cx+w)} {f(cy-h*0.45)} {f(cx+w*0.8)} {f(cy)} {f(cx)} {f(cy)}C{f(cx-w*0.8)} {f(cy)} {f(cx-w)} {f(cy-h*0.45)} {f(cx)} {f(cy-h)}Z"

def quad(p0, c, p1, t):
    return ((1-t)**2*p0[0]+2*(1-t)*t*c[0]+t*t*p1[0], (1-t)**2*p0[1]+2*(1-t)*t*c[1]+t*t*p1[1])

S = lambda d: {"d": d, "fill": False}
F = lambda d: {"d": d, "fill": True}

I = {}

# Sapin
I["sapin"] = [
    S("M60 18L83 46H73L92 72H80L100 98H20L40 72H28L47 46H37Z"),
    S("M54 98V110H66V98"),
    F(star(60, 12, 7, 3)),
    F(circle(52, 62, 2.4)), F(circle(70, 80, 2.4)), F(circle(46, 86, 2.4)), F(circle(66, 54, 2)),
]

# Pied de sapin
I["pied"] = [
    S("M53 22H67V66H53Z"),
    S("M26 66H94L86 84H34Z"),
    S("M38 84L26 106M82 84L94 106M60 84V108"),
    S("M26 72H14M94 72H106"),
    F(circle(14, 72, 2.6)), F(circle(106, 72, 2.6)),
]

# Jupe / cache-pied
I["jupe"] = [
    S("M55 20V80M65 20V80"),
    S(ellipse(60, 84, 50, 15)),
    S(ellipse(60, 82, 9, 3)),
    S("M18 92Q20 100 30 98M102 92Q100 100 90 98"),
    F(circle(34, 84, 1.8)), F(circle(86, 85, 1.8)), F(circle(60, 94, 1.8)), F(circle(47, 92, 1.4)), F(circle(74, 92, 1.4)),
]

# Guirlande (ampoules fines)
els = []
for row, (y0, sag) in enumerate([(26, 26), (58, 22), (88, 18)]):
    p0, c, p1 = (6, y0), (60, y0 + sag * 2), (114, y0)
    els.append(S(f"M{p0[0]} {p0[1]}Q{c[0]} {c[1]} {p1[0]} {p1[1]}"))
    for k in range(1, 8):
        x, y = quad(p0, c, p1, k / 8)
        els.append(F(ellipse(x, y + 4, 2.6, 3.6)))
I["guirlande"] = els

# Rideau lumineux
els = [S("M10 14H110")]
for k, L in enumerate([70, 52, 84, 60, 92, 56, 76, 64, 88]):
    x = 16 + k * 11
    els.append(S(f"M{x} 14V{14+L}"))
    for y in range(24, 14 + L, 14):
        els.append(F(circle(x, y, 1.6)))
    els.append(F(star(x, 14 + L + 5, 5, 2.2)))
I["rideau"] = els

# Boules suspendues
els = []
for x, L, r in [(32, 30, 14), (62, 50, 17), (92, 24, 12)]:
    els.append(S(f"M{x} 4V{4+L}"))
    els.append(S(f"M{x-4} {4+L}H{x+4}V{4+L+5}H{x-4}Z"))
    els.append(S(circle(x, 4 + L + 5 + r, r)))
    els.append(S(f"M{f(x-r*0.55)} {f(4+L+5+r-r*0.35)}Q{x} {f(4+L+5+r+r*0.2)} {f(x+r*0.55)} {f(4+L+5+r-r*0.35)}"))
I["boules"] = els

# Cimier étoile
I["cimier"] = [
    S(star(60, 46, 34, 14)),
    S(star(60, 46, 20, 8.5)),
    S("M54 74L50 112H70L66 74"),
    S("M52 92H68"),
]

# Chemin de table
I["chemin"] = [
    S("M12 50L108 36M12 86L108 72"),
    S("M12 50L4 60L12 68L4 78L12 86"),
    S("M108 36L116 44L108 54L116 64L108 72"),
    F(star(38, 63, 5, 2.2)), F(star(60, 60, 6, 2.6)), F(star(82, 56, 5, 2.2)),
    S("M20 104H100"),
]

# Centre de table
I["centre"] = [
    S(ellipse(60, 84, 44, 14)),
    S(ellipse(60, 84, 28, 8)),
    S("M44 80V52H54V80M56 80V40H66V80M68 80V58H78V80"),
    F(flame(49, 50)), F(flame(61, 38)), F(flame(73, 56)),
    F(circle(26, 88, 2.4)), F(circle(94, 86, 2.4)), F(circle(40, 96, 2)), F(circle(82, 96, 2)),
]

# Bougies LED
I["bougies"] = [
    S("M18 98V70H40V98Z"), S("M50 98V56H72V98Z"), S("M82 98V76H104V98Z"),
    S("M29 70V64M61 56V50M93 76V70"),
    F(flame(29, 62)), F(flame(61, 48)), F(flame(93, 68)),
    S("M10 98H112"),
]

# Couronne de porte
I["couronne"] = [
    S(circle(60, 60, 36)),
    S(circle(60, 60, 22)),
    S("M60 82L46 104M60 82L74 104"),
    S("M60 82C50 72 40 78 46 86C50 92 58 86 60 82C62 86 70 92 74 86C80 78 70 72 60 82Z"),
    F(circle(38, 44, 2.6)), F(circle(80, 40, 2.6)), F(circle(90, 66, 2.6)), F(circle(30, 70, 2.6)), F(circle(60, 26, 2.6)),
]

# Lanterne
I["lanterne"] = [
    S(circle(60, 12, 5)),
    S("M44 30L60 18L76 30Z"),
    S("M42 30H78V98H42Z"),
    S("M48 36H72V92H48Z"),
    S("M38 98H82V106H38Z"),
    S("M56 88V72H64V88"),
    F(flame(60, 70, 8, 3)),
]

# Guirlande guinguette
els = []
p0, c, p1 = (6, 24), (60, 70), (114, 24)
els.append(S(f"M6 24Q60 70 114 24"))
for k in range(1, 6):
    x, y = quad(p0, c, p1, k / 6)
    els.append(S(f"M{f(x)} {f(y)}V{f(y+6)}"))
    els.append(S(circle(x, y + 13, 7)))
I["guinguette"] = els

json.dump(I, open("data/illustrations.json", "w"), indent=1)
print(list(I))
