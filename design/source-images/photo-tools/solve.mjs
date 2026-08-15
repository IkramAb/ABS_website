// Solves grade parameters per image so its colour statistics land on the
// hero-photo target. Binary search on each axis, looped twice because the
// three controls interact (warming raises saturation, brightness shifts R-B).
import { execFileSync } from "node:child_process";

const S = "/private/tmp/claude-501/-Users-ikram-ABS-website/4300f95f-68ca-4625-b166-e5170490b287/scratchpad";
const SRC = "/Users/ikram/Downloads/website photos";

// Measured from hero-1/hero-2. Temperature is capped at 5000K so skin never
// goes orange chasing the number.
const TARGET = { rb: 34, value: 0.64, sat: 0.29 };
const K_MIN = 5000, K_MAX = 6500;

const stats = (f) => {
  const out = execFileSync(`${S}/stats`, [f]).toString();
  const m = out.match(/sat ([\d.]+)\s+value ([\d.]+)\s+R-B\s+([+-][\d.]+)/);
  return { sat: +m[1], value: +m[2], rb: +m[3] };
};

const render = (inp, out, sat, bri, k) =>
  execFileSync(`${S}/grade`, [inp, out, String(sat), String(bri), String(k)]);

/** Binary search `steps` times over [lo,hi] to drive metric() to target. */
function solve(lo, hi, steps, apply, metric, target, increasingWithParam) {
  for (let i = 0; i < steps; i++) {
    const mid = (lo + hi) / 2;
    apply(mid);
    const v = metric();
    const tooLow = increasingWithParam ? v < target : v > target;
    if (tooLow) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

const jobs = process.argv.slice(2);
const results = {};

for (const name of jobs) {
  const src = name.endsWith(".png") && name.includes("/") ? name : `${SRC}/${name}.png`;
  const tmp = `${S}/_solve.png`;
  let sat = 1.0, bri = 0.0, k = 6500;

  for (let pass = 0; pass < 2; pass++) {
    // Warmth: lower K = warmer = higher R-B, so R-B decreases with K.
    k = solve(K_MIN, K_MAX, 6,
      (v) => render(src, tmp, sat, bri, v),
      () => stats(tmp).rb, TARGET.rb, false);

    bri = solve(-0.15, 0.10, 5,
      (v) => render(src, tmp, sat, v, k),
      () => stats(tmp).value, TARGET.value, true);

    sat = solve(0.7, 1.4, 5,
      (v) => render(src, tmp, v, bri, k),
      () => stats(tmp).sat, TARGET.sat, true);
  }

  render(src, tmp, sat, bri, k);
  const final = stats(tmp);
  results[name] = { sat: +sat.toFixed(3), bri: +bri.toFixed(3), k: Math.round(k), final };
  console.log(
    `  ${name.padEnd(4)} sat=${sat.toFixed(2)} bri=${bri.toFixed(3)} K=${Math.round(k)}` +
    `  ->  sat ${final.sat.toFixed(3)}  value ${final.value.toFixed(3)}  R-B ${final.rb > 0 ? "+" : ""}${final.rb.toFixed(1)}`
  );
}

console.log("\nPARAMS=" + JSON.stringify(results));
