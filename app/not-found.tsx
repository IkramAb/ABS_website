import { Button, Doodle, Eyebrow } from "@/components/ui";
import { contact } from "@/content/site";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden px-5 py-28 text-center sm:px-8 md:py-36">
      <Doodle
        name="squiggle"
        color="text-sky"
        className="absolute left-[10%] top-20 hidden h-12 w-12 lg:block"
      />
      <Doodle
        name="star"
        color="text-sun"
        className="absolute right-[12%] top-32 hidden h-11 w-11 lg:block"
      />

      <div className="mx-auto w-full max-w-xl">
        <Eyebrow>Page not found</Eyebrow>
        <h1 className="mt-5 text-section text-ink">
          This page took a <span className="text-tomato">detour.</span>
        </h1>
        <p className="mt-6 text-[1.05rem] leading-relaxed text-ink/75">
          The page you were looking for isn&apos;t here. Head back home, or call
          us at{" "}
          <a
            href={contact.phoneHref}
            className="font-bold text-ink underline decoration-sun decoration-4 underline-offset-4"
          >
            {contact.phone}
          </a>{" "}
          and we&apos;ll point you in the right direction.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/referrals" variant="secondary">
            Start a referral
          </Button>
        </div>
      </div>
    </section>
  );
}
