# Demo Base: Automations and AI Kit

Airtable's API cannot create automations or AI fields, so these are
paste-ready recipes for the demo base (`appbjeRPRDyDpxgUv`). Each takes two
to five minutes in the Automations panel. The support fields they write to
(`Alerted At` on Inventory Levels, `Chase Email Draft` on Purchase Orders)
already exist in the base.

Build order: 1 and 2 first (the visible wins), then 3 and 4 (the engine),
then 5 (the AI layer).

---

## 1. Monday reorder digest

The founder's Monday morning email: everything below its reorder point,
with suggested quantities.

- **Trigger:** At scheduled time. Weekly, Monday, 08:00 (Europe/London).
- **Action 1:** Run a script. Paste:

```js
let table = base.getTable("Inventory Levels");
let query = await table.selectRecordsAsync({
    fields: ["Key", "Available", "On Order", "Reorder Point",
             "Days of Cover", "Suggested Order Qty", "Low Stock"],
});
let flagged = query.records.filter(r => r.getCellValue("Low Stock") === 1);
let lines = flagged.map(r =>
    `${r.getCellValueAsString("Key")}: ` +
    `${r.getCellValue("Days of Cover")}d cover, ` +
    `${r.getCellValue("Available")} available + ${r.getCellValue("On Order") ?? 0} inbound ` +
    `vs reorder point ${r.getCellValue("Reorder Point")}. ` +
    `Suggested order: ${r.getCellValue("Suggested Order Qty")} units.`
);
output.set("count", flagged.length);
output.set("digest", flagged.length
    ? lines.join("\n")
    : "Nothing below reorder point this week.");
```

- **Action 2:** Send email. To: you. Subject: `Reorder queue: {count} SKU
  locations flagged`. Body: insert the `digest` output from the script.

## 2. Instant low-stock alert (fires once per flag)

- **Trigger:** When record matches conditions, on Inventory Levels.
  Conditions: `Low Stock` is 1 AND `Alerted At` is empty.
- **Action 1:** Send email (or Slack: send message). Insert `Key`,
  `Days of Cover`, `Suggested Order Qty` from the trigger record.
- **Action 2:** Update record (the trigger record): set `Alerted At` to
  "Now" (use the clock icon in the value picker).

**Reset pair (second automation):** trigger When record matches conditions:
`Low Stock` is 0 AND `Alerted At` is not empty. Action: Update record, clear
`Alerted At`. The flag can then alert again next time it trips.

To demo this live on a call: open Inventory Levels, drop `On Hand` on any
healthy row to 50, and watch the alert arrive. Restore the number and the
reset automation re-arms it.

## 3. Velocity recalc from Sales Daily (weekly)

Keeps `Avg Daily Sales 30d` honest instead of hand-entered.

- **Trigger:** At scheduled time. Weekly, Monday, 07:30 (before the digest).
- **Action:** Run a script. Paste:

```js
let salesTable = base.getTable("Sales Daily");
let invTable = base.getTable("Inventory Levels");

let cutoff = new Date();
cutoff.setDate(cutoff.getDate() - 30);

let sales = await salesTable.selectRecordsAsync({
    fields: ["Date", "Region", "Product", "Units Sold"],
});

// Sum units and count distinct days per SKU + region
let totals = {};   // "SKU|REGION" -> units
let days = {};     // "SKU|REGION" -> Set of dates
for (let r of sales.records) {
    let dateStr = r.getCellValue("Date");
    if (!dateStr || new Date(dateStr) < cutoff) continue;
    let product = r.getCellValue("Product");
    let region = r.getCellValueAsString("Region");
    if (!product || !region) continue;
    let key = `${product[0].name}|${region}`;
    totals[key] = (totals[key] ?? 0) + (r.getCellValue("Units Sold") ?? 0);
    (days[key] = days[key] ?? new Set()).add(dateStr);
}

// Write velocity onto matching Inventory Levels rows.
// Divides by observed days (max 30) so new SKUs are not understated.
let inv = await invTable.selectRecordsAsync({
    fields: ["Key", "Product", "Location"],
});
let updates = [];
for (let r of inv.records) {
    let product = r.getCellValue("Product");
    let location = r.getCellValue("Location");
    if (!product || !location) continue;
    let region = location[0].name.split("-")[0];  // "EU-3PL-Venlo" -> "EU"
    let key = `${product[0].name}|${region}`;
    if (!(key in totals)) continue;
    let velocity = totals[key] / Math.min(30, days[key].size);
    updates.push({
        id: r.id,
        fields: { "Avg Daily Sales 30d": Math.round(velocity * 10) / 10 },
    });
}
while (updates.length) {
    await invTable.updateRecordsAsync(updates.splice(0, 50));
}
output.set("updated", "done");
```

Demo note: the base holds five days of sales for three SKUs, so this will
only touch those rows, and dividing by observed days keeps the numbers
sensible. In a client build the Shopify order workflow writes Sales Daily
and this script runs against a real 30 days.

## 4. Weekly KPI snapshot writer

