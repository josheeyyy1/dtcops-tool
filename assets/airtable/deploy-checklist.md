# New-Client Deploy Checklist (Airtable base)

Target: base live with client data in half a day. Everything below is config,
not design. If you find yourself redesigning, stop and fix the template
instead, then redeploy.

## 1. Create the base (~60 min)

- [ ] New base from scratch, named `{Client} Ops`.
- [ ] Create tables in this order: Suppliers, Locations, Products,
      Inventory Levels, Purchase Orders, PO Lines, Sales Daily, KPI Snapshots.
- [ ] Import `csv/*.csv` into each table (headers only where empty).
- [ ] Convert field types and add formulas per `schema.md`, table by table.
      Lookups first, then formulas that reference them.
- [ ] Delete the PLACEHOLDER rows.
- [ ] Create the five views listed in `schema.md`.

## 2. Load client data (~60–90 min)

- [ ] Products: from their SKU sheet. **SKUs must match Shopify exactly.**
      Run a diff against a Shopify product export before importing.
- [ ] Suppliers: lead times from the last 3 POs' *actual* door-to-door times,
      not quoted times. If actuals unknown, quoted + 15 days and a note.
- [ ] Locations: one per warehouse/3PL, inbound buffers per region defaults
      (UK 2 / EU 5 / US 7) until tuned.
- [ ] Inventory Levels: one row per active SKU per location. Fastest: paste a
      cross-join from a spreadsheet (SKU column × location column), then let
      the sync fill quantities.
- [ ] Open POs: enter anything currently in flight, with lines. Set On Order
      on the matching Inventory Levels rows.

## 3. Sanity checks before connecting workflows

- [ ] Pick 3 SKUs, hand-calculate reorder point and suggested qty, compare
      to the formulas. Off by rounding is fine; off by logic is not.
- [ ] Reorder queue view: does the list smell right to the client's ops
      person? If half the catalogue is flagged, velocities or safety days
      are wrong. Fix before anyone sees it.
- [ ] Every product has: supplier, unit cost, case size, and a lead time
      (own or supplier default). Missing any = reorder maths silently wrong.

## 4. Connect workflows

Follow `../workflows/` in this order: inventory sync → low-stock alerts →
order status → weekly KPI. Each blueprint has its own test procedure.

## 5. Handover artefacts

- [ ] Client added as owner of the base (they own everything).
- [ ] "Reorder queue" view bookmarked for the ops person.
- [ ] 90-minute handover recorded.
