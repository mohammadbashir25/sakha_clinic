"use client";

import type { BlogCategory } from "./data";
import { blogCategories } from "./data";

export default function BlogCategories({
  activeCategory,
  onChange,
}: {
  activeCategory: BlogCategory;
  onChange: (category: BlogCategory) => void;
}) {
  return (
    <nav aria-label="Filter articles by topic" className="overflow-x-auto">
      <ul className="flex min-w-max gap-x-6 gap-y-3 border-b border-muted/20 pb-4">
        {blogCategories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <li key={category}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onChange(category)}
                className={`whitespace-nowrap pb-1 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid ${
                  isActive
                    ? "font-medium text-primary"
                    : "text-muted hover:text-charcoal"
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