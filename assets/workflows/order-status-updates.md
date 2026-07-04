# Blueprint 3: Order Status → Sales Daily + Fulfilment Tracking

**Purpose:** two jobs, one workflow — (a) daily sales per SKU per region
into Sales Daily so velocity is real, (b) dispatch-time tracking so the
fulfilment SLA number is measured, not vibes.

## Trigger

Daily 02:00 client timezone, processing the previous day. Daily batch beats
webhooks here: no missed-webhook drift, one day's data arrives whole after
edits/refunds settle.

## Flow (n8n)

1. `CONFIG`: base/table IDs, region map (`location or country → region`),
   SLA threshold hours.
2. Get yesterday's orders (any status), line items, fulfillments, shipping
   address, cancelled/refund flags — paginate fully.
3. Aggregate per line item: resolve region (fulfilment location if set,
   else ship-to country), exclude cancelled/fully refunded, output
   `{date, SKU, region, units, net_revenue}`.
4. Upsert Sales Daily keyed `date+SKU+region` (re-running a day overwrites,
   never duplicates).
5. Fulfilment latency: for orders fulfilled yesterday, `fulfilled_at -
   created_at` in hours per location — orders shipped, median hours, %
   ≤ SLA threshold.
6. Write to a `Fulfilment Daily` table (Date, Location, Orders Shipped,
   Median Hours, % ≤48h) — add it to the base if the client tracks SLA
   (multi-3PL clients always do; the weekly roll-up consumes it).
7. Refresh `Avg Daily Sales 30d` **weekly, not daily** (blueprint 4) — a
   30-day window updated weekly is stable enough to trust for reorder
   points; daily would make them wobble with every spike.

## Edge cases

| Case | Policy |
|---|---|
| No SKU match in Products | Count in `_UNMAPPED` bucket per region, alert daily |
| Multi-location split fulfilment | Attribute each line to its fulfilment location |
| Refund after settling window | Sales Daily written once at D+1; later refunds are noise at this granularity — a stated limit |
| Pre-orders/drops | Exclude tagged SKUs (CONFIG list) — they poison velocity |

## Per-client config

Region map, SLA threshold (default 48h), pre-order exclusion tags — all in
CONFIG. Refund settling window fixed at D+1, documented.

## Test before handover

1. Run against yesterday; spot-check 3 SKUs against Shopify's own analytics.
2. Re-run the same day twice; confirm row counts don't grow.
3. Ship a test order to an unmapped country; confirm `_UNMAPPED` alert.
