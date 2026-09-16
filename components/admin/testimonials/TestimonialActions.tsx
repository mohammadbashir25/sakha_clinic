import { LuEye, LuPencil, LuRadio, LuTrash2 } from "react-icons/lu";
import { IconButton } from "@/components/ui/IconButton";

interface TestimonialActionsProps {
  name: string;
  published: boolean;
  onView: () => void;
  onEdit: () => void;
  onTogglePublish: () => void;
  onDelete: () => void;
  className?: string;
}

export function TestimonialActions({
  name,
  published,
  onView,
  onEdit,
  onTogglePublish,
  onDelete,
  className,
}: TestimonialActionsProps) {
  return (
    <div className={className}>
      <IconButton
        icon={<LuEye className="h-4 w-4" />}
        aria-label={`Preview ${name}'s testimonial`}
        variant="ghost"
        onClick={onView}
      />
      <IconButton
        icon={<LuRadio className="h-4 w-4" />}
        aria-label={published ? `Unpublish ${name}'s testimonial` : `Publish ${name}'s testimonial`}
        variant="ghost"
        onClick={onTogglePublish}
      />
      <IconButton
        icon={<LuPencil className="h-4 w-4" />}
        aria-label={`Edit ${name}'s testimonial`}
        variant="ghost"
        onClick={onEdit}
      />
      <IconButton
        icon={<LuTrash2 className="h-4 w-4" />}
        aria-label={`Delete ${name}'s testimonial`}
        variant="ghost"
        onClick={onDelete}
      />
    </div>
  );
}
