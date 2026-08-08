# silkstack.github.io

Futuristic one-pager for the **SilkStack Image Browser** — the local image browser for
AI-generated images ([github.com/skkut/SilkStack-Image-Browser](https://github.com/skkut/SilkStack-Image-Browser)).
Deployed automatically to **https://silkstack.github.io** from the `main` branch.

## Sections

| Section     | Content                                                    |
|-------------|------------------------------------------------------------|
| Hero        | Particle network, background video, typed headline, holographic desktop-window mockup |
| About       | Real product story, stats counters, parallax screenshot with floating chips |
| Features    | 6 interactive 3D-tilt cards (real features from the README/docs) |
| Showcase    | Real app screenshots in a terminal frame + screenshot strip |
| Premium     | Community (free, MPL-2.0) vs Premium (one-time license)    |
| Support     | FAQ, contact form, links to Issues / Releases / Docs / License |

## Files

- `index.html` — page structure and copy
- `style.css` — futuristic theme (deep space + neon cyan/violet/magenta)
- `script.js` — vanilla JS interactions (particles, tilt, typing, counters, accordion…)
- `assets/` — real screenshots from the app repo (`docs/screenshot-*.webp`) and the app icon

## Customising

- **Product copy** — edit `index.html`; content is sourced from the app's README and `docs/`.
- **Screenshots** — `assets/` holds the current ones; regenerate them from `SilkStack-Image-Browser/docs/` when the app changes.
- **Premium license link** — the "Get a license" button points at GitHub Issues. Replace with your Gumroad purchase URL when you have one (see `src/services/licenseService.ts` in the app repo).
- **Videos** — each `<video>` has a fallback chain of `<source>` elements; the hero uses stock abstract footage, swap in your own MP4s or the app's screen recording.
- **Contact form** — demo only; it shows a toast and sends nothing. Wire `#contactForm` to your own endpoint.
