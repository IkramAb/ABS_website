import type { Metadata } from "next";
import {
  Fraunces,
  Playfair_Display,
  Outfit,
  Bricolage_Grotesque,
  Plus_Jakarta_Sans,
  Manrope,
} from "next/font/google";

/**
 * TEMPORARY comparison page. Three display pairings on identical real content,
 * so the choice is made by looking rather than by description.
 *
 * Delete this route once a pairing is picked.
 */

export const metadata: Metadata = {
  title: "Type specimen",
  robots: { index: false, follow: false },
};

// style must include "italic" — next/font loads only "normal" by default, and
// without it the browser fakes an oblique by slanting the roman.
const fraunces = Fraunces({
  variable: "--spec-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const playfair = Playfair_Display({
  variable: "--spec-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--spec-outfit",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--spec-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--spec-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--spec-manrope",
  subsets: ["latin"],
  display: "swap",
});

type Variant = {
  id: string;
  label: string;
  displayName: string;
  bodyName: string;
  note: string;
  displayVar: string;
  bodyVar: string;
  italicEmphasis: boolean;
  /** Roman weight. KinderNest runs a light roman… */
  displayWeight: number;
  /** …against a heavier italic. That contrast is the whole effect. */
  emphasisWeight: number;
  tracking: string;
  leading: number;
};

const VARIANTS: Variant[] = [
  {
    id: "A",
    label: "A — Playfair Display",
    displayName: "Playfair Display",
    bodyName: "Plus Jakarta Sans",
    note: "Closest to KinderNest — high stroke contrast, thin hairlines. Light roman 400 against bold italic 700.",
    displayVar: "var(--spec-playfair)",
    bodyVar: "var(--spec-jakarta)",
    italicEmphasis: true,
    displayWeight: 400,
    emphasisWeight: 700,
    tracking: "-0.01em",
    leading: 1.06,
  },
  {
    id: "A2",
    label: "A2 — Fraunces",
    displayName: "Fraunces",
    bodyName: "Plus Jakarta Sans",
    note: "Same idea, warmer and softer letterforms. Roman 400, italic 600 — noticeably less contrast than Playfair.",
    displayVar: "var(--spec-fraunces)",
    bodyVar: "var(--spec-jakarta)",
    italicEmphasis: true,
    displayWeight: 400,
    emphasisWeight: 600,
    tracking: "-0.01em",
    leading: 1.06,
  },
  {
    id: "B",
    label: "B — Confident Geometric",
    displayName: "Outfit",
    bodyName: "Plus Jakarta Sans",
    note: "The Applebury direction, lightened to 500. No italic — emphasis is color + weight.",
    displayVar: "var(--spec-outfit)",
    bodyVar: "var(--spec-jakarta)",
    italicEmphasis: false,
    displayWeight: 500,
    emphasisWeight: 700,
    tracking: "-0.03em",
    leading: 0.98,
  },
  {
    id: "C",
    label: "C — Characterful Grotesque",
    displayName: "Bricolage Grotesque",
    bodyName: "Manrope",
    note: "Least templated of the four, lightened to 600. Playful without being bubbly.",
    displayVar: "var(--spec-bricolage)",
    bodyVar: "var(--spec-manrope)",
    italicEmphasis: false,
    displayWeight: 600,
    emphasisWeight: 800,
    tracking: "-0.03em",
    leading: 0.98,
  },
];

/** Same emphasis parser as the live site, plus optional italic. */
function Head({
  text,
  variant,
  size,
  className = "",
  as: Tag = "h2",
}: {
  text: string;
  variant: Variant;
  size: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const parts = text.split(/\*([^*]+)\*/g);
  return (
    <Tag
      className={className}
      style={{
        fontFamily: variant.displayVar,
        fontWeight: variant.displayWeight,
        fontSize: size,
        lineHeight: variant.leading,
        letterSpacing: variant.tracking,
        textWrap: "balance",
      }}
    >
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span
            key={i}
            style={{
              color: "var(--color-tomato)",
              fontStyle: variant.italicEmphasis ? "italic" : "normal",
              fontWeight: variant.emphasisWeight,
            }}
          >
            {part}
          </span>
        ) : (
          part
        )
      )}
    </Tag>
  );
}

