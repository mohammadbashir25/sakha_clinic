"use client";

import { motion } from "framer-motion";
import {
  HiOutlineScissors,
  HiOutlineBeaker,
  HiOutlineSparkles,
  HiOutlineFaceSmile,
} from "react-icons/hi2";

import type { ServiceCategory } from "./data";

const iconMap = {
  scissors: HiOutlineScissors,
  beaker: HiOutlineBeaker,
  sparkles: HiOutlineSparkles,
  faceSmile: HiOutlineFaceSmile,
};

export default function ServiceCategoryCard({
  category,
  index,
}: {
  category: ServiceCategory;
  index: number;
}) {
  const Icon = iconMap[category.icon];

  return (
    <motion.a
      href={category.href}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.08,
      }}
      className="group flex flex-col gap-4 rounded-md border border-muted/20 bg-transparent p-7 transition-colors hover:border-orchid/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
    >
      <span className="flex h-11 w-11 items-center justify-center border border-muted/25 text-primary">
        <Icon
          className="h-5 w-5"
          aria-hidden="true"
        />
      </span>

      <h3 className="text-lg text-charcoal">
        {category.title}
      </h3>

      <p className="text-sm leading-relaxed text-muted">
        {category.description}
      </p>

      <span className="mt-1 text-sm font-medium text-primary underline-offset-4 group-hover:underline">
        Explore
      </span>
    </motion.a>
  );
}