"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { Bot, Check, FileText, User } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Msg =
  | { role: "user"; text: string; dir?: "rtl" }
  | { role: "assistant"; kind: "proposal"; title: string; rows: [string, string][]; total?: string }
  | { role: "assistant"; kind: "text"; text: string }
  | { role: "system"; text: string };

const script: Msg[] = [
  {
    role: "user",
    text: "Create a job for Al Noor Trading, Port Klang to Jebel Ali, 2 × 40HC, ETD 12 Oct on MSC Isabella.",
  },
  {
    role: "assistant",
    kind: "proposal",
    title: "Proposed job",
    rows: [
      ["Customer", "Al Noor Trading LLC"],
      ["Route", "MYPKG → AEJEA"],
      ["Equipment", "2 × 40HC"],
      ["Vessel / ETD", "MSC ISABELLA · 12 Oct"],
    ],
  },
  { role: "system", text: "Confirmed by Sara (Operations) · JOB-2026-0412 created" },
  { role: "user", text: "أنشئ فاتورة للعميل لهذه الشحنة بالرينجت", dir: "rtl" },
  {
    role: "assistant",
    kind: "proposal",
    title: "Proposed invoice · MYR",
    rows: [
      ["Ocean freight", "MYR 14,800.00"],
      ["THC (origin)", "MYR 2,640.00"],
      ["Documentation", "MYR 1,200.00"],
    ],
    total: "MYR 18,640.00",
  },
  { role: "system", text: "Waiting for confirmation · nothing saved yet" },
];

export function ChatMockup({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  return (
    <div
      ref={ref}
      dir="ltr"
      className={cn(
        "overflow-hidden rounded-2xl border border-fog-200 bg-white shadow-float",
        className,
      )}
    >
      <div className="flex items-center gap-2.5 border-b border-fog-200 bg-fog-50 px-4 py-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-spark-100 text-spark-600">
          <Bot className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[13px] font-semibold text-ink-900">Routel Assistant</p>
          <p className="text-[11px] text-fog-500">Signed in as Sara · Operations</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 text-[10.5px] font-medium text-fog-600 ring-1 ring-fog-200">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
          Arabic · English
        </span>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        {script.map((m, i) => {
          const anim = reduce
            ? {}
            : {
                initial: { opacity: 0, y: 10 },
                animate: inView ? { opacity: 1, y: 0 } : undefined,
                transition: { duration: 0.5, ease: EASE, delay: 0.25 + i * 0.45 },
              };

          if (m.role === "user") {
            return (
              <motion.div key={i} {...anim} className="flex justify-end gap-2">
                <p
                  dir={m.dir}
                  className={cn(
                    "max-w-[85%] rounded-2xl rounded-br-md bg-ink-900 px-3.5 py-2.5 text-[13px] leading-relaxed text-white",
                    m.dir === "rtl" && "text-right",
                  )}
                >
                  {m.text}
                </p>
                <span className="mt-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fog-100 text-fog-500">
                  <User className="h-3.5 w-3.5" />
                </span>
              </motion.div>
            );
          }

          if (m.role === "system") {
            return (
              <motion.div key={i} {...anim} className="flex justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-fog-100 px-2.5 py-1 text-[11px] font-medium text-fog-600">
                  {m.text.startsWith("Confirmed") ? <Check className="h-3 w-3 text-teal-600" strokeWidth={3} /> : null}
                  {m.text}
                </span>
              </motion.div>
            );
          }

          return (
            <motion.div key={i} {...anim} className="flex gap-2">
              <span className="mt-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-spark-100 text-spark-600">
                <Bot className="h-3.5 w-3.5" />
              </span>
              <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-fog-200 bg-fog-50 p-3.5 text-[13px] text-ink-900">
                {m.kind === "text" ? (
                  <p className="leading-relaxed">{m.text}</p>
                ) : (
                  <>
                    <p className="flex items-center gap-1.5 text-[12px] font-semibold text-fog-700">
                      <FileText className="h-3.5 w-3.5 text-fog-500" />
                      {m.title}
                    </p>
                    <dl className="mt-2 divide-y divide-fog-200/80 rounded-lg border border-fog-200 bg-white">
                      {m.rows.map(([k, v]) => (
                        <div key={k} className="flex items-baseline justify-between gap-4 px-3 py-1.5">
                          <dt className="text-[12px] text-fog-500">{k}</dt>
                          <dd className="font-mono text-[12px] text-ink-900">{v}</dd>
                        </div>
                      ))}
                      {m.total ? (
                        <div className="flex items-baseline justify-between gap-4 bg-fog-50 px-3 py-1.5">
                          <dt className="text-[12px] font-semibold text-ink-900">Total</dt>
                          <dd className="font-mono text-[12px] font-semibold text-ink-900">{m.total}</dd>
                        </div>
                      ) : null}
                    </dl>
                    <div className="mt-2.5 flex gap-2">
                      <span className="inline-flex h-8 items-center rounded-lg bg-ink-900 px-3 text-[12px] font-medium text-white">
                        Confirm
                      </span>
                      <span className="inline-flex h-8 items-center rounded-lg bg-white px-3 text-[12px] font-medium text-ink-900 ring-1 ring-fog-200">
                        Edit
                      </span>
                      <span className="inline-flex h-8 items-center px-2 text-[12px] font-medium text-fog-500">Cancel</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="border-t border-fog-200 px-4 py-3">
        <div className="flex h-10 items-center rounded-xl bg-fog-100 px-3.5 text-[13px] text-fog-400">
          Ask for a report, a statement, a document…
        </div>
      </div>
    </div>
  );
}
