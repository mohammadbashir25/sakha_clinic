"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { HiOutlineArrowRight, HiOutlineCalendarDays } from "react-icons/hi2";
import { Link } from "@/i18n/navigation";
import { appointmentPath, getServiceHref, services, servicesIndexPath } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const viewport = { once: true, amount: 0.15 } as const;

/** Arrow that points toward the inline end: flipped in RTL, nudged on row hover. */
const arrowClass =
  "shrink-0 transition-transform duration-300 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1";

/**
 * Stretched-link focus ring: the link's ::after covers the whole row, so the
 * visible focus indicator is drawn on that pseudo-element.
 */
const stretchedLink =
  "relative inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-300 hover:text-primary-dark focus-visible:outline-none after:absolute after:-inset-x-2 after:-inset-y-5 after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-orchid sm:text-base";

/**
 * Signature Services content, top to bottom:
 *
 * 1. Header — eyebrow, dominant heading, supporting paragraph
 * 2. Six services as one ordered list. The first (Hair Transplantation) is
 *    featured with a very large champagne numeral and bigger type; the other
 *    five are a quiet numbered list with hairline separators. Each row has a
 *    single "stretched" link whose text is the translated `link` label, so the
 *    whole row is clickable while the accessible name stays meaningful.
 * 3. Dr. Sakha's approach — an editorial conclusion on a lavender surface
 *    with a champagne edge, not a card
 * 4. CTAs — "Explore All Services" primary, "Book an Appointment" secondary
 *
 * All text is from "SignatureServices.*"; hrefs come from ./data and are
 * locale-prefixed by the `Link` from "@/i18n/navigation". Layout uses grid
 * order and logical properties (border-s, ps, start/end), so it mirrors in
 * Dari / Pashto; tracking and uppercase are avoided for Arabic script.
 * Blocks reveal once on scroll; reduced-motion users get the final state.
 */
export function SignatureServicesContent() {
  const t = useTranslations("SignatureServices");
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : "hidden";

  return (
    <div className="flex flex-col gap-14 sm:gap-16 lg:gap-20">
      {/* 1. Header */}
      <motion.div
        className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-16"
        initial={initial}
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <div className="flex flex-col gap-5 lg:col-span-7">
          <motion.p
            variants={fadeUp}
            className="flex items-center gap-3 text-sm font-medium text-muted"
          >
            <span aria-hidden="true" className="h-px w-8 bg-champagne" />
            {t("eyebrow")}
          </motion.p>
          <motion.h2
            id="signature-services-heading"
            variants={fadeUp}
            className="text-3xl font-semibold leading-[1.2] text-primary sm:text-4xl lg:text-5xl rtl:leading-[1.45]"
          >
            {t("title")}
          </motion.h2>
        </div>
        <motion.p
          variants={fadeUp}
          className="text-base leading-relaxed text-muted sm:text-lg lg:col-span-5"
        >
          {t("description")}
        </motion.p>
      </motion.div>

      {/* 2. Services */}
      <motion.ol
        className="flex flex-col"
        initial={initial}
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        {services.map((service, index) => {
          const isFeatured = index === 0;
          const href = getServiceHref(service);

          if (isFeatured) {
            return (
              <motion.li
                key={service.key}
                variants={fadeUp}
                className="group relative grid grid-cols-1 gap-4 border-t border-champagne py-10 sm:py-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-14"
              >
                <span
                  aria-hidden="true"
                  className="text-7xl font-light leading-none text-champagne sm:text-8xl lg:col-span-3 lg:text-9xl"
                >
                  {t(`services.${service.key}.number`)}
                </span>

                <div className="flex flex-col gap-4 lg:col-span-9">
                  <h3 className="text-3xl font-semibold leading-[1.2] text-primary sm:text-4xl lg:text-5xl rtl:leading-[1.45]">
                    {t(`services.${service.key}.title`)}
                  </h3>
                  <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                    {t(`services.${service.key}.description`)}
                  </p>
                  <div>
                    <Link href={href} className={stretchedLink}>
                      {t(`services.${service.key}.link`)}
                      <HiOutlineArrowRight size={18} aria-hidden="true" className={arrowClass} />
                    </Link>
                  </div>
                </div>
              </motion.li>
            );
          }

          return (
            <motion.li
              key={service.key}
              variants={fadeUp}
              className="group relative grid grid-cols-1 gap-3 border-t border-muted/15 py-7 last:border-b md:grid-cols-12 md:items-start md:gap-8 md:py-8"
            >
              <span
                aria-hidden="true"
                className="text-sm font-medium tabular-nums text-primary/60 md:col-span-1 md:pt-2"
              >
                {t(`services.${service.key}.number`)}
              </span>

              <h3 className="text-xl font-semibold leading-snug text-charcoal transition-colors duration-300 group-hover:text-primary md:col-span-4 md:text-2xl rtl:leading-[1.5]">
                {t(`services.${service.key}.title`)}
              </h3>

              <p className="text-sm leading-relaxed text-muted sm:text-base md:col-span-4">
                {t(`services.${service.key}.description`)}
              </p>

              <div className="md:col-span-3 md:flex md:justify-end">
                <Link href={href} className={stretchedLink}>
                  {t(`services.${service.key}.link`)}
                  <HiOutlineArrowRight size={16} aria-hidden="true" className={arrowClass} />
                </Link>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>

      {/* 3. Philosophy */}
      <motion.div
        className="grid grid-cols-1 gap-6 border-s-2 border-champagne bg-lavender px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-12 lg:gap-16 lg:px-14 lg:py-16"
        initial={initial}
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <motion.p
          variants={fadeUp}
          className="text-sm font-medium text-primary/70 lg:col-span-4 lg:pt-3"
        >
          {t("philosophy.eyebrow")}
        </motion.p>
        <div className="flex flex-col gap-5 lg:col-span-8">
          <motion.h3
            variants={fadeUp}
            className="text-2xl font-semibold leading-[1.25] text-primary sm:text-3xl lg:text-4xl rtl:leading-[1.5]"
          >
            {t("philosophy.title")}
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-base leading-relaxed text-charcoal/75"
          >
            {t("philosophy.description")}
          </motion.p>
        </div>
      </motion.div>

      {/* 4. CTAs */}
      <motion.div
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5"
        initial={initial}
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="flex">
          <Link
            href={servicesIndexPath}
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 text-base font-medium text-ivory transition-colors duration-300 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory sm:w-auto"
          >
            {t("viewAll")}
            <HiOutlineArrowRight size={18} aria-hidden="true" className={arrowClass} />
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} className="flex">
          <Link
            href={appointmentPath}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-primary/25 px-7 text-base font-medium text-primary transition-colors duration-300 hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory sm:w-auto"
          >
            <HiOutlineCalendarDays size={18} aria-hidden="true" />
            {t("bookAppointment")}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}