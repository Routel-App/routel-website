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
src/app/                Routes: /, /pricing, /demo, /docs, /docs/[...slug]
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

## Things to finish before launch

- `src/app/demo/actions.ts` logs demo requests to the server console. Wire it to email, a sheet or a CRM.
- `src/components/home/testimonials.tsx` holds placeholder quotes. Replace with real, attributed ones.
- `src/components/pricing/pricing-tiers.tsx` shows tiers without prices. Add prices when decided.
- Set `NEXT_PUBLIC_SITE_URL` to the production domain (used for canonical URLs, sitemap and Open Graph).
