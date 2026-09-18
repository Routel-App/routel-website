"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DocNavGroup } from "@/lib/docs";
import { cn } from "@/lib/utils";

export function DocsSidebar({ nav }: { nav: DocNavGroup[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = nav.flatMap((g) => g.items).find((i) => i.href === pathname);

  const list = (
    <nav aria-label="Documentation" className="space-y-7">
      {nav.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-fog-500">{group.title}</p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13.5px] transition-colors",
                      active
                        ? "bg-teal-50 font-medium text-teal-800"
                        : "text-fog-700 hover:bg-fog-100 hover:text-ink-900",
                    )}
                  >
                    <span>{item.title}</span>
                    {item.status === "stub" ? (
                      <span className="rounded-full bg-fog-100 px-1.5 py-px text-[10px] font-medium text-fog-500">soon</span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile: collapsible */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between rounded-xl border border-fog-200 bg-white px-4 py-3 text-sm font-medium text-ink-900 shadow-card"
        >
          <span>{current?.title ?? "Documentation"}</span>
          <ChevronDown className={cn("h-4 w-4 text-fog-500 transition-transform", open && "rotate-180")} />
        </button>
        {open ? <div className="mt-3 rounded-xl border border-fog-200 bg-white p-3">{list}</div> : null}
      </div>

      {/* Desktop: sticky rail */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-4">{list}</div>
      </aside>
    </>
  );
}
