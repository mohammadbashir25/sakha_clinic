import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { cn } from "@/components/ui/utils";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Simple prev/next + page-number control, shared by any admin list
 * that grows past one page (blogs today; images and testimonials can
 * reuse it as they get real data).
 */
export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Blog list pages"
      className={cn("flex items-center justify-between gap-4 sm:justify-center", className)}
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-charcoal transition-colors duration-200 hover:bg-lavender disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        aria-label="Previous page"
      >
        <LuChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>

      <ul className="flex items-center gap-1">
        {pages.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              type="button"
              onClick={() => onPageChange(pageNumber)}
              aria-current={pageNumber === page ? "page" : undefined}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium tabular-nums transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
                pageNumber === page
                  ? "bg-primary text-ivory"
                  : "text-charcoal hover:bg-lavender",
              )}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-charcoal transition-colors duration-200 hover:bg-lavender disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        aria-label="Next page"
      >
        <LuChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
