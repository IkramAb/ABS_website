import Link from "next/link";
import { Button, Doodle, Eyebrow, RichHeading, tileBg, type TileColor } from "./ui";

export type Crumb = { label: string; href?: string };

export function PageHero({
  label,
  headline,
  body,
  cta,
  bg,
  breadcrumb,
  children,
}: {
  label?: string;
  headline: string;
  body?: string;
  cta?: { label: string; href: string };
  /** Omit for the default cream-deep hero. */
  bg?: TileColor;
  breadcrumb?: Crumb[];
  children?: React.ReactNode;
}) {
  const onColor = Boolean(bg);
  const background = bg ? tileBg(bg) : "bg-cream-deep";

  // On a bright tile the coral/sky doodles disappear into the background.
  const doodleTone = onColor ? "text-ink/20" : undefined;

  return (
    <section
      className={`relative overflow-hidden ${background} py-20 md:py-28`}
    >
      <Doodle
        name="sparkle"
        color={doodleTone ?? "text-coral"}
        className="absolute right-[8%] top-16 hidden h-11 w-11 lg:block"
      />
      <Doodle
        name="dots"
        color={doodleTone ?? "text-sky"}
        className="absolute bottom-12 left-[6%] hidden h-10 w-10 lg:block"
      />

      <div className="u-shell">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink/70">
              {breadcrumb.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-ink">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink">
                      {crumb.label}
                    </span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <span aria-hidden="true" className="text-ink/40">
                      ›
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="max-w-3xl">
          {label && <Eyebrow onColor={onColor}>{label}</Eyebrow>}
          <RichHeading
            as="h1"
            text={headline}
            className={`text-hero text-ink ${
              label ? "mt-5" : ""
            }`}
          />
          {body && (
            <p
              className={`u-prose mt-6 text-[1.05rem] ${
                onColor ? "text-ink" : "text-ink/75"
              }`}
            >
              {body}
            </p>
          )}
          {cta && (
            <div className="mt-9">
              <Button
                href={cta.href}
                variant={onColor ? "onColor" : "primary"}
              >
                {cta.label}
              </Button>
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
