"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HiOutlineXMark, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import {ImagePlaceholder} from "@/components/ui/ImagePlaceholder";
import type { GalleryItem } from "../data";

export default function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const item = items[activeIndex];
  const total = items.length;

  const goPrev = () => onNavigate((activeIndex - 1 + total) % total);
  const goNext = () => onNavigate((activeIndex + 1) % total);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft" && total > 1) {
        onNavigate((activeIndex - 1 + total) % total);
      } else if (event.key === "ArrowRight" && total > 1) {
        onNavigate((activeIndex + 1) % total);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, total, onClose, onNavigate]);

  if (!item) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — gallery viewer`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/95 px-4 py-10 sm:px-8"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close gallery viewer"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-orchid sm:right-8 sm:top-8"
      >
        <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-orchid sm:left-6"
          >
            <HiChevronLeft className="h-7 w-7" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-orchid sm:right-6"
          >
            <HiChevronRight className="h-7 w-7" aria-hidden="true" />
          </button>
        </>
      )}

      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-3xl"
      >
        {item.type === "image" ? (
          <ImagePlaceholder
            label={item.imageLabel}

            className="mx-auto max-h-[75vh] w-auto"
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <ImagePlaceholder
                label={item.beforeLabel}

                className="w-full"
              />
              <span className="mt-2 block text-center text-xs uppercase tracking-wide text-ivory/70">
                Before
              </span>
            </div>
            <div>
              <ImagePlaceholder
                label={item.afterLabel}

                className="w-full"
              />
              <span className="mt-2 block text-center text-xs uppercase tracking-wide text-ivory/70">
                After
              </span>
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm text-ivory">{item.caption}</p>
          {item.type === "before-after" && item.note && (
            <p className="mt-1 text-xs text-ivory/60">{item.note}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}