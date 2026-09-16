import type { Metadata } from "next";
import BlogHero from "@/components/blog/BlogHero/BlogHero";
import FeaturedPost from "@/components/blog/FeaturedPost/FeaturedPost";
import BlogGrid from "@/components/blog/BlogGrid/BlogGrid";
import RecommendedPosts from "@/components/blog/BlogGrid/RecommendedPosts";
import BlogCTA from "@/components/blog/BlogCTA/BlogCTA";
import { getAllPosts, getFeaturedPost } from "@/components/blog/posts";

export const metadata: Metadata = {
  title: "Journal | Sakha Hair Transplant, Dermatology & Beauty Center",
  description:
    "Explore thoughtful information about hair restoration, dermatology, skin care, and aesthetic treatments from Sakha in Mazar-e-Sharif.",
};

export default async function BlogPage() {
  const [allPosts, featuredPost] = await Promise.all([
    getAllPosts(),
    getFeaturedPost(),
  ]);

  const gridPosts = featuredPost
    ? allPosts.filter((post) => post.id !== featuredPost.id)
    : allPosts;

  const recommendedPosts = gridPosts.slice(0, 3);

  return (
    <main>
      <BlogHero />
      <FeaturedPost post={featuredPost} />
      <BlogGrid posts={gridPosts} />
      <RecommendedPosts posts={recommendedPosts} />
      <BlogCTA />
    </main>
  );
}