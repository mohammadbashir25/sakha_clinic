"use client";

import { useFormatter, useTranslations } from "next-intl";
import type { BlogPostView } from "./data";

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`h-4 w-4 shrink-0 rtl:-scale-x-100 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

type Props = {
  post: BlogPostView;
  showAuthor?: boolean;
  showUpdated?: boolean;
  className?: string;
};

/** Date, reading time, and (optionally) author / updated date, split by thin rules. */
export default function BlogMeta({ post, showAuthor, showUpdated, className = "" }: Props) {
  const t = useTranslations("BlogPage");
  const format = useFormatter();
  const fmt = (iso: string) =>
    format.dateTime(new Date(iso), { year: "numeric", month: "long", day: "numeric" });

  const items: { key: string; node: React.ReactNode }[] = [
    { key: "date", node: <time dateTime={post.publishedAt}>{fmt(post.publishedAt)}</time> },
    { key: "read", node: t("meta.minRead", { minutes: post.readingMinutes }) },
  ];
  if (showAuthor && post.author) {
    items.unshift({ key: "by", node: t("meta.by", { name: post.author }) });
  }
  if (showUpdated && post.updatedAt && post.updatedAt !== post.publishedAt) {
    items.push({
      key: "upd",
      node: <time dateTime={post.updatedAt}>{t("meta.updated", { date: fmt(post.updatedAt) })}</time>,
    });
  }

  return (
    <p className={`flex flex-wrap items-center gap-y-1 text-sm text-[#716b75] ${className}`}>
      {items.map((item, i) => (
        <span key={item.key} className="flex items-center">
          {i > 0 && <span aria-hidden="true" className="mx-3 h-3 w-px bg-[#c9a86a]" />}
          {item.node}
        </span>
      ))}
    </p>
  );
}
