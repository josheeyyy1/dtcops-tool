# Ops Consultancy — Project Anchor

## What this is
Productised operations-automation consultancy for DTC supplement/wellness
brands (£1–10m, Shopify, multi-region fulfilment). Owner: Joshua. Everything
here is a sellable or reusable asset, not an experiment.

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
