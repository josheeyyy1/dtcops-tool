# Airtable Base Template: Ops Backbone

One base per client, eight tables. Reorder logic lives on **Inventory
Levels** (SKU × location) because the wedge is multi-region: each warehouse
gets its own velocity, cover and reorder point. SKU totals roll up onto
**Products**.

Build order (links need targets to exist): **Suppliers → Locations →
Products → Inventory Levels → Purchase Orders → PO Lines → Sales Daily →
KPI Snapshots.**

CSV seeds in `csv/` import as text; convert types and add formulas from
the tables below after. ~60 minutes to build; see `deploy-checklist.md`.

---

## 1. Suppliers

| Field | Type | Notes |
|---|---|---|
| Supplier Name | Single line (primary) | |
| Contact Name | Single line | |
| Email | Email | |
| Currency | Single select: GBP, EUR, USD | |
| Payment Terms | Single line | |
| Default Lead Time Days | Number | Door to door, incl. freight + customs — not the factory quote |
| Default MOQ | Number | Overridable per product |
| Notes | Long text | |

## 2. Locations

| Field | Type | Notes |
|---|---|---|
| Location Name | Single line (primary) | e.g. "UK-3PL-Nameless" |
| Region | Single select: UK, EU, US, Other | |
| Type | Single select: 3PL, Own warehouse, FBA | |
| Provider | Single line | |
| Inbound Buffer Days | Number | Extra days for stock to land *in this warehouse* (customs, putaway, transfer) |
| Active | Checkbox | |

## 3. Products

| Field | Type | Notes |
|---|---|---|
| SKU | Single line (primary) | Must match Shopify SKU exactly — sync joins on it |
| Product Name | Single line | |
| Status | Single select: Active, New, Discontinued | Reorder logic ignores Discontinued |
| Supplier | Link → Suppliers | |
| Unit Cost | Currency | |
| Case Size | Number | Order quantities round up to this |
| MOQ | Number | Blank = supplier default |
| Lead Time Days | Number | Blank = supplier default |
| Safety Stock Days | Number | Start 14; volatile SKUs 21+ |
| Target Cover Days | Number | Start 60; long lead time = lead time + 30 |
| Shelf Life Months | Number | Drives expiry risk view |
| Total Available | Rollup: Inventory Levels → Available, SUM | |
| Total On Order | Rollup: Inventory Levels → On Order, SUM | |
| Total Daily Sales | Rollup: Inventory Levels → Avg Daily Sales 30d, SUM | |
| Days of Cover (global) | Formula | `IF({Total Daily Sales}>0, ROUND({Total Available}/{Total Daily Sales},0), BLANK())` |
| Stock Value | Formula | `{Total Available} * {Unit Cost}` |

## 4. Inventory Levels (the engine)

One row per active SKU per location — where reorder logic fires.

| Field | Type | Notes |
|---|---|---|
| Key | Formula (primary) | `{SKU (from Product)} & " @ " & {Location Name (from Location)}` |
| Product / Location | Link | |
| On Hand | Number | Written by inventory sync |
| Allocated | Number | Unfulfilled order units (0 if 3PL reports "available" directly) |
| Available | Formula | `{On Hand} - {Allocated}` |
| On Order | Number | Inbound to this location |
| Avg Daily Sales 30d | Number | Written weekly by the KPI workflow |
| Days of Cover | Formula | `IF({Avg Daily Sales 30d}>0, ROUND({Available}/{Avg Daily Sales 30d},0), 999)` |
| Effective Lead Time | Formula | `{Lead Time Days (from Product)} + {Inbound Buffer Days (from Location)}` * |
| Reorder Point | Formula | `ROUNDUP({Avg Daily Sales 30d}*({Effective Lead Time}+{Safety Stock Days (from Product)}),0)` |
| Low Stock | Formula | `AND({Available}+{On Order}<{Reorder Point}, {Avg Daily Sales 30d}>0, {Status (from Product)}!="Discontinued")` |
| Suggested Order Qty | Formula | see below |
| Last Synced | Date/time | Staleness watched by the alerts workflow |

