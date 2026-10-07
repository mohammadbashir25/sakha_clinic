"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function ArticleShare({ title }: { title: string }) {
  const t = useTranslations("BlogPage");
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    const url = window.location.href; // already includes the locale prefix
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const area = document.createElement("textarea");
      area.value = url;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2400);
  }

  async function share() {
    try {
      await navigator.share({ title, url: window.location.href });
    } catch {
      /* user dismissed the share sheet */
    }
  }

  const btn =
    "border border-[#c9a86a]/70 px-4 py-2 text-sm font-medium text-[#320154] transition-colors hover:bg-[#f2eaf4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3fa5]";

  return (
    <div>
      <p className="text-sm font-medium text-[#716b75]">{t("article.shareArticle")}</p>
      <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:items-start">
        <button type="button" onClick={copy} className={btn}>
          {t("article.copyLink")}
        </button>
        {canShare && (
          <button type="button" onClick={share} className={btn}>
            {t("article.shareArticle")}
          </button>
        )}
      </div>
      <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-[#9a3fa5]">
        {copied ? t("article.linkCopied") : ""}
      </p>
    </div>
  );
}
