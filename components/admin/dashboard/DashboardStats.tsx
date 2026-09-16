import { LuCircleDot, LuFileText, LuImages, LuPencilLine } from "react-icons/lu";
import type { IconType } from "react-icons";
import type { ContentStats } from "@/types/admin";
import { Reveal } from "./Reveal";

interface DashboardStatsProps {
  stats: ContentStats;
}

interface StatDefinition {
  label: string;
  value: number;
  context: string;
  icon: IconType;
}

/**
 * One bordered strip divided into four, rather than four separate
 * cards — these numbers are related, and boxing each one gives it more
 * visual weight than it deserves.
 */
export function DashboardStats({ stats }: DashboardStatsProps) {
  const items: StatDefinition[] = [
    { label: "Blog posts", value: stats.totalBlogs, context: "in the content library", icon: LuFileText },
    { label: "Published", value: stats.published, context: "live on the website", icon: LuCircleDot },
    { label: "Drafts", value: stats.drafts, context: "not yet published", icon: LuPencilLine },
    { label: "Images", value: stats.images, context: "in the media library", icon: LuImages },
  ];

  return (
    <Reveal index={1}>
      <dl className="grid grid-cols-2 overflow-hidden rounded-xl border border-muted/15 bg-white lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={[
                "flex flex-col gap-1 px-5 py-5 sm:px-6",
                // Interior rules only, so borders never double up.
                index % 2 === 1 ? "border-l border-muted/15" : "",
                index > 1 ? "border-t border-muted/15" : "",
                "lg:border-t-0",
                index > 0 ? "lg:border-l lg:border-muted/15" : "lg:border-l-0",
              ].join(" ")}
            >
              <dt className="flex items-center gap-2 text-sm font-medium text-muted">
                <Icon className="h-4 w-4 shrink-0 text-orchid/70" aria-hidden="true" />
                {item.label}
              </dt>
              <dd className="text-2xl font-semibold tabular-nums text-charcoal sm:text-[28px]">
                {item.value}
              </dd>
              <p className="text-xs text-muted">{item.context}</p>
            </div>
          );
        })}
      </dl>
    </Reveal>
  );
}
