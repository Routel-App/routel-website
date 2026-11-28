import {
  Boxes,
  CalendarCheck,
  Coins,
  Container,
  Handshake,
  Hourglass,
  MapPin,
  Plane,
  Scale,
  ScanBarcode,
  TriangleAlert,
  Ruler,
  Snowflake,
  Lock,
  Landmark,
  PlaneTakeoff,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { bidi } from "@/components/i18n/bidi";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";

type Rule = { icon: LucideIcon; code?: string; title: string; text: string };

const copy: Record<Locale, { eyebrow: string; title: string; sub: string; rules: Rule[] }> = {
  en: {
    eyebrow: "Built-in expertise",
    title: "The rules of the trade, built in",
    sub: "The checks an experienced operator makes, made by the system as the work is entered.",
    rules: [
      { icon: Container, code: "ISO 6346", title: "Container numbers", text: "The check digit is verified, so a mistyped number is flagged as you type it, on the booking and on the B/L." },
      { icon: Plane, code: "IATA", title: "Air waybills", text: "The MAWB number's check digit is verified, and the chargeable weight is worked out from weight and volume." },
      { icon: MapPin, code: "UN/LOCODE", title: "Ports", text: "Every port by its international code; demurrage tariffs and public holidays set by port." },
      { icon: Boxes, code: "TEU", title: "Container types", text: "One format (“2 x 20GP, 1 x 40HC”), counted in TEU; a type the system can't read is refused." },
      { icon: Handshake, code: "Incoterms", title: "Terms of delivery", text: "The term says whether the price already carries freight and insurance, so they're never counted twice in the customs value." },
      { icon: ScanBarcode, code: "HS", title: "Tariff lines", text: "HS codes to the full 12-digit Saudi tariff line, and the CIF customs value at the customs exchange rate, shared over the lines to the cent." },
      { icon: Hourglass, code: "D&D", title: "Demurrage & detention", text: "Free days, daily tiers and port holidays; the shipping line's invoice checked against the tariff." },
      { icon: Scale, code: "SOLAS VGM", title: "Verified gross mass", text: "Each packed container's verified gross mass, with its method (1 or 2) and signatory, recorded and checked against the carrier's VGM cut-off." },
      { icon: TriangleAlert, code: "IMDG", title: "Dangerous goods", text: "Dangerous goods declared by UN number, proper shipping name, class and packing group, and flagged on the booking and its documents." },
      { icon: Ruler, code: "ISO 668", title: "Container capacity", text: "Each type's maximum payload and internal volume are known, so cargo that won't fit by weight or volume is flagged, with the type that would fit." },
      { icon: Snowflake, code: "RF · OOG", title: "Reefer & out of gauge", text: "Set temperature, ventilation and humidity for reefers; over-height and over-width for flat racks and open tops, printed on the B/L." },
      { icon: Lock, code: "ISO 17712", title: "Container seals", text: "Every container's seals, with their security class, on the B/L and every document; duplicate seal numbers are flagged." },
      { icon: Landmark, code: "UCP 600", title: "Letters of credit", text: "The B/L is checked against the letter of credit's terms (shipment date, ports, consignee, clean on board), and the presentation deadline is tracked." },
      { icon: PlaneTakeoff, code: "IATA DGR", title: "Dangerous goods by air", text: "UN number, class, packing group and packing instruction on air shipments, with Cargo Aircraft Only flagged on the air waybill." },
      { icon: Coins, code: "FX · TAX", title: "Currencies & tax", text: "Every document in its currency at its recorded rate; each country's tax (VAT 15% in Saudi Arabia, SST, PPN), with a 0% rate for charges that carry no tax, such as zero-rated international transport in Saudi Arabia; partners' VAT and tax numbers are checked against each country's format." },
      { icon: CalendarCheck, title: "Operating rules", text: "No arrival dated before departure; no House B/L issued until every container is numbered, typed and weighed." },
    ],
  },
  ar: {
    eyebrow: "خبرة مدمجة",
    title: "قواعد المهنة، داخل النظام",
    sub: "التدقيق الذي يجريه خبير العمليات، يجريه النظام أثناء إدخال العمل.",
    rules: [
      { icon: Container, code: "ISO 6346", title: "أرقام الحاويات", text: "يتحقق النظام من خانة التحقق في رقم الحاوية، فيُنبّه إلى الرقم المكتوب خطأً أثناء كتابته، في الحجز وفي البوليصة." },
      { icon: Plane, code: "IATA", title: "بوالص الشحن الجوي", text: "يتحقق من خانة التحقق في رقم البوليصة الرئيسية MAWB، ويحسب الوزن المحتسب من الوزن والحجم." },
      { icon: MapPin, code: "UN/LOCODE", title: "رموز الموانئ", text: "كل ميناء برمزه الدولي، وتعرفة الأرضيات والعطل الرسمية تُضبط لكل ميناء." },
      { icon: Boxes, code: "TEU", title: "أنواع الحاويات", text: "صيغة واحدة، مثل 2 x 20GP, 1 x 40HC، ويُحسب العدد بوحدة الحاوية المكافئة لعشرين قدماً (TEU)، ويُرفض النوع الذي لا يمكن قراءته." },
      { icon: Handshake, code: "Incoterms", title: "شروط التسليم", text: "يعرف النظام من الشرط هل يشمل السعر الشحن والتأمين، فلا يُحسبان مرتين في القيمة الجمركية." },
      { icon: ScanBarcode, code: "HS", title: "البنود الجمركية", text: "رموز HS حتى البند الكامل من 12 خانة في التعرفة السعودية، والقيمة الجمركية CIF بسعر الصرف الجمركي، موزّعةً على البنود بلا فرق تقريب." },
      { icon: Hourglass, code: "D&D", title: "الأرضيات والتأخير", text: "أيام السماح والشرائح اليومية وعطل الميناء، وتُطابَق فاتورة الخط الملاحي مع التعرفة." },
      { icon: Scale, code: "SOLAS VGM", title: "الوزن الإجمالي المعتمد", text: "يُسجَّل الوزن الإجمالي المعتمد لكل حاوية معبّأة، بطريقته (1 أو 2) واسم المعتمِد، ويُدقَّق قبل موعد إقفال VGM لدى الخط الملاحي." },
      { icon: TriangleAlert, code: "IMDG", title: "البضائع الخطرة", text: "تُصرَّح برقم UN والاسم الرسمي للشحن ورتبة الخطر ومجموعة التعبئة، ويُنبَّه إليها في الحجز ومستنداته." },
      { icon: Ruler, code: "ISO 668", title: "سعة الحاويات", text: "تُعرف الحمولة القصوى والحجم الداخلي لكل نوع حاوية، فيُنبَّه إلى البضاعة التي لا تتسع لها وزناً أو حجماً، مع النوع الذي يتسع لها." },
      { icon: Snowflake, code: "RF · OOG", title: "الحاويات المبردة والبضائع خارج المقاس", text: "درجة الحرارة والتهوية والرطوبة للحاويات المبردة، والتجاوز في الارتفاع والعرض للحاويات المسطحة والمكشوفة، مطبوعةً على البوليصة." },
      { icon: Lock, code: "ISO 17712", title: "أختام الحاويات", text: "أختام كل حاوية بدرجة أمانها، على البوليصة وكل مستند، ويُنبَّه إلى أرقام الأختام المكررة." },
      { icon: Landmark, code: "UCP 600", title: "الاعتمادات المستندية", text: "تُراجَع البوليصة مقابل شروط الاعتماد المستندي (تاريخ الشحن، والموانئ، والمرسل إليه، والشحن النظيف على متن السفينة)، ويُتابَع موعد تقديم المستندات للبنك." },
      { icon: PlaneTakeoff, code: "IATA DGR", title: "البضائع الخطرة جواً", text: "رقم UN ورتبة الخطر ومجموعة التعبئة وتعليمات التعبئة للشحنات الجوية، ويُنبَّه إلى «طائرات الشحن فقط» على بوليصة الشحن الجوي." },
      { icon: Coins, code: "FX · TAX", title: "العملات والضرائب", text: "كل مستند بعملته وبسعر الصرف المسجّل له، وبضريبة بلده (القيمة المضافة 15% في السعودية، وSST، وPPN)، مع نسبة 0% للبنود غير الخاضعة للضريبة، كالنقل الدولي الخاضع لنسبة الصفر في السعودية، ويُتحقق من الأرقام الضريبية للشركاء وفق صيغة كل دولة." },
      { icon: CalendarCheck, title: "قواعد التشغيل", text: "لا وصول قبل المغادرة، ولا تصدر البوليصة الفرعية قبل أن يكون لكل حاوية رقمها ونوعها ووزنها." },
    ],
  },
};

/** The trade's standards and checks the system applies on its own, right after the services strip. */
export async function TradeRules() {
  const locale = await getLocale();
  const t = copy[locale];
  const fmt = (s: string) => (locale === "ar" ? bidi(s) : s);
  return (
    <Section tone="light" id="trade-rules">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.sub} />
      <RevealGroup className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" stagger={0.03}>
        {t.rules.map((r, i) => {
          const Icon = r.icon;
          const last = i === t.rules.length - 1;
          return (
            <RevealItem key={r.title} className={last ? "h-full lg:col-span-3 xl:col-span-1" : "h-full"}>
              <div className="flex h-full flex-col rounded-2xl border border-fog-200 bg-white p-5 shadow-card">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-spark-400">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  {r.code ? (
                    <span dir="ltr" className="rounded-md bg-spark-50 px-2 py-0.5 font-mono text-[11px] font-semibold text-spark-800 ring-1 ring-inset ring-spark-100">
                      {r.code}
                    </span>
                  ) : null}
                </div>
                <h3 className="font-display mt-4 text-[15.5px] font-semibold text-ink-900">{r.title}</h3>
                {/* "calt" off: Inter otherwise draws "2 x 20GP" as "2 × 20GP"; the app's format uses a letter x. */}
                <p className="mt-1.5 text-pretty text-[13.5px] leading-relaxed text-fog-600" style={{ fontFeatureSettings: '"cv11", "ss01", "ss03", "calt" 0' }}>{fmt(r.text)}</p>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
