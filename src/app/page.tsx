import Link from "next/link";
import { EventTags } from "@/components/EventTimeline";
import { ArrowRight, Atom, SolarPanel } from "@/components/Icons";
import { LogoMarquee } from "@/components/Logos";
import BlochSphere from "@/components/quantum/BlochSphere";
import QuantumCircuit from "@/components/quantum/QuantumCircuit";
import Reveal from "@/components/Reveal";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { events, photoSrc, sortedEvents } from "@/data/events";
import { lab } from "@/data/lab";
import { partners } from "@/data/partners";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { currentMembers } from "@/data/team";
import { asset, formatDateRange } from "@/lib/utils";

export default function Home() {
  const stats = [
    { ket: "partners", value: partners.length, label: "Partners & collaborators" },
    { ket: "workshops", value: events.filter((e) => e.kind === "workshop").length, label: "Workshops held" },
    { ket: "team", value: currentMembers.length, label: "Team members" },
    { ket: "projects", value: projects.length, label: "Funded projects" },
  ];
  const latest = sortedEvents.filter((e) => e.photos.length > 0).slice(0, 3);

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="bg-circuit-dark relative isolate overflow-hidden text-white">
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:min-h-[min(84vh,780px)] lg:grid-cols-12 lg:py-24">
          <Reveal className="lg:col-span-6">
            <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-white/80 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden />
              T.I.P. · TechnoCoRe · DOST-PCIEERD
            </p>
            <div className="mt-7 flex items-center gap-5">
              <img src={asset("/brand/qislap-logo-light.svg")} alt="QISLaP logo" width={88} height={92} className="h-20 w-auto sm:h-24" />
              <h1 className="text-6xl font-bold leading-none tracking-tight sm:text-7xl">QISLaP</h1>
            </div>
            <p className="mt-6 text-2xl font-semibold leading-snug text-white/90 sm:text-3xl">
              Quantum and Intelligent Systems Laboratory for <span className="text-accent">Power Engineering</span>
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">{site.tagline}.</p>
            <p className="q-cursor mt-6 font-mono text-sm text-white/60">
              <span className="text-accent">&gt;</span> first lab in the Philippines applying hybrid quantum computing to the power grid
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/projects/">Our Projects</ButtonLink>
              <ButtonLink href="/contact/" variant="ghost-light">
                Contact Us
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-6">
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-q/80 shadow-[0_40px_80px_-30px_rgba(255,204,41,0.25)] backdrop-blur">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#FC4902]/80" aria-hidden />
                <span className="h-3 w-3 rounded-full bg-accent/80" aria-hidden />
                <span className="h-3 w-3 rounded-full bg-white/30" aria-hidden />
                <span className="ml-3 font-mono text-xs text-white/50">q_riente_forecast.ipynb</span>
              </div>
              <div className="px-3 pb-4 pt-5 sm:px-5">
                <QuantumCircuit />
              </div>
              <figcaption className="border-t border-white/10 px-5 py-3 font-mono text-xs text-white/55">
                <span className="text-accent">In [1]:</span> qc.draw() <span className="text-white/35"># hybrid ansatz · 4 qubits</span>
              </figcaption>
            </figure>
          </Reveal>
        </Container>

        {/* Key numbers as "measurement results" */}
        <div className="border-t border-white/10 bg-black/20">
          <Container>
            <dl className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 80} className="border-white/10 px-2 py-7 sm:px-6 lg:border-l lg:first:border-l-0">
                  <dt className="font-mono text-xs text-white/55">
                    ⟨{s.ket}⟩ <span className="sr-only">{s.label}</span>
                  </dt>
                  <dd className="mt-1 flex items-baseline gap-3">
                    <span className="font-display text-4xl font-bold tabular-nums text-accent sm:text-5xl">{s.value}</span>
                    <span className="text-sm text-white/70" aria-hidden>
                      {s.label}
                    </span>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* ───────── Why quantum ───────── */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Why quantum</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">The grid is outgrowing classical computing.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{lab.whyItMatters.text}</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {lab.whyItMatters.problems.map((p) => (
                <li key={p} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 font-medium">
                  <span className="shrink-0 whitespace-nowrap font-mono text-sm text-brand-gray" aria-hidden>
                    |<span className="text-orange-ink">ψ</span>⟩
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150} className="mx-auto w-full max-w-sm text-brand-gray lg:col-span-5">
            <BlochSphere />
          </Reveal>
        </Container>
      </section>

      {/* ───────── Hybrid workflow ───────── */}
      <section className="bg-circuit border-y border-line py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Hybrid quantum-classical"
            title="How a hybrid quantum workflow runs"
            intro="Classical and quantum processors each do what they do best. Classical systems prepare the problem, quantum circuits attack the hardest sub-problems, and classical systems turn measurements into grid decisions."
          />
          <ol className="relative grid gap-6 md:grid-cols-3">
            <li className="absolute left-0 right-0 top-[52px] hidden h-0.5 list-none bg-gradient-to-r from-brand-gray/40 via-accent to-brand-gray/40 md:block" aria-hidden />
            {lab.workflow.map((w, i) => (
              <Reveal as="li" key={w.step} delay={i * 120} className="relative">
                <div className="relative z-10 mx-auto flex h-[104px] w-[104px] items-center justify-center rounded-2xl border-2 border-line bg-surface shadow-sm md:mx-0">
                  {i === 1 ? (
                    <svg viewBox="0 0 60 60" width="60" height="60" aria-hidden>
                      <line x1="0" y1="20" x2="60" y2="20" className="stroke-brand-gray" strokeWidth="2" />
                      <line x1="0" y1="40" x2="60" y2="40" className="stroke-brand-gray" strokeWidth="2" />
                      <rect x="8" y="10" width="20" height="20" rx="3" className="fill-accent" />
                      <text x="18" y="25" textAnchor="middle" className="fill-charcoal font-mono text-[13px] font-bold">
                        H
                      </text>
                      <line x1="42" y1="20" x2="42" y2="48" className="stroke-ink" strokeWidth="2" />
                      <circle cx="42" cy="20" r="4" className="fill-ink" />
                      <circle cx="42" cy="40" r="8" className="fill-surface stroke-ink" strokeWidth="2" />
                      <line x1="34" y1="40" x2="50" y2="40" className="stroke-ink" strokeWidth="2" />
                    </svg>
                  ) : (
                    <span className="font-mono text-3xl font-bold text-brand-gray" aria-hidden>
                      {i === 0 ? "{ }" : "∑"}
                    </span>
                  )}
                </div>
                <div className="mt-6 rounded-2xl border border-line bg-surface p-6">
                  <p className="font-mono text-xs font-semibold text-orange-ink">
                    {w.step} · {w.label}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{w.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ───────── Projects ───────── */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Research"
            title="Two projects, one mission"
            intro="From quantum-powered grid forecasting to solar PV testing and standards, our work targets real operating needs of the Philippine energy sector."
            action={<ButtonLink href="/projects/" variant="secondary">All projects</ButtonLink>}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <Link
                  href={`/projects/${p.id}/`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_24px_50px_-28px_rgba(45,45,45,0.45)]"
                >
                  <div className="relative aspect-[16/8] overflow-hidden">
                    <img src={asset(p.cover.replace(".webp", "-sm.webp"))} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-q/85 via-q/20 to-transparent" aria-hidden />
                    {p.logo ? (
                      <span className="absolute bottom-4 left-5 rounded-lg bg-white/95 px-3 py-2">
                        <img src={asset(p.logo)} alt={`${p.name} logo`} className="h-7 w-auto" />
                      </span>
                    ) : (
                      <span className="absolute bottom-4 left-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-charcoal">
                        {p.id === "sicat" ? <SolarPanel /> : <Atom />}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="text-2xl font-bold">{p.name}</h3>
                    <p className="mt-1 text-sm font-medium text-orange-ink">{p.expansion}</p>
                    <p className="mt-4 leading-relaxed text-muted">{p.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm font-semibold">
                      explore({p.id}) <ArrowRight width={16} height={16} className="transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────── Inside the lab ───────── */}
      <section className="bg-circuit-dark py-20 text-white sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src={asset("/images/hero.webp")}
              alt="Students at the QISLaP Quantum Launchpad workshop at T.I.P. Manila"
              loading="lazy"
              className="aspect-[16/10] w-full rounded-2xl border border-white/10 object-cover"
            />
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow dark>Inside the lab</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Room A301, T.I.P. Manila</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              A dedicated research hub for T.I.P. faculty, graduate and undergraduate students, and external partners, with
              high-performance classical computing and access to quantum simulators.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {lab.infrastructure.map((it) => (
                <li key={it.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="font-display text-2xl font-bold text-accent">{it.value}</p>
                  <p className="mt-1 text-sm font-semibold">{it.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">{it.detail}</p>
                </li>
              ))}
            </ul>
            <ButtonLink href="/about/" variant="ghost-light" className="mt-8">
              About the lab
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      {/* ───────── Latest engagements ───────── */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Latest engagements"
            title="Where we've been lately"
            action={<ButtonLink href="/engagements/" variant="secondary">All engagements</ButtonLink>}
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {latest.map((e, i) => (
              <Reveal as="li" key={e.id} delay={i * 100}>
                <Link
                  href={`/engagements/#${e.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_20px_40px_-24px_rgba(45,45,45,0.45)]"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-surface-2">
                    <img src={asset(photoSrc(e.photos[0], "sm"))} alt={e.photos[0].alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <time dateTime={e.date} className="font-mono text-xs font-semibold text-muted">
                      {formatDateRange(e.date, e.endDate)}
                    </time>
                    <h3 className="mt-2 text-lg font-bold leading-snug">{e.title}</h3>
                    {e.subtitle && <p className="mt-1 text-sm text-muted">{e.subtitle}</p>}
                    <div className="mt-auto pt-4">
                      <EventTags event={e} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───────── Partners ───────── */}
      <section className="border-t border-line py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Partners"
            title="Entangled with government, industry and academia"
            action={<ButtonLink href="/partners/" variant="secondary">All partners</ButtonLink>}
          />
        </Container>
        <Reveal>
          <LogoMarquee partners={partners} />
        </Reveal>
      </section>

      {/* ───────── CTA ───────── */}
      <section>
        <Container>
          <Reveal className="bg-circuit-dark relative overflow-hidden rounded-3xl px-6 py-14 text-white sm:px-12 sm:py-16">
            <div className="relative grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <Eyebrow dark>Collaborate with us</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                  Let&apos;s put quantum computing to work for <span className="text-accent">Philippine energy</span>.
                </h2>
                <p className="mt-4 text-lg text-white/70">
                  We welcome government agencies, utilities, industry partners, universities, students and researchers.
                </p>
                <ButtonLink href="/contact/" className="mt-8">
                  Get in touch
                </ButtonLink>
              </div>
              <div className="hidden text-white/60 lg:col-span-4 lg:block">
                <BlochSphere className="mx-auto max-w-[240px]" />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
