import { Badge } from "@/components/ui/Badge";
import type { BlogStatus } from "@/types/admin";

export function BlogStatusBadge({ status }: { status: BlogStatus }) {
  return status === "published" ? <Badge>Published</Badge> : <Badge variant="outline">Draft</Badge>;
}
