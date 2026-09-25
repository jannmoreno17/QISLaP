import Link from "next/link";
import { nav, site } from "@/data/site";
import { projects } from "@/data/projects";
import Logo from "./Logo";

export default function Footer() {
  const socials = site.socials.filter((s) => s.href);
  return (
    <footer className="mt-24 bg-charcoal text-offwhite">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-offwhite/75">{site.fullName}. {site.tagline}.</p>
          <p className="mt-4 text-sm text-offwhite/75">
            Hosted by {site.host.institution} under {site.host.unit}. Funded by {site.funder.name}.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-offwhite/80 hover:text-accent">
                  {n.label}
                </Link>
              </li>
            ))}
            {projects.map((p) => (
              <li key={p.id}>
                <Link href={`/projects/${p.id}/`} className="text-offwhite/80 hover:text-accent">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">Visit us</h2>
          <address className="mt-4 text-sm not-italic leading-relaxed text-offwhite/80">
            {site.address.room}
            <br />
            {site.address.campus}
            <br />
            {site.address.street}
            <br />
            {site.address.city}
          </address>
          <a href={`mailto:${site.email}`} className="mt-3 inline-block text-sm text-offwhite/80 underline-offset-4 hover:text-accent hover:underline">
            {site.email}
          </a>
          {socials.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-3 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-offwhite/80 hover:text-accent">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-offwhite/60 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} QISLaP · Technological Institute of the Philippines</p>
          <p>Inaugurated 21 March 2025</p>
        </div>
      </div>
    </footer>
  );
}
