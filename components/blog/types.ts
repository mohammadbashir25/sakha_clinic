/**
 * Shared content shape for a blog post.
 *
 * This type is intentionally decoupled from any data source. Today it is
 * populated by the static/empty functions in `posts.ts`; later it can be
 * populated from MongoDB (or any other source) without changing a single
 * visual component — every component in components/blog/ only ever
 * imports this type, never a database client or query.
 */
export interface BlogAuthor {
  name: string;
  role?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: string;
  image: {
    label: string;
    alt: string;
  };
  author?: BlogAuthor;
  /** ISO date string. Only set when a real publish date exists. */
  publishedAt?: string;
  /** e.g. "6 min read". Only set when a real reading-time estimate exists. */
  readingTime?: string;
}