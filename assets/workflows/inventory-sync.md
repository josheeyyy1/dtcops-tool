# Blueprint 1: Inventory Sync

**Purpose:** Airtable Inventory Levels reflects reality in every warehouse,
hourly. The single-source-of-truth promise, made physical.

**Sources, in priority order:** (1) Shopify inventory levels, if the 3PL
writes stock back to Shopify locations — preferred, one connector covers
all regions. (2) 3PL API directly, if a location isn't in Shopify. (3) 3PL
email/SFTP report, worst case. Establish which is true during the audit
(Q7/Q10), not on deploy day.

## Trigger

Hourly at :10 (offset avoids clashing with the 3PL's own on-the-hour jobs),
plus a manual trigger for on-demand resync.

## Flow (n8n)

1. `CONFIG`: base/table IDs, Shopify domain, location map
   `{shopify_location_id → Airtable Location record}`.
2. Get Inventory Levels per location (paginate fully).
3. Get Products (cached daily) — map `inventory_item_id → SKU`.
4. Reshape to `{SKU, location_record_id, on_hand, available}`.
5. Search Inventory Levels by SKU@Location key, chunked.
6. Match found → update On Hand/Allocated/Last Synced. No match → **create
   the row** (new SKU or location), tag `auto-created` for review.
7. Anomaly check: any SKU moving >30% in one hour, or going negative, or an
   all-zeros payload → abort the run and alert instead of writing over good
   data.
8. Batch update, 10-row chunks, 250ms wait.

## SKU mismatch policy

Join key is the SKU string. Any Shopify SKU with no Products row: alert
once per day (not per run), listing offenders. Dirty SKU masters surface in
week one — this alert is the broom.

## Failure modes

| Failure | Handling |
|---|---|
| Shopify 429 | Retry ×3 exponential backoff, then error workflow |
| Airtable 422 (schema drift) | Error workflow, loud |
| 3PL returns all zeros | Anomaly check aborts + alerts, no writes |
| Last Synced goes stale | Watched by low-stock-alerts (blueprint 2) |

## Per-client config

Store domain/creds in `{client}-shopify`; location map, anomaly threshold
(default 30%), and sync frequency (default hourly, 15-min at launch) in
CONFIG.

## Test before handover

1. Change a quantity in a dev location; confirm Airtable updates.
2. Add a Shopify SKU not in Airtable; confirm mismatch alert, not a crash.
3. Feed an all-zeros payload; confirm abort + alert, no writes.
