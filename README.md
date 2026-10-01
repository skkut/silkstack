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
| Support     | Single call to action: open an issue on GitHub (no contact form) |

## Files

- `index.html` — page structure and copy, plus a `SoftwareApplication` `application/ld+json` block
- `style.css` — futuristic theme (deep space + neon cyan/violet/magenta)
- `script.js` — vanilla JS interactions (particles, tilt, typing, counters, accordion…)
- `assets/` — real screenshots from the app repo (`docs/screenshot-*.webp`, `docs/*.jpg`) and the app icon

## SEO

- Canonical URL, Open Graph, Twitter card and `robots`/`max-image-preview` meta in `<head>`.
- Structured data: a single `SoftwareApplication` block (version, OS, licence, feature list,
  screenshots). There is deliberately no `FAQPage` — Google requires FAQ markup to mirror
  visible Q&A, and the page has no FAQ section, so the block was removed with it.
- `sitemap.xml` `lastmod` should be bumped whenever the page copy changes; it is referenced
  from `robots.txt`. The six `<image:image>` entries are Google's image-sitemap extension:
  each screenshot gets its own title and caption so the app UI can surface in Google Images.
  Every `<image:loc>` must point at a file the page actually references.
- Every `<img>` carries a descriptive `alt` plus `width`/`height` (avoids layout shift on mobile).

### Keywords

The page targets the vocabulary people actually search with, not internal product naming.
Three rules keep it honest and stable:

- **The category words live in the head and the first screen.** The title is
  `SilkStack Image Browser — Local AI Image Viewer for ComfyUI`: brand plus `image browser`,
  `local`, `AI image viewer` and the niche qualifier. The qualifier earns its place — a site
  this size will not outrank IrfanView or XnView for the bare term "image viewer", but it can
  rank for "comfyui image viewer" and "local ai image viewer". `organizer` therefore sits in
  the description rather than the title. Keep the title under 60 characters and the
  description under 160, or Google truncates them.
  Note `<title>` needs `&amp;` for a literal ampersand — that inflation is in the source
  only, so measure the rendered length, not the character count of the file.
- **The H1's last clause is written by `script.js` at typing speed.** A crawler that
  snapshots early, or one that never runs JS, sees only what the markup carries — so the
  `<span class="typed">` has `searchable.` as its literal content. Keep a real word there.
  `prefers-reduced-motion` readers get exactly that word too, so it must read as a sentence.
- **No `best`/`top` superlatives, and no competitor brand names.** Ranking for
  "best image viewer for AI images" comes from owning the category terms and the body copy,
  not from the word "best" — self-awarded superlatives in a title read as spam. And
  **never** target "Image MetaHub": SilkStack is a fork of it, so building traffic on that
  brand is trademark risk, not SEO.

Terms the copy already carries (keep them when editing): `image viewer`, `image browser`,
`image organizer`, `gallery`, `thumbnail grid`, `local`/`offline`/`private`, `ComfyUI`,
`Stable Diffusion` (spelled out — the A1111/Forge/Fooocus abbreviations alone don't match
searches), `semantic search`, `auto-tagging`, `similarity stacks`, `duplicate`, `metadata`,
`prompt`/`seed`/`sampler`/`CFG`, `Windows`/`macOS`/`Linux`, `MP4`/`WEBM`/`GIF`.

## Customising

- **Product copy** — edit `index.html`; content is sourced from the app's README and `docs/`.
  The AI section describes v2.3.0 (semantic search, LLM auto-tagging, similarity stacks,
  master AI toggle, model/VRAM management) — refresh it when those change.
- **Screenshots** — `assets/` holds the current ones; regenerate them from `SilkStack-Image-Browser/docs/` when the app changes.
  The AI shots are copied from the app repo's `docs/*.jpg` (renamed to `ai-*.jpg`); keep the
  `width`/`height` attributes in `index.html` in step with the real pixel sizes.
- **Premium license link** — the "Get a license" button points at the Gumroad purchase page (`silkstackbrowser.gumroad.com/l/images`). Update it in the Premium section of `index.html` if the storefront URL changes.
- **Hero background** — a canvas particle network only (no video), so the page loads fast; tune its density in `script.js` (particle count formula in section 1).
- **Support** — deliberately has no contact form and no FAQ: the section points at
  `github.com/skkut/SilkStack-Image-Browser/issues/new` and nothing else, so there is no
  inbox to monitor and every answer stays searchable. Update the two issue links in the
  Support section of `index.html` if the repository moves.
- **Privacy wording** — the anonymous usage ping is disclosed exactly once, as a small
  footer line; keep it in step with the app README's "License, privacy & offline use"
  section. Do not reintroduce absolute claims — the old "no telemetry" line was removed
  from both the page copy and the `application/ld+json` block — and never document *how*
  to block or disable the endpoint.
