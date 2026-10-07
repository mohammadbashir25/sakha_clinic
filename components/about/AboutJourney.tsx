import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { Eyebrow } from "./AboutShared";
import { journeyKeys } from "./data";

export default async function AboutJourney() {
  const t = await getTranslations("AboutPage");

  return (
    <section className="bg-lavender/40 py-20 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{t("journey.eyebrow")}</Eyebrow>
          <h2 className="mt-4 text-balance text-3xl leading-[1.25] text-charcoal sm:text-4xl">
            {t("journey.title")}
          </h2>
        </Reveal>

        <RevealGroup
          as="ol"
          className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {journeyKeys.map((key) => (
            <RevealItem
              as="li"
              key={key}
              className="border-t border-charcoal/20 pt-6"
            >
              <span className="text-3xl font-light text-orchid tabular-nums">
                {t(`journey.steps.${key}.number`)}
              </span>
              <h3 className="mt-4 text-lg text-charcoal">
                {t(`journey.steps.${key}.title`)}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {t(`journey.steps.${key}.description`)}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}