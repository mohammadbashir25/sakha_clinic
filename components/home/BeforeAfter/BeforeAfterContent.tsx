"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineCalendarDays } from "react-icons/hi2";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Link } from "@/i18n/navigation";
import { appointmentPath, beforeAfterCases } from "./data";

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

const controlFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-lavender";

/**
 * Before & After content:
 *
 * 1. Header — eyebrow, heading, description
 * 2. One active case in a plain frame. The client's image is shown whole with
 *    object-contain at its own aspect ratio, so the before/after relationship
 *    and edge details are never cropped, and no labels are drawn over it (the
 *    client images carry their own). Cases change only on user input — there
 *    is no autoplay. The image cross-fades quickly; with reduced motion it
 *    swaps instantly.
 * 3. Navigation — previous / numbered selector / next. Buttons are 44px+,
 *    the active case is shown by fill, `aria-current` and a visible
 *    "Case n / total" counter (not by color alone). Previous/next arrows are
 *    mirrored in RTL and the row order follows the document direction.
 * 4. A subtle disclaimer, then a quiet appointment CTA.
 *
 * Alt text is generic ("Before & After — Case n") and never contains patient
 * information. Until real images are set in ./data, ImagePlaceholder is used.
 */
export function BeforeAfterContent() {
  const t = useTranslations("BeforeAfter");
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : "hidden";
  const [activeIndex, setActiveIndex] = useState(0);

  const total = beforeAfterCases.length;
  const activeCase = beforeAfterCases[activeIndex];
  const activeNumber = activeIndex + 1;
  const alt = `${t("eyebrow")} — ${t("case")} ${activeNumber}`;

  const goPrevious = () => setActiveIndex((index) => (index - 1 + total) % total);
  const goNext = () => setActiveIndex((index) => (index + 1) % total);

  return (
    <div className="flex flex-col gap-12 sm:gap-14 lg:gap-16">
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
            className="flex items-center gap-3 text-sm font-medium text-primary/70"
          >
            <span aria-hidden="true" className="h-px w-8 bg-champagne" />
            {t("eyebrow")}
          </motion.p>
          <motion.h2
            id="before-after-heading"
            variants={fadeUp}
            className="text-3xl font-semibold leading-[1.2] text-primary sm:text-4xl lg:text-5xl rtl:leading-[1.45]"
          >
            {t("title")}
          </motion.h2>
        </div>
        <motion.p
          variants={fadeUp}
          className="text-base leading-relaxed text-charcoal/75 sm:text-lg lg:col-span-5"
        >
          {t("description")}
        </motion.p>
      </motion.div>

      {/* 2–4. Showcase */}
      <motion.div
        className="mx-auto flex w-full max-w-4xl flex-col gap-6"
        initial={initial}
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          className="rounded-lg border border-muted/15 bg-white p-2 sm:p-3"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeCase.id}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: EASE }}
            >
              {activeCase.image ? (
                <Image
                  src={activeCase.image.src}
                  width={activeCase.image.width}
                  height={activeCase.image.height}
                  alt={alt}
                  sizes="(min-width: 1024px) 896px, 100vw"
                  className="h-auto w-full object-contain"
                />
              ) : (
                <div className="aspect-[4/3] w-full">
                  <ImagePlaceholder
                    label={alt}
                    aspectRatio="wide"
                    className="h-full w-full rounded-none"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation (only when there is more than one case) */}
        {total > 1 && (
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={goPrevious}
                aria-label={t("previous")}
                className={`flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 text-primary transition-colors duration-300 hover:bg-primary/5 ${controlFocus}`}
              >
                <HiOutlineArrowLeft size={18} aria-hidden="true" className="rtl:rotate-180" />
              </button>

              <ul className="flex items-center gap-2">
                {beforeAfterCases.map((beforeAfterCase, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <li key={beforeAfterCase.id}>
                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`${t("goToCase")} ${index + 1}`}
                        aria-current={isActive ? "true" : undefined}
                        className={`flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-medium tabular-nums transition-colors duration-300 ${controlFocus} ${
                          isActive
                            ? "bg-primary text-ivory"
                            : "border border-primary/25 text-primary hover:bg-primary/5"
                        }`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                onClick={goNext}
                aria-label={t("next")}
                className={`flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 text-primary transition-colors duration-300 hover:bg-primary/5 ${controlFocus}`}
              >
                <HiOutlineArrowRight size={18} aria-hidden="true" className="rtl:rotate-180" />
              </button>
            </div>

            <p aria-live="polite" className="text-sm font-medium text-primary/80">
              {t("case")} {activeNumber} / {total}
            </p>
          </motion.div>
        )}

        <motion.p
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-charcoal/70"
        >
          {t("disclaimer")}
        </motion.p>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="mx-auto flex max-w-2xl flex-col items-center gap-5 border-t border-champagne pt-10 text-center sm:pt-12"
        initial={initial}
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <motion.h3
          variants={fadeUp}
          className="text-2xl font-semibold leading-[1.25] text-primary sm:text-3xl rtl:leading-[1.5]"
        >
          {t("ctaTitle")}
        </motion.h3>
        <motion.p variants={fadeUp} className="text-base leading-relaxed text-charcoal/75">
          {t("ctaDescription")}
        </motion.p>
        <motion.div variants={fadeUp} className="flex w-full justify-center">
          <Link
            href={appointmentPath}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 text-base font-medium text-ivory transition-colors duration-300 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-lavender sm:w-auto"
          >
            <HiOutlineCalendarDays size={18} aria-hidden="true" />
            {t("bookAppointment")}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}