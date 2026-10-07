"use client";

import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/admin/dashboard/Reveal";
import { Pagination } from "@/components/admin/shared/Pagination";
import { BlogEmptyState } from "@/components/admin/blog/BlogEmptyState";
import { BlogMobileList } from "@/components/admin/blog/BlogMobileList";
import { BlogTable } from "@/components/admin/blog/BlogTable";
import { BlogToolbar } from "@/components/admin/blog/BlogToolbar";
import { BlogsHeader } from "@/components/admin/blog/BlogsHeader";
import { DeleteBlogDialog } from "@/components/admin/blog/DeleteBlogDialog";
import {
  filterBlogPosts,
  type BlogStatusFilter,
  ALL_CATEGORIES,
} from "@/lib/admin/blog-filters";
import { blogCategories } from "@/lib/mock/admin-data";
import type { BlogPost } from "@/types/admin";

const PAGE_SIZE = 6;

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<BlogStatusFilter>("all");
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("/api/admin/blogs");

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();

        setPosts(data.blogs ?? []);
      } catch (error) {
        console.error("Failed to load blogs:", error);
        setError("Failed to load blogs.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const filteredPosts = useMemo(
    () => filterBlogPosts(posts, { query, status, category }),
    [posts, query, status, category],
  );

  const pageCount = Math.max(
    1,
    Math.ceil(filteredPosts.length / PAGE_SIZE),
  );

  const currentPage = Math.min(page, pageCount);

  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function updateFilter<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);
      setPage(1);
    };
  }

  async function handleConfirmDelete(post: BlogPost) {
    try {
      const response = await fetch(`/api/admin/blogs/${post.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete blog");
      }

      setPosts((current) =>
        current.filter((item) => item.id !== post.id),
      );

      setDeleteTarget(null);
    } catch (error) {
      console.error("Failed to delete blog:", error);
      alert("Failed to delete blog.");
    }
  }

  const hasAnyPosts = posts.length > 0;
  const hasVisiblePosts = visiblePosts.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <BlogsHeader />
      </Reveal>

      <Reveal index={1}>
        <BlogToolbar
          query={query}
          onQueryChange={updateFilter(setQuery)}
          status={status}
          onStatusChange={updateFilter(setStatus)}
          category={category}
          onCategoryChange={updateFilter(setCategory)}
          categories={blogCategories}
        />
      </Reveal>

      <Reveal index={2}>
        {isLoading ? (
          <div className="rounded-xl border border-muted/15 bg-white p-8 text-center">
            <p className="text-sm text-muted">Loading blogs...</p>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-white p-8 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        ) : !hasAnyPosts ? (
          <BlogEmptyState variant="no-posts" />
        ) : !hasVisiblePosts ? (
          <BlogEmptyState variant="no-results" />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="hidden md:block">
              <BlogTable
                posts={visiblePosts}
                onDeleteRequest={setDeleteTarget}
              />
            </div>

            <div className="md:hidden">
              <BlogMobileList
                posts={visiblePosts}
                onDeleteRequest={setDeleteTarget}
              />
            </div>

            <Pagination
              page={currentPage}
              pageCount={pageCount}
              onPageChange={setPage}
            />
          </div>
        )}
      </Reveal>

      <DeleteBlogDialog
        post={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}