function Panel({ variant }: { variant: Variant }) {
  return (
    <section
      data-variant={variant.id}
      className="border-t-4 border-ink/10 px-5 py-20 sm:px-8"
      style={{ fontFamily: variant.bodyVar }}
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Label */}
        <div className="mb-14 flex flex-wrap items-baseline gap-x-5 gap-y-2 rounded-tile bg-ink px-7 py-5 text-cream">
          <span className="font-display text-2xl font-semibold">
            {variant.label}
          </span>
          <span className="text-sm text-cream/70">
            Display: <strong data-display-name>{variant.displayName}</strong> ·
            Body: <strong>{variant.bodyName}</strong>
          </span>
          <span className="w-full text-sm text-cream/60">{variant.note}</span>
        </div>

        {/* Hero */}
        <p
          className="u-label text-tomato"
          style={{ fontFamily: variant.bodyVar }}
        >
          ABA Therapy · Minneapolis, MN
        </p>
        <Head
          as="h1"
          text="Every child *belongs.*"
          variant={variant}
          size="clamp(3rem, 7vw, 5.75rem)"
          className="mt-5 text-ink"
        />
        <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.7] text-ink/75">
          Personalized, evidence-based ABA therapy for children on the autism
          spectrum — built around your child, not a program.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <span className="inline-flex items-center gap-2 rounded-chip bg-tomato px-6 py-3.5 text-[0.95rem] font-bold text-white">
            Start a referral <span aria-hidden="true">→</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-chip border-2 border-ink/25 px-6 py-3.5 text-[0.95rem] font-bold text-ink">
            Our services <span aria-hidden="true">→</span>
          </span>
        </div>

        {/* Section header */}
        <div className="mt-24">
          <p className="u-label text-tomato">What we offer</p>
          <Head
            text="Six ways we support your child's *growth*"
            variant={variant}
            size="clamp(2.25rem, 4.5vw, 4rem)"
            className="mt-4 max-w-3xl text-ink"
          />
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              c: "bg-sun",
              t: "Early Intensive ABA Therapy",
              d: "One-on-one, foundational therapy for children newly diagnosed with ASD.",
              m: "Ages 2–7 · In-center & home",
            },
            {
              c: "bg-sky",
              t: "Communication & Social Skills",
              d: "Helping children find their voice and connect with the people around them.",
              m: "All ages · Group & individual",
            },
            {
              c: "bg-coral",
              t: "Occupational Therapy",
              d: "Building the everyday skills that let your child play, learn, and do things on their own.",
              m: "OTR/L-led · Sensory & motor skills",
            },
          ].map((card) => (
            <div
              key={card.t}
              className={`flex flex-col rounded-tile ${card.c} p-8`}
            >
              <h3
                className="text-ink"
                style={{
                  fontFamily: variant.displayVar,
                  fontWeight: variant.displayWeight,
                  fontSize: "clamp(1.35rem, 1.8vw, 1.75rem)",
                  lineHeight: 1.1,
                  letterSpacing: variant.tracking,
                }}
              >
                {card.t}
              </h3>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink">
                {card.d}
              </p>
              <p className="mt-5 border-t border-ink/15 pt-4 text-sm font-semibold text-ink/80">
                {card.m}
              </p>
            </div>
          ))}
        </div>

        {/* Scale ramp */}
        <div className="mt-16 rounded-tile bg-cream-deep p-8">
          <p className="u-label mb-6 text-ink/60">Scale ramp</p>
          {[
            ["Hero h1", "clamp(3rem, 7vw, 5.75rem)"],
            ["Section h2", "clamp(2.25rem, 4.5vw, 4rem)"],
            ["Card h3", "clamp(1.35rem, 1.8vw, 1.75rem)"],
          ].map(([role, size]) => (
            <div key={role} className="mb-4 border-b border-ink/10 pb-4">
              <span className="u-label text-ink/45">{role}</span>
              <p
                className="mt-1 text-ink"
                style={{
                  fontFamily: variant.displayVar,
                  fontWeight: variant.displayWeight,
                  fontSize: size,
                  lineHeight: 1,
                  letterSpacing: variant.tracking,
                }}
              >
                Every child belongs
              </p>
            </div>
          ))}
          <p className="mt-6 text-[1.0625rem] leading-[1.7] text-ink/75">
            Body copy at 17px / 1.7 — Applied Behavior Analysis is the
            gold-standard, evidence-based approach for supporting children on
            the autism spectrum. At Autism Bright Start, we build every
            treatment plan around your child&apos;s unique strengths, identity,
            and family.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function TypeSpecimen() {
  return (
    <div
      className={`${playfair.variable} ${fraunces.variable} ${outfit.variable} ${bricolage.variable} ${jakarta.variable} ${manrope.variable} bg-cream`}
    >
      <div className="px-5 pt-16 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <p className="u-label text-tomato">Temporary — not linked, not indexed</p>
          <h1 className="mt-4 font-display text-4xl text-ink">
            Font pairing comparison
          </h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink/75">
            The same content three times. Compare the hero size, how the
            emphasized word reads, and whether the card titles hold up. Scale is
            identical in all three, so only the typeface differs.
          </p>
        </div>
      </div>

      {VARIANTS.map((variant) => (
        <Panel key={variant.id} variant={variant} />
      ))}
    </div>
  );
}
