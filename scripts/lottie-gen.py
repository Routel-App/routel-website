"""Generates the site's Lottie files (public/lottie) in the shared illustration
language of src/components/motion/sprites.tsx: the same container (ribs and
corner castings, the booking's own one orange), the same ship, the same
palette. Run: python3 scripts/lottie-gen.py public/lottie

Placeholders until designed animations replace them; keep the names."""
import json, os, sys

OUT = sys.argv[1]


def hexc(h):
    h = h.lstrip('#'); return [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)] + [1]


# sprites.tsx palette
INK_BG, INK_DEEP, INK_HULL, INK_STEEL, INK_LINE = map(hexc, ["#09090b", "#121316", "#1c1e23", "#292c33", "#3a3e47"])
HERO, TEAL, TEAL_DEEP, SEA, FOG, FOG_LIGHT, WHITE, AMBER = map(hexc, ["#f7941d", "#47bcac", "#1fa192", "#13544f", "#c9c9c5", "#efefed", "#ffffff", "#fab660"])
BOX_PALETTE = [TEAL, FOG, INK_LINE, TEAL_DEEP, FOG_LIGHT, AMBER]
def box_color(i): return BOX_PALETTE[i % len(BOX_PALETTE)]


def st(v): return {"a": 0, "k": v}
def ease_o(): return {"x": [0.42], "y": [0]}
def ease_i(): return {"x": [0.2], "y": [1]}
def anim(kfs):
    out = []
    for n, (t, v) in enumerate(kfs):
        k = {"t": t, "s": v if isinstance(v, list) else [v]}
        if n < len(kfs) - 1:
            k["i"] = ease_i(); k["o"] = ease_o()
        out.append(k)
    return {"a": 1, "k": out}
def tr(): return {"ty": "tr", "p": st([0, 0]), "a": st([0, 0]), "s": st([100, 100]), "r": st(0), "o": st(100), "sk": st(0), "sa": st(0)}
def rect(w, h, x=0, y=0, r=3): return {"ty": "rc", "d": 1, "s": st([w, h]), "p": st([x, y]), "r": st(r)}
def ellipse(w, h, x=0, y=0): return {"ty": "el", "d": 1, "s": st([w, h]), "p": st([x, y])}
def fill(c, o=100): return {"ty": "fl", "c": st(c), "o": st(o), "r": 1}
def stroke(c, w): return {"ty": "st", "c": st(c), "o": st(100), "w": st(w), "lc": 2, "lj": 2}
def path(pts, closed=False, smooth=0):
    i = [[-smooth, 0]] * len(pts) if smooth else [[0, 0]] * len(pts)
    o = [[smooth, 0]] * len(pts) if smooth else [[0, 0]] * len(pts)
    return {"ty": "sh", "ks": st({"i": i, "o": o, "v": pts, "c": closed})}
def group(*items): return {"ty": "gr", "it": list(items) + [tr()]}
def layer(ind, name, shapes, p, o=None, s=None, r=None, op=180):
    return {"ddd": 0, "ind": ind, "ty": 4, "nm": name, "sr": 1, "ao": 0, "ip": 0, "op": op, "st": 0, "bm": 0,
            "ks": {"o": o or st(100), "r": r or st(0), "p": p if isinstance(p, dict) and "a" in p else st(p),
                   "a": st([0, 0, 0]), "s": s or st([100, 100, 100])},
            "shapes": shapes}
def comp(name, layers, w=400, h=300, op=180):
    return {"v": "5.7.4", "fr": 60, "ip": 0, "op": op, "w": w, "h": h, "nm": name, "ddd": 0, "assets": [], "layers": layers}


def container(color, w=88, h=40, hero=False):
    """The sprites.tsx ContainerBox: ribs, corner castings, a plate on the hero."""
    ribs = max(2, round(w / 14))
    items = []
    for i in range(1, ribs):
        items.append(group(rect(1.6, h * 0.72, -w / 2 + i * w / ribs, 0, 0), fill(INK_BG, 22)))
    cw, ch = w * 0.07, h * 0.2
    items.append(group(rect(cw, ch, -w / 2 + 1.5 + cw / 2, -h / 2 + 1.5 + ch / 2, 0), fill(INK_BG, 28)))
    items.append(group(rect(cw, ch, w / 2 - 1.5 - cw / 2, -h / 2 + 1.5 + ch / 2, 0), fill(INK_BG, 28)))
    if hero:
        items.append(group(rect(w * 0.4, h * 0.24, 0, 0, 1), fill(INK_BG, 35)))
    items.append(group(rect(w, h, 0, 0, 3), fill(HERO if hero else color)))
    return items


