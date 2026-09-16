"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/admin/dashboard/Reveal";
import { Pagination } from "@/components/admin/shared/Pagination";
import { BlogEmptyState } from "@/components/admin/blog/BlogEmptyState";
import { BlogMobileList } from "@/components/admin/blog/BlogMobileList";
import { BlogTable } from "@/components/admin/blog/BlogTable";
import { BlogToolbar } from "@/components/admin/blog/BlogToolbar";
import { BlogsHeader } from "@/components/admin/blog/BlogsHeader";
import { DeleteBlogDialog } from "@/components/admin/blog/DeleteBlogDialog";
import { filterBlogPosts, type BlogStatusFilter, ALL_CATEGORIES } from "@/lib/admin/blog-filters";
import { blogCategories, mockBlogPosts } from "@/lib/mock/admin-data";
import type { BlogPost } from "@/types/admin";

const PAGE_SIZE = 6;

/**
 * All state here is frontend-only: `posts` starts from the mock array
 * and deleting removes it from that state, nothing more. When a real
 * API exists, replace `posts`/`setPosts` with a data hook and swap
 * `handleConfirmDelete` for a call to `deleteBlog(id)` — the rest of
 * this component doesn't need to change.
 */
export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<BlogStatusFilter>("all");
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  const filteredPosts = useMemo(
    () => filterBlogPosts(posts, { query, status, category }),
    [posts, query, status, category],
  );

  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
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

  function handleConfirmDelete(post: BlogPost) {
    setPosts((current) => current.filter((item) => item.id !== post.id));
    setDeleteTarget(null);
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
        {!hasAnyPosts ? (
          <BlogEmptyState variant="no-posts" />
        ) : !hasVisiblePosts ? (
          <BlogEmptyState variant="no-results" />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="hidden md:block">
              <BlogTable posts={visiblePosts} onDeleteRequest={setDeleteTarget} />
            </div>
            <div className="md:hidden">
              <BlogMobileList posts={visiblePosts} onDeleteRequest={setDeleteTarget} />
            </div>

            <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} />
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
