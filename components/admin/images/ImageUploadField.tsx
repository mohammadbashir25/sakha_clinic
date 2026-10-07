"use client";

import { useEffect, useRef, useState, type DragEvent } from "react";
import { LuImageOff, LuCloudUpload, LuX } from "react-icons/lu";
import { cn } from "@/components/ui/utils";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

interface ImageUploadFieldProps {
  previewUrl: string;
  filename: string;
  error?: string;
  onSelect: (file: { url: string; filename: string }) => void;
  onRemove: () => void;
}

export function ImageUploadField({ previewUrl, filename, error, onSelect, onRemove }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const objectUrlRef = useRef<string | null>(null);

  // Revoke the object URL we created so it doesn't leak once it's no longer shown.
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleFile = (file: File | undefined) => {
    if (!file || !ACCEPTED_TYPES.includes(file.type)) return;

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    onSelect({ url, filename: file.name });
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    if (event.dataTransfer.files?.[0]) handleFile(event.dataTransfer.files[0]);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-charcoal">Image</span>

      {/* Always mounted so "Replace" can trigger it even while a preview is showing. */}
      <input
        ref={inputRef}
        id="image-file-input"
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={(event) => handleFile(event.target.files?.[0])}
        className="peer sr-only"
      />

      {previewUrl ? (
        <div className="overflow-hidden rounded-lg border border-muted/20 bg-ivory">
          <div className="flex aspect-[4/3] items-center justify-center bg-lavender/20">
            {/* eslint-disable-next-line @next/next/no-img-element -- local blob/object URL, not an optimizable remote asset */}
            <img src={previewUrl} alt="" className="h-full w-full object-contain" />
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-muted/15 px-3 py-2.5">
            <p className="min-w-0 flex-1 truncate text-xs text-muted">{filename || "Selected image"}</p>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={onRemove}
                className="flex items-center gap-1 text-xs font-medium text-muted hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid"
              >
                <LuX className="h-3.5 w-3.5" aria-hidden="true" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <label
          htmlFor="image-file-input"
          onDragOver={(event) => {
            event.preventDefault();
            setIsDraggingOver(true);
          }}
          onDragLeave={() => setIsDraggingOver(false)}
          onDrop={handleDrop}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-10 text-center transition-colors duration-200 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-orchid peer-focus-visible:ring-offset-2",
            isDraggingOver ? "border-champagne bg-champagne/5" : "border-muted/25 bg-ivory",
            error && "border-red-300",
          )}
        >
          <LuCloudUpload
            className={cn("h-6 w-6", isDraggingOver ? "text-champagne" : "text-muted/50")}
            aria-hidden="true"
          />
          <span className="text-sm text-charcoal">
            <span className="font-medium text-primary hover:underline">Choose a file</span> or drag it here
          </span>
          <span className="text-xs text-muted">PNG, JPG or WebP</span>
        </label>
      )}

      {!previewUrl && (
        <div className="flex items-center gap-1.5 text-xs text-muted/70">
          <LuImageOff className="h-3.5 w-3.5" aria-hidden="true" />
          No image selected yet
        </div>
      )}

      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
