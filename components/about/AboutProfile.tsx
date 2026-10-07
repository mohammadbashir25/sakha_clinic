import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./AboutShared";

export default async function AboutProfile() {
  const t = await getTranslations("AboutPage");

  return (
    <section className="border-t border-charcoal/10 bg-ivory py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{t("profile.eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-balance text-3xl leading-[1.25] text-charcoal sm:text-4xl">
              {t("profile.title")}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
              {t("profile.description")}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}