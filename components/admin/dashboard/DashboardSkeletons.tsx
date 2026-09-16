import { SectionShell } from "./SectionShell";

/**
 * Skeletons mirror the real layout closely so nothing shifts when the
 * content arrives. Quiet pulse, no spinners. Used by app/admin/loading.tsx
 * and ready to reuse for per-section loading once data is async.
 */

function Bar({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-muted/15 ${className}`} aria-hidden="true" />;
}

export function StatsSkeleton() {
  return (
    <div
      className="grid grid-cols-2 overflow-hidden rounded-xl border border-muted/15 bg-white lg:grid-cols-4"
      role="status"
      aria-label="Loading content statistics"
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={[
            "flex flex-col gap-2.5 px-5 py-5 sm:px-6",
            index % 2 === 1 ? "border-l border-muted/15" : "",
            index > 1 ? "border-t border-muted/15" : "",
            "lg:border-t-0",
            index > 0 ? "lg:border-l lg:border-muted/15" : "lg:border-l-0",
          ].join(" ")}
        >
          <Bar className="h-3.5 w-24" />
          <Bar className="h-7 w-12" />
          <Bar className="h-3 w-28" />
        </div>
      ))}
    </div>
  );
}

export function RecentBlogsSkeleton() {
  return (
    <SectionShell title="Recent blog posts">
      <ul
        className="divide-y divide-muted/15 overflow-hidden rounded-xl border border-muted/15 bg-white"
        role="status"
        aria-label="Loading recent blog posts"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index} className="flex items-center gap-4 px-4 py-4 sm:px-5">
            <Bar className="h-12 w-16 shrink-0 rounded-lg sm:h-14 sm:w-20" />
            <div className="flex flex-1 flex-col gap-2">
              <Bar className="h-3.5 w-3/4 max-w-sm" />
              <Bar className="h-3 w-24" />
            </div>
            <Bar className="hidden h-5 w-20 sm:block" />
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

export function RecentImagesSkeleton() {
  return (
    <SectionShell title="Recent images">
      <ul
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        role="status"
        aria-label="Loading recent images"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index} className="flex flex-col gap-2">
            <Bar className="aspect-[4/3] w-full rounded-lg" />
            <Bar className="h-3 w-4/5" />
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
