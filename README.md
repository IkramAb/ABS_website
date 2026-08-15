# Autism Bright Start

Marketing site for Autism Bright Start, an ABA therapy center serving children
on the autism spectrum in Minneapolis and the greater Twin Cities.

The site has one job: **help a parent or a referring provider start a referral.**

```bash
npm run dev     # http://localhost:3000
npm run build   # all pages prerender to static HTML
npm run lint
```

## ⚠️ The referral form is not connected yet

`app/actions/submit.ts` has `DELIVERY_CONFIGURED = false`. Both forms validate
properly, then refuse the submission and tell the visitor to call or email
instead. Nothing is stored or sent.

This is deliberate — a referral that looks like it sent but goes nowhere is the
worst thing this site could do. **Phone and email are the working path.**

To go live: wire the Jotform submission inside `submitReferral` / `submitContact`
and flip the flag. Don't point a real domain here until then.

## Editing content

All copy lives in `content/` — you should not need to touch a component to
change wording.

| File | Covers |
|---|---|
| `content/site.ts` | Phone, email, address, hours, nav, footer. Change once, updates everywhere. |
| `content/services.ts` | The six services. Used by **both** Home and Services, so they can never disagree. |
| `content/home.ts` · `about.ts` · `referrals.ts` · `contact.ts` | Per-page copy |

Headlines mark emphasis with asterisks — `Every child *belongs.*` — and the
starred fragment renders in the accent color. That's handled by `RichHeading`
in `components/ui.tsx`; don't hardcode colored spans.

## Photos

See `public/images/README.md` for the exact filenames and sizes.

Any photo that hasn't been supplied falls back to a solid brand-color tile, so
the site looks finished with an empty images folder and you can add photos one
at a time. The check happens at build time in `lib/images.ts`, so **re-run the
build after adding images.**

## Design system

Defined in one `@theme` block in `app/globals.css`.

- **Type** — Bricolage Grotesque (display, 600) and Manrope (body), the pairing
  compared at `/type`. Neither has a true italic, so headline emphasis is
  weight and color — 800 in `tomato` — not a bold italic.
- **Shape** — one rounded rectangle (`--radius-tile`, 28px) for everything:
  photos, trust tiles, cards. The bento grids read as a single surface, and
  color rather than shape does the separating.
- **Color rule** — `ink` is the text color on *every* colored surface. White is
  used **only** on `tomato` (the CTA). Every palette token is documented with
  its contrast ratio against `ink` and clears WCAG AA.
- **Motion** — a rise-in on tiles, the marquee, and the shader wash behind a
  service card. Nothing else. All of it collapses under
  `prefers-reduced-motion`, which is verified behavior, not decoration.
  The shader draws a distinction worth keeping: its **pattern** is painted on
  every card but frozen, and only the **hovered** card animates. A static
  texture isn't motion; ambient movement is, and that's a common sensory
  trigger for the families this site is for — so motion is opted into by
  pointing at a card, never done at the visitor. Under `prefers-reduced-motion`
  the pattern stays and nothing animates. It mounts when the grid scrolls into
  view, keeping ~250KB of WebGL off the critical path. Its colors ramp from
  each tile toward `cream`, so no frame can be darker than the flat tile and
  the `ink` contrast rule holds throughout (worst stop 5.31:1).

The brand mark uses puzzle imagery. That was a deliberate call, made knowing
the symbol is rejected by much of the autistic community. It stays confined to
the logo — photography and illustration elsewhere on the site should not repeat
it; see `public/images/HERO-PROMPTS.md`.

## Deploying

Static output, no runtime environment variables. On Vercel, import the repo and
deploy — no configuration needed. Update `site.url` in `content/site.ts` when
the real domain is set, since sitemap, robots, and OG tags derive from it.
