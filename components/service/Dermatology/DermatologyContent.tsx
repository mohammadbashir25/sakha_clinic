"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import type { DermatologyData } from "./data";

export default function DermatologyContent({
  data,
}: {
  data: DermatologyData;
}) {
  return (
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

      <div className="mt-8 flex flex-wrap gap-2.5">
        {data.concerns.map((concern) => (
          <span
            key={concern}
            className="border border-muted/25 px-4 py-2 text-sm text-charcoal"
          >
            {concern}
          </span>
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
    </motion.div>
  );
}