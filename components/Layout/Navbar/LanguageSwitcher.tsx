"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { HiOutlineGlobeAlt, HiChevronDown, HiCheck } from "react-icons/hi";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "./locales";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Language switcher. Uses next-intl's `Link` with the `locale` prop and the
 * locale-less `usePathname()` so the visitor stays on the same page
 * (/en/about -> /fa/about -> /ps/about) without any manual URL building.
 *
 * Disclosure pattern: a button toggles a list of links. Closes on outside
 * click, Escape (focus returns to the button) and when focus leaves.
 * The trigger shows a short code on small screens and the native name from
 * "Navbar.languages.*" from sm upward.
 */
export function LanguageSwitcher() {
  const t = useTranslations("Navbar");
  const activeLocale = useLocale() as Locale;
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = "language-switcher-list";

  const active = locales.find((l) => l.code === activeLocale) ?? locales[0];

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-label={`${t("language")}: ${t(`languages.${active.code}`)}`}
        className="flex h-11 items-center gap-1.5 rounded-full border border-charcoal/10 px-3 text-sm font-medium text-charcoal transition-colors duration-300 hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory sm:px-3.5"
      >
        <HiOutlineGlobeAlt size={18} className="text-primary/70" aria-hidden="true" />
        <span aria-hidden="true" className="uppercase sm:hidden">
          {active.code}
        </span>
        <span aria-hidden="true" dir={active.dir} lang={active.code} className="hidden sm:inline">
          {t(`languages.${active.code}`)}
        </span>
        <HiChevronDown
          size={14}
          className={`text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={listId}
            role="group"
            aria-label={t("selectLanguage")}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute end-0 top-[calc(100%+0.5rem)] z-10 w-44 overflow-hidden rounded-xl border border-muted/15 bg-ivory shadow-[0_20px_45px_-24px_rgba(24,10,32,0.35)]"
          >
            <ul className="py-1.5">
              {locales.map((option) => {
                const isActive = option.code === activeLocale;
                return (
                  <li key={option.code}>
                    <Link
                      href={pathname}
                      locale={option.code}
                      lang={option.code}
                      hrefLang={option.code}
                      dir={option.dir}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between gap-3 px-4 py-2.5 text-[0.95rem] transition-colors duration-200 hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-none ${
                        isActive ? "font-semibold text-primary" : "font-medium text-charcoal"
                      }`}
                    >
                      <span>{t(`languages.${option.code}`)}</span>
                      {isActive && <HiCheck size={16} className="text-primary" aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}