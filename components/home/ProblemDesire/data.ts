/**
 * Structure for the Problem & Desire section.
 *
 * Holds translation KEYS only — never visible text. All copy lives in
 * messages/*.json under the "ProblemDesire" namespace and is read with
 * `useTranslations("ProblemDesire")`. Order here is the display order.
 */

/** Keys under "ProblemDesire.concerns". */
export const concernKeys = [
  "skin",
  "hair",
  "appearance",
  "transplant",
  "aesthetics",
  "laser",
] as const;

export type ConcernKey = (typeof concernKeys)[number];

/** Keys under "ProblemDesire.desires" (each has `title` and `description`). */
export const desireKeys = [
  "natural",
  "personalized",
  "precision",
  "confidence",
] as const;

export type DesireKey = (typeof desireKeys)[number];
