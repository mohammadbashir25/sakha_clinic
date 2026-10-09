"use client";

import { useRouter } from "next/navigation";
import { Reveal } from "@/components/admin/dashboard/Reveal";
import { BlogForm } from "@/components/admin/blog/BlogForm";
import { BlogFormHeader } from "@/components/admin/blog/BlogFormHeader";
import { emptyBlogTranslations, type BlogFormValues } from "@/components/admin/blog/types";
import { blogCategories } from "@/lib/mock/admin-data";

const emptyValues: BlogFormValues = {
  translations: emptyBlogTranslations,
  slug: "",
  category: "",
  coverImage: "",
  status: "draft",
  date: new Date().toISOString().slice(0, 10),
};

export default function AddBlogPage() {
  const router = useRouter();
  async function handleSubmit(values: BlogFormValues) {
    const response = await fetch("/api/admin/blogs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to create blog.");
    router.push("/admin/blogs");
    router.refresh();
  }
  return <div className="flex flex-col gap-6"><Reveal><BlogFormHeader title="Add blog post" description="Write a new article in English, Dari, and Pashto." /></Reveal><Reveal index={1}><div className="overflow-hidden rounded-xl border border-muted/15 bg-white"><BlogForm initialValues={emptyValues} categories={blogCategories} submitLabel="Create Blog" onSubmit={handleSubmit} onCancel={() => router.push("/admin/blogs")} /></div></Reveal></div>;
}
