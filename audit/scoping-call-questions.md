# Scoping Call Question Set

Use live on the call. Each question maps to a scoring dimension (D1–D8 in
`scoring-sheet.md`), ordered from easy facts to sore points. Record the call.
Score silently — don't correct bad answers here, the report does that.

### Q1. "Walk me through what happens when a customer in [second region] orders your best seller today." (D1, D5)
Good: a clear chain, routed automatically, known dispatch SLA. Bad:
hesitation, "the 3PL handles that," or a manual check. If the founder can't
narrate the happy path, nobody can.

### Q2. "Right now, how many units of that SKU do you have, and where?" (D1)
Good: one place to look, answer in under a minute, trusted. Bad: "I'd have
to check" three different places, or "roughly" for a hero SKU. Time how
long it takes — that number goes in the report.

### Q3. "When did you last run out of stock on a top-5 SKU, and what did it cost you?" (D3, D8)
Good: a dated incident with a revenue estimate and a change made after.
Bad: "we're always out of something," normalising it. For subscription
products this bleeds repeat revenue, not just one sale.

### Q4. "How do you decide when to reorder, and how much?" (D2)
Good: a rule using velocity, lead time and safety stock, applied
consistently. Bad: "when it looks low," gut feel, or a fixed monthly order.
Follow up: "who does that, and what happens when they're on holiday?"

### Q5. "What's your lead time on your top SKU, door to door, and when did you last check it was still true?" (D2, D6)
Good: known per supplier including freight and customs, reviewed recently.
Bad: one number for everyone, or the manufacturing quote with freight
ignored. Stale lead times silently break every reorder calculation.

### Q6. "How does stock split between warehouses, and how often does one region run dry while another sits on months of cover?" (D4)
Good: a deliberate allocation rule, rebalancing on a trigger. Bad: copied
from the last order, or an admitted pattern of imbalance. Usually the
single biggest hidden cost for multi-region brands.

### Q7. "What tools hold stock data, and if two disagree, which wins?" (D1, D6)
Good: a named system of record; others sync from it. Bad: a pause, then a
list — Shopify, the 3PL portal, a spreadsheet, someone's head. No winner
means every number is negotiable.

### Q8. "How many hours a week does your team spend moving stock numbers between systems or chasing POs?" (D7)
Good: a known, bounded number, mostly exceptions. Bad: "too many" with no
number, or over ~5 hrs/week. Multiply by loaded cost on the call.

### Q9. "How much cash is sitting in stock, and how much is in SKUs that aren't selling?" (D8)
Good: knows total value, can name slow movers, watches expiry. Bad: no
idea until year-end. Follow up: "have you ever written off expired stock?"

### Q10. "How do you know your 3PL is doing a good job?" (D5)
Good: tracked SLA/error rate/accuracy against contract. Bad: "no news is
good news," judged only by complaints.

### Q11. "If I fixed exactly one thing in the next 60 days, what should it be?" (all)
Instant specific answer = your report's headline. A long pause is fine too
— that's what the audit is for.

### Q12. "What have you already tried, and why didn't it stick?" (D6)
Good: an honest post-mortem. Bad: nothing tried (pain may not be real
enough to pay for), or a graveyard with blame always external — flag as
implementation risk.

---

## Close of call

1. "Here's what happens next: I take two weeks with read-only access to
   Shopify and your 3PL reports, score what I find across eight areas, and
   hand you a report with a prioritised fix list and what each problem is
   costing you. That's the Stock Audit, it's £2,000, credited against the
   build if you go ahead within 30 days."
2. Book the walkthrough before hanging up. A report without a booked
   walkthrough is a PDF in a drawer.

## Access checklist (request after they say yes)

- Shopify: collaborator access (read), or 6 months of order/product exports
- 3PL: portal read access or last 3 months of stock/dispatch reports
- Current spreadsheets, warts and all
- Last 2 quarters of POs
- 30 minutes with whoever actually does the reordering
