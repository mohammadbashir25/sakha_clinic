import mongoose, { Schema, type Model } from "mongoose";

export const BLOG_LOCALES = ["en", "fa", "ps"] as const;
export type BlogLocale = (typeof BLOG_LOCALES)[number];

export interface IBlogTranslation {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  coverImageAlt: string;
}

export interface IBlog {
  slug: string;
  category: string;
  coverImage: string;
  status: "draft" | "published";
  translations: Record<BlogLocale, IBlogTranslation>;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TranslationSchema = new Schema<IBlogTranslation>(
  {
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    coverImageAlt: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const BlogSchema = new Schema<IBlog>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    category: { type: String, required: true, trim: true },
    coverImage: { type: String, required: true, trim: true },
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
    translations: {
      en: { type: TranslationSchema, required: true },
      fa: { type: TranslationSchema, required: true },
      ps: { type: TranslationSchema, required: true },
    },
    publishedAt: { type: Date },
  },
  { timestamps: true },
);

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
export default Blog;
