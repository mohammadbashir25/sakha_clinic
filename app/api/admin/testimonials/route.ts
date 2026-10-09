import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial, { TESTIMONIAL_LOCALES } from "@/models/Testimonial";
import { getAdminSession } from "@/lib/auth";

function serialize(doc: any) {
  const en = doc.translations?.en ?? {};
  return { id: String(doc._id), name: doc.name, quote: en.quote ?? doc.quote ?? "", treatment: en.treatment ?? doc.treatment ?? "", translations: doc.translations, rating: doc.rating, published: doc.published, date: doc.date ?? doc.createdAt, createdAt: doc.createdAt, updatedAt: doc.updatedAt };
}
function validate(body: any) {
  if (!body || !String(body.name ?? "").trim()) return "Name is required.";
  if (!Number.isInteger(body.rating) || body.rating < 1 || body.rating > 5) return "Rating must be between 1 and 5.";
  if (typeof body.published !== "boolean") return "Choose whether this testimonial should be published.";
  if (!body.date || Number.isNaN(new Date(body.date).getTime())) return "A valid date is required.";
  for (const locale of TESTIMONIAL_LOCALES) {
    const t = body.translations?.[locale];
    if (!t || !String(t.quote ?? "").trim() || !String(t.treatment ?? "").trim()) return `Complete the testimonial text and service for ${locale === "en" ? "English" : locale === "fa" ? "Dari" : "Pashto"}.`;
  }
  return null;
}

export async function GET() {
  try {
    if (!(await getAdminSession())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await connectDB();
    const docs = await Testimonial.find().sort({ date: -1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, testimonials: docs.map(serialize) });
  } catch (error) {
    console.error("GET /api/admin/testimonials error:", error);
    return NextResponse.json({ message: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await getAdminSession())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    const error = validate(body);
    if (error) return NextResponse.json({ message: error }, { status: 400 });
    await connectDB();
    const doc = await Testimonial.create({ name: String(body.name).trim(), translations: body.translations, rating: body.rating, published: body.published, date: new Date(body.date) });
    return NextResponse.json({ success: true, message: "Testimonial created", testimonial: serialize(doc.toObject()) }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/testimonials error:", error);
    return NextResponse.json({ message: "Failed to create testimonial" }, { status: 500 });
  }
}
