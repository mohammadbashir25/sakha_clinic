"use client";

import { LuSearch } from "react-icons/lu";
import { ALL_CATEGORIES } from "@/lib/admin/image-filters";

interface ImageToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
}

export function ImageToolbar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  categories,
}: ImageToolbarProps) {
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
          placeholder="Search filename, title, alt text"
          aria-label="Search images"
          className="h-10 w-full rounded-xl border border-muted/20 bg-white pl-9 pr-3 text-sm text-charcoal placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        />
      </div>

      <div>
        <label className="sr-only" htmlFor="image-category-filter">
          Filter by category
        </label>
        <select
          id="image-category-filter"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="h-10 w-full rounded-xl border border-muted/20 bg-white px-3 text-sm text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory sm:w-auto"
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
