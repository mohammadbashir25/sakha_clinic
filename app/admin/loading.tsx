import {
  RecentBlogsSkeleton,
  RecentImagesSkeleton,
  StatsSkeleton,
} from "@/components/admin/dashboard/DashboardSkeletons";

export default function AdminDashboardLoading() {
  return (
    <div className="flex flex-col gap-10">
      <StatsSkeleton />
      <RecentBlogsSkeleton />
      <RecentImagesSkeleton />
    </div>
  );
}
