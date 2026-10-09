import connectDB from "@/lib/mongodb";
import type { Locale } from "@/i18n/config";
import Testimonial from "@/models/Testimonial";
import type { Testimonial as PublicTestimonial } from "./types";

/** Fetch only approved testimonials and select the visitor's language. */
export async function getTestimonials(locale: Locale): Promise<PublicTestimonial[]> {
  await connectDB();
  const docs = await Testimonial.find({ published: true }).sort({ date: -1, createdAt: -1 }).lean();
  return docs.map((doc: any) => {
    const translated = doc.translations?.[locale] ?? doc.translations?.en;
    return {
      id: String(doc._id),
      name: doc.name,
      content: translated?.quote ?? "",
      treatment: translated?.treatment ?? undefined,
    };
  }).filter((item) => item.content.trim().length > 0);
}
