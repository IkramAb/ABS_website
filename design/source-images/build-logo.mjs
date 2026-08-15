import fs from "node:fs";

const S = "/private/tmp/claude-501/-Users-ikram-ABS-website/4300f95f-68ca-4625-b166-e5170490b287/scratchpad";
const OUT = "/Users/ikram/ABS_website/public/images";
const { paths, split } = JSON.parse(fs.readFileSync(`${S}/parsed.json`, "utf8"));

const isPlate = (p) => p.bb.x1 - p.bb.x0 > 1900 && p.bb.y1 - p.bb.y0 > 1900;
const content = paths.filter((p) => !isPlate(p)); // drops the #FEFEFE background plate
const mark = content.filter((p) => p.bb.x1 <= split);

const NEAR_WHITE = 0.9; // knockouts: painted, never removed — see note in the component
// The wordmark's near-black green runs 0.131–0.172; the darkest brand color is
// 0.514. Anything in that gap works — 0.30 keeps a wide margin on both sides.
const VERY_DARK = 0.3;

/** The trace carries ~7 decimals; at render size 1 unit is well under a pixel. */
const round = (d) =>
  d.replace(/-?\d*\.?\d+/g, (n) => String(Math.round(parseFloat(n) * 10) / 10))
   .replace(/\s+/g, " ")
   .trim();

function build(list, { knockout, ink, pad = 6 }) {
  const x0 = Math.min(...list.map((p) => p.bb.x0)) - pad;
  const y0 = Math.min(...list.map((p) => p.bb.y0)) - pad;
  const w = Math.max(...list.map((p) => p.bb.x1)) - x0 + pad;
  const h = Math.max(...list.map((p) => p.bb.y1)) - y0 + pad;

  const body = list
    .map((p) => {
      let fill = p.fill;
      if (p.lum > NEAR_WHITE && knockout) fill = knockout;
      else if (p.lum < VERY_DARK && ink) fill = ink;
      const t = p.tx || p.ty ? ` transform="translate(${round(String(p.tx))},${round(String(p.ty))})"` : "";
      return `<path d="${round(p.d)}" fill="${fill}"${t}/>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${+x0.toFixed(1)} ${+y0.toFixed(1)} ${+w.toFixed(1)} ${+h.toFixed(1)}">${body}</svg>\n`;
}

const files = {
  // Full lockup for cream surfaces: knockouts painted cream so the mark reads
  // as though it has no background at all.
  "logo.svg": build(content, { knockout: "#FDF6EC" }),
  // Same lockup for the ink footer: knockouts take the navy, and the near-black
  // green wordmark is lifted to cream so it stays legible.
  "logo-on-ink.svg": build(content, { knockout: "#1F2A54", ink: "#FDF6EC" }),
  // Bulb only, for the favicon / OG card / apple icon.
  "logo-mark.svg": build(mark, { knockout: "#FDF6EC" }),
  "logo-mark-on-ink.svg": build(mark, { knockout: "#1F2A54" }),
};

for (const [name, svg] of Object.entries(files)) {
  fs.writeFileSync(`${OUT}/${name}`, svg);
  fs.writeFileSync(`${S}/${name}`, svg);
  console.log(name.padEnd(22), (svg.length / 1024).toFixed(1) + " KB");
}
console.log("\noriginal source:", (fs.statSync("/Users/ikram/Downloads/Autism Bright Start (upgraded Logo) (3).svg").size / 1024).toFixed(1), "KB");
