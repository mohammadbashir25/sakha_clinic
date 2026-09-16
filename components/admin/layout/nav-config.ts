import type { IconType } from "react-icons";
import { LuImages, LuLayoutDashboard, LuNewspaper } from "react-icons/lu";
import { FiMessageCircle } from "react-icons/fi";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: IconType;
  /** Shown in the admin header when this section is active. */
  description: string;
}

/**
 * Single source of truth for admin navigation.
 * Add a future route here and both the sidebar/drawer nav and the
 * header title + description pick it up automatically.
 */
export const adminNavItems: AdminNavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LuLayoutDashboard,
    description: "Overview of your Sakha website content",
  },
  {
    label: "Blogs",
    href: "/admin/blogs",
    icon: LuNewspaper,
    description: "Create and manage your medical articles",
  },
  {
    label: "Images",
    href: "/admin/images",
    icon: LuImages,
    description: "Manage the Sakha media library",
  },
    {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: FiMessageCircle,
    description: "Manage the Sakha testimonials",
  },
];

/**
 * Matches a pathname to a nav item, including nested future routes
 * (e.g. /admin/blogs/add or /admin/blogs/edit/[id] both match "Blogs").
 * "/admin" itself only matches the dashboard exactly, so it doesn't
 * swallow every other section.
 */
export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getActiveNavItem(pathname: string): AdminNavItem | null {
  return adminNavItems.find((item) => isNavItemActive(pathname, item.href)) ?? null;
}
