"use client";

import { useState } from "react";
import { Anchor, CalendarClock, Container as ContainerIcon, FileStack } from "lucide-react";
import { useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PortScene, type PortStage } from "@/components/motion/port-scene";

type Copy = {
  eyebrow: string;
  title: string;
  lead: string;
  scene: string;
  vessel: string;
  stages: Record<PortStage, string>;
  facts: Array<{ value: string; label: string }>;
  ports: string[];
};

const copy: Record<Locale, Copy> = {
  en: {
    eyebrow: "Ocean freight and containers",
    title: "Built for the way containers actually move",
    lead: "Vessels and voyages, containers and their types, cut-offs, B/Ls and seven shipping dates: Routel is made for an ocean freight desk, so the booking already knows what your team tracks.",
    scene: "Animated container terminal: a gantry crane loads containers onto a ship, which then sails.",
    vessel: "MSC ISABELLA · 412E",
    stages: { confirmed: "Booking Confirmed", gateIn: "Gate In", loaded: "Vessel Loaded", departed: "Departed" },
    facts: [
      { value: "11", label: "booking statuses, Booking Pending to Shipment Closed" },
      { value: "7", label: "shipping dates per booking, gate-in cut-off to ATA" },
      { value: "HBL + MBL", label: "on every booking; the House B/L is generated from it" },
      { value: "1", label: "record per shipment, from quotation to closed" },
    ],
    ports: ["MYPKG Port Klang", "CNSHA Shanghai", "NLRTM Rotterdam", "IDJKT Jakarta", "SGSIN Singapore", "SAJED Jeddah", "AEJEA Jebel Ali", "INNSA Nhava Sheva"],
  },
  ar: {
    eyebrow: "الشحن البحري والحاويات",
    title: "مصمَّم لحركة الحاويات كما تحدث فعلاً",
    lead: "السفن والرحلات، والحاويات وأنواعها، ومواعيد الإغلاق، والبوالص، وسبعة تواريخ للشحنة: صُمم Routel لمكتب الشحن البحري، فالحجز يعرف مسبقاً ما يتابعه فريقك.",
    scene: "محطة حاويات متحركة: رافعة ترفع الحاويات إلى السفينة ثم تبحر.",
    vessel: "MSC ISABELLA · 412E",
    stages: { confirmed: "تم تأكيد الحجز", gateIn: "دخول البوابة", loaded: "تم التحميل على السفينة", departed: "غادرت" },
    facts: [
      { value: "11", label: "حالة للحجز، من «الحجز قيد الانتظار» حتى «الشحنة مغلقة»" },
      { value: "7", label: "تواريخ لكل حجز، من موعد إغلاق البوابة حتى الوصول الفعلي" },
      { value: "HBL + MBL", label: "في كل حجز، والبوليصة الفرعية تُنشأ منه مباشرة" },
      { value: "1", label: "سجل لكل شحنة، من عرض السعر حتى الإغلاق" },
    ],
    ports: ["SAJED جدة", "AEJEA جبل علي", "CNSHA شنغهاي", "NLRTM روتردام", "INNSA نهافا شيفا", "SGSIN سنغافورة", "EGPSD بورسعيد", "OMSLL صلالة"],
  },
};

const factIcons = [CalendarClock, Anchor, FileStack, ContainerIcon];

export function Ocean() {
  const locale = useLocale();
  const t = copy[locale];
  const [stage, setStage] = useState<PortStage>("loaded");
  const order: PortStage[] = ["confirmed", "gateIn", "loaded", "departed"];

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 text-white sm:py-28" id="ocean">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="dark">{t.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-balance text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">{t.title}</h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-white/65 sm:text-lg">{t.lead}</p>
        </Reveal>

        <Reveal amount={0.15} className="relative mt-12 overflow-hidden rounded-3xl ring-1 ring-white/10">
          <div className="rtl:-scale-x-100">
            <PortScene onStage={setStage} label={t.scene} />
          </div>
          {/* The booking riding along with the scene */}
          <div className="absolute end-3 top-3 max-w-[calc(100%-1.5rem)] rounded-2xl bg-white/95 p-3 text-ink-900 shadow-float backdrop-blur sm:end-5 sm:top-5 sm:p-4">
            <div className="flex items-center gap-3">
              <p dir="ltr" className="font-mono text-[12px] font-semibold sm:text-[13px]">NXS26000412</p>
              <span key={stage} className="journey-pill rounded-full bg-spark-50 px-2 py-0.5 text-[11px] font-semibold text-spark-700 ring-1 ring-spark-200">
                {t.stages[stage]}
              </span>
            </div>
            <p dir="ltr" className="mt-1 font-mono text-[10.5px] text-fog-500 rtl:text-end sm:text-[11px]">{t.vessel} · 3 × 40HC</p>
            <div className="mt-2 hidden gap-1 sm:flex" aria-hidden>
              {order.map((s) => (
                <span key={s} className={cn("h-1 w-10 rounded-full transition-colors duration-500", order.indexOf(s) <= order.indexOf(stage) ? "bg-spark-400" : "bg-fog-200")} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Port codes, drifting by */}
        <div className="marquee-mask mt-6 overflow-hidden" aria-hidden>
          <div className="flex w-max animate-marquee gap-3 rtl:[animation-direction:reverse]">
            {[...t.ports, ...t.ports].map((p, i) => (
              <span key={i} className="whitespace-nowrap rounded-full bg-white/[0.05] px-3.5 py-1.5 font-mono text-[12px] text-white/60 ring-1 ring-white/10">
                {p}
              </span>
            ))}
          </div>
        </div>

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {t.facts.map((f, i) => {
            const Icon = factIcons[i];
            return (
              <RevealItem key={f.label} className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-inset ring-white/10">
                <Icon className="h-5 w-5 text-spark-300" />
                <p dir="ltr" className="font-display mt-3 text-3xl font-bold text-white rtl:text-end">{f.value}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-white/60">{f.label}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
