"use client";

import { motion } from "framer-motion";
import {Container} from "@/components/ui/Container";
import {Button} from "@/components/ui/Button";
import { servicesCTAData } from "./data";

export default function ServicesCTA() {
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
            {servicesCTAData.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ivory/70">
            {servicesCTAData.description}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href={servicesCTAData.primaryCta.href} variant="primary">
              {servicesCTAData.primaryCta.label}
            </Button>
            <Button
              href={servicesCTAData.secondaryCta.href}
              variant="ghost"
              className="text-ivory"
            >
              {servicesCTAData.secondaryCta.label}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}