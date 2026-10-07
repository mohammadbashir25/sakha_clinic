import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./AboutShared";

export default async function AboutPhilosophy() {
  const t = await getTranslations("AboutPage");

  return (
    <section className="bg-ivory py-24 lg:py-32">
      <Container>
        <Reveal className="mx-auto max-w-4xl">
          <Eyebrow>{t("philosophy.eyebrow")}</Eyebrow>
          <h2 className="mt-6 text-balance border-s border-orchid/40 ps-6 text-3xl font-normal leading-[1.35] text-charcoal sm:text-4xl lg:text-5xl lg:leading-[1.3]">
            {t("philosophy.title")}
          </h2>
          <p className="mt-8 max-w-2xl ps-6 text-base leading-relaxed text-muted sm:text-lg">
            {t("philosophy.description")}
          </p>
          <p className="mt-10 ps-6 text-sm font-medium tracking-wide text-orchid">
            {t("philosophy.quote")}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}