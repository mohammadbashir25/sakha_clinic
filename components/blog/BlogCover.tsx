"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src?: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Fills its (relative, sized) parent. Falls back to a quiet editorial
 * placeholder when the image is missing or fails to load.
 */
export default function BlogCover({ src, alt = "", sizes, priority, className = "" }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#f2eaf4] to-[#faf8f5]">
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <circle cx="140" cy="70" r="62" fill="none" stroke="#c9a86a" strokeWidth="0.6" />
          <circle cx="140" cy="70" r="42" fill="none" stroke="#9a3fa5" strokeOpacity="0.35" strokeWidth="0.6" />
          <line x1="0" y1="150" x2="200" y2="150" stroke="#c9a86a" strokeWidth="0.6" />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
