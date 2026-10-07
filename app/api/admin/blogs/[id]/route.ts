import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { getAdminSession } from "@/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
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

    const existingBlog = await Blog.findById(id);

    if (!existingBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    const duplicateSlug = await Blog.findOne({
      slug,
      _id: { $ne: id },
    });

    if (duplicateSlug) {
      return NextResponse.json(
        {
          success: false,
          message: "Another blog already uses this slug",
        },
        { status: 409 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
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
            ? publishedAt || existingBlog.publishedAt || new Date()
            : undefined,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("PUT /api/admin/blogs/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update blog",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/admin/blogs/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete blog",
      },
      { status: 500 }
    );
  }
}