"use client";

import { useRouter } from "next/navigation";
import { Reveal } from "@/components/admin/dashboard/Reveal";
import { BlogForm } from "@/components/admin/blog/BlogForm";
import { BlogFormHeader } from "@/components/admin/blog/BlogFormHeader";
import type { BlogFormValues } from "@/components/admin/blog/types";
import { blogCategories, mockImages } from "@/lib/mock/admin-data";
import { addBlogPost } from "@/lib/admin/blog-store";

const emptyValues: BlogFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  author: "",
  coverImage: "",
  coverImageAlt: "",
  status: "draft",
  date: new Date().toISOString().slice(0, 10),
};

/**
 * Frontend-only: submitting writes to the shared blog store (see
 * lib/admin/blog-store.ts) and returns to the list, where it shows up
 * immediately. Swap `addBlogPost` for a real API call once one exists.
 */
export default function AddBlogPage() {
  const router = useRouter();

  function handleSubmit(values: BlogFormValues) {
    addBlogPost(values);
    router.push("/admin/blogs");
  }

  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <BlogFormHeader
          title="Add blog post"
          description="Write a new article for the Sakha website."
        />
      </Reveal>

      <Reveal index={1}>
        <div className="overflow-hidden rounded-xl border border-muted/15 bg-white">
          <BlogForm
            initialValues={emptyValues}
            categories={blogCategories}
            images={mockImages}
            submitLabel="Create Blog"
            onSubmit={handleSubmit}
            onCancel={() => router.push("/admin/blogs")}
          />
        </div>
      </Reveal>
    </div>
  );
}
