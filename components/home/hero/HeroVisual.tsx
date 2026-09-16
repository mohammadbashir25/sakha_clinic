"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { heroData } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero image column. Client Component: on mount, a deep-purple panel
 * wipes away (like a curtain) while the image settles from a slight
 * zoom into place — a one-time reveal, not a scroll-linked effect.
 * Falls back to ImagePlaceholder until real clinic photography (data.ts)
 * is supplied, and to a static render for reduced-motion users.
 */
export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();
  const { image } = heroData;

  return (
    <div className="group relative aspect-[4/5] w-full max-h-[420px] overflow-hidden rounded-2xl bg-lavender sm:max-h-[480px] lg:aspect-[4/5] lg:max-h-[560px]">
      <motion.div
        className="h-full w-full"
        initial={shouldReduceMotion ? false : { scale: 1.12, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: shouldReduceMotion ? 0 : 0.2 }}
      >
        {image.src ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder label={image.alt} aspectRatio="portrait" className="h-full w-full rounded-none border-none" />
        )}
      </motion.div>

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 origin-left bg-primary"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        />
      )}

      {image.caption && (
        <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/60 to-transparent px-5 py-4 text-sm text-ivory">
          {image.caption}
        </p>
      )}
    </div>
  );
}