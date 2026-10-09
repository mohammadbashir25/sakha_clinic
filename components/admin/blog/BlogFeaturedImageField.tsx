"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { upload } from "@vercel/blob/client";
import { LuImagePlus, LuLoaderCircle, LuUpload, LuX } from "react-icons/lu";
import { cn } from "@/components/ui/utils";

interface BlogFeaturedImageFieldProps {
  coverImage: string;
  coverImageAlt: string;
  onChange: (image: { coverImage: string; coverImageAlt: string }) => void;
  onRemove: () => void;
}

const inputClasses = "w-full rounded-lg border border-muted/20 bg-ivory px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

/** Uploads a local image directly to Vercel Blob and saves its public URL in the blog record. */
export function BlogFeaturedImageField({ coverImage, coverImageAlt, onChange, onRemove }: BlogFeaturedImageFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [progress, setProgress] = useState(0);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    // Let the user choose the same file again after removing or fixing an error.
    event.target.value = "";
    if (!file) return;

    setUploadError("");
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setUploadError("Choose a JPG, PNG, WebP, or AVIF image.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setUploadError("The image must be 5 MB or smaller.");
      return;
    }

    setIsUploading(true);
    setProgress(0);
    try {
      const safeName = file.name
        .normalize("NFKD")
        .replace(/[^a-zA-Z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, "") || "cover-image";
      const blob = await upload(`blog-covers/${Date.now()}-${safeName}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/blob",
        onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
      });
      onChange({ coverImage: blob.url, coverImageAlt });
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="blog-cover-file" className="text-sm font-medium text-charcoal">Featured image</label>
      <input
        ref={fileInputRef}
        id="blog-cover-file"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileChange}
        disabled={isUploading}
        className="sr-only"
      />

      {coverImage ? (
        <div className="overflow-hidden rounded-xl border border-muted/20 bg-lavender">
          <div className="relative aspect-[16/9] w-full">
            {/* Blob URLs are external URLs; use a normal img so no host allowlist is required. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverImage} alt={coverImageAlt || "Blog cover preview"} className="h-full w-full object-cover" />
          </div>
          <div className="flex items-center justify-between gap-2 p-3">
            <p className="min-w-0 truncate text-xs text-muted" title={coverImage}>{coverImage}</p>
            <button type="button" onClick={onRemove} disabled={isUploading} aria-label="Remove featured image" className="shrink-0 rounded-full p-2 text-muted hover:bg-muted/10 hover:text-charcoal disabled:opacity-50"><LuX className="h-4 w-4" aria-hidden="true" /></button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className={cn("flex min-h-32 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-muted/25 bg-ivory px-4 py-5 text-center text-sm text-muted transition hover:border-orchid hover:bg-lavender/50 disabled:cursor-wait disabled:opacity-70")}
        >
          {isUploading ? <LuLoaderCircle className="h-6 w-6 animate-spin text-orchid" /> : <LuImagePlus className="h-6 w-6 text-orchid" />}
          <span className="font-medium text-charcoal">{isUploading ? `Uploading image… ${progress}%` : "Choose an image from your device"}</span>
          <span className="text-xs">Computer, Android, or iPhone · JPG, PNG, WebP, AVIF · Max 5 MB</span>
        </button>
      )}

      {isUploading && <div className="h-1.5 overflow-hidden rounded-full bg-muted/15"><div className="h-full rounded-full bg-orchid transition-all" style={{ width: `${progress}%` }} /></div>}
      {uploadError && <p role="alert" className="text-xs text-red-600">{uploadError}</p>}
      <p className="text-xs leading-relaxed text-muted">Images are uploaded to Vercel Blob. The saved public image URL is attached to this blog post; you do not need to enter a path manually.</p>
      {!coverImage && !isUploading && <button type="button" onClick={() => fileInputRef.current?.click()} className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-muted/20 px-3 py-2 text-xs font-medium text-charcoal hover:bg-lavender"><LuUpload className="h-3.5 w-3.5" /> Browse files</button>}
    </div>
  );
}
