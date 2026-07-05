"use client";

import { useState } from "react";
import { BOOKING_URL } from "../lib/constants";

/* All numbers mirror the live demo base (fictional home fragrance brand).
   The maths shown in the expanded rows is the same formula chain the real
   build runs in Airtable: reorder point, trigger check, suggested order. */

const QUEUE = [
  {
    sku: "CNDL-LAV-220",
    name: "Lavender Candle 220g",
    loc: "EU warehouse, Venlo",
    velocity: 11,
    lead: 35,
    buffer: 5,
    safety: 14,
    targetCover: 60,
    available: 342,
    onOrder: 0,
    rop: 594,
    cover: 31,
    caseSize: 12,
    moq: 500,
    suggested: 768,
  },
  {
    sku: "SOAP-CIT-250",
    name: "Citrus Hand Soap 250ml",
    loc: "US warehouse, Columbus",
    velocity: 6,
    lead: 28,
    buffer: 7,
    safety: 21,
    targetCover: 60,
    available: 144,
    onOrder: 0,
    rop: 336,
    cover: 24,
    caseSize: 24,
    moq: 600,
    suggested: 600,
  },
];

const OVERVIEW = [
  { key: "CNDL-LAV-220 · UK", available: 1222, cover: 87, status: "ok", label: "Healthy" },
  { key: "CNDL-LAV-220 · EU", available: 342, cover: 31, status: "low", label: "Reorder due" },
  { key: "CNDL-LAV-220 · US", available: 96, cover: 11, status: "warn", label: "Watch", note: "600 inbound, PO in transit" },
  { key: "CNDL-CED-220 · UK", available: 796, cover: 100, status: "ok", label: "Healthy" },
  { key: "DIFF-OUD-100 · EU", available: 210, cover: 19, status: "warn", label: "Watch", note: "400 inbound, PO placed" },
  { key: "SOAP-CIT-250 · UK", available: 904, cover: 75, status: "ok", label: "Healthy" },
  { key: "SOAP-CIT-250 · US", available: 144, cover: 24, status: "low", label: "Reorder due" },
  { key: "RSPR-LIN-150 · EU", available: 256, cover: 43, status: "ok", label: "Healthy", note: "350 inbound, PO late" },
];

const TREND = [
  { week: "8 Jun", value: 51600, low: 0 },
  { week: "15 Jun", value: 49700, low: 0 },
  { week: "22 Jun", value: 47800, low: 2 },
  { week: "29 Jun", value: 45900, low: 2 },
];

const TABS = [
  { id: "queue", label: "Reorder queue" },
  { id: "overview", label: "Stock overview" },
  { id: "trend", label: "Weekly trend" },
];

function TrendChart() {
  const xs = [70, 210, 350, 490];
  const min = 45900;
  const span = 51600 - min;
  const y = (v) => 140 - ((v - min) / span) * 104;
  const points = TREND.map((t, i) => `${xs[i]},${y(t.value).toFixed(1)}`).join(" ");
  return (
    <svg
      viewBox="0 0 560 232"
      className="demo-chart"
      role="img"
      aria-label="Four weekly snapshots: stock value falling from £51,600 to £45,900 while SKUs below reorder point rise from zero to two"
    >
      <line x1="40" y1="172" x2="520" y2="172" stroke="var(--line)" strokeWidth="1" />
      <polyline
        points={points}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {TREND.map((t, i) => (
        <g key={t.week}>
          <circle cx={xs[i]} cy={y(t.value)} r="4" fill="var(--accent)" />
          <text x={xs[i]} y={y(t.value) - 12} textAnchor="middle" className="demo-chart-value">
            £{(t.value / 1000).toFixed(1)}k
          </text>
          {t.low > 0 && (
            <>
              <rect
                x={xs[i] - 13}
                y={172 - t.low * 14}
                width="26"
                height={t.low * 14}
                rx="3"
                fill="var(--warn)"
                opacity="0.75"
              />
              <text
                x={xs[i]}
                y={172 - (t.low * 14) / 2 + 3.5}
                textAnchor="middle"
                className="demo-chart-low-inside"
              >
                {t.low}
              </text>
            </>
          )}
          <text x={xs[i]} y="192" textAnchor="middle" className="demo-chart-week">
            {t.week}
          </text>
        </g>
      ))}
      <text x="40" y="220" className="demo-chart-key">
        Line: stock value tied up. Bars: SKUs below reorder point.
      </text>
    </svg>
  );
}

