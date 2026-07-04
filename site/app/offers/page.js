import Link from "next/link";

export const metadata = {
  title: "How we work together",
  description:
    "Three ways to work together: a fixed-scope Stock Audit, an Ops Stack Build, and a monthly Ops Partner retainer.",
};

export default function OffersPage() {
  return (
    <>
      <h1>How we work together</h1>

      <div className="offer">
        <h3>1. The Stock Audit &middot; 2 weeks &middot; fixed scope</h3>
        <p>
          A structured diagnostic of how stock moves through your business:
          one scoping call, read-only access to your data, and a written
          report scoring eight operational areas. You get a prioritised fix
          list with what each problem costs you per year, in your own
          numbers. Yours to act on with or without me.
        </p>
        <p className="price">
          £2,000, credited in full against the build if you go ahead within
          30 days.
        </p>
      </div>

      <div className="offer">
        <h3>2. The Ops Stack Build &middot; 4&ndash;6 weeks &middot; fixed scope</h3>
        <p>
          The full backbone: single source of truth, inventory sync across
          every warehouse, reorder logic per SKU per region, automated
          alerts, and the KPI dashboard. Documentation and a proper
          handover to whoever runs your ops. 30 days of post-launch support
          included.
        </p>
        <p className="price">
          £9,500 fixed, minus your audit fee. Half on start, half on
          handover.
        </p>
      </div>

      <div className="offer">
        <h3>3. Ops Partner &middot; monthly</h3>
        <p>
          The system keeps matching the business as it changes: new SKUs,
          new regions, new 3PLs, seasonal swings. Monitoring, tuning, new
          automations, and a monthly review against the dashboard.
        </p>
        <p className="price">
          £1,500 per month, three-month minimum, then rolling.
        </p>
      </div>

      <p>
        Most people start with the audit. It's cheap enough to say yes
        to, and the report stands on its own even if we never speak again.
      </p>
      <p className="spaced">
        <Link className="cta" href="/book">Book a scoping call</Link>
      </p>
    </>
  );
}
