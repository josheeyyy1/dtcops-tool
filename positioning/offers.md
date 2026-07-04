# The Three Offers

Ladder: audit → build → retainer. Each one de-risks the next. The audit is
priced to be an easy yes and its report is the sales document for the build.

All prices are placeholders. **DECISION for Joshua: set final prices.**
My recommended numbers and reasoning are at the bottom.

---

## Offer 1: The Stock Audit

**What it is:** A fixed-scope, two-week diagnostic of how stock moves through
the business: from supplier PO to customer door, across every warehouse.

**Who it's for:** The founder who knows something is wrong (stock-outs,
over-ordering, spreadsheet reconciliation) but can't see exactly where the
money and hours are leaking.

**What's in:**
- 60-minute scoping call (structured, recorded, using the audit question set)
- Read-only review of their actual data: Shopify, 3PL portals or reports,
  current spreadsheets, reorder history for the last 2 quarters
- Scored assessment across 8 operational dimensions
- Written audit report: findings, a prioritised fix list ranked by impact vs
  effort, and a costed view of what the problems are worth (stock-out revenue
  missed, hours burned, cash over-tied in stock)
- 60-minute walkthrough call of the report

**What's out:** No implementation. No tool changes. No credentials with write
access. This is diagnosis, not surgery.

**Timeline:** 2 weeks from scoping call to walkthrough.

**Deliverable:** The audit report (see `audit/audit-report-template.md`) and
the prioritised fix list. Theirs to keep and act on with or without me.

**Price:** [[PRICE-AUDIT]], fully credited against the build if they proceed
within 30 days.

---

## Offer 2: The Ops Stack Build

**What it is:** A fixed-scope implementation of the operations backbone:
the same system I built in-house, deployed for them.

**What's in:**
- Airtable base as single source of truth: products, suppliers, POs,
  inventory by location, orders, reorder rules (from `assets/airtable/`)
- Inventory sync from Shopify and their 3PL(s) into the base
- Reorder-point logic per SKU per region: velocity, lead time, safety stock,
  low-stock flags, suggested order quantities respecting MOQ and case size
- Automated alerts: low stock, late PO, fulfilment SLA breach
- KPI dashboard: stock cover, sell-through, fulfilment SLA, reorder status,
  cash tied in stock (from `assets/dashboard/`)
- Documentation and a 90-minute handover session with whoever runs ops
- 30 days of post-launch support for fixes and tuning

**What's out:** Custom app development. ERP migration. Changing 3PL or
renegotiating fulfilment contracts. Accounting/finance systems. Paid media,
CRO, anything demand-side. Ongoing changes after the 30-day window (that's
the retainer).

**Timeline:** 4–6 weeks depending on number of regions and 3PLs. Fixed scope
agreed in writing before start; scope changes are quoted separately.

**Deliverable:** A running system in their accounts (they own everything),
documentation, and a trained operator.

**Price:** [[PRICE-BUILD]] fixed, minus the audit fee if within 30 days.
50% on start, 50% on handover.

---

## Offer 3: Ops Partner (retainer)

**What it is:** Monthly ownership of the system so it keeps matching the
business as it changes: new SKUs, new regions, new 3PLs, seasonal demand.

**What's in (per month):**
- Monitoring and maintenance of all syncs, alerts and dashboards
- Up to [[N: suggest 2]] working days of changes: new automations, new SKU
  onboarding, rule tuning, new reports
- Monthly 45-minute ops review against the KPI dashboard: what fired, what
  it caught, what to change
- Priority response: [[SLA: suggest next business day]]

**What's out:** New-region or new-3PL integrations bigger than the monthly
day allowance (quoted as mini-builds). Anything in the build's exclusion
list. Being their ops employee: I run the system, not the warehouse.

**Timeline:** Monthly, 3-month minimum, then rolling with 30 days' notice.

**Deliverable:** A system that stays alive, plus the monthly review.

**Price:** [[PRICE-RETAINER]]/month.

---

## Recommended pricing (DECISION: Joshua reacts to these)

| Offer | Floor | **Recommended** | Stretch | Reasoning |
|---|---|---|---|---|
| Stock Audit | £1,500 | **£2,000** | £2,500 | Below £1,500 reads as cheap and attracts tyre-kickers. £2,000 is signable by a £1–10m founder without a board conversation, and credited-against-build makes it feel near-free. |
| Ops Stack Build | £7,500 | **£9,500** | £14,000 (3 regions / 2+ 3PLs) | Anchor: one mid-level ops hire costs £35–45k/yr and doesn't build systems. If the audit shows £20k+/yr of leakage (it usually will at this size), £9,500 with a 4–6 week payback story is an easy board case. Quote stretch for multi-3PL complexity, don't discount below floor. |
| Ops Partner | £950/mo | **£1,500/mo** | £2,500/mo | £1,500 = roughly 2 days at a sane implied day rate, and 10x cheaper than an ops hire. 3-month minimum protects you from churn before the system proves itself in a demand cycle. |

Rule of thumb once live: if 3 of your first 5 audit prospects say yes without
flinching, the price is too low. Raise the next one.
