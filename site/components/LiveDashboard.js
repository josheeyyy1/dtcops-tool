"use client";

import { useEffect, useRef, useState } from "react";

const EU_FULL = 612;
const EU_REORDER = 350;

/* Initial frame is mid-story (reorder point just hit) so users without
   JavaScript or with reduced motion still see the point being made. */
const INITIAL = { eu: 342, alert: true, updated: 4 };

function coverWidth(units) {
  return `${Math.max(6, Math.round((units / EU_FULL) * 64))}%`;
}

export default function LiveDashboard() {
  const [eu, setEu] = useState(INITIAL.eu);
  const [alertOn, setAlertOn] = useState(INITIAL.alert);
  const [updated, setUpdated] = useState(INITIAL.updated);
  const stateRef = useRef({ eu: INITIAL.eu, holding: true, holdUntil: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const s = stateRef.current;
    s.holdUntil = performance.now() + 3000;

    const tick = setInterval(() => {
      const now = performance.now();
      if (s.holding) {
        if (now >= s.holdUntil) {
          s.holding = false;
          s.eu = EU_FULL;
          setEu(EU_FULL);
          setAlertOn(false);
        }
        return;
      }
      s.eu = Math.max(EU_REORDER - 12, s.eu - (8 + Math.round(Math.random() * 14)));
      setEu(s.eu);
      if (s.eu <= EU_REORDER) {
        setAlertOn(true);
        s.holding = true;
        s.holdUntil = now + 4500;
      }
    }, 600);

    const clock = setInterval(() => {
      setUpdated((u) => (u >= 9 ? 0 : u + 1));
    }, 1000);

    return () => {
      clearInterval(tick);
      clearInterval(clock);
    };
  }, []);

  const euWarn = eu <= EU_REORDER;

  return (
    <div className="inst" aria-hidden="true">
      <div className="inst-head">
        <span className="inst-title">Stock overview</span>
        <span className="inst-updated">updated {updated}s ago</span>
      </div>

      <div className="inst-cols">
        <span>Region</span>
        <span>Cover</span>
        <span style={{ textAlign: "right" }}>Units</span>
        <span style={{ textAlign: "center" }}>Status</span>
      </div>

      <div className="inst-rows">
        <div className="inst-row">
          <span className="inst-region">UK</span>
          <span className="inst-bar"><i style={{ width: "72%" }} /></span>
          <span className="inst-units">1,284</span>
          <span className="inst-status ok">Healthy</span>
        </div>
        <div className="inst-row">
          <span className="inst-region">EU</span>
          <span className="inst-bar">
            <i className={euWarn ? "warn" : ""} style={{ width: coverWidth(eu) }} />
          </span>
          <span className="inst-units">{eu.toLocaleString("en-GB")}</span>
          <span className={`inst-status ${euWarn ? "warn" : "ok"}`}>
            {euWarn ? "Reorder due" : "Healthy"}
          </span>
        </div>
        <div className="inst-row">
          <span className="inst-region">US</span>
          <span className="inst-bar"><i className="low" style={{ width: "9%" }} /></span>
          <span className="inst-units">96</span>
          <span className="inst-status low">Low stock</span>
        </div>
      </div>

      <div className="inst-alert-slot">
        <div className={`inst-alert ${alertOn ? "on" : ""}`}>
          Reorder point hit: EU
          <span className="mono">draft PO prepared</span>
        </div>
      </div>

      <div className="inst-foot">
        <span className="pulse" />
        Synced hourly from Shopify + 3PLs
      </div>
    </div>
  );
}
