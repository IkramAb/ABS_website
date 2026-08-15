# Images

Drop photos in at these exact paths and they appear automatically. Until a file
exists, its slot renders as a solid brand-color tile — the page still looks
finished, so you can add photos one at a time.

**`lib/images.ts` checks the filesystem at build time and caches the result**,
so a new photo will not appear in an already-built site until you rebuild.

Alt text is written per slot in `content/*.ts` — update it there if a photo
shows something different from what's described.

## Two treatments

The site uses photographs in two different ways, and which one a slot uses
decides what you need to supply.

**Framed** (`components/PhotoFrame.tsx`) — the photo fills a rounded rectangle
and is centre-cropped to fit. Used wherever the *room* is the point: the
therapy space and the real materials are what make a service page credible.
Supply a normal photograph.

**Cutout** (`components/CutoutPhoto.tsx`) — the subject is cut out of its
background and stands in front of a brand-colour blob, overhanging its edge.
Used where a *person* is the message. Supply a **PNG with alpha**, cropped
tight to the subject: a cutout that keeps a transparent margin renders smaller
than its box and stops overhanging, which kills the effect.

`design/source-images/photo-tools/` holds the scripts used to produce both —
subject-lifting, colour grading, and the blob path generator.

## Sizes

Every slot is landscape. These are measured from the live layout at 1512px, not
estimated:

| Slot | Treatment | Renders at | Supply |
|---|---|---|---|
| `hero/hero-1.jpg` | framed | 276 × 496 (9:16) | 9:16 tall, ≥1080 × 1920 |
| `hero/hero-2.jpg` | framed | 276 × 496 (9:16) | 9:16 tall, ≥1080 × 1920 |
| `services/<slug>.jpg` | framed | 668 × 480 (1.39:1) | 3:2 landscape, ≥1400 wide |
| `feature/why-families-choose-us.png` | **cutout** | 668 × 512 | PNG + alpha, tight crop |
| `about/about-hero.png` | **cutout** | 668 × 544 | PNG + alpha, tight crop |

Service filenames match the page URLs: `early-intensive-aba`,
`communication-social-skills`, `home-in-clinic-support`,
`parent-caregiver-support`, `occupational-therapy`,
`school-iep-collaboration`.

**Aim for ~2× the rendered height.** The current photos are 800px against a
960–1088px ideal, so they are slightly soft on retina — acceptable, but supply
more if you have it.

## The safe zone is horizontal

Framed slots **centre-crop, and the crop direction flips with the viewport**:

- at 1512px the slot is **1.39:1** and crops the **sides**
- at 768px the grid collapses to one column, the slot becomes **1.83:1**, and
  it crops the **top and bottom** instead

So a subject can survive desktop and still lose the top of a head on a tablet.
Keep the subject centred on both axes with even breathing room, and check both
widths before calling a photo done. Do not pre-crop to the desktop ratio —
that only makes the tablet crop worse.

The hero pair is stricter again; see `HERO-PROMPTS.md`.

## Two symbols, on purpose

The site carries both the **puzzle piece** (in the logo) and the
**neurodiversity infinity**. Those sit on opposite sides of a live debate in
the autism community, so this is written down as a decision rather than left
looking like an oversight.

- The logo was supplied with puzzle imagery and kept as designed.
- The infinity appears as a line doodle on photo corners, and once in full
  colour on `/about` (`infinity-mark.svg`), where the story talks about
  identity.

The doodle version **must stay single-colour** — it's drawn with
`currentColor` in `components/ui.tsx` so it inherits the brand palette per
placement. A multi-colour version can only be an image asset, which is what
`infinity-mark.svg` is. Both are provisional pending supplied artwork.

Use the infinity on photographs and identity moments. Don't add it to the
general doodle rotation alongside the stars and squiggles — repeating a
meaningful symbol as page furniture turns it into texture.

## Consent and licensing

Two different rules, depending on where a photo came from.

**Commissioned photography** — every photo of a child needs a **signed media
release on file** before the site goes live.

**Licensed stock** — the model release sits with the vendor, not with the
centre, so no separate release is collected. Keep the licence records instead,
and confirm the licence covers commercial use by a healthcare provider. The
photos currently in these slots are licensed stock; originals are archived in
`design/source-images/photos-original/`.
