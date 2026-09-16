"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { IconButton } from "@/components/ui/IconButton";
import { navItems, primaryCta } from "./data";

const emptySubscribe = () => () => {};

/**
 * True once the component has hydrated on the client, false during SSR.
 * Uses useSyncExternalStore instead of a `useEffect(() => setState(true))`
 * so there's no setState-in-effect render pass to flag or wait on.
 */
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

const linkListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
};

const linkItemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/**
 * Mobile navigation: a compact menu button that opens a full-screen
 * overlay panel, portaled to document.body so it always covers the
 * whole viewport regardless of ancestor styles (e.g. the header's
 * backdrop-blur, which otherwise becomes a containing block for
 * `position: fixed` descendants). The panel reveals with a cinematic
 * iris wipe from the menu button, then the links and CTA stagger in.
 * Kept as a client component because open/close state, the portal,
 * and the motion require it; the rest of the Navbar stays server-driven.
 */
export function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const isMounted = useIsMounted();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const panel = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-nav-panel"
          className="fixed inset-0 z-50 bg-ivory"
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { clipPath: "circle(150% at calc(100% - 2.5rem) 2rem)" }
          }
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" }
          }
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-between border-b border-muted/15 px-5 sm:h-20 sm:px-8">
              <span className="text-xl font-semibold tracking-[0.08em] text-primary">
                SAKHA
              </span>
              <IconButton
                icon={<HiOutlineX size={22} />}
                aria-label="Close menu"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              />
            </div>

            <motion.nav
              aria-label="Mobile"
              className="flex flex-1 flex-col justify-between overflow-y-auto px-6 py-8 sm:px-8"
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              exit="hidden"
              variants={linkListVariants}
            >
              <ul className="flex flex-col divide-y divide-muted/15">
                {navItems.map((item) => (
                  <motion.li key={item.href} variants={linkItemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center py-4 text-lg font-medium text-charcoal transition-colors duration-300 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div variants={ctaVariants}>
                <Link
                  href={primaryCta.href}
                  onClick={() => setIsOpen(false)}
                  className="mt-8 inline-flex h-13 w-full items-center justify-center rounded-xl bg-primary px-6 text-base font-medium text-ivory transition-colors duration-300 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                >
                  {primaryCta.label}
                </Link>
              </motion.div>
            </motion.nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden">
      <IconButton
        icon={
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="flex"
            >
              {isOpen ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
            </motion.span>
          </AnimatePresence>
        }
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        variant="ghost"
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {isMounted ? createPortal(panel, document.body) : null}
    </div>
  );
}