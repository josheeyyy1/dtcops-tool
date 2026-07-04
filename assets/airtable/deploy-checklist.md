# New-Client Deploy Checklist

Target: base live with client data in half a day. This is config, not
design — if you're redesigning, fix the template instead and redeploy.

## 1. Create the base (~60 min)

- [ ] New base, named `{Client} Ops`.
- [ ] Tables in order: Suppliers, Locations, Products, Inventory Levels,
      Purchase Orders, PO Lines, Sales Daily, KPI Snapshots.
- [ ] Import `csv/*.csv` into each table.
- [ ] Convert field types and add formulas per `schema.md` — lookups first,
      then formulas that reference them.
- [ ] Delete the PLACEHOLDER rows.
- [ ] Create the five views listed in `schema.md`.

## 2. Load client data (~60–90 min)

- [ ] Products from their SKU sheet. **SKUs must match Shopify exactly** —
      diff against a Shopify product export before importing.
- [ ] Suppliers: lead times from the last 3 POs' *actual* door-to-door
      times, not quotes. If unknown, quoted + 15 days with a note.
- [ ] Locations: one per warehouse/3PL, default inbound buffers (UK 2 /
      EU 5 / US 7) until tuned.
- [ ] Inventory Levels: one row per active SKU per location — fastest via
      a cross-join paste (SKU column × location column), sync fills
      quantities after.
- [ ] Open POs entered with lines; On Order set on matching rows.

## 3. Sanity checks before connecting workflows

- [ ] Hand-calculate reorder point and suggested qty for 3 SKUs, compare
      to the formulas. Rounding differences are fine; logic differences
      aren't.
- [ ] "Reorder queue" view smells right to the client's ops person? If
      half the catalogue is flagged, velocities or safety days are wrong —
      fix before anyone sees it.
- [ ] Every product has supplier, unit cost, case size, and a lead time.
      Missing any breaks the reorder maths silently.

## 4. Connect workflows

Follow `../workflows/` in order: inventory sync → low-stock alerts → order
status → weekly KPI. Each has its own test procedure.

## 5. Handover

- [ ] Client added as base owner.
- [ ] "Reorder queue" view bookmarked for the ops person.
- [ ] 90-minute handover recorded.
