"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HiOutlineCalendar, HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { IconButton } from "@/components/ui/IconButton";
import { Link, usePathname } from "@/i18n/navigation";
import { NavbarLogo } from "./NavbarLogo";
import { isActivePath, navItems, primaryCta } from "./data";

const emptySubscribe = () => () => {};

/**
 * True once the component has hydrated on the client, false during SSR.
 * Avoids a setState-in-effect pass and keeps the portal hydration-safe.
 */
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Matches Tailwind's `lg` breakpoint, where the desktop navigation takes over. */
const DESKTOP_QUERY = "(min-width: 1024px)";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

/**
 * Mobile / tablet navigation: a menu button that opens a full-screen panel,
 * portaled to document.body so it covers the viewport regardless of the
 * header's backdrop-blur (which would otherwise trap `position: fixed`).
 *
 * The panel animates with a simple fade + short vertical slide — direction
 * neutral, so it is correct in LTR and RTL. It locks body scroll, closes on
 * Escape / link click / growing to desktop width, and returns focus to the
 * menu button.
 *
 * Labels come from the "Navbar" namespace; links use the locale-aware
 * `Link` from "@/i18n/navigation".
 */
export function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const isMounted = useIsMounted();
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.querySelector("button")?.focus();
  }, []);

  // Lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Escape to close; move focus into the panel on open.
  useEffect(() => {
    if (!isOpen) return;
    panelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  // Close if the viewport grows to the desktop layout while open.
  useEffect(() => {
    if (!isOpen) return;
    const media = window.matchMedia(DESKTOP_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [isOpen]);

  const panel = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-nav-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t("menu")}
          tabIndex={-1}
          className="fixed inset-0 z-50 bg-ivory focus:outline-none"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-muted/15 px-5 sm:h-20 sm:px-8">
              <NavbarLogo variant="panel" onClick={close} />
              <IconButton
                icon={<HiOutlineX size={22} />}
                aria-label={t("close")}
                variant="ghost"
                onClick={close}
              />
            </div>

            <motion.nav
              aria-label={t("menu")}
              className="flex flex-1 flex-col justify-between overflow-y-auto px-6 py-8 sm:px-8"
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={listVariants}
            >
              <ul className="flex flex-col divide-y divide-muted/15">
                {navItems.map((item) => {
                  const isActive = isActivePath(pathname, item.path);
                  return (
                    <motion.li key={item.path} variants={itemVariants}>
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex items-center justify-between rounded-md py-4 text-lg font-medium transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory ${
                          isActive ? "text-primary" : "text-charcoal"
                        }`}
                      >
                        <span>{t(item.translationKey)}</span>
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-primary"
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div variants={itemVariants} className="pt-8">
                <Link
                  href={primaryCta.path}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-medium text-ivory transition-colors duration-300 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                >
                  <HiOutlineCalendar size={20} aria-hidden="true" />
                  {t(primaryCta.translationKey)}
                </Link>
              </motion.div>
            </motion.nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="lg:hidden">
      <span ref={triggerRef} className="inline-flex">
        <IconButton
          icon={<HiOutlineMenu size={22} />}
          aria-label={t("menu")}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-panel"
          variant="ghost"
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </span>

      {isMounted ? createPortal(panel, document.body) : null}
    </div>
  );
}