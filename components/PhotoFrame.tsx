import Image from "next/image";
import { hasImage } from "@/lib/images";
import { tileBg, Doodle, type TileColor } from "./ui";

/**
 * Every photo on the site, in one frame.
 *
 * The radius is `rounded-tile` — the same 28px the trust tiles and the quote
 * tile use. In the hero these sit side by side in one grid, so matching the
 * neighbours exactly is the point: one shape language, not two.
 *
 * Server Component only (it checks the filesystem at build time). When the
 * photo has not been supplied yet it renders the colored block on its own,
 * so the page still reads as designed.
 */
export function PhotoFrame({
  src,
  alt,
  color,
  className = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: {
  src: string;
  alt: string;
  color: TileColor;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const ready = hasImage(src);

  return (
    <div
      className={`relative overflow-hidden rounded-tile ${tileBg(color)} ${className}`}
    >
      {ready ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <Doodle
            name="sparkle"
            color="text-ink/20"
            className="h-10 w-10 sm:h-14 sm:w-14"
          />
        </div>
      )}
    </div>
  );
}
