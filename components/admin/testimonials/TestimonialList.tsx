"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Testimonial } from "@/types/admin";
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialErrorState } from "./TestimonialErrorState";
import { TestimonialEmptyState } from "./TestimonialEmptyState";
import { TestimonialListSkeleton } from "./TestimonialListSkeleton";
import { TestimonialRow } from "./TestimonialRow";

interface TestimonialListProps {
  testimonials: Testimonial[];
  isLoading: boolean;
  hasError: boolean;
  isFiltered: boolean;
  onRetry: () => void;
  onAddClick: () => void;
  onClearFilters: () => void;
  onView: (testimonial: Testimonial) => void;
  onEdit: (testimonial: Testimonial) => void;
  onTogglePublish: (testimonial: Testimonial) => void;
  onDelete: (testimonial: Testimonial) => void;
}

const columnHeaders = ["Name", "Testimonial", "Service", "Rating", "Status", "Date", ""];

export function TestimonialList({
  testimonials,
  isLoading,
  hasError,
  isFiltered,
  onRetry,
  onAddClick,
  onClearFilters,
  onView,
  onEdit,
  onTogglePublish,
  onDelete,
}: TestimonialListProps) {
  const shouldReduceMotion = useReducedMotion();

  if (isLoading) return <TestimonialListSkeleton />;
  if (hasError) return <TestimonialErrorState onRetry={onRetry} />;
  if (testimonials.length === 0) {
    return (
      <TestimonialEmptyState
        isFiltered={isFiltered}
        onAddClick={onAddClick}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }}
    >
      {/* Desktop / tablet */}
      <div className="hidden overflow-x-auto rounded-xl border border-muted/15 md:block">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr className="border-b border-muted/15 bg-lavender/20 text-left">
              {columnHeaders.map((header) => (
                <th
                  key={header || "actions"}
                  scope="col"
                  className="py-3 pl-5 pr-3 text-xs font-medium text-muted first:pl-5 last:pr-5"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <TestimonialRow
                key={testimonial.id}
                testimonial={testimonial}
                onView={() => onView(testimonial)}
                onEdit={() => onEdit(testimonial)}
                onTogglePublish={() => onTogglePublish(testimonial)}
                onDelete={() => onDelete(testimonial)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-3 md:hidden">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            onView={() => onView(testimonial)}
            onEdit={() => onEdit(testimonial)}
            onTogglePublish={() => onTogglePublish(testimonial)}
            onDelete={() => onDelete(testimonial)}
          />
        ))}
      </div>
    </motion.div>
  );
}
