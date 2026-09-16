"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LuTriangleAlert } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import type { MediaImage } from "@/types/admin";

interface DeleteImageDialogProps {
  image: MediaImage | null;
  onCancel: () => void;
  onConfirm: (image: MediaImage) => void;
}

/**
 * There's no dependency detection yet (nothing checks whether this image
 * is used on a live page), so the copy stays honest about that instead
 * of implying a check that doesn't exist.
 */
export function DeleteImageDialog({ image, onCancel, onConfirm }: DeleteImageDialogProps) {
  const shouldReduceMotion = useReducedMotion();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const open = image !== null;

  useEffect(() => {
    if (!open) return;

    cancelButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open && image && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
            onClick={onCancel}
            aria-hidden="true"
            className="absolute inset-0 bg-charcoal/50"
          />

          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-image-title"
            aria-describedby="delete-image-description"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8, scale: shouldReduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 8, scale: shouldReduceMotion ? 1 : 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
            className="relative w-full max-w-sm rounded-xl border border-muted/15 bg-white p-6 shadow-xl"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
              <LuTriangleAlert className="h-5 w-5" aria-hidden="true" />
            </div>

            <h2 id="delete-image-title" className="mt-4 text-base font-semibold text-charcoal">
              Delete this image?
            </h2>
            <p id="delete-image-description" className="mt-1.5 text-sm leading-relaxed text-muted">
              Are you sure you want to remove &ldquo;{image.title}&rdquo; from the media library?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button ref={cancelButtonRef} variant="ghost" size="sm" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => onConfirm(image)}
                className="bg-red-600 text-ivory hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
