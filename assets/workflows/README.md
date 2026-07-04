# Workflow Blueprints

Four workflows on top of the Airtable base. Written as platform-agnostic
blueprints, n8n as the default target.

**n8n over Make:** exportable JSON you can commit per client, self-hostable
if a client cares about data residency, cheaper at this volume. Use Make
only if a client already runs on it. Once the first build is done, export
the n8n JSON into `n8n-exports/` so the next deploy is import + reconfigure.

Deploy order (each depends on the last being trusted): **inventory-sync →
low-stock-alerts → order-status-updates → weekly-kpi-rollup.**

## Conventions (all four)

- **Credentials:** one set per client (`{client}-shopify`, `{client}-airtable`,
  `{client}-3pl`). Never share across clients.
- **Config block:** every workflow starts with a `CONFIG` Set node holding
  all per-client values. Reconfiguring for a new client = edit one node.
- **Error handling:** an Error Workflow attached to each, posting workflow /
  node / error / time to the client's alerts channel. Silence must mean
  healthy.
- **Idempotency:** every write is an upsert keyed on a natural key
  (SKU@Location, PO number, date+SKU+region). Re-running never duplicates.
- **Rate limits:** Airtable 5 req/s per base — batch in chunks of 10 with a
  250ms pause. Shopify REST 2 req/s — use bulk/GraphQL over ~250 SKUs.
- **Timezone:** set explicitly in each Schedule node to the client's
  reporting timezone; don't trust server default.
