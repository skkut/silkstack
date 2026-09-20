# silkstack.github.io

One-pager webpage for the **SilkStack Image Browser** — the local image browser for
AI-generated images ([github.com/skkut/SilkStack-Image-Browser](https://github.com/skkut/SilkStack-Image-Browser)).
Deployed automatically to **https://skkut.github.io/silkstack** from the `main` branch.

## Sections

| Section     | Content                                                    |
|-------------|------------------------------------------------------------|
| Hero        | Particle network, typed headline, holographic desktop-window mockup, scrolling marquee strip |
| About       | Real product story, stats counters, parallax screenshot with floating chips |
| Features    | 6 interactive 3D-tilt cards (real features from the README/docs) |
| AI          | Semantic search / auto-tagging / similarity stacks cards, annotated AI screenshots, model + VRAM control, AI stats |
| Showcase    | Real app screenshots in a terminal frame + screenshot strip |
| Premium     | Community (free, MPL-2.0) vs Premium (one-time license)    |
| Support     | FAQ, contact form, links to Issues / Releases / Docs / License |

## Files

- `index.html` — page structure and copy, plus two `application/ld+json` blocks
  (`SoftwareApplication` + `FAQPage`)
- `style.css` — futuristic theme (deep space + neon cyan/violet/magenta)
- `script.js` — vanilla JS interactions (particles, tilt, typing, counters, accordion…)
- `assets/` — real screenshots from the app repo (`docs/screenshot-*.webp`, `docs/*.jpg`) and the app icon

## SEO

- Canonical URL, Open Graph, Twitter card and `robots`/`max-image-preview` meta in `<head>`.
- Structured data: `SoftwareApplication` (version, OS, licence, feature list, screenshots)
  and `FAQPage` mirroring the visible FAQ — **keep the two in sync** when the FAQ copy changes.
- `sitemap.xml` `lastmod` should be bumped whenever the page copy changes; it is referenced
  from `robots.txt`.
- Every `<img>` carries a descriptive `alt` plus `width`/`height` (avoids layout shift on mobile).

## Customising

- **Product copy** — edit `index.html`; content is sourced from the app's README and `docs/`.
  The AI section describes v2.3.0 (semantic search, LLM auto-tagging, similarity stacks,
  master AI toggle, model/VRAM management) — refresh it when those change.
- **Screenshots** — `assets/` holds the current ones; regenerate them from `SilkStack-Image-Browser/docs/` when the app changes.
  The AI shots are copied from the app repo's `docs/*.jpg` (renamed to `ai-*.jpg`); keep the
  `width`/`height` attributes in `index.html` in step with the real pixel sizes.
- **Premium license link** — the "Get a license" button points at the Gumroad purchase page (`silkstackbrowser.gumroad.com/l/images`). Update it in the Premium section of `index.html` if the storefront URL changes.
- **Hero background** — a canvas particle network only (no video), so the page loads fast; tune its density in `script.js` (particle count formula in section 1).
- **Contact form** — demo only; it shows a toast and sends nothing. Wire `#contactForm` to your own endpoint.
