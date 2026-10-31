import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { AirScene } from "@/components/motion/air-scene";
import { BOX, ContainerBox, Crane, Doc, ShipSide, Truck, ink, paint } from "@/components/motion/sprites";

/**
 * One picture per service, drawn with the site's own sprites: the same
 * greys, and the booking's orange as the only colour, as in the home hero.
 * The text inside is limited to codes and numbers, so it reads in both
 * languages; the words sit in the HTML cards around it.
 */
const greys = ["#d9d9d6", "#bdbdb8", "#9d9d98", "#e9e9e6", "#6f6f6a", "#c9c9c5"];
const grey = (i: number) => greys[((i % greys.length) + greys.length) % greys.length];
const steel = "#9d9d98";

function Frame({ id, children, lane = true }: { id: string; children: ReactNode; lane?: boolean }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[linear-gradient(160deg,#ffffff,var(--color-fog-100))] ring-1 ring-fog-200">
      <svg viewBox="0 0 640 480" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern id={`${id}-dots`} width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="#c9c9c5" />
          </pattern>
          <radialGradient id={`${id}-fade`}>
            <stop offset="0.45" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id={`${id}-mask`}>
            <circle cx="440" cy="150" r="230" fill={`url(#${id}-fade)`} />
          </mask>
        </defs>
        <rect width="640" height="480" fill={`url(#${id}-dots)`} mask={`url(#${id}-mask)`} opacity="0.8" />
        {lane ? (
          <g>
            <path d="M40 120 C 200 30, 420 20, 610 70" fill="none" stroke={paint.hero} strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
            <circle cx="40" cy="120" r="5" fill={ink.deep} />
            <circle cx="610" cy="70" r="6" fill={paint.hero} />
            <circle cx="610" cy="70" r="15" fill={paint.hero} opacity="0.16" />
          </g>
        ) : null}
        {children}
      </svg>
    </div>
  );
}

const sea = (y = 410) => (
  <g>
    <rect x="0" y={y} width="640" height={480 - y} fill="#e9e9e6" />
    <path d={`M0 ${y + 14} q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0`} fill="none" stroke="#c9c9c5" strokeWidth="2" />
  </g>
);

const quay = (x: number, w: number, y = 400) => (
  <g>
    <rect x={x} y={y} width={w} height={480 - y} fill="#d9d9d6" />
    <rect x={x} y={y} width={w} height={5} fill={steel} />
  </g>
);

function shipSlots(cols: number, rows: number, hero?: [number, number]) {
  return Array.from({ length: cols }, (_, col) =>
    Array.from({ length: rows }, (_, row) => ({ col, row, color: grey(col * 3 + row * 5), hero: hero?.[0] === col && hero?.[1] === row })),
  ).flat();
}

/** A carton with its tape line. */
function Carton({ x, y, w = 34, h = 26, color = "#d9d9d6", hero = false }: { x: number; y: number; w?: number; h?: number; color?: string; hero?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx={2} fill={hero ? paint.hero : color} />
      <rect x={w / 2 - 3} width={6} height={h * 0.45} fill={hero ? paint.heroDark : ink.line} opacity={hero ? 0.45 : 0.18} />
    </g>
  );
}

function Pallet({ x, y, w = 80 }: { x: number; y: number; w?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={5} fill={steel} />
      {[0, w / 2 - 5, w - 10].map((px) => (
        <rect key={px} x={px} y={5} width={10} height={6} fill={steel} />
      ))}
    </g>
  );
}

function Forklift({ x, y, load }: { x: number; y: number; load?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={-62} width={6} height={62} fill={ink.steel} />
      <rect x={-34} y={-6} width={36} height={4} fill={ink.steel} />
      <path d="M8 -12 V-58 H40 L56 -30 V-12 Z" fill={paint.fogLight} stroke={ink.line} strokeWidth="2" />
      <rect x={12} y={-52} width={22} height={20} rx={2} fill={ink.hull} opacity="0.85" />
      <rect x={44} y={-34} width={30} height={22} rx={3} fill={ink.steel} />
      <circle cx={18} cy={-6} r={8} fill={ink.bg} />
      <circle cx={60} cy={-6} r={8} fill={ink.bg} />
      {load}
    </g>
  );
}

function Barcode({ x, y, w = 96, h = 40 }: { x: number; y: number; w?: number; h?: number }) {
  const bars = [3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1, 3, 1, 2];
  let cx = 8;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx={5} fill={paint.white} stroke={ink.line} strokeOpacity="0.25" />
      {bars.map((b, i) => {
        const r = <rect key={i} x={cx} y={7} width={b * 1.4} height={h - 14} fill={i % 2 ? paint.white : ink.deep} />;
        cx += b * 1.4 + 1.2;
        return r;
      })}
    </g>
  );
}

