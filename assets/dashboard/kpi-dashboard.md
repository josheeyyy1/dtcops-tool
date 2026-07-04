# KPI Dashboard Template (Airtable Interface)

Built as an Airtable Interface on the client's base: no extra tool, no extra
login, no BI licence. The founder gets one URL. Rebuild time per client:
~45 minutes once the base is live, because every number below already exists
as a field or view from `../airtable/schema.md`.

## The five numbers (definitions locked here so every client means the same thing)

| KPI | Definition | Source | Healthy looks like |
|---|---|---|---|
| **Stock cover** | Median days of cover across active SKUs with sales, per region | Inventory Levels → Days of Cover | Between safety-stock days and target cover; not 999s, not single digits |
| **Sell-through** | Week units sold ÷ (week units sold + units on hand at week end) | KPI Snapshots | Steady; a fall with flat sales = over-buying |
| **Fulfilment SLA** | % orders dispatched ≤48h of order, per location | Fulfilment Daily → KPI Snapshots | ≥95%; per-3PL split visible |
| **Reorder status** | SKUs flagged low ÷ POs open ÷ POs late | Low Stock flags + PO Late formula | Flags have matching POs; zero late POs |
| **Cash in stock** | Σ available × unit cost, per region + total, with trend | Products/Inventory rollups → KPI Snapshots | Flat-to-proportional with revenue; spikes are deliberate |

Supporting number for supplement clients: **expiry exposure** = stock value
in SKUs where cover exceeds half the shelf life (Products "Expiry risk" view).

## Interface layout (four pages)

### Page 1: This Week (the founder page)
Top row, big numbers with week-on-week deltas from KPI Snapshots:
Stock value / Median cover / Low-stock SKUs / % ≤48h / Late POs.
Below: the **Reorder queue** view embedded (Low Stock = TRUE, grouped by
location, Suggested Order Qty visible). This page answers "what do I buy
this week" without a meeting.

### Page 2: Regions
Per-location cards: cover, stock value, SLA %, low-stock count. Side by
side, so imbalance (US starving while EU hoards) is visible at a glance:
this is the multi-region page that justifies the whole build.

### Page 3: Purchasing
Open POs grouped by supplier with Late flag; PO value totals; below it the
Stockout Log last 30 days: what actually ran out, when, where.

### Page 4: Trend
Line charts from KPI Snapshots (Scope = TOTAL): stock value, median cover,
sell-through, SLA %, stock-out days per week. This is the before/after
evidence that renews the retainer: screenshot it at month 0 and month 3.

## Per-client config

| Item | Change |
|---|---|
| Regions/locations on Page 2 | Match their Locations table |
| SLA threshold (48h default) | Match their 3PL contract; note contractual vs aspirational |
| Currency formatting | Base currency |
| Expiry exposure card | Only for shelf-life products (all supplement clients) |

## Handover rule

The dashboard belongs in *their* Monday routine, not yours. At handover, the
ops person drives Page 1 while you watch. If they can't run the Monday
meeting from it unaided, the handover isn't done.
