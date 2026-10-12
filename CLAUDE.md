@AGENTS.md

# Routel website

Public marketing + docs site for Routel, the freight forwarding SaaS platform. See README.md for layout.

- Only describe product capabilities that exist in the module list in `src/lib/modules.ts`. Do not invent features.
- The site is bilingual: English at unprefixed URLs, Arabic under `/ar` (RTL). Every user-facing string needs both
  languages — see "Languages" in README.md. The AI assistant also speaks Arabic and English, a selling point worth showing.
- Use logical Tailwind direction utilities (`ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-`/`text-start`) so layouts mirror in Arabic.
- Design is original (not a copy of any competitor). Tokens live in `src/app/globals.css`; keep motion subtle and
  respect `prefers-reduced-motion` (use `Reveal` / `RevealGroup`).
- Docs pages are MDX in `content/docs`; register new slugs in `src/lib/docs.ts`.
- Before committing: `npm run lint && npm run build`.
