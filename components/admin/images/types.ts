export type ImageFormMode = "add" | "edit" | null;

/** Fields the Add/Edit form collects. Mirrors MediaImage minus id. */
export interface ImageFormValues {
  url: string;
  filename: string;
  title: string;
  alt: string;
  category: string;
  description: string;
  uploadedAt: string;
}
