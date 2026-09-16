"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import type { AestheticTreatmentsData } from "./data";

export default function AestheticTreatmentsContent({
  data,
}: {
  data: AestheticTreatmentsData;
}) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="text-sm font-medium uppercase tracking-[0.18em] text-champagne">
          {data.eyebrow}
        </span>
        <h2 className="mt-4 text-3xl leading-tight text-charcoal sm:text-4xl">
          {data.heading}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted">
          {data.description}
        </p>
      </motion.div>

      <div className="mt-9 flex flex-col divide-y divide-muted/20 border-t border-muted/20">
        {data.items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
            className="grid grid-cols-[1fr_2fr] gap-6 py-5"
          >
            <h3 className="text-sm font-medium text-charcoal">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-muted/80 italic">
        {data.note}
      </p>

      <div className="mt-8">
        <Button href={data.cta.href} variant="primary">
          {data.cta.label}
        </Button>
      </div>
    </div>
  );
}