Writes the Monday rows the dashboard trend reads.

- **Trigger:** At scheduled time. Weekly, Monday, 07:45.
- **Action:** Run a script. Paste:

```js
let inv = base.getTable("Inventory Levels");
let products = base.getTable("Products");
let pos = base.getTable("Purchase Orders");
let kpi = base.getTable("KPI Snapshots");

let costBySku = {};
for (let p of (await products.selectRecordsAsync({fields: ["SKU", "Unit Cost"]})).records) {
    costBySku[p.getCellValueAsString("SKU")] = p.getCellValue("Unit Cost") ?? 0;
}

let monday = new Date();
monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
let weekStart = monday.toISOString().slice(0, 10);

let stats = {};  // location name -> {units, value, low}
for (let r of (await inv.selectRecordsAsync({
    fields: ["Product", "Location", "On Hand", "Low Stock"],
})).records) {
    let loc = r.getCellValue("Location");
    let product = r.getCellValue("Product");
    if (!loc || !product) continue;
    let s = stats[loc[0].name] = stats[loc[0].name] ?? {units: 0, value: 0, low: 0};
    let onHand = r.getCellValue("On Hand") ?? 0;
    s.units += onHand;
    s.value += onHand * (costBySku[product[0].name] ?? 0);
    s.low += r.getCellValue("Low Stock") === 1 ? 1 : 0;
}

let openPOs = 0, latePOs = 0;
for (let r of (await pos.selectRecordsAsync({fields: ["Status", "Late"]})).records) {
    let status = r.getCellValueAsString("Status");
    if (["Placed", "In Transit", "Partially Received"].includes(status)) openPOs++;
    if (r.getCellValue("Late") === 1) latePOs++;
}

let rows = Object.entries(stats).map(([scope, s]) => ({fields: {
    "Snapshot": `${weekStart} ${scope}`,
    "Week Start": weekStart,
    "Scope": scope,
    "Units On Hand": s.units,
    "Stock Value": Math.round(s.value),
    "SKUs Low Stock": s.low,
}}));
let total = Object.values(stats).reduce(
    (a, s) => ({units: a.units + s.units, value: a.value + s.value, low: a.low + s.low}),
    {units: 0, value: 0, low: 0});
rows.push({fields: {
    "Snapshot": `${weekStart} TOTAL`,
    "Week Start": weekStart,
    "Scope": "TOTAL",
    "Units On Hand": total.units,
    "Stock Value": Math.round(total.value),
    "SKUs Low Stock": total.low,
    "Open POs": openPOs,
    "Late POs": latePOs,
}});
await kpi.createRecordsAsync(rows);
output.set("written", rows.length);
```

Median cover, sell-through and shipped percentages need order-level data
the demo does not carry; in a client build those come from the fulfilment
workflow. Leave them blank here or fill by hand.

## 5. The AI layer

Requires Airtable AI on the workspace. Three placements that are genuinely
useful rather than decorative:

**a. Late PO chase email (automation + AI step).**
Trigger: When record matches conditions on Purchase Orders, `Late` is 1.
Action 1: Generate with AI. Prompt:

> Write a short, polite but firm chase email to {Supplier} about {PO Number},
> which was expected on {Expected Date} and has not arrived. Ask for a
> revised delivery date and whether any lines can part-ship. Plain British
> English, no exclamation marks, sign off as Joshua.

Action 2: Update record, write the AI output into `Chase Email Draft`.
Review and send by hand; do not auto-send.

**b. Reorder rationale (AI field on Inventory Levels).**
Add an AI text field named `Why flagged`. Prompt it with the row's own
fields:

> In one sentence, explain why this SKU location is or is not below its
> reorder point, using Available, On Order, Reorder Point, Days of Cover
> and Suggested Order Qty. If Low Stock is 0, say what would trip it.

This is the same transparency the site demo shows, living in the data.

**c. Monday ops summary (AI step inside automation 1).**
Between the script and the email, add Generate with AI:

> Summarise this reorder digest in three plain sentences for a busy founder:
> what needs ordering, roughly how many units, and which warehouse is most
> at risk. British English, no hype. Digest: {digest}

Insert the summary above the raw digest in the email body.

**Agents note:** if the workspace has Airtable's agent features enabled, a
standing agent instruction that works well: "Each Monday, review Inventory
Levels where Low Stock is 1, group by Supplier, and draft one purchase
order per supplier and destination in Purchase Orders with status Draft,
using Suggested Order Qty per line. Never place or send anything." Keep
agents drafting, never executing; the human places the order.

## Per-client config

| Setting | Where | Demo value |
|---|---|---|
| Digest recipient and send time | Automations 1, 3, 4 triggers | Mon 07:30 to 08:00 |
| Alert channel | Automation 2 action | Email (swap for Slack) |
| Velocity window | Script 3 `cutoff` | 30 days |
| Region parsing | Script 3 `split("-")[0]` | Location names start UK- / EU- / US- |
| AI sign-off and tone | Section 5 prompts | Joshua, plain British |
