"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import type { WhyChooseSakhaData } from "./data";
import { trustPointIcons } from "./icons";

interface WhyChooseSakhaContentProps {
  data: WhyChooseSakhaData;
}

// Cubic-bezier easing must be a readonly tuple, not number[],
// to satisfy framer-motion's Easing type.
const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

// Positions each of the 5 cards on a 6-column grid at desktop width so
// the layout reads as 3 cards, then 2 centered cards beneath — matching
// the approved reference design without hardcoding a 3+2 markup split.
const gridPosition = [
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-start-2 lg:col-span-2",
  "lg:col-start-4 lg:col-span-2",
];

export default function WhyChooseSakhaContent({
  data,
}: WhyChooseSakhaContentProps) {
  const { eyebrow, heading, description, trustPoints, cta, footerTags } =
    data;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative z-10"
    >
      {/* Eyebrow */}
      <motion.div
        variants={item}
        className="flex items-center justify-center gap-4"
      >
        <span className="h-px w-8 bg-[#320154]/30" />
        <span className="text-xs font-medium tracking-[0.3em] text-[#9A3FA5]">
          {eyebrow.toUpperCase()}
        </span>
        <span className="h-px w-8 bg-[#320154]/30" />
      </motion.div>

      {/* Heading */}
      <motion.h2
        variants={item}
        className="mx-auto mt-5 max-w-3xl text-center text-4xl font-medium leading-[1.15] tracking-tight text-[#320154] sm:text-5xl lg:text-6xl"
      >
        {heading}
      </motion.h2>

      {/* Description */}
      <motion.p
        variants={item}
        className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-[#716B75]"
      >
        {description}
      </motion.p>

      {/* Trust point cards */}
      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {trustPoints.map((point, index) => {
          const Icon = point.icon ? trustPointIcons[point.icon] : undefined;

          return (
            <motion.div
              key={point.title}
              variants={item}
              className={`group rounded-2xl border border-[#320154]/10 bg-white/50 p-7 transition-colors duration-300 hover:border-[#C9A86A]/40 hover:bg-white/80 ${gridPosition[index] ?? ""}`}
            >
              {Icon && (
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2EAF4] text-[#320154] transition-colors duration-300 group-hover:text-[#9A3FA5]">
                  <Icon size={20} />
                </span>
              )}
              <span className="mt-5 block text-xs font-medium tracking-wide text-[#C96BD5]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 text-lg font-medium text-[#320154]">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#716B75]">
                {point.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      {cta && (
        <motion.div
          variants={item}
          className="mt-14 flex items-center justify-center gap-4"
        >
          <span className="h-px w-10 bg-[#320154]/25" />
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 rounded-full bg-[#320154] px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#210038] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A3FA5]"
          >
            {cta.label}
            <FiArrowRight size={16} />
          </Link>
          <span className="h-px w-10 bg-[#320154]/25" />
        </motion.div>
      )}

      {/* Footer tags */}
      {footerTags && footerTags.length > 0 && (
        <motion.p
          variants={item}
          className="mt-16 text-center text-[11px] font-medium tracking-[0.2em] text-[#716B75]/70 sm:text-left"
        >
          {footerTags.map((tag, i) => (
            <span key={tag}>
              {tag.toUpperCase()}
              {i < footerTags.length - 1 && (
                <span className="mx-3 text-[#320154]/20">/</span>
              )}
            </span>
          ))}
        </motion.p>
      )}
    </motion.div>
  );
}