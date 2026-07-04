# Blueprint 3: Order Status → Sales Daily + Fulfilment Tracking

**Purpose:** two jobs in one workflow: (a) write daily sales per SKU per
region into Sales Daily so velocity is real, (b) track dispatch times so the
fulfilment SLA number on the dashboard is measured, not vibes.

## Trigger

Schedule: daily 02:00 client timezone, processing the previous day. Daily
batch beats webhooks here: no missed-webhook drift, one day's data arrives
whole, and Shopify order edits/refunds from the day are settled. (Add the
webhook variant later only if a client genuinely needs intraday numbers.)

## Flow (n8n nodes)

1. `CONFIG` (Set): base/table IDs, region map
   `{shopify_location_id or country_code → region}`, SLA threshold hours.
2. `Shopify: Get Orders` — `created_at` within yesterday, status any,
   fields: line items, fulfillments, shipping address, cancelled/refund
   flags. Paginate fully.
3. `Code: sales aggregation` — per line item: resolve region (fulfilment
   location if assigned, else ship-to country → region map). Exclude
   cancelled orders and fully refunded lines. Output
   `{date, SKU, region, units, net_revenue}` aggregated.
4. `Airtable: upsert Sales Daily` keyed `date+SKU+region` (idempotent:
   re-running a day overwrites, never duplicates).
5. `Code: fulfilment latency` — for orders *fulfilled* yesterday:
   `fulfilled_at - created_at` in hours, per fulfilment location. Output
   per-location: orders shipped, median hours, % ≤ SLA threshold.
6. `Airtable: append to a scratch table or hold in n8n static data` — the
   weekly KPI roll-up (blueprint 4) consumes these dailies into KPI
   Snapshots. Simplest robust option: a small `Fulfilment Daily` table
   (Date, Location, Orders Shipped, Median Hours, % ≤48h): add it to the
   base if the client cares about SLA (multi-3PL clients always do).
7. Also refresh `Avg Daily Sales 30d` on Inventory Levels **weekly, not
   daily** (blueprint 4 does it): reorder points shouldn't wobble with every
   spike; a 30-day window updated weekly is stable enough to trust.

## Edge cases

| Case | Policy |
|---|---|
| Order with no SKU match in Products | Count it in a `_UNMAPPED` bucket per region; alert lists offenders daily (same broom as sync) |
| Multi-location split fulfilment | Attribute each line to its fulfilment location |
| Refund after N days | Sales Daily is written once at D+1; refunds later than that are noise at reorder-decision granularity. Noted as a stated limit in the audit/handover. |
| Pre-orders / drops | Exclude tagged pre-order products from velocity (CONFIG list): they poison reorder maths |

## Per-client config

| Item | Where |
|---|---|
| Region map | CONFIG node |
| SLA threshold (default 48h) | CONFIG node |
| Pre-order/exclusion SKU tags | CONFIG node |
| Refund settling window | Fixed at D+1, documented |

## Test procedure

1. Run against yesterday; sum units per SKU; spot-check 3 SKUs against the
   Shopify admin's own analytics for the same day.
2. Re-run the same day twice; confirm row counts don't grow.
3. Place a test order shipped to an unmapped country; confirm `_UNMAPPED`
   alert.
