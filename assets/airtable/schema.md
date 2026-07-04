# Airtable Base Template: Ops Backbone

One base per client. Eight tables. Region-level reorder logic lives on
**Inventory Levels** (SKU × location), because the wedge is multi-region:
each warehouse gets its own velocity, cover and reorder point. SKU-level
totals live on **Products**.

Build order matters (links need targets to exist):
**Suppliers → Locations → Products → Inventory Levels → Purchase Orders →
PO Lines → Sales Daily → KPI Snapshots.**

CSV seeds are in `csv/` (headers + clearly-marked placeholder rows). CSV
import creates text fields only; convert types and add formulas from the
tables below. Full build is ~60 minutes; see `deploy-checklist.md`.

---

## 1. Suppliers

| Field | Type | Notes |
|---|---|---|
| Supplier Name | Single line (primary) | |
| Contact Name | Single line | |
| Email | Email | |
| Currency | Single select: GBP, EUR, USD | |
| Payment Terms | Single line | e.g. "30% deposit, 70% on shipping" |
| Default Lead Time Days | Number | **Door to door** incl. freight + customs, not factory quote |
| Default MOQ | Number | Overridable per product |
| Notes | Long text | |

## 2. Locations

| Field | Type | Notes |
|---|---|---|
| Location Name | Single line (primary) | e.g. "UK-3PL-Nameless" |
| Region | Single select: UK, EU, US, Other | |
| Type | Single select: 3PL, Own warehouse, FBA | |
| Provider | Single line | 3PL company name |
| Inbound Buffer Days | Number | Extra days for stock to land *in this warehouse* after arrival in region (customs, putaway, transfer) |
| Active | Checkbox | |

## 3. Products

| Field | Type | Notes |
|---|---|---|
| SKU | Single line (primary) | Must match Shopify SKU exactly: the sync joins on it |
| Product Name | Single line | |
| Status | Single select: Active, New, Discontinued | Reorder logic ignores Discontinued |
| Supplier | Link → Suppliers | |
| Unit Cost | Currency | Landed cost if known, else ex-works + note |
| Case Size | Number | Order quantities round up to this |
| MOQ | Number | Blank = use supplier default |
| Lead Time Days | Number | Blank = use supplier default |
| Safety Stock Days | Number | Start at 14; tune per SKU volatility |
| Target Cover Days | Number | Start at 60; higher for long lead times |
| Shelf Life Months | Number | Supplements: drives expiry risk view |
| Inventory Levels | Link → Inventory Levels | Auto-created by links |
| **Total Available** | Rollup: Inventory Levels → Available, SUM | |
| **Total On Order** | Rollup: Inventory Levels → On Order, SUM | |
| **Total Daily Sales** | Rollup: Inventory Levels → Avg Daily Sales 30d, SUM | |
| **Days of Cover (global)** | Formula | `IF({Total Daily Sales} > 0, ROUND({Total Available} / {Total Daily Sales}, 0), BLANK())` |
| **Stock Value** | Formula | `{Total Available} * {Unit Cost}` |

## 4. Inventory Levels (the engine)

One row per active SKU per location. This is where the reorder logic fires.

| Field | Type | Notes |
|---|---|---|
| Key | Formula (primary) | `{SKU (from Product)} & " @ " & {Location Name (from Location)}` |
| Product | Link → Products | |
| Location | Link → Locations | |
| On Hand | Number | Written by inventory sync |
| Allocated | Number | Unfulfilled order units, written by sync (0 if 3PL reports "available" directly) |
| **Available** | Formula | `{On Hand} - {Allocated}` |
| On Order | Number | Inbound to this location; updated by PO workflow or manually on PO placement |
| Avg Daily Sales 30d | Number | Written weekly by KPI workflow from Shopify orders shipped from this location's region |
| **Days of Cover** | Formula | `IF({Avg Daily Sales 30d} > 0, ROUND({Available} / {Avg Daily Sales 30d}, 0), 999)` |
| **Effective Lead Time** | Formula | product lead time (or supplier default) + location inbound buffer: `{Lead Time Days (from Product)} + {Inbound Buffer Days (from Location)}` * |
| **Reorder Point** | Formula | `ROUNDUP({Avg Daily Sales 30d} * ({Effective Lead Time} + {Safety Stock Days (from Product)}), 0)` |
| **Low Stock** | Formula | `AND({Available} + {On Order} < {Reorder Point}, {Avg Daily Sales 30d} > 0, {Status (from Product)} != "Discontinued")` |
| **Suggested Order Qty** | Formula | See below |
| Last Synced | Date/time | Written by sync; staleness alert watches this |

\* Airtable lookups through two links: add lookup fields (`Lead Time Days
(from Product)` etc.) first, then reference them in formulas. If product
lead time is blank, coalesce: `IF({Lead Time Days (from Product)},
{Lead Time Days (from Product)}, {Default Lead Time Days (from Supplier)})`.

