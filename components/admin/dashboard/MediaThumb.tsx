"use client";

import Image from "next/image";
import { useState } from "react";
import { LuImageOff } from "react-icons/lu";
import { cn } from "@/components/ui/utils";

interface MediaThumbProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

/**
 * next/image with a quiet fallback tile. Mock image paths point at
 * /public and may not exist yet — a missing file shouldn't leave a
 * broken image in the middle of the dashboard.
 */
export function MediaThumb({ src, alt, className, sizes = "120px" }: MediaThumbProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-lavender", className)}>
      {failed ? (
        <div
          className="flex h-full w-full items-center justify-center text-primary/30"
          role="img"
          aria-label={alt}
        >
          <LuImageOff className="h-4 w-4" aria-hidden="true" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