function SeaScene() {
  return (
    <Frame id="svc-sea">
      {sea()}
      {quay(0, 170, 396)}
      <ShipSide x={150} y={410} length={470} slots={shipSlots(5, 4, [3, 3])} />
      <Crane x={60} y={396} height={240} reach={380} back={50} stroke={steel} />
      <rect x={380} y={150} width={44} height={14} rx={2} fill="#6f6f6a" />
      <line x1={402} x2={402} y1={164} y2={276} stroke="#6f6f6a" strokeWidth="2" />
      <rect x={370} y={276} width={64} height={6} rx={1} fill="#6f6f6a" />
      <ContainerBox x={374} y={282} hero />
      {[0, 1, 2].map((i) => (
        <ContainerBox key={i} x={-20 + i * 60} y={396 - BOX.h} color={grey(i + 1)} />
      ))}
    </Frame>
  );
}

function ConsolidationScene() {
  const inside: Array<[number, number, string, boolean]> = [];
  // three shippers' cartons stacked inside, plus the booking's own in orange
  for (let c = 0; c < 9; c++) {
    for (let r = 0; r < 4; r++) {
      const hero = c >= 6 && c <= 7 && r >= 2;
      inside.push([112 + c * 38, 372 - (r + 1) * 28, hero ? paint.hero : grey(Math.floor(c / 3) * 2 + (r % 2)), hero]);
    }
  }
  return (
    <Frame id="svc-lcl">
      <rect x="0" y="400" width="640" height="80" fill="#e9e9e6" />
      {/* the container, cut away */}
      <rect x="96" y="232" width="372" height="150" rx="6" fill={ink.hull} />
      <rect x="104" y="240" width="356" height="134" rx="3" fill={paint.fogLight} />
      {inside.map(([x, y, color, hero], i) => (
        <Carton key={i} x={x} y={y} w={34} h={26} color={color} hero={hero} />
      ))}
      <rect x="96" y="382" width="372" height="14" fill={ink.steel} />
      {[130, 434].map((cx) => (
        <circle key={cx} cx={cx} cy={402} r={9} fill={ink.bg} />
      ))}
      {/* door swung open */}
      <path d="M468 236 L520 252 V376 L468 382 Z" fill={ink.steel} />
      {/* shipper tags */}
      {[
        [150, "A"],
        [264, "B"],
        [378, "C"],
      ].map(([x, l]) => (
        <g key={String(l)} transform={`translate(${x} 214)`}>
          <circle r={13} fill={paint.white} stroke={ink.line} strokeOpacity="0.3" />
          <text y={4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill={ink.deep}>{l}</text>
        </g>
      ))}
      {/* the forklift brings the last pallet */}
      <Forklift
        x={560}
        y={400}
        load={
          <g>
            <Pallet x={-36} y={-12} w={40} />
            <Carton x={-36} y={-40} w={38} h={28} hero />
          </g>
        }
      />
    </Frame>
  );
}

function ImportScene() {
  return (
    <Frame id="svc-imp">
      {sea(412)}
      {quay(0, 300, 400)}
      <ShipSide x={300} y={412} length={330} slots={shipSlots(3, 3)} />
      {/* gate */}
      <rect x="262" y="330" width="8" height="70" fill={ink.steel} />
      <path d="M266 334 L340 270" stroke={paint.hero} strokeWidth="6" strokeLinecap="round" />
      {/* the truck leaves with the released container */}
      <Truck x={40} y={400} />
      <ContainerBox x={52} y={400 - 12 - BOX.h * 1.6} w={BOX.w * 2} h={BOX.h * 1.6} hero />
      {/* the delivery order, released */}
      <g transform="translate(372 120) rotate(4)">
        <Doc x={0} y={0} w={130} h={160} />
        <rect x={0} y={0} width={130} height={22} rx={5} fill={ink.deep} />
        <circle cx={100} cy={128} r={20} fill="none" stroke={paint.hero} strokeWidth="4" />
        <path d="M91 128 l6 6 l12 -13" fill="none" stroke={paint.hero} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Frame>
  );
}

function NvoccScene() {
  return (
    <Frame id="svc-nvo">
      {sea(400)}
      <ShipSide x={20} y={400} length={420} slots={shipSlots(5, 3, [2, 2])} opacity={0.9} />
      {/* the Bill of Lading, in your name */}
      <g transform="translate(330 90) rotate(-3)">
        <rect width="200" height="250" rx="8" fill={paint.white} stroke={ink.line} strokeOpacity="0.2" />
        <rect width="200" height="36" rx="8" fill={ink.deep} />
        <rect x="14" y="13" width="54" height="10" rx="2" fill={paint.hero} />
        {[56, 74, 92, 120, 138, 156].map((y, i) => (
          <rect key={y} x="16" y={y} width={[150, 110, 130, 160, 90, 120][i]} height="7" rx="2" fill={paint.fogLight} />
        ))}
        <path d="M24 214 c 12 -16 22 6 32 -6 s 18 -10 26 4 s 14 2 22 -8" fill="none" stroke={ink.deep} strokeWidth="2.5" strokeLinecap="round" />
        <rect x="16" y="222" width="100" height="2" fill={ink.line} opacity="0.35" />
        <text x="184" y="236" textAnchor="end" fontSize="12" fontWeight="700" fill={paint.hero}>3/3</text>
      </g>
      {/* free days: four, then the meter runs */}
      <g transform="translate(70 70)">
        <rect width="196" height="70" rx="12" fill={paint.white} stroke={ink.line} strokeOpacity="0.2" />
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={i} x={14 + i * 25} y={22} width={20} height={26} rx={4} fill={i < 4 ? "#d9d9d6" : paint.hero} opacity={i < 4 ? 1 : 0.35 + i * 0.1} />
        ))}
      </g>
    </Frame>
  );
}

