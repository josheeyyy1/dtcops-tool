# Blueprint 4: Weekly KPI Roll-Up

**Purpose:** every Monday 07:00, one message with the five numbers that
matter, plus a week of history in KPI Snapshots. Also the weekly heartbeat
proving the system's alive — the retainer's public face.

## Trigger

Mondays 06:30 client timezone (message lands 07:00), covering Mon–Sun prior
week.

## Flow (n8n)

1. `CONFIG`: base/table IDs, channel, reporting currency.
2. **Refresh velocity:** read Sales Daily last 30 days, compute avg
   units/day per SKU per region, batch-update `Avg Daily Sales 30d` on
   Inventory Levels (weekly on purpose — see blueprint 3).
3. **Read state:** Inventory Levels, Purchase Orders (open + late),
   Fulfilment Daily (last 7 days), Products (unit costs).
4. **Compute per location + TOTAL:** stock value (Σ available × cost),
   units on hand, median days cover (active SKUs with sales), sell-through
   % (week units sold ÷ (sold + on hand)), orders shipped + % ≤48h, open/late
   POs, SKUs low stock, stock-out days (Σ SKU-days at zero — the daily
   alerts workflow appends zero/negative rows to a small `Stockout Log`
   table; cheap, and it's the number the engagement gets judged on).
5. Upsert KPI Snapshots (one row per location + TOTAL) on week+scope.
6. Build the Monday message with deltas vs the previous snapshot:

   ```
   {CLIENT} WEEK {date range}
   Stock value £X (Δ vs last week)
   Median cover: N days | Low-stock SKUs: N | Stock-out days: N
   Fulfilment: N orders, X% ≤48h (UK X% / EU X% / US X%)
   POs: N open, N late ({PO numbers})
   Watch: {top 3 SKUs by lowest cover, suggested action}
   Dashboard: {Airtable interface URL}
   ```

   Plain numbers, no commentary — interpretation happens on the monthly
   call.
7. Send to channel.

## Per-client config

Channel, send time, reporting currency, active-SKU exclusion list (shared
with blueprint 3) — all in CONFIG.

## Test before handover

1. Run mid-week against last full week; hand-check Stock Value and Median
   Cover for one location.
2. Confirm re-run upserts, no duplicate snapshot rows.
3. Break a table ID in CONFIG; confirm the error workflow fires loudly.
