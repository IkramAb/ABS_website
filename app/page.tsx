import { BentoHero } from "@/components/BentoHero";
import { Marquee } from "@/components/Marquee";
import { PhotoFrame } from "@/components/PhotoFrame";
import { CtaBand, ProcessSteps } from "@/components/sections";
import { ServiceGrid } from "@/components/ServiceCard";
import {
  Button,
  Doodle,
  Eyebrow,
  RichHeading,
  Section,
  SectionHeader,
  TrustChip,
} from "@/components/ui";
import {
  cta,
  feature,
  intro,
  marquee,
  process,
  processHeader,
  servicesHeader,
} from "@/content/home";
import { services } from "@/content/services";

export default function Home() {
  return (
    <>
      <BentoHero />

      <Marquee items={marquee} />

      {/* What we believe */}
      <Section className="bg-cream">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>{intro.label}</Eyebrow>
            <RichHeading
              text={intro.headline}
              className="mt-4 text-section text-ink"
            />
          </div>
          <div>
            <p className="u-prose text-ink/80">{intro.body}</p>
            <p className="u-prose mt-5 text-ink/80">{intro.body2}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href={intro.primary.href}>{intro.primary.label}</Button>
              <Button href={intro.secondary.href} variant="secondary">
                {intro.secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Six services */}
      <Section className="bg-cream-deep">
        <SectionHeader
          label={servicesHeader.label}
          headline={servicesHeader.headline}
          align="center"
          className="mx-auto max-w-2xl"
        />
        <ServiceGrid services={services} className="mt-14" />
        <div className="mt-12 text-center">
          <Button href="/services" variant="secondary">
            See all services
          </Button>
        </div>
      </Section>

      {/* Why families choose us */}
      <Section className="bg-cream">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <PhotoFrame
              src={feature.image.src}
              alt={feature.image.alt}
              color="sky"
              className="h-[26rem] w-full sm:h-[32rem]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <Doodle
              name="infinity"
              color="text-tomato"
              className="absolute -right-4 -top-5 h-16 w-16"
            />
          </div>
          <div>
            <Eyebrow>{feature.label}</Eyebrow>
            <RichHeading
              text={feature.headline}
              className="mt-4 text-section text-ink"
            />
            <p className="u-prose mt-6 text-ink/80">{feature.body}</p>
            <p className="u-prose mt-5 text-ink/80">{feature.body2}</p>
            <TrustChip className="mt-7" />
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href={feature.primary.href}>
                {feature.primary.label}
              </Button>
              <Button href={feature.secondary.href} variant="secondary">
                {feature.secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Getting started */}
      <Section className="bg-cream-deep">
        <SectionHeader
          label={processHeader.label}
          headline={processHeader.headline}
          align="center"
          className="mx-auto max-w-2xl"
        />
        <div className="mt-14">
          <ProcessSteps steps={process} />
        </div>
      </Section>

      <CtaBand
        headline={cta.headline}
        body={cta.body}
        primary={cta.primary}
        secondary={cta.secondary}
      />
    </>
  );
}
