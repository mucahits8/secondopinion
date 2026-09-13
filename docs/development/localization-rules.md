# Localization Rules

Second Opinion is a multilingual product. Every feature must ship in `tr`, `en` and `es` in the same pull request.

## Definition Of Done

- Public and authenticated routes live under `/{locale}` with supported locale prefixes: `/tr`, `/en`, `/es`.
- Turkish is the default and source language.
- User-facing strings must live in `/messages/{locale}/*.json`, grouped by semantic namespace.
- Do not hardcode navigation labels, CTA labels, validation messages, placeholders, aria labels, metadata, status labels, footer text, blog content, doctor content, specialty content, case copy or report copy in React/TSX.
- Domain state stays language independent. Store statuses as stable enum-like keys and translate only their presentation labels.
- Use `Intl.DateTimeFormat` and `Intl.NumberFormat` helpers for locale-sensitive dates and numbers.
- Language switching must preserve the equivalent current path and avoid flags.
- Run `npm run check:i18n`, `npm run lint` and `npm run build` before pushing.

## Message Files

Required namespaces currently are:

`common`, `navigation`, `home`, `blog`, `doctors`, `specialties`, `auth`, `patient`, `cases`, `upload`, `report`, `validation`, `errors`.

All locales must keep identical JSON key structures. Arrays can contain localized content, but their structural fields should match where the code depends on them.