function QueueRow({ row }) {
  const [open, setOpen] = useState(false);
  const elt = row.lead + row.buffer;
  const targetUnits = row.velocity * (elt + row.targetCover);
  const gap = targetUnits - row.available - row.onOrder;
  const cases = Math.ceil(gap / row.caseSize);
  return (
    <div className={`demo-q ${open ? "open" : ""}`}>
      <button
        type="button"
        className="demo-q-row"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className="demo-q-sku mono">{row.sku}</span>
        <span className="demo-q-loc">{row.loc}</span>
        <span className="demo-q-cover mono">{row.cover}d cover</span>
        <span className="inst-status low">Reorder due</span>
        <svg
          className="demo-q-chev"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div className="demo-math-wrap">
        <div className="demo-math">
          <div className="demo-step">
            <span className="demo-step-label">1. Reorder point</span>
            <span className="mono">
              {row.velocity}/day × ({elt}d lead + {row.safety}d safety) = {row.rop} units
            </span>
          </div>
          <div className="demo-step">
            <span className="demo-step-label">2. Trigger</span>
            <span className="mono">
              {row.available} available + {row.onOrder} inbound &lt; {row.rop}, so it flags
            </span>
          </div>
          <div className="demo-step">
            <span className="demo-step-label">3. Suggested order</span>
            <span className="mono">
              top up to {row.targetCover}d cover = {gap} units, {cases} cases of {row.caseSize}
              {row.suggested > cases * row.caseSize
                ? `, lifted to supplier MOQ of ${row.moq}`
                : ""}{" "}
              = {row.suggested} units
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DemoExplorer() {
  const [tab, setTab] = useState("queue");
  return (
    <div className="demo">
      <div className="demo-head">
        <div className="demo-tabs" role="tablist" aria-label="Demo views">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={`demo-tab ${tab === t.id ? "active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <span className="demo-live">
          <span className="pulse" />
          demo data
        </span>
      </div>

      {tab === "queue" && (
        <div className="demo-panel" role="tabpanel">
          <p className="demo-hint">
            Two SKU locations are below their reorder point this morning. Click
            a row and it shows its working.
          </p>
          {QUEUE.map((row) => (
            <QueueRow key={row.sku} row={row} />
          ))}
        </div>
      )}

      {tab === "overview" && (
        <div className="demo-panel" role="tabpanel">
          <div className="demo-o-cols mono">
            <span>SKU · Region</span>
            <span style={{ textAlign: "right" }}>Available</span>
            <span style={{ textAlign: "right" }}>Cover</span>
            <span style={{ textAlign: "center" }}>Status</span>
          </div>
          {OVERVIEW.map((r) => (
            <div className="demo-o-row" key={r.key}>
              <span className="demo-o-key mono">
                {r.key}
                {r.note && <span className="demo-o-note">{r.note}</span>}
              </span>
              <span className="mono" style={{ textAlign: "right" }}>
                {r.available.toLocaleString("en-GB")}
              </span>
              <span className="mono" style={{ textAlign: "right" }}>{r.cover}d</span>
              <span className={`inst-status ${r.status}`}>{r.label}</span>
            </div>
          ))}
          <p className="demo-hint" style={{ marginTop: "12px" }}>
            Note the US candle: 11 days of cover but not flagged, because 600
            units are already on a PO. The logic nets off inbound stock so you
            never order twice.
          </p>
        </div>
      )}

      {tab === "trend" && (
        <div className="demo-panel" role="tabpanel">
          <TrendChart />
          <p className="demo-hint">
            Four weekly snapshots, written automatically every Monday. Stock
            value drifting down while low-stock SKUs tick up is the pattern
            that costs you sales in month three.
          </p>
        </div>
      )}

      <div className="demo-foot">
        <p>
          Invented numbers, fictional brand. Your build runs the same logic on
          your SKUs, your lead times, your warehouses.
        </p>
        <a className="cta" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
          Book a scoping call
        </a>
      </div>
    </div>
  );
}
