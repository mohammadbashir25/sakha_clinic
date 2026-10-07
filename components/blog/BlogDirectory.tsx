"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { BLOG_CATEGORIES, type BlogCategory, type BlogPostView } from "./data";
import BlogCard from "./BlogCard";

type Props = {
  posts: BlogPostView[];
  /** Slug shown in the featured section; hidden here while filter is "all". */
  featuredSlug?: string;
};

type Filter = "all" | BlogCategory;

// Repeating 5-step rhythm on a 12-column grid: wide, narrow, then three equal.
const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

export default function BlogDirectory({ posts, featuredSlug }: Props) {
  const t = useTranslations("BlogPage");
  const [filter, setFilter] = useState<Filter>("all");

  const available = useMemo(
    () => BLOG_CATEGORIES.filter((c) => posts.some((p) => p.category === c)),
    [posts],
  );

  const list = useMemo(
    () =>
      filter === "all"
        ? posts.filter((p) => p.slug !== featuredSlug)
        : posts.filter((p) => p.category === filter),
    [posts, filter, featuredSlug],
  );

  // One article only: it already appears as the lead.
  if (posts.length === 1) return null;

  const options: Filter[] = ["all", ...available];

  return (
    <section aria-labelledby="directory-title" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-sm font-medium text-[#9a3fa5]">
              <span aria-hidden="true" className="h-px w-8 bg-[#c9a86a]" />
              {t("directory.eyebrow")}
            </p>
            <h2
              id="directory-title"
              className="mt-4 font-serif text-3xl leading-tight text-[#320154] sm:text-4xl rtl:leading-snug"
            >
              {posts.length === 0 ? t("directory.noArticles") : t("directory.title")}
            </h2>
          </div>
          <p className="max-w-md leading-8 text-[#716b75] lg:col-span-5 lg:self-end">
            {posts.length === 0 ? t("directory.noArticlesDescription") : t("directory.description")}
          </p>
        </header>

        {posts.length === 0 ? (
          <div aria-hidden="true" className="mt-12 h-px w-full bg-gradient-to-r from-[#c9a86a] to-transparent rtl:bg-gradient-to-l" />
        ) : (
          <>
            {available.length > 1 && (
              <nav aria-label={t("directory.eyebrow")} className="mt-10 border-b border-[#c9a86a]/40">
                <ul className="flex flex-wrap gap-x-7 gap-y-1">
                  {options.map((option) => {
                    const active = filter === option;
                    return (
                      <li key={option}>
                        <button
                          type="button"
                          aria-pressed={active}
                          onClick={() => setFilter(option)}
                          className={`-mb-px border-b-2 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3fa5] ${
                            active
                              ? "border-[#c9a86a] text-[#320154]"
                              : "border-transparent text-[#716b75] hover:text-[#320154]"
                          }`}
                        >
                          {t(`categories.${option}`)}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}

            {list.length === 0 ? (
              <p className="mt-12 text-[#716b75]">{t("directory.noArticles")}</p>
            ) : (
              <div className="mt-12 grid gap-x-8 gap-y-14 lg:grid-cols-12">
                {list.map((post, i) => (
                  <BlogCard
                    key={post.slug}
                    post={post}
                    variant={i % 5 === 0 ? "large" : "default"}
                    className={SPANS[i % 5]}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
