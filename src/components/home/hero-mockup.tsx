"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  CalendarCheck,
  ChartColumn,
  Check,
  FolderOpen,
  Paperclip,
  Receipt,
  Route,
  Ship,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const steps = [
  { label: "Booked", done: true },
  { label: "Loaded", done: true },
  { label: "In transit", done: true, current: true },
  { label: "Arrived", done: false },
  { label: "Delivered", done: false },
];

const containers = [
  { no: "MSKU 482 913-0", type: "40HC", seal: "ML-7702318", pkgs: "412" },
  { no: "MSKU 519 204-7", type: "40HC", seal: "ML-7702319", pkgs: "398" },
];

const aging = [
  { label: "Current", pct: 46, amt: "84,120" },
  { label: "1–30", pct: 29, amt: "53,900" },
  { label: "31–60", pct: 17, amt: "31,240" },
  { label: "60+", pct: 8, amt: "14,610" },
];

const sidebar = [Ship, Route, CalendarCheck, Receipt, ChartColumn, Users, FolderOpen, Bot];

function Tile({
  title,
  className,
  children,
  delay = 0,
  reduce,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
  delay?: number;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      className={cn("rounded-xl border border-white/[0.07] bg-white/[0.035] p-3.5", className)}
    >
      {title ? <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wide text-white/40">{title}</p> : null}
      {children}
    </motion.div>
  );
}

/**
 * A stylised rendering of Routel's job workspace: a bento of the things a
 * forwarder looks at all day. Pure markup, so it stays crisp and animatable.
 */
export function HeroMockup() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-16 -top-10 bottom-10 -z-10 rounded-[48px] bg-[radial-gradient(60%_50%_at_50%_0%,rgb(71_188_172/0.28),transparent_70%)] blur-3xl"
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
        className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-float ring-hairline"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-ink-950/70 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <div className="ml-3 flex h-6 max-w-sm flex-1 items-center rounded-md bg-white/[0.05] px-3 font-mono text-[11px] text-white/45">
            app.routel.io/jobs/JOB-2026-0412
          </div>
          <span className="ml-auto hidden rounded-full bg-teal-400/15 px-2 py-0.5 text-[10px] font-semibold text-teal-300 sm:inline">
            Sara · Operations
          </span>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="hidden w-12 shrink-0 flex-col items-center gap-1 border-r border-white/[0.06] bg-ink-950/40 py-3 sm:flex">
            {sidebar.map((Icon, i) => (
              <span
                key={i}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  i === 0 ? "bg-teal-400/15 text-teal-300" : i === 7 ? "text-spark-300" : "text-white/35",
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
            ))}
          </div>

          {/* Bento */}
          <div className="grid flex-1 grid-cols-1 gap-3 p-3 sm:grid-cols-6 sm:p-4 lg:grid-cols-12">
            {/* Job header + timeline */}
            <Tile reduce={reduce} delay={0.45} className="sm:col-span-6 lg:col-span-5">
              <div className="flex items-center gap-2 text-[11px] text-white/50">
                <Ship className="h-3.5 w-3.5 text-teal-300" />
                <span className="font-mono">JOB-2026-0412</span>
                <span className="rounded-full bg-teal-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal-300">
                  Sea · FCL
                </span>
              </div>
              <h3 className="font-display mt-1.5 text-lg font-semibold text-white">
                Port Klang <span className="text-white/35">→</span> Jebel Ali
              </h3>
              <p className="mt-0.5 text-[11.5px] text-white/55">MYPKG → AEJEA · MSC ISABELLA V.2638W · ETD 12 Oct · ETA 26 Oct</p>
              <div className="relative mt-5 flex items-center justify-between">
                <div className="absolute left-2 right-2 top-2 h-px bg-white/10" />
                <motion.div
                  className="absolute left-2 top-2 h-px bg-teal-400"
                  initial={reduce ? { width: "50%" } : { width: 0 }}
                  animate={{ width: "50%" }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
                />
                {steps.map((s, i) => (
                  <div key={s.label} className="relative flex flex-col items-center gap-1.5">
                    <motion.span
                      initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.8 + i * 0.12 }}
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-ink-900",
                        s.done ? "bg-teal-400" : "bg-white/15",
                        s.current && "shadow-[0_0_0_4px_rgb(71_188_172/0.25)]",
                      )}
                    >
                      {s.done && !s.current ? <Check className="h-2.5 w-2.5 text-ink-950" strokeWidth={3} /> : null}
                    </motion.span>
                    <span className={cn("text-[10px]", s.current ? "font-semibold text-white" : "text-white/45")}>{s.label}</span>
                  </div>
                ))}
              </div>
            </Tile>

            {/* Containers */}
            <Tile reduce={reduce} delay={0.55} title="Containers" className="sm:col-span-3 lg:col-span-4">
              <div className="overflow-hidden rounded-lg border border-white/[0.07]">
                <div className="grid grid-cols-[1.5fr_0.6fr_1fr_0.5fr] gap-2 bg-white/[0.04] px-2.5 py-1.5 text-[9.5px] font-medium uppercase tracking-wide text-white/40">
                  <span>No.</span>
                  <span>Type</span>
                  <span>Seal</span>
                  <span className="text-right">Pkgs</span>
                </div>
                {containers.map((c) => (
                  <div
                    key={c.no}
                    className="grid grid-cols-[1.5fr_0.6fr_1fr_0.5fr] gap-2 border-t border-white/[0.05] px-2.5 py-1.5 font-mono text-[10.5px] text-white/80"
                  >
                    <span>{c.no}</span>
                    <span>{c.type}</span>
                    <span className="text-white/55">{c.seal}</span>
                    <span className="text-right">{c.pkgs}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {["Booking confirmation.pdf", "House BL.pdf"].map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-white/65"
                  >
                    <Paperclip className="h-2.5 w-2.5 text-white/40" />
                    {d}
                  </span>
                ))}
              </div>
            </Tile>

            {/* Job P&L */}
            <Tile reduce={reduce} delay={0.65} title="Job P&L" className="sm:col-span-3 lg:col-span-3">
              <dl className="space-y-1.5 text-[11.5px]">
                <div className="flex items-baseline justify-between">
                  <dt className="text-white/55">Revenue</dt>
                  <dd className="font-mono text-white">MYR 18,640</dd>
                </div>
                <div className="flex items-baseline justify-between">
                  <dt className="text-white/55">Vendor cost</dt>
                  <dd className="text-right font-mono text-white/80">
                    USD 2,910
                    <span className="block text-[9.5px] text-white/35">≈ MYR 12,428</span>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-white/[0.08] pt-1.5">
                  <dt className="text-white/70">Gross profit</dt>
                  <dd className="font-mono font-semibold text-teal-300">MYR 6,212</dd>
                </div>
                <div className="flex items-baseline justify-between">
                  <dt className="text-white/55">Margin</dt>
                  <dd className="font-mono text-white/80">33.3%</dd>
                </div>
              </dl>
            </Tile>

            {/* Assistant */}
            <Tile reduce={reduce} delay={0.8} className="sm:col-span-6 lg:col-span-5">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-spark-400/20 text-spark-300">
                  <Bot className="h-3.5 w-3.5" />
                </span>
                <p className="text-[11px] font-semibold text-white">Assistant</p>
                <span className="ml-auto rounded-full bg-white/[0.06] px-2 py-0.5 text-[9.5px] font-medium text-white/55">
                  awaiting confirmation
                </span>
              </div>
              <p dir="rtl" className="mt-2.5 ml-auto w-fit max-w-[90%] rounded-xl rounded-br-sm bg-white/[0.08] px-3 py-1.5 text-right text-[11.5px] text-white/85">
                أنشئ فاتورة للعميل لهذه الشحنة بالرينجت
              </p>
              <div className="mt-2 rounded-xl rounded-bl-sm border border-white/[0.08] bg-ink-950/50 p-2.5">
                <p className="text-[10.5px] font-semibold text-white/70">Proposed invoice · MYR</p>
                <dl className="mt-1.5 space-y-0.5 text-[10.5px]">
                  {[
                    ["Ocean freight", "14,800.00"],
                    ["THC (origin)", "2,640.00"],
                    ["Documentation", "1,200.00"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <dt className="text-white/50">{k}</dt>
                      <dd className="font-mono text-white/80">{v}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-white/[0.08] pt-1">
                    <dt className="font-semibold text-white">Total</dt>
                    <dd className="font-mono font-semibold text-white">18,640.00</dd>
                  </div>
                </dl>
                <div className="mt-2 flex gap-1.5">
                  <span className="inline-flex h-6 items-center rounded-md bg-teal-400 px-2.5 text-[10.5px] font-semibold text-ink-950">Confirm</span>
                  <span className="inline-flex h-6 items-center rounded-md bg-white/[0.08] px-2.5 text-[10.5px] font-medium text-white/80">Edit</span>
                </div>
              </div>
            </Tile>

            {/* AR aging */}
            <Tile reduce={reduce} delay={0.9} title="Receivables aging · MYR" className="sm:col-span-3 lg:col-span-4">
              <div className="space-y-2">
                {aging.map((a, i) => (
                  <div key={a.label} className="grid grid-cols-[44px_1fr_52px] items-center gap-2 text-[10.5px]">
                    <span className="text-white/55">{a.label}</span>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                      <motion.div
                        className={cn("h-full rounded-full", i === 0 ? "bg-teal-400" : i === 1 ? "bg-teal-500/80" : i === 2 ? "bg-spark-400/80" : "bg-spark-500")}
                        initial={reduce ? { width: `${a.pct}%` } : { width: 0 }}
                        animate={{ width: `${a.pct}%` }}
                        transition={{ duration: 0.9, ease: EASE, delay: 1.1 + i * 0.1 }}
                      />
                    </div>
                    <span className="text-right font-mono text-white/80">{a.amt}</span>
                  </div>
                ))}
              </div>
              <p className="mt-2.5 text-[10px] text-white/40">
                3 invoices overdue · <span className="text-spark-300">MYR 45,850</span>
              </p>
            </Tile>

            {/* Audit log */}
            <Tile reduce={reduce} delay={1.0} title="Audit log" className="sm:col-span-3 lg:col-span-3">
              <ul className="space-y-1.5 text-[10.5px] text-white/55">
                <li>
                  <span className="text-white/85">Sara</span> attached House BL
                  <span className="block text-[9.5px] text-white/30">2 min ago</span>
                </li>
                <li>
                  <span className="text-white/85">Assistant</span> proposed invoice
                  <span className="block text-[9.5px] text-white/30">4 min ago</span>
                </li>
                <li>
                  <span className="text-white/85">Faisal</span> confirmed booking
                  <span className="block text-[9.5px] text-white/30">Yesterday</span>
                </li>
              </ul>
            </Tile>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
