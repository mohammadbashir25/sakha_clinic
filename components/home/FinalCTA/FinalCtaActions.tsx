"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import type { CtaAction } from "./data";

interface FinalCtaActionsProps {
  actions: CtaAction[];
}

const PLACEHOLDER = "[CLIENT INPUT REQUIRED]";

/**
 * Renders the primary CTA plus any secondary contact methods that have
 * real client-supplied data. An action whose href still contains the
 * placeholder is filtered out entirely, so nothing broken or fake ever
 * reaches the page.
 */
export default function FinalCtaActions({ actions }: FinalCtaActionsProps) {
  const shouldReduceMotion = useReducedMotion();

  const primary = actions.find((action) => action.type === "primary");
  const secondary = actions.filter(
    (action) => action.type !== "primary" && !action.href.includes(PLACEHOLDER)
  );

  const hoverProps = shouldReduceMotion
    ? {}
    : { whileHover: { y: -2 }, whileTap: { y: 0, scale: 0.98 } };

  const secondaryHoverProps = shouldReduceMotion
    ? {}
    : { whileHover: { x: 2 }, whileTap: { scale: 0.97 } };

  return (
    <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
      {primary && (
        <motion.a
          href={primary.href}
          {...hoverProps}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF8F5] px-8 py-4 text-base font-medium text-[#320154] transition-colors duration-200 hover:bg-[#C9A86A] hover:text-[#210038] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A86A] sm:w-auto"
        >
          {primary.label}
          <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </motion.a>
      )}

      {secondary.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          {secondary.map((action) => {
            const Icon = action.type === "whatsapp" ? FaWhatsapp : FiPhoneCall;
            const isTelOrWa =
              action.type === "phone" || action.type === "whatsapp";

            return (
              <motion.a
                key={action.href}
                href={action.href}
                {...secondaryHoverProps}
                transition={{ duration: 0.2, ease: "easeOut" }}
                aria-label={isTelOrWa ? action.label : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-[#F2EAF4]/25 px-5 py-3 text-sm font-medium text-[#FAF8F5] transition-colors duration-200 hover:border-[#C96BD5]/60 hover:text-[#C96BD5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96BD5]"
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{action.label}</span>
              </motion.a>
            );
          })}
        </div>
      )}
    </div>
  );
}
