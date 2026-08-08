# SilkStack — github.io

A futuristic, interactive one-pager for the SilkStack app. Deployed automatically to
**https://silkstack.github.io** from the `main` branch.

## Sections

| Section     | Content                                              |
|-------------|------------------------------------------------------|
| Hero        | Animated particle network, background video, typed headline, holographic phone |
| About       | Story, stats counters, parallax image with floating chips |
| Features    | 6 interactive 3D-tilt cards                          |
| Showcase    | Playable interface demo video in a terminal frame    |
| Premium     | 3 pricing tiers with monthly/yearly toggle           |
| Support     | FAQ accordion, contact form, support channels        |

## Files

- `index.html` — page structure and copy
- `style.css` — futuristic theme (deep space + neon cyan/violet/magenta)
- `script.js` — vanilla JS interactions (particles, tilt, typing, counters, accordion…)

## Customising

- **Copy/branding** — edit the text in `index.html` (brand: SilkStack).
- **Videos** — each `<video>` has a fallback chain of `<source>` elements; swap in your own MP4 URLs. The hero video is at `#heroVideo`, the showcase at `#showcaseVideo`.
- **Images** — placeholder photos come from picsum.photos; replace the `src` attributes with your own.
- **Plans & prices** — `#premium` section; prices are wired to the toggle via `data-monthly` / `data-yearly` attributes.
- **Contact form** — demo only; it shows a toast and sends nothing. Wire `#contactForm` to your own endpoint.
