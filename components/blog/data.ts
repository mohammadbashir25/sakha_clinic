import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
/**
 * Public blog data access. Published articles are read from MongoDB and their
 * English, Dari, or Pashto translation is selected at request time.
 */

export const BLOG_IMAGE_DIR = "/images/blog";

/** Existing appointment/contact route. Change if yours differs. */
export const APPOINTMENT_HREF = "/contact";

/** Stable internal category values. Labels come from BlogPage.categories.* */
export const BLOG_CATEGORIES = ["skin", "hair", "aesthetics", "laser", "general"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogLocale = "en" | "fa" | "ps";
/** What the UI components receive: already resolved to one language. */
export interface BlogPostView {
  slug: string;
  title: string;
  excerpt: string;
  /** Paragraphs separated by a blank line; a line starting with "## " is a heading. */
  content: string;
  category: BlogCategory;
  author?: string;
  coverImage?: string;
  coverImageAlt?: string;
  publishedAt: string; // ISO date
  updatedAt?: string; // ISO date
  readingMinutes: number;
}

function estimateReadingMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function toLocale(value: string): BlogLocale {
  return value === "fa" || value === "ps" ? value : "en";
}

const CATEGORY_ALIASES: Record<string, BlogCategory> = {
  skin: "skin",
  dermatology: "skin",
  hair: "hair",
  "hair restoration": "hair",
  "hair transplant": "hair",
  aesthetics: "aesthetics",
  beauty: "aesthetics",
  "medical aesthetics": "aesthetics",
  laser: "laser",
};

/** Maps a free-text DB category (schema uses a plain string) to a stable slug. */
export function toCategorySlug(value: string): BlogCategory {
  return CATEGORY_ALIASES[value.trim().toLowerCase()] ?? "general";
}

type BlogTranslation = {
  title?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  coverImageAlt?: string;
};

type BlogRecord = {
  slug?: string;
  category?: string;
  coverImage?: string;
  status?: string;
  publishedAt?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  title?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  coverImageAlt?: string;
  translations?: Partial<Record<BlogLocale, BlogTranslation>>;
};

/** Published posts in the requested language, loaded from MongoDB. */
export async function getPublishedPosts(locale: string): Promise<BlogPostView[]> {
  await connectDB();
  const selectedLocale = toLocale(locale);
  const docs = await Blog.find({ status: "published" }).sort({ publishedAt: -1, createdAt: -1 }).lean();
  const posts = (docs as unknown as BlogRecord[]).map((doc): BlogPostView | null => {
    const legacy = doc.title ? { title: doc.title, excerpt: doc.excerpt ?? "", content: doc.content ?? "", author: doc.author ?? "", coverImageAlt: doc.coverImageAlt ?? doc.title } : null;
    const translated = doc.translations?.[selectedLocale] ?? doc.translations?.en ?? legacy;
    if (!translated?.title || !translated?.content) return null;
    const content = String(translated.content);
    return {
      slug: String(doc.slug),
      title: String(translated.title),
      excerpt: String(translated.excerpt ?? ""),
      content,
      category: toCategorySlug(String(doc.category ?? "general")),
      author: String(translated.author ?? ""),
      coverImage: String(doc.coverImage ?? ""),
      coverImageAlt: String(translated.coverImageAlt ?? translated.title),
      publishedAt: new Date(doc.publishedAt ?? doc.createdAt ?? new Date()).toISOString(),
      updatedAt: new Date(doc.updatedAt ?? doc.createdAt ?? doc.publishedAt ?? new Date()).toISOString(),
      readingMinutes: estimateReadingMinutes(content),
    };
  });
  return posts.filter((post): post is BlogPostView => post !== null);
}

export async function getPostBySlug(slug: string, locale: string): Promise<BlogPostView | null> {
  await connectDB();
  const doc = (await Blog.findOne({ slug, status: "published" }).lean()) as unknown as BlogRecord | null;
  if (!doc) return null;
  const selectedLocale = toLocale(locale);
  const legacy = doc.title ? { title: doc.title, excerpt: doc.excerpt ?? "", content: doc.content ?? "", author: doc.author ?? "", coverImageAlt: doc.coverImageAlt ?? doc.title } : null;
  const translated = doc.translations?.[selectedLocale] ?? doc.translations?.en ?? legacy;
  if (!translated?.title || !translated?.content) return null;
  const content = String(translated.content);
  return {
    slug: String(doc.slug),
    title: String(translated.title),
    excerpt: String(translated.excerpt ?? ""),
    content,
    category: toCategorySlug(String(doc.category ?? "general")),
    author: String(translated.author ?? ""),
    coverImage: String(doc.coverImage ?? ""),
    coverImageAlt: String(translated.coverImageAlt ?? translated.title),
    publishedAt: new Date(doc.publishedAt ?? doc.createdAt ?? new Date()).toISOString(),
    updatedAt: new Date(doc.updatedAt ?? doc.createdAt ?? doc.publishedAt ?? new Date()).toISOString(),
    readingMinutes: estimateReadingMinutes(content),
  };
}

/** Same-category posts first, then the newest others. Never includes the post itself. */
export async function getRelatedPosts(post: BlogPostView, locale: string, limit = 3): Promise<BlogPostView[]> {
  const all = await getPublishedPosts(locale);
  const others = all.filter((item) => item.slug !== post.slug);
  const same = others.filter((item) => item.category === post.category);
  const rest = others.filter((item) => item.category !== post.category);
  return [...same, ...rest].slice(0, limit);
}

/** previous = the next older article, next = the next newer one. */
export async function getAdjacentPosts(slug: string, locale: string) {
  const all = await getPublishedPosts(locale);
  const i = all.findIndex((item) => item.slug === slug);
  if (i === -1) return { previous: null, next: null };
  return { previous: all[i + 1] ?? null, next: all[i - 1] ?? null };
}
