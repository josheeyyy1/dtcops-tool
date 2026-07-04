import Link from "next/link";
import { BOOKING_URL } from "../../lib/constants";
import Reveal from "../../components/Reveal";
import { IconCheck, IconX, IconArrowRight } from "../../components/Icons";

export const metadata = {
  title: "How it works",
  description:
    "Built in-house first at a supplements brand shipping UK, EU and US, before being packaged for other brands.",
};

const ROWS = [
  {
    was: "Stock counts in three systems that disagreed",
    now: "One source of truth, synced hourly, all warehouses",
  },
  {
    was: "Reorders triggered by low-bin emails and gut feel",
    now: "Per-SKU, per-region reorder points, flagged automatically",
  },
  {
    was: "Manual reconciliation eating hours every week",
    now: "Manual ops work down ~40%",
  },
  {
    was: "Recurring stock-outs on hero SKUs",
    now: "Hero-SKU stock-outs: zero",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="page-head grid-bg">
      <p className="kicker rise">Provenance</p>
      <h1 className="rise">I built this in-house first</h1>
      <p className="lead rise-2" style={{ marginTop: "24px" }}>
        Before selling this, I built it as the ops lead at a supplements
        brand shipping across the UK, EU and US from multiple 3PLs. Same
        problem you have, same tools I now deploy.
      </p>

      <div className="transform rise-3">
        <div className="transform-heads">
          <span>Before</span>
          <span />
          <span>After</span>
        </div>
        {ROWS.map((row, i) => (
          <Reveal className="transform-row" key={row.was} delay={i * 80}>
            <span className="transform-cell was">
              <IconX width={16} height={16} />
              {row.was}
            </span>
            <span className="transform-arrow">
              <IconArrowRight width={18} height={18} />
            </span>
            <span className="transform-cell now">
              <IconCheck width={16} height={16} />
              {row.now}
            </span>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="muted small">
          Those numbers are from one build at one brand. Your audit will use
          your numbers.
        </p>
        <p className="spaced">
          See what that looks like as a paid engagement on{" "}
          <Link href="/offers">the offers page</Link>, or{" "}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            book a scoping call
          </a>{" "}
          to talk through your setup.
        </p>
      </Reveal>
    </div>
  );
}
