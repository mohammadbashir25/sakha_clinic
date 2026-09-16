import {
  FiUser,
  FiShield,
  FiHeart,
  FiMessageCircle,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { HiSparkles } from "react-icons/hi2";

/**
 * Maps the `icon` string in data.ts to an actual icon component.
 * Keeps data.ts free of framework-specific imports.
 * react-icons renders as plain SVG, so this is safe to use from
 * a Server Component — no "use client" required here.
 */
export const trustPointIcons: Record<string, IconType> = {
  "personalized-care": FiUser,
  "professional-environment": FiShield,
  "modern-approach": HiSparkles,
  "patient-focused": FiHeart,
  "clear-communication": FiMessageCircle,
};