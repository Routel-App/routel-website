import { Check, Plane, Scale } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { Aircraft, Uld, ink, paint } from "./sprites";

const copy: Record<Locale, { weight: string; weightValue: string; weightNote: string; mawb: string; mawbNote: string }> = {
  en: { weight: "Chargeable weight", weightValue: "412.5 kg", weightNote: "Volumetric wins over 380 kg gross", mawb: "MAWB 065-12345675", mawbNote: "Saudia · check digit valid" },
  ar: { weight: "الوزن المحتسب", weightValue: "412.5 kg", weightNote: "الوزن الحجمي أعلى من القائم 380 kg", mawb: "MAWB 065-12345675", mawbNote: "الخطوط السعودية · رقم التحقق صحيح" },
};

/**
 * The air freight module's picture: a freighter on the apron, a loader
 * lifting the booking's orange ULD to the cargo door, the trade lane above,
 * and two cards for what Routel does with it (chargeable weight, a checked
 * MAWB). The lift is a CSS loop that stops under reduced motion.
 */
export function AirScene({ locale, className }: { locale: Locale; className?: string }) {
  const t = copy[locale];
  return (
    <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl bg-[linear-gradient(160deg,#ffffff,var(--color-fog-100))] ring-1 ring-fog-200 ${className ?? ""}`}>
      <svg viewBox="0 0 640 480" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern id="air-dots" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="#c9c9c5" />
          </pattern>
          <radialGradient id="air-fade">
            <stop offset="0.45" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id="air-mask">
            <circle cx="430" cy="150" r="230" fill="url(#air-fade)" />
          </mask>
        </defs>
        <rect width="640" height="480" fill="url(#air-dots)" mask="url(#air-mask)" opacity="0.8" />

        {/* the lane, with a small plane on it */}
        <path d="M40 150 C 200 40, 420 30, 610 90" fill="none" stroke={paint.hero} strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
        <circle cx="40" cy="150" r="5" fill={ink.deep} />
        <circle cx="610" cy="90" r="6" fill={paint.hero} />
        <circle cx="610" cy="90" r="15" fill={paint.hero} opacity="0.16" />

        {/* apron */}
        <rect x="0" y="420" width="640" height="60" fill="#e9e9e6" />
        <path d="M0 448 H640" stroke="#ffffff" strokeWidth="3" strokeDasharray="26 18" />

        <Aircraft x={40} y={420} length={560} />

        {/* the loader under the side door */}
        <g>
          <rect x="150" y="402" width="120" height="14" rx="3" fill={ink.steel} />
          <circle cx="168" cy="418" r="7" fill={ink.deep} />
          <circle cx="252" cy="418" r="7" fill={ink.deep} />
          <path d="M165 402 L215 320 M255 402 L205 320" stroke={ink.line} strokeWidth="5" strokeLinecap="round" />
          <g className="air-lift">
            <rect x="160" y="312" width="100" height="10" rx="2" fill={ink.steel} />
            <Uld x={170} y={272} w={44} h={40} hero />
          </g>
        </g>

        {/* ULDs waiting on the apron */}
        <Uld x={372} y={380} color={paint.fog} />
        <Uld x={420} y={380} color={ink.line} />
        <Uld x={468} y={380} color={paint.fog} />
        <rect x="368" y="420" width="148" height="6" rx="2" fill={ink.steel} />
      </svg>

      {/* what Routel does with it */}
      <div className="absolute end-4 top-4 hidden w-[200px] rounded-2xl bg-white/95 p-3.5 shadow-float ring-1 ring-fog-200 backdrop-blur min-[420px]:block sm:end-5 sm:top-5">
        <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-fog-600">
          <Scale className="h-3.5 w-3.5 text-spark-600" />
          {t.weight}
        </p>
        <p dir="ltr" className="font-display mt-1 text-2xl font-extrabold text-ink-900 rtl:text-end">{t.weightValue}</p>
        <p className="mt-0.5 text-[11px] leading-snug text-fog-500">{t.weightNote}</p>
      </div>
      <div className="absolute start-4 top-4 rounded-2xl bg-ink-900 px-3.5 py-2.5 text-white shadow-float sm:start-5 sm:top-5">
        <p dir="ltr" className="flex items-center gap-1.5 font-mono text-[12px] font-semibold rtl:justify-end">
          <Plane className="h-3.5 w-3.5 text-spark-400" />
          {t.mawb}
        </p>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-spark-200">
          <Check className="h-3 w-3" strokeWidth={3} />
          {t.mawbNote}
        </p>
      </div>
    </div>
  );
}
