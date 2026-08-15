import { Fragment } from "react";

/**
 * Scrolling band of trust signals. The track is duplicated so the -50%
 * translate loops seamlessly; under reduced motion the animation is off and
 * it simply reads as a static row.
 */
export function Marquee({ items }: { items: readonly string[] }) {
  const track = (
    <ul className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          <li className="whitespace-nowrap font-display text-lg font-semibold text-ink sm:text-xl">
            {item}
          </li>
          <li aria-hidden="true" className="text-tomato">
            ◆
          </li>
        </Fragment>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y-2 border-ink/10 bg-sun py-5">
      <div className="flex w-max anim-marquee">
        {track}
        <div aria-hidden="true" className="flex">
          {track}
        </div>
      </div>
    </div>
  );
}
