@AGENTS.md

# Routel website

Public marketing + docs site for Routel, the freight forwarding SaaS platform. See README.md for layout.

- Only describe product capabilities that exist in the module list in `src/lib/modules.ts`. Do not invent features.
- Site copy is English; the AI assistant supports Arabic and English, and that is a selling point worth showing.
- Design is original (not a copy of any competitor). Tokens live in `src/app/globals.css`; keep motion subtle and
  respect `prefers-reduced-motion` (use `Reveal` / `RevealGroup`).
- Docs pages are MDX in `content/docs`; register new slugs in `src/lib/docs.ts`.
- Before committing: `npm run lint && npm run build`.
