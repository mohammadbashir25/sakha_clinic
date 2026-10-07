"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function BlogHero() {
  const t = useTranslations("BlogPage");
  const reduce = useReducedMotion();
  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative overflow-hidden bg-[#faf8f5]">
      {/* Quiet line work: concentric arcs, mirrored for RTL */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -end-24 -top-24 h-[26rem] w-[26rem] rtl:-scale-x-100 sm:h-[34rem] sm:w-[34rem]"
        fill="none"
      >
        <circle cx="300" cy="100" r="180" stroke="#c9a86a" strokeOpacity="0.55" strokeWidth="0.8" />
        <circle cx="300" cy="100" r="130" stroke="#9a3fa5" strokeOpacity="0.25" strokeWidth="0.8" />
        <circle cx="300" cy="100" r="80" stroke="#320154" strokeOpacity="0.18" strokeWidth="0.8" />
      </svg>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-20 sm:px-8 lg:grid-cols-12 lg:pb-24 lg:pt-15">
        <div className="lg:col-span-8">
          <motion.p {...reveal(0)} className="flex items-center gap-3 text-sm font-medium text-[#9a3fa5]">
            <span aria-hidden="true" className="h-px w-10 bg-[#c9a86a]" />
            {t("hero.eyebrow")}
          </motion.p>
          <motion.h1
            {...reveal(0.1)}
            className="mt-6 max-w-3xl font-serif text-4xl leading-[1.12] text-[#320154] sm:text-5xl lg:text-6xl rtl:leading-[1.4]"
          >
            {t("hero.title")}
          </motion.h1>
        </div>

        <motion.div {...reveal(0.25)} className="lg:col-span-4 lg:self-end">
          <p className="border-s-2 border-[#c9a86a] ps-5 text-lg leading-8 text-[#716b75]">
            {t("hero.description")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
