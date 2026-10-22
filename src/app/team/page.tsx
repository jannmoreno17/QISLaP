import type { Metadata } from "next";
import TeamGrid from "@/components/TeamGrid";
import { Container, PageHero } from "@/components/ui";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the researchers, engineers and staff of QISLaP's Q-RIEnTe and SICAT projects.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our people"
        title="The team behind QISLaP"
        intro="Electrical, computer, industrial engineers, data scientists and energy specialists working across our two projects."
      />
      <section className="py-16 sm:py-20">
        <Container>
          <TeamGrid team={team} />
        </Container>
      </section>
    </>
  );
}
