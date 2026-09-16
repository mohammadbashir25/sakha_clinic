"use client";

import { motion } from "framer-motion";
import {Container} from "@/components/ui/Container";
import {Button} from "@/components/ui/Button";
import { blogCTAData } from "./data";

export default function BlogCTA() {
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
            {blogCTAData.heading}
          </h2>
          <div className="mt-8">
            <Button href={blogCTAData.cta.href} variant="primary">
              {blogCTAData.cta.label}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}