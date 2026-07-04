# Deploying the site

Single static file, no build step.

## Current state

Prices (£2,000 / £9,500 / £1,500pm), the before/after metrics, and contact
details are filled in with recommended values — see
`../positioning/offers.md` for the pricing reasoning. Change the numbers
here and there together if you land on different figures.

The "book a call" CTA currently points to a `mailto:` link, not a real
scheduler. That's a deliberate stopgap: nothing to configure, it works
today. One real task before or shortly after launch:

- **Set up a scheduler** (Calendly or Cal.com, free tier, one 30-min event
  named "Scoping call") and swap the `href="mailto:..."` on the button in
  `index.html` for the booking link. A real calendar removes a back-and-forth
  email and looks more finished, but it isn't blocking send.

## Deploy (Vercel)

- Dashboard: drag the `site/` folder into vercel.com/new. Done.
- CLI (if installed): `vercel deploy site/ --prod`
- Custom domain: add in Vercel dashboard → Domains. Suggest a plain
  firstname-lastname or brand domain; nothing clever.

Any static host works the same (Netlify, Cloudflare Pages, GitHub Pages).
