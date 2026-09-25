import type { LabEvent } from "@/data/events";
import { photoSrc } from "@/data/events";
import { formatDateRange } from "@/lib/utils";
import Gallery from "./Gallery";
import { MapPin } from "./Icons";
import Reveal from "./Reveal";
import { ProjectTag } from "./ui";

export function EventTags({ event }: { event: LabEvent }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {event.projects.length === 0 ? <ProjectTag project="qislap" /> : event.projects.map((p) => <ProjectTag key={p} project={p} />)}
    </div>
  );
}

/** Vertical timeline, newest first. */
export default function EventTimeline({ events }: { events: LabEvent[] }) {
  return (
    <ol className="relative border-l-2 border-line pl-6 sm:ml-40 sm:pl-10">
      {events.map((e) => (
        <li key={e.id} id={e.id} className="relative mb-14 scroll-mt-24 last:mb-0">
          <span
            className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full border-4 border-bg bg-accent ring-2 ring-accent sm:-left-[49px]"
            aria-hidden
          />
          <Reveal>
            <time
              dateTime={e.date}
              className="mb-2 block text-sm font-semibold tabular-nums text-muted sm:absolute sm:-left-[12.5rem] sm:top-0.5 sm:w-36 sm:text-right"
            >
              {formatDateRange(e.date, e.endDate)}
            </time>
            <div className="rounded-2xl border border-line bg-surface p-5 transition duration-300 hover:shadow-[0_18px_40px_-24px_rgba(45,45,45,0.35)] sm:p-6">
              <EventTags event={e} />
              <h3 className="mt-3 text-xl font-bold leading-snug">{e.title}</h3>
              {e.subtitle && <p className="mt-1 font-medium text-ink/80">{e.subtitle}</p>}
              {e.location && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin width={16} height={16} /> {e.location}
                </p>
              )}
              {e.summary && <p className="mt-3 leading-relaxed text-muted">{e.summary}</p>}
              {e.photos.length > 0 && (
                <Gallery
                  className="mt-5"
                  limit={6}
                  photos={e.photos.map((p) => ({ src: photoSrc(p), thumb: photoSrc(p, "sm"), alt: p.alt, caption: `${e.title} — ${formatDateRange(e.date, e.endDate)}` }))}
                />
              )}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
