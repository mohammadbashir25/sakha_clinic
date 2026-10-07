export type BlogFormMode = "add" | "edit" | null;

/**
 * Fields the Add/Edit form collects. Mirrors BlogPost minus id/createdAt/updatedAt.
 * Note: `content` isn't on the current BlogPost type in types/admin.ts yet — see
 * the note where this form is wired up.
 */
export interface BlogFormValues {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  coverImage: string;
  coverImageAlt: string;
  status: "published" | "draft";
  date: string;
}
