"use client";

import Link from "next/link";
import { useState } from "react";
import { CardShader } from "./CardShader";
import { tileBg } from "./ui";
import type { Service } from "@/content/services";

/**
 * One card, three placements: the home grid, the /services directory, and the
 * "explore our other services" grid at the foot of each detail page. Keeping
 * them the same component is what stops the six services drifting apart.
 *
 * Client-side only because of the shader: `active` drives the animated wash,
 * and it tracks focus as well as hover so keyboard users get the same
 * affordance. See CardShader for why it never runs at rest.
 */
export function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  const [active, setActive] = useState(false);

  return (
    <li
      className="anim-rise"
      style={{ ["--rise-delay" as string]: `${(index % 3) * 60}ms` }}
    >
      <Link
        href={`/services/${service.slug}`}
        onPointerEnter={() => setActive(true)}
        onPointerLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        /* `isolate` + `overflow-hidden` clip the canvas to the tile radius. */
        className={`group relative isolate block h-full overflow-hidden rounded-tile ${tileBg(
          service.color
        )} p-8 transition duration-200 hover:-translate-y-1`}
      >
        <CardShader color={service.color} active={active} />

        {/* The column lives here rather than on the link, so the canvas can be
            a sibling without becoming a flex item and collapsing `flex-1`. */}
        <div className="relative z-10 flex h-full flex-col">
          <h3 className="text-card text-ink">{service.title}</h3>

          <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink">
            {service.tagline}
          </p>

          <p className="mt-5 border-t border-ink/15 pt-4 text-sm font-semibold text-ink/80">
            {service.tag}
          </p>

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ink">
            Learn more
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </li>
  );
}

export function ServiceGrid({
  services,
  className = "",
}: {
  services: Service[];
  className?: string;
}) {
  return (
    <ul className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {services.map((service, i) => (
        <ServiceCard key={service.slug} service={service} index={i} />
      ))}
    </ul>
  );
}
