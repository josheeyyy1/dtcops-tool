# Blueprint 2: Low-Stock Alerts

**Purpose:** nobody discovers a stock-out from a customer email again. The
base already computes `Low Stock` per SKU per location; this makes it
impossible to ignore.

## Trigger

Daily 07:30 client timezone — in the inbox before the workday. Not
on-change: reorder decisions are daily decisions, and flapping alerts train
people to ignore alerts.

## Flow (n8n)

1. `CONFIG`: base/table IDs, alert channel, digest thresholds.
2. Search Inventory Levels where `Low Stock=TRUE`, with SKU, location,
   available, on order, days of cover, suggested qty.
3. Search Inventory Levels where `Last Synced < NOW()-24h` (stale check
   rides along here).
4. Build the digest, grouped by location, sorted by Days of Cover asc:

   ```
   LOW STOCK: {client} — {date}
   UK-3PL (3 SKUs)
   • SKU-001 Magnesium 90ct: 6 days cover, 240 available, 0 on order → order 1,500 (SupplierCo, ~45d lead)
   ⚠ 2 SKUs not synced in 24h+: SKU-014, SKU-022
   Open the reorder queue: {Airtable view URL}
   ```

   Prefix 🔴 when cover is below effective lead time — a stock-out already
   unavoidable without air freight, and worth saying plainly.
5. No low-stock rows and no stale rows → send nothing. Silence means
   healthy (the weekly roll-up reports "0 low stock" so the system's still
   visibly alive).
6. Send via Slack webhook (default) or email.

## Escalation

Any SKU appearing 5 consecutive days with On Order still 0 → a direct
message to the founder. The system's being ignored, which is worth
surfacing early, in writing.

## Per-client config

Channel, send time, escalation threshold (default 5 days), and red-tier
rule (default: cover < effective lead time) — all in CONFIG/Schedule nodes.

## Test before handover

1. Force one SKU to flag; confirm digest format, grouping, link.
2. Backdate a Last Synced by 2 days; confirm the stale warning.
3. Confirm zero flags → zero messages.
