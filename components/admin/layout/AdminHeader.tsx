"use client";

import { usePathname } from "next/navigation";
import { LuMenu, LuUser } from "react-icons/lu";
import { IconButton } from "@/components/ui/IconButton";
import { getActiveNavItem } from "./nav-config";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

/**
 * Title and description are derived from the current route via
 * nav-config.ts, so future pages only need an entry there — nothing
 * here needs to change.
 */
export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const activeItem = getActiveNavItem(pathname);
  const title = activeItem?.label ?? "Dashboard";
  const description = activeItem?.description ?? "Overview of your Sakha website content";

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-muted/15 bg-ivory/95 px-5 py-4 backdrop-blur supports-[backdrop-filter]:bg-ivory/80 sm:px-8">
      <IconButton
        icon={<LuMenu className="h-5 w-5" />}
        aria-label="Open admin menu"
        variant="ghost"
        onClick={onMenuClick}
        className="md:hidden"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <h1 className="truncate text-lg font-semibold text-charcoal sm:text-xl">{title}</h1>
        <p className="truncate text-sm text-muted">{description}</p>
      </div>

      <div className="hidden shrink-0 items-center gap-2 rounded-full border border-muted/20 py-1.5 pl-1.5 pr-3 sm:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lavender text-primary">
          <LuUser className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span className="text-sm font-medium text-charcoal">Admin</span>
      </div>
    </header>
  );
}
