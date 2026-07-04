# Deploying the site

Single static file, no build step.

## Before deploying (blocking)

Search `index.html` for `class="todo"`: every match is a placeholder styled
bright yellow on the page, so nothing slips out unnoticed. Replace:

1. Before/after metrics (confirm the ~40% and stock-out numbers from your
   real build, or soften the claim)
2. The three prices (your DECISION, see `../positioning/offers.md`)
3. Booking link (Calendly/Cal.com, 30-min event named "Scoping call")
4. Contact email
5. Remove the `.todo` CSS rule once all placeholders are gone

## Deploy (Vercel)

- Dashboard: drag the `site/` folder into vercel.com/new. Done.
- CLI (if installed): `vercel deploy site/ --prod`
- Custom domain: add in Vercel dashboard → Domains. Suggest a plain
  firstname-lastname or brand domain; nothing clever.

Any static host works the same (Netlify, Cloudflare Pages, GitHub Pages).
