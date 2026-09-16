import Link from "next/link";
import { LuLogOut } from "react-icons/lu";
import { AdminNavLinks } from "./AdminNavLinks";

/**
 * Persistent sidebar for md (tablet, narrower) and lg (desktop, full width)
 * screens. Hidden below md, where MobileSidebar takes over instead.
 */
export function AdminSidebar() {
  return (
    <aside className="hidden shrink-0 md:sticky md:top-0 md:flex md:h-dvh md:w-56 md:flex-col md:border-r md:border-white/10 md:bg-primary-dark lg:w-64">
      <div className="flex h-full flex-col px-4 py-6">
        <Link href="/admin" className="flex items-center gap-3 px-2 pb-6">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-champagne/15 text-sm font-semibold text-champagne">
            S
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-semibold tracking-[0.08em] text-ivory">SAKHA</span>
            <span className="truncate text-[11px] tracking-[0.14em] text-lavender/50">Admin</span>
          </span>
        </Link>

        <div className="h-px w-full bg-white/10" />

        <div className="flex-1 overflow-y-auto pt-6">
          <AdminNavLinks />
        </div>

        <div className="border-t border-white/10 pt-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-lavender/60 transition-colors duration-200 hover:bg-white/5 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark"
          >
            <LuLogOut className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}