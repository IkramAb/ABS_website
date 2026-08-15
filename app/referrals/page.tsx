import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ReferralForm } from "@/components/ReferralForm";
import { ProcessSteps } from "@/components/sections";
import { RichHeading, Section, Doodle } from "@/components/ui";
import { contact } from "@/content/site";
import { hero, info, maCallout, steps } from "@/content/referrals";

export const metadata: Metadata = {
  title: "Referrals",
  description:
    "Submitting a referral takes less than five minutes. Our intake team will reach out within 1–2 business days — at no cost to you. MA and Medicaid accepted.",
};

const detailRows = [
  { label: "Phone", value: contact.phone, href: contact.phoneHref },
  {
    label: "Email",
    value: contact.referralEmail,
    href: `mailto:${contact.referralEmail}`,
  },
  { label: "Address", value: contact.addressLine },
  { label: "Hours", value: contact.hoursLong },
];

export default function ReferralsPage() {
  return (
    <>
      <PageHero label={hero.label} headline={hero.headline} body={hero.body} />

      <Section className="bg-cream">
        <ProcessSteps steps={steps} />
      </Section>

      <Section className="bg-cream-deep">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <RichHeading
              text={info.headline}
              className="text-section text-ink"
            />
            <p className="u-prose mt-6 text-ink/80">{info.body}</p>

            <dl className="mt-10 space-y-5">
              {detailRows.map((row) => (
                <div
                  key={row.label}
                  className="border-b border-ink/15 pb-5 last:border-0"
                >
                  <dt className="u-label text-ink/50">{row.label}</dt>
                  <dd className="mt-2 text-lg font-bold text-ink">
                    {row.href ? (
                      <a href={row.href} className="hover:text-tomato">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="relative mt-10 overflow-hidden rounded-tile bg-leaf p-8">
              <Doodle
                name="star"
                color="text-ink/20"
                className="absolute right-6 top-6 h-9 w-9"
              />
              <h2 className="text-card text-ink">{maCallout.title}</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink">
                {maCallout.body}
              </p>
            </div>
          </div>

          <div className="rounded-tile bg-cream p-6 sm:p-9">
            <h2 className="text-card text-ink">Referral form</h2>
            <p className="mt-2 text-sm text-ink/70">
              All information is strictly confidential.
            </p>
            <div className="mt-8">
              <ReferralForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
