"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterComparison } from "./BeforeAfterComparison";
import { BeforeAfterDetails } from "./BeforeAfterDetails";
import { beforeAfterData } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Real-results section: one large featured before/after comparison per
 * authorized case, with treatment context and a consultation CTA
 * beneath it. A client component overall so the heading can share the
 * same scroll-triggered entrance as the rest of the section — the
 * comparison slider itself is the only part that strictly requires
 * interactivity.
 *
 * <BeforeAfter />
 */
export function BeforeAfter() {
  const shouldReduceMotion = useReducedMotion();
  const { eyebrow, heading, description, cases, disclaimer, cta } = beforeAfterData;

  return (
    <section aria-labelledby="before-after-heading" className="bg-lavender">
      <Container>
        <div className="py-16 sm:py-20 lg:py-28">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <SectionHeading
              eyebrow={eyebrow}
              title={<span id="before-after-heading">{heading}</span>}
              description={description}
              align="center"
            />
          </motion.div>

          <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-16 sm:mt-16">
            {cases.map((beforeAfterCase) => (
              <div key={beforeAfterCase.id}>
                <BeforeAfterComparison beforeAfterCase={beforeAfterCase} />
                <BeforeAfterDetails
                  beforeAfterCase={beforeAfterCase}
                  disclaimer={disclaimer}
                  cta={cta}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
