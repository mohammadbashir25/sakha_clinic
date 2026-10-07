"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { PiFlowerLotusLight } from "react-icons/pi";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { heroData } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Doctor portrait in an arch-shaped frame with a thin offset outline (an
 * architectural detail, not a glow or blob) and a solid caption card with
 * the doctor's name and specialties plus a small lotus mark.
 *
 * The reveal is a one-time upward clip with a gentle settle from a slight
 * zoom. With reduced motion everything renders in its final state.
 * The offset outline and caption use logical properties (-end-3, start-3,
 * inset-x-3), so the composition mirrors correctly in Dari / Pashto.
 *
 * Falls back to ImagePlaceholder until `heroData.image.src` is set.
 * Alt text and caption come from Hero.doctorName / Hero.doctorTitle.
 */
export function HeroVisual() {
  const t = useTranslations("Hero");
  const shouldReduceMotion = useReducedMotion();
  const { image } = heroData;

  return (
    <figure className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:max-w-md lg:justify-self-end">
      <div
        aria-hidden="true"
        className="absolute -bottom-3 -end-3 start-3 top-3 rounded-b-2xl rounded-t-[10rem] border border-primary/20"
      />

      <motion.div
        className="relative z-10 w-full overflow-hidden rounded-b-2xl rounded-t-[10rem] bg-lavender aspect-[3/4]"
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 20,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          ease: EASE,
          delay: 0.15,
        }}
      >
        {image.src ? (
          <Image
            src={image.src}
            alt={t("doctorName")}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover object-top"
          />
        ) : (
          <ImagePlaceholder
            label={t("doctorName")}
            aspectRatio="portrait"
            className="h-full w-full rounded-none border-none"
          />
        )}
      </motion.div>

      <motion.figcaption
        className="absolute inset-x-3 bottom-3 z-20 flex items-center gap-3 rounded-xl bg-ivory p-3.5 shadow-[0_14px_34px_-20px_rgba(24,10,32,0.45)] sm:p-4"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
      >
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/5 text-primary"
        >
          <PiFlowerLotusLight size={22} />
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="text-sm font-semibold text-primary sm:text-base">
            {t("doctorName")}
          </span>
          <span className="mt-0.5 text-xs leading-snug text-muted">
            {t("doctorTitle")}
          </span>
        </span>
      </motion.figcaption>
    </figure>
  );
}
