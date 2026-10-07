"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { PiQuotesLight } from "react-icons/pi";
import type { Testimonial } from "./types";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Time each testimonial stays before advancing automatically. */
const AUTOPLAY_MS = 5000;

const controlFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory";

/**
 * The smallest client boundary of the section: carousel state, autoplay and
 * controls. Everything else (header, empty/error states, CTA) is rendered by
 * the Server Component in Testimonials.tsx.
 *
 * - All slides share one grid cell, so the container is as tall as the
 *   longest testimonial and nothing jumps when the slide changes. Inactive
 *   slides are `invisible` + `aria-hidden`, so they are skipped by keyboard
 *   and screen readers.
 * - Autoplay advances every ~5 s, pauses while hovered or focused, stops for
 *   good after the visitor uses any control, and never runs with
 *   prefers-reduced-motion. The slide change is a plain opacity fade.
 * - Controls (shown only for 2+ testimonials): previous / next (arrows mirror
 *   in RTL), one numbered-by-label dot per testimonial, and a visible
 *   "n / total" counter so the active slide is not indicated by color alone.
 * - Only fields present on the testimonial are rendered (treatment is
 *   optional); there are no ratings or verification badges.
 *
 * Quote text and names are dynamic data and are never run through
 * translations; only the UI labels are.
 */
export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const t = useTranslations("Testimonials");
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const total = testimonials.length;
  const hasControls = total > 1;
  const isAutoplaying = hasControls && !hasInteracted && !shouldReduceMotion;

  useEffect(() => {
    if (!isAutoplaying || isPaused) return;
    const id = window.setInterval(() => {
      setActive((index) => (index + 1) % total);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [isAutoplaying, isPaused, total]);

  const goTo = (index: number) => {
    setHasInteracted(true);
    setActive((index + total) % total);
  };

  return (
    <motion.div
      role="region"
      aria-roledescription="carousel"
      aria-label={t("testimonial")}
      className="mx-auto flex w-full max-w-3xl flex-col gap-10"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div aria-live={isAutoplaying ? "off" : "polite"} className="grid">
        {testimonials.map((item, index) => {
          const isActive = index === active;
          return (
            <figure
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${t("testimonial")} ${index + 1} / ${total}`}
              aria-hidden={!isActive}
              className={`col-start-1 row-start-1 flex flex-col gap-6 transition-[opacity,visibility] duration-500 motion-reduce:transition-none ${
                isActive ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <PiQuotesLight size={30} aria-hidden="true" className="text-champagne" />

              <blockquote>
                <p className="text-xl leading-relaxed text-charcoal sm:text-2xl lg:text-3xl lg:leading-relaxed rtl:leading-[1.8]">
                  {item.content}
                </p>
              </blockquote>

              <figcaption className="flex flex-col gap-1 border-s-2 border-champagne ps-4">
                <span className="text-base font-semibold text-primary">{item.name}</span>
                {item.treatment && (
                  <span className="text-sm text-muted">
                    {t("treatment")}: {item.treatment}
                  </span>
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {hasControls && (
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label={t("previous")}
              className={`flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 text-primary transition-colors duration-300 hover:bg-primary/5 ${controlFocus}`}
            >
              <HiOutlineArrowLeft size={18} aria-hidden="true" className="rtl:rotate-180" />
            </button>

            <ul className="flex items-center">
              {testimonials.map((item, index) => {
                const isActive = index === active;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-label={`${t("goToTestimonial")} ${index + 1}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`group flex h-11 w-8 items-center justify-center rounded-full ${controlFocus}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`block h-2 rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-6 bg-primary"
                            : "w-2 bg-primary/30 group-hover:bg-primary/60"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label={t("next")}
              className={`flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 text-primary transition-colors duration-300 hover:bg-primary/5 ${controlFocus}`}
            >
              <HiOutlineArrowRight size={18} aria-hidden="true" className="rtl:rotate-180" />
            </button>
          </div>

          <p className="text-sm font-medium tabular-nums text-primary/80">
            {active + 1} / {total}
          </p>
        </div>
      )}
    </motion.div>
  );
}
