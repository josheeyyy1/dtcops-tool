# Audit Scoring Sheet

Eight dimensions, each scored 0–3 against the anchors below. Evidence comes
from the scoping call (see `scoping-call-questions.md`) plus the data review.
`scoring-sheet.csv` is the working copy: fill it per client (import into
Google Sheets or Airtable, one row per dimension).

## Scale

- **0 — Absent:** No process. Runs on memory, luck, or one person's heroics.
- **1 — Manual:** A process exists but lives in heads/spreadsheets, breaks
  when someone's away, and is applied inconsistently.
- **2 — Systematised:** Written down or tooled, applied consistently, but
  needs manual pushing or doesn't cover all regions/SKUs.
- **3 — Automated:** Runs without a human trigger, covers all regions,
  exceptions surface themselves.

Half points are allowed. Score what you saw, not what they aspire to.

## Dimensions and weights

| # | Dimension | Weight | What 3 looks like | What 0 looks like |
|---|---|---|---|---|
| D1 | Stock visibility | 20% | One system of record, all locations, trusted, current | Nobody can say what's where without checking 3 places |
| D2 | Reorder discipline | 20% | Per-SKU reorder points from velocity + lead time + safety stock, fired automatically | Reorders on gut feel or when the shelf looks empty |
| D3 | Demand awareness | 10% | Velocity per SKU per region tracked and used; seasonality known | Sales data never meets stock decisions |
| D4 | Multi-region balance | 15% | Deliberate allocation rules; imbalance triggers rebalancing | One region stocks out while another over-holds, routinely |
| D5 | Fulfilment accountability | 10% | 3PL SLA and accuracy measured against contract, reviewed | 3PL judged by absence of complaints |
| D6 | Data hygiene | 10% | Clean SKU master, one source wins conflicts, lead times current | Conflicting numbers, stale lead times, duplicate SKUs |
| D7 | Manual workload | 10% | Near-zero routine copying; humans handle exceptions only | Hours/week of copy-paste; founder reconciles at night |
| D8 | Cash in stock | 5% | Stock value, cover and expiry risk known and managed | Cash position in stock unknown; expired stock written off before |

Weighted total = Σ (score/3 × weight) → a percentage.

## Bands

| Total | Band | Meaning (use these words in the report) |
|---|---|---|
| 0–35% | **Critical** | The business is flying blind. Stock-outs and over-ordering are structural, not bad luck. |
| 36–55% | **Fragile** | Works because specific people push it. One holiday, one growth spurt, or one new region breaks it. |
| 56–75% | **Functional** | The basics hold. Money is leaking at the edges: regional imbalance, manual hours, slow reactions. |
| 76–100% | **Strong** | Tuning, not rebuilding. (Rare at this size. If you score this honestly, say so and recommend the retainer only.) |

## Score → fix-list mapping

For every dimension at 0 or 1, the fix below goes on the list. Rank the final
list by **Impact ÷ Effort** (both 1–5, from the client's own numbers: missed
revenue, hours × loaded cost, cash over-held). Top 3 become the report's
"Do these first".

| Dimension low | Prescribed fix | Typical impact | Effort |
|---|---|---|---|
| D1 | Single source of truth: Airtable base, all locations synced | High: every other fix depends on it | Medium |
| D2 | Reorder points per SKU: velocity × lead time + safety stock, low-stock flags | High: directly kills stock-outs and over-orders | Medium |
| D3 | Velocity tracking per SKU/region from Shopify, 30/60/90-day | Medium: feeds D2, exposes seasonality | Low |
| D4 | Allocation rules + rebalance triggers across warehouses | High for 2+ regions: usually the biggest hidden leak | Medium |
| D5 | 3PL scorecard: dispatch SLA, error rate, stock accuracy vs contract | Medium: turns a vendor relationship into data | Low |
| D6 | SKU master cleanup, lead-time refresh, conflict rules | Medium: unblocks everything else, boring but load-bearing | Low |
| D7 | Automate the copying: sync jobs + alerts replace the human ferrying | High: hours back immediately, error rate drops | Medium |
| D8 | Stock-value and expiry dashboard: cash tied, cover days, expiry horizon | Medium: finance finally sees ops | Low |

## Costing the pain (do this before writing the report)

Three numbers, from their own data, conservative:

1. **Stock-out cost:** units missed × price × weeks out, on top SKUs, last 2
   quarters. For repeat-purchase products add churn: a subscriber lost to a
   stock-out is LTV gone, not one order. State assumptions in the report.
2. **Manual hours:** hrs/week (from Q8) × loaded hourly cost × 52.
3. **Over-held cash:** stock value above target cover days, per region, plus
   any expiry write-offs in the last year.

The fix list is ranked against these. The build quote should be visibly
smaller than their annual leak, or don't propose it.
