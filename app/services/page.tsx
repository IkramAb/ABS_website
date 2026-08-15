import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServiceGrid } from "@/components/ServiceCard";
import { CtaBand } from "@/components/sections";
import { Section, TrustChip } from "@/components/ui";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six therapy services for children on the autism spectrum — early intensive ABA, communication and social skills, home and in-clinic support, parent and caregiver support, occupational therapy, and school collaboration. MA and Medicaid accepted.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="What we offer"
        headline="Therapy that fits your *child*"
        body="Every service is evidence-based, clinician-led, and built around your child's individual treatment plan — not a template. Minnesota Medical Assistance and Medicaid accepted."
        cta={{ label: "Start a referral", href: "/referrals" }}
      >
        <TrustChip className="mt-9" />
      </PageHero>

      <Section className="bg-cream">
        <ServiceGrid services={services} />
      </Section>

      <CtaBand
        headline="Not sure where to *start?*"
        body="Submit a referral and our intake team will match your child with the right program."
        primary={{ label: "Start a referral", href: "/referrals" }}
      />
    </>
  );
}
