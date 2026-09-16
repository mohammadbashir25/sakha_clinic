"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { FinalCtaData } from "./data";
import FinalCtaActions from "./FinalCtaActions";

interface FinalCtaContentProps {
  data: FinalCtaData;
}

/**
 * A single orchestrated reveal — eyebrow, heading, description, reassurance,
 * and the actions block rise in sequence like a film's closing title card.
 * One deliberate moment, not a fade-up on every element independently.
 */
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
      ease: [0.16, 1, 0.3, 1], // cinematic ease-out
    },
  },
};

export default function FinalCtaContent({ data }: FinalCtaContentProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : item;

  return (
    <motion.div
      className="mx-auto max-w-2xl text-left"
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
        {data.heading}
      </motion.h2>

      <motion.p
        variants={variants}
        className="mt-5 max-w-xl text-base leading-relaxed text-[#F2EAF4]/80 sm:text-lg"
      >
        {data.description}
      </motion.p>

      <motion.div variants={variants} className="mt-10">
        <FinalCtaActions actions={data.actions} />
      </motion.div>

      {data.reassurance && (
        <motion.p
          variants={variants}
          className="mt-6 text-sm text-[#F2EAF4]/60"
        >
          {data.reassurance}
        </motion.p>
      )}
    </motion.div>
  );
}
