import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { ArrowLeft } from "@/components/Icons";
import { LogoGrid } from "@/components/Logos";
import Reveal from "@/components/Reveal";
import TeamGrid from "@/components/TeamGrid";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { photoSrc, sortedEvents } from "@/data/events";
import { partnersFor } from "@/data/partners";
import { getProject, projects } from "@/data/projects";
import { team } from "@/data/team";
import { asset, cn, formatMonth } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.name} — ${p.expansion}`, description: p.summary };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const members = team.filter((m) => m.roles.some((r) => r.project === p.id));
  const photos = sortedEvents
    .filter((e) => e.projects.includes(p.id))
    .flatMap((e) => e.photos.map((ph) => ({ src: photoSrc(ph), thumb: photoSrc(ph, "sm"), alt: ph.alt, caption: e.title })));

  return (
    <>
      {/* Header */}
      <section className="relative isolate overflow-hidden bg-q text-white">
        <img src={asset(p.cover)} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-q via-q/80 to-q/40" aria-hidden />
        <div className="bg-circuit-dark absolute inset-0 -z-10 opacity-60 mix-blend-screen" aria-hidden />
        <Container className="py-16 sm:py-24">
          <Reveal>
            <Link href="/projects/" className="inline-flex items-center gap-1.5 text-sm text-white/75 hover:text-accent">
              <ArrowLeft width={16} height={16} /> All projects
            </Link>
            {p.logo && (
              <span className="mt-8 flex w-fit rounded-xl bg-white px-4 py-3 shadow-lg">
                <img src={asset(p.logo)} alt={`${p.name} logo`} className="h-10 w-auto sm:h-12" />
              </span>
            )}
            <p className="mt-8 font-mono text-sm text-accent">|{p.expansion.toLowerCase().replace(/\s+/g, "_")}⟩</p>
            <h1 className="mt-3 text-5xl font-bold sm:text-6xl">{p.name}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/85 sm:text-xl">{p.fullTitle}</p>
            {p.duration && (
              <p className="mt-6 inline-flex rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-sm text-white/85">{p.duration}</p>
            )}
          </Reveal>
        </Container>
      </section>

      {/* Overview + facts */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Overview</Eyebrow>
            <div className="mt-5 space-y-5 text-lg leading-relaxed text-muted">
              {p.overview.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5">
            <dl className="space-y-6 rounded-3xl border border-line bg-surface p-7 sm:p-8">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Funding</dt>
                <dd className="mt-1 font-medium">DOST-PCIEERD</dd>
              </div>
              {p.cooperatingAgency && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Cooperating agency</dt>
                  <dd className="mt-1 font-medium">{p.cooperatingAgency}</dd>
                </div>
              )}
              {p.collaborators && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Collaborators</dt>
                  <dd className="mt-1">
                    <ul className="space-y-1 font-medium">
                      {p.collaborators.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              {p.sdgs && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Sustainable Development Goals</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {p.sdgs.map((g) => (
                      <span key={g.goal} className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium">
                        <span className="font-display font-bold">SDG {g.goal}</span> {g.label}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* Objectives */}
      <section className="bg-grid border-y border-line py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Objectives" title="What we set out to do" />
          <ol className="grid gap-5 md:grid-cols-2">
            {p.objectives.map((o, i) => (
              <Reveal as="li" key={o} delay={i * 80} className="flex gap-5 rounded-2xl border border-line bg-surface p-6 sm:p-7">
                <span className="font-display text-3xl font-bold text-accent" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="leading-relaxed">{o}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Milestones */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Milestones" title="Project timeline" />
          <ol className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {p.milestones.map((m, i) => (
              <Reveal as="li" key={m.title} delay={i * 60} className="relative border-t-2 border-line pt-6">
                <span
                  className={cn(
                    "absolute -top-[9px] left-0 h-4 w-4 rounded-full ring-4 ring-bg",
                    m.upcoming ? "border-2 border-dashed border-muted bg-bg" : "bg-accent",
                  )}
                  aria-hidden
                />
                <p className="text-sm font-semibold tabular-nums text-orange-ink">
                  {formatMonth(m.date)}
                  {m.upcoming && <span className="ml-2 rounded-full bg-surface-2 px-2 py-0.5 text-xs text-muted">Planned</span>}
                </p>
                <h3 className="mt-2 text-lg font-bold">{m.title}</h3>
                {m.description && <p className="mt-1.5 leading-relaxed text-muted">{m.description}</p>}
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Team */}
      <section className="border-t border-line py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Team" title={`The ${p.name} team`} />
          <TeamGrid team={members} initialProject={p.id} showFilters={false} />
        </Container>
      </section>

      {/* Partners */}
      <section className="border-t border-line py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Partners" title="Partners & collaborators" />
          <Reveal>
            <LogoGrid partners={partnersFor(p.id)} />
          </Reveal>
        </Container>
      </section>

      {/* Gallery */}
      {photos.length > 0 && (
        <section className="border-t border-line pt-20 sm:pt-24">
          <Container>
            <SectionHeading eyebrow="Gallery" title="From the field" intro={<Link href="/engagements/" className="underline decoration-accent decoration-2 underline-offset-4 hover:text-ink">See all engagements →</Link>} />
            <Reveal>
              <Gallery photos={photos} className="sm:grid-cols-3 lg:grid-cols-4" limit={12} />
            </Reveal>
          </Container>
        </section>
      )}
    </>
  );
}
