import { LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import type { MediaImage } from "@/types/admin";
import { MediaThumb } from "./MediaThumb";
import { Reveal } from "./Reveal";
import { SectionShell } from "./SectionShell";

interface RecentImagesProps {
  images: MediaImage[];
}

export function RecentImages({ images }: RecentImagesProps) {
  const hasImages = images.length > 0;

  return (
    <Reveal index={3}>
      <SectionShell
        title="Recent images"
        actionLabel={hasImages ? "View all images" : undefined}
        actionHref={hasImages ? "/admin/images" : undefined}
      >
        {hasImages ? <ImageGrid images={images} /> : <EmptyImages />}
      </SectionShell>
    </Reveal>
  );
}

function ImageGrid({ images }: { images: MediaImage[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {images.map((image) => (
        <li key={image.id} className="flex flex-col gap-2">
          <MediaThumb
            src={image.url}
            alt={image.alt}
            sizes="(min-width: 1024px) 160px, (min-width: 640px) 30vw, 45vw"
            className="aspect-[4/3] w-full rounded-lg border border-muted/15"
          />
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-charcoal">{image.title}</p>
            <p className="truncate text-[11px] text-muted">{image.category}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function EmptyImages() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-muted/25 bg-white px-6 py-12 text-center">
      <p className="text-base font-medium text-charcoal">No images yet</p>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted">
        Upload clinic photography to use across the Sakha website.
      </p>
      <Button href="/admin/images" size="sm" variant="outline" className="mt-5" icon={<LuPlus className="h-4 w-4" />}>
        Add image
      </Button>
    </div>
  );
}
