# Red Hive Digital — website

Marketing site for Red Hive Digital (custom web apps, mobile apps & SaaS).
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP (ScrollTrigger, SplitText) · Lenis · three.js

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Builds use webpack (`--webpack`) and plain `next.config.mjs` so they work on hosts with an old glibc
(e.g. Hostinger shared Node hosting), where Next falls back to its WebAssembly compiler.

## Environment

Copy `.env.example` to `.env` (or set the variables in your hosting panel):

- `NEXT_PUBLIC_SITE_URL` — canonical URL used for SEO, sitemap and Open Graph.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO` — the contact form emails inquiries through SMTP.
  Without them the form shows a friendly error with the email address.

## Where to edit content

| What | File |
| --- | --- |
| Company info, phones, email, social links, stats | `src/data/site.ts` |
| Services (11 pages) | `src/data/services.ts` |
| Technologies (35 pages) | `src/data/technologies-1/2/3.ts` |
| Industries (8 pages) | `src/data/industries.ts` |
| Case studies (**placeholders** — replace with real projects) | `src/data/work.ts` |
| Blog articles | `src/data/posts.ts` |
| Testimonials | `src/data/testimonials.ts` |
| Process, engagement models, "why us" | `src/data/process.ts` |
| Menus | `src/data/nav.ts` |

Adding an entry to a data file automatically creates its page, adds it to the sitemap and adds SEO metadata + JSON-LD.

## SEO

Per-page titles/descriptions/canonicals, Open Graph + Twitter cards (`public/og.png`), JSON-LD
(Organization, WebSite, Service, BreadcrumbList, FAQPage, BlogPosting), `sitemap.xml`, `robots.txt`
and a web manifest. All pages are statically pre-rendered.

## Design & motion

Light editorial base (`theme-light`) with dark sections (`theme-dark`); the header adapts to whichever is beneath it.

- `src/components/three/HiveScene.tsx` — interactive 3D honeycomb (home hero, about banner)
- `src/components/motion/Motion.tsx` — scroll motion via data attributes: `data-reveal`, `data-split`, `data-clip`,
  `data-scrub-text`, `data-parallax`, `data-counter`, `data-draw`
- `SmoothScroll.tsx` (Lenis + ScrollTrigger), `Cursor.tsx`, `Magnetic.tsx`, `VelocityMarquee.tsx`
- `ServicesList.tsx` — typographic list with cursor-following preview

All motion respects `prefers-reduced-motion`. Replace `public/logo.png` / `public/logo-dark.png` with higher-resolution
(or SVG) versions of the logo when available.
