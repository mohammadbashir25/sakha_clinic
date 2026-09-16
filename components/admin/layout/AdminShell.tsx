"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { AdminHeader } from "./AdminHeader";
import { AdminPageTransition } from "./AdminPageTransition";
import { AdminSidebar } from "./AdminSidebar";
import { MobileSidebar } from "./MobileSidebar";

interface AdminShellProps {
  children: ReactNode;
}

/**
 * The only stateful piece of the layout: it owns whether the mobile
 * drawer is open, since both the header (which opens it) and the
 * drawer itself need to share that state.
 */
export function AdminShell({ children }: AdminShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-ivory">
      <AdminSidebar />
      <MobileSidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader onMenuClick={() => setMobileNavOpen(true)} />

        <main className="flex-1 overflow-x-hidden px-5 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto w-full max-w-screen-2xl">
            <AdminPageTransition>{children}</AdminPageTransition>
          </div>
        </main>
      </div>
    </div>
  );
}
