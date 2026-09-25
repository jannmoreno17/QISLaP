import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import { Building, MapPin } from "@/components/Icons";
import BlochSphere from "@/components/quantum/BlochSphere";
import Reveal from "@/components/Reveal";
import { ButtonLink, Container, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { events, photoSrc } from "@/data/events";
import { lab } from "@/data/lab";
import { site } from "@/data/site";
import { asset } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "QISLaP is the first laboratory in the Philippines dedicated to applying hybrid quantum computing to power engineering. Hosted by T.I.P. under TechnoCoRe and funded by DOST-PCIEERD.",
};

export default function AboutPage() {
  const inauguration = events.find((e) => e.id === "inauguration")!;
  return (
    <>
      <PageHero
        eyebrow="About QISLaP"
        title="The Philippines' first quantum computing lab for power engineering"
        intro="A cross-disciplinary research hub at the Technological Institute of the Philippines, blending classical computing with quantum approaches, AI, optimization and emerging digital technologies."
        aside={
          <div className="mx-auto max-w-xs text-white/60">
            <BlochSphere />
          </div>
        }
      />

      {/* Who we are */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Where qubits meet the power grid</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              <p>{lab.intro}</p>
              <p>
                Hosted by the Technological Institute of the Philippines under TechnoCoRe (Technopreneurship and Collaborative Applied
                Research) and funded by DOST-PCIEERD, QISLaP was formally inaugurated on <strong className="text-ink">21 March 2025</strong>,
                together with the grand MOU signing for its projects.
              </p>
              <p>
                The lab supports graduate thesis and dissertation work, where students build deep learning and machine learning models to
                predict electricity demand, wind speed and solar irradiance.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <figure className="overflow-hidden rounded-3xl border border-line bg-surface">
              <img
                src={asset("/images/events/2025-03-21-dost-qislap-grand-mou-signing-and-inauguration/photo5.webp")}
                alt="Partners and QISLaP team at the Grand MOU Signing and Inauguration, 21 March 2025"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="p-4 font-mono text-xs text-muted">DOST–QISLaP Grand MOU Signing and Inauguration · 21 Mar 2025</figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* Mission */}
      <section className="bg-circuit border-y border-line py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Mission" title="Hybrid solutions for power and energy" intro={lab.mission.statement} />
          <ul className="grid gap-5 md:grid-cols-3">
            {lab.mission.pillars.map((p, i) => (
              <Reveal as="li" key={p.ket} delay={i * 100} className="rounded-2xl border border-line bg-surface p-7">
                <p className="font-mono text-lg font-bold text-brand-gray">
                  |<span className="text-orange-ink">{p.ket}</span>⟩
                </p>
                <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Vision */}
      <section className="bg-circuit-dark py-20 text-white sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow dark>Vision & goals</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A national center of excellence in applied quantum computing</h2>
          </Reveal>
          <ol className="space-y-4 lg:col-span-7">
            {lab.vision.map((v, i) => (
              <Reveal as="li" key={v} delay={i * 80} className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-5">
                <span className="font-mono text-sm font-bold text-accent">|{i.toString(2).padStart(2, "0")}⟩</span>
                <p className="leading-relaxed text-white/85">{v}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Roadmap */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Technology roadmap"
            title="From hybrid models to self-optimizing grids"
            intro="A phased evolution of power system intelligence, from hybrid quantum-classical decision support to adaptive, quantum-enhanced smart grids."
          />
          <ol className="relative grid gap-6 lg:grid-cols-3">
            <li className="absolute left-0 right-0 top-[11px] hidden h-0.5 list-none bg-gradient-to-r from-accent via-accent/50 to-line lg:block" aria-hidden />
            {lab.roadmap.map((r, i) => (
              <Reveal as="li" key={r.period} delay={i * 120} className="relative">
                <span className={`relative z-10 block h-6 w-6 rounded-full ring-4 ring-bg ${i === 0 ? "bg-accent" : "border-2 border-accent bg-bg"}`} aria-hidden />
                <p className="mt-5 font-mono text-sm font-semibold text-orange-ink">{r.period}</p>
                <h3 className="mt-2 text-xl font-bold">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{r.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Host, funder, location */}
      <section className="border-t border-line py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Institutional home" title="Host, funder and location" />
          <div className="grid gap-6 lg:grid-cols-3">
            <Reveal className="rounded-2xl border border-line bg-surface p-7">
              <Building className="text-orange-ink" width={28} height={28} />
              <h3 className="mt-4 text-lg font-bold">Host institution</h3>
              <p className="mt-2 leading-relaxed text-muted">
                {site.host.institution}, under {site.host.unit}.
              </p>
              <a href={site.host.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold underline decoration-accent decoration-2 underline-offset-4">
                tip.edu.ph
              </a>
            </Reveal>
            <Reveal delay={80} className="rounded-2xl border border-line bg-surface p-7">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-orange-ink" aria-hidden>
                <path d="M12 3v18M5 8h14M7 8l-3 7h6L7 8zM17 8l-3 7h6l-3-7z" strokeLinejoin="round" />
              </svg>
              <h3 className="mt-4 text-lg font-bold">Funding agency</h3>
              <p className="mt-2 leading-relaxed text-muted">
                {site.funder.fullName} ({site.funder.name}).
              </p>
              <a href={site.funder.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold underline decoration-accent decoration-2 underline-offset-4">
                pcieerd.dost.gov.ph
              </a>
            </Reveal>
            <Reveal delay={160} className="rounded-2xl border border-line bg-surface p-7">
              <MapPin className="text-orange-ink" width={28} height={28} />
              <h3 className="mt-4 text-lg font-bold">Lab location</h3>
              <address className="mt-2 not-italic leading-relaxed text-muted">
                {site.address.room}, {site.address.campus}
                <br />
                {site.address.street}, {site.address.city}
              </address>
              <a href={site.mapLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold underline decoration-accent decoration-2 underline-offset-4">
                Open in Google Maps
              </a>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Inauguration */}
      <section className="pb-4">
        <Container>
          <SectionHeading eyebrow="21 March 2025" title="Inauguration day" intro={inauguration.subtitle} />
          <Reveal>
            <Gallery
              className="sm:grid-cols-3 lg:grid-cols-5"
              photos={inauguration.photos.map((p) => ({ src: photoSrc(p), thumb: photoSrc(p, "sm"), alt: p.alt }))}
            />
          </Reveal>
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/projects/">Our Projects</ButtonLink>
            <ButtonLink href="/team/" variant="secondary">
              Meet the team
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
