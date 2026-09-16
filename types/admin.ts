export type BlogStatus = "published" | "draft";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  status: BlogStatus;
  createdAt: string;
  updatedAt: string
  /** ISO date — published date when published, created date when draft. */
  date: string;
  coverImage: string;
  coverImageAlt: string;
}

export interface MediaImage {
  id: string;
  title: string;
  category: string;
  url: string;
  alt: string;
  uploadedAt: string;
  filename: string;
  description: string
}

export interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  published: boolean;
  date: string;
}

export interface ContentStats {
  totalBlogs: number;
  published: number;
  drafts: number;
  images: number;
}



