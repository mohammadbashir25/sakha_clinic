"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import { Reveal } from "@/components/admin/dashboard/Reveal";
import { ImageForm } from "@/components/admin/images/ImageForm";
import type { ImageFormValues } from "@/components/admin/images/types";
import { imageCategories } from "@/lib/mock/admin-data";
import { addImage } from "@/lib/admin/image-store";

const emptyValues: ImageFormValues = {
  url: "",
  filename: "",
  title: "",
  alt: "",
  category: "",
  description: "",
  uploadedAt: new Date().toISOString().slice(0, 10),
};

/**
 * Frontend-only: submitting writes to the shared image store (see
 * lib/admin/image-store.ts) and returns to the library, where the new
 * image shows up immediately. Swap `addImage` for a real upload/API
 * call once one exists.
 */
export default function AddImagePage() {
  const router = useRouter();

  function handleSubmit(values: ImageFormValues) {
    addImage(values);
    router.push("/admin/images");
  }

  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <div className="flex flex-col gap-3">
          <Link
            href="/admin/images"
            className="inline-flex w-fit items-center gap-1.5 rounded text-sm font-medium text-muted transition-colors duration-200 hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid"
          >
            <LuArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to images
          </Link>

          <div>
            <h2 className="text-2xl font-semibold leading-tight text-charcoal sm:text-3xl">
              Add image
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Upload a new photo to the Sakha media library.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal index={1}>
        <div className="overflow-hidden rounded-xl border border-muted/15 bg-white">
          <ImageForm
            mode="add"
            initialValues={emptyValues}
            categories={imageCategories}
            submitLabel="Add Image"
            onSubmit={handleSubmit}
            onCancel={() => router.push("/admin/images")}
          />
        </div>
      </Reveal>
    </div>
  );
}
