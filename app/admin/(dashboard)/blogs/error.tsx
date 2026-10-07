"use client";

import { LuTriangleAlert } from "react-icons/lu";
import { Button } from "@/components/ui/Button";

export default function BlogsError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex max-w-lg flex-col items-start rounded-xl border border-muted/15 bg-white px-6 py-10">
      <LuTriangleAlert className="h-5 w-5 text-champagne" aria-hidden="true" />
      <h2 className="mt-4 text-lg font-semibold text-charcoal">Unable to load blog posts</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        Something went wrong while loading the blog list. Please try again.
      </p>
      <Button size="sm" className="mt-6" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
