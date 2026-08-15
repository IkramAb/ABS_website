"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { TileColor } from "./ui";

/**
 * The patterned wash behind a service card.
 *
 * The pattern is always there; only the *motion* is conditional. That split is
 * the whole design:
 *
 * - **At rest** every card renders a frozen frame (`speed={0}`) at reduced
 *   opacity, so the grid reads as textured but calm.
 * - **On hover or focus** that card — and only that card — starts moving and
 *   comes to full strength.
 * - **Under `prefers-reduced-motion`** the pattern still renders, because a
 *   static texture is not motion, but nothing ever animates. This matters for
 *   the families this site is for; ambient movement is a common sensory
 *   trigger, and hover is a deliberate act rather than something imposed.
 *
 * Mounting waits for the grid to scroll into view. The shader is a ~250KB
 * WebGL chunk and the services grid sits well below the fold on every page
 * that renders it, so this keeps it off the critical path without giving up
 * the pattern on any device.
 *
 * Contrast is safe by construction: each ramp mixes the card's own tile color
 * *toward* cream, so luminance only rises and no frame — at any opacity, since
 * blending stays between the two — can be darker than the flat tile beneath.
 */

const Warp = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.Warp),
  { ssr: false }
);

/** Mirrors the tile tokens in app/globals.css. Keep in step with them. */
const TILE_HEX: Record<TileColor, string> = {
  sun: "#f3be43",
  sky: "#7fc7e8",
  coral: "#fa9e4b",
  leaf: "#7fc3b5",
  lilac: "#82a0e1",
  rose: "#f9b0b7",
  "cream-deep": "#f7ead6",
};

const CREAM = "#fdf6ec";

/** Fraction of the way from the tile color to cream, per shader stop. */
const STOPS = [0, 0.3, 0.55, 0.75];

const channels = (hex: string) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

/** Mixing toward cream is what guarantees the ramp only ever gets lighter. */
function mix(from: string, to: string, t: number) {
  const a = channels(from);
  const b = channels(to);
  return `#${a
    .map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, "0"))
    .join("")}`;
}

const rampFor = (color: TileColor) =>
  STOPS.map((t) => mix(TILE_HEX[color], CREAM, t));

/**
 * Frozen cards would otherwise all show the identical frame. Offsetting the
 * starting frame per hue gives each card its own bit of the pattern.
 */
const FRAME_OFFSET: Record<TileColor, number> = {
  sun: 0,
  sky: 1400,
  coral: 2800,
  leaf: 4200,
  lilac: 5600,
  rose: 7000,
  "cream-deep": 8400,
};

export function CardShader({
  color,
  active,
}: {
  color: TileColor;
  active: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [allowMotion, setAllowMotion] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowMotion(!reduced.matches);
    update();
    reduced.addEventListener("change", update);
    return () => reduced.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect(); // one-way: once mounted it stays
        }
      },
      { rootMargin: "300px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const moving = active && allowMotion;

  return (
    <div
      ref={host}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-[0.45]"
      }`}
    >
      {visible && (
        <Warp
          style={{ width: "100%", height: "100%" }}
          colors={rampFor(color)}
          // The only thing hover changes. Frozen otherwise, so idle cards cost
          // no frames however many are on screen.
          speed={moving ? 0.5 : 0}
          frame={FRAME_OFFSET[color]}
          proportion={0.4}
          softness={1.1}
          distortion={0.16}
          swirl={0.7}
          swirlIterations={10}
          // This version's patterns are checks | stripes | edge — the reference's
          // "dots" does not exist here.
          shape="checks"
          shapeScale={0.1}
          scale={1}
          rotation={0}
        />
      )}
    </div>
  );
}
