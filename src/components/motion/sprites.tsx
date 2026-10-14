import type { ComponentProps } from "react";

/**
 * The site's one illustration language, shared by every animation: the
 * scroll story (odyssey.tsx), the port loop (port-scene.tsx), the vignettes
 * (bento-cards.tsx) and the Lottie files (scripts/lottie-gen.py mirrors these
 * shapes and colours). Flat, rounded, 2px strokes; the booking's own
 * container is always the orange one (`hero`).
 */

export const ink = {
  bg: "#060b16",
  deep: "#0b1426",
  hull: "#12203a",
  steel: "#1c2d4d",
  line: "#2a3f66",
} as const;

export const paint = {
  hero: "#f7941d",
  heroDark: "#b8640a",
  teal: "#47bcac",
  tealDeep: "#1fa192",
  tealDark: "#146961",
  sea: "#13544f",
  fog: "#c3cdd9",
  fogLight: "#e9eef4",
  white: "#ffffff",
  amber: "#fab660",
} as const;

/** Box colours for the "other" containers, in a fixed rotation so scenes match. */
export const boxPalette = [paint.teal, paint.fog, ink.line, paint.tealDeep, paint.fogLight, paint.amber] as const;
export const boxColor = (i: number) => boxPalette[((i % boxPalette.length) + boxPalette.length) % boxPalette.length];

export const BOX = { w: 56, h: 26 } as const;

type G = ComponentProps<"g">;

/** A 40' container seen from the side. `hero` is the booking's own, orange. */
export function ContainerBox({
  x,
  y,
  w = BOX.w,
  h = BOX.h,
  color,
  hero = false,
  opacity,
  ...rest
}: { x: number; y: number; w?: number; h?: number; color?: string; hero?: boolean; opacity?: number } & G) {
  const fill = hero ? paint.hero : (color ?? boxColor(0));
  const ribs = Math.max(2, Math.round(w / 14));
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity} {...rest}>
      <rect width={w} height={h} rx={Math.min(3, h / 6)} fill={fill} />
      {Array.from({ length: ribs - 1 }, (_, i) => (
        <rect key={i} x={((i + 1) * w) / ribs - 0.75} y={h * 0.14} width={1.5} height={h * 0.72} fill={ink.bg} opacity="0.22" />
      ))}
      {/* corner castings */}
      <rect x={1.5} y={1.5} width={w * 0.07} height={h * 0.2} fill={ink.bg} opacity="0.28" />
      <rect x={w - 1.5 - w * 0.07} y={1.5} width={w * 0.07} height={h * 0.2} fill={ink.bg} opacity="0.28" />
      {hero ? <rect x={w * 0.3} y={h * 0.38} width={w * 0.4} height={h * 0.24} rx={1} fill={ink.bg} opacity="0.35" /> : null}
    </g>
  );
}

/** A container seen from above (the ship's deck): a narrow plank with two end castings. */
export function ContainerTop({ x, y, w = 56, h = 14, color, hero = false, ...rest }: { x: number; y: number; w?: number; h?: number; color?: string; hero?: boolean } & G) {
  return (
    <g transform={`translate(${x} ${y})`} {...rest}>
      <rect width={w} height={h} rx={2} fill={hero ? paint.hero : (color ?? boxColor(0))} />
      <rect x={1.5} y={1.5} width={3} height={h - 3} fill={ink.bg} opacity="0.3" />
      <rect x={w - 4.5} y={1.5} width={3} height={h - 3} fill={ink.bg} opacity="0.3" />
      <rect x={w / 2 - 0.75} y={1.5} width={1.5} height={h - 3} fill={ink.bg} opacity="0.2" />
    </g>
  );
}

/**
 * A container ship from the side, bow to the right, origin at the deck's
 * left end (waterline is at y = draft). `slots` are the stacked boxes
 * (col, row, color); leave holes for the ones a crane will place.
 */
export function ShipSide({
  x,
  y,
  length = 700,
  draft = 52,
  slots,
  ...rest
}: { x: number; y: number; length?: number; draft?: number; slots: Array<{ col: number; row: number; color?: string; hero?: boolean }> } & G) {
  const cols = Math.floor((length - 120) / 60);
  return (
    <g transform={`translate(${x} ${y})`} {...rest}>
      <path d={`M0 0 H${length} L${length - 36} ${draft} H30 Z`} fill={ink.hull} />
      <path d={`M6 10 H${length - 8}`} stroke={paint.hero} strokeWidth="3" />
      <path d={`M8 ${draft - 8} H${length - 44}`} stroke={paint.teal} strokeWidth="2" opacity="0.5" />
      {/* bridge */}
      <rect x={length - 116} y={-70} width={66} height={70} rx={3} fill={paint.fogLight} />
      <rect x={length - 108} y={-60} width={50} height={8} rx={2} fill={ink.line} />
      <rect x={length - 92} y={-94} width={22} height={24} rx={2} fill={ink.line} />
      <rect x={length - 92} y={-88} width={22} height={5} fill={paint.hero} />
      {slots.map((s, i) => (
        <ContainerBox key={i} x={40 + s.col * 60} y={-(s.row + 1) * BOX.h} color={s.color ?? boxColor(s.col * 2 + s.row)} hero={s.hero} />
      ))}
      <rect x={40} y={-1} width={cols * 60 - 4} height={2} fill={ink.bg} opacity="0.3" />
    </g>
  );
}

