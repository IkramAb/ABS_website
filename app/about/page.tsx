import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PhotoFrame } from "@/components/PhotoFrame";
import { CtaBand } from "@/components/sections";
import { Section, SectionHeader, tileBg } from "@/components/ui";
import {
  cta,
  hero,
  missionVision,
  story,
  values,
  valuesHeader,
} from "@/content/about";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Autism Bright Start was founded on a simple belief: every child on the spectrum deserves exceptional, compassionate, and culturally affirming care — from day one.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label={hero.label}
        headline={hero.headline}
        cta={hero.cta}
      />

      {/* Story */}
      <Section className="bg-cream">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <PhotoFrame
            src={hero.image.src}
            alt={hero.image.alt}
            color="sun"
            className="h-[26rem] w-full sm:h-[34rem]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div>
            {story.map((paragraph, i) => (
              <p
                key={i}
                className={`u-prose text-ink/80 ${i > 0 ? "mt-5" : ""}`}
              >
                {paragraph}
              </p>
            ))}

            {/* The neurodiversity infinity, used once and only here. It sits
                after the story closes on "culture-affirming care is the
                foundation" because it punctuates that sentence. Repeating it
                as page furniture would turn a symbol into a texture. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/infinity-mark.svg"
              alt="The neurodiversity infinity symbol"
              width={120}
              height={64}
              className="mt-10 h-12 w-auto"
            />

            <div className="mt-12 grid gap-6">
              {missionVision.map((item) => (
                <div
                  key={item.label}
                  className={`rounded-tile ${tileBg(item.color)} p-8`}
                >
                  <h2 className="u-label text-ink/60">{item.label}</h2>
                  <p className="mt-4 text-[1.05rem] leading-relaxed text-ink">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-cream-deep">
        <SectionHeader
          label={valuesHeader.label}
          headline={valuesHeader.headline}
          align="center"
          className="mx-auto max-w-2xl"
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => (
            <li
              key={value.title}
              className={`anim-rise rounded-tile ${tileBg(value.color)} p-8`}
              style={{ ["--rise-delay" as string]: `${(i % 3) * 60}ms` }}
            >
              <h3 className="text-xl text-ink">{value.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink">
                {value.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        headline={cta.headline}
        body={cta.body}
        primary={cta.primary}
      />
    </>
  );
}
