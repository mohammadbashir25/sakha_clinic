"use client";

import { motion } from "framer-motion";
import {Container} from "@/components/ui/Container";
import { philosophyData } from "./data";

export default function Philosophy() {
  return (
    <section className="bg-lavender/40 py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-4xl">
          <span className="text-sm font-medium uppercase tracking-[0.18em] text-champagne">
            {philosophyData.eyebrow}
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-6 border-l border-orchid/40 pl-6 text-2xl font-normal leading-relaxed text-charcoal sm:text-3xl lg:text-4xl lg:leading-relaxed"
          >
            {philosophyData.statement}
          </motion.h2>
        </div>
      </Container>
    </section>
  );
}