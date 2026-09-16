"use client";

import { motion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi2";
import {ImagePlaceholder} from "@/components/ui/ImagePlaceholder";
import type { BlogPost } from "../types";

/**
 * Image: article card
 * Purpose: supporting image for a single article in the grid
 * Aspect ratio: 3:2
 * Object position: center
 * Desktop: fixed within the card, image above title
 * Mobile: full width, focal subject preserved via objectPosition
 */
export default function BlogCard({
  post,
  index,
}: {
  post: BlogPost;
  index: number;
}) {
  return (
    <motion.a
      href={`/blog/${post.slug}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.08 }}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
    >
      <ImagePlaceholder
        label={post.image.label}
        className="w-full transition-opacity group-hover:opacity-90"
      />

      <span className="mt-5 block text-xs font-medium uppercase tracking-[0.14em] text-champagne">
        {post.category}
      </span>
      <h3 className="mt-2 text-lg leading-snug text-charcoal">
        {post.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {post.excerpt}
      </p>

      {(post.publishedAt || post.readingTime) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 text-xs text-muted/80">
          {post.publishedAt && (
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
          {post.publishedAt && post.readingTime && <span aria-hidden="true">·</span>}
          {post.readingTime && <span>{post.readingTime}</span>}
        </div>
      )}

      <span className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary">
        Read Article
        <HiOutlineArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </motion.a>
  );
}