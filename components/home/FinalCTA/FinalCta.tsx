import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { finalCtaLinks, type FinalCtaContentData } from "./data";
import FinalCtaContent from "./FinalCtaContent";

/**
 * Final CTA — the last conversion moment on the page.
 *
 * Stays a Server Component: copy is resolved here via next-intl and passed
 * down as plain props, so the client bundle only carries the motion code.
 */
export default async function FinalCta() {
  const t = await getTranslations("FinalCTA");

  const data: FinalCtaContentData = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    description: t("description"),
    primaryCta: t("primaryCta"),
    secondaryCta: t("secondaryCta"),
    note: t("note"),
    primaryHref: finalCtaLinks.primary,
    secondaryHref: finalCtaLinks.secondary,
  };

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative isolate overflow-hidden bg-[#320154] px-6 py-24 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 end-[-10%] h-[520px] w-[520px] rounded-full bg-[#C9A86A] opacity-[0.08] blur-[140px] motion-safe:animate-[sakha-glow_9s_ease-in-out_infinite]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#210038] opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <Container className="relative">
        <FinalCtaContent data={data} />
      </Container>

      <style>
        {`
          @keyframes sakha-glow {
            0%, 100% { opacity: 0.06; transform: scale(1); }
            50% { opacity: 0.12; transform: scale(1.06); }
          }
        `}
      </style>
    </section>
  );
}
