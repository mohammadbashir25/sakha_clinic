"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { galleryHeroData } from "../data";

export default function GalleryHero() {
  return (
    <section className="bg-ivory pt-20 pb-16 lg:pt-20 lg:pb-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="text-sm font-medium uppercase tracking-[0.18em] text-champagne">
            {galleryHeroData.eyebrow}
          </span>
          <h1 className="mt-4 text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl">
            {galleryHeroData.heading}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {galleryHeroData.description}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}