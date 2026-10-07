"use client";

import { useSyncExternalStore } from "react";
import type { MediaImage } from "@/types/admin";
import type { ImageFormValues } from "@/components/admin/images/types";
import { mockImages } from "@/lib/mock/admin-data";

/**
 * Same pattern as blog-store.ts — module-level state shared between
 * /admin/images and /admin/images/add. Editing and deleting from the
 * existing ImageDetailsDialog on the list page also goes through here
 * now, so all three actions stay consistent.
 */
let images: MediaImage[] = [...mockImages];
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return images;
}

export function useImages(): MediaImage[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function addImage(values: ImageFormValues): MediaImage {
  const newImage: MediaImage = { id: crypto.randomUUID(), ...values };
  images = [newImage, ...images];
  emit();
  return newImage;
}

export function updateImage(image: MediaImage): void {
  images = images.map((item) => (item.id === image.id ? image : item));
  emit();
}

export function deleteImage(id: string): void {
  images = images.filter((item) => item.id !== id);
  emit();
}
