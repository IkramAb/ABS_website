import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { PhotoFrame } from "@/components/PhotoFrame";
import { ServiceGrid } from "@/components/ServiceCard";
import { CtaBand } from "@/components/sections";
import {
  Doodle,
  Eyebrow,
  Section,
  SectionHeader,
  tileBg,
} from "@/components/ui";
import { getService, otherServices, services } from "@/content/services";
import { site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  return {
    title: service.title,
    description: service.tagline,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} · ${site.name}`,
      description: service.tagline,
      url: `${site.url}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const others = otherServices(slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Services",
          item: `${site.url}/services`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: service.title,
          item: `${site.url}/services/${service.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <>
      <PageHero
        headline={service.title}
        body={service.tagline}
        bg={service.color}
        breadcrumb={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        cta={{ label: "Start a referral", href: "/referrals" }}
      >
        <p className="mt-9 text-sm font-semibold text-ink/70">{service.tag}</p>
      </PageHero>

      {/* Key benefits */}
      <Section className="bg-cream">
        <SectionHeader
          label="Key benefits"
          headline="What this gives your *child*"
          className="max-w-2xl"
        />
        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          {service.benefits.map((benefit, i) => (
            <li
              key={benefit.title}
              className={`anim-rise flex flex-col rounded-tile ${tileBg(
                service.color
              )} p-8`}
              style={{ ["--rise-delay" as string]: `${i * 60}ms` }}
            >
              <span
                aria-hidden="true"
                className="font-display text-5xl font-semibold text-ink/30"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-card text-ink">{benefit.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink">
                {benefit.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* What this actually looks like */}
      <Section className="bg-cream-deep">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <PhotoFrame
              src={service.image}
              alt={service.alt}
              color={service.color}
              className="h-[24rem] w-full sm:h-[30rem]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <Doodle
              name="infinity"
              color="text-tomato"
              className="absolute -right-3 -top-4 h-14 w-14"
            />
          </div>
          <div>
            <Eyebrow>What this actually looks like</Eyebrow>
            <h2 className="mt-4 text-subsection text-ink">
              A real session, not a brochure
            </h2>
            <p className="u-prose mt-6 text-[1.05rem] text-ink/80">
              {service.looksLike}
            </p>
          </div>
        </div>
      </Section>

      {/* Who it's for */}
      <Section className="bg-cream">
        <div className="relative overflow-hidden rounded-tile bg-cream-deep p-8 sm:p-12">
          <Doodle
            name="star"
            color="text-ink/15"
            className="absolute right-7 top-7 h-10 w-10"
          />
          <Eyebrow>Who it&apos;s for</Eyebrow>
          <p className="u-prose mt-5 text-lg leading-relaxed text-ink sm:text-xl">
            {service.whoItsFor}
          </p>
        </div>
      </Section>

      {/* FAQ — rendered open: with one or two questions an accordion only
          hides the answer behind an extra click. */}
      <Section className="bg-cream-deep">
        <SectionHeader
          label="Common questions"
          headline="Good to *know*"
          className="max-w-2xl"
        />
        <dl className="mt-12 grid gap-6 lg:grid-cols-2">
          {service.faq.map((item) => (
            <div key={item.q} className="rounded-tile bg-cream p-8">
              <dt className="text-xl text-ink font-display font-semibold">
                {item.q}
              </dt>
              <dd className="mt-3 text-[0.95rem] leading-relaxed text-ink/80">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Cross-links */}
      <Section className="bg-cream">
        <SectionHeader
          label="Keep exploring"
          headline="Explore our other *services*"
          align="center"
          className="mx-auto max-w-2xl"
        />
        <ServiceGrid services={others} className="mt-14" />
      </Section>

      <CtaBand
        headline="Ready to take the *first step?*"
        body="Start a referral and our intake team will reach out within 1–2 business days."
        primary={{ label: "Start a referral", href: "/referrals" }}
        secondary={{ label: "Contact us first", href: "/contact" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
