import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site, contact } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ABA therapy in Minneapolis, MN`;

/**
 * The real lockup in the default system face. Loading Bricolage here would mean
 * a build-time font fetch, which isn't worth the fragility.
 *
 * Satori will not read from /public, so the vector is inlined as a data URI at
 * build time.
 */
export default function OpengraphImage() {
  const lockup = fs.readFileSync(
    path.join(process.cwd(), "public", "images", "logo.svg")
  );
  const src = `data:image/svg+xml;base64,${lockup.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FDF6EC",
          padding: 72,
        }}
      >
        {/* Satori only renders plain img elements. */}
        <img src={src} width={293} height={160} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 800,
              color: "#1F2A54",
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            Every child belongs.
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 30,
              color: "#5A6485",
              maxWidth: 820,
            }}
          >
            Evidence-based ABA and occupational therapy for children on the
            autism spectrum.
          </div>
        </div>

        {/* The name is already in the lockup up top, so this row carries only
            the proof point. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            fontSize: 26,
            fontWeight: 700,
            color: "#1F2A54",
          }}
        >
          <div
            style={{
              display: "flex",
              background: "#7FC3B5",
              padding: "12px 26px",
              borderRadius: 999,
            }}
          >
            {contact.city}, {contact.state} · MA accepted
          </div>
        </div>
      </div>
    ),
    size
  );
}
