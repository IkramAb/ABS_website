import Link from "next/link";
import type { ReactNode } from "react";

/* ---- Color tokens ---------------------------------------------------- */

export type TileColor =
  | "sun"
  | "sky"
  | "coral"
  | "leaf"
  | "lilac"
  | "rose"
  | "cream-deep";

/** Static class strings so Tailwind can see every one of them at build time. */
const TILE_BG: Record<TileColor, string> = {
  sun: "bg-sun",
  sky: "bg-sky",
  coral: "bg-coral",
  leaf: "bg-leaf",
  lilac: "bg-lilac",
  rose: "bg-rose",
  "cream-deep": "bg-cream-deep",
};

export function tileBg(color: TileColor) {
  return TILE_BG[color];
}


/* ---- Emphasis -------------------------------------------------------- */

/**
 * Headlines are authored with *asterisks* around the emphasized fragment.
 *
 * The device is weight opposition in the accent color: 800 against the 600
 * roman that headings sit at. Bricolage has no true italic, so slanting it
 * would only get a browser-faked oblique — the weight gap does the work
 * instead, and the emphasis must stay heavier than the heading around it.
 * Defined once here so it can't drift across the site.
 */
export function RichHeading({
  text,
  className = "",
  onInk = false,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  onInk?: boolean;
  as?: "h1" | "h2" | "h3";
}) {
  const accent = onInk ? "text-sun" : "text-tomato";
  const parts = text.split(/\*([^*]+)\*/g);

  return (
    <Tag className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={`${accent} font-extrabold`}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </Tag>
  );
}

/* ---- Buttons --------------------------------------------------------- */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "onInk" | "onInkSecondary" | "onColor";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-chip px-6 py-3.5 text-[0.95rem] font-bold transition duration-200 hover:-translate-y-0.5";

  const variants = {
    // White on tomato is the only white-on-color pairing in the system.
    primary: "bg-tomato text-white hover:bg-tomato/90 shadow-tile",
    secondary: "border-2 border-ink/25 text-ink hover:border-ink hover:bg-ink/5",
    onInk: "bg-sun text-ink hover:bg-sun/90",
    /* The outline pairing for `onInk`. This has to be a variant, not a
       className override on `secondary` — Tailwind resolves competing
       utilities by stylesheet order, not by class-attribute order, and
       `text-ink` is emitted after `text-cream`. Overriding from the call site
       loses that race and renders ink on ink: invisible, but still taking up
       its half of the row. */
    onInkSecondary:
      "border-2 border-cream/40 text-cream hover:border-cream hover:bg-cream/10",
    // For colored backgrounds: tomato reads muddy on coral and dark on sun,
    // whereas ink clears 14:1 on every tile color.
    onColor: "bg-ink text-cream hover:bg-ink/90",
  } as const;

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

/* ---- Labels and chips ------------------------------------------------ */

export function Eyebrow({
  children,
  onInk = false,
  onColor = false,
  className = "",
}: {
  children: ReactNode;
  onInk?: boolean;
  /** On a bright tile, tomato falls to ~3.3:1 — small text needs ink. */
  onColor?: boolean;
  className?: string;
}) {
  const tone = onInk ? "text-sun" : onColor ? "text-ink/70" : "text-tomato";

  return <p className={`u-label ${tone} ${className}`}>{children}</p>;
}

export function TrustChip({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-chip bg-leaf px-4 py-2 text-sm font-bold text-ink ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-4 w-4"
        fill="currentColor"
      >
        <path d="M8.2 13.6 4.9 10.3l1.3-1.3 2 2 5.3-5.3 1.3 1.3z" />
        <path
          d="M10 1.7 3 4.6v5c0 4.2 2.9 7.5 7 8.7 4.1-1.2 7-4.5 7-8.7v-5z"
          fillOpacity="0.18"
        />
      </svg>
      MA &amp; Medicaid accepted
    </span>
  );
}

export function MetaRow({ items }: { items: readonly string[] }) {
  return (
    <p className="text-sm font-semibold text-ink/80">{items.join(" · ")}</p>
  );
}

/* ---- Section scaffolding --------------------------------------------- */

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-24 md:py-32 ${className}`}>
      <div className="u-shell">{children}</div>
    </section>
  );
}

export function SectionHeader({
  label,
  headline,
  onInk = false,
  align = "left",
  className = "",
}: {
  label: string;
  headline: string;
  onInk?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "text-center" : ""} ${className}`}
    >
      <Eyebrow onInk={onInk}>{label}</Eyebrow>
      <RichHeading
        text={headline}
        onInk={onInk}
        className={`mt-4 text-section ${
          onInk ? "text-cream" : "text-ink"
        }`}
      />
    </div>
  );
}

/* ---- Doodles --------------------------------------------------------- */

type DoodleName =
  | "squiggle"
  | "star"
  | "sparkle"
  | "arc"
  | "dots"
  | "infinity";

/**
 * Purely decorative accents, drawn from the reference vocabulary — with one
 * exception. `infinity` is the neurodiversity symbol, adopted by the autistic
 * community as an alternative to the puzzle piece, so it carries meaning the
 * others don't. Use it on photographs and identity moments; don't scatter it
 * among the stars and squiggles, which would read as decoration.
 */
export function Doodle({
  name,
  className = "",
  color = "text-sun",
}: {
  name: DoodleName;
  className?: string;
  color?: string;
}) {
  const shapes: Record<DoodleName, ReactNode> = {
    squiggle: (
      <path
        d="M2 14c6-10 10 10 16 0s10 10 16 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    ),
    star: (
      <path
        d="M18 2c1.6 8.4 5 11.8 13.4 13.4C23 17 19.6 20.4 18 28.8 16.4 20.4 13 17 4.6 15.4 13 13.8 16.4 10.4 18 2Z"
        fill="currentColor"
      />
    ),
    sparkle: (
      <>
        <circle cx="10" cy="10" r="4" fill="currentColor" />
        <circle cx="26" cy="20" r="2.5" fill="currentColor" />
        <circle cx="16" cy="26" r="2" fill="currentColor" />
      </>
    ),
    arc: (
      <path
        d="M3 30a15 15 0 0 1 30 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    ),
    dots: (
      <>
        <circle cx="6" cy="18" r="3" fill="currentColor" />
        <circle cx="18" cy="18" r="3" fill="currentColor" />
        <circle cx="30" cy="18" r="3" fill="currentColor" />
      </>
    ),
    /* A lemniscate drawn as one continuous stroke. Kept at 3.2 rather than the
       3.5 the other line shapes use — the crossing point in the middle fills
       in and turns to a blob if the stroke is any heavier at small sizes.
       Provisional until the supplied artwork lands. */
    infinity: (
      <path
        d="M18 18c3-5.2 5.6-7.8 9-7.8a7.8 7.8 0 0 1 0 15.6c-3.4 0-6-2.6-9-7.8Zm0 0c-3-5.2-5.6-7.8-9-7.8a7.8 7.8 0 0 0 0 15.6c3.4 0 6-2.6 9-7.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 36 36"
      className={`${color} ${className}`}
    >
      {shapes[name]}
    </svg>
  );
}
