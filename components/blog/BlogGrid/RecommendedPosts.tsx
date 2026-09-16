import {Container} from "@/components/ui/Container";
import {SectionHeading} from "@/components/ui/SectionHeading";
import BlogCard from "../BlogCard/BlogCard";
import type { BlogPost } from "../types";

export default function RecommendedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-lavender/40 py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Recommended"
          title="Worth reading next."
          align="left"
        />
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}