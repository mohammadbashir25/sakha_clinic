"use client";

import { useTranslations } from "next-intl";
import { PiFlowerLotusLight } from "react-icons/pi";
import { Link } from "@/i18n/navigation";
import { brand } from "./data";

interface NavbarLogoProps {
  /** "header" hides the subtitle until xl; "panel" always shows it. */
  variant?: "header" | "panel";
  onClick?: () => void;
}

/**
 * Sakha brand mark: a quiet lotus icon in a thin ring beside the wordmark.
 * All text comes from the "Navbar" namespace (brandName, brandSubtitle);
 * the link's accessible name is the doctor's full name (brandFullName).
 *
 * Letter-spacing is reset in RTL because tracking breaks the joined letter
 * forms of Dari and Pashto script.
 */
export function NavbarLogo({ variant = "header", onClick }: NavbarLogoProps) {
  const t = useTranslations("Navbar");

  return (
    <Link
      href={brand.path}
      onClick={onClick}
      aria-label={t("brandFullName")}
      className="group flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
    >
      <span
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-primary/5 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-ivory"
      >
        <PiFlowerLotusLight size={24} />
      </span>

      <span className="flex flex-col leading-tight">
        <span className="text-xl font-semibold tracking-[0.08em] text-primary rtl:tracking-normal sm:text-2xl">
          {t("brandName")}
        </span>
        <span
          className={`mt-0.5 text-xs text-muted ${
            variant === "header" ? "hidden xl:block" : "block"
          }`}
        >
          {t("brandSubtitle")}
        </span>
      </span>
    </Link>
  );
}
