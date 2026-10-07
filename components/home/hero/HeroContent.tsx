"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { HiOutlineArrowRight, HiOutlineCalendar } from "react-icons/hi";
import { Link } from "@/i18n/navigation";
import { heroData } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const headingStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};

/**
 * Eyebrow, two-line headline ("Medical precision." / "Natural beauty."),
 * description and CTAs. A one-time entrance: each headline line rises from
 * behind a mask, then the rest settles in. With reduced motion the content
 * renders in its final state immediately.
 *
 * Headline lines are revealed as whole lines (not split into words), which
 * keeps Dari / Pashto letter joining intact. No physical left/right classes.
 */
export function HeroContent() {
  const t = useTranslations("Hero");
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col items-start gap-6 lg:col-span-7 lg:row-start-1 lg:self-end"
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
      variants={container}
    >
      <motion.p
        variants={fadeUp}
        className="flex items-center gap-3 text-sm font-medium text-muted"
      >
        <span aria-hidden="true" className="h-px w-8 bg-primary/40" />
        {t("eyebrow")}
      </motion.p>

      <motion.h1
        id="hero-heading"
        variants={headingStagger}
        className="text-4xl font-semibold leading-[1.2] text-primary sm:text-5xl lg:text-6xl rtl:leading-[1.4]"
      >
        <span className="block overflow-hidden pb-2">
          <motion.span className="block" variants={lineReveal}>
            {t("title")}
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-2 text-primary/60">
          <motion.span className="block" variants={lineReveal}>
            {t("titleAccent")}
          </motion.span>
        </span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="max-w-xl text-base leading-relaxed text-muted sm:text-lg"
      >
        {t("description")}
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="flex w-full flex-col gap-4 pt-2 sm:w-auto sm:flex-row sm:items-center sm:gap-7"
      >
        <Link
          href={heroData.primaryCta.href}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-base font-medium text-ivory transition-colors duration-300 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          <HiOutlineCalendar size={20} aria-hidden="true" />
          {t("primaryCta")}
        </Link>

        <Link
          href={heroData.secondaryCta.href}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl px-2 text-base font-medium text-charcoal transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          {t("secondaryCta")}
          <HiOutlineArrowRight
            size={18}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}