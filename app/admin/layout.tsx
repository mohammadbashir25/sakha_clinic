import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import "../globals.css";

export const metadata: Metadata = {
  title: "Sakha Admin",
  description: "Content management dashboard for the Sakha website.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
