import fs from "node:fs";

const SRC = "/Users/ikram/Downloads/Autism Bright Start (upgraded Logo) (3).svg";
const src = fs.readFileSync(SRC, "utf8");

// Commands present? (an 'A' arc would break the naive x,y pairing below)
console.log("commands used:", [...new Set(src.match(/[A-DF-Za-df-z](?=[\s\-0-9.])/g) || [])].sort().join(" "));

const paths = [...src.matchAll(/<path\s+d="([^"]*)"\s+fill="([^"]*)"(?:\s+transform="translate\(([-\d.]+),([-\d.]+)\)")?\s*\/>/g)]
  .map(([, d, fill, tx = "0", ty = "0"]) => ({ d, fill, tx: +tx, ty: +ty }));

console.log("parsed paths:", paths.length);

// Bounding box: the trace uses only M/C/L/Z, so every number pair is an x,y.
function bbox(p) {
  const n = (p.d.match(/-?\d*\.?\d+/g) || []).map(Number);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (let i = 0; i + 1 < n.length; i += 2) {
    const x = n[i] + p.tx, y = n[i + 1] + p.ty;
    if (x < x0) x0 = x; if (x > x1) x1 = x;
    if (y < y0) y0 = y; if (y > y1) y1 = y;
  }
  return { x0, y0, x1, y1 };
}

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};

for (const p of paths) { p.bb = bbox(p); p.lum = lum(p.fill); }

// Background plate = the one path spanning the whole 2000x2000 canvas.
const bg = paths.filter((p) => p.bb.x1 - p.bb.x0 > 1900 && p.bb.y1 - p.bb.y0 > 1900);
console.log("\nfull-canvas plate(s):", bg.map((p) => p.fill).join(", "));

const rest = paths.filter((p) => !bg.includes(p));
const xs = rest.map((p) => p.bb.x0).sort((a, b) => a - b);
console.log("mark x-range:", Math.min(...rest.map(p => p.bb.x0)).toFixed(0), "→", Math.max(...rest.map(p => p.bb.x1)).toFixed(0));

// Find the gap between the bulb and the wordmark.
const sorted = [...rest].sort((a, b) => a.bb.x0 - b.bb.x0);
let bestGap = 0, split = 0;
for (let i = 1; i < sorted.length; i++) {
  const leftMax = Math.max(...sorted.slice(0, i).map((p) => p.bb.x1));
  const gap = sorted[i].bb.x0 - leftMax;
  if (gap > bestGap) { bestGap = gap; split = (leftMax + sorted[i].bb.x0) / 2; }
}
console.log(`widest gap: ${bestGap.toFixed(1)}px at x=${split.toFixed(0)}`);

const mark = rest.filter((p) => p.bb.x1 <= split);
const word = rest.filter((p) => p.bb.x1 > split);
console.log(`bulb paths: ${mark.length}   wordmark paths: ${word.length}`);

const NEAR_WHITE = 0.90;
console.log(`\nnear-white paths inside the bulb (lum > ${NEAR_WHITE}):`);
for (const p of mark.filter((p) => p.lum > NEAR_WHITE)) {
  const { x0, y0, x1, y1 } = p.bb;
  console.log(`  ${p.fill}  lum ${p.lum.toFixed(3)}  box ${(x1-x0).toFixed(0)}x${(y1-y0).toFixed(0)} at ${x0.toFixed(0)},${y0.toFixed(0)}`);
}

const bb = (list) => ({
  x0: Math.min(...list.map((p) => p.bb.x0)), y0: Math.min(...list.map((p) => p.bb.y0)),
  x1: Math.max(...list.map((p) => p.bb.x1)), y1: Math.max(...list.map((p) => p.bb.y1)),
});
console.log("\nbulb bbox :", JSON.stringify(bb(mark)));
console.log("word bbox :", JSON.stringify(bb(word)));

fs.writeFileSync("/private/tmp/claude-501/-Users-ikram-ABS-website/4300f95f-68ca-4625-b166-e5170490b287/scratchpad/parsed.json",
  JSON.stringify({ paths: paths.map(({ d, fill, tx, ty, bb, lum }) => ({ d, fill, tx, ty, bb, lum })), split }, null, 0));
console.log("\nwrote parsed.json");
