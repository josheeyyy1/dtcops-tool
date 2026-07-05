# Demo Base: Ops Backbone Demo

A live, populated demo of the Ops Backbone, built from `schema.md`. Use it on
sales calls to show the system working rather than describing it. Fictional
brand: a home fragrance company (candles, diffusers, soaps) on Shopify,
shipping from three 3PLs (UK Bristol, EU Venlo, US Columbus). All data is
invented, no real client.

## Links
- Base: https://airtable.com/appbjeRPRDyDpxgUv
- Interface "Ops Dashboard" (published):
  - Reorder queue (grid, Low Stock = true): https://airtable.com/appbjeRPRDyDpxgUv/pagpm5wuJwbSTwFcv
  - Ops overview (dashboard, big numbers + weekly trend + open POs): https://airtable.com/appbjeRPRDyDpxgUv/pagp4KGLptDa2VGhb

IDs: base `appbjeRPRDyDpxgUv`, interface `pbdqN4TOAp7cgGtPD`.

## What the demo shows
- 3 suppliers, 3 locations, 10 products (1 discontinued), 22 inventory rows
  (SKU x location), 5 POs, 7 PO lines, 45 daily sales rows, 16 weekly KPI
  snapshots.
- The engine (Inventory Levels) computes Available, Effective Lead Time,
  Reorder Point, Days of Cover, Low Stock, Suggested Order Qty and a
  human-readable Stock Status, all from the schema formulas.
- Deliberate narrative baked into the numbers:
  - Two SKU-locations fire "Reorder due": Lavender Candle in the EU
    (suggested 768) and Citrus Hand Soap in the US (suggested 600).
  - US Lavender Candle looks thin (11 days cover) but is NOT flagged: a
    600-unit PO is already inbound. This is the point, reorder logic nets
    off On Order so you don't double-order.
  - One late PO (PO-2026-015, Vela to EU, expected 2026-06-28, still in
    transit) surfaces on the dashboard.
  - Discontinued Rose Candle has stock but zero velocity, reorder logic
    correctly ignores it.
  - Weekly KPI trend shows stock value drifting down and SKUs-low ticking
    up over four weeks, the story that justifies the build.

## Known demo simplifications (vs production schema.md)
The write API cannot create lookups or rollups, so two things differ from a
real client build. Both are quick to add in the Airtable UI if you want the
demo airtight:
1. Inventory Levels uses plain-number copies of Lead Time, Safety Stock,
   Case Size, MOQ, Target Cover (from Product) and Inbound Buffer (from
   Location). Production replaces these with lookups through the Product and
   Location links.
2. Products has no Total Available / Total On Order / Total Daily Sales
   rollups yet, and Purchase Orders has no PO Value rollup. Add these as
   rollup fields in the UI per `schema.md`.

Automations and AI cannot be created via the API, so they ship as
paste-ready recipes in `demo-automations.md`: Monday reorder digest,
instant low-stock alert (with `Alerted At` re-arm logic), velocity recalc
from Sales Daily, weekly KPI snapshot writer, and the AI layer (late-PO
chase drafts into `Chase Email Draft`, a "Why flagged" AI field, a Monday
ops summary, and a drafting-only agent instruction). The two support
fields those recipes write to already exist in the base.

The site's home page also carries an interactive replica of this demo
(site/components/DemoExplorer.js): reorder queue with click-to-expand
maths, stock overview, weekly trend. Its numbers mirror this base, keep
them in sync if you change the story rows.
