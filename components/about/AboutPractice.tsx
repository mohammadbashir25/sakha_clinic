import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { Eyebrow } from "./AboutShared";
import { practiceKeys } from "./data";

export default async function AboutPractice() {
  const t = await getTranslations("AboutPage");

  return (
    <section className="bg-lavender/40 py-20 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{t("expertise.eyebrow")}</Eyebrow>
          <h2 className="mt-4 text-balance text-3xl leading-[1.25] text-charcoal sm:text-4xl">
            {t("expertise.title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            {t("expertise.description")}
          </p>
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {practiceKeys.map((key, index) => (
            <RevealItem
              as="li"
              key={key}
              className="border-t border-charcoal/15 pt-5"
            >
              <span
                aria-hidden="true"
                className="text-xs text-muted tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-base leading-snug text-charcoal">
                {t(`expertise.items.${key}`)}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}