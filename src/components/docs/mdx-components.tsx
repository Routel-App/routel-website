import Link from "@/components/i18n/link";
import type { ComponentProps, ReactNode } from "react";
import { Info, Lightbulb, TriangleAlert, ShieldCheck, Eye, PenLine, MessageSquareText, Wrench, FileCheck2, UserCheck, ServerCog, ScrollText, ArrowRight } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { Shot } from "@/components/shots/shot";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    // Unicode-aware so headings on Arabic pages keep their letters and get usable anchors.
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function Heading({ as: Tag, className, children, ...rest }: ComponentProps<"h2"> & { as: "h2" | "h3" | "h4" }) {
  const id = rest.id ?? slugify(textOf(children));
  return (
    <Tag id={id} className={cn("group scroll-mt-28", className)} {...rest}>
      <a href={`#${id}`} className="no-underline">
        {children}
      </a>
      <span aria-hidden className="ms-2 text-fog-300 opacity-0 transition-opacity group-hover:opacity-100">
        #
      </span>
    </Tag>
  );
}

type CalloutKind = "note" | "tip" | "warning" | "permission";

const calloutStyles: Record<CalloutKind, { icon: typeof Info; cls: string }> = {
  note: { icon: Info, cls: "border-fog-200 bg-fog-50 text-fog-700" },
  tip: { icon: Lightbulb, cls: "border-spark-200 bg-spark-50 text-spark-900" },
  warning: { icon: TriangleAlert, cls: "border-spark-200 bg-spark-50 text-spark-600" },
  permission: { icon: ShieldCheck, cls: "border-ink-700/20 bg-ink-900 text-white" },
};

const calloutLabels = {
  en: { note: "Note", tip: "Tip", warning: "Heads up", permission: "Who can do this" },
  ar: { note: "ملاحظة", tip: "نصيحة", warning: "تنبيه", permission: "من يمكنه القيام بذلك" },
} satisfies Record<Locale, Record<CalloutKind, string>>;

