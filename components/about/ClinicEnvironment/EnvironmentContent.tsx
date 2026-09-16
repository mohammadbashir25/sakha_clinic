"use client";

import { motion } from "framer-motion";
import type { ClinicEnvironmentData } from "./data";

export default function EnvironmentContent({
  data,
}: {
  data: ClinicEnvironmentData;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto max-w-2xl text-center"
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
  );
}