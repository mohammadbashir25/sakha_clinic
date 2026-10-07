"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** A single gentle rise-and-fade. Renders static when reduced motion is on. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const groupTags = { div: motion.div, ul: motion.ul, ol: motion.ol } as const;
const itemTags = { div: motion.div, li: motion.li } as const;

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  as?: keyof typeof groupTags;
}

/** Staggers its RevealItem children as the group scrolls into view. */
export function RevealGroup({
  children,
  className,
  as = "div",
}: RevealGroupProps) {
  const reduce = useReducedMotion();
  const Tag = groupTags[as] as typeof motion.div;

  return (
    <Tag
      className={className}
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </Tag>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  as?: keyof typeof itemTags;
}

export function RevealItem({
  children,
  className,
  as = "div",
}: RevealItemProps) {
  const Tag = itemTags[as] as typeof motion.div;

  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}