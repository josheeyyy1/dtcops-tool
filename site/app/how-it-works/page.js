import Link from "next/link";

export const metadata = {
  title: "How it works",
  description:
    "Built in-house first at a supplements brand shipping UK, EU and US, before being packaged for other brands.",
};

export default function HowItWorksPage() {
  return (
    <>
      <h1>I built this in-house first</h1>
      <p>
        Before selling this, I built it as the ops lead at a supplements
        brand shipping across the UK, EU and US from multiple 3PLs. Same
        problem you have, same tools I now deploy.
      </p>

      <div className="beforeafter">
        <div>
          <h3>Before</h3>
          <ul>
            <li>Stock counts in three systems that disagreed</li>
            <li>Reorders triggered by low-bin emails and gut feel</li>
            <li>Manual reconciliation eating hours every week</li>
            <li>Recurring stock-outs on hero SKUs</li>
          </ul>
        </div>
        <div>
          <h3>After</h3>
          <ul>
            <li>One source of truth, synced hourly, all warehouses</li>
            <li>Per-SKU, per-region reorder points, flagged automatically</li>
            <li>Manual ops work down ~40%</li>
            <li>Hero-SKU stock-outs: zero</li>
          </ul>
        </div>
      </div>
      <p className="muted">
        Those numbers are from one build at one brand. Your audit will use
        your numbers.
      </p>

      <p className="spaced">
        See what that looks like as a paid engagement on{" "}
        <Link href="/offers">the offers page</Link>, or{" "}
        <Link href="/book">book a scoping call</Link> to talk through your
        setup.
      </p>
    </>
  );
}
