"use client";

import {
  filterCategories,
  type GalleryCategory,
} from "../data";

export default function GalleryFilters({
  activeCategory,
  onChange,
}: {
  activeCategory: GalleryCategory;
  onChange: (category: GalleryCategory) => void;
}) {
  return (
    <nav aria-label="Filter gallery by category">
      <ul className="flex flex-wrap gap-x-6 gap-y-3">
        {filterCategories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <li key={category}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onChange(category)}
                className={`border-b pb-1 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid ${
                  isActive
                    ? "border-primary font-medium text-primary"
                    : "border-transparent text-muted hover:text-charcoal"
                }`}
              >
                {category}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}