import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { Eyebrow } from "./AboutShared";
import { principleKeys } from "./data";

export default async function AboutApproach() {
  const t = await getTranslations("AboutPage");

  return (
    <section className="bg-ivory py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>{t("approach.eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-balance text-3xl leading-[1.25] text-charcoal sm:text-4xl">
              {t("approach.title")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              {t("approach.description")}
            </p>
          </Reveal>

          <RevealGroup as="ol" className="border-t border-charcoal/15">
            {principleKeys.map((key, index) => (
              <RevealItem
                as="li"
                key={key}
                className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-b border-charcoal/15 py-8 sm:grid-cols-[auto_1fr_1.3fr] sm:gap-x-8"
              >
                <span
                  aria-hidden="true"
                  className="pt-1 text-sm text-champagne tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl text-charcoal">
                  {t(`approach.principles.${key}.title`)}
                </h3>
                <p className="col-start-2 text-base leading-relaxed text-muted sm:col-start-3">
                  {t(`approach.principles.${key}.description`)}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}