def check_badge(color=TEAL_DEEP, size=44):
    tick = group(path([[-9, 0], [-3, 6], [9, -7]]), stroke(WHITE, 4))
    return [tick, group(ellipse(size, size), fill(color))]


def fade_loop(op, at):
    return anim([(0, [100]), (at, [100]), (op - 4, [0]), (op, [0])])


# 1. Containers stacking on a quay, the booking's orange one first, then a check.
def containers_stack():
    op = 180
    ground = layer(1, "quay", [group(rect(300, 6, 0, 0, 2), fill(INK_LINE))], [200, 254, 0], op=op)
    base = [layer(2 + i, f"base{i}", container(c), [x, 233, 0], op=op) for i, (x, c) in enumerate([(155, box_color(2)), (245, box_color(1))])]
    drops = []
    for i, (x, y, c, t0) in enumerate([(155, 195, HERO, 10), (245, 195, TEAL, 38), (155, 157, FOG_LIGHT, 66)]):
        p = anim([(0, [x, -40, 0]), (t0, [x, -40, 0]), (t0 + 22, [x, y + 3, 0]), (t0 + 28, [x, y, 0]), (op, [x, y, 0])])
        drops.append(layer(10 + i, f"drop{i}", container(c, hero=(i == 0)), p, o=fade_loop(op, 150), op=op))
    badge = layer(20, "check", check_badge(), [300, 120, 0],
                  s=anim([(0, [0, 0, 100]), (100, [0, 0, 100]), (112, [115, 115, 100]), (120, [100, 100, 100]), (op, [100, 100, 100])]),
                  o=fade_loop(op, 150), op=op)
    return comp("containers-stack", [badge, *drops[::-1], *base, ground], op=op)


def doc(color=WHITE, lines=FOG_LIGHT, stamp=False):
    ls = [group(rect(w, 5, (w - 52) / 2, y, 2), fill(lines)) for w, y in ((52, -18), (40, -6), (48, 6), (30, 18))]
    items = [*ls]
    if stamp:
        items.insert(0, group(ellipse(14, 14, 28, 36), fill(TEAL_DEEP)))
    items.append(group(rect(76, 96, 0, 0, 8), fill(color)))
    return items


# 2. Scattered documents merging into one booking card: "seven files, one record".
def docs_merge():
    op = 200
    starts = [(70, 70, -14), (330, 60, 10), (60, 220, 8), (340, 225, -9), (200, 40, 4)]
    layers = []
    for i, (x, y, rot) in enumerate(starts):
        t0 = 20 + i * 10
        p = anim([(0, [x, y, 0]), (t0, [x, y, 0]), (t0 + 36, [200, 150, 0]), (op, [200, 150, 0])])
        r = anim([(0, [rot]), (t0, [rot]), (t0 + 36, [0]), (op, [0])])
        o = anim([(0, [100]), (t0 + 30, [100]), (t0 + 40, [0]), (op, [0])])
        layers.append(layer(2 + i, f"doc{i}", doc(), p, r=r, o=o, op=op))
    final_s = anim([(0, [70, 70, 100]), (82, [70, 70, 100]), (98, [108, 108, 100]), (106, [100, 100, 100]), (op, [100, 100, 100])])
    final_o = anim([(0, [0]), (82, [0]), (90, [100]), (op - 16, [100]), (op - 4, [0]), (op, [0])])
    # the booking card: dark, with the orange container drawn on it
    card_items = [group(rect(52, 5, -12, 20, 2), fill(INK_LINE)), group(rect(36, 5, -20, 32, 2), fill(INK_LINE))]
    hero_box = container(HERO, 60, 26, hero=True)
    for it in hero_box:
        it["it"][-1]["p"] = st([0, -14])
    booking = layer(20, "booking", [*card_items, *hero_box, group(rect(110, 110, 0, 0, 10), fill(INK_STEEL))],
                    [200, 150, 0], s=final_s, o=final_o, op=op)
    badge = layer(21, "check", check_badge(TEAL, 34), [244, 104, 0],
                  s=anim([(0, [0, 0, 100]), (104, [0, 0, 100]), (116, [115, 115, 100]), (122, [100, 100, 100]), (op, [100, 100, 100])]),
                  o=final_o, op=op)
    return comp("docs-merge", [badge, booking, *layers[::-1]], op=op)


