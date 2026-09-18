import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Info, Lightbulb, TriangleAlert, ShieldCheck } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";

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
    .replace(/[^a-z0-9\s-]/g, "")
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
      <span aria-hidden className="ml-2 text-fog-300 opacity-0 transition-opacity group-hover:opacity-100">
        #
      </span>
    </Tag>
  );
}

type CalloutKind = "note" | "tip" | "warning" | "permission";

const calloutStyles: Record<CalloutKind, { icon: typeof Info; cls: string; label: string }> = {
  note: { icon: Info, cls: "border-fog-200 bg-fog-50 text-fog-700", label: "Note" },
  tip: { icon: Lightbulb, cls: "border-teal-200 bg-teal-50 text-teal-900", label: "Tip" },
  warning: { icon: TriangleAlert, cls: "border-spark-200 bg-spark-50 text-spark-600", label: "Heads up" },
  permission: { icon: ShieldCheck, cls: "border-ink-700/20 bg-ink-900 text-white", label: "Who can do this" },
};

export function Callout({ kind = "note", title, children }: { kind?: CalloutKind; title?: string; children: ReactNode }) {
  const { icon: Icon, cls, label } = calloutStyles[kind];
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
    <li className="relative pl-11 [counter-increment:step] before:absolute before:left-0 before:top-0 before:flex before:h-7 before:w-7 before:items-center before:justify-center before:rounded-full before:bg-ink-900 before:font-mono before:text-[12px] before:font-semibold before:text-white before:content-[counter(step)]">
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
              <th scope="row" className="w-[38%] bg-fog-50 px-4 py-2.5 text-left align-top font-medium text-ink-900">
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

export const mdxComponents: MDXComponents = {
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
      <table className="w-full text-sm [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-fog-600 [&_th]:bg-fog-50 [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-medium [&_th]:text-ink-900 [&_tr+tr]:border-t [&_tr+tr]:border-fog-200" {...p} />
    </div>
  ),
  Callout,
  Steps,
  Step,
  Fields,
};
