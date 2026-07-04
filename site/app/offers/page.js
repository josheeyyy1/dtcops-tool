import { BOOKING_URL } from "../../lib/constants";
import Reveal from "../../components/Reveal";

export const metadata = {
  title: "How we work together",
  description:
    "Three ways to work together: a fixed-scope Stock Audit, an Ops Stack Build, and a monthly Ops Partner retainer.",
};

export default function OffersPage() {
  return (
    <div className="page-head grid-bg">
      <p className="kicker rise">Engagement</p>
      <h1 className="rise">How we work together</h1>

      <div className="journey rise-2" aria-hidden="true">
        <span className="journey-step">
          <span className="journey-num">01</span>
          <span className="journey-name">Audit</span>
          <span className="journey-dur">2 wks</span>
        </span>
        <span className="journey-link" />
        <span className="journey-step">
          <span className="journey-num">02</span>
          <span className="journey-name">Build</span>
          <span className="journey-dur">4&ndash;6 wks</span>
        </span>
        <span className="journey-link" />
        <span className="journey-step">
          <span className="journey-num">03</span>
          <span className="journey-name">Partner</span>
          <span className="journey-dur">monthly</span>
        </span>
      </div>

      <div className="offers-grid">
        <Reveal className="offer featured" delay={0}>
          <span className="offer-tag">Start here</span>
          <h3>1. The Stock Audit</h3>
          <p className="offer-meta">2 WEEKS &middot; FIXED SCOPE</p>
          <p className="offer-body">
            A structured diagnostic of how stock moves through your business:
            one scoping call, read-only access to your data, and a written
            report scoring eight operational areas. You get a prioritised fix
            list with what each problem costs you per year, in your own
            numbers. Yours to act on with or without me.
          </p>
          <div className="offer-price">
            <strong>£2,000</strong>
            <span>
              Credited in full against the build if you go ahead within 30 days.
            </span>
          </div>
        </Reveal>

        <Reveal className="offer" delay={90}>
          <span className="offer-tag" aria-hidden="true"></span>
          <h3>2. The Ops Stack Build</h3>
          <p className="offer-meta">4&ndash;6 WEEKS &middot; FIXED SCOPE</p>
          <p className="offer-body">
            The full backbone: single source of truth, inventory sync across
            every warehouse, reorder logic per SKU per region, automated
            alerts, and the KPI dashboard. Documentation and a proper
            handover to whoever runs your ops. 30 days of post-launch support
            included.
          </p>
          <div className="offer-price">
            <strong>£9,500 fixed</strong>
            <span>Minus your audit fee. Half on start, half on handover.</span>
          </div>
        </Reveal>

        <Reveal className="offer" delay={180}>
          <span className="offer-tag" aria-hidden="true"></span>
          <h3>3. Ops Partner</h3>
          <p className="offer-meta">MONTHLY</p>
          <p className="offer-body">
            The system keeps matching the business as it changes: new SKUs,
            new regions, new 3PLs, seasonal swings. Monitoring, tuning, new
            automations, and a monthly review against the dashboard.
          </p>
          <div className="offer-price">
            <strong>£1,500 per month</strong>
            <span>Three-month minimum, then rolling.</span>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <p className="spaced">
          Most people start with the audit. It's cheap enough to say yes
          to, and the report stands on its own even if we never speak again.
        </p>
        <p className="spaced">
          <a
            className="cta"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a scoping call
          </a>
        </p>
      </Reveal>
    </div>
  );
}