function LandScene() {
  return (
    <Frame id="svc-land">
      <rect x="0" y="392" width="640" height="88" fill="#d9d9d6" />
      <rect x="0" y="392" width="640" height="40" fill="#6f6f6a" />
      <path d="M0 412 H640" stroke="#ffffff" strokeWidth="3" strokeDasharray="26 18" />
      <Truck x={90} y={432} />
      <ContainerBox x={100} y={432 - 12 - BOX.h * 1.5} w={BOX.w * 2} h={BOX.h * 1.5} hero />
      {/* pins from pickup to delivery */}
      <g>
        <path d="M70 250 C 180 190, 300 210, 360 250" fill="none" stroke={ink.deep} strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
        <circle cx={70} cy={250} r={7} fill={ink.deep} />
        <path d="M360 226 c -12 0 -20 9 -20 19 c 0 14 20 32 20 32 s 20 -18 20 -32 c 0 -10 -8 -19 -20 -19 z" fill={paint.hero} />
        <circle cx={360} cy={245} r={6} fill={paint.white} />
      </g>
      {/* the driver's phone, signed */}
      <g transform="translate(440 120)">
        <rect width="132" height="250" rx="20" fill={ink.deep} />
        <rect x="8" y="14" width="116" height="222" rx="12" fill={paint.white} />
        <rect x="18" y="28" width="96" height="58" rx="6" fill="#e9e9e6" />
        <path d="M30 72 l18 -22 l14 14 l10 -10 l24 18" fill="none" stroke={steel} strokeWidth="3" strokeLinejoin="round" />
        <rect x="18" y="98" width="70" height="7" rx="2" fill={paint.fogLight} />
        <rect x="18" y="112" width="52" height="7" rx="2" fill={paint.fogLight} />
        <path d="M24 168 c 10 -16 20 6 28 -6 s 16 -10 22 4 s 12 2 20 -8" fill="none" stroke={ink.deep} strokeWidth="2.5" strokeLinecap="round" />
        <rect x="18" y="176" width="96" height="2" fill={ink.line} opacity="0.3" />
        <rect x="18" y="194" width="96" height="28" rx="14" fill={paint.hero} />
        <path d="M58 208 l6 6 l12 -12" fill="none" stroke={ink.bg} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Frame>
  );
}

