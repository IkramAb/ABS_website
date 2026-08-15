// Generates organic blob paths: points at varying radii around a centre,
// joined with a Catmull-Rom -> cubic Bezier conversion so the outline is
// smooth and closed with no visible seam.

const R2 = (n) => Math.round(n * 10) / 10;

/** Deterministic PRNG so the same seed always yields the same blob. */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function blob({ seed, points = 8, min = 0.78, max = 1.0, cx = 50, cy = 50, rx = 48, ry = 48 }) {
  const rand = rng(seed);
  const pts = [];
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2;
    const r = min + rand() * (max - min);
    pts.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]);
  }

  // Catmull-Rom through every point, wrapped, converted to cubics.
  const at = (i) => pts[(i + pts.length) % pts.length];
  let d = `M ${R2(pts[0][0])} ${R2(pts[0][1])}`;
  for (let i = 0; i < pts.length; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${R2(c1[0])} ${R2(c1[1])} ${R2(c2[0])} ${R2(c2[1])} ${R2(p2[0])} ${R2(p2[1])}`;
  }
  return d + " Z";
}

const variants = [
  blob({ seed: 7, points: 8, min: 0.80 }),
  blob({ seed: 42, points: 7, min: 0.76 }),
  blob({ seed: 1337, points: 9, min: 0.82 }),
  blob({ seed: 2024, points: 8, min: 0.74 }),
];

variants.forEach((d, i) => console.log(`  ${i}: "${d}"\n`));