/** The same ship seen from above, pointing right; origin at the stern's centre line. */
export function ShipTop({ x, y, length = 260, beam = 64, rows = 3, heroAt, ...rest }: { x: number; y: number; length?: number; beam?: number; rows?: number; heroAt?: [number, number] } & G) {
  const colW = 30;
  const cols = Math.floor((length - 90) / colW);
  const rowH = (beam - 16) / rows;
  return (
    <g transform={`translate(${x} ${y})`} {...rest}>
      <path d={`M0 ${-beam / 2} H${length - 70} Q${length} ${-beam / 2} ${length} 0 Q${length} ${beam / 2} ${length - 70} ${beam / 2} H0 Z`} fill={ink.hull} />
      <path d={`M4 ${-beam / 2 + 4} H${length - 72}`} stroke={paint.hero} strokeWidth="2" opacity="0.9" />
      <path d={`M4 ${beam / 2 - 4} H${length - 72}`} stroke={paint.hero} strokeWidth="2" opacity="0.9" />
      <rect x={14} y={-beam / 2 + 6} width={36} height={beam - 12} rx={3} fill={paint.fogLight} />
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const hero = heroAt?.[0] === c && heroAt?.[1] === r;
          return <ContainerTop key={`${r}-${c}`} x={60 + c * colW} y={-beam / 2 + 8 + r * rowH} w={colW - 4} h={rowH - 3} color={boxColor(c * 2 + r)} hero={hero} />;
        }),
      )}
    </g>
  );
}

/** A quay crane: two legs, a boom reaching over the ship. Origin at the quay surface, left leg. */
export function Crane({ x, y, height = 190, reach = 560, back = 110, ...rest }: { x: number; y: number; height?: number; reach?: number; back?: number } & G) {
  const top = -height;
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke={paint.hero} strokeWidth="5" strokeLinecap="round" {...rest}>
      <path d={`M0 0 V${top + 30} M42 0 V${top + 30} M0 ${top + 100} L42 ${top + 50} M0 ${top + 50} L42 ${top + 100}`} />
      <path d={`M${-back} ${top} H${reach}`} strokeWidth="7" />
      <path d={`M0 ${top + 30} L${reach} ${top} M42 ${top + 30} L${-back} ${top}`} strokeWidth="2" opacity="0.7" />
      <rect x={-6} y={-2} width={54} height={6} fill={paint.hero} stroke="none" />
    </g>
  );
}

/** A truck with a chassis, cab to the right. Origin at the ground, left end of the chassis. */
export function Truck({ x, y, ...rest }: { x: number; y: number } & G) {
  return (
    <g transform={`translate(${x} ${y})`} {...rest}>
      <rect x={0} y={-12} width={130} height={7} rx={2} fill={ink.steel} />
      <path d={`M130 -5 V-44 Q130 -50 136 -50 H166 L178 -30 V-5 Z`} fill={paint.fogLight} />
      <rect x={138} y={-44} width={24} height={14} rx={2} fill={ink.line} />
      <rect x={130} y={-22} width={48} height={4} fill={paint.hero} />
      {[18, 44, 70, 150].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={0} r={9} fill={ink.bg} />
          <circle cx={cx} cy={0} r={4} fill={paint.fog} />
        </g>
      ))}
    </g>
  );
}

/** A sheet of paper with lines; `stamp` draws a teal badge in the corner. */
export function Doc({ x, y, w = 48, h = 60, stamp = false, dark = false, ...rest }: { x: number; y: number; w?: number; h?: number; stamp?: boolean; dark?: boolean } & G) {
  const lines = [0.75, 0.55, 0.65, 0.4];
  return (
    <g transform={`translate(${x} ${y})`} {...rest}>
      <rect width={w} height={h} rx={5} fill={dark ? ink.steel : paint.white} />
      {lines.map((f, i) => (
        <rect key={i} x={w * 0.16} y={h * 0.2 + i * h * 0.16} width={w * 0.68 * f} height={h * 0.06} rx={1} fill={dark ? ink.line : paint.fogLight} />
      ))}
      {stamp ? <circle cx={w - 8} cy={h - 8} r={7} fill={paint.tealDeep} /> : null}
    </g>
  );
}

/** Waves: `n` scallops of width `step`, drawn as one path, for GSAP to drift. */
export function wavePath(x0: number, y: number, n: number, step = 60, amp = 6) {
  let d = `M${x0} ${y}`;
  for (let i = 0; i < n; i++) d += ` q${step / 2} -${amp} ${step} 0`;
  return d;
}
