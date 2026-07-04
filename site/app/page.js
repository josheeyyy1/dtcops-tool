import Link from "next/link";
import { BOOKING_URL } from "../lib/constants";

export const metadata = {
  title: "Joshua Adams: Ops automation for multi-region supplement brands",
};

export default function HomePage() {
  return (
    <>
      <header className="hero">
        <p className="kicker">Operations automation for supplement brands</p>
        <h1>
          One accurate view of stock in every warehouse. Reorder points that
          fire before you run out. The spreadsheet work, automated away.
        </h1>
        <p className="muted spaced">
          For DTC supplement and wellness brands on Shopify doing
          £1&ndash;10m, with stock split across UK, EU or US warehouses.
        </p>
        <a
          className="cta"
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a scoping call
        </a>
      </header>

      <section>
        <h2>The problem, if it's yours</h2>
        <p>
          Your bestseller is out of stock in the US while the EU warehouse
          holds four months of it. Shopify says one number, the 3PL portal
          says another, and the spreadsheet that decides your next purchase
          order says a third. Somebody on your team spends hours every week
          ferrying numbers between systems, and reorders still get
          triggered by a warehouse email or a customer complaint.
        </p>
        <p>
          None of this is anyone's fault. Every tool you have works
          for one warehouse. The moment stock splits across regions, the
          tools stop agreeing with each other, and a person becomes the
          integration. That person is usually you, at 10pm.
        </p>
      </section>

      <section>
        <h2>What I do about it</h2>
        <p>
          I build the operations backbone in tools you already understand:
          Airtable as the single source of truth, synced hourly from
          Shopify and your 3PLs, with per-region reorder points calculated
          from your real sales velocity and real lead times. Low-stock
          alerts arrive before the stock-out, not after. A dashboard shows
          stock cover, fulfilment performance and cash tied up in stock, per
          region, every Monday morning.
        </p>
        <p>
          You own everything. It runs in your accounts. No proprietary
          platform, no lock-in, no per-seat licence creep.
        </p>
        <p className="spaced">
          See the <Link href="/offers">three ways to work together</Link> or
          how it went the <Link href="/how-it-works">first time I built this</Link>.
        </p>
      </section>
    </>
  );
}
