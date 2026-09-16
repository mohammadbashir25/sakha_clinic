import Link from "next/link";
import { LuImagePlus, LuPenLine } from "react-icons/lu";
import type { IconType } from "react-icons";
import { Reveal } from "./Reveal";

interface QuickAction {
  label: string;
  description: string;
  href: string;
  icon: IconType;
}

const actions: QuickAction[] = [
  {
    label: "Add blog",
    description: "Write a new article for the Sakha journal",
    href: "/admin/blogs/add",
    icon: LuPenLine,
  },
  {
    label: "Upload image",
    description: "Add clinic photography to the media library",
    href: "/admin/images",
    icon: LuImagePlus,
  },
];

export function QuickActions() {
  return (
    <Reveal index={4}>
      <h2 className="sr-only">Quick actions</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <li key={action.href}>
              <Link
                href={action.href}
                className="group flex items-center gap-4 rounded-xl border border-muted/15 bg-white px-5 py-4 transition-colors duration-200 hover:border-orchid/30 hover:bg-lavender/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orchid focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lavender text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-ivory">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-charcoal">{action.label}</span>
                  <span className="block text-xs text-muted">{action.description}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Reveal>
  );
}
