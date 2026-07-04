# Workflow Blueprints

Four workflows sit on top of the Airtable base. Documented here as
platform-agnostic blueprints with n8n as the default build target and Make
module names noted where they differ.

**Decision made: n8n first.** Reasons: exportable JSON workflows you can
commit back into this repo per client (Make scenarios don't version-control
cleanly), self-hostable if a client objects to data residency, and cheaper
at per-client volume. Use Make only if the client already runs on it.
**Once the first client build is done, export the n8n JSON into
`n8n-exports/` here so the next deploy is import + reconfigure.**

Deploy order (each depends on the last being trusted):
1. `inventory-sync.md` — the foundation; nothing else matters if this lies
2. `low-stock-alerts.md` — first visible value, usually within days
3. `order-status-updates.md` — feeds Sales Daily and fulfilment SLA
4. `weekly-kpi-rollup.md` — feeds KPI Snapshots and the Monday dashboard

## Conventions (all four blueprints)

- **Credentials:** one n8n credential set per client, named `{client}-shopify`,
  `{client}-airtable`, `{client}-3pl`. Never share credentials across clients.
- **Config block:** every workflow starts with a Set node called `CONFIG`
  holding all per-client values (base ID, table IDs, thresholds, channel).
  Reconfiguring for a new client = edit one node.
- **Error handling:** every workflow has an n8n Error Workflow attached that
  posts to the client's alerts channel: workflow name, node, error, time.
  Silence must mean healthy, so failures must be loud.
- **Idempotency:** every write to Airtable is an upsert keyed on the row's
  natural key (SKU@Location, PO number, date+SKU+region). Re-running a
  workflow must never duplicate rows.
- **Rate limits:** Airtable is 5 req/s per base: batch updates in chunks of
  10 with a 250ms pause (n8n Loop Over Items + Wait). Shopify REST is
  2 req/s standard: use bulk/GraphQL for catalogues over ~250 SKUs.
- **Timezone:** run everything in the client's reporting timezone; set it
  explicitly in each Cron/Schedule node, don't trust server default.
