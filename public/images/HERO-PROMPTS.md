# Hero image prompts

**Two** photos for the homepage mosaic — the other tiles carry trust signals
rather than imagery. Because there are only two, each does a lot of work, and
they sit side by side, so **consistency between them matters as much as either
image.** Generate both in one session.

They are deliberately a pair: **one child alone** (joy, absorption) and **one
child with a clinician at their eye level** (competence, warmth).

Each prompt below is complete — copy one, paste it, generate. Nothing to
assemble.

---

## First: the safe zone

The slot changes shape a lot across screen sizes, and the browser always crops
from the **centre**. Measured from the live layout:

| Screen | Slot renders at | Shape |
|---|---|---|
| 375px | 160 × 176 | near-square |
| 640px | 280 × 208 | **landscape** |
| 768px | 164 × 432 | **very tall** |
| 1280px+ | 276 × 496 | 9:16 |

Because the crop swings from landscape to very tall, **only the middle of your
image survives everywhere.** In a 1080 × 1920 file, everything that matters
must sit inside the central **~730 × 800px** box:

```
   1080 wide
 ┌───────────────────────┐  ← cropped away at 640px
 │                       │
 │   ┌───────────────┐   │
 │   │   SAFE ZONE   │   │  ← face, hands, the action
 │   │   ~730 × 800  │   │
 │   └───────────────┘   │
 │                       │
 └───────────────────────┘  ← cropped away at 640px
   ↑                   ↑
    cropped at 768px (tall)
```

**Subject dead centre, both axes.** Not off to one side, not low in the frame.
The arch mask clips the top two *corners*, not the top centre — so a centred
subject with headroom is fine; just keep nothing important in the upper-left or
upper-right corners.

---

## hero-1 — the anchor image

Should read as **joy and absorption**: a child busy with something she chose.

```
Warm documentary photograph of a four-year-old Black girl sitting
cross-legged on a soft rug in a bright pediatric therapy room, caught
mid-laugh while stacking a wooden ring toy in her lap. She is centred in
the frame on both axes, full head and hands visible, with even space
around her on every side. Cream walls, light-wood furniture, a low
child-height table softly out of focus behind her. She is absorbed in
the toy, not looking at the camera.

Muted, warm palette: cream and oatmeal walls, pale birch wood, soft sage
and dusty blue clothing. No yellow, orange or red anywhere in the frame.

Editorial documentary photography, 50mm lens, soft diffused window light
from one side, shallow depth of field, natural skin tones, fine film
grain. Not HDR, not oversaturated, not a stock photo.

No text, no watermark, no signage, no logos, no puzzle pieces, no
clinical white walls, no medical equipment, no desks, no worksheets.
```

Aspect: `9:16` · export `1080×1920` · save as `public/images/hero/hero-1.jpg`

---

## hero-2 — the credibility image

The eye-level detail is the whole point — it's what "meets your child where
they are" looks like, and the clearest signal of good practice to a parent
*and* a referring pediatrician. **If the therapist ends up standing, or looking
down at the child, regenerate.**

```
Warm documentary photograph of a South Asian woman therapist and a
five-year-old boy building a tower of wooden blocks together on a soft
rug in a bright pediatric therapy room. She is seated on the floor at
his eye level, leaning in; both are looking at the blocks, neither at
the camera. They read as one compact group centred in the middle of the
frame, with even space above and below them. Cream walls, light-wood
furniture.

Muted, warm palette: cream and oatmeal walls, pale birch wood, soft sage
and dusty blue clothing. The blocks may carry colour; keep all clothing
in soft neutrals, no yellow, orange or red.

Editorial documentary photography, 50mm lens, soft diffused window light
from one side, shallow depth of field, natural skin tones, fine film
grain. Not HDR, not oversaturated, not a stock photo.

No text, no watermark, no signage, no logos, no puzzle pieces, no
clinical white walls, no medical equipment, no adult standing over the
child, no adult correcting or restraining the child.
```

Aspect: `9:16` · export `1080×1920` · save as `public/images/hero/hero-2.jpg`

Two people in a 9:16 frame tend to spread out vertically. Keep them as one
compact group in the centre, or the tablet crop will cut one of them in half.

---

## Why the wardrobe rule

