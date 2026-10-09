import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Testimonial from "@/models/Testimonial";
import type { BlogPost } from "@/types/admin";
import { DashboardWelcome } from "@/components/admin/dashboard/DashboardWelcome";
import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { RecentBlogs } from "@/components/admin/dashboard/RecentBlogs";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let stats = { totalBlogs: 0, published: 0, drafts: 0, testimonials: 0 };
  let recentPosts: BlogPost[] = [];
  let databaseError = false;

  try {
    await connectDB();
    const [totalBlogs, published, drafts, testimonials, recent] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ status: "published" }),
      Blog.countDocuments({ status: "draft" }),
      Testimonial.countDocuments(),
      Blog.find().sort({ updatedAt: -1, createdAt: -1 }).limit(5).lean(),
    ]);

    stats = { totalBlogs, published, drafts, testimonials };
    recentPosts = recent.map((doc) => {
      const translation = doc.translations?.en;
      const date = doc.publishedAt ?? doc.createdAt ?? doc.updatedAt ?? new Date();
      return {
        id: String(doc._id),
        title: String(translation?.title ?? doc.slug ?? "Untitled post"),
        slug: String(doc.slug ?? ""),
        excerpt: String(translation?.excerpt ?? ""),
        content: String(translation?.content ?? ""),
        category: String(doc.category ?? "General"),
        author: String(translation?.author ?? ""),
        status: doc.status === "published" ? "published" : "draft",
        createdAt: new Date(doc.createdAt ?? date).toISOString(),
        updatedAt: new Date(doc.updatedAt ?? date).toISOString(),
        date: new Date(date).toISOString(),
        coverImage: String(doc.coverImage ?? ""),
        coverImageAlt: String(translation?.coverImageAlt ?? translation?.title ?? doc.slug ?? "Blog cover"),
      } satisfies BlogPost;
    });
  } catch (error) {
    console.error("Admin dashboard data load failed:", error);
    databaseError = true;
  }

  return (
    <div className="flex flex-col gap-10">
      <DashboardWelcome />
      {databaseError && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          Live dashboard data could not be loaded. Check the MongoDB connection and environment variables; the counts below are not a reliable snapshot until the connection is restored.
        </div>
      )}
      <DashboardStats stats={stats} />
      <RecentBlogs posts={recentPosts} />
    </div>
  );
}
