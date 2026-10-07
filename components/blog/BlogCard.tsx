"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BlogPostView } from "./data";
import BlogCover from "./BlogCover";
import BlogMeta, { ArrowIcon } from "./BlogMeta";

type Props = {
  post: BlogPostView;
  variant?: "large" | "default";
  /** Grid placement classes from the parent. */
  className?: string;
};

export default function BlogCard({ post, variant = "default", className = "" }: Props) {
  const t = useTranslations("BlogPage");
  const large = variant === "large";

  return (
    <article className={className}>
      <Link
        href={`/blog/${post.slug}`}
        className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9a3fa5]"
      >
        <div
          className={`relative overflow-hidden bg-[#f2eaf4] ${large ? "aspect-[5/4]" : "aspect-[4/3]"}`}
        >
          <BlogCover
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            sizes={large ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>

        <p className="mt-5 text-sm font-medium text-[#9a3fa5]">{t(`categories.${post.category}`)}</p>
        <h3
          className={`mt-2 font-serif leading-snug text-[#210038] transition-colors group-hover:text-[#9a3fa5] rtl:leading-relaxed ${
            large ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 leading-7 text-[#716b75]">{post.excerpt}</p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#c9a86a]/40 pt-4">
          <BlogMeta post={post} />
          <span className="flex items-center gap-2 text-sm font-medium text-[#320154]">
            {t("featured.readArticle")}
            <ArrowIcon className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 motion-reduce:transition-none" />
          </span>
        </div>
      </Link>
    </article>
  );
}
