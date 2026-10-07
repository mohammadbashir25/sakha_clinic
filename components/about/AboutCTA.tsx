import { getTranslations } from "next-intl/server";
import { FiArrowUpRight } from "react-icons/fi";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./AboutShared";
import { aboutLinks } from "./data";

export default async function AboutCTA() {
  const t = await getTranslations("AboutPage");

  return (
    <section
      aria-labelledby="about-cta-heading"
      className="bg-primary py-24 lg:py-28"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t("cta.eyebrow")}</Eyebrow>
          <h2
            id="about-cta-heading"
            className="mt-4 text-balance text-3xl leading-[1.25] text-ivory sm:text-4xl"
          >
            {t("cta.title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ivory/70 sm:text-lg">
            {t("cta.description")}
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Link
              href={aboutLinks.primary}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ivory px-8 py-4 text-base font-medium text-primary transition-colors duration-200 hover:bg-champagne hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
            >
              {t("cta.primary")}
              <FiArrowUpRight
                className="h-4 w-4 rtl:-scale-x-100"
                aria-hidden="true"
              />
            </Link>
            <Link
              href={aboutLinks.secondary}
              className="inline-flex items-center justify-center rounded-full border border-ivory/30 px-8 py-4 text-base font-medium text-ivory transition-colors duration-200 hover:border-orchid-light/60 hover:text-orchid-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orchid-light"
            >
              {t("cta.secondary")}
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}