# Scoping Call Question Set

Use live on the call. Each question maps to a scoring dimension (D1–D8 in
`scoring-sheet.md`). Ask in this order: it moves from easy facts to sore
points, so they warm up before the uncomfortable ones. Record the call.

Don't pitch during this call. Every bad answer is scored, not corrected.
The report does the selling.

---

### Q1. "Walk me through what happens when a customer in [their second region] orders your best seller today." (D5, D1)

- **Good:** Clear chain: order routes to the right warehouse automatically,
  stock decrements everywhere it should, they know the dispatch SLA.
- **Bad:** Hesitation about which warehouse ships it, "the 3PL handles that",
  or they describe checking manually. If the founder can't narrate the happy
  path, nobody can.

### Q2. "Right now, how many units of that SKU do you have, and where?" (D1)

- **Good:** One place to look, answer in under a minute, and they trust it.
- **Bad:** "I'd have to check the 3PL portal / ask Sarah / open the sheet."
  Multiple sources that disagree. Any answer with the word "roughly" for a
  hero SKU. Note how long it takes them; that number goes in the report.

### Q3. "When did you last run out of stock on a top-5 SKU, and what did it cost you?" (D8, D3)

- **Good:** Specific incident, dated, with a revenue estimate, and a change
  made afterwards.
- **Bad:** "We're basically always out of something" said with a laugh, or no
  idea of cost. Both mean stock-outs are normalised. Repeat-purchase brands
  bleed subscribers here, not just one sale.

### Q4. "How do you decide when to reorder, and how much?" (D2)

- **Good:** A rule that mentions velocity, lead time and safety stock, even a
  crude one, applied consistently per SKU.
- **Bad:** "When it looks low", "when the 3PL emails us", gut feel, or a
  fixed monthly order regardless of demand. Ask the follow-up: "who does
  that, and what happens when they're on holiday?"

### Q5. "What's your supplier lead time on your top SKU, door to door, and when did you last check it was still true?" (D2, D6)

- **Good:** Knows it per supplier including shipping and customs, reviewed
  recently, tracks PO promised-vs-actual.
- **Bad:** One number for all suppliers, a number that's clearly the quoted
  manufacturing time (ignores freight and customs), or "it varies". Stale
  lead times silently break every reorder calculation downstream.

### Q6. "How does stock get split between your warehouses, and how often does one region run dry while another is sitting on months of cover?" (D4)

- **Good:** A deliberate allocation rule based on regional demand; rebalancing
  or split POs happen on a trigger, not on complaints.
- **Bad:** Allocation copied from the last order, "we just send half and
  half", or admitting one region regularly stocks out while another
  over-holds. This is usually the single biggest hidden cost for
  multi-region brands.

### Q7. "What tools hold stock data right now, and if two disagree, which one wins?" (D6, D1)

- **Good:** Named system of record; other tools sync from it; discrepancies
  are investigated, not overwritten.
- **Bad:** A pause. Then a list: Shopify, the 3PL portal, a spreadsheet,
  someone's head. If no tool wins, the answer is "whoever shouts loudest",
  and every number in the business is negotiable.

### Q8. "How many hours a week does your team spend moving stock numbers between systems, chasing POs, or reconciling counts?" (D7)

- **Good:** They know, it's bounded, and it's mostly exceptions rather than
  routine copying.
- **Bad:** "Too many" without a number, or a number over ~5 hrs/week, or the
  founder personally doing it at night. Multiply hours by loaded cost on the
  call; watch their face. That figure goes in the report.

### Q9. "How much cash is sitting in stock right now, and how much of it is in SKUs that aren't selling?" (D8)

- **Good:** Knows total stock value and can name slow movers; watches expiry
  dates on long-tail SKUs.
- **Bad:** No idea, or only the accountant knows at year-end. For
  supplements, ask the follow-up: "have you ever written off expired stock?"
  A yes with no process change is a scoring 0.

### Q10. "How do you know your 3PL is doing a good job?" (D5)

- **Good:** Tracked dispatch SLA, error rate, and stock accuracy, reviewed
  against the contract; discrepancies raised with data.
- **Bad:** "No news is good news", judging by customer complaints, or never
  having compared 3PL stock counts to their own records.

### Q11. "If I fixed exactly one thing in your ops in the next 60 days, what should it be?" (prioritisation, all dimensions)

- **Good:** Instant, specific answer. That's your report's headline and the
  build's first module.
- **Bad:** "Everything" or a long pause. Fine: the audit's job is to find it.
  But note that they're navigating without instruments.

### Q12. "What have you already tried, and why didn't it stick?" (D6, buying history)

- **Good:** Honest post-mortem: an app that didn't fit multi-region, a hire
  that got swallowed by firefighting. Shows they'll invest.
- **Bad:** Nothing ever tried (pain may not be real enough to pay for), or a
  graveyard of abandoned tools with the blame always external (implementation
  risk: flag it, price it in, or walk).

---

## Close of call

1. "That's everything I need. Here's what happens next: I take two weeks with
   read-only access to Shopify and your 3PL reports, score what I find across
   eight areas, and hand you a report with a prioritised fix list and what
   each problem is costing you. That's the Stock Audit, it's £2,000,
   and it's credited against the build if you go ahead within 30 days."
2. Book the walkthrough call before hanging up. A report without a booked
   walkthrough is a PDF in a drawer.

## Access checklist to request after they say yes

- Shopify: collaborator access (read), or exports: orders 6 months, products
- 3PL: portal read access or last 3 months of stock/dispatch reports
- Current spreadsheets: whatever they actually use, warts and all
- Last 2 quarters of POs (PDFs or emails are fine)
- 30 minutes with whoever actually does the reordering (not just the founder)
