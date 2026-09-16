"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi2";
import type { BeforeAfterCase, BeforeAfterCta } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface BeforeAfterDetailsProps {
  beforeAfterCase: BeforeAfterCase;
  disclaimer: string;
  cta?: BeforeAfterCta;
}

/**
 * Treatment name/description/date, the results-vary disclaimer, and an
 * optional consultation CTA, shown beneath the comparison. Client
 * Component for the scroll-triggered fade, consistent with the rest of
 * the section; falls back to a static render for reduced-motion users.
 */
export function BeforeAfterDetails({ beforeAfterCase, disclaimer, cta }: BeforeAfterDetailsProps) {
  const shouldReduceMotion = useReducedMotion();
  const { treatment, description, date } = beforeAfterCase;

  return (
    <motion.div
      className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-4 text-center"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay: shouldReduceMotion ? 0 : 0.2 }}
    >
      <div>
        <h3 className="text-lg font-semibold text-charcoal">{treatment}</h3>
        {(description || date) && (
          <p className="mt-1 text-sm text-muted">
            {description}
            {description && date ? " · " : ""}
            {date}
          </p>
        )}
      </div>

      <p className="text-xs text-muted">{disclaimer}</p>

      {cta && (
        <Link
          href={cta.href}
          className="group mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          {cta.label}
          <HiOutlineArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      )}
    </motion.div>
  );
}
