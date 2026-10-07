import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("GET /api/admin/blogs error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    const {
      title,
      slug,
      excerpt,
      content,
      category,
      author,
      coverImage,
      coverImageAlt,
      status,
      publishedAt,
    } = body;

    if (
      !title ||
      !slug ||
      !excerpt ||
      !content ||
      !category ||
      !author ||
      !coverImage ||
      !coverImageAlt
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields must be provided",
        },
        { status: 400 }
      );
    }

    const existingBlog = await Blog.findOne({ slug });

    if (existingBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "A blog with this slug already exists",
        },
        { status: 409 }
      );
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      category,
      author,
      coverImage,
      coverImageAlt,
      status: status || "draft",
      publishedAt:
        status === "published"
          ? publishedAt || new Date()
          : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        blog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/blogs error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create blog",
      },
      { status: 500 }
    );
  }
}