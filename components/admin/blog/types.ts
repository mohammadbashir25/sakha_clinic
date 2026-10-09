export type BlogFormMode = "add" | "edit" | null;
export type ContentLocale = "en" | "fa" | "ps";

export interface BlogTranslationValues {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  coverImageAlt: string;
}

export interface BlogFormValues {
  translations: Record<ContentLocale, BlogTranslationValues>;
  slug: string;
  category: string;
  coverImage: string;
  status: "published" | "draft";
  date: string;
}

export const emptyBlogTranslations: Record<ContentLocale, BlogTranslationValues> = {
  en: { title: "", excerpt: "", content: "", author: "Dr. Ahmad Fahim Sakha", coverImageAlt: "" },
  fa: { title: "", excerpt: "", content: "", author: "داکتر احمد فهیم سخا", coverImageAlt: "" },
  ps: { title: "", excerpt: "", content: "", author: "ډاکټر احمد فهیم سخا", coverImageAlt: "" },
};

export const localeLabels: Record<ContentLocale, string> = {
  en: "English",
  fa: "دری",
  ps: "پښتو",
};
