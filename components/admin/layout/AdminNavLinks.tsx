"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/ui/utils";
import { adminNavItems, isNavItemActive } from "./nav-config";

interface AdminNavLinksProps {
  /** Called after a link is clicked — used to close the mobile drawer. */
  onNavigate?: () => void;
  className?: string;
}

export function AdminNavLinks({ onNavigate, className }: AdminNavLinksProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin sections" className={cn("flex flex-col gap-1", className)}>
      {adminNavItems.map((item) => {
        const active = isNavItemActive(pathname, item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark",
              active ? "bg-white/10 text-ivory" : "text-lavender/70 hover:bg-white/5 hover:text-ivory",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-champagne transition-opacity duration-200",
                active ? "opacity-100" : "opacity-0",
              )}
            />
            <Icon
              className={cn(
                "h-[18px] w-[18px] shrink-0 transition-colors duration-200",
                active ? "text-champagne" : "text-lavender/50 group-hover:text-lavender",
              )}
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
