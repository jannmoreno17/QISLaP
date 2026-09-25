import { asset, cn } from "@/lib/utils";

const initials = (name: string) =>
  name
    .replace(/^(Engr\.|Dr\.)\s+/, "")
    .split(/[\s,]+/)
    .filter((w) => /^[A-Z][a-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/** Circular member photo. Source photos are small, so they're always shown cropped and never upscaled beyond ~160px. */
export default function Avatar({ name, photo, className }: { name: string; photo?: string; className?: string }) {
  return (
    <div className={cn("relative aspect-square overflow-hidden rounded-full bg-surface-2 ring-4 ring-surface", className)}>
      {photo ? (
        <img
          src={asset(`/images/team/${photo}`)}
          alt={`Portrait of ${name}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-accent-soft font-display text-2xl font-bold text-ink" role="img" aria-label={`Placeholder for ${name}`}>
          {initials(name)}
        </div>
      )}
    </div>
  );
}
