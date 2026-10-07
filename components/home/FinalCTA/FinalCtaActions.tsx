"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "@/i18n/navigation";

interface FinalCtaActionsProps {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

const MotionLink = motion.create(Link);

export default function FinalCtaActions({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: FinalCtaActionsProps) {
  const shouldReduceMotion = useReducedMotion();

  const hoverProps = shouldReduceMotion
    ? {}
    : { whileHover: { y: -2 }, whileTap: { y: 0, scale: 0.98 } };

  return (
    <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
      <MotionLink
        href={primaryHref}
        {...hoverProps}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF8F5] px-8 py-4 text-base font-medium text-[#320154] transition-colors duration-200 hover:bg-[#C9A86A] hover:text-[#210038] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A86A] sm:w-auto"
      >
        {primaryLabel}
        <FiArrowUpRight
          className="h-4 w-4 rtl:-scale-x-100"
          aria-hidden="true"
        />
      </MotionLink>

      <MotionLink
        href={secondaryHref}
        {...hoverProps}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="inline-flex items-center justify-center rounded-full border border-[#F2EAF4]/25 px-8 py-4 text-base font-medium text-[#FAF8F5] transition-colors duration-200 hover:border-[#C96BD5]/60 hover:text-[#C96BD5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C96BD5] sm:w-auto"
      >
        {secondaryLabel}
      </MotionLink>
    </div>
  );
}