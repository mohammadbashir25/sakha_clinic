"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LuLogOut, LuX } from "react-icons/lu";
import { AdminNavLinks } from "./AdminNavLinks";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Drawer navigation for screens below md. Mounted permanently (so
 * AnimatePresence can animate the exit) but only ever visible on
 * small screens — see the "md:hidden" wrapper below.
 */
export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();
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

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
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
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigation"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-primary-dark px-4 py-6 shadow-xl"
          >
            <div className="flex items-center justify-between px-2 pb-6">
              <Link href="/admin" onClick={onClose} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-champagne/15 text-sm font-semibold text-champagne">
                  S
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold tracking-[0.08em] text-ivory">SAKHA</span>
                  <span className="text-[11px] tracking-[0.14em] text-lavender/50">Admin</span>
                </span>
              </Link>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-lavender/70 transition-colors duration-200 hover:bg-white/10 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
              >
                <LuX className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="h-px w-full bg-white/10" />

            <div className="flex-1 overflow-y-auto pt-6">
              <AdminNavLinks onNavigate={onClose} />
            </div>

            <div className="border-t border-white/10 pt-4">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-lavender/60 transition-colors duration-200 hover:bg-white/5 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
              >
                <LuLogOut className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                <span>Sign out</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
