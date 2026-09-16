"use client";

import { motion } from "framer-motion";
import { HiOutlineArrowRight, HiOutlineCalendarDays } from "react-icons/hi2";
import {Container} from "@/components/ui/Container";
import {ImagePlaceholder} from "@/components/ui/ImagePlaceholder";
import type { BlogPost } from "../types";

/**
 * Image: featured
 * Purpose: the single most prominent article on the page
 * Aspect ratio: 16:9
 * Object position: center
 * Desktop: full-width band above the title/excerpt
 * Mobile: retains 16:9, full width
 */
export default function FeaturedPost({ post }: { post: BlogPost | null }) {
  if (!post) {
    return (
      <section className="bg-ivory py-14 lg:py-16">
        <Container>
          <p className="max-w-xl text-sm leading-relaxed text-muted/80 italic">
            [CLIENT INPUT REQUIRED] A featured article will appear here once
            the first piece is published.
          </p>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-ivory py-14 lg:py-16">
      <Container>
        <motion.a
          href={`/blog/${post.slug}`}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
        >
          <ImagePlaceholder
            label={post.image.label}
            className="w-full transition-opacity group-hover:opacity-90"
          />

          <div className="mt-7 max-w-2xl">
            <span className="text-sm font-medium uppercase tracking-[0.14em] text-champagne">
              {post.category}
            </span>
            <h2 className="mt-3 text-2xl leading-tight text-charcoal sm:text-3xl lg:text-4xl">
              {post.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {post.excerpt}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              {post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <HiOutlineCalendarDays className="h-4 w-4" aria-hidden="true" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              {post.readingTime && <span>{post.readingTime}</span>}
              <span className="flex items-center gap-1.5 font-medium text-primary">
                Read Article
                <HiOutlineArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </motion.a>
      </Container>
    </section>
  );
}