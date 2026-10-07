import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { Eyebrow } from "./AboutShared";
import { experienceKeys } from "./data";

export default async function AboutExperience() {
  const t = await getTranslations("AboutPage");

  return (
    <section className="bg-lavender/40 py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{t("experience.eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-balance text-3xl leading-[1.25] text-charcoal sm:text-4xl">
              {t("experience.title")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              {t("experience.description")}
            </p>
          </Reveal>

          <RevealGroup
            as="ol"
            className="space-y-12 border-s border-charcoal/15 ps-8 sm:ps-10"
          >
            {experienceKeys.map((key) => (
              <RevealItem as="li" key={key} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -start-[37px] top-2 h-2 w-2 rounded-full bg-champagne sm:-start-[45px]"
                />
                <span className="text-sm text-orchid tabular-nums">
                  {t(`experience.${key}.number`)}
                </span>
                <h3 className="mt-2 text-xl text-charcoal sm:text-2xl">
                  {t(`experience.${key}.title`)}
                </h3>
                <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
                  {t(`experience.${key}.description`)}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}