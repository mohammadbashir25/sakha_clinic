"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { signatureServicesData } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Eyebrow, heading, and description for Signature Services. Client
 * Component: fades up once the section scrolls into view (this section
 * sits below the fold, so the reveal triggers on scroll rather than on
 * page load). Falls back to a static render for reduced-motion users.
 */
export function SignatureServicesHeader() {
  const shouldReduceMotion = useReducedMotion();
  const { eyebrow, heading, description } = signatureServicesData;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <SectionHeading
        eyebrow={eyebrow}
        title={<span id="signature-services-heading">{heading}</span>}
        description={description}
      />
    </motion.div>
  );
}
