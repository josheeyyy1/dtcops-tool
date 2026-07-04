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
        href="mailto:joshuaadams91@gmail.com?subject=Scoping%20call"
      >
        Email me to book a call
      </a>
      <p className="muted spaced">
        Reply with a couple of times that suit and I'll confirm.
      </p>
    </>
  );
}
