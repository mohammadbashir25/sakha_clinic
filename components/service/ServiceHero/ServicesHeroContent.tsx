"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import type { ServicesHeroData } from "./data";

export default function ServicesHeroContent({
  data,
}: {
  data: ServicesHeroData;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="max-w-xl"
    >
      <span className="text-sm font-medium uppercase tracking-[0.18em] text-champagne">
        {data.eyebrow}
      </span>
      <h1 className="mt-4 text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl">
        {data.heading}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        {data.description}
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-4">
        <Button href={data.primaryCta.href} variant="primary">
          {data.primaryCta.label}
        </Button>
        <Button href={data.secondaryCta.href} variant="ghost">
          {data.secondaryCta.label}
        </Button>
      </div>
    </motion.div>
  );
}