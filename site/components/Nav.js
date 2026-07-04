import Link from "next/link";
import { BOOKING_URL } from "../lib/constants";

export default function Nav() {
  return (
    <nav className="nav">
      <Link href="/" className="nav-brand">Joshua Adams</Link>
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
  );
}
