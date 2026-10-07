import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./AboutShared";

export default async function AboutLearning() {
  const t = await getTranslations("AboutPage");

  return (
    <section className="bg-ivory py-20 lg:py-24">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>{t("learning.eyebrow")}</Eyebrow>
          <h2 className="mt-4 text-balance text-2xl leading-[1.3] text-charcoal sm:text-3xl">
            {t("learning.title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            {t("learning.description")}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}