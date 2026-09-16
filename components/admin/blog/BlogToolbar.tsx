"use client";

import { LuSearch } from "react-icons/lu";
import { cn } from "@/components/ui/utils";
import { ALL_CATEGORIES, type BlogStatusFilter } from "@/lib/admin/blog-filters";

interface BlogToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  status: BlogStatusFilter;
  onStatusChange: (value: BlogStatusFilter) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
}

const statusOptions: { value: BlogStatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

export function BlogToolbar({
  query,
  onQueryChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
  categories,
}: BlogToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <LuSearch
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search title, author, category"
          aria-label="Search blog posts"
          className="h-10 w-full rounded-xl border border-muted/20 bg-white pl-9 pr-3 text-sm text-charcoal placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div
          role="tablist"
          aria-label="Filter by status"
          className="flex items-center gap-1 rounded-xl border border-muted/20 bg-white p-1"
        >
          {statusOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={status === option.value}
              onClick={() => onStatusChange(option.value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
                status === option.value
                  ? "bg-primary text-ivory"
                  : "text-muted hover:text-charcoal",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <label className="sr-only" htmlFor="blog-category-filter">
          Filter by category
        </label>
        <select
          id="blog-category-filter"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="h-10 rounded-xl border border-muted/20 bg-white px-3 text-sm text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          <option value={ALL_CATEGORIES}>All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
