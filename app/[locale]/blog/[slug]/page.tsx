import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAdjacentPosts, getPostBySlug, getRelatedPosts } from "@/components/blog/data";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleShare from "@/components/blog/ArticleShare";
import BlogCard from "@/components/blog/BlogCard";
import BlogCover from "@/components/blog/BlogCover";
import BlogMeta, { ArrowIcon } from "@/components/blog/BlogMeta";

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage ? [{ url: post.coverImage, alt: post.coverImageAlt || post.title }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "BlogPage" });
  const [related, { previous, next }] = await Promise.all([
    getRelatedPosts(post, locale, 3),
    getAdjacentPosts(slug, locale),
  ]);

  return (
    <main className="bg-[#faf8f5]">
      <article>
        <header className="mx-auto max-w-4xl px-5 pb-10 pt-28 sm:px-8 lg:pt-36">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#320154] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9a3fa5]"
          >
            <ArrowIcon className="rotate-180 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1 motion-reduce:transition-none" />
            {t("article.backToBlog")}
          </Link>

          <p className="mt-10 flex items-center gap-3 text-sm font-medium text-[#9a3fa5]">
            <span aria-hidden="true" className="h-px w-8 bg-[#c9a86a]" />
            {t(`categories.${post.category}`)}
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-[1.12] text-[#320154] sm:text-5xl rtl:leading-[1.4]">
            {post.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-[#716b75]">{post.excerpt}</p>
          <BlogMeta post={post} showAuthor showUpdated className="mt-8" />
        </header>

        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="relative aspect-[16/9] overflow-hidden bg-[#f2eaf4]">
            <BlogCover
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              sizes="(min-width: 1024px) 64rem, 100vw"
              priority
            />
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:py-20">
          <aside className="order-2 lg:order-1 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <ArticleShare title={post.title} />
            </div>
          </aside>
          <div className="order-1 max-w-[68ch] lg:order-2 lg:col-span-9">
            <ArticleBody content={post.content} />
          </div>
        </div>
      </article>

      {(previous || next) && (
        <nav aria-label={t("article.relatedArticles")} className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid border-y border-[#c9a86a]/40 sm:grid-cols-2">
            {previous ? (
              <Link
                href={`/blog/${previous.slug}`}
                className="group py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#9a3fa5] sm:pe-8"
              >
                <span className="text-sm text-[#716b75]">{t("article.previousArticle")}</span>
                <span className="mt-2 block font-serif text-xl leading-snug text-[#210038] transition-colors group-hover:text-[#9a3fa5]">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="group border-t border-[#c9a86a]/40 py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#9a3fa5] sm:border-s sm:border-t-0 sm:ps-8"
              >
                <span className="text-sm text-[#716b75]">{t("article.nextArticle")}</span>
                <span className="mt-2 block font-serif text-xl leading-snug text-[#210038] transition-colors group-hover:text-[#9a3fa5]">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <h2 id="related-title" className="font-serif text-3xl text-[#320154] sm:text-4xl">
            {t("article.relatedArticles")}
          </h2>
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}