function WarehouseScene() {
  return (
    <Frame id="svc-wh" lane={false}>
      <rect x="0" y="404" width="640" height="76" fill="#e9e9e6" />
      {/* the shed */}
      <path d="M40 404 V150 L320 70 L600 150 V404 Z" fill={paint.white} stroke="#d9d9d6" strokeWidth="3" />
      <path d="M40 150 L320 70 L600 150" fill="none" stroke={ink.steel} strokeWidth="8" strokeLinejoin="round" />
      {/* racks */}
      {[80, 330].map((rx) => (
        <g key={rx}>
          {[0, 1, 2].map((lvl) => (
            <rect key={lvl} x={rx} y={392 - lvl * 72} width={220} height={5} fill={steel} />
          ))}
          <rect x={rx} y={180} width={5} height={224} fill={steel} />
          <rect x={rx + 215} y={180} width={5} height={224} fill={steel} />
          {[0, 1, 2].map((lvl) =>
            [0, 1, 2, 3].map((c) => {
              const hero = rx === 330 && lvl === 1 && c === 1;
              return <Carton key={`${lvl}-${c}`} x={rx + 12 + c * 51} y={392 - lvl * 72 - 40} w={44} h={40} color={grey(lvl * 4 + c + rx)} hero={hero} />;
            }),
          )}
        </g>
      ))}
      {/* the label, scanned */}
      <g transform="translate(420 96)">
        <Barcode x={0} y={0} w={130} h={46} />
      </g>
      <path d="M485 142 L436 236" stroke={paint.hero} strokeWidth="2" strokeDasharray="3 5" />
    </Frame>
  );
}

function AgencyScene() {
  return (
    <Frame id="svc-agy">
      {sea(408)}
      {quay(0, 120, 396)}
      {[30, 90].map((x) => (
        <rect key={x} x={x} y={386} width={10} height={12} rx={3} fill={ink.steel} />
      ))}
      <ShipSide x={110} y={408} length={500} slots={shipSlots(6, 4, [4, 3])} />
      {/* the pilot boat */}
      <g transform="translate(40 440)">
        <path d="M0 0 H70 L60 16 H8 Z" fill={paint.hero} />
        <rect x="18" y="-14" width="26" height="14" rx="2" fill={paint.fogLight} />
      </g>
      {/* the port call board */}
      <g transform="translate(44 70)">
        <rect width="230" height="150" rx="14" fill={ink.deep} />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(18 ${30 + i * 38})`}>
            <rect width="44" height="20" rx="4" fill={ink.steel} />
            <rect x="58" y="5" width={[110, 90, 120][i]} height="10" rx="3" fill={i === 1 ? paint.hero : ink.line} />
          </g>
        ))}
      </g>
    </Frame>
  );
}

function CustomsScene() {
  return (
    <Frame id="svc-cus" lane={false}>
      <rect x="0" y="404" width="640" height="76" fill="#e9e9e6" />
      {/* the customs house */}
      <g transform="translate(330 150)">
        <path d="M0 50 L135 0 L270 50 Z" fill="#d9d9d6" />
        <rect x="0" y="50" width="270" height="12" fill={steel} />
        {[16, 70, 124, 178, 232].map((x) => (
          <rect key={x} x={x} y="62" width="22" height="176" fill={paint.white} stroke="#d9d9d6" strokeWidth="2" />
        ))}
        <rect x="-10" y="238" width="290" height="16" fill={steel} />
      </g>
      {/* the declaration and its HS lines */}
      <g transform="translate(60 120) rotate(-3)">
        <rect width="230" height="270" rx="8" fill={paint.white} stroke={ink.line} strokeOpacity="0.2" />
        <rect width="230" height="34" rx="8" fill={ink.deep} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(16 ${56 + i * 44})`}>
            <rect width="120" height="8" rx="2" fill={paint.fogLight} />
            <rect y="14" width="80" height="6" rx="2" fill={paint.fogLight} />
            <rect x="138" y="-4" width="62" height="24" rx="12" fill={i === 2 ? paint.hero : "#e9e9e6"} />
            <text x="169" y="12" textAnchor="middle" fontSize="11" fontWeight="700" fill={i === 2 ? ink.bg : ink.steel}>
              {["8418.10", "7615.10", "7324.10", "3924.10"][i]}
            </text>
          </g>
        ))}
      </g>
      <g transform="translate(250 360) rotate(-12)">
        <circle r="34" fill="none" stroke={paint.hero} strokeWidth="5" />
        <circle r="24" fill="none" stroke={paint.hero} strokeWidth="2" />
        <path d="M-10 0 l7 7 l14 -15" fill="none" stroke={paint.hero} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Frame>
  );
}

