import Link from "next/link";

export default function Nav() {
  return (
    <nav className="nav">
      <Link href="/" className="nav-brand">Joshua Adams</Link>
      <div className="nav-links">
        <Link href="/offers">Offers</Link>
        <Link href="/how-it-works">How it works</Link>
        <Link href="/book" className="cta cta-small">Book a call</Link>
      </div>
    </nav>
  );
}
