"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineArrowPath,
  HiOutlineBolt,
  HiOutlineFaceSmile,
  HiOutlineScissors,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { concernKeys, desireKeys, type ConcernKey } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

const concernIcons: Record<ConcernKey, IconType> = {
  skin: HiOutlineSparkles,
  hair: HiOutlineScissors,
  appearance: HiOutlineFaceSmile,
  transplant: HiOutlineArrowPath,
  aesthetics: HiOutlineAdjustmentsHorizontal,
  laser: HiOutlineBolt,
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const viewport = { once: true, amount: 0.2 } as const;

/**
 * Problem & Desire content, in the order concern -> understanding ->
 * appropriate care -> natural result:
 *
 * 1. Introduction (eyebrow, dominant heading, supporting paragraph)
 * 2. Common concerns: a light two-column list, hairline separators, one
 *    small icon each — no cards
 * 3. What you are looking for: a lavender panel with a second dominant
 *    heading and four quiet desire items
 * 4. Closing philosophy as a centered quote with a thin champagne rule —
 *    deliberately not a CTA
 *
 * All text is from "ProblemDesire.*". Layout relies on grid order and
 * logical properties (ps, pe, border-s, start/end), so it mirrors in Dari
 * and Pashto without separate RTL code. Tracking and uppercase are avoided
 * because they damage joined Arabic-script letters. Blocks reveal once on
 * scroll; reduced-motion users get the final state immediately.
 */
export function ProblemDesireContent() {
  const t = useTranslations("ProblemDesire");
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : "hidden";

  return (
    <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
      {/* 1. Introduction */}
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
            id="problem-desire-heading"
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

      {/* 2. Common concerns */}
      <motion.div
        className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16"
        initial={initial}
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-3 lg:col-span-4"
        >
          <h3 className="text-xl font-semibold text-charcoal sm:text-2xl rtl:leading-[1.5]">
            {t("concernsTitle")}
          </h3>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            {t("concernsDescription")}
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 border-b border-muted/15 md:grid-cols-2 md:gap-x-10 lg:col-span-8">
          {concernKeys.map((key) => {
            const Icon = concernIcons[key];
            return (
              <motion.li
                key={key}
                variants={fadeUp}
                className="flex items-start gap-4 border-t border-muted/15 py-5 md:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <Icon
                  size={22}
                  className="mt-0.5 shrink-0 text-orchid"
                  aria-hidden="true"
                />
                <span className="text-base leading-relaxed text-charcoal">
                  {t(`concerns.${key}`)}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>

      {/* 3. What you are looking for */}
      <motion.div
        className="rounded-2xl bg-lavender px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
        initial={initial}
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <motion.p
              variants={fadeUp}
              className="flex items-center gap-3 text-sm font-medium text-primary/70"
            >
              <span aria-hidden="true" className="h-px w-8 bg-champagne" />
              {t("desireEyebrow")}
            </motion.p>
            <motion.h3
              variants={fadeUp}
              className="text-2xl font-semibold leading-[1.25] text-primary sm:text-3xl lg:text-4xl rtl:leading-[1.5]"
            >
              {t("desireTitle")}
            </motion.h3>
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-charcoal/75"
            >
              {t("desireDescription")}
            </motion.p>
          </div>

          <ul className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-7">
            {desireKeys.map((key) => (
              <motion.li
                key={key}
                variants={fadeUp}
                className="flex flex-col gap-2"
              >
                <span
                  aria-hidden="true"
                  className="mb-1 h-px w-10 bg-champagne"
                />
                <h4 className="text-base font-semibold text-primary sm:text-lg">
                  {t(`desires.${key}.title`)}
                </h4>
                <p className="text-sm leading-relaxed text-charcoal/75 sm:text-base">
                  {t(`desires.${key}.description`)}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* 4. Closing philosophy */}
      <motion.figure
        className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center"
        initial={initial}
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <motion.span
          aria-hidden="true"
          variants={fadeUp}
          className="h-px w-16 bg-champagne"
        />
        <motion.blockquote variants={fadeUp}>
          <p className="text-lg leading-relaxed text-primary sm:text-xl lg:text-2xl rtl:leading-[1.7]">
            {t("closing")}
          </p>
        </motion.blockquote>
      </motion.figure>
    </div>
  );
}