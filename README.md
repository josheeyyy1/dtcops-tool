# The Operating System

Everything in this repo exists to move one person along this line:

**stranger → reply → scoping call → paid audit → build → retainer**

If an activity doesn't move someone along that line this week, it's polish,
and polish is the enemy. The building is done. What's left is sending.

---

## The client journey and which asset does the work

| Stage | What happens | Asset | Exit condition |
|---|---|---|---|
| 1. Target | Pick who to contact | `outreach/qualification-checklist.md` | Name in `outreach/pipeline.csv` |
| 2. Touch | Email/LinkedIn, 5 touches max | `outreach/cold-email.md`, `linkedin.md`, `follow-up-sequence.md` | Reply, or touch 5 sent and 90-day listed |
| 3. Scoping call | 30 min, free, diagnose out loud | `outreach/call-script.md` + `audit/scoping-call-questions.md` | Audit sold, dated follow-up, or honest no + referral ask |
| 4. Audit | 2 weeks, fixed scope | `audit/scoring-sheet.md` + `.csv`, report from `audit/audit-report-template.md` | Walkthrough held, build proposed via report §6 |
| 5. Build | 4–6 weeks, fixed scope | `assets/airtable/` (schema, CSVs, deploy checklist), `assets/workflows/`, `assets/dashboard/` | Handover done: their ops person runs Monday from the dashboard |
| 6. Retainer | Monthly | Weekly KPI roll-up is the heartbeat; monthly review call | Renewal, or graceful end with system documented |

Pricing and offer definitions: `positioning/offers.md`. Positioning and who
we do NOT sell to: `positioning/positioning.md`.

## Launch week (dated: Monday 6 July → Friday 10 July 2026)

Outreach goes out **Friday 10 July**, two days inside the Day-7 deadline.
Each day has a hard stop condition. If a day's work is done by lunch, start
the next day's work; never the reverse.

**Day 1 — Mon 6 Jul: decisions and identity.**
Set the three prices (react to the recommendations in
`positioning/offers.md`). Confirm or soften the before/after metrics.
Update LinkedIn headline per `outreach/linkedin.md`. Create the booking
link (Calendly/Cal.com free tier, 30-min "Scoping call").
*Done when: prices written into offers.md and index.html, headline live,
booking link works in an incognito window.*

**Day 2 — Tue 7 Jul: site live.**
Replace every `class="todo"` in `site/index.html` (checklist in
`site/DEPLOY.md`). Deploy to Vercel. Read it once aloud; fix anything you
wouldn't say to a founder's face.
*Done when: the URL loads on your phone and the booking link on it works.*

**Day 3 — Wed 8 Jul: the list.**
30 candidate names from your network into `outreach/pipeline.csv`. Score
them with `outreach/qualification-checklist.md`. Keep 15. For the top 5,
write the personal opening line (the observation) for each.
*Done when: 15 scored rows in pipeline.csv, top 5 have observations written.*

**Day 4 — Thu 9 Jul: dress rehearsal.**
One practice scoping call out loud against `outreach/call-script.md` (record
yourself, listen back once; painful and worth it). Personalise messages for
the remaining 10. Prep the audit confirmation one-pager and access checklist
(from `audit/scoping-call-questions.md`, close-of-call section) so a yes on
a call needs zero preparation.
*Done when: 15 messages drafted and sitting in drafts, script read aloud twice.*

**Day 5 — Fri 10 Jul: SEND.**
Send all 15 before 10:00. Log send dates in pipeline.csv. Then stop: no
tinkering with the site, no new assets. Anything that itches goes in a note
for Day 8.
*Done when: 15 sent, 15 logged. This is the only definition of done.*

**Days 6–7 — weekend:** nothing. Replies land Monday. The follow-up engine
(`outreach/follow-up-sequence.md`) starts Day 8: touch 2 on Day 3 of each
prospect's own clock.

**Week 2 onward:** 10 cold prospects added per week (found via the ICP
signals in `positioning/positioning.md`), sequence running, every call
followed by 5 minutes of pipeline bookkeeping.

## Kill / keep rule

Two checkpoints, calendar-fixed, judged only on `outreach/pipeline.csv`.
No feelings, no "one more week".

**Checkpoint 1 — Friday 31 July 2026** (3 weeks after first send).
Required to continue unchanged: **≥40 first touches sent** (15 network + ~25
cold) **and ≥3 scoping calls held.**
- Calls happening but no audit interest → the offer or price is wrong: fix
  the offer, keep going.
- Replies but no calls → the ask is wrong: fix the close of the message.
- Under 3 calls and reply rate <10% → the wedge or the list is wrong:
  re-read `positioning/positioning.md` disqualifiers, rebuild the list once.
- Under 40 touches sent → the problem is you, not the market. Nothing in
  this repo fixes that; send the touches before drawing any conclusion.

**Checkpoint 2 — Friday 14 August 2026** (6 weeks).
Required to keep the business: **≥1 audit sold** (deposit paid, not
promised).
- 1+ sold → keep. Raise the audit price for the next prospect and plan
  weeks 7–12 around delivering brilliantly and mining the audit for the
  build sale.
- 0 sold despite 5+ calls held → the market heard the offer and declined:
  kill this shape. Salvage: the asset library retargets to a neighbouring
  wedge (skincare, pet supplements, food DTC) or repackages as a productised
  build for a 3PL's client base. One pivot allowed; a second zero kills it.
- 0 sold and <5 calls held → you don't have signal yet, you have absence of
  effort. Extend two weeks with 15 touches/week, then apply this rule
  without mercy.

## Repo map

```
positioning/   wedge, ICP, offers, recommended prices
audit/         questions, scoring, report template   ← the first sale
assets/        airtable/ workflows/ dashboard/       ← the margin
site/          index.html + DEPLOY.md                ← deploy Day 2
outreach/      messages, script, checklist, pipeline ← the week's work
CLAUDE.md      project anchor for future sessions
```
