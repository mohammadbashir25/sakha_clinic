"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Testimonial } from "@/types/admin";
import { DeleteTestimonialDialog } from "@/components/admin/testimonials/DeleteTestimonialDialog";
import { TestimonialFormPanel } from "@/components/admin/testimonials/TestimonialFormPanel";
import { TestimonialList } from "@/components/admin/testimonials/TestimonialList";
import { TestimonialPreview } from "@/components/admin/testimonials/TestimonialPreview";
import { TestimonialsHeader } from "@/components/admin/testimonials/TestimonialsHeader";
import { TestimonialToolbar } from "@/components/admin/testimonials/TestimonialToolbar";
import { emptyTestimonialTranslations, type TestimonialFormValues, type TestimonialStatusFilter } from "@/components/admin/testimonials/types";

const emptyFormValues: TestimonialFormValues = { name: "", translations: emptyTestimonialTranslations, rating: 5, published: false, date: new Date().toISOString().slice(0, 10) };

function mapTestimonial(raw: any): Testimonial {
  const translations = { ...emptyTestimonialTranslations, ...(raw.translations ?? {}) };
  return { id: String(raw.id ?? raw._id), name: raw.name ?? "", quote: translations.en.quote ?? raw.quote ?? "", treatment: translations.en.treatment ?? raw.treatment ?? "", translations, rating: raw.rating >= 1 && raw.rating <= 5 ? raw.rating : 5, published: Boolean(raw.published), date: new Date(raw.date ?? raw.createdAt ?? Date.now()).toISOString().slice(0, 10) };
}
function toFormValues(item: Testimonial): TestimonialFormValues {
  return { name: item.name, translations: { ...emptyTestimonialTranslations, ...(item.translations ?? {}) }, rating: item.rating, published: item.published, date: item.date };
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

  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true); setHasError(false);
    try {
      const response = await fetch("/api/admin/testimonials", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to load testimonials.");
      setTestimonials((data.testimonials ?? []).map(mapTestimonial));
    } catch (error) { console.error("Failed to load testimonials:", error); setHasError(true); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { void fetchTestimonials(); }, [fetchTestimonials]);

  const services = useMemo(() => Array.from(new Set(testimonials.map((item) => item.treatment).filter(Boolean))).sort(), [testimonials]);
  const filteredTestimonials = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return testimonials.filter((item) => {
      const matchesQuery = !query || item.name.toLowerCase().includes(query) || item.quote.toLowerCase().includes(query) || item.treatment.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || (statusFilter === "published" && item.published) || (statusFilter === "draft" && !item.published);
      return matchesQuery && matchesStatus && (serviceFilter === "all" || item.treatment === serviceFilter);
    });
  }, [testimonials, searchQuery, statusFilter, serviceFilter]);
  const isFiltered = Boolean(searchQuery.trim()) || statusFilter !== "all" || serviceFilter !== "all";
  const clearFilters = () => { setSearchQuery(""); setStatusFilter("all"); setServiceFilter("all"); };
  const handleAddClick = () => { setEditingTestimonial(null); setFormMode("add"); };
  const handleEditClick = (item: Testimonial) => { setEditingTestimonial(item); setFormMode("edit"); };
  const handleFormClose = () => { setFormMode(null); setEditingTestimonial(null); };

  async function handleFormSubmit(values: TestimonialFormValues) {
    const isEdit = formMode === "edit" && editingTestimonial;
    const response = await fetch(isEdit ? `/api/admin/testimonials/${editingTestimonial.id}` : "/api/admin/testimonials", {
      method: isEdit ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to save testimonial.");
    handleFormClose();
    await fetchTestimonials();
  }

  async function handleTogglePublish(item: Testimonial) {
    try {
      const response = await fetch(`/api/admin/testimonials/${item.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: !item.published }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update status.");
      setTestimonials((current) => current.map((row) => row.id === item.id ? mapTestimonial(data.testimonial) : row));
    } catch (error) { console.error(error); alert(error instanceof Error ? error.message : "Failed to update testimonial status."); }
  }

  async function handleDeleteConfirm() {
    if (!deleting) return;
    try {
      const response = await fetch(`/api/admin/testimonials/${deleting.id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete testimonial.");
      setTestimonials((current) => current.filter((item) => item.id !== deleting.id));
      setDeleting(null);
    } catch (error) { console.error(error); alert(error instanceof Error ? error.message : "Failed to delete testimonial."); }
  }

  return <div className="flex flex-col gap-6">
    <TestimonialsHeader onAddClick={handleAddClick} />
    <TestimonialToolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} serviceFilter={serviceFilter} onServiceFilterChange={setServiceFilter} services={services} resultCount={filteredTestimonials.length} />
    <TestimonialList testimonials={filteredTestimonials} isLoading={isLoading} hasError={hasError} isFiltered={isFiltered} onRetry={fetchTestimonials} onAddClick={handleAddClick} onClearFilters={clearFilters} onView={setPreviewing} onEdit={handleEditClick} onTogglePublish={handleTogglePublish} onDelete={setDeleting} />
    <TestimonialPreview testimonial={previewing} onClose={() => setPreviewing(null)} />
    <TestimonialFormPanel key={`${formMode}-${editingTestimonial?.id ?? "new"}`} mode={formMode} initialValues={editingTestimonial ? toFormValues(editingTestimonial) : emptyFormValues} services={services} onClose={handleFormClose} onSubmit={handleFormSubmit} />
    <DeleteTestimonialDialog testimonial={deleting} onCancel={() => setDeleting(null)} onConfirm={handleDeleteConfirm} />
  </div>;
}
