"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, Check, Paperclip, Ship } from "lucide-react";
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
  { no: "MSKU 482 913-0", type: "40HC", seal: "ML-7702318", pkgs: "412 CTN" },
  { no: "MSKU 519 204-7", type: "40HC", seal: "ML-7702319", pkgs: "398 CTN" },
];

/**
 * A stylised, hand-built rendering of a Routel job screen. Not a screenshot:
 * everything here is markup so it stays crisp, themable and animatable.
 */
export function HeroMockup() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: EASE, delay },
        };

  return (
    <div className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -top-16 bottom-0 -z-10 rounded-[40px] bg-[radial-gradient(60%_50%_at_60%_20%,rgb(71_188_172/0.35),transparent_70%)] blur-2xl"
      />

      <motion.div
        {...fade(0.15)}
        className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-float ring-hairline"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-ink-950/60 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <div className="ml-3 flex h-6 flex-1 items-center rounded-md bg-white/[0.05] px-3 font-mono text-[11px] text-white/45">
            app.routel.io/jobs/JOB-2026-0412
          </div>
        </div>

        <div className="grid grid-cols-[1fr] gap-0 md:grid-cols-[1fr_200px]">
          {/* Main */}
          <div className="p-4 sm:p-5">
            <motion.div {...fade(0.3)} className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-white/50">
                  <Ship className="h-3.5 w-3.5 text-teal-300" />
                  <span className="font-mono">JOB-2026-0412</span>
                  <span className="rounded-full bg-teal-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal-300">
                    Sea · FCL
                  </span>
                </div>
                <h3 className="mt-1.5 font-display text-lg font-semibold text-white sm:text-xl">
                  Port Klang <span className="text-white/35">→</span> Jebel Ali
                </h3>
                <p className="mt-0.5 text-[12px] text-white/55">
                  MYPKG → AEJEA · MSC ISABELLA V.2638W · HBL RTL-PKG-260412
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-5 gap-y-1 text-right text-[11px]">
                <div className="text-white/45">ETD</div>
                <div className="font-mono text-white">12 Oct 2026</div>
                <div className="text-white/45">ETA</div>
                <div className="font-mono text-white">26 Oct 2026</div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div {...fade(0.45)} className="mt-5">
              <div className="relative flex items-center justify-between">
                <div className="absolute left-2 right-2 top-1/2 h-px -translate-y-1/2 bg-white/10" />
                <motion.div
                  className="absolute left-2 top-1/2 h-px -translate-y-1/2 bg-teal-400"
                  initial={reduce ? { width: "50%" } : { width: 0 }}
                  animate={{ width: "50%" }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.7 }}
                />
                {steps.map((s, i) => (
                  <div key={s.label} className="relative flex flex-col items-center gap-1.5">
                    <motion.span
                      initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.6 + i * 0.12 }}
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
            </motion.div>

            {/* Containers */}
            <motion.div {...fade(0.6)} className="mt-5 overflow-hidden rounded-lg border border-white/[0.07]">
              <div className="grid grid-cols-[1.4fr_0.6fr_1fr_0.8fr] gap-2 bg-white/[0.04] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-white/40">
                <span>Container</span>
                <span>Type</span>
                <span>Seal</span>
                <span className="text-right">Packages</span>
              </div>
              {containers.map((c) => (
                <div
                  key={c.no}
                  className="grid grid-cols-[1.4fr_0.6fr_1fr_0.8fr] gap-2 border-t border-white/[0.05] px-3 py-2 font-mono text-[11px] text-white/80"
                >
                  <span>{c.no}</span>
                  <span>{c.type}</span>
                  <span className="text-white/55">{c.seal}</span>
                  <span className="text-right">{c.pkgs}</span>
                </div>
              ))}
            </motion.div>

            {/* Docs */}
            <motion.div {...fade(0.7)} className="mt-4 flex flex-wrap gap-2">
              {["Booking confirmation.pdf", "Packing list.xlsx", "House BL.pdf"].map((d) => (
                <span
                  key={d}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[10.5px] text-white/65"
                >
                  <Paperclip className="h-3 w-3 text-white/40" />
                  {d}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Side panel */}
          <motion.aside
            {...fade(0.55)}
            className="border-t border-white/[0.06] bg-white/[0.025] p-4 md:border-l md:border-t-0"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/40">Job P&amp;L</p>
            <dl className="mt-2 space-y-2 text-[11.5px]">
              <div className="flex items-baseline justify-between">
                <dt className="text-white/55">Revenue</dt>
                <dd className="font-mono text-white">MYR 18,640</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-white/55">Vendor cost</dt>
                <dd className="text-right font-mono text-white/80">
                  USD 2,910
                  <span className="block text-[10px] text-white/35">≈ MYR 12,428</span>
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-white/[0.08] pt-2">
                <dt className="text-white/70">Gross profit</dt>
                <dd className="font-mono font-semibold text-teal-300">MYR 6,212</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-white/55">Margin</dt>
                <dd className="font-mono text-white/80">33.3%</dd>
              </div>
            </dl>

            <p className="mt-5 text-[10px] font-semibold uppercase tracking-wide text-white/40">Audit log</p>
            <ul className="mt-2 space-y-1.5 text-[10.5px] text-white/55">
              <li>
                <span className="text-white/80">Sara</span> attached House BL
              </li>
              <li>
                <span className="text-white/80">Assistant</span> proposed invoice
              </li>
              <li>
                <span className="text-white/80">Faisal</span> confirmed booking
              </li>
            </ul>
          </motion.aside>
        </div>
      </motion.div>

      {/* Floating assistant card */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 1.25 }}
        className="absolute -bottom-16 left-2 w-[300px] rounded-xl border border-fog-200 bg-white p-3.5 shadow-float sm:-bottom-14 sm:-left-8 sm:w-[320px]"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-spark-100 text-spark-600">
            <Bot className="h-4 w-4" />
          </span>
          <p className="text-[12px] font-semibold text-ink-900">Assistant · proposal</p>
          <span className="ml-auto rounded-full bg-fog-100 px-2 py-0.5 text-[10px] font-medium text-fog-600">
            awaiting confirmation
          </span>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-fog-700">
          Create invoice for <span className="font-mono text-ink-900">JOB-2026-0412</span>: ocean freight, THC and documentation.
          Total <span className="font-mono font-semibold text-ink-900">MYR 18,640</span>.
        </p>
        <div className="mt-3 flex gap-2">
          <span className="inline-flex h-8 flex-1 items-center justify-center rounded-lg bg-ink-900 text-[12px] font-medium text-white">
            Confirm
          </span>
          <span className="inline-flex h-8 flex-1 items-center justify-center rounded-lg bg-fog-100 text-[12px] font-medium text-ink-900">
            Edit
          </span>
        </div>
      </motion.div>
    </div>
  );
}
