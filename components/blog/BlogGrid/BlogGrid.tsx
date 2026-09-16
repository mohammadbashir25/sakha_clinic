"use client";

import { useMemo, useState } from "react";
import {Container} from "@/components/ui/Container";
import {SectionHeading} from "@/components/ui/SectionHeading";
import BlogCategories from "../BlogCategories/BlogCategories";
import type { BlogCategory } from "../BlogCategories/data";
import BlogCard from "../BlogCard/BlogCard";
import type { BlogPost } from "../types";

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") {
      return posts;
    }
    return posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <section className="bg-ivory py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow="Latest Articles" title="From the journal." align="left" />

        <div className="mt-10">
          <BlogCategories
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {posts.length === 0 ? (
          <p className="mt-10 max-w-xl text-sm leading-relaxed text-muted/80 italic">
            [CLIENT INPUT REQUIRED] Articles will appear here once the first
            pieces are published.
          </p>
        ) : filteredPosts.length === 0 ? (
          <p className="mt-10 text-sm leading-relaxed text-muted/80 italic">
            No articles in this category yet.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}