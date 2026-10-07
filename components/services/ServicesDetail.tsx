import { getTranslations } from "next-intl/server";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";
import ServiceVisual from "./ServicesVisual";
import { Eyebrow, buttonOnLight } from "./ServicesShared";
import { getServiceNumber, servicesLinks, type ServiceDef } from "./data";

export default async function ServiceDetail({
  service,
}: {
  service: ServiceDef;
}) {
  const t = await getTranslations("ServicesPage");
  const base = service.translationKey;
  const categoryLabel = t(`categories.${service.category}`);

  // Optional longer client wording: blank-line separated paragraphs.
  const body = t.has(`${base}.body`)
    ? t(`${base}.body`)
        .split(/\n{2,}/)
        .map((part) => part.trim())
        .filter(Boolean)
    : [];

  return (
    <>
      <section className="bg-ivory pb-16 pt-12 sm:pt-16 lg:pb-24">
        <Container>
          <Reveal>
            <Link
              href={servicesLinks.index}
              className="inline-flex items-center gap-2 py-1 text-sm text-muted transition-colors duration-200 hover:text-orchid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
            >
              <FiArrowLeft
                className="h-4 w-4 rtl:-scale-x-100"
                aria-hidden="true"
              />
              {t("detail.back")}
            </Link>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <Reveal>
              <Eyebrow>{categoryLabel}</Eyebrow>
              <h1 className="mt-5 text-balance text-4xl leading-[1.2] text-charcoal sm:text-5xl lg:text-6xl">
                {t(`${base}.title`)}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                {t(`${base}.description`)}
              </p>

              {body.length > 0 && (
                <div className="mt-8 max-w-xl space-y-4">
                  {body.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-relaxed text-charcoal/80"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              <div className="mt-10">
                <Link href={servicesLinks.appointment} className={buttonOnLight}>
                  {t("cta.primary")}
                  <FiArrowUpRight
                    className="h-4 w-4 rtl:-scale-x-100"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <ServiceVisual
                variant="detail"
                number={getServiceNumber(service.slug)}
                category={service.category}
                categoryLabel={categoryLabel}
                icon={service.icon}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-lavender/40 py-16 lg:py-24">
        <Container>
          <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <div
                aria-hidden="true"
                className="mb-6 h-px w-12 bg-champagne/80"
              />
              <h2 className="text-balance text-2xl leading-[1.3] text-charcoal sm:text-3xl">
                {t("detail.assessment.title")}
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {t("detail.assessment.description")}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}