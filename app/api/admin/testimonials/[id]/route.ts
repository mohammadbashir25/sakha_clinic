import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial, { TESTIMONIAL_LOCALES } from "@/models/Testimonial";
import { getAdminSession } from "@/lib/auth";

 type RouteContext = { params: Promise<{ id: string }> };
function serialize(doc: any) { const en = doc.translations?.en ?? {}; return { id: String(doc._id), name: doc.name, quote: en.quote ?? "", treatment: en.treatment ?? "", translations: doc.translations, rating: doc.rating, published: doc.published, date: doc.date ?? doc.createdAt, createdAt: doc.createdAt, updatedAt: doc.updatedAt }; }
function validate(body: any) {
  if (!body || !String(body.name ?? "").trim()) return "Name is required.";
  if (!Number.isInteger(body.rating) || body.rating < 1 || body.rating > 5) return "Rating must be between 1 and 5.";
  if (typeof body.published !== "boolean") return "Choose a publication status.";
  if (!body.date || Number.isNaN(new Date(body.date).getTime())) return "A valid date is required.";
  for (const locale of TESTIMONIAL_LOCALES) { const t = body.translations?.[locale]; if (!t || !String(t.quote ?? "").trim() || !String(t.treatment ?? "").trim()) return `Complete the testimonial text and service for ${locale === "en" ? "English" : locale === "fa" ? "Dari" : "Pashto"}.`; }
  return null;
}
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    if (!(await getAdminSession())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ message: "Invalid testimonial ID" }, { status: 400 });
    const body = await request.json(); const error = validate(body);
    if (error) return NextResponse.json({ message: error }, { status: 400 });
    await connectDB();
    const doc = await Testimonial.findById(id);
    if (!doc) return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    doc.name = String(body.name).trim();
    doc.translations = body.translations;
    doc.rating = body.rating; doc.published = body.published; doc.date = new Date(body.date);
    await doc.save();
    return NextResponse.json({ success: true, message: "Testimonial updated", testimonial: serialize(doc.toObject()) });
  } catch (error) { console.error("PUT /api/admin/testimonials/[id] error:", error); return NextResponse.json({ message: "Failed to update testimonial" }, { status: 500 }); }
}
export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    if (!(await getAdminSession())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ message: "Invalid testimonial ID" }, { status: 400 });
    await connectDB(); const doc = await Testimonial.findByIdAndDelete(id);
    if (!doc) return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Testimonial deleted" });
  } catch (error) { console.error("DELETE /api/admin/testimonials/[id] error:", error); return NextResponse.json({ message: "Failed to delete testimonial" }, { status: 500 }); }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    if (!(await getAdminSession())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ message: "Invalid testimonial ID" }, { status: 400 });
    const body = await request.json();
    if (typeof body.published !== "boolean") return NextResponse.json({ message: "A valid published value is required." }, { status: 400 });
    await connectDB();
    const doc = await Testimonial.findByIdAndUpdate(id, { published: body.published }, { new: true, runValidators: true });
    if (!doc) return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    return NextResponse.json({ success: true, testimonial: serialize(doc.toObject()) });
  } catch (error) {
    console.error("PATCH /api/admin/testimonials/[id] error:", error);
    return NextResponse.json({ message: "Failed to change testimonial status" }, { status: 500 });
  }
}
