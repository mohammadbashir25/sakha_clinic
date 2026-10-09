"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import { Reveal } from "@/components/admin/dashboard/Reveal";
import { BlogForm } from "@/components/admin/blog/BlogForm";
import { BlogFormHeader } from "@/components/admin/blog/BlogFormHeader";
import { emptyBlogTranslations, type BlogFormValues } from "@/components/admin/blog/types";
import { blogCategories } from "@/lib/mock/admin-data";

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [values, setValues] = useState<BlogFormValues | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch(`/api/admin/blogs/${id}`).then(async (response) => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not load blog.");
      const blog = data.blog;
      const translations = { ...emptyBlogTranslations, ...(blog.translations ?? {}) };
      if (active) setValues({ translations, slug: blog.slug, category: blog.category, coverImage: blog.coverImage, status: blog.status, date: blog.publishedAt ? new Date(blog.publishedAt).toISOString().slice(0, 10) : new Date(blog.createdAt).toISOString().slice(0, 10) });
    }).catch((e) => { if (active) setError(e instanceof Error ? e.message : "Could not load blog."); });
    return () => { active = false; };
  }, [id]);

  async function handleSubmit(nextValues: BlogFormValues) {
    const response = await fetch(`/api/admin/blogs/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(nextValues) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to update blog.");
    router.push("/admin/blogs");
    router.refresh();
  }

  if (error) return <div className="rounded-xl border border-red-200 bg-white p-6 text-sm text-red-700">{error}</div>;
  if (!values) return <div className="rounded-xl border border-muted/15 bg-white p-6 text-sm text-muted">Loading blog…</div>;

  return <div className="flex flex-col gap-6"><Link href="/admin/blogs" className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted hover:text-charcoal"><LuArrowLeft className="h-4 w-4" aria-hidden="true" />Back to blogs</Link><Reveal><BlogFormHeader title="Edit blog post" description={`Editing “${values.translations.en.title}”. Update all three language versions here.`} /></Reveal><Reveal index={1}><div className="overflow-hidden rounded-xl border border-muted/15 bg-white"><BlogForm key={id} initialValues={values} categories={blogCategories} submitLabel="Save Changes" onSubmit={handleSubmit} onCancel={() => router.push("/admin/blogs")} /></div></Reveal></div>;
}
