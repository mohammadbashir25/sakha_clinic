"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarMobile } from "./NavbarMobile";
import { navItems, primaryCta } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;

const navListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/** Scroll distance (px) required before a direction change is registered. */
const SCROLL_THRESHOLD = 8;

/**
 * Tracks scroll direction to decide whether the navbar should be
 * visible: always visible at the top of the page, hidden while
 * scrolling down, revealed as soon as the user scrolls up. A small
 * threshold prevents flicker from tiny scroll jitters, and the
 * listener is throttled to one check per animation frame.
 */
function useNavbarVisibility() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentScrollY = Math.max(window.scrollY, 0);
        const previousScrollY = lastScrollY.current;
        const delta = currentScrollY - previousScrollY;

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isVisible;
}

/**
 * Site-wide primary navigation. A client component so it can run a
 * one-time cinematic entrance (header drops in, logo slides from the
 * left, links stagger in, CTA settles in last) and then hide on
 * scroll-down / reveal on scroll-up. Motion is skipped for users who
 * prefer reduced motion — the navbar simply stays visible for them.
 *
 * <Navbar />
 */
export function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const isScrollVisible = useNavbarVisibility();
  const isVisible = shouldReduceMotion ? true : isScrollVisible;

  return (
    <motion.header
      initial={shouldReduceMotion ? false : { y: -48, opacity: 0 }}
      animate={{ y: isVisible ? 0 : "-100%", opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="sticky top-0 z-40 w-full border-b border-muted/10 bg-ivory/95 backdrop-blur"
    >
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <NavbarLogo />
          </motion.div>

          <motion.nav
            aria-label="Primary"
            className="hidden md:block"
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={navListVariants}
          >
            <ul className="flex items-center gap-8 lg:gap-10">
              {navItems.map((item) => (
                <motion.li key={item.href} variants={navItemVariants}>
                  <Link
                    href={item.href}
                    className="relative text-sm font-medium text-charcoal transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:text-primary hover:after:w-full lg:text-base"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            className="hidden md:block"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.75 }}
          >
            <Link
              href={primaryCta.href}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory lg:text-base"
            >
              {primaryCta.label}
            </Link>
          </motion.div>

          <NavbarMobile />
        </div>
      </Container>
    </motion.header>
  );
}