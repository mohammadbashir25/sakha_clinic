import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog, { BLOG_LOCALES } from "@/models/Blog";
import { getAdminSession } from "@/lib/auth";

 type RouteContext = { params: Promise<{ id: string }> };

function serializeBlog(doc: any) {
  const translations = doc.translations ?? { en: { title: doc.title ?? "", excerpt: doc.excerpt ?? "", content: doc.content ?? "", author: doc.author ?? "", coverImageAlt: doc.coverImageAlt ?? "" }, fa: { title: "", excerpt: "", content: "", author: "", coverImageAlt: "" }, ps: { title: "", excerpt: "", content: "", author: "", coverImageAlt: "" } };
  const en = translations.en ?? {};
  return {
    id: String(doc._id), slug: doc.slug, category: doc.category, coverImage: doc.coverImage,
    status: doc.status, publishedAt: doc.publishedAt ?? null, createdAt: doc.createdAt,
    updatedAt: doc.updatedAt, translations,
    title: en.title ?? doc.title ?? "", excerpt: en.excerpt ?? doc.excerpt ?? "",
    content: en.content ?? doc.content ?? "", author: en.author ?? doc.author ?? "",
    coverImageAlt: en.coverImageAlt ?? doc.coverImageAlt ?? "", date: doc.publishedAt ?? doc.createdAt,
  };
}

function validateBody(body: any) {
  if (!body || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(body.slug ?? ""))) return "Enter a valid lowercase English slug.";
  if (!String(body.category ?? "").trim() || !String(body.coverImage ?? "").trim()) return "Category and cover image are required.";
  for (const locale of BLOG_LOCALES) {
    const t = body.translations?.[locale];
    if (!t || !["title", "excerpt", "content", "author", "coverImageAlt"].every((key) => String(t[key] ?? "").trim())) {
      return `Complete all required fields for ${locale === "en" ? "English" : locale === "fa" ? "Dari" : "Pashto"}.`;
    }
  }
  if (body.status !== undefined && !["draft", "published"].includes(body.status)) return "Invalid blog status.";
  return null;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    if (!(await getAdminSession())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    await connectDB();
    const blog = await Blog.findById(id).lean();
    if (!blog) return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    return NextResponse.json({ success: true, blog: serializeBlog(blog) });
  } catch (error) {
    console.error("GET /api/admin/blogs/[id] error:", error);
    return NextResponse.json({ message: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    if (!(await getAdminSession())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    const body = await request.json();
    const validationError = validateBody(body);
    if (validationError) return NextResponse.json({ success: false, message: validationError }, { status: 400 });
    await connectDB();
    const duplicate = await Blog.findOne({ slug: String(body.slug).trim().toLowerCase(), _id: { $ne: id } });
    if (duplicate) return NextResponse.json({ message: "Another blog already uses this slug." }, { status: 409 });
    const existing = await Blog.findById(id);
    if (!existing) return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    const status = body.status === "published" ? "published" : "draft";
    existing.slug = String(body.slug).trim().toLowerCase();
    existing.category = String(body.category).trim();
    existing.coverImage = String(body.coverImage).trim();
    existing.translations = body.translations;
    existing.status = status;
    existing.publishedAt = status === "published" ? (body.date ? new Date(body.date) : existing.publishedAt ?? new Date()) : undefined;
    await existing.save();
    return NextResponse.json({ success: true, message: "Blog updated successfully", blog: serializeBlog(existing.toObject()) });
  } catch (error) {
    console.error("PUT /api/admin/blogs/[id] error:", error);
    return NextResponse.json({ message: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    if (!(await getAdminSession())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    await connectDB();
    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/admin/blogs/[id] error:", error);
    return NextResponse.json({ message: "Failed to delete blog" }, { status: 500 });
  }
}
