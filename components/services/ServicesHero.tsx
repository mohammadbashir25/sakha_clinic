import { getTranslations } from "next-intl/server";
import { FiArrowUpRight } from "react-icons/fi";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";
import { Eyebrow, buttonOnLight } from "./ServicesShared";
import {
  countByCategory,
  serviceCategories,
  services,
  servicesLinks,
} from "./data";

export default async function ServicesHero() {
  const t = await getTranslations("ServicesPage");

  return (
    <section className="bg-ivory pb-16 pt-16 sm:pt-20 lg:pb-24 lg:pt-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.2] text-charcoal sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {t("hero.description")}
            </p>
            <div className="mt-9">
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
            <div className="relative isolate overflow-hidden border border-charcoal/10 bg-lavender/50 p-6 sm:p-8">
              <div
                aria-hidden="true"
                className="absolute -end-20 -top-20 h-72 w-72 rounded-full border border-primary/15"
              />
              <div
                aria-hidden="true"
                className="absolute -end-10 -top-10 h-52 w-52 rounded-full border border-primary/15"
              />

              <p
                aria-hidden="true"
                className="relative text-[8rem] font-light leading-none tabular-nums text-primary sm:text-[11rem]"
              >
                {services.length}
              </p>
              <div aria-hidden="true" className="mt-4 h-px bg-champagne/70" />

              <ul className="relative mt-4 divide-y divide-charcoal/10">
                {serviceCategories.map((category) => (
                  <li
                    key={category}
                    className="flex items-baseline gap-4 py-3 text-sm"
                  >
                    <span className="w-8 tabular-nums text-orchid">
                      {String(countByCategory(category)).padStart(2, "0")}
                    </span>
                    <span className="text-charcoal">
                      {t(`categories.${category}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}