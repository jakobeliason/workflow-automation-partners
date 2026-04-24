# Workflow Automation Partners

Landing page for Workflow Automation Partners — intelligent automation for service
businesses across the Southeast.

Single-file static site. Tailwind CSS via CDN. No build step.

## Local preview

```bash
python3 -m http.server 3001
# open http://localhost:3001
```

Or just open `index.html` directly in a browser.

## Deploy

Deploys as a static site on Vercel (or Netlify, Cloudflare Pages, GitHub Pages,
etc.). No build configuration required — Vercel auto-detects `index.html`.

## Editing

Everything lives in `index.html`. To swap:

- **Video**: Replace the VSL placeholder block in the hero (look for `VSL EMBED
  SLOT` comment) with a YouTube, Vimeo, or Wistia iframe.
- **Calendly**: Update the `data-url` on the `.calendly-inline-widget` div in
  the contact section.
- **Copy**: Edit inline — no CMS, no build step, just save and refresh.
- **Brand colors**: Update the `tailwind.config` block near the top of the file
  (`brand`, `accent`, `ink`, `ink2`).
