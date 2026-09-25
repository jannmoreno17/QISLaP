import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { Container, PageHero } from "@/components/ui";
import { projects } from "@/data/projects";
import { asset } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description: "QISLaP's DOST-PCIEERD funded projects: Q-RIEnTe (quantum computing for the electric power grid) and SICAT (solar PV systems testing and standards).",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Research that meets the grid"
        intro="Each QISLaP project pairs applied research with a real operating partner, from electric cooperatives to national utilities and standards bodies."
      />
      <section className="py-20 sm:py-24">
        <Container className="space-y-10">
          {projects.map((p, i) => (
            <Reveal key={p.id}>
              <Link
                href={`/projects/${p.id}/`}
                className="group grid overflow-hidden rounded-3xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_rgba(45,45,45,0.5)] lg:grid-cols-2"
              >
                <div className={`relative aspect-[16/10] overflow-hidden lg:aspect-auto ${i % 2 ? "lg:order-2" : ""}`}>
                  <img src={asset(p.cover)} alt="" loading={i === 0 ? "eager" : "lazy"} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-ink">{p.expansion}</p>
                  <h2 className="mt-3 text-4xl font-bold">{p.name}</h2>
                  <p className="mt-3 font-medium text-ink/85">{p.fullTitle}</p>
                  {p.duration && <p className="mt-2 text-sm text-muted">{p.duration}</p>}
                  <p className="mt-5 leading-relaxed text-muted">{p.summary}</p>
                  <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-charcoal">
                    View project <ArrowRight width={16} height={16} className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
