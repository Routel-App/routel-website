"""Generates small, brand-coloured Lottie files for the Routel site (public/lottie).
Placeholders until designed animations replace them; same names, same sizes."""
import json, os, sys

OUT = sys.argv[1]
def hexc(h):
    h = h.lstrip('#'); return [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)] + [1]
TEAL, SPARK, INK, INK7, FOG, WHITE, FOG2 = map(hexc, ["#47bcac", "#f7941d", "#0b1426", "#1c2d4d", "#c3cdd9", "#ffffff", "#dde4ec"])
TEAL5 = hexc("#1fa192")

def st(v): return {"a": 0, "k": v}
def ease_o(): return {"x": [0.42], "y": [0]}
def ease_i(): return {"x": [0.2], "y": [1]}
def anim(kfs):
    """kfs: list of (frame, value). Values are lists. Last keyframe has no easing."""
    out = []
    for n, (t, v) in enumerate(kfs):
        k = {"t": t, "s": v if isinstance(v, list) else [v]}
        if n < len(kfs) - 1:
            k["i"] = ease_i(); k["o"] = ease_o()
        out.append(k)
    return {"a": 1, "k": out}
def tr():
    return {"ty": "tr", "p": st([0, 0]), "a": st([0, 0]), "s": st([100, 100]), "r": st(0), "o": st(100), "sk": st(0), "sa": st(0)}
def rect(w, h, x=0, y=0, r=4): return {"ty": "rc", "d": 1, "s": st([w, h]), "p": st([x, y]), "r": st(r)}
def ellipse(w, h, x=0, y=0): return {"ty": "el", "d": 1, "s": st([w, h]), "p": st([x, y])}
def fill(c, o=100): return {"ty": "fl", "c": st(c), "o": st(o), "r": 1}
def stroke(c, w): return {"ty": "st", "c": st(c), "o": st(100), "w": st(w), "lc": 2, "lj": 2}
def path(pts, closed=False, smooth=0):
    """smooth > 0: horizontal tangents of that length at every vertex (a gentle wave)."""
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

def container(color, w=88, h=36):
    ribs = [group(rect(3, h - 12, x, 0, 1), fill(INK, 18)) for x in (-27, -9, 9, 27)]
    return [*ribs, group(rect(w, h, 0, 0, 3), fill(color))]

def check_badge(color=TEAL5, size=44):
    tick = group(path([[-9, 0], [-3, 6], [9, -7]]), stroke(WHITE, 4))
    return [tick, group(ellipse(size, size), fill(color))]

def fade_loop(op, at):  # visible, then fade out before the loop restarts
    return anim([(0, [100]), (at, [100]), (op - 4, [0]), (op, [0])])

# 1. Containers stacking on a quay, then a check: "booked, loaded, done".
def containers_stack():
    op = 180
    ground = layer(1, "quay", [group(rect(300, 6, 0, 0, 2), fill(FOG2))], [200, 254, 0], op=op)
    base = [layer(2 + i, f"base{i}", container(c), [x, 233, 0], op=op) for i, (x, c) in enumerate([(155, INK7), (245, FOG)])]
    drops = []
    for i, (x, y, c, t0) in enumerate([(155, 195, TEAL, 10), (245, 195, SPARK, 38), (155, 157, WHITE, 66)]):
        p = anim([(0, [x, -40, 0]), (t0, [x, -40, 0]), (t0 + 22, [x, y + 3, 0]), (t0 + 28, [x, y, 0]), (op, [x, y, 0])])
        drops.append(layer(10 + i, f"drop{i}", container(c), p, o=fade_loop(op, 150), op=op))
    badge = layer(20, "check", check_badge(), [300, 120, 0],
                  s=anim([(0, [0, 0, 100]), (100, [0, 0, 100]), (112, [115, 115, 100]), (120, [100, 100, 100]), (op, [100, 100, 100])]),
                  o=fade_loop(op, 150), op=op)
    return comp("containers-stack", [badge, *drops[::-1], *base, ground], op=op)

# 2. Scattered documents merging into one booking: "seven files, one record".
def docs_merge():
    op = 200
    def doc(color=WHITE, lines=FOG2):
        ls = [group(rect(w, 5, (w - 52) / 2, y, 2), fill(lines)) for w, y in ((52, -18), (40, -6), (48, 6), (30, 18))]
        return [*ls, group(rect(76, 96, 0, 0, 8), fill(color))]
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
    final = layer(20, "booking", doc(INK7, hexc("#2a3f66")), [200, 150, 0], s=final_s, o=final_o, op=op)
    badge = layer(21, "check", check_badge(TEAL, 34), [232, 112, 0],
                  s=anim([(0, [0, 0, 100]), (104, [0, 0, 100]), (116, [115, 115, 100]), (122, [100, 100, 100]), (op, [100, 100, 100])]),
                  o=final_o, op=op)
    return comp("docs-merge", [badge, final, *layers[::-1]], op=op)

# 3. A container ship riding the swell (seamless loop).
def ship_wave():
    op = 240
    hull = group(path([[-120, 0], [120, 0], [100, 30], [-104, 30]], True), fill(INK7))
    stripe = group(rect(236, 4, 0, 6, 1), fill(SPARK))
    bridge = group(rect(34, 40, 88, -20, 3), fill(WHITE))
    boxes = []
    colors = [TEAL, SPARK, FOG, TEAL5, WHITE, INK7]
    for row in range(2):
        for col in range(5):
            boxes.append(group(rect(30, 16, -96 + col * 34, -10 - row * 18, 2), fill(colors[(row * 2 + col) % len(colors)])))
    ship = layer(5, "ship", [stripe, bridge, *boxes, hull], anim([(0, [200, 160, 0]), (60, [200, 166, 0]), (120, [200, 160, 0]), (180, [200, 166, 0]), (240, [200, 160, 0])]),
                 r=anim([(0, [-1.5]), (60, [1.5]), (120, [-1.5]), (180, [1.5]), (240, [-1.5])]), op=op)
    def wave(y, color, o, speed_px):
        pts = []
        for k in range(14):
            pts.append([-60 + k * 40, y + (6 if k % 2 else -6)])
        g = group(path(pts, smooth=14), stroke(color, 4))
        return layer(1 if y > 200 else 6, f"wave{y}", [g], anim([(0, [0, 0, 0]), (op, [-speed_px, 0, 0])]), o=st(o), op=op)
    sea = layer(0, "sea", [group(rect(400, 110, 200, 245, 0), fill(hexc("#13544f")))], [0, 0, 0], op=op)
    return comp("ship-wave", [wave(190, TEAL, 80, 80), ship, wave(205, hexc("#7cd6c7"), 60, 160), sea], op=op)

for name, fn in [("containers-stack", containers_stack), ("docs-merge", docs_merge), ("ship-wave", ship_wave)]:
    with open(os.path.join(OUT, f"{name}.json"), "w") as f:
        json.dump(fn(), f, separators=(",", ":"))
print("ok")
