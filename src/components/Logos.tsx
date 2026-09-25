import type { Partner } from "@/data/partners";
import { asset, cn } from "@/lib/utils";

function LogoTile({ partner, className }: { partner: Partner; className?: string }) {
  const img = partner.logo ? (
    <img
      src={asset(`/images/partners/${partner.logo}`)}
      alt={`${partner.name} logo`}
      loading="lazy"
      decoding="async"
      className="max-h-full max-w-full object-contain grayscale opacity-70 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100"
    />
  ) : (
    <span className="text-center font-display text-sm font-bold text-charcoal">{partner.short}</span>
  );
  // Logos sit on white tiles in both themes since many source files have white backgrounds.
  const tile = cn("group flex h-24 items-center justify-center rounded-xl border border-line bg-white p-4", className);
  return partner.url ? (
    <a href={partner.url} target="_blank" rel="noopener noreferrer" className={tile} title={partner.name}>
      {img}
    </a>
  ) : (
    <div className={tile} title={partner.name}>
      {img}
    </div>
  );
}

export function LogoGrid({ partners }: { partners: Partner[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {partners.map((p) => (
        <li key={p.id} className="flex flex-col gap-2">
          <LogoTile partner={p} className="hover:-translate-y-0.5 hover:shadow-md transition" />
          <p className="px-1 text-center text-xs leading-snug text-muted">{p.name}</p>
        </li>
      ))}
    </ul>
  );
}

/** Auto-scrolling logo strip (pauses on hover/focus; static when reduced motion is preferred). */
export function LogoMarquee({ partners }: { partners: Partner[] }) {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 gap-4 pr-4" aria-hidden={hidden || undefined}>
      {partners.map((p) => (
        <li key={p.id} className="w-44 shrink-0">
          {hidden ? (
            <div className="group flex h-24 items-center justify-center rounded-xl border border-line bg-white p-4">
              {p.logo && <img src={asset(`/images/partners/${p.logo}`)} alt="" loading="lazy" className="max-h-full max-w-full object-contain grayscale opacity-70" />}
            </div>
          ) : (
            <LogoTile partner={p} />
          )}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="marquee-track flex w-max motion-reduce:w-full motion-reduce:flex-wrap">
        {row()}
        <div className="flex motion-reduce:hidden">{row(true)}</div>
      </div>
    </div>
  );
}
