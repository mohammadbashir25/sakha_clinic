"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BlogPostView } from "@/components/blog/data";
import BlogCover from "./BlogCover";
import BlogMeta, { ArrowIcon } from "./BlogMeta";

export default function BlogFeatured({ post }: { post: BlogPostView }) {
  const t = useTranslations("BlogPage");

  return (
    <section aria-labelledby="featured-title" className="bg-[#faf8f5] pb-16 lg:pb-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Link
          href={`/blog/${post.slug}`}
          className="group grid items-center gap-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#9a3fa5] lg:grid-cols-12 lg:gap-0"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-[#f2eaf4] lg:col-span-7 lg:aspect-[5/4]">
            <BlogCover
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              sizes="(min-width: 1024px) 58vw, 100vw"
              priority
              className="transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>

          <div className="relative lg:col-span-5 lg:-ms-20 lg:bg-[#faf8f5] lg:py-12 lg:ps-12">
            <p className="flex items-center gap-3 text-sm font-medium text-[#9a3fa5]">
              <span aria-hidden="true" className="h-px w-8 bg-[#c9a86a]" />
              {t("featured.eyebrow")}
              <span aria-hidden="true" className="h-3 w-px bg-[#c9a86a]" />
              <span className="text-[#716b75]">{t(`categories.${post.category}`)}</span>
            </p>
            <h2
              id="featured-title"
              className="mt-5 font-serif text-3xl leading-tight text-[#210038] transition-colors group-hover:text-[#9a3fa5] sm:text-4xl rtl:leading-snug"
            >
              {post.title}
            </h2>
            <p className="mt-5 leading-8 text-[#716b75]">{post.excerpt}</p>
            <BlogMeta post={post} className="mt-6" />
            <span className="mt-8 inline-flex items-center gap-2 border-b border-[#c9a86a] pb-1 text-sm font-medium text-[#320154]">
              {t("featured.readArticle")}
              <ArrowIcon className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 motion-reduce:transition-none" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