# 3. The container ship riding the swell (seamless loop), as sprites.tsx draws it.
def ship_wave():
    op = 240
    L, D = 240, 30
    hull = group(path([[-L / 2, 0], [L / 2, 0], [L / 2 - 20, D], [-L / 2 + 16, D]], True), fill(INK_HULL))
    stripe = group(rect(L - 8, 3, 0, 6, 1), fill(HERO))
    bridge = group(rect(34, 40, L / 2 - 46, -20, 3), fill(FOG_LIGHT))
    bridge_win = group(rect(24, 5, L / 2 - 46, -30, 1), fill(INK_LINE))
    boxes = []
    for row in range(2):
        for col in range(5):
            x = -L / 2 + 36 + col * 34
            y = -10 - row * 18
            hero = (row == 1 and col == 2)
            for it in container(box_color(col * 2 + row), 30, 16, hero=hero):
                it["it"][-1]["p"] = st([x, y])
                boxes.append(it)
    ship = layer(5, "ship", [stripe, bridge_win, bridge, *boxes, hull],
                 anim([(0, [200, 160, 0]), (60, [200, 166, 0]), (120, [200, 160, 0]), (180, [200, 166, 0]), (240, [200, 160, 0])]),
                 r=anim([(0, [-1.5]), (60, [1.5]), (120, [-1.5]), (180, [1.5]), (240, [-1.5])]), op=op)
    def wave(y, color, o, speed_px, ind):
        pts = [[-60 + k * 40, y + (6 if k % 2 else -6)] for k in range(14)]
        g = group(path(pts, smooth=14), stroke(color, 4))
        return layer(ind, f"wave{y}", [g], anim([(0, [0, 0, 0]), (op, [-speed_px, 0, 0])]), o=st(o), op=op)
    sea = layer(0, "sea", [group(rect(400, 110, 200, 245, 0), fill(SEA))], [0, 0, 0], op=op)
    return comp("ship-wave", [wave(190, TEAL, 80, 80, 1), ship, wave(205, hexc("#7cd6c7"), 60, 160, 6), sea], op=op)


# 4. A spreadsheet's cells fly into the booking's container: "from Excel to one record".
def sheet_to_system():
    op = 220
    # the sheet: a grid of cells, a few of them "wrong" (orange), on the left
    cells = []
    cols, rows = 5, 6
    cw, chh = 46, 20
    x0, y0 = 40, 70
    layers = []
    k = 0
    for r in range(rows):
        for c in range(cols):
            x = x0 + c * cw + cw / 2
            y = y0 + r * chh + chh / 2
            bad = (r, c) in ((1, 3), (3, 1), (4, 4))
            t0 = 30 + (r * cols + c) * 2
            # each cell flies to the container at (300, 170), shrinking, staggered
            p = anim([(0, [x, y, 0]), (t0, [x, y, 0]), (t0 + 34, [300, 170, 0]), (op, [300, 170, 0])])
            s = anim([(0, [100, 100, 100]), (t0, [100, 100, 100]), (t0 + 34, [10, 10, 100]), (op, [10, 10, 100])])
            o = anim([(0, [100]), (t0 + 28, [100]), (t0 + 34, [0]), (op - 6, [0]), (op, [100])])
            col = hexc("#fde8d2") if bad else WHITE
            cell = [group(rect(cw - 4, chh - 4, 0, 0, 2), fill(col)),
                    group(rect(cw - 16, 4, 0, 0, 2), fill(HERO if bad else FOG))]
            layers.append(layer(10 + k, f"cell{k}", cell, p, s=s, o=o, op=op))
            k += 1
    frame = layer(5, "sheet", [group(rect(cols * cw + 12, rows * chh + 40, x0 + cols * cw / 2 - 2, y0 + rows * chh / 2 - 12, 8), fill(FOG_LIGHT)),
                               group(rect(cols * cw + 12, 22, x0 + cols * cw / 2 - 2, y0 - 21, 4), fill(hexc("#1d6f42")))],
                  [0, 0, 0], o=anim([(0, [100]), (120, [100]), (150, [25]), (op - 6, [25]), (op, [100])]), op=op)
    # the booking's container, which "fills" (brightens) as cells arrive, then a check
    box = layer(40, "container", container(HERO, 120, 54, hero=True), [300, 170, 0],
                s=anim([(0, [92, 92, 100]), (40, [92, 92, 100]), (120, [100, 100, 100]), (op, [100, 100, 100])]), op=op)
    badge = layer(41, "check", check_badge(TEAL, 36), [352, 136, 0],
                  s=anim([(0, [0, 0, 100]), (126, [0, 0, 100]), (138, [115, 115, 100]), (144, [100, 100, 100]), (op - 10, [100, 100, 100]), (op - 2, [0, 0, 100]), (op, [0, 0, 100])]), op=op)
    return comp("sheet-to-system", [badge, box, *layers[::-1], frame], op=op)


for name, fn in [("containers-stack", containers_stack), ("docs-merge", docs_merge), ("ship-wave", ship_wave), ("sheet-to-system", sheet_to_system)]:
    with open(os.path.join(OUT, f"{name}.json"), "w") as f:
        json.dump(fn(), f, separators=(",", ":"))
print("ok")
