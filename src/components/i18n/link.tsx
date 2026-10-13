"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localizeHref } from "@/lib/i18n";
import { useLocale } from "./locale-provider";

/**
 * Drop-in replacement for next/link that keeps visitors in their language:
 * on Arabic pages "/pricing" becomes "/ar/pricing". Use this for every
 * internal link instead of importing next/link directly.
 */
export default function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  const localized = typeof href === "string" ? localizeHref(href, locale) : href;
  return <NextLink href={localized} {...rest} />;
}
