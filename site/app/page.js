import Link from "next/link";
import { BOOKING_URL } from "../lib/constants";
import LiveDashboard from "../components/LiveDashboard";
import Convergence from "../components/Convergence";
import Reveal from "../components/Reveal";
import { IconArrowRight } from "../components/Icons";

export const metadata = {
  title: "Joshua Adams: Ops automation for multi-region supplement brands",
};

export default function HomePage() {
  return (
    <>
      <header className="hero grid-bg">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="kicker rise">Operations automation for supplement brands</p>
            <h1 className="rise">
              One accurate view of stock in every warehouse.{" "}
              <span style={{ color: "var(--accent-ink)" }}>
                Reorder points that fire before you run out.
              </span>{" "}
              The spreadsheet work, automated away.
            </h1>
            <p className="lead rise-2" style={{ marginTop: "24px" }}>
              For DTC supplement and wellness brands on Shopify doing
              £1&ndash;10m, with stock split across UK, EU or US warehouses.
            </p>
            <div className="hero-actions rise-3">
              <a
                className="cta"
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a scoping call
              </a>
              <Link href="/how-it-works" className="cta-ghost">
                See how it works <IconArrowRight width={16} height={16} />
              </Link>
            </div>
            <p className="hero-meta rise-3">30 MIN &middot; FREE &middot; NO PITCH</p>
          </div>

          <div className="rise-2">
            <LiveDashboard />
          </div>
        </div>
      </header>

      <section>
        <Reveal>
          <div className="section-head">
            <p className="kicker">The problem</p>
            <h2>The problem, if it's yours</h2>
          </div>
        </Reveal>
        <div className="problem-grid">
          <Reveal>
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
          </Reveal>
          <Convergence />
        </div>
      </section>

      <section>
        <Reveal>
          <div className="section-head">
            <p className="kicker">The system</p>
            <h2>What I do about it</h2>
          </div>
          <p>
            I build the operations backbone in tools you already understand:
            Airtable as the single source of truth, synced hourly from
            Shopify and your 3PLs, with per-region reorder points calculated
            from your real sales velocity and real lead times. Low-stock
            alerts arrive before the stock-out, not after. A dashboard shows
            stock cover, fulfilment performance and cash tied up in stock, per
            region, every Monday morning.
          </p>
        </Reveal>

        <div className="ledger">
          <Reveal className="ledger-row" delay={0}>
            <span className="ledger-index">01</span>
            <div>
              <h3>Single source of truth</h3>
              <p>Airtable, synced hourly from Shopify and every 3PL.</p>
            </div>
            <span className="ledger-tag">Hourly sync</span>
          </Reveal>
          <Reveal className="ledger-row" delay={80}>
            <span className="ledger-index">02</span>
            <div>
              <h3>Per-region reorder points</h3>
              <p>Calculated from real sales velocity and real lead times.</p>
            </div>
            <span className="ledger-tag">Per SKU, per region</span>
          </Reveal>
          <Reveal className="ledger-row" delay={160}>
            <span className="ledger-index">03</span>
            <div>
              <h3>Low-stock alerts</h3>
              <p>They arrive before the stock-out, not after.</p>
            </div>
            <span className="ledger-tag">Before, not after</span>
          </Reveal>
          <Reveal className="ledger-row" delay={240}>
            <span className="ledger-index">04</span>
            <div>
              <h3>The Monday dashboard</h3>
              <p>Stock cover, fulfilment performance and cash tied up in stock, per region.</p>
            </div>
            <span className="ledger-tag">Every Monday</span>
          </Reveal>
        </div>

        <Reveal className="own">
          <span className="own-label">Ownership</span>
          <p>
            You own everything. It runs in your accounts. No proprietary
            platform, no lock-in, no per-seat licence creep.
          </p>
        </Reveal>

        <Reveal>
          <p className="spaced">
            See the <Link href="/offers">three ways to work together</Link> or
            how it went the{" "}
            <Link href="/how-it-works">first time I built this</Link>.
          </p>
        </Reveal>
      </section>

      <section>
        <Reveal className="cta-band">
          <div>
            <h2>Ready to see it against your own numbers?</h2>
            <p>
              Thirty minutes, free, no pitch. I'll tell you honestly whether
              an audit is worth your money.
            </p>
          </div>
          <a
            className="cta"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a scoping call
          </a>
        </Reveal>
      </section>
    </>
  );
}
