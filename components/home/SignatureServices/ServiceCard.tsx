"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { ServiceItem } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface ServiceCardProps {
  service: ServiceItem;
  /** "featured" gets a wider frame and larger type for Hair Transplant. */
  variant?: "featured" | "default";
  /** Used to stagger this card's reveal relative to its siblings. */
  index?: number;
}

/**
 * A single signature service: image, title, description, and an
 * "Explore Service" link, the whole card wrapped in one real link.
 * Client Component: fades up when scrolled into view, and the image
 * gets a restrained hover scale. Falls back to ImagePlaceholder until
 * real photography (data.ts) is supplied, and to a static render for
 * reduced-motion users.
 */
export function ServiceCard({ service, variant = "default", index = 0 }: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isFeatured = variant === "featured";

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay: shouldReduceMotion ? 0 : index * 0.1 }}
    >
      <Link
        href={service.href}
        className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
      >
        <div
          className={`relative overflow-hidden rounded-2xl  bg-lavender ${
            isFeatured ? "aspect-[16/9]" : "aspect-[3/4]"
          }`}
        >
          {service.image.src ? (
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes={isFeatured ? "100vw" : "(min-width: 640px) 33vw, 100vw"}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder
              label={service.image.alt}
              aspectRatio={isFeatured ? "wide" : "portrait"}
              className="h-full w-full rounded-none"
            />
          )}
        </div>

        <div className="mt-4">
          <h3
            className={`font-semibold text-charcoal transition-colors duration-300 group-hover:text-primary ${
              isFeatured ? "text-2xl sm:text-3xl" : "text-lg"
            }`}
          >
            {service.title}
          </h3>
          <p className={`mt-1.5 text-muted ${isFeatured ? "max-w-lg text-base" : "text-sm"}`}>
            {service.description}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors duration-300 group-hover:text-primary-dark">
            Explore Service
            <HiOutlineArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
