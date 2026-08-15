import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icons get composited onto the home screen without transparency,
 * so this sits on cream rather than shipping an alpha channel — which also
 * matches the knockouts baked into the mark.
 *
 * Satori will not read from /public, so the vector is inlined as a data URI at
 * build time.
 */
export default function AppleIcon() {
  const mark = fs.readFileSync(
    path.join(process.cwd(), "public", "images", "logo-mark.svg")
  );
  const src = `data:image/svg+xml;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FDF6EC",
        }}
      >
        {/* Satori only renders plain img elements. */}
        <img src={src} width={116} height={169} alt="" />
      </div>
    ),
    size
  );
}
