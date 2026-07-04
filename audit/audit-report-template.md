# Stock & Operations Audit

**Prepared for:** [[CLIENT NAME]]
**Prepared by:** Joshua Adams
**Date:** [[DATE]]
**Scope:** Stock, reordering and fulfilment across [[REGIONS, e.g. UK, EU, US]]
**Sources:** Scoping call [[DATE]], Shopify order data [[PERIOD]], [[3PL NAME]]
reports [[PERIOD]], purchase orders [[PERIOD]], your current working
spreadsheets.

> Template rules: replace every [[..]] before sending. Delete any section
> where you found nothing; a short honest report beats a padded one. Every
> number must trace back to their data. No adjectives where a number will do.

---

## 1. The headline

[[ONE PARAGRAPH. The single most expensive problem, in their numbers, and
what fixing it is worth per year. Written so the founder could read only this
paragraph and still know what to do. Example shape, not copy: "You lost an
estimated £X in Q2 to stock-outs on SKUs A and B while holding £Y of excess
stock in the EU warehouse. The cause is the same in both cases: reordering
happens per warehouse on gut feel, with no shared view of stock or demand.
That is fixable in weeks, not quarters."]]

**Overall score: [[NN]]% — [[BAND: Critical / Fragile / Functional / Strong]]**

[[ONE SENTENCE using the band language from the scoring sheet.]]

## 2. What this is costing you

Conservative estimates, from your data, assumptions stated.

| Leak | Annualised cost | Based on |
|---|---|---|
| Stock-outs on top SKUs | [[£X]] | [[units missed × price × weeks out, SKUs and dates listed in §4]] |
| Manual hours on stock admin | [[£X]] | [[N hrs/week × £Y loaded cost × 52, from your team's own estimate]] |
| Cash over-held in stock | [[£X]] | [[stock value above Z days' target cover, by region]] |
| [[Expiry write-offs, if found]] | [[£X]] | [[write-offs last 12 months]] |
| **Total annual leak** | **[[£X]]** | |

## 3. Scorecard

| Area | Score | In one line |
|---|---|---|
| Stock visibility | [[n]]/3 | [[e.g. "Three sources of stock truth; none agree; the spreadsheet wins by default."]] |
| Reorder discipline | [[n]]/3 | [[...]] |
| Demand awareness | [[n]]/3 | [[...]] |
| Multi-region balance | [[n]]/3 | [[...]] |
| Fulfilment accountability | [[n]]/3 | [[...]] |
| Data hygiene | [[n]]/3 | [[...]] |
| Manual workload | [[n]]/3 | [[...]] |
| Cash in stock | [[n]]/3 | [[...]] |

Scale: 0 absent, 1 manual, 2 systematised, 3 automated.

## 4. What we found

[[ONE SUBSECTION PER AREA SCORING 2 OR LESS. Keep each to this shape:]]

### [[Area name]] — [[n]]/3

**What happens now:** [[2–4 sentences, concrete, from the call and the data.
Name the actual behaviour: "POs are raised when [[NAME]] notices a low bin
count in the 3PL portal, usually prompted by a stock-out or a warehouse
email."]]

**What it causes:** [[The measurable consequence, with the incident or number
that proves it: "SKU [[X]] was out of stock in the US for [[N]] days in
[[MONTH]]; UK held [[N]] weeks of cover for the same SKU throughout."]]

**The fix:** [[One or two sentences. What changes, not how it's built.]]

## 5. The fix list, in order

Ranked by impact against effort. Costs from §2, so the order is arguable
with arithmetic, not opinion.

| # | Fix | What it's worth | Effort | Depends on |
|---|---|---|---|---|
| 1 | [[...]] | [[£/yr or hrs/wk]] | [[Low/Med/High]] | — |
| 2 | [[...]] | [[...]] | [[...]] | [[#1]] |
| 3 | [[...]] | [[...]] | [[...]] | [[...]] |
| ... | | | | |

**Do these first:** [[The top 3, one line each, phrased as outcomes: "Every
unit of stock visible in one place, per warehouse, updated hourly."]]

## 6. What I'd build

[[SHORT. This is the bridge to the proposal, not the proposal. Describe the
end state in their language: one source of truth, reorder points that fire
themselves, alerts instead of checking, a dashboard the Monday meeting runs
on. Then one paragraph on sequence: weeks 1–2 foundation, weeks 3–4
automation, weeks 5–6 dashboard and handover. No feature lists.]]

The fix list above is yours either way: any competent operator could work
through it. If you want it done in 4–6 weeks by someone who has built
exactly this for a multi-region supplement brand, that is the Ops Stack
Build: fixed scope, fixed price, £9,500 minus the £2,000
you have already paid.

## 7. Assumptions and limits

- [[Every estimate's assumptions, honestly: "Stock-out cost assumes lost
  sales, not deferred; subscription churn from stock-outs not included, so
  the true figure is likely higher."]]
- [[Data you didn't get and how it would change the picture.]]
- Figures are estimates for decision-making, not accounting.

---

*Questions after the walkthrough: joshuaadams91@gmail.com*
