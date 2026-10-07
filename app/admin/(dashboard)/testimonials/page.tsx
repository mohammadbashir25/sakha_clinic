"use client";

import { useEffect, useMemo, useState } from "react";
import type { Testimonial } from "@/types/admin";
import { DeleteTestimonialDialog } from "@/components/admin/testimonials/DeleteTestimonialDialog";
import { TestimonialFormPanel } from "@/components/admin/testimonials/TestimonialFormPanel";
import { TestimonialList } from "@/components/admin/testimonials/TestimonialList";
import { TestimonialPreview } from "@/components/admin/testimonials/TestimonialPreview";
import { TestimonialsHeader } from "@/components/admin/testimonials/TestimonialsHeader";
import { TestimonialToolbar } from "@/components/admin/testimonials/TestimonialToolbar";
import type { TestimonialFormValues, TestimonialStatusFilter } from "@/components/admin/testimonials/types";

const emptyFormValues: TestimonialFormValues = {
  name: "",
  treatment: "",
  quote: "",
  rating: 5,
  published: false,
  date: new Date().toISOString().slice(0, 10),
};

const mockTestimonials: Testimonial[] = [];

/**
 * All data here is local/mock, per the current build stage — swap
 * `loadTestimonials` for a real fetch later and the rest of the page,
 * including the loading/error states, doesn't need to change.
 */
async function loadTestimonials(): Promise<Testimonial[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockTestimonials;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TestimonialStatusFilter>("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  const [previewing, setPreviewing] = useState<Testimonial | null>(null);
  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState<Testimonial | null>(null);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const data = await loadTestimonials();
      setTestimonials(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    loadTestimonials()
      .then((data) => {
        if (isMounted) setTestimonials(data);
      })
      .catch(() => {
        if (isMounted) setHasError(true);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const services = useMemo(
    () => Array.from(new Set(testimonials.map((testimonial) => testimonial.treatment))).sort(),
    [testimonials],
  );

  const filteredTestimonials = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return testimonials.filter((testimonial) => {
      const matchesQuery =
        query.length === 0 ||
        testimonial.name.toLowerCase().includes(query) ||
        testimonial.quote.toLowerCase().includes(query) ||
        testimonial.treatment.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && testimonial.published) ||
        (statusFilter === "draft" && !testimonial.published);

      const matchesService = serviceFilter === "all" || testimonial.treatment === serviceFilter;

      return matchesQuery && matchesStatus && matchesService;
    });
  }, [testimonials, searchQuery, statusFilter, serviceFilter]);

  const isFiltered = searchQuery.trim().length > 0 || statusFilter !== "all" || serviceFilter !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setServiceFilter("all");
  };

  const handleAddClick = () => {
    setEditingTestimonial(null);
    setFormMode("add");
  };

  const handleEditClick = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormMode("edit");
  };

  const handleFormClose = () => {
    setFormMode(null);
    setEditingTestimonial(null);
  };

  const handleFormSubmit = (values: TestimonialFormValues) => {
    if (formMode === "edit" && editingTestimonial) {
      setTestimonials((prev) =>
        prev.map((testimonial) =>
          testimonial.id === editingTestimonial.id ? { ...testimonial, ...values } : testimonial,
        ),
      );
    } else {
      const newTestimonial: Testimonial = {
        id: crypto.randomUUID(),
        ...values,
      };
      setTestimonials((prev) => [newTestimonial, ...prev]);
    }
    handleFormClose();
  };

  const handleTogglePublish = (testimonial: Testimonial) => {
    setTestimonials((prev) =>
      prev.map((item) =>
        item.id === testimonial.id ? { ...item, published: !item.published } : item,
      ),
    );
  };

  const handleDeleteConfirm = () => {
    if (!deleting) return;
    setTestimonials((prev) => prev.filter((testimonial) => testimonial.id !== deleting.id));
    setDeleting(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <TestimonialsHeader onAddClick={handleAddClick} />

      <TestimonialToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        serviceFilter={serviceFilter}
        onServiceFilterChange={setServiceFilter}
        services={services}
        resultCount={filteredTestimonials.length}
      />

      <TestimonialList
        testimonials={filteredTestimonials}
        isLoading={isLoading}
        hasError={hasError}
        isFiltered={isFiltered}
        onRetry={fetchTestimonials}
        onAddClick={handleAddClick}
        onClearFilters={clearFilters}
        onView={setPreviewing}
        onEdit={handleEditClick}
        onTogglePublish={handleTogglePublish}
        onDelete={setDeleting}
      />

      <TestimonialPreview testimonial={previewing} onClose={() => setPreviewing(null)} />

      <TestimonialFormPanel
        mode={formMode}
        initialValues={editingTestimonial ?? emptyFormValues}
        services={services}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
      />

      <DeleteTestimonialDialog
        testimonial={deleting}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
