"use client";

import { motion } from "framer-motion";
import {Container} from "@/components/ui/Container";
import {SectionHeading} from "@/components/ui/SectionHeading";
import { careApproachData } from "./data";

export default function CareApproach() {
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={careApproachData.eyebrow}
          title={careApproachData.heading}
          align="left"
        />

        <div className="mt-14 border-t border-muted/20">
          {careApproachData.principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
              className="grid grid-cols-1 gap-3 border-b border-muted/20 py-8 sm:grid-cols-[1fr_2fr] sm:gap-10"
            >
              <h3 className="text-lg text-charcoal">{principle.title}</h3>
              <p className="text-base leading-relaxed text-muted">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}