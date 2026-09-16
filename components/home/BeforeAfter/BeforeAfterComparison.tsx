"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { BeforeAfterCase } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface BeforeAfterComparisonProps {
  beforeAfterCase: BeforeAfterCase;
}

/**
 * Draggable before/after image comparison. Client Component: this is
 * the one place in the section that genuinely needs interaction. Built
 * on a native `<input type="range">` rather than manual pointer-event
 * math, so drag, touch, and keyboard (arrow keys, Home/End) all work
 * for free with correct slider semantics for assistive tech.
 *
 * On first scroll into view, the divider sweeps once from fully
 * "before" to the midpoint so the interaction reads as intentional;
 * after that (or immediately for reduced-motion users) it responds
 * only to the person's own input, with no animation lag while dragging.
 */
export function BeforeAfterComparison({ beforeAfterCase }: BeforeAfterComparisonProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [position, setPosition] = useState(shouldReduceMotion ? 50 : 0);
  const [hasIntroPlayed, setHasIntroPlayed] = useState(Boolean(shouldReduceMotion));
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isInView || hasIntroPlayed) return;
    const timeout = setTimeout(() => {
      setPosition(50);
      setHasIntroPlayed(true);
    }, 400);
    return () => clearTimeout(timeout);
  }, [isInView, hasIntroPlayed]);

  const { before, after } = beforeAfterCase;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div
        ref={containerRef}
        className="relative mx-auto aspect-[4/5] w-full max-w-2xl select-none overflow-hidden rounded-2xl border border-muted/15 bg-lavender sm:aspect-[3/4]"
      >
        {/* After image: full frame, sits underneath */}
        <div className="absolute inset-0">
          {after.src ? (
            <Image
              src={after.src}
              alt={after.alt}
              fill
              sizes="(min-width: 640px) 640px, 100vw"
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder label={after.alt} className="h-full w-full rounded-none" />
          )}
        </div>

        {/* Before image: clipped to the slider position, sits on top */}
        <div
          className={`absolute inset-0 ${isDragging ? "" : "transition-[clip-path] duration-500 ease-out"}`}
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          {before.src ? (
            <Image
              src={before.src}
              alt={before.alt}
              fill
              sizes="(min-width: 640px) 640px, 100vw"
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder label={before.alt} className="h-full w-full rounded-none" />
          )}
        </div>

        {/* Divider + handle, purely visual — position mirrors the range input's value */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 h-full w-0.5 -translate-x-1/2 bg-ivory shadow-[0_0_0_1px_rgba(24,21,27,0.08)] ${
            isDragging ? "" : "transition-[left] duration-500 ease-out"
          }`}
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-primary shadow-md">
            <HiOutlineArrowsRightLeft size={18} />
          </span>
        </div>

        {/* Always-visible labels — state isn't communicated by color alone */}
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-charcoal/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-ivory">
          Before
        </span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-charcoal/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-ivory">
          After
        </span>

        {/* Accessible, draggable control — native range gives keyboard + touch + pointer drag for free */}
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(event) => {
            setPosition(Number(event.target.value));
            setHasIntroPlayed(true);
          }}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onBlur={() => setIsDragging(false)}
          aria-label={`Drag to compare before and after images for ${beforeAfterCase.treatment}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 focus-visible:opacity-100 [&::-webkit-slider-thumb]:h-10 [&::-webkit-slider-thumb]:w-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-transparent"
        />
      </div>
    </motion.div>
  );
}
