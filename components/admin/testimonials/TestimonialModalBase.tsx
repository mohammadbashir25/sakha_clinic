"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/components/ui/utils";

interface TestimonialModalBaseProps {
  open: boolean;
  onClose: () => void;
  ariaLabel: string;
  children: ReactNode;
  /** "dialog" centers a bounded panel; "drawer" slides in from the right for the form. */
  variant?: "dialog" | "drawer";
  className?: string;
}

export function TestimonialModalBase({
  open,
  onClose,
  ariaLabel,
  children,
  variant = "dialog",
  className,
}: TestimonialModalBaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    panelRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const isDrawer = variant === "drawer";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="absolute inset-0 bg-charcoal/50"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            tabIndex={-1}
            initial={isDrawer ? { x: "100%" } : { opacity: 0, scale: 0.97, y: 8 }}
            animate={isDrawer ? { x: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isDrawer ? { x: "100%" } : { opacity: 0, scale: 0.97, y: 8 }}
            transition={{
              duration: shouldReduceMotion ? 0 : isDrawer ? 0.25 : 0.2,
              ease: isDrawer ? [0.32, 0.72, 0, 1] : "easeOut",
            }}
            className={cn(
              "absolute bg-ivory shadow-xl focus:outline-none",
              isDrawer
                ? "inset-y-0 right-0 flex w-full max-w-md flex-col"
                : "left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl",
              className,
            )}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
