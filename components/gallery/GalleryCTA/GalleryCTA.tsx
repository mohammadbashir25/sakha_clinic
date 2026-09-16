"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { galleryCTAData } from "../data";

export default function GalleryCTA() {
  return (
    <section className="bg-primary-dark py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl leading-tight text-ivory sm:text-4xl">
            {galleryCTAData.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ivory/70">
            {galleryCTAData.description}
          </p>
          <div className="mt-9">
            <Button href={galleryCTAData.cta.href} variant="primary">
              {galleryCTAData.cta.label}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
