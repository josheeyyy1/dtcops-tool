# Audit Scoring Sheet

Eight dimensions, scored 0–3 from the scoping call plus the data review.
`scoring-sheet.csv` is the working copy — one row per dimension per client.

## Scale

- **0 Absent** — no process, runs on memory or luck.
- **1 Manual** — exists but lives in heads/spreadsheets, breaks when someone's away.
- **2 Systematised** — written down or tooled, consistent, but needs manual pushing.
- **3 Automated** — runs without a human trigger, covers all regions.

Half points allowed. Score what you saw, not what they aspire to.

## Dimensions

| # | Dimension | Weight | 3 looks like | 0 looks like |
|---|---|---|---|---|
| D1 | Stock visibility | 20% | One trusted system, all locations, current | Nobody can say what's where |
| D2 | Reorder discipline | 20% | Reorder points fire automatically per SKU | Gut feel, empty-shelf triggers |
| D3 | Demand awareness | 10% | Velocity per SKU/region tracked and used | Sales never meets stock decisions |
| D4 | Multi-region balance | 15% | Deliberate allocation, rebalances on trigger | One region stocks out, another over-holds |
| D5 | Fulfilment accountability | 10% | 3PL SLA/accuracy measured vs contract | Judged only by absence of complaints |
| D6 | Data hygiene | 10% | Clean SKU master, one source wins, lead times current | Conflicting numbers, stale lead times |
| D7 | Manual workload | 10% | Near-zero routine copying | Hours/week of copy-paste |
| D8 | Cash in stock | 5% | Stock value, cover and expiry risk known | Cash position in stock unknown |

Weighted total = Σ (score/3 × weight), as a percentage.

## Bands

| Total | Band | Meaning |
|---|---|---|
| 0–35% | Critical | Flying blind; stock-outs and over-ordering are structural. |
| 36–55% | Fragile | Works because specific people push it. One holiday breaks it. |
| 56–75% | Functional | Basics hold; money leaks at the edges. |
| 76–100% | Strong | Tuning, not rebuilding — rare at this size. |

## Fix list (any dimension scoring ≤1)

| Low | Fix | Impact | Effort |
|---|---|---|---|
| D1 | Single source of truth, all locations synced | High — everything else depends on it | Medium |
| D2 | Reorder points per SKU: velocity × lead time + safety stock | High — kills stock-outs and over-orders | Medium |
| D3 | Velocity tracking per SKU/region, 30/60/90-day | Medium — feeds D2 | Low |
| D4 | Allocation rules + rebalance triggers | High for 2+ regions — usually the biggest leak | Medium |
| D5 | 3PL scorecard vs contract | Medium | Low |
| D6 | SKU master cleanup, lead-time refresh | Medium — unblocks everything else | Low |
| D7 | Sync jobs + alerts replace manual copying | High — hours back immediately | Medium |
| D8 | Stock-value + expiry dashboard | Medium | Low |

Rank the final list by Impact ÷ Effort, using the client's own numbers. Top
3 become the report's "do these first."

## Costing the pain

Three numbers from their data, kept conservative:

1. **Stock-out cost** — units missed × price × weeks out, top SKUs, last 2
   quarters. Add churn for subscription products: a lost subscriber is LTV
   gone, not one order.
2. **Manual hours** — hrs/week × loaded hourly cost × 52.
3. **Over-held cash** — stock value above target cover days, plus any
   expiry write-offs in the last year.

The build quote should be visibly smaller than their annual leak, or don't
propose it.
