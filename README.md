# Routel website

Marketing site and documentation for **Routel**, the freight forwarding platform.
Live app work happens in the separate FreightOS repository; this repo is only the public website.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + TypeScript
- Tailwind CSS v4 (tokens live in `src/app/globals.css`)
- Framer Motion for scroll reveals and micro-interactions
- MDX docs via `next-mdx-remote` (content in `content/docs`)
- Self-hosted fonts from `@fontsource-variable` (Inter, Manrope, JetBrains Mono)

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build      # also type-checks
```

Node 20.9+ is required.

## Project layout

```
content/docs/           MDX documentation pages (one file per page)
content/features/       The /features page (en.mdx, ar.mdx): the product's own feature write-up plus <Shot name="…" /> images
src/app/[lang]/         Routes per locale: /, /pricing, /demo, /docs, /platform, /glossary, ...
src/components/home/    Landing page sections
src/components/docs/    Docs sidebar, MDX components, page shell
src/components/ui/      Button, Container, Section primitives
src/components/motion/  Reveal / RevealGroup scroll animations
src/lib/site.ts         Site name, nav, contact details
src/lib/modules.ts      The product modules shown on the home page and footer
src/lib/docs.ts         Docs navigation and MDX loader
```

## Adding a docs page

1. Create `content/docs/<slug>.mdx` with frontmatter:
   ```mdx
   ---
   title: Page title
   description: One sentence shown under the title.
   status: complete   # or "stub" to show a "soon" badge and a notice
   ---
   ```
2. Add the slug to the right group in `src/lib/docs.ts`.

Available MDX components: `<Callout kind="note|tip|warning|permission">`, `<Steps>` / `<Step title="">`,
and `<Fields rows={[["Label", "Text"], ...]} />`. GitHub-flavoured tables work as normal Markdown.

## Languages

The site is published in English (default, unprefixed URLs like `/pricing`) and Arabic (`/ar/pricing`, right-to-left).

- `src/proxy.ts` rewrites unprefixed URLs to the `src/app/[lang]` routes as `en`; `/en/...` redirects to the unprefixed URL.
- `src/lib/i18n.ts` lists the locales. Server Components read the locale with `getLocale()` (`src/lib/locale-server.ts`),
  Client Components with `useLocale()` (`src/components/i18n/locale-provider.tsx`).
- Component copy lives next to the component as `const copy = { en: {...}, ar: {...} }`.
- Internal links must use `@/components/i18n/link` (or `<Button href>`), which keeps visitors in their language.
- Module and platform-page copy: `src/lib/modules.ar.ts` and `src/lib/platform-content-ar/`.
- Docs and glossary: Arabic pages live in `content/ar/docs/<slug>.mdx` and `content/ar/glossary/<slug>.mdx`, same slugs as
  English. A missing translation falls back to the English page.

## Things to finish before launch

- `src/app/[lang]/demo/actions.ts` logs demo requests to the server console. Wire it to email, a sheet or a CRM.
- `src/components/home/testimonials.tsx` holds placeholder quotes. Replace with real, attributed ones.
- `src/components/pricing/pricing-tiers.tsx` shows tiers without prices. Add prices when decided.
- Set `NEXT_PUBLIC_SITE_URL` if the production domain ever differs from the default `https://routel.app` (used for canonical
  URLs, sitemap and Open Graph).
- There is no public contact email yet; the demo form is the only way to reach us. Add one to `src/lib/site.ts` when it exists.
