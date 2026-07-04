# Blueprint 1: Inventory Sync

**Purpose:** Airtable Inventory Levels reflects reality in every warehouse,
hourly. This is the single-source-of-truth promise made physical.

**Sources, in priority order:**
1. **Shopify inventory levels** (if the 3PL writes stock back to Shopify
   locations, which most do): one connector covers all regions. Preferred.
2. **3PL API directly** (if Shopify stock is unreliable or a location isn't
   in Shopify): per-3PL HTTP node.
3. **3PL email/SFTP report** (worst case): scheduled fetch + parse. Works,
   ugly, quote extra build time.

Establish which one is true during the audit (Q7/Q10 evidence), not on
deploy day.

## Trigger

Schedule: hourly at :10 (offset avoids clashing with 3PL's own on-the-hour
jobs). Plus a manual trigger for on-demand resync.

## Flow (n8n nodes)

1. `CONFIG` (Set): Airtable base/table IDs, Shopify store domain,
   location map `{shopify_location_id → airtable Location record ID}`.
2. `Shopify: Get Inventory Levels` — REST `inventory_levels.json` per
   location (Make: Shopify "List Inventory Levels"). Paginate fully.
3. `Shopify: Get Products` (cached daily, not hourly) — map
   `inventory_item_id → SKU`.
4. `Join + reshape` (Code node): produce rows
   `{SKU, location_record_id, on_hand, available}`.
5. `Airtable: Search Inventory Levels` by SKU@Location key, chunked.
6. `Branch`: match found → update On Hand / Allocated / Last Synced;
   no match → **create the row** (new SKU or new location) and tag it
   `auto-created` so a human reviews its product links.
7. `Discrepancy check` (Code node): if any SKU's on-hand moved by more than
   [[CONFIG: 30%]] in one hour, or went negative, flag it: don't silently
   accept warehouse glitches. Send to alerts channel as "sync anomaly".
8. `Airtable: batch update`, 10-row chunks, 250ms wait between.

## SKU mismatch policy

The join key is the SKU string. On any Shopify SKU with no Products row:
alert once per day per SKU (not per run), listing offenders. Dirty SKU
masters are found in week one; this alert is the broom.

## Failure modes and handling

| Failure | Handling |
|---|---|
| Shopify 429 | Retry ×3, exponential backoff, then error workflow |
| Airtable 422 (schema drift) | Error workflow, loud: someone renamed a field |
| 3PL returns zero for everything | Anomaly check catches it; do NOT write zeros over good data when the whole payload is zeros: abort the run and alert |
| Last Synced goes stale | Watched by low-stock-alerts workflow (blueprint 2), which alerts if any row is >24h old |

## Per-client config

| Item | Where |
|---|---|
| Store domain, API creds | n8n credentials `{client}-shopify` |
| Location map | CONFIG node |
| Anomaly threshold % | CONFIG node (default 30%) |
| Sync frequency | Schedule node (default hourly; 15-min for launch weeks) |

## Test procedure (do before handover)

1. Manually change a quantity in Shopify sandbox/dev location; run; confirm
   Airtable updates and Last Synced advances.
2. Add a fake Shopify SKU not in Airtable; confirm mismatch alert, not crash.
3. Feed an all-zeros payload (mock node); confirm abort + alert, no writes.
