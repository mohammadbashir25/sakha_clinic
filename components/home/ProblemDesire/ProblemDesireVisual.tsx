"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { problemDesireData } from "../ProblemDesire/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Problem/Desire image column. Client Component: the framed image
 * settles in with a fade and a slight zoom, then a deep-purple curtain 
 * wipes away — a single clean reveal, not a scroll effect. The lavender
 * "mat" around the frame is the section's restrained secondary visual
 * area. Falls back to ImagePlaceholder until real photography (data.ts)
 * is supplied, and to a static render for reduced-motion users.
 */
export function ProblemDesireVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { image } = problemDesireData;

  return (
    <motion.div
      className="w-full rounded-[28px]  bg-lavender p-3 shadow-sm sm:p-4"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="group relative aspect-[4/5] max-h-[400px] w-full overflow-hidden rounded-2xl bg-lavender sm:max-h-[460px] lg:max-h-[520px]">
        <motion.div
          className="h-full w-full"
          initial={shouldReduceMotion ? false : { scale: 1.12, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: shouldReduceMotion ? 0 : 0.25 }}
        >
          {image.src ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder
              label={image.alt}
              aspectRatio="portrait"
              className="h-full w-full rounded-none"
            />
          )}
        </motion.div>

        {!shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 origin-right bg-primary"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          />
        )}
      </div>
    </motion.div>
  );
}