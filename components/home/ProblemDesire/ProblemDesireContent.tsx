"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  HiOutlineArrowRight,
  HiOutlineScissors,
  HiOutlineSparkles,
  HiOutlineFaceSmile,
} from "react-icons/hi2";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { problemDesireData, type ConcernIcon } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

const concernIcons: Record<ConcernIcon, typeof HiOutlineScissors> = {
  hairLoss: HiOutlineScissors,
  skinConcerns: HiOutlineSparkles,
  aestheticGoals: HiOutlineFaceSmile,
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Copy, concern cards, and CTA for the Problem/Desire section. Client
 * Component: the eyebrow, heading, and description fade up first, the
 * concern cards reveal one at a time, and the transition line and CTA
 * settle in last — a one-time entrance, not a scroll effect. Falls back
 * to a static render for reduced-motion users.
 */
export function ProblemDesireContent() {
  const shouldReduceMotion = useReducedMotion();
  const { eyebrow, heading, description, concerns, transition, cta } = problemDesireData;

  return (
    <div className="flex flex-col gap-8 lg:max-w-xl">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <SectionHeading
          eyebrow={eyebrow}
          title={<span id="problem-desire-heading">{heading}</span>}
          description={description}
          align="left"
        />
      </motion.div>

      <motion.ul
        className="flex flex-col gap-4"
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        variants={listVariants}
      >
        {concerns.map((concern, index) => {
          const Icon = concernIcons[concern.icon];

          return (
            <motion.li
              key={concern.title}
              variants={itemVariants}
              className="flex items-center gap-4 rounded-2xl border border-muted/15 bg-ivory px-5 py-4 sm:px-6 sm:py-5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lavender">
                <Icon size={22} className="text-orchid" aria-hidden="true" />
              </span>

              <div className="flex-1">
                <span className="text-xs font-semibold tabular-nums text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-[0.04em] text-charcoal">
                  {concern.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{concern.description}</p>
              </div>

              <HiOutlineArrowRight size={18} className="shrink-0 text-muted/60" aria-hidden="true" />
            </motion.li>
          );
        })}
      </motion.ul>

      <motion.div
        className="flex flex-col gap-4 border-t border-muted/15 pt-6"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 1.1 }}
      >
        <p className="text-base font-medium text-charcoal sm:text-lg">{transition}</p>

        {cta && (
          <Link
            href={cta.href}
            className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-primary transition-colors duration-300 hover:text-primary-dark sm:text-base"
          >
            {cta.label}
            <HiOutlineArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        )}
      </motion.div>
    </div>
  );
}