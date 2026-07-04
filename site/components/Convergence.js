"use client";

import { useEffect, useRef } from "react";

/* Scroll-driven: three disagreeing counts converge into one source of truth.
   Progress is written to the --p custom property; CSS does the rest.
   Without JavaScript, or with reduced motion, --p stays at 1 (final state). */
export default function Convergence() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.92;
      const end = vh * 0.42;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="conv" ref={ref} aria-hidden="true">
      <p className="conv-label">Bestseller SKU &middot; units on hand</p>
      <div className="conv-stage">
        <div className="conv-chip c1">
          <span className="conv-src">Shopify</span>
          <span className="conv-num">412</span>
        </div>
        <div className="conv-chip c2">
          <span className="conv-src">3PL portal</span>
          <span className="conv-num">388</span>
        </div>
        <div className="conv-chip c3">
          <span className="conv-src">Spreadsheet</span>
          <span className="conv-num">405</span>
        </div>
        <div className="conv-result">
          <span className="pulse" />
          <span>
            <span className="conv-src">One source of truth</span>
            <span className="conv-num" style={{ display: "block" }}>
              402 units &middot; synced hourly
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
