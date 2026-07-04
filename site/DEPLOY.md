# Deploying the site

Next.js app (App Router), four static pages: Home, Offers, How it works,
Book a call. Prices, before/after metrics, and contact details are already
filled in with the current recommended values (see `../positioning/offers.md`
for the pricing reasoning) — change them here and there together if you
land on different numbers.

Every "book a call" CTA (nav, home, offers, how-it-works, and the book page
itself) points to the real Google Calendar scheduling link, set once in
`lib/constants.js` as `BOOKING_URL`. Change the link there if it ever moves
— nothing else needs editing.

## Run locally

```
cd site
npm install
npm run dev
```

## Deploy (Vercel)

1. Push this repo to GitHub (already done: github.com/josheeyyy1/dtcops-tool).
2. [vercel.com/new](https://vercel.com/new) → import the repo.
3. **Set Root Directory to `site`** — the repo root also holds the
   positioning/audit/asset docs, which aren't part of the deployable app.
4. Framework preset: Next.js (auto-detected once Root Directory is set).
   No other config needed — `npm install` and `npm run build` run
   automatically.
5. Deploy. Every push to `main` redeploys automatically.
6. Custom domain: add in Vercel dashboard → Domains. Suggest a plain
   firstname-lastname or brand domain.
