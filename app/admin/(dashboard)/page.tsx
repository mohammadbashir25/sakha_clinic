import { DashboardWelcome } from "@/components/admin/dashboard/DashboardWelcome";
import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { MockDataNotice } from "@/components/admin/dashboard/MockDataNotice";
import { QuickActions } from "@/components/admin/dashboard/QuickActions ";
import { RecentBlogs } from "@/components/admin/dashboard/RecentBlogs";
import { RecentImages } from "@/components/admin/dashboard/RecentImages";
import { mockStats, recentBlogPosts, recentImages } from "@/lib/mock/admin-data";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      <DashboardWelcome />

      <MockDataNotice />

      <DashboardStats stats={mockStats} />
      <RecentBlogs posts={recentBlogPosts} />
      <RecentImages images={recentImages} />

      <QuickActions />
    </div>
  );
}
