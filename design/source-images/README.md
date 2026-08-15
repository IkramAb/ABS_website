# Source artwork

Masters kept out of `public/` — anything under `public/` is served, and none of
this should be.

| File | What it is |
|---|---|
| `logo-original.svg` | the supplied brand lockup, untouched |
| `split-logo.mjs` | analyses the original: splits bulb from wordmark, classifies fills |
| `build-logo.mjs` | generates the four shipped variants in `public/images/` |
| `hero-1-original.png` | hero photo 1, as generated |
| `hero-2-original.png` | hero photo 2, as generated |
| `hero-2-warmed-6250k.png` | the graded master `hero-2.jpg` was cut from |

## The logo needs two variants, and why

`logo-original.svg` is an **auto-trace of a bitmap** — 95 paths, no groups, and
75 near-duplicate fill colors where the artist used maybe eight. Two things
follow from that, and both are load-bearing:

**1. The white is not a background you can delete.** There is one full-canvas
`#FEFEFE` plate, which is a true background and is dropped. But the bulb's
interior is also painted — near-white shapes stacked *on top* of solid colored
blobs to knock out the middles. Delete those and the bulb fills in with a solid
blue mass. They have to be painted, so each variant paints them to match the
surface it will sit on. That is what makes the mark read as having no
background.

**2. Colors are classified by luminance, not by value.** There is a clean gap:
the wordmark's near-black green runs 0.131–0.172, and the darkest brand color is
0.514. `build-logo.mjs` splits at 0.30, with wide margin either side. Knockouts
are anything above 0.90.

## Regenerating

```
node design/source-images/build-logo.mjs
```

Writes `logo.svg`, `logo-on-ink.svg`, `logo-mark.svg` and
`logo-mark-on-ink.svg` into `public/images/`. It reads `parsed.json`, which
`split-logo.mjs` produces from the original.

**Rerun this if `--color-cream` or `--color-ink` ever changes** in
`app/globals.css`. Those two hexes are baked into the knockouts; recoloring the
output by hand means finding every near-white path individually.

`app/icon.svg` is the mark re-padded to a square viewBox so browser tabs don't
letterbox it. `app/apple-icon.tsx` and `app/opengraph-image.tsx` read the
shipped files at build time and inline them as data URIs, because Satori cannot
read from `public/`.

Path data is rounded to one decimal — the trace carried seven, which at render
size is far below a pixel. That alone takes the lockup from 135 KB to 68 KB
(22 KB gzipped).
