import Link from "next/link";
import { LuPencilLine, LuPlus } from "react-icons/lu";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatAdminDate } from "@/lib/admin/format";
import type { BlogPost } from "@/types/admin";
import { MediaThumb } from "./MediaThumb";
import { Reveal } from "./Reveal";
import { SectionShell } from "./SectionShell";

interface RecentBlogsProps {
  posts: BlogPost[];
}

export function RecentBlogs({ posts }: RecentBlogsProps) {
  const hasPosts = posts.length > 0;

  return (
    <Reveal index={2}>
      <SectionShell
        title="Recent blog posts"
        actionLabel={hasPosts ? "View all blogs" : undefined}
        actionHref={hasPosts ? "/admin/blogs" : undefined}
      >
        {hasPosts ? <BlogList posts={posts} /> : <EmptyBlogs />}
      </SectionShell>
    </Reveal>
  );
}

function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <ul className="divide-y divide-muted/15 overflow-hidden rounded-xl border border-muted/15 bg-white">
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex items-start gap-4 px-4 py-4 transition-colors duration-200 hover:bg-lavender/30 sm:items-center sm:px-5"
        >
          <MediaThumb
            src={post.coverImage}
            alt={post.coverImageAlt}
            sizes="80px"
            className="h-12 w-16 shrink-0 rounded-lg sm:h-14 sm:w-20"
          />

          <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
            <div className="min-w-0 flex-1">
              <Link
                href={`/admin/blogs/edit/${post.id}`}
                className="rounded text-sm font-medium leading-snug text-charcoal transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory sm:line-clamp-1"
              >
                {post.title}
              </Link>
              <p className="mt-0.5 text-xs text-muted">{post.category}</p>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 sm:shrink-0">
              <StatusBadge status={post.status} />
              <time dateTime={post.date} className="text-xs tabular-nums text-muted sm:w-24">
                {formatAdminDate(post.date)}
              </time>
            </div>
          </div>

          <Link
            href={`/admin/blogs/edit/${post.id}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-primary transition-colors duration-200 hover:bg-lavender focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            <LuPencilLine className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Edit</span>
            <span className="sr-only">{post.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function StatusBadge({ status }: { status: BlogPost["status"] }) {
  // Uses the existing Badge variants rather than overriding colours.
  return status === "published" ? <Badge>Published</Badge> : <Badge variant="outline">Draft</Badge>;
}

function EmptyBlogs() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-muted/25 bg-white px-6 py-12 text-center">
      <p className="text-base font-medium text-charcoal">No blog posts yet</p>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted">
        Create your first article to start building Sakha&rsquo;s content library.
      </p>
      <Button href="/admin/blogs/add" size="sm" className="mt-5" icon={<LuPlus className="h-4 w-4" />}>
        Add blog
      </Button>
    </div>
  );
}
