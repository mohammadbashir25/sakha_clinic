export type TestimonialStatusFilter = "all" | "published" | "draft";
export type TestimonialLocale = "en" | "fa" | "ps";
export interface TestimonialTranslationValues { quote: string; treatment: string; }
export interface TestimonialFormValues {
  name: string;
  translations: Record<TestimonialLocale, TestimonialTranslationValues>;
  rating: 1 | 2 | 3 | 4 | 5;
  published: boolean;
  date: string;
}
export const emptyTestimonialTranslations: Record<TestimonialLocale, TestimonialTranslationValues> = {
  en: { quote: "", treatment: "" },
  fa: { quote: "", treatment: "" },
  ps: { quote: "", treatment: "" },
};
export const testimonialLocaleLabels: Record<TestimonialLocale, string> = { en: "English", fa: "دری", ps: "پښتو" };
