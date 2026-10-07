import { getTranslations } from "next-intl/server";
import { getPublishedPosts } from "@/components/blog/data";
import BlogHero from "@/components/blog/BlogHero";
import BlogFeatured from "@/components/blog/BlogFeatured";
import BlogDirectory from "@/components/blog/BlogDirectory";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage" });
  return { title: t("hero.title"), description: t("hero.description") };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = await getPublishedPosts(locale);
  const lead = posts[0];

  return (
    <main className="bg-[#faf8f5]">
      <BlogHero />
      {lead && <BlogFeatured post={lead} />}
      <BlogDirectory posts={posts} featuredSlug={lead?.slug} />

    </main>
  );
}