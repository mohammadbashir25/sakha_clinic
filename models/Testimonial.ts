import mongoose, { Schema, type Model } from "mongoose";

export const TESTIMONIAL_LOCALES = ["en", "fa", "ps"] as const;
export type TestimonialLocale = (typeof TESTIMONIAL_LOCALES)[number];

export interface ITestimonialTranslation {
  quote: string;
  treatment: string;
}
export interface ITestimonial {
  name: string;
  translations: Record<TestimonialLocale, ITestimonialTranslation>;
  rating: 1 | 2 | 3 | 4 | 5;
  published: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TranslationSchema = new Schema<ITestimonialTranslation>({
  quote: { type: String, required: true, trim: true },
  treatment: { type: String, required: true, trim: true },
}, { _id: false });

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  translations: {
    en: { type: TranslationSchema, required: true },
    fa: { type: TranslationSchema, required: true },
    ps: { type: TranslationSchema, required: true },
  },
  rating: { type: Number, enum: [1, 2, 3, 4, 5], default: 5 },
  published: { type: Boolean, default: false, index: true },
  date: { type: Date, required: true, default: Date.now },
}, { timestamps: true });

const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
export default Testimonial;
