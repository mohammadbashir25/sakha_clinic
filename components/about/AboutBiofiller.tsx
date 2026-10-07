import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./AboutShared";

export default async function AboutBiofiller() {
  const t = await getTranslations("AboutPage");

  return (
    <section className="bg-primary-dark py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{t("biofiller.eyebrow")}</Eyebrow>
            <div aria-hidden="true" className="mt-6 h-px w-12 bg-champagne/70" />
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-balance text-3xl leading-[1.25] text-ivory sm:text-4xl lg:text-5xl lg:leading-[1.2]">
              {t("biofiller.title")}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/75 sm:text-lg">
              {t("biofiller.description")}
            </p>
            <p className="mt-8 max-w-2xl border-s border-champagne/50 ps-5 text-sm leading-relaxed text-ivory/60">
              {t("biofiller.note")}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}