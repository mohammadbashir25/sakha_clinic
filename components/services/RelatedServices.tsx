import { getTranslations } from "next-intl/server";
import { FiArrowUpRight } from "react-icons/fi";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";
import ServiceVisual from "./ServicesVisual";
import {
  getServiceBySlug,
  getServiceNumber,
  type ServiceDef,
} from "./data";

export default async function RelatedServices({
  service,
}: {
  service: ServiceDef;
}) {
  const t = await getTranslations("ServicesPage");

  const related = service.related
    .map((slug) => getServiceBySlug(slug))
    .filter((item): item is ServiceDef => Boolean(item));

  if (related.length === 0) return null;

  return (
    <section
      aria-labelledby="related-services-heading"
      className="bg-ivory py-16 lg:py-24"
    >
      <Container>
        <Reveal>
          <h2
            id="related-services-heading"
            className="text-balance text-2xl leading-[1.3] text-charcoal sm:text-3xl"
          >
            {t("related.title")}
          </h2>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/services/${item.slug}`}
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orchid"
              >
                <ServiceVisual
                  variant="compact"
                  number={getServiceNumber(item.slug)}
                  category={item.category}
                  categoryLabel={t(`categories.${item.category}`)}
                  icon={item.icon}
                />
                <div className="mt-4 flex items-center justify-between gap-4">
                  <h3 className="text-lg text-charcoal transition-colors duration-200 group-hover:text-orchid">
                    {t(`${item.translationKey}.title`)}
                  </h3>
                  <FiArrowUpRight
                    className="h-4 w-4 shrink-0 text-charcoal transition-colors duration-200 group-hover:text-orchid rtl:-scale-x-100"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}