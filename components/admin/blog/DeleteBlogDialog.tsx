"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LuTriangleAlert } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import type { BlogPost } from "@/types/admin";

interface DeleteBlogDialogProps {
  post: BlogPost | null;
  onCancel: () => void;
  onConfirm: (post: BlogPost) => void;
}

/**
 * `post` is the source of truth for both "is it open" and "which post" —
 * no separate open/closed boolean to keep in sync.
 */
export function DeleteBlogDialog({ post, onCancel, onConfirm }: DeleteBlogDialogProps) {
  const shouldReduceMotion = useReducedMotion();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const open = post !== null;

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
      {open && post && (
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
            aria-labelledby="delete-blog-title"
            aria-describedby="delete-blog-description"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8, scale: shouldReduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 8, scale: shouldReduceMotion ? 1 : 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
            className="relative w-full max-w-sm rounded-xl border border-muted/15 bg-white p-6 shadow-xl"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
              <LuTriangleAlert className="h-5 w-5" aria-hidden="true" />
            </div>

            <h2 id="delete-blog-title" className="mt-4 text-base font-semibold text-charcoal">
              Delete this blog post?
            </h2>
            <p id="delete-blog-description" className="mt-1.5 text-sm leading-relaxed text-muted">
              Are you sure you want to delete &ldquo;{post.title}&rdquo;? This action cannot be
              easily undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button ref={cancelButtonRef} variant="ghost" size="sm" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => onConfirm(post)}
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
