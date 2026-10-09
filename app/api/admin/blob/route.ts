import { handleUpload } from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    // Only a signed-in administrator can request a client upload token.
    if (!(await getAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Restrict uploads to this feature and keep user-provided filenames safe.
        if (!pathname.startsWith("blog-covers/")) {
          throw new Error("Invalid upload path.");
        }

        return {
          allowedContentTypes: ALLOWED_IMAGE_TYPES,
          maximumSizeInBytes: MAX_IMAGE_SIZE,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // The client stores the returned Blob URL in the blog document.
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("POST /api/admin/blob error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Image upload failed." },
      { status: 400 },
    );
  }
}
