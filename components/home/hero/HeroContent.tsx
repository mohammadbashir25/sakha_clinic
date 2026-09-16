"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { heroData } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

const wordContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
};

const wordItem: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: EASE } },
};

/**
 * Hero copy and CTAs. Client Component: the headline reveals word by
 * word behind a mask, then the supporting copy and CTAs settle in —
 * a one-time entrance, not a scroll effect. Falls back to a static
 * render for users who prefer reduced motion.
 */
export function HeroContent() {
  const shouldReduceMotion = useReducedMotion();
  const words = heroData.heading.split(" ");

  return (
    <div className="flex flex-col items-start gap-6 lg:max-w-xl">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <Badge variant="outline">{heroData.eyebrow}</Badge>
      </motion.div>

      <h1 className="text-4xl font-semibold leading-[1.1] text-primary sm:text-5xl lg:text-6xl">
        {shouldReduceMotion ? (
          heroData.heading
        ) : (
          <motion.span
            className="inline"
            initial="hidden"
            animate="visible"
            variants={wordContainer}
          >
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="mr-3 inline-block overflow-hidden pb-1 align-bottom">
                <motion.span className="inline-block" variants={wordItem}>
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.span>
        )}
      </h1>

      <motion.p
        className="text-base leading-relaxed text-muted sm:text-lg"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 1.1 }}
      >
        {heroData.description}
      </motion.p>

      <motion.div
        className="flex flex-wrap items-center gap-4 pt-2"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 1.25 }}
      >
        <Link
          href={heroData.primaryCta.href}
          className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-7 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory sm:text-base"
        >
          {heroData.primaryCta.label}
        </Link>

        {heroData.secondaryCta && (
          <Link
            href={heroData.secondaryCta.href}
            className="relative text-sm font-medium text-charcoal transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:text-primary hover:after:w-full sm:text-base"
          >
            {heroData.secondaryCta.label}
          </Link>
        )}
      </motion.div>
    </div>
  );
}
