function Shimmer({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-muted/15 ${className ?? ""}`} />;
}

export function TestimonialListSkeleton() {
  return (
    <div>
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-xl border border-muted/15 md:block">
        <table className="w-full">
          <tbody>
            {Array.from({ length: 4 }, (_, index) => (
              <tr key={index} className="border-b border-muted/10 last:border-b-0">
                <td className="py-4 pl-5 pr-3">
                  <Shimmer className="h-4 w-24" />
                </td>
                <td className="py-4 pr-3">
                  <Shimmer className="h-4 w-64" />
                </td>
                <td className="py-4 pr-3">
                  <Shimmer className="h-4 w-20" />
                </td>
                <td className="py-4 pr-3">
                  <Shimmer className="h-4 w-16" />
                </td>
                <td className="py-4 pr-3">
                  <Shimmer className="h-5 w-20 rounded-full" />
                </td>
                <td className="py-4 pr-3">
                  <Shimmer className="h-4 w-20" />
                </td>
                <td className="py-4 pl-3 pr-5">
                  <Shimmer className="h-4 w-20" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-3 md:hidden">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="rounded-xl border border-muted/15 bg-white/60 p-4">
            <div className="flex items-start justify-between gap-3">
              <Shimmer className="h-4 w-28" />
              <Shimmer className="h-5 w-16 rounded-full" />
            </div>
            <Shimmer className="mt-3 h-4 w-full" />
            <Shimmer className="mt-2 h-4 w-3/4" />
            <div className="mt-4 flex items-center justify-between border-t border-muted/10 pt-3">
              <Shimmer className="h-3 w-16" />
              <Shimmer className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
