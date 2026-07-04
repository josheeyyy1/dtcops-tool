# Ops Consultancy — Project Anchor

## What this is
Productised operations-automation consultancy for DTC supplement/wellness
brands (£1–10m, Shopify, multi-region fulfilment). Owner: Joshua. Everything
here is a sellable or reusable asset, not an experiment.

## Current state
- Positioning, offers, audit product, asset library, site, outreach kit, and
  operating README are built. See README.md for the asset map and launch plan.
- Two open decisions owned by Joshua: final pricing (positioning/offers.md)
  and the first-15 outreach list (outreach/qualification-checklist.md).

## Structure
- `positioning/` — wedge, ICP, offers, recommended pricing
- `audit/` — scoping questions, scoring sheet, report template (the first sale)
- `assets/` — Airtable schema + CSVs, workflow blueprints, KPI dashboard spec
- `site/` — single static page, deploys to Vercel as-is
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
- No build step anywhere. Site is plain HTML/CSS: `site/index.html`, deploy
  with `vercel deploy site/` or drag into Vercel dashboard.
- CSVs in `assets/airtable/` import directly into a new Airtable base in the
  order given in `assets/airtable/schema.md`.
