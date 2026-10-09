import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog, { BLOG_LOCALES } from "@/models/Blog";
import { getAdminSession } from "@/lib/auth";

function serializeBlog(doc: any) {
  const translations = doc.translations ?? { en: { title: doc.title ?? "", excerpt: doc.excerpt ?? "", content: doc.content ?? "", author: doc.author ?? "", coverImageAlt: doc.coverImageAlt ?? "" }, fa: { title: "", excerpt: "", content: "", author: "", coverImageAlt: "" }, ps: { title: "", excerpt: "", content: "", author: "", coverImageAlt: "" } };
  const en = translations.en ?? {};
  return {
    id: String(doc._id),
    slug: doc.slug,
    category: doc.category,
    coverImage: doc.coverImage,
    status: doc.status,
    publishedAt: doc.publishedAt ?? null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    translations,
    // Keep these English aliases for existing list/table components.
    title: en.title ?? doc.title ?? "",
    excerpt: en.excerpt ?? doc.excerpt ?? "",
    content: en.content ?? doc.content ?? "",
    author: en.author ?? doc.author ?? "",
    coverImageAlt: en.coverImageAlt ?? doc.coverImageAlt ?? "",
    date: doc.publishedAt ?? doc.createdAt,
  };
}

function validateBody(body: any) {
  if (!body || typeof body !== "object") return "A valid JSON object is required.";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(body.slug ?? ""))) {
    return "Slug must contain lowercase English letters, numbers, and hyphens only.";
  }
  if (!String(body.category ?? "").trim()) return "Category is required.";
  if (!String(body.coverImage ?? "").trim()) return "A cover image is required.";
  if (!body.translations || typeof body.translations !== "object") return "Translations are required.";
  for (const locale of BLOG_LOCALES) {
    const t = body.translations[locale];
    if (!t || !["title", "excerpt", "content", "author", "coverImageAlt"].every((key) => String(t[key] ?? "").trim())) {
      return `Complete all required fields for ${locale === "en" ? "English" : locale === "fa" ? "Dari" : "Pashto"}.`;
    }
  }
  if (body.status !== undefined && !["draft", "published"].includes(body.status)) return "Invalid blog status.";
  return null;
}

export async function GET() {
  try {
    if (!(await getAdminSession())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, blogs: blogs.map(serializeBlog) });
  } catch (error) {
    console.error("GET /api/admin/blogs error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await getAdminSession())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    const validationError = validateBody(body);
    if (validationError) return NextResponse.json({ success: false, message: validationError }, { status: 400 });

    await connectDB();
    const slug = String(body.slug).trim().toLowerCase();
    if (await Blog.exists({ slug })) return NextResponse.json({ success: false, message: "A blog with this slug already exists." }, { status: 409 });

    const status = body.status === "published" ? "published" : "draft";
    const blog = await Blog.create({
      slug,
      category: String(body.category).trim(),
      coverImage: String(body.coverImage).trim(),
      translations: body.translations,
      status,
      publishedAt: status === "published" ? (body.date ? new Date(body.date) : new Date()) : undefined,
    });
    return NextResponse.json({ success: true, message: "Blog created successfully", blog: serializeBlog(blog.toObject()) }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/blogs error:", error);
    return NextResponse.json({ success: false, message: "Failed to create blog" }, { status: 500 });
  }
}