export async function Callout({ kind = "note", title, children }: { kind?: CalloutKind; title?: string; children: ReactNode }) {
  const { icon: Icon, cls } = calloutStyles[kind];
  const label = calloutLabels[await getLocale()][kind];
  return (
    <div className={cn("not-prose my-6 flex gap-3 rounded-xl border p-4 text-sm leading-relaxed", cls)}>
      <Icon className="mt-0.5 h-4.5 w-4.5 shrink-0" strokeWidth={2} />
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{title ?? label}</p>
        <div className={cn("mt-1 [&_p]:m-0 [&_p+p]:mt-2", kind === "permission" ? "text-white/80" : "opacity-90")}>{children}</div>
      </div>
    </div>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return (
    <ol className="not-prose my-6 space-y-4 [counter-reset:step]">{children}</ol>
  );
}

export function Step({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <li className="relative ps-11 [counter-increment:step] before:absolute before:start-0 before:top-0 before:flex before:h-7 before:w-7 before:items-center before:justify-center before:rounded-full before:bg-ink-900 before:font-mono before:text-[12px] before:font-semibold before:text-white before:content-[counter(step)]">
      <p className="text-[15px] font-semibold text-ink-900">{title}</p>
      {children ? <div className="mt-1 text-sm leading-relaxed text-fog-600 [&_p]:m-0 [&_p+p]:mt-2">{children}</div> : null}
    </li>
  );
}

export function Fields({ rows }: { rows: Array<[string, string]> }) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-fog-200">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k} className="border-t border-fog-200 first:border-t-0">
              <th scope="row" className="w-[38%] bg-fog-50 px-4 py-2.5 text-start align-top font-medium text-ink-900">
                {k}
              </th>
              <td className="px-4 py-2.5 text-fog-600">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * What the assistant does in one area, as a card: what it reads straight
 * away, what it prepares for confirmation, and a sample request. Used
 * instead of a wide table so it reads on a phone.
 */
type Capability = { area: string; reads?: string; writes?: string; ask?: string };
const capabilityLabels: Record<Locale, { reads: string; writes: string; ask: string }> = {
  en: { reads: "Reads, immediately", writes: "Prepares, for your confirmation", ask: "Ask it" },
  ar: { reads: "يقرأ فوراً", writes: "يجهّز لتأكيدك", ask: "اطلب منه" },
};

export async function Capabilities({ items }: { items: Capability[] }) {
  const t = capabilityLabels[await getLocale()];
  return (
    <div className="not-prose my-8 grid gap-3 sm:grid-cols-2">
      {items.map((c) => (
        <div key={c.area} className="flex flex-col rounded-2xl border border-fog-200 bg-white p-4 shadow-card">
          <p className="font-display text-[15px] font-bold text-ink-900">{c.area}</p>
          {c.reads ? (
            <div className="mt-3 flex gap-2.5">
              <Eye className="mt-0.5 h-4 w-4 shrink-0 text-fog-400" aria-hidden />
              <p className="text-[13px] leading-relaxed text-fog-700">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-fog-500">{t.reads}</span>
                {c.reads}
              </p>
            </div>
          ) : null}
          {c.writes ? (
            <div className="mt-3 flex gap-2.5">
              <PenLine className="mt-0.5 h-4 w-4 shrink-0 text-spark-500" aria-hidden />
              <p className="text-[13px] leading-relaxed text-fog-700">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-spark-700">{t.writes}</span>
                {c.writes}
              </p>
            </div>
          ) : null}
          {c.ask ? (
            <div className="mt-auto pt-3.5">
              <p className="flex items-start gap-2 rounded-xl rounded-ss-sm bg-ink-900 px-3 py-2 text-[12.5px] leading-relaxed text-white">
                <MessageSquareText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-spark-300" aria-label={t.ask} />
                <span dir="auto">{c.ask}</span>
              </p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** A strip of headline figures: `<Glance items={[{ value: "90", label: "…" }]} />`. */
export function Glance({ items }: { items: Array<{ value: string; label: string }> }) {
  return (
    <div className="not-prose my-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((i) => (
        <div key={i.label} className="rounded-2xl bg-ink-900 p-4 text-white">
          <p dir="ltr" className="font-display text-3xl font-extrabold leading-none text-spark-400 rtl:text-end">{i.value}</p>
          <p className="mt-2 text-[12.5px] leading-snug text-white/75">{i.label}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * The path of one request through the assistant, from a sentence to a
 * logged change. Each stage is a fact of the system (see ai-assistant.mdx).
 */
const flowCopy: Record<Locale, { title: string; stages: Array<{ title: string; text: string }>; reads: string }> = {
  en: {
    title: "How one request travels",
    reads: "Reads (search, reports, statements) return at stage 2.",
    stages: [
      { title: "You ask", text: "A sentence in any language, with a file if you have one, on the page you're working on." },
      { title: "It calls tools", text: "It picks from the system's own actions, with your role's permissions, never more." },
      { title: "It proposes", text: "Anything that writes stops as a card: every field, line and amount." },
      { title: "You confirm", text: "Confirm, edit or cancel. A repeated click never writes twice." },
      { title: "The server re-checks", text: "Validation and role are checked again, as on the screen, then it is saved." },
      { title: "It is on record", text: "Who confirmed what, with which values and outcome, in the audit log." },
    ],
  },
  ar: {
    title: "رحلة الطلب الواحد",
    reads: "القراءة (البحث، التقارير، الكشوف) تعود عند المرحلة الثانية.",
    stages: [
      { title: "تطلب", text: "جملة بأي لغة، مع ملف إن وُجد، من الصفحة التي تعمل عليها." },
      { title: "يستدعي الأدوات", text: "يختار من إجراءات النظام نفسه، بصلاحيات دورك، ولا يتجاوزها." },
      { title: "يقترح", text: "كل ما يكتب بيانات يتوقف كبطاقة: كل حقل وبند ومبلغ." },
      { title: "تؤكد", text: "تأكيد أو تعديل أو إلغاء. والضغط المتكرر لا يكتب مرتين." },
      { title: "الخادم يعيد التحقق", text: "يُعاد فحص القيم والدور كما في الشاشة، ثم يُحفظ." },
      { title: "يُسجَّل", text: "من أكّد ماذا، وبأي قيم، وما النتيجة، في سجل التدقيق." },
    ],
  },
};
const flowIcons = [MessageSquareText, Wrench, PenLine, UserCheck, ServerCog, ScrollText];

export async function AssistantFlow() {
  const t = flowCopy[await getLocale()];
  return (
    <figure className="not-prose my-8 rounded-3xl bg-[linear-gradient(135deg,var(--color-fog-100),var(--color-spark-50))] p-4 sm:p-6">
      <figcaption className="mb-4 flex items-center gap-2 text-[13px] font-semibold text-ink-900">
        <FileCheck2 className="h-4 w-4 text-spark-600" />
        {t.title}
      </figcaption>
      <ol className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {t.stages.map((s, i) => {
          const Icon = flowIcons[i];
          const human = i === 0 || i === 3;
          return (
            <li key={s.title} className={cn("relative rounded-2xl p-4 shadow-card ring-1", human ? "bg-ink-900 text-white ring-ink-800" : "bg-white text-ink-900 ring-fog-200")}>
              <div className="flex items-center gap-2">
                <span className={cn("flex h-7 w-7 items-center justify-center rounded-lg text-[12px] font-bold", human ? "bg-spark-400 text-ink-950" : "bg-spark-50 text-spark-700")}>{i + 1}</span>
                <Icon className={cn("h-4 w-4", human ? "text-spark-300" : "text-fog-400")} aria-hidden />
                <p className="text-[14px] font-bold">{s.title}</p>
                {i < t.stages.length - 1 ? <ArrowRight className="ms-auto hidden h-4 w-4 text-fog-300 lg:block rtl:-scale-x-100" aria-hidden /> : null}
              </div>
              <p className={cn("mt-2 text-[12.5px] leading-relaxed", human ? "text-white/75" : "text-fog-600")}>{s.text}</p>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-[12px] text-fog-600">{t.reads}</p>
    </figure>
  );
}

export const mdxComponents: MDXComponents = {
  Capabilities,
  Glance,
  AssistantFlow,
  Shot,
  h2: (p) => <Heading as="h2" {...p} />,
  h3: (p) => <Heading as="h3" {...p} />,
  h4: (p) => <Heading as="h4" {...p} />,
  a: ({ href = "", children, ...rest }) => {
    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  },
  table: (p) => (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-fog-200">
      <table className="w-full text-sm [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-fog-600 [&_th]:bg-fog-50 [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-start [&_th]:font-medium [&_th]:text-ink-900 [&_tr+tr]:border-t [&_tr+tr]:border-fog-200" {...p} />
    </div>
  ),
  // Code always reads left-to-right, also on Arabic (RTL) pages.
  pre: (p) => <pre dir="ltr" {...p} />,
  code: (p) => <code dir="ltr" {...p} />,
  Callout,
  Steps,
  Step,
  Fields,
};
