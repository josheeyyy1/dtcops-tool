import { BOOKING_URL } from "../../lib/constants";

export const metadata = {
  title: "Book a scoping call",
  description: "Thirty minutes, free, no pitch.",
};

export default function BookPage() {
  return (
    <>
      <h1>Book a scoping call</h1>
      <p>
        Thirty minutes, free, no pitch. I'll ask how stock currently
        moves through your business and tell you honestly whether an audit
        is worth your money. If your setup is single-warehouse and working,
        I'll say so and save us both the time.
      </p>
      <a
        className="cta"
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Book a call
      </a>
      <p className="muted spaced">
        Pick a time that suits, I'll confirm by email.
      </p>
    </>
  );
}
