# Blueprint 4: Weekly KPI Roll-Up

**Purpose:** every Monday 07:00 the founder gets one message with the five
numbers that matter, and KPI Snapshots gains a week of history. This workflow
is also the weekly heartbeat proving the whole system is alive: it's the
retainer's public face.

## Trigger

Schedule: Mondays 06:30 client timezone (message lands 07:00 after compute).
Covers Mon–Sun prior week.

## Flow (n8n nodes)

1. `CONFIG` (Set): base/table IDs, channel, reporting currency.
2. **Refresh velocity:** `Airtable: read Sales Daily` last 30 days →
   `Code: per SKU per region, avg units/day` → batch-update
   `Avg Daily Sales 30d` on Inventory Levels. (Weekly on purpose: stable
   reorder points. See blueprint 3.)
3. **Read state:** Inventory Levels (all), Purchase Orders (open + late),
   Fulfilment Daily (last 7 days), Products (unit costs).
4. `Code: compute per location + TOTAL`:
   - Stock Value = Σ available × unit cost
   - Units On Hand
   - Median Days Cover across active SKUs with sales > 0
   - Sell-Through % = week units sold ÷ (week units sold + units on hand)
   - Orders Shipped, % ≤48h (from Fulfilment Daily)
   - Open POs, Late POs
   - SKUs Low Stock (count of flags)
   - Stock-Out Days = Σ SKU-days where available ≤ 0 during the week
     (needs a tiny daily snapshot of flags: the daily alerts workflow
     appends `{date, SKU, location, available}` for zero/negative rows to a
     `Stockout Log` table; cheap and worth it: this is the number the whole
     engagement gets judged on)
5. `Airtable: create KPI Snapshots rows` (one per location + TOTAL),
   upsert on week+scope.
6. `Code: build the Monday message`:

   ```
   {CLIENT} WEEK {date range}
   Stock value £X (Δ vs last week)
   Median cover: N days | Low-stock SKUs: N | Stock-out days: N
   Fulfilment: N orders, X% ≤48h (UK X% / EU X% / US X%)
   POs: N open, N late ({PO numbers})
   Watch: {top 3 SKUs by lowest cover, with suggested action}
   Dashboard: {Airtable interface URL}
   ```

   Deltas vs previous snapshot row. Plain numbers, no commentary: the
   monthly retainer call is where interpretation happens.
7. `Send` to channel.

## Per-client config

| Item | Where |
|---|---|
| Channel + send time | CONFIG/Schedule nodes |
| Reporting currency | CONFIG node |
| Active-SKU definition (exclusions) | CONFIG node, same list as blueprint 3 |

## Test procedure

1. Run manually mid-week against last full week; hand-check Stock Value and
   Median Cover for one location against the base.
2. Confirm re-run upserts (no duplicate snapshot rows).
3. Break one table ID in CONFIG; confirm the error workflow fires loudly.
