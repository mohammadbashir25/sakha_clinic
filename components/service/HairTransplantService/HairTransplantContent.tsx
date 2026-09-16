"use client";

import { motion } from "framer-motion";
import { HiOutlineCheck } from "react-icons/hi2";
import { Button } from "@/components/ui/Button";
import type { HairTransplantData } from "./data";

export default function HairTransplantContent({
  data,
}: {
  data: HairTransplantData;
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

      <ul className="mt-8 flex flex-col gap-4">
        {data.points.map((point) => (
          <li key={point.label} className="flex items-start gap-3">
            <HiOutlineCheck
              className="mt-0.5 h-5 w-5 shrink-0 text-orchid"
              aria-hidden="true"
            />
            <span className="text-sm leading-relaxed text-charcoal">
              {point.label}
            </span>
          </li>
        ))}
      </ul>

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