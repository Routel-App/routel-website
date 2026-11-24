import { Fragment, type ReactNode } from "react";

/**
 * Codes, amounts and numbers inside Arabic text, isolated left to right so
 * the browser's bidi algorithm can't reorder them: "+SAR 20.00" stays one
 * piece, "64 / 64" keeps its order, a "+" or "%" stays on its own side. Runs
 * of Latin letters, digits and the signs that belong to them ("SAR 3,450.00",
 * "MSCU 442118-0", "1 × 40HC", "29.2%") each go in a <bdi dir="ltr">;
 * everything else is left as it is. In English text only document numbers
 * are kept whole (no line break at their hyphens).
 */
const RUN = /[A-Za-z0-9+#&][A-Za-z0-9+#&\-.,:/×% ]*[A-Za-z0-9%]|[A-Za-z0-9]/g;

const ARABIC = /[\u0600-\u06FF]/;
/** Document numbers ("INV-27-0412", "CCNXS27000077"): never broken at their hyphens. */
const CODE = /[A-Z]{2,}[A-Z0-9]*(?:-[A-Z0-9]+)+/g;

export function bidi(text: string): ReactNode {
  const arabic = ARABIC.test(text);
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(arabic ? RUN : CODE)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    out.push(
      arabic ? (
        <bdi key={i} dir="ltr" className="whitespace-nowrap">
          {m[0]}
        </bdi>
      ) : (
        <span key={i} className="whitespace-nowrap">
          {m[0]}
        </span>
      ),
    );
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length === 1 ? out[0] : <>{out}</>;
}

/**
 * File names ("إشعار الوصول.pdf"), one or several joined by " · ": each is
 * isolated left to right as a whole, so the extension stays at its end.
 */
export function fileNames(text: string): ReactNode {
  const parts = text.split(" · ");
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {i > 0 ? " · " : null}
          {/\.[a-z0-9]{2,4}$/i.test(p) ? <bdi dir="ltr">{p}</bdi> : bidi(p)}
        </Fragment>
      ))}
    </>
  );
}
