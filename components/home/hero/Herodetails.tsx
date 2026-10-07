"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const highlights = [
  { title: "experience", description: "experienceDescription" },
  { title: "specialty", description: "specialtyDescription" },
] as const;

/**
 * Refined trust indicators plus the philosophy quote, under a hairline rule.
 * Indicators are plain text with a logical start border (no cards, no big
 * numbers) so they read as quiet credentials rather than a stats dashboard.
 * The quote is deliberately small and muted so it never competes with the
 * headline. Items reveal in sequence once scrolled into view (immediately on
 * desktop); reduced-motion users get the final state.
 */
export function HeroDetails() {
  const t = useTranslations("Hero");
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col gap-8 border-t border-muted/15 pt-8 lg:col-span-7 lg:row-start-2 lg:self-start"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      <ul className="grid gap-6 sm:grid-cols-2 sm:gap-8">
        {highlights.map((highlight) => (
          <motion.li
            key={highlight.title}
            variants={item}
            className="border-s border-primary/30 ps-4"
          >
            <p className="text-base font-semibold text-charcoal">{t(highlight.title)}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {t(highlight.description)}
            </p>
          </motion.li>
        ))}
      </ul>

      <motion.blockquote
        variants={item}
        className="max-w-xl border-s-2 border-primary/20 ps-5"
      >
        <p className="text-sm leading-relaxed text-muted sm:text-base">{t("quote")}</p>
      </motion.blockquote>
    </motion.div>
  );
}