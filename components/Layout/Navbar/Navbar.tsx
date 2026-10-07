"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HiOutlineCalendar } from "react-icons/hi";
import { Container } from "@/components/ui/Container";
import { Link, usePathname } from "@/i18n/navigation";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarMobile } from "./NavbarMobile";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { isActivePath, navItems, primaryCta } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Scroll distance (px) required before a direction change is registered. */
const SCROLL_THRESHOLD = 8;

/**
 * Tracks scroll to decide whether the navbar is visible (always at the top,
 * hidden while scrolling down, revealed on scroll up) and whether the page
 * has scrolled at all (used to add a subtle border/shadow). Throttled to one
 * check per animation frame; all state updates happen inside the frame
 * callback, so nothing is set synchronously in the effect.
 */
function useNavbarScroll() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentScrollY = Math.max(window.scrollY, 0);
        const delta = currentScrollY - lastScrollY.current;

        setIsScrolled(currentScrollY > SCROLL_THRESHOLD);

        if (currentScrollY <= 0) {
          setIsVisible(true);
        } else if (delta > SCROLL_THRESHOLD) {
          setIsVisible(false);
        } else if (delta < -SCROLL_THRESHOLD) {
          setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Sync once on mount (e.g. page restored mid-scroll).
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isVisible, isScrolled };
}

/**
 * Site-wide primary navigation for Dr. Ahmad Fahim Sakha.
 *
 * - Brand (lotus icon + wordmark) sits at the inline start, so it is on the
 *   left in English and the right in Dari / Pashto without any physical
 *   left/right classes.
 * - Desktop (lg+): links, language switcher, appointment CTA.
 * - Below lg: language switcher + menu button opening <NavbarMobile />.
 * - Hides on scroll down and returns on scroll up (kept visible for users
 *   who prefer reduced motion).
 * - Active link is detected from the locale-less pathname returned by
 *   `usePathname()` from "@/i18n/navigation", so /en/about, /fa/about and
 *   /ps/about all activate "About".
 *
 * Text comes from the "Navbar" namespace; links use the locale-aware `Link`.
 */
export function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const { isVisible: isScrollVisible, isScrolled } = useNavbarScroll();
  const isVisible = shouldReduceMotion ? true : isScrollVisible;
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  return (
    <motion.header
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.4, ease: EASE }}
      className={`sticky top-0 z-40 w-full border-b bg-ivory/95 backdrop-blur transition-[border-color,box-shadow] duration-300 ${
        isScrolled
          ? "border-muted/15 shadow-[0_10px_30px_-22px_rgba(24,10,32,0.35)]"
          : "border-muted/10 shadow-none"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
          <NavbarLogo />

          <nav aria-label={t("menu")} className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-10">
              {navItems.map((item) => {
                const isActive = isActivePath(pathname, item.path);
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative rounded-sm py-1 text-base font-medium transition-colors duration-300 after:absolute after:-bottom-0.5 after:start-0 after:h-px after:bg-primary after:transition-all after:duration-300 hover:text-primary hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory ${
                        isActive
                          ? "text-primary after:w-full"
                          : "text-charcoal after:w-0"
                      }`}
                    >
                      {t(item.translationKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />

            <Link
              href={primaryCta.path}
              className="hidden h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-base font-medium text-ivory transition-colors duration-300 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory lg:inline-flex"
            >
              <HiOutlineCalendar size={18} aria-hidden="true" />
              {t(primaryCta.translationKey)}
            </Link>

            <NavbarMobile />
          </div>
        </div>
      </Container>
    </motion.header>
  );
}