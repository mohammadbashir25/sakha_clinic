"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import { Reveal } from "@/components/admin/dashboard/Reveal";
import { BlogForm } from "@/components/admin/blog/BlogForm";
import { BlogFormHeader } from "@/components/admin/blog/BlogFormHeader";
import type { BlogFormValues } from "@/components/admin/blog/types";
import { blogCategories, mockImages } from "@/lib/mock/admin-data";
import { useBlogPosts, updateBlogPost } from "@/lib/admin/blog-store";

/**
 * Frontend-only: reads the post from the shared blog store by id (see
 * lib/admin/blog-store.ts) and writes changes back to it on submit.
 * Swap `updateBlogPost` for a real API call once one exists.
 */
export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const posts = useBlogPosts();
  const post = posts.find((item) => item.id === id);

  if (!post) {
    return (
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/blogs"
          className="inline-flex w-fit items-center gap-1.5 rounded text-sm font-medium text-muted transition-colors duration-200 hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid"
        >
          <LuArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to blogs
        </Link>
        <p className="text-sm text-muted">This blog post couldn&rsquo;t be found.</p>
      </div>
    );
  }

  const initialValues: BlogFormValues = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content ?? "",
    category: post.category,
    author: post.author,
    coverImage: post.coverImage,
    coverImageAlt: post.coverImageAlt,
    status: post.status,
    date: post.date,
  };

  function handleSubmit(values: BlogFormValues) {
    updateBlogPost(post!.id, values);
    router.push("/admin/blogs");
  }

  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <BlogFormHeader title="Edit blog post" description={`Editing "${post.title}".`} />
      </Reveal>

      <Reveal index={1}>
        <div className="overflow-hidden rounded-xl border border-muted/15 bg-white">
          <BlogForm
            key={post.id}
            initialValues={initialValues}
            categories={blogCategories}
            images={mockImages}
            submitLabel="Save Changes"
            onSubmit={handleSubmit}
            onCancel={() => router.push("/admin/blogs")}
          />
        </div>
      </Reveal>
    </div>
  );
}