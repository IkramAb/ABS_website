import {
  Button,
  Doodle,
  MetaRow,
  RichHeading,
  Section,
  tileBg,
  type TileColor,
} from "./ui";

/* ---- Process steps --------------------------------------------------- */

export type Step = {
  title: string;
  body: string;
  meta?: string[];
  color: TileColor;
};

/**
 * The referral path, shown before a parent has to commit to anything.
 * Numbered because this genuinely is a sequence — order is information here.
 */
export function ProcessSteps({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className={`anim-rise flex flex-col rounded-tile ${tileBg(
            step.color
          )} p-7`}
          style={{ ["--rise-delay" as string]: `${i * 60}ms` }}
        >
          <span
            aria-hidden="true"
            className="font-display text-5xl font-semibold text-ink/30"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 text-card text-ink">{step.title}</h3>
          <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink">
            {step.body}
          </p>
          {step.meta && (
            <div className="mt-5 border-t border-ink/15 pt-4">
              <MetaRow items={step.meta} />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

/* ---- CTA band -------------------------------------------------------- */

export function CtaBand({
  headline,
  body,
  primary,
  secondary,
}: {
  headline: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Section className="bg-cream">
      <div className="relative overflow-hidden rounded-tile bg-ink px-6 py-16 text-center sm:px-14 md:py-20">
        <Doodle
          name="star"
          color="text-sun/30"
          className="absolute left-8 top-8 h-10 w-10"
        />
        <Doodle
          name="squiggle"
          color="text-coral/40"
          className="absolute bottom-8 right-8 h-12 w-12"
        />

        <RichHeading
          text={headline}
          onInk
          className="mx-auto max-w-3xl text-section text-cream"
        />
        <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-cream/80">
          {body}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href={primary.href} variant="onInk">
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} variant="onInkSecondary">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
