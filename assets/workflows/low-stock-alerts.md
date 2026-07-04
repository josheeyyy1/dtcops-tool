# Blueprint 2: Low-Stock Alerts

**Purpose:** nobody ever discovers a stock-out from a customer email again.
The base already computes `Low Stock` per SKU per location (schema.md); this
workflow makes it impossible to ignore.

## Trigger

Schedule: daily 07:30 client timezone (in the inbox before the workday, after
the overnight syncs). **Not** on-change: reorder decisions are daily
decisions; flapping alerts train people to ignore alerts.

## Flow (n8n nodes)

1. `CONFIG` (Set): base/table IDs, alert channel (Slack webhook or email),
   digest thresholds.
2. `Airtable: Search Inventory Levels` where `Low Stock = TRUE()`, plus
   fields: SKU, location, available, on order, days of cover, suggested qty.
3. `Airtable: Search Inventory Levels` where `Last Synced < NOW() - 24h`
   (stale-sync check rides along in this workflow).
4. `Code: build digest`, grouped by location, sorted by Days of Cover asc:

   ```
   LOW STOCK: {client} — {date}
   UK-3PL (3 SKUs)
   • SKU-001 Magnesium 90ct: 6 days cover, 240 available, 0 on order → order 1,500 (PO to SupplierCo, ~45d lead)
   • ...
   US-3PL (1 SKU)
   • ...
   ⚠ 2 SKUs not synced in 24h+: SKU-014, SKU-022
   Open the reorder queue: {Airtable view URL}
   ```

   One message, one place, one link. Urgency tiers: Days of Cover below
   Effective Lead Time = prefix 🔴 (stock-out already unavoidable without
   air freight: say so plainly).
5. `Branch`: no low-stock rows and no stale rows → send nothing. Silence
   means healthy. (Weekly KPI roll-up reports "0 low stock" so the client
   still sees the system working.)
6. `Send`: Slack incoming webhook (default) or email via client SMTP.

## Escalation rule

Any SKU appearing in the digest [[CONFIG: 5]] consecutive days with On Order
still 0 gets a separate direct message to the founder: the system is being
ignored, which is a client-management fact you want surfaced early, in
writing.

## Per-client config

| Item | Where |
|---|---|
| Channel (Slack webhook / email to) | CONFIG node |
| Send time + timezone | Schedule node |
| Escalation threshold days | CONFIG node (default 5) |
| Red-tier rule | CONFIG node (default: cover < effective lead time) |

## Test procedure

1. Set one SKU's Safety Stock Days absurdly high to force a flag; run;
   confirm digest format, link works, correct grouping. Reset.
2. Backdate one Last Synced by 2 days; confirm the stale warning appears.
3. Confirm the no-news path: zero flags → zero messages sent.
