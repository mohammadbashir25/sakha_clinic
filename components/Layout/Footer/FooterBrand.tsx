"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { FooterData } from "./data";

interface FooterBrandProps {
  brand: FooterData["brand"];
}

export default function FooterBrand({ brand }: FooterBrandProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-sm"
    >
      {brand.logo ? (
        <Image
          src={brand.logo}
          alt={brand.logoAlt ?? `${brand.name} logo`}
          width={132}
          height={40}
          className="h-auto w-[132px]"
        />
      ) : (
        <span className="text-xl font-semibold tracking-tight text-[#FAF8F5]">
          {brand.name}
        </span>
      )}

      <p className="mt-4 text-sm leading-relaxed text-[#F2EAF4]/70">
        {brand.description}
      </p>
    </motion.div>
  );
}
