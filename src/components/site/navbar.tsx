"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ProductMenu } from "./product-menu";
import { modules } from "@/lib/modules";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/** Routes whose top section is dark; the navbar starts in its inverse (light-on-dark) look there. */
const DARK_HERO_ROUTES = new Set(["/"]);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const inverse = DARK_HERO_ROUTES.has(pathname) && !scrolled && !open;

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    if (!path || path === "/") return false;
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,border-color,color] duration-300",
        scrolled || open
          ? "border-b border-fog-200/80 bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="Routel home" className="shrink-0">
          <Logo inverse={inverse} />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <ProductMenu inverse={inverse} />
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                inverse
                  ? "text-white/80 hover:bg-white/10 hover:text-white"
                  : isActive(item.href)
                    ? "bg-fog-100 text-ink-900"
                    : "text-fog-700 hover:bg-fog-100 hover:text-ink-900",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button href="/docs" variant={inverse ? "inverse-ghost" : "ghost"} size="sm">
            Documentation
          </Button>
          <Button href={site.cta.href} variant={inverse ? "inverse" : "primary"} size="sm">
            {site.cta.label}
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden",
            inverse ? "text-white hover:bg-white/10" : "text-ink-900 hover:bg-fog-100",
          )}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="border-t border-fog-200 bg-white md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-fog-500">Product</p>
              <div className="grid grid-cols-2 gap-1">
                {modules
                  .filter((m) => m.docs && m.slug !== "ai-assistant")
                  .map((m) => (
                    <Link
                      key={m.slug}
                      href={m.docs as string}
                      className="rounded-xl px-3 py-2 text-[13.5px] font-medium text-ink-900 hover:bg-fog-100"
                      onClick={() => setOpen(false)}
                    >
                      {m.name}
                    </Link>
                  ))}
              </div>
              <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-fog-500">More</p>
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-base font-medium text-ink-900 hover:bg-fog-100"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2">
                <Button href="/docs" variant="secondary">
                  Documentation
                </Button>
                <Button href={site.cta.href}>{site.cta.label}</Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
