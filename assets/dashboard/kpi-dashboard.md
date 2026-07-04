# KPI Dashboard Template (Airtable Interface)

Built as an Airtable Interface on the client's base — no extra tool, no
extra login. ~45 minutes per client once the base is live, since every
number already exists as a field or view from `../airtable/schema.md`.

## The five numbers (locked here so every client means the same thing)

| KPI | Definition | Source | Healthy |
|---|---|---|---|
| Stock cover | Median days of cover, active SKUs with sales, per region | Inventory Levels | Between safety-stock and target cover days |
| Sell-through | Week units sold ÷ (sold + on hand at week end) | KPI Snapshots | Steady; a fall with flat sales = over-buying |
| Fulfilment SLA | % dispatched ≤48h, per location | Fulfilment Daily → KPI Snapshots | ≥95%, per-3PL split visible |
| Reorder status | Flags vs open POs vs late POs | Low Stock flags + PO Late formula | Flags have matching POs, zero late |
| Cash in stock | Σ available × unit cost, by region + total, with trend | Products/Inventory rollups | Flat-to-proportional with revenue |

Supplement clients also get **expiry exposure**: stock value in SKUs where
cover exceeds half the shelf life (Products "Expiry risk" view).

## Layout (four pages)

**1. This Week** — big numbers with week-on-week deltas (stock value,
median cover, low-stock SKUs, % ≤48h, late POs), with the "Reorder queue"
view embedded below. Answers "what do I buy this week" without a meeting.

**2. Regions** — per-location cards side by side, so imbalance (US
starving, EU hoarding) is visible at a glance. The page that justifies the
build.

**3. Purchasing** — open POs by supplier with Late flag, PO value totals,
Stockout Log last 30 days.

**4. Trend** — line charts from KPI Snapshots (Scope=TOTAL): stock value,
median cover, sell-through, SLA %, stock-out days per week. The
before/after evidence that renews the retainer.

## Per-client config

Regions on page 2, SLA threshold (match their 3PL contract), currency
formatting, expiry card (shelf-life products only).

## Handover rule

The ops person drives page 1 while you watch at handover. If they can't run
the Monday meeting from it unaided, the handover isn't done.