\* Add lookup fields through both links first (`Lead Time Days (from
Product)` etc.), then reference them. Coalesce blanks to the supplier
default: `IF({Lead Time Days (from Product)}, {Lead Time Days (from
Product)}, {Default Lead Time Days (from Supplier)})`.

**Suggested Order Qty** — order up to target cover, respect MOQ and case
size, only when Low Stock:

```
IF({Low Stock},
  MAX(
    ROUNDUP(MAX({Avg Daily Sales 30d}*({Effective Lead Time}+{Target Cover Days (from Product)})
      - {Available} - {On Order}, 0) / MAX({Case Size (from Product)},1), 0) * MAX({Case Size (from Product)},1),
    {MOQ (from Product)}
  ), 0)
```

## 5. Purchase Orders

| Field | Type | Notes |
|---|---|---|
| PO Number | Single line (primary) | `PO-{YYYY}-{seq}` |
| Supplier / Destination | Link | One destination per PO — split stock = split POs, keeps On Order per location honest |
| Status | Single select: Draft, Placed, In Transit, Partially Received, Received, Cancelled | |
| Order Date / Expected Date / Received Date | Date | |
| Late | Formula | `AND(IS_BEFORE({Expected Date},TODAY()), {Status}!="Received", {Status}!="Cancelled", {Status}!="Draft")` |
| PO Value | Rollup: PO Lines → Line Value, SUM | |

## 6. PO Lines

| Field | Type | Notes |
|---|---|---|
| Line | Formula (primary) | `{PO Number (from PO)} & " / " & {SKU (from Product)}` |
| PO / Product | Link | |
| Qty Ordered / Qty Received | Number | |
| Unit Cost | Currency | Copy at order time — costs drift |
| Line Value | Formula | `{Qty Ordered} * {Unit Cost}` |
| Outstanding | Formula | `{Qty Ordered} - {Qty Received}` |

## 7. Sales Daily (recommended)

One row per SKU × region × day, written by the order-status workflow.
Feeds velocity and sell-through. Skip for huge SKU counts and compute
velocity directly from the Shopify API instead.

| Field | Type |
|---|---|
| Key (primary) | Formula: `DATETIME_FORMAT({Date},'YYYY-MM-DD') & " " & {SKU (from Product)} & " " & {Region}` |
| Date / Region | Date / Single select |
| Product | Link |
| Units Sold / Net Revenue | Number / Currency |

## 8. KPI Snapshots

One row per location per week plus a TOTAL row, written weekly.

| Field | Type |
|---|---|
| Snapshot (primary) | Formula: `DATETIME_FORMAT({Week Start},'YYYY-MM-DD') & " " & {Scope}` |
| Week Start | Date (Monday) |
| Scope | Location name or "TOTAL" |
| Stock Value / Units On Hand | Currency / Number |
| Median Days Cover (active SKUs) | Number |
| Sell-Through % | units sold ÷ (units sold + units on hand at week end) |
| Orders Shipped / % Shipped ≤48h | Number / Percent |
| Open POs / Late POs | Number |
| SKUs Low Stock | Number |
| Stock-Out Days (SKU-days at zero) | Number |

---

## Views to create

- Inventory Levels / **"Reorder queue"** — `Low Stock=TRUE`, grouped by
  Location, sorted by Days of Cover asc. *This view is the product* — the
  founder opens it Monday and knows what to buy.
- Inventory Levels / **"Stale syncs"** — Last Synced older than 24h.
- Purchase Orders / **"Late POs"** — `Late=TRUE`.
- Products / **"Expiry risk"** — Days of Cover > Shelf Life Months × 30 × 0.5.
- KPI Snapshots / **"Weekly trend"** — Scope=TOTAL, sorted by week.

## Per-client config

| Setting | Where | Starting point |
|---|---|---|
| SKUs, costs, case sizes, MOQs | Products CSV | Their sheet |
| Lead times | Suppliers/Products | Last 3 POs' actuals, not quotes |
| Safety Stock Days | Products | 14 (21+ if volatile) |
| Target Cover Days | Products | 60 (+30 for long lead times) |
| Locations + inbound buffers | Locations | UK 2d / EU 5d / US 7d to start |
| Regions in selects | Locations, Sales Daily | Match their warehouses |
| Currency | Base-wide | Their reporting currency |
