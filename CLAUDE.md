# Ops Consultancy — Project Anchor

## What this is
Productised operations-automation consultancy for DTC brands selling
physical products (£1–10m, Shopify, multi-region fulfilment). Owner: Joshua.
Everything here is a sellable or reusable asset, not an experiment.
Positioning note: originally wedged on supplement/wellness brands; widened
on 2026-07-04 to all physical-product businesses (site copy updated, but
positioning/ and outreach/ docs still use the supplements wedge). Joshua's
in-house provenance story remains a supplements brand, that part is factual
and stays.

## Current state
- Positioning, offers, audit product, asset library, site, outreach kit, and
  operating README are built. See README.md for the asset map and launch plan.
- Pricing is filled in with recommended values throughout (£2,000 audit /
  £9,500 build / £1,500pm retainer, positioning/offers.md) — change it there
  and across site/app/*/page.js and site/components/Nav.js together if
  Joshua lands on different numbers.
- One open decision owned by Joshua: the first-15 outreach list
  (outreach/qualification-checklist.md).
- Every "book a call" CTA on the site points to the real Google Calendar
  link, set once in site/lib/constants.js as BOOKING_URL.
- Pushed to GitHub: github.com/josheeyyy1/dtcops-tool. For Vercel, import
  that repo and set Root Directory to `site` (the repo root also holds the
  non-deployable positioning/audit/asset docs).

## Structure
- `positioning/` — wedge, ICP, offers, recommended pricing
- `audit/` — scoping questions, scoring sheet, report template (the first sale)
- `assets/` — Airtable schema + CSVs, workflow blueprints, KPI dashboard spec
- `site/` — Next.js app (App Router), four pages, deploys to Vercel
- `outreach/` — cold email, LinkedIn, follow-ups, call script, qualification
- `README.md` — the operating system: client journey + dated launch week

## Conventions
- Placeholders look like `[[DESCRIPTION]]`. Never invent clients, metrics,
  logos, or testimonials. Joshua swaps placeholders for real values.
- Voice: plain, direct, British English. No hype. No em dashes in any
  client-facing copy (use commas, colons, full stops).
- Every client-facing artifact must be usable in a live call as-is.
- Reusable across clients; per-client changes are config, listed in each
  asset's "Per-client config" section. Client-specific files go in `clients/`
  (gitignored).

## Build/deploy
- `site/` is the only part of this repo with a build step: a Next.js app
  (`npm install && npm run build` inside `site/`). Everything else
  (positioning/, audit/, assets/, outreach/) is plain markdown and CSVs,
  no build. See site/DEPLOY.md for the Vercel import steps.
- CSVs in `assets/airtable/` import directly into a new Airtable base in the
  order given in `assets/airtable/schema.md`.

## Design Context (site/)
- Audience: sceptical, busy founders/ops leads of £1–10m DTC physical-product
  brands, evaluating one person's competence before paying £2,000.
  Emotional goals: confidence and relief, not excitement.
- Aesthetic: high-end premium minimalist high-tech, aligned with
  airtable.com. Light theme, warm-white surfaces, near-black ink, one blue
  accent, generous whitespace, data rendered honestly (tables, status
  pills, tabular numerals). No dark-neon dashboards, no gradient text, no
  stock photography, no invented specifics.
- Typography: Bricolage Grotesque (headings), Hanken Grotesk (body),
  Spline Sans Mono (data/labels only). Colors in OKLCH, neutrals tinted
  toward the brand blue.
- Principles: the site is a demo of the service (calm, accurate,
  system-like); motion states facts (sync, convergence, alerts), never
  decoration, always honouring prefers-reduced-motion; whitespace is the
  luxury; one accent spent sparingly; copy is sacred.
- Full context lives in `.impeccable.md` at the repo root.
