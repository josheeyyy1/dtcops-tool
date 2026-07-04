import Link from "next/link";
import { BOOKING_URL } from "../lib/constants";
import BrandGlyph from "./BrandGlyph";

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <div className="footer-brand">
            <BrandGlyph size={20} />
            Joshua Adams
          </div>
          <p style={{ marginTop: "12px" }}>
            Operations automation for DTC supplement brands &middot; UK based,
            working across UK, EU and US.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/offers">Offers</Link>
          <Link href="/how-it-works">How it works</Link>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a call
          </a>
        </div>
      </div>
    </footer>
  );
}
