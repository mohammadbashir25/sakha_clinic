function Bar({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-muted/15 ${className}`} aria-hidden="true" />;
}

/** Mirrors BlogTable's row shape so nothing shifts once real rows arrive. */
export function BlogListSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Bar className="h-10 w-full sm:max-w-xs" />
        <Bar className="h-10 w-64" />
      </div>

      <ul
        className="divide-y divide-muted/15 overflow-hidden rounded-xl border border-muted/15 bg-white"
        role="status"
        aria-label="Loading blog posts"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index} className="flex items-center gap-4 px-5 py-4">
            <Bar className="h-12 w-16 shrink-0 rounded-lg" />
            <div className="flex flex-1 flex-col gap-2">
              <Bar className="h-3.5 w-2/3 max-w-sm" />
              <Bar className="h-3 w-32" />
            </div>
            <Bar className="hidden h-5 w-20 sm:block" />
            <Bar className="hidden h-3 w-16 md:block" />
            <Bar className="h-8 w-24" />
          </li>
        ))}
      </ul>
    </div>
  );
}