**Suggested Order Qty** (order up to target cover, respect MOQ and case
size; only suggests when Low Stock is true):

```
IF({Low Stock},
  MAX(
    ROUNDUP(
      MAX(
        {Avg Daily Sales 30d} * ({Effective Lead Time} + {Target Cover Days (from Product)})
        - {Available} - {On Order},
        0
      ) / MAX({Case Size (from Product)}, 1), 0
    ) * MAX({Case Size (from Product)}, 1),
    {MOQ (from Product)}
  ),
  0)
```

## 5. Purchase Orders

| Field | Type | Notes |
|---|---|---|
| PO Number | Single line (primary) | Convention: `PO-{YYYY}-{seq}` |
| Supplier | Link → Suppliers | |
| Destination | Link → Locations | One destination per PO; split stock = split POs (this is deliberate: it keeps On Order per location honest) |
| Status | Single select: Draft, Placed, In Transit, Partially Received, Received, Cancelled | |
| Order Date | Date | |
| Expected Date | Date | |
| Received Date | Date | |
| **Late** | Formula | `AND(IS_BEFORE({Expected Date}, TODAY()), {Status} != "Received", {Status} != "Cancelled", {Status} != "Draft")` |
| **PO Value** | Rollup: PO Lines → Line Value, SUM | |

## 6. PO Lines

| Field | Type | Notes |
|---|---|---|
| Line | Formula (primary) | `{PO Number (from PO)} & " / " & {SKU (from Product)}` |
| PO | Link → Purchase Orders | |
| Product | Link → Products | |
| Qty Ordered | Number | |
| Qty Received | Number | |
| Unit Cost | Currency | Copy from product at order time (costs drift) |
| **Line Value** | Formula | `{Qty Ordered} * {Unit Cost}` |
| **Outstanding** | Formula | `{Qty Ordered} - {Qty Received}` |

## 7. Sales Daily (optional but recommended)

One row per SKU × region × day, written by the order-status workflow.
Feeds velocity and sell-through. If the client is huge on SKUs, skip this
table and have the weekly workflow compute velocity from the Shopify API
directly, writing only the result to Inventory Levels.

| Field | Type |
|---|---|
| Key (primary) | Formula: `DATETIME_FORMAT({Date},'YYYY-MM-DD') & " " & {SKU (from Product)} & " " & {Region}` |
| Date | Date |
| Product | Link → Products |
| Region | Single select: UK, EU, US, Other |
| Units Sold | Number |
| Net Revenue | Currency |

## 8. KPI Snapshots

One row per location per week plus one TOTAL row, written by the weekly
KPI roll-up workflow. This is what the dashboard trends on.

| Field | Type |
|---|---|
| Snapshot (primary) | Formula: `DATETIME_FORMAT({Week Start},'YYYY-MM-DD') & " " & {Scope}` |
| Week Start | Date (Monday) |
| Scope | Single line: location name or "TOTAL" |
| Stock Value | Currency |
| Units On Hand | Number |
| Median Days Cover (active SKUs) | Number |
| Sell-Through % | Percent — units sold ÷ (units sold + units on hand at week end) |
| Orders Shipped | Number |
| % Shipped ≤48h | Percent |
| Open POs | Number |
| Late POs | Number |
| SKUs Low Stock | Number |
| Stock-Out Days (SKU-days at zero) | Number |

---

## Views to create (these are the daily working surfaces)

- Inventory Levels / **"Reorder queue"**: filter `Low Stock = TRUE`, group by
  Location, sort by Days of Cover asc, show Suggested Order Qty. *This view
  is the product.* The founder opens it Monday morning and knows what to buy.
- Inventory Levels / **"Stale syncs"**: `Last Synced` older than 24h.
- Purchase Orders / **"Late POs"**: `Late = TRUE`.
- Products / **"Expiry risk"**: Days of Cover > Shelf Life Months × 30 × 0.5
  (holding more than half the shelf life in stock).
- KPI Snapshots / **"Weekly trend"**: Scope = TOTAL, sorted by week.

## Per-client config (what changes; nothing else should)

| Setting | Where | Typical starting point |
|---|---|---|
| SKUs, costs, case sizes, MOQs | Products CSV | From their sheet |
| Lead times | Suppliers/Products | From last 3 POs' actuals, not quotes |
| Safety Stock Days | Products | 14 (volatile SKUs 21+) |
| Target Cover Days | Products | 60 (long lead time: lead time + 30) |
| Locations + inbound buffers | Locations | Buffer: UK 2d, EU 5d, US 7d as defaults to tune |
| Regions in selects | Locations, Sales Daily | Match their warehouses |
| Currency fields | Base-wide | Their reporting currency |
