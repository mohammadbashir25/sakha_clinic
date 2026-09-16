"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LuPencilLine, LuTrash2, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import { MediaThumb } from "@/components/admin/dashboard/MediaThumb";
import { formatAdminDate } from "@/lib/admin/format";
import type { MediaImage } from "@/types/admin";

interface ImageDetailsDialogProps {
  image: MediaImage | null;
  categories: string[];
  onClose: () => void;
  onDeleteRequest: (image: MediaImage) => void;
  /**
   * Local, optimistic update only — there's no API yet. Replace with a
   * call to `updateImage(id, changes)` once the backend exists; this
   * component doesn't need to change, just what `onSave` does.
   */
  onSave: (image: MediaImage) => void;
}

export function ImageDetailsDialog(props: ImageDetailsDialogProps) {
  return <ImageDetailsDialogContent key={props.image?.id ?? "closed"} {...props} />;
}

function ImageDetailsDialogContent({
  image,
  categories,
  onClose,
  onDeleteRequest,
  onSave,
}: ImageDetailsDialogProps) {
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const open = image !== null;

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<MediaImage | null>(image);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  function handleSave() {
    if (!draft) return;
    onSave(draft);
    setIsEditing(false);
  }

  return (
    <AnimatePresence>
      {open && image && draft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
            onClick={onClose}
            aria-hidden="true"
            className="absolute inset-0 bg-charcoal/50"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="image-details-title"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8, scale: shouldReduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 8, scale: shouldReduceMotion ? 1 : 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-muted/15 bg-white shadow-xl sm:flex-row"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-charcoal transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid"
            >
              <LuX className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="relative h-56 shrink-0 bg-lavender sm:h-auto sm:w-1/2">
              <MediaThumb src={image.url} alt={image.alt} sizes="400px" className="h-full w-full" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col overflow-y-auto p-6">
              {isEditing ? (
                <EditForm
                  draft={draft}
                  categories={categories}
                  onChange={setDraft}
                  onCancel={() => {
                    setDraft(image);
                    setIsEditing(false);
                  }}
                  onSave={handleSave}
                />
              ) : (
                <DetailsView
                  image={image}
                  onEdit={() => setIsEditing(true)}
                  onDeleteRequest={() => onDeleteRequest(image)}
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function DetailsView({
  image,
  onEdit,
  onDeleteRequest,
}: {
  image: MediaImage;
  onEdit: () => void;
  onDeleteRequest: () => void;
}) {
  return (
    <>
      <h2 id="image-details-title" className="pr-8 text-lg font-semibold text-charcoal">
        {image.title}
      </h2>

      <dl className="mt-4 flex flex-col gap-3 text-sm">
        <Field label="Filename" value={image.filename} mono />
        <Field label="Alt text" value={image.alt} />
        <Field label="Category" value={image.category} />
        {image.description && <Field label="Description" value={image.description} />}
        <Field label="Uploaded" value={formatAdminDate(image.uploadedAt)} />
      </dl>

      <div className="mt-6 flex gap-3">
        <Button size="sm" variant="outline" icon={<LuPencilLine className="h-4 w-4" />} onClick={onEdit}>
          Edit
        </Button>
        <Button
          size="sm"
          variant="ghost"
          icon={<LuTrash2 className="h-4 w-4" />}
          onClick={onDeleteRequest}
          className="text-red-600 hover:bg-red-50"
        >
          Delete
        </Button>
      </div>
    </>
  );
}

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted">{label}</dt>
      <dd className={mono ? "mt-0.5 font-mono text-xs text-charcoal" : "mt-0.5 text-charcoal"}>
        {value}
      </dd>
    </div>
  );
}

function EditForm({
  draft,
  categories,
  onChange,
  onCancel,
  onSave,
}: {
  draft: MediaImage;
  categories: string[];
  onChange: (image: MediaImage) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSave();
      }}
      className="flex flex-col gap-4"
    >
      <h2 className="pr-8 text-lg font-semibold text-charcoal">Edit image details</h2>

      <FormField label="Title" htmlFor="image-title">
        <input
          id="image-title"
          type="text"
          value={draft.title}
          onChange={(event) => onChange({ ...draft, title: event.target.value })}
          className="h-10 w-full rounded-lg border border-muted/20 px-3 text-sm text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid"
        />
      </FormField>

      <FormField label="Alt text" htmlFor="image-alt">
        <input
          id="image-alt"
          type="text"
          value={draft.alt}
          onChange={(event) => onChange({ ...draft, alt: event.target.value })}
          className="h-10 w-full rounded-lg border border-muted/20 px-3 text-sm text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid"
        />
      </FormField>

      <FormField label="Category" htmlFor="image-category">
        <select
          id="image-category"
          value={draft.category}
          onChange={(event) => onChange({ ...draft, category: event.target.value })}
          className="h-10 w-full rounded-lg border border-muted/20 px-3 text-sm text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Description" htmlFor="image-description">
        <textarea
          id="image-description"
          value={draft.description ?? ""}
          onChange={(event) => onChange({ ...draft, description: event.target.value })}
          rows={3}
          className="w-full rounded-lg border border-muted/20 px-3 py-2 text-sm text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid"
        />
      </FormField>

      <div className="mt-1 flex gap-3">
        <Button type="submit" size="sm">
          Save changes
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function FormField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
