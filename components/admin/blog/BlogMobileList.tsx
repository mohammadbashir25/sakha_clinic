import Link from "next/link";
import { LuExternalLink, LuPencilLine, LuTrash2 } from "react-icons/lu";
import { MediaThumb } from "@/components/admin/dashboard/MediaThumb";
import { formatAdminDate } from "@/lib/admin/format";
import type { BlogPost } from "@/types/admin";
import { BlogStatusBadge } from "./BlogStatusBadge";

interface BlogMobileListProps {
  posts: BlogPost[];
  onDeleteRequest: (post: BlogPost) => void;
}

/** Small-screen counterpart to BlogTable — shown behind `md:hidden`. */
export function BlogMobileList({ posts, onDeleteRequest }: BlogMobileListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {posts.map((post) => (
        <li key={post.id} className="rounded-xl border border-muted/15 bg-white p-4">
          <div className="flex gap-3">
            <MediaThumb
              src={post.coverImage}
              alt={post.coverImageAlt}
              sizes="72px"
              className="h-14 w-20 shrink-0 rounded-lg"
            />

            <div className="min-w-0 flex-1">
              <Link
                href={`/admin/blogs/edit/${post.id}`}
                className="line-clamp-2 rounded text-sm font-medium leading-snug text-charcoal transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                {post.title}
              </Link>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                <BlogStatusBadge status={post.status} />
                <span className="text-xs text-muted">{post.category}</span>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-muted/10 pt-3">
            <time dateTime={post.date} className="text-xs tabular-nums text-muted">
              {formatAdminDate(post.date)}
            </time>

            <div className="flex items-center gap-1">
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`View "${post.title}" on the website`}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:bg-lavender hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                <LuExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/admin/blogs/edit/${post.id}`}
                aria-label={`Edit "${post.title}"`}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:bg-lavender hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                <LuPencilLine className="h-4 w-4" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => onDeleteRequest(post)}
                aria-label={`Delete "${post.title}"`}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                <LuTrash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
