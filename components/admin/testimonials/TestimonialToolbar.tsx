"use client";

import { LuSearch, LuX } from "react-icons/lu";
import { cn } from "@/components/ui/utils";
import type { TestimonialStatusFilter } from "./types";

interface TestimonialToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: TestimonialStatusFilter;
  onStatusFilterChange: (value: TestimonialStatusFilter) => void;
  serviceFilter: string;
  onServiceFilterChange: (value: string) => void;
  services: string[];
  resultCount: number;
}

const statusOptions: { value: TestimonialStatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

export function TestimonialToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  serviceFilter,
  onServiceFilterChange,
  services,
  resultCount,
}: TestimonialToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-muted/15 bg-white/60 p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <LuSearch
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/60"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name, testimonial or service"
            aria-label="Search testimonials"
            className="w-full rounded-lg border border-muted/20 bg-ivory py-2.5 pl-9 pr-9 text-sm text-charcoal placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted/60 hover:bg-muted/10 hover:text-charcoal"
            >
              <LuX className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="service-filter" className="sr-only">
            Filter by service
          </label>
          <select
            id="service-filter"
            value={serviceFilter}
            onChange={(event) => onServiceFilterChange(event.target.value)}
            className="rounded-lg border border-muted/20 bg-ivory px-3 py-2.5 text-sm text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne sm:min-w-[10rem]"
          >
            <option value="all">All services</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 rounded-lg border border-muted/15 bg-ivory p-1">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onStatusFilterChange(option.value)}
              aria-pressed={statusFilter === option.value}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200",
                statusFilter === option.value
                  ? "bg-primary-dark text-ivory"
                  : "text-muted hover:text-charcoal",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted">
          {resultCount} {resultCount === 1 ? "testimonial" : "testimonials"}
        </p>
      </div>
    </div>
  );
}
