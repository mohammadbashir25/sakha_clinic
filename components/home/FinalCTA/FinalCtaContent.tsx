"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { FinalCtaContentData } from "./data";
import FinalCtaActions from "./FinalCtaActions";

interface FinalCtaContentProps {
  data: FinalCtaContentData;
}

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function FinalCtaContent({ data }: FinalCtaContentProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : item;

  const noteItems = data.note
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <motion.div
      className="mx-auto max-w-2xl text-start"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.p
        variants={variants}
        className="text-sm font-medium tracking-wide text-[#C96BD5]"
      >
        {data.eyebrow}
      </motion.p>

      <motion.h2
        id="final-cta-heading"
        variants={variants}
        className="mt-4 text-3xl font-semibold leading-[1.15] text-[#FAF8F5] sm:text-4xl lg:text-[2.75rem]"
      >
        {data.title}
      </motion.h2>

      <motion.p
        variants={variants}
        className="mt-5 max-w-xl text-base leading-relaxed text-[#F2EAF4]/80 sm:text-lg"
      >
        {data.description}
      </motion.p>

      <motion.div variants={variants} className="mt-10">
        <FinalCtaActions
          primaryLabel={data.primaryCta}
          primaryHref={data.primaryHref}
          secondaryLabel={data.secondaryCta}
          secondaryHref={data.secondaryHref}
        />
      </motion.div>

      {noteItems.length > 0 && (
        <motion.ul
          variants={variants}
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#F2EAF4]/60"
        >
          {noteItems.map((text, index) => (
            <li key={text} className="flex items-center gap-3">
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-[#C9A86A]/70"
                />
              )}
              <span>{text}</span>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}