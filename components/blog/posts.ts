import type { BlogPost } from "./types";

/**
 * Data-access layer for blog posts.
 *
 * No articles have been published yet, so these return empty results.
 * Do not add fabricated posts here to "fill" the page — once real content
 * exists, replace the bodies of these functions with a real fetch (e.g. a
 * MongoDB query), keeping the same function signatures and the BlogPost
 * shape from types.ts. No component outside this file should need to
 * change when that happens.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  return [];
}

export async function getFeaturedPost(): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts[0] ?? null;
}