The photos sit directly beside bright marigold, coral, green and blue tiles.
Warm clothing in the photos makes the whole row muddy — the neutrals are what
let the tiles carry the colour.

## What separates credible from generic

The default "kids therapy stock photo" look will undercut everything else on
the page:

- **Agency, not compliance.** A child choosing and doing, never being corrected
  or made to sit still. This is what parents who know ABA's history look for.
- **Real materials** — picture cards, sensory swings, therapy balls, playdough,
  tongs, pegboards, stacking toys, foam mats. Not worksheets, not a clipboard.
- **Adults at the child's level**, on the floor. Never standing over.
- **Diversity is specified in the prompts**, deliberately. The site copy commits
  to "a team that reflects the families we care for" — the photos keep or break
  that claim.
- **No puzzle pieces in photography.** The brand mark uses puzzle imagery — a
  deliberate decision, made with the trade-off understood: the symbol is
  rejected by much of the autistic community. That is one considered use in the
  logo. Photographs should not add more of it, which would turn a brand choice
  into a motif running through the whole site.

## Tool notes

- The prompts are plain prose — paste straight into ChatGPT, Midjourney, or
  Firefly. Midjourney users can append `--ar 9:16`.
- **Adobe Firefly** is worth considering: trained on licensed content and
  designed to be commercially safe, which matters for a healthcare provider.
- **Generate at least four of each and pick.** Hands are where these models
  fail, and you only need two keepers.
- **Check hands, eyes and teeth at full size.** A six-fingered child on a
  therapy site destroys credibility instantly.
- If a good image is slightly off-centre, **re-crop to 9:16 yourself** rather
  than regenerating — faster and more reliable.

## If you use real photography instead

Better for trust, and the layout takes real photos with no changes — the same
safe-zone rule applies. Every photograph of a child needs a **signed media
release on file before launch**; see `README.md` in this folder.

---

**After adding images, re-run the build.** The layout checks the filesystem at
build time, so new photos won't appear in an already-built site until rebuilt.

---

## Status — both hero images supplied

`hero/hero-1.jpg` and `hero/hero-2.jpg` are in place. Both were **generated**,
not photographed, so no media release applies — see the note at the end.

Masters are kept outside `public/` (nothing there is served unless it's meant
to be) in **`design/source-images/`**:

| File | What it is |
|---|---|
| `hero-1-original.png` | as generated, untouched |
| `hero-2-original.png` | as generated, untouched |
| `hero-2-warmed-6250k.png` | the graded master `hero-2.jpg` was cut from |

Both were checked against the safe-zone table above by cropping to each slot's
real aspect ratio and inspecting the result. Both survive all four; hands, eyes
and teeth hold up at full size.

**hero-2 was colour-matched to hero-1.** As generated it was noticeably cooler,
and the two sit side by side, so they read as two different rooms. Corrected
with a CoreImage `CITemperatureAndTint` pass — neutral `6500K`, target
`6250K`. Note the direction: *lowering* the target warms the image. Measured on
the carpet, that takes hero-2's R−B from +24.4 to +32.5 against hero-1's +33.4.
If either image is ever regenerated, redo this match or drop it entirely — the
number is specific to this pair.

Two cosmetic flaws were accepted rather than regenerated:

- **hero-2**, at the 768px tall crop only, the back of the boy's head grazes the
  right edge. His face is fully intact. Recentring costs more than it fixes — every
  variant pulls the aspect off 9:16 and starts getting cut vertically instead.
- **hero-2**'s block tower is physically impossible — a cube balanced on a pyramid
  apex. Invisible at render size, but it's the tell if anyone looks closely.

Deliberately **not** upscaled, despite being 941×1672 against the 1080×1920 in
`README.md`. The largest slot renders at 276 CSS px — 552px at 2× DPR — so the
files are already ~1.7× more than they need to be. That 1080 was margin, not a floor.

**Still outstanding:** the eight `services/`, `feature/` and `about/` slots
listed in `README.md`. There are no prompts written for those yet.

## A note on generated people

These are generated children and a generated clinician on a healthcare
provider's site. That sidesteps the media-release requirement above, and
nothing in the surrounding copy claims they are real clients or staff — so the
page is not misleading as it stands. Worth revisiting only if testimonial or
"meet our team" copy is ever placed beside them, where the same images would
start implying something they shouldn't.
