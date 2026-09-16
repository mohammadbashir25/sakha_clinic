function Bar({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-muted/15 ${className}`} aria-hidden="true" />;
}

export function ImageGridSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Bar className="h-10 w-full sm:max-w-xs" />
        <Bar className="h-10 w-40" />
      </div>

      <ul
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        role="status"
        aria-label="Loading images"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index} className="flex flex-col gap-2">
            <Bar className="aspect-[4/3] w-full rounded-lg" />
            <Bar className="h-3 w-4/5" />
            <Bar className="h-2.5 w-2/5" />
          </li>
        ))}
      </ul>
    </div>
  );
}
