"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { asset, cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Close } from "./Icons";

export type GalleryPhoto = { src: string; thumb: string; alt: string; caption?: string };

/** Thumbnail grid that opens an accessible lightbox (native <dialog>: Esc closes, focus is managed). */
export default function Gallery({
  photos,
  className,
  thumbClassName,
  limit,
}: {
  photos: GalleryPhoto[];
  className?: string;
  thumbClassName?: string;
  /** Show only the first N thumbnails; the rest are reachable in the lightbox. */
  limit?: number;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    el.addEventListener("keydown", onKey);
    el.addEventListener("close", onClose);
    return () => {
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("close", onClose);
    };
  }, [step]);

  const shown = limit ? photos.slice(0, limit) : photos;
  const hidden = photos.length - shown.length;
  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className={cn("grid grid-cols-2 gap-2 sm:grid-cols-3", className)}>
        {shown.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              onClick={() => open(i)}
              className={cn("group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-2", thumbClassName)}
              aria-label={`Open photo: ${p.alt}`}
            >
              <img
                src={asset(p.thumb)}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {hidden > 0 && i === shown.length - 1 && (
                <span className="absolute inset-0 flex items-center justify-center bg-charcoal/60 text-lg font-semibold text-white">
                  +{hidden}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label="Photo viewer"
        className="m-auto h-full max-h-none w-full max-w-none bg-transparent p-0 text-white backdrop:bg-black/85"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {current && (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-4 sm:p-10" onClick={(e) => e.target === e.currentTarget && close()}>
            <figure className="flex max-h-full min-h-0 flex-col items-center">
              <img src={asset(current.src)} alt={current.alt} className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain shadow-2xl" />
              <figcaption className="mt-3 max-w-2xl text-center text-sm text-white/85">
                {current.caption ?? current.alt}
                <span className="ml-2 text-white/55">
                  {index! + 1} / {photos.length}
                </span>
              </figcaption>
            </figure>
          </div>
        )}
        <button
          type="button"
          onClick={close}
          aria-label="Close photo viewer"
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
          autoFocus
        >
          <Close />
        </button>
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <ArrowRight />
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
