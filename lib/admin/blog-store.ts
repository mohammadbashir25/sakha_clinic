"use client";

import { useSyncExternalStore } from "react";
import type { BlogPost } from "@/types/admin";
import type { BlogFormValues } from "@/components/admin/blog/types";
import { mockBlogPosts } from "@/lib/mock/admin-data";

/**
 * Minimal in-memory store so /admin/blogs and the /admin/blogs/add and
 * /admin/blogs/edit/[id] routes see the same data — plain per-page
 * `useState(mockBlogPosts)` doesn't share across a client-side
 * navigation. Module state persists for the tab's session (not across
 * a hard refresh). Swap this file for real data-fetching once the API
 * exists; the pages that call these functions don't need to change.
 */
let posts: BlogPost[] = [...mockBlogPosts];
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return posts;
}

export function useBlogPosts(): BlogPost[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function getBlogPost(id: string): BlogPost | undefined {
  return posts.find((post) => post.id === id);
}

export function addBlogPost(values: BlogFormValues): BlogPost {
  const newPost: BlogPost = {
    id: crypto.randomUUID(),
    createdAt: values.date,
    updatedAt: values.date,
    ...values,
  };
  posts = [newPost, ...posts];
  emit();
  return newPost;
}

export function updateBlogPost(id: string, values: BlogFormValues): void {
  posts = posts.map((post) =>
    post.id === id
      ? { ...post, ...values, updatedAt: new Date().toISOString().slice(0, 10) }
      : post,
  );
  emit();
}

export function deleteBlogPost(id: string): void {
  posts = posts.filter((post) => post.id !== id);
  emit();
}
