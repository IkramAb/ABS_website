import { PhotoFrame } from "./PhotoFrame";
import { Button, Doodle, Eyebrow, RichHeading, tileBg } from "./ui";
import { hero, heroTiles } from "@/content/home";

/**
 * Centered headline over a bento mosaic.
 *
 * Every cell is the same rounded rectangle, so the grid reads as one surface
 * rather than two competing shapes. Separation comes from color and from
 * content: the two tall slots are photographs, the inner cells are trust
 * signals — which puts insurance and staffing above the fold where an anxious
 * parent is actually scanning for them.
 *
 * Tiles hold one statement and no supporting copy — that restraint is what
 * lets the type run large.
 */

function ShieldCheck() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-9 w-9 shrink-0 text-ink"
      fill="currentColor"
    >
      <path d="M8.2 13.6 4.9 10.3l1.3-1.3 2 2 5.3-5.3 1.3 1.3z" />
      <path
        d="M10 1.7 3 4.6v5c0 4.2 2.9 7.5 7 8.7 4.1-1.2 7-4.5 7-8.7v-5z"
        fillOpacity="0.18"
      />
    </svg>
  );
}

/**
 * Source order is the mobile order (two photos, then full-width bands).
 * `md:order-*` restores the desktop arrangement — grid auto-placement honors
 * `order`, so the four-column layout is unaffected.
 */
const DESKTOP_ORDER = {
  photoChild: "md:order-1",
  tileFirst: "md:order-2",
  tileSecond: "md:order-3",
  photoTherapist: "md:order-4",
  quote: "md:order-5",
} as const;

export function BentoHero() {
  const [photoChild, photoTherapist] = hero.photos;
  const tileOrder = [DESKTOP_ORDER.tileFirst, DESKTOP_ORDER.tileSecond];

  return (
    <section className="relative overflow-hidden pb-20 pt-14 md:pt-20">
      <Doodle
        name="star"
        color="text-sun"
        className="absolute left-[6%] top-24 hidden h-9 w-9 lg:block"
      />
      <Doodle
        name="squiggle"
        color="text-sky"
        className="absolute right-[7%] top-32 hidden h-12 w-12 lg:block"
      />
      <Doodle
        name="sparkle"
        color="text-coral"
        className="absolute left-[12%] top-64 hidden h-10 w-10 xl:block"
      />

      <div className="u-shell">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <RichHeading
            as="h1"
            text={hero.headline}
            className="mt-5 text-hero text-ink"
          />
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/75 sm:text-lg">
            {hero.body}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href={hero.primary.href}>{hero.primary.label}</Button>
            <Button href={hero.secondary.href} variant="secondary">
              {hero.secondary.label}
            </Button>
          </div>
        </div>

        <div className="mt-16 grid auto-rows-[11rem] grid-cols-2 gap-4 sm:auto-rows-[13rem] md:grid-cols-4 lg:auto-rows-[15rem]">
          <PhotoFrame
            src={photoChild.src}
            alt={photoChild.alt}
            color={photoChild.color}
            priority
            className={`anim-rise h-full md:row-span-2 ${DESKTOP_ORDER.photoChild}`}
            sizes="(max-width: 768px) 50vw, 25vw"
          />

          <PhotoFrame
            src={photoTherapist.src}
            alt={photoTherapist.alt}
            color={photoTherapist.color}
            priority
            className={`anim-rise h-full md:row-span-2 ${DESKTOP_ORDER.photoTherapist}`}
            sizes="(max-width: 768px) 50vw, 25vw"
          />

          {heroTiles.map((tile, i) => (
            <div
              key={tile.title}
              className={`u-tile anim-rise col-span-2 flex h-full flex-col justify-end gap-4 rounded-tile ${tileBg(
                tile.color
              )} p-5 sm:p-6 xl:col-span-1 ${tileOrder[i]}`}
              style={{ ["--rise-delay" as string]: `${(i + 1) * 60}ms` }}
            >
              {tile.icon === "shield" && <ShieldCheck />}
              <p className="u-tile-text font-display font-semibold text-ink">
                {tile.title}
              </p>
            </div>
          ))}

          <figure
            className={`anim-rise col-span-2 flex h-full flex-col justify-center rounded-tile bg-ink px-7 py-6 ${DESKTOP_ORDER.quote}`}
          >
            <blockquote className="font-display text-xl font-semibold leading-snug text-cream sm:text-2xl">
              &ldquo;{hero.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-sm text-cream/60">
              {hero.quoteAttribution}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
