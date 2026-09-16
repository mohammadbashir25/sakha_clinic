import Link from "next/link";
import { LuExternalLink, LuPencilLine, LuTrash2 } from "react-icons/lu";
import { MediaThumb } from "@/components/admin/dashboard/MediaThumb";
import { formatAdminDate } from "@/lib/admin/format";
import type { BlogPost } from "@/types/admin";
import { BlogStatusBadge } from "./BlogStatusBadge";

interface BlogTableProps {
  posts: BlogPost[];
  onDeleteRequest: (post: BlogPost) => void;
}

/**
 * Desktop only (rendered behind a `hidden md:block` wrapper by the page) —
 * BlogMobileList covers small screens.
 */
export function BlogTable({ posts, onDeleteRequest }: BlogTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-muted/15 bg-white">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-muted/15 text-left text-xs font-medium uppercase tracking-wide text-muted">
            <th scope="col" className="w-20 px-5 py-3 font-medium">
              Image
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Title
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Category
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Author
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Status
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Date
            </th>
            <th scope="col" className="px-5 py-3 text-right font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-muted/15">
          {posts.map((post) => (
            <tr key={post.id} className="transition-colors duration-200 hover:bg-lavender/30">
              <td className="px-5 py-3">
                <MediaThumb
                  src={post.coverImage}
                  alt={post.coverImageAlt}
                  sizes="64px"
                  className="h-12 w-16 rounded-lg"
                />
              </td>
              <td className="max-w-xs px-3 py-3">
                <Link
                  href={`/admin/blogs/edit/${post.id}`}
                  className="line-clamp-2 rounded font-medium leading-snug text-charcoal transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                >
                  {post.title}
                </Link>
              </td>
              <td className="px-3 py-3 text-muted">{post.category}</td>
              <td className="px-3 py-3 text-muted">{post.author}</td>
              <td className="px-3 py-3">
                <BlogStatusBadge status={post.status} />
              </td>
              <td className="whitespace-nowrap px-3 py-3 tabular-nums text-muted">
                {formatAdminDate(post.date)}
              </td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    title="View on the website"
                    aria-label={`View "${post.title}" on the website`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:bg-lavender hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                  >
                    <LuExternalLink className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={`/admin/blogs/edit/${post.id}`}
                    title="Edit"
                    aria-label={`Edit "${post.title}"`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:bg-lavender hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                  >
                    <LuPencilLine className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDeleteRequest(post)}
                    title="Delete"
                    aria-label={`Delete "${post.title}"`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                  >
                    <LuTrash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
