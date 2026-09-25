import type { Metadata } from "next";
import { LogoGrid } from "@/components/Logos";
import Reveal from "@/components/Reveal";
import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { partnersFor } from "@/data/partners";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Partners & Collaborators",
  description: "Government agencies, utilities, industry and universities working with QISLaP on Q-RIEnTe and SICAT.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners & collaborators"
        title="Built with government, industry and academia"
        intro="Our projects are grounded in partnerships with agencies, utilities, companies and research groups in the Philippines and abroad."
      />
      {projects.map((p, i) => (
        <section key={p.id} className={i ? "border-t border-line py-20 sm:py-24" : "py-20 sm:py-24"}>
          <Container>
            <SectionHeading eyebrow={p.expansion} title={p.name} />
            <Reveal>
              <LogoGrid partners={partnersFor(p.id)} />
            </Reveal>
          </Container>
        </section>
      ))}
      <Container>
        <Reveal className="rounded-3xl border border-line bg-surface p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Interested in partnering with QISLaP?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">We work with utilities, agencies, companies and universities on applied research and capability building.</p>
          <ButtonLink href="/contact/" className="mt-7">
            Contact us
          </ButtonLink>
        </Reveal>
      </Container>
    </>
  );
}
