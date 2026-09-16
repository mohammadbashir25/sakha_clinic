"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  /** Stagger position — each step delays entrance by 40ms. */
  index?: number;
  className?: string;
}

/**
 * Small, fast entrance: 8px, 220ms, no scale, no bounce.
 * Switched off entirely under prefers-reduced-motion.
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut", delay: index * 0.04 }}
    >
      {children}
    </motion.div>
  );
}
