"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { testimonials, testimonialsData } from "./data";
import TestimonialsHeader from "./TestimonialsHeader";
import TestimonialCard from "./TestimonialCard";

/**
 * How long each testimonial stays on screen before autoplay advances.
 * Change this one constant to retune both the interval and the
 * progress-bar fill duration — they stay in sync automatically.
 */
const AUTOPLAY_INTERVAL_MS = 5000;

// Cubic-bezier easing must be a readonly tuple, not number[],
// to satisfy framer-motion's Easing type.
const easeOut = [0.22, 1, 0.36, 1] as const;

// direction: 1 = advancing forward, -1 = going back. Drives which
// side the outgoing/incoming testimonial slides toward, matching the
// brief's "fade + subtle horizontal movement" spec (±15px, not a
// full-width slide).
const slideVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 15 : -15,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -15 : 15,
  }),
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) =>
      setReduced(event.matches);

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}

/**
 * Testimonials
 *
 * Premium single-testimonial "stage" with autoplay, manual prev/next
 * navigation, a numbered pagination indicator, and a subtle autoplay
 * progress bar. Falls back to a calm empty state when there's no
 * data, and to a static single card (no controls, no autoplay) when
 * there's exactly one testimonial.
 *
 * Client Component: autoplay timers, hover/focus pause, and the
 * framer-motion crossfade all need client-side state and effects.
 */
export default function Testimonials() {
  const { eyebrow, heading, description, emptyStateMessage } =
    testimonialsData;

  const count = testimonials.length;
  const hasMultiple = count > 1;
  const prefersReducedMotion = usePrefersReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Guards against a stale index if `testimonials` ever shrinks
  // (e.g. hot reload while editing data.ts).
  const safeIndex = Math.min(activeIndex, Math.max(count - 1, 0));

  const goToNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Autoplay. Depending on `activeIndex` here means every manual
  // navigation (and every autoplay tick) tears down and recreates a
  // fresh interval — which is exactly "restart the timer on change."
  // Only one interval ever exists at a time; cleanup always runs.
  useEffect(() => {
    if (!hasMultiple || isPaused || prefersReducedMotion) return;

    const id = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % count);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(id);
  }, [hasMultiple, isPaused, prefersReducedMotion, count, activeIndex]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return (
    <section aria-label={heading} className="bg-[#F2EAF4] py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <TestimonialsHeader
          eyebrow={eyebrow}
          heading={heading}
          description={description}
        />

        <div className="relative mt-14">
          {count === 0 ? (
            <div className="mx-auto max-w-lg rounded-2xl border border-[#320154]/10 bg-white/60 px-8 py-12 text-center">
              <p className="text-sm italic leading-relaxed text-[#716B75]">
                {emptyStateMessage}
              </p>
            </div>
          ) : (
            <div
              onMouseEnter={pause}
              onMouseLeave={resume}
              onFocus={pause}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                  resume();
                }
              }}
            >
              {/* Very subtle decorative glow behind the stage */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-10 -top-10 h-40 rounded-full bg-[#C96BD5]/10 blur-3xl"
              />

              <div className="relative overflow-hidden">
                <AnimatePresence custom={direction} mode="wait" initial={false}>
                  <motion.div
                    key={testimonials[safeIndex].id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: prefersReducedMotion ? 0.15 : 0.5,
                      ease: easeOut,
                    }}
                  >
                    <TestimonialCard testimonial={testimonials[safeIndex]} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Screen-reader-only announcement so autoplay changes
                  aren't silent for assistive tech users. */}
              <p aria-live="polite" className="sr-only">
                Showing testimonial {safeIndex + 1} of {count}
              </p>

              {hasMultiple && !prefersReducedMotion && (
                <div className="mx-auto mt-6 h-[2px] w-24 overflow-hidden rounded-full bg-[#320154]/10">
                  <div
                    key={safeIndex}
                    className="sakha-testimonial-progress h-full bg-[#C9A86A]"
                    style={{
                      animationDuration: `${AUTOPLAY_INTERVAL_MS}ms`,
                      animationPlayState: isPaused ? "paused" : "running",
                    }}
                  />
                </div>
              )}

              {hasMultiple && (
                <div className="mt-8 flex items-center justify-center gap-6">
                  <button
                    type="button"
                    onClick={goToPrev}
                    aria-label="Previous testimonial"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#320154]/20 text-[#320154] transition-colors duration-300 hover:border-[#C9A86A] hover:text-[#9A3FA5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A3FA5]"
                  >
                    <FiArrowLeft size={16} />
                  </button>

                  <span
                    aria-hidden="true"
                    className="flex items-center gap-3 text-xs tracking-wide text-[#716B75]"
                  >
                    <span className="font-medium text-[#320154]">
                      {String(safeIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-[#320154]/20" />
                    <span>{String(count).padStart(2, "0")}</span>
                  </span>

                  <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Next testimonial"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#320154]/20 text-[#320154] transition-colors duration-300 hover:border-[#C9A86A] hover:text-[#9A3FA5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A3FA5]"
                  >
                    <FiArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes sakha-testimonial-progress-fill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .sakha-testimonial-progress {
          animation-name: sakha-testimonial-progress-fill;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  );
}