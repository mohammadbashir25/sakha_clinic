import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Reveal } from "./Reveal";
import { AboutPortrait, Eyebrow, splitList } from "./AboutShared";
import { aboutImages } from "./data";

export default async function AboutHero() {
  const t = await getTranslations("AboutPage");
  const specialties = splitList(t("profile.specialties"));

  return (
    <section className="bg-ivory pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.2] text-charcoal sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {t("hero.description")}
            </p>

            {specialties.length > 0 && (
              <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-charcoal/80">
                {specialties.map((item, index) => (
                  <li key={item} className="flex items-center gap-3">
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 rounded-full bg-champagne"
                      />
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          <Reveal delay={0.15} className="mx-auto w-full max-w-md lg:max-w-none">
            <AboutPortrait
              image={aboutImages.hero}
              alt={t("profile.eyebrow")}
              priority
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}