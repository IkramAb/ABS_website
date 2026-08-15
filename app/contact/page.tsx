import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Section, tileBg } from "@/components/ui";
import { contact } from "@/content/site";
import { details, hero, referralsCallout } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: `Questions about ABA therapy in Minneapolis? Call ${contact.phone} or email ${contact.email}. Minnesota Medical Assistance and Medicaid accepted.`,
};

const values: Record<string, { value: string; href?: string }> = {
  Phone: { value: contact.phone, href: contact.phoneHref },
  Email: { value: contact.email, href: `mailto:${contact.email}` },
  Address: { value: contact.addressLine },
  Insurance: { value: "MA & Medicaid" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero label={hero.label} headline={hero.headline} body={hero.body} />

      <Section className="bg-cream">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <ul className="grid gap-5 sm:grid-cols-2">
              {details.map((detail) => {
                const entry = values[detail.title];
                return (
                  <li
                    key={detail.title}
                    className={`rounded-tile ${tileBg(detail.color)} p-7`}
                  >
                    <h2 className="u-label text-ink/70">{detail.title}</h2>
                    <p className="mt-3 break-words text-base font-bold leading-snug text-ink">
                      {entry.href ? (
                        <a href={entry.href} className="hover:text-tomato">
                          {entry.value}
                        </a>
                      ) : (
                        entry.value
                      )}
                    </p>
                    {detail.note && (
                      <p className="mt-2 text-sm leading-relaxed text-ink">
                        {detail.note}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 rounded-tile bg-ink p-8">
              <h2 className="text-card text-cream">{referralsCallout.title}</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/75">
                {referralsCallout.body}
              </p>
              <Link
                href={referralsCallout.cta.href}
                className="mt-6 inline-flex items-center gap-2 rounded-chip bg-sun px-6 py-3 font-bold text-ink transition hover:bg-sun/90"
              >
                {referralsCallout.cta.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="rounded-tile bg-cream-deep p-6 sm:p-9">
            <h2 className="text-card text-ink">Send us a message</h2>
            <p className="mt-2 text-sm text-ink/70">
              We reply within one business day.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
