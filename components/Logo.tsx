import Link from "next/link";
import { site } from "@/content/site";

/**
 * The brand lockup, served as the supplied vector rather than redrawn.
 *
 * Two files, not one. The artwork is an auto-trace: the colored shapes are
 * solid fills with near-white shapes stacked on top to knock out the interior.
 * Those knockouts cannot be made transparent — deleting them fills the bulb in
 * with a solid blue blob — so each variant paints them to match the surface it
 * sits on, which is what makes the mark read as having no background at all.
 * `logo-on-ink` additionally lifts the near-black green wordmark to cream so it
 * stays legible on the footer.
 *
 * Consequence worth knowing: these bake in `cream` and `ink`. If either surface
 * color changes, regenerate rather than recolor by hand — see
 * `design/source-images/README.md`.
 */

/** Intrinsic size of the lockup, from its viewBox. Set on the tag so the
 *  header reserves the right space before the SVG lands. */
const W = 1285;
const H = 701;

export function Logo({
  href = "/",
  tone = "ink",
  className = "",
}: {
  /** `null` renders an unlinked lockup, for the footer. */
  href?: string | null;
  /** Which surface it sits on — picks the matching knockout variant. */
  tone?: "ink" | "cream";
  className?: string;
}) {
  const src = tone === "cream" ? "/images/logo-on-ink.svg" : "/images/logo.svg";
  const linked = href !== null;

  const image = (
    /* A static vector: next/image would add a wrapper and a request for no
       benefit on an SVG, which it passes through unoptimized anyway. */
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      /* Inside a link the <a> already carries the name, so the image is
         decorative there and a second copy would just be read twice. */
      alt={linked ? "" : `${site.name} logo`}
      width={W}
      height={H}
      className="h-12 w-auto sm:h-16"
    />
  );

  if (!linked) {
    return <div className={`flex items-center ${className}`}>{image}</div>;
  }

  return (
    <Link
      href={href}
      className={`flex items-center ${className}`}
      aria-label={`${site.name} — home`}
    >
      {image}
    </Link>
  );
}
