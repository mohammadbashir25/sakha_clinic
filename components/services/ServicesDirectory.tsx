"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import {
  getServiceNumber,
  serviceCategories,
  services,
  type ServiceCategory,
} from "./data";

type Filter = "all" | ServiceCategory;

const FILTERS: readonly Filter[] = ["all", ...serviceCategories];

export default function ServicesDirectory() {
  const t = useTranslations("ServicesPage");
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all"
      ? services
      : services.filter((service) => service.category === filter);

  return (
    <section className="border-t border-charcoal/10 bg-ivory py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="text-balance text-3xl leading-[1.25] text-charcoal sm:text-4xl">
            {t("directory.title")}
          </h2>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((item) => {
              const active = item === filter;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid ${
                    active
                      ? "border-primary bg-primary text-ivory"
                      : "border-charcoal/20 text-charcoal hover:border-orchid hover:text-orchid"
                  }`}
                >
                  {t(`categories.${item}`)}
                </button>
              );
            })}
          </div>
        </div>

        <ul key={filter} className="mt-10 border-t border-charcoal/15">
          {visible.map((service, index) => {
            const featured = index % 5 === 0;
            return (
              <motion.li
                key={service.slug}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: Math.min(index, 5) * 0.04,
                }}
                className="border-b border-charcoal/15"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className={`group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-4 sm:gap-x-8 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orchid ${
                    featured ? "py-9 sm:py-12" : "py-6 sm:py-8"
                  }`}
                >
                  <span
                    className={`w-10 font-light tabular-nums text-primary/35 transition-colors duration-200 group-hover:text-orchid sm:w-16 ${
                      featured ? "text-3xl sm:text-5xl" : "text-2xl sm:text-4xl"
                    }`}
                  >
                    {getServiceNumber(service.slug)}
                  </span>

                  <div className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.16em] text-muted rtl:tracking-normal">
                      {t(`categories.${service.category}`)}
                    </span>
                    <h3
                      className={`mt-1 text-charcoal ${
                        featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
                      }`}
                    >
                      {t(`${service.translationKey}.title`)}
                    </h3>
                    <p className="mt-1 line-clamp-2 max-w-xl text-sm leading-relaxed text-muted">
                      {t(`${service.translationKey}.description`)}
                    </p>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-colors duration-200 group-hover:border-orchid group-hover:text-orchid">
                    <FiArrowUpRight
                      className="h-4 w-4 rtl:-scale-x-100"
                      aria-hidden="true"
                    />
                  </span>

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-orchid transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none rtl:origin-right"
                  />
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}