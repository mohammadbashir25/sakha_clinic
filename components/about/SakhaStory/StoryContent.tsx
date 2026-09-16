"use client";

import { motion } from "framer-motion";
import type { SakhaStoryData } from "./data";

export default function StoryContent({ data }: { data: SakhaStoryData }) {
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
      <div className="mt-6 flex flex-col gap-5">
        {data.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-base leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>
      <p className="mt-6 text-xs leading-relaxed text-muted/80 italic">
        {data.note}
      </p>
    </motion.div>
  );
}