function InventoryScene() {
  const bays = 4;
  const levels = 4;
  return (
    <Frame id="svc-inv" lane={false}>
      <rect x="0" y="410" width="640" height="70" fill="#e9e9e6" />
      <g transform="translate(60 90)">
        {Array.from({ length: levels + 1 }, (_, l) => (
          <rect key={l} x={0} y={l * 78} width={420} height={5} fill={steel} />
        ))}
        {Array.from({ length: bays + 1 }, (_, b) => (
          <rect key={b} x={b * 104} y={0} width={6} height={320} fill={ink.steel} />
        ))}
        {Array.from({ length: levels }, (_, l) =>
          Array.from({ length: bays }, (_, b) =>
            [0, 1].map((k) => {
              const hero = l === 2 && b === 2 && k === 0;
              return <Carton key={`${l}-${b}-${k}`} x={b * 104 + 12 + k * 46} y={l * 78 + 78 - 38} w={40} h={38} color={grey(l * 3 + b * 2 + k)} hero={hero} />;
            }),
          ),
        )}
        {/* the bin label */}
        <g transform="translate(220 172)">
          <rect x="-4" y="0" width="64" height="22" rx="6" fill={ink.deep} />
          <text x="28" y="15" textAnchor="middle" fontSize="11" fontWeight="700" fill={paint.hero}>B-03-2</text>
        </g>
      </g>
      {/* the pick cart */}
      <g transform="translate(500 410)">
        <rect x="0" y="-90" width="6" height="90" fill={ink.steel} />
        <rect x="0" y="-26" width="90" height="8" fill={ink.steel} />
        <Carton x={14} y={-60} w={40} h={34} hero />
        <Carton x={56} y={-50} w={30} h={24} color="#d9d9d6" />
        <circle cx="16" cy="-6" r="7" fill={ink.bg} />
        <circle cx="80" cy="-6" r="7" fill={ink.bg} />
      </g>
    </Frame>
  );
}

export function ServiceScene({ slug, locale }: { slug: string; locale: Locale }) {
  switch (slug) {
    case "sea-freight":
      return <SeaScene />;
    case "air-freight":
      return <AirScene locale={locale} />;
    case "consolidation":
      return <ConsolidationScene />;
    case "import-release":
      return <ImportScene />;
    case "nvocc":
      return <NvoccScene />;
    case "land-transport":
      return <LandScene />;
    case "warehousing":
      return <WarehouseScene />;
    case "shipping-agency":
      return <AgencyScene />;
    case "customs-brokerage":
      return <CustomsScene />;
    default:
      return <InventoryScene />;
  }
}
