<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Localization

Second Opinion is a multilingual product. Turkish (`tr`) is the default/source locale, and English (`en`) plus Spanish (`es`) must ship with every user-facing change at implementation time.

- All public and authenticated routes are locale-prefixed under `/tr`, `/en`, and `/es`.
- Do not hardcode user-facing copy in React/TSX/TypeScript. Put navigation labels, CTA text, aria labels, placeholders, validation, metadata, statuses, footer text, blog content, doctor content, specialty content, case copy, upload copy and report copy in semantic keys under `/messages/{locale}`.
- Keep business/domain state language independent. Store statuses and workflow states as stable enum-like keys, then translate their presentation labels.
- Use semantic i18n keys and preserve identical message key structures across locales.
- Use `Intl`-based helpers for date, number and currency display.
