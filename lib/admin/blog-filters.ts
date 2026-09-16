import type { BlogPost, BlogStatus } from "@/types/admin";

export type BlogStatusFilter = "all" | BlogStatus;

export interface BlogFilters {
  query: string;
  status: BlogStatusFilter;
  category: string;
}

export const ALL_CATEGORIES = "all";

/**
 * Pure, synchronous filtering over the in-memory mock list. When a real
 * search endpoint exists, this becomes `await searchBlogs(filters)` and
 * the page component doesn't need to change — it already treats
 * filtering as a discrete step over an already-fetched `posts` array.
 */
export function filterBlogPosts(posts: BlogPost[], filters: BlogFilters): BlogPost[] {
  const query = filters.query.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesStatus = filters.status === "all" || post.status === filters.status;
    const matchesCategory = filters.category === ALL_CATEGORIES || post.category === filters.category;
    const matchesQuery =
      query.length === 0 ||
      post.title.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query);

    return matchesStatus && matchesCategory && matchesQuery;
  });
}
