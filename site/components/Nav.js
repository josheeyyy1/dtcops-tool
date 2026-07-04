import Link from "next/link";
import { BOOKING_URL } from "../lib/constants";
import BrandGlyph from "./BrandGlyph";

export default function Nav() {
  return (
    <div className="nav-wrap">
      <nav className="nav">
        <Link href="/" className="nav-brand">
          <BrandGlyph />
          Joshua Adams
        </Link>
        <div className="nav-links">
          <Link href="/offers">Offers</Link>
          <Link href="/how-it-works">How it works</Link>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta cta-small"
          >
            Book a call
          </a>
        </div>
      </nav>
    </div>